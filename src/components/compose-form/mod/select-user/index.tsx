import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { Input, Select, Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { LabeledValue } from 'antd/lib/select';
import SelectUser from 'select-ss-user';
import {
  Value as SelectUserValueProps,
  SelectUserFuncArgProps,
  IlistItem as ValueItem,
} from 'select-ss-user/lib/components/select-user/interface';
import { uniqBy } from 'lodash';
import url from '@/common/service-utils';
import request2 from '@/common/request2';
import Confirm from '@/components/Confirm';
import './index.less';

// const { confirm } = Modal;

const treeState = () => {
  return {
    orgInfoList: [],
    deptInfoList: [],
    userInfoList: [],
    equipmentInfoList: [],
    tvInfoList: [],
    maternalInfoList: [],
    cameraInfoList: [],
    tagInfoList: [],
    groupInfoList: [],
    workGroupInfoList: [],
    orgRelInfoList: [],
  };
};

export interface PropTypes {
  value?: ValueItem | ValueItem[];
  selectUserProps: Omit<SelectUserFuncArgProps, 'onOk' | 'onCancel'>;
  onChange?: (val: any) => void;
  // 获取 info 的 key，如果设置了，则会自动将值回填到选人组件中，否则不回填
  wrapperKey?: string;
  confirmContent?: string;
  confirmTitle?: string;
  tips?: string | React.ReactNode;
}

export default ({
  value,
  onChange,
  wrapperKey,
  tips,
  selectUserProps,
  confirmContent,
  confirmTitle,
}: PropTypes) => {
  const { multiple, isSaveSelectSignature, requestParams } =
    selectUserProps || {};
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [arrayValue, setArrayValue] = useState([]);
  // console.log(value, 'value111');
  const [userIds] = useMemo(() => {
    const ids = [];
    // if (arrayValue.length === 0) {
    //   return [];
    // }
    arrayValue.forEach((user) => {
      ids.push(user?.id);
    });

    return [ids];
  }, [arrayValue]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setArrayValue(value.filter(({ id, name }) => id && name));
    } else if (value) {
      request2(
        `${url.usercenter}/select/component/result?selectSignature=${value}`,
      ).then((data) => {
        // console.log(data, 'userInfoList2222');
        const {
          userInfoList = [],
          cameraInfoList = [],
          deptInfoList = [],
          equipmentInfoList = [],
          maternalInfoList = [],
          tvInfoList = [],
          workGroupInfoList = [],
          groupInfoList = [],
          tagInfoList = [],
        } = data || [];
        const list = userInfoList
          .concat(cameraInfoList)
          .concat(deptInfoList)
          .concat(equipmentInfoList)
          .concat(maternalInfoList)
          .concat(tvInfoList)
          .concat(workGroupInfoList)
          .concat(groupInfoList)
          .concat(tagInfoList)
          .filter((item) => !!item);
        // console.log(list, '33333');
        if (list.length === 0) {
          onChange(null);
        }
        setArrayValue(list);
      });
    }
  }, [value]);
  // 复选场景：根据组件 value 生成 select 的下拉菜单和 value
  useEffect(() => {
    // if (!multiple) return;

    // console.log(arrayValue, 'arrayValuetag');
    setOptions(
      arrayValue.map(({ id, name }) => {
        return { label: name, value: id, disabled: false };
      }),
    );
  }, [arrayValue]);

  const delKeys = (itemList) => {
    const nextTreeState = treeState();

    // 没传type就只能一个一个找着删了
    for (const treeItem of itemList) {
      const { id: key } = treeItem;
      [
        'deptInfoList',
        'orgInfoList',
        'userInfoList',
        'equipmentInfoList',
        'tvInfoList',
        'maternalInfoList',
        'cameraInfoList',
        'workGroupInfoList',
        'tagInfoList',
        'groupInfoList',
        'orgRelInfoList',
      ].some((listKey) => {
        // @ts-ignore
        const infoList = nextTreeState[listKey];
        const nextInfoList = infoList.filter(({ id }) => id !== key);
        if (nextInfoList.length !== infoList.length) {
          // @ts-ignore
          nextTreeState[listKey] = nextInfoList;
        }
      });
    }
    return nextTreeState;

    // setTreeState({ ...nextTreeState, checkedKeys });
  };

  const onUsersSelectChange = useCallback(
    (selectValue) => {
      Confirm({
        title: confirmTitle,
        content: confirmContent,
        onCancel() {},
        onOk() {
          const nextUserList = arrayValue.filter(
            (user) => selectValue !== user.id,
          );
          // console.log(nextUserList, 'nextUserList11');

          let nextTreeState = treeState();
          if (nextUserList.length === 0) {
            nextTreeState = treeState();
          } else {
            nextUserList.map((item) => {
              const key = getListByType(item?.type || 'USER');
              nextTreeState[key].push(item);
            });
          }

          // console.log(nextTreeState, 'nextTreeState11');

          if (isSaveSelectSignature) {
            saveResult(nextTreeState);
          } else {
            onChange(nextUserList);
          }
        },
      });
    },
    [arrayValue, selectUserProps],
  );

  const getListByType = (type: any) => {
    const typeToKeyMap = {
      DEPT: 'deptInfoList',
      GROUP_DEPT: 'deptInfoList',
      ORG: 'orgInfoList',
      TAG: 'tagInfoList',
      USER: 'userInfoList',
      EQUIPMENT: 'equipmentInfoList',
      TV: 'tvInfoList',
      CAMERA: 'cameraInfoList',
      MATERNAL: 'maternalInfoList',
      GROUP: 'groupInfoList',
      WORK_GROUP: 'workGroupInfoList',
      ORG_REL: 'orgRelInfoList',
      REGULATORY: 'orgRelInfoList',
      SCHOOL: 'orgRelInfoList',
      TAG_GROUP: '',
    };
    const key = typeToKeyMap[type];
    return key;
    // let key
    // @ts-ignore
    // return [list[key], key];
  };

  // const updateNode = (node) => {
  //   const [list = [], listKey] = getListByType(node.type, nextTreeState);
  //   let nextList = [];
  //   const nodeIndex = list.findIndex((item) => {
  //     return item.id === node.id;
  //   });

  //   // 如果节点未选中则选中
  //   if (nodeIndex === -1) {
  //     nextList = list.concat({ ...node });
  //   } else {
  //     // 否则取消选中
  //     nextList = list.slice(0, nodeIndex).concat(list.slice(nodeIndex + 1));
  //   }
  //   const newNextTreeState = { ...nextTreeState };

  //   // @ts-ignore
  //   newNextTreeState[listKey] = nextList;
  //   return newNextTreeState;

  //   // return !deleteItem ? nextList.length > list.length : false;
  // };

  const saveResult = (array) => {
    // debugger;
    // console.log(updateNode, 'updateNode')
    // const array = updateNode(node);
    // console.log(array, 'array');
    request2(`${url.usercenter}/select/component/result`, {
      method: 'POST',
      data: {
        selectTypeList: requestParams.selectTypeList,
        id: value,
        ...array,
      },
    }).then((data) => {
      onChange(data);
    });
  };

  const removeInputValue = useCallback(
    (e) => {
      e?.stopPropagation();
      onChange(null);
      setArrayValue([{ name: '' }]);
    },
    [onChange],
  );

  const handleChange = useCallback(
    (val: SelectUserValueProps) => {
      // 整合所有的内容
      const mergedValue = [
        'userInfoList',
        'cameraInfoList',
        'equipmentInfoList',
        'maternalInfoList',
        'tvInfoList',
        'workGroupInfoList',
        'deptInfoList',
        'tagInfoList',
        'orgInfoList',
        'groupInfoList',
      ]
        .reduce((result, key) => {
          // @ts-ignore
          return result.concat(val[key] || []);
        }, [])
        .filter((_) => _);
      // console.log(arrayValue, 'arrayValue', value);
      // const nextUserList = uniqBy(
      //   (value || []).concat(mergedValue),
      //   'id',
      // );
      const sign = isSaveSelectSignature
        ? val.selectSignature
        : multiple
        ? uniqBy((value || []).concat(mergedValue), 'id')
        : mergedValue;
      onChange(sign);
    },
    [onChange],
  );
  const showSelectUser = useCallback(
    (e) => {
      e.preventDefault();
      SelectUser.show({
        defaultValue: wrapperKey ? { [wrapperKey]: arrayValue } : null,
        ...selectUserProps,
        selectSignature:
          typeof value === 'string' ? value : selectUserProps.selectSignature,
        onOk(val: SelectUserValueProps) {
          handleChange(val);
        },
      });
    },
    [selectUserProps, wrapperKey, arrayValue, value],
  );
  return multiple && selectUserProps?.disabled ? (
    options.length ? (
      <div className="suo-tag-box">
        {options.map((item, index) => {
          if (typeof item === 'string') {
            return <Tag key={index}>{item}</Tag>;
          } else if (item.label) {
            return <Tag key={index}>{item.label}</Tag>;
          } else {
            return '-';
          }
        })}
      </div>
    ) : (
      '-'
    )
  ) : (
    <>
      <div
        className="ssl-select-user"
        onClick={selectUserProps?.disabled ? () => {} : showSelectUser}
      >
        <div>
          <Select
            mode="multiple"
            options={options}
            open={false}
            placeholder="请选择"
            value={userIds}
            dropdownStyle={{ display: 'none' }}
            onDeselect={onUsersSelectChange}
            disabled={selectUserProps?.disabled}
            showArrow={false}
            dropdownRender={() => null}
          />
        </div>
        <div className="add-icon" />
      </div>
      {tips && (
        <div
          style={{
            color: '#999',
            fontSize: '12px',
            wordBreak: 'break-all',
            paddingTop: '8px',
          }}
        >
          {tips}
        </div>
      )}
    </>
  );
};
