import React, { useState, useEffect, useContext } from 'react';
import { message } from 'antd';
import { ComposeTreeContext } from '@/components/compose-tree';
import ComposeManage, {
  ComposeManageProps,
  ColumnItemProps,
} from '@/components/compose-manage';
import net from '@/services';
import { Value as SelectUserValueProps } from 'select-ss-user/lib/components/select-user/interface';
import tableComsMap from '../../../../mod/coms-map';

export default function ListModule() {
  const encodePathname = encodeURIComponent(location.pathname);
  const { activeKey, reloadTree, nowExpandedNode } =
    useContext(ComposeTreeContext);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    // tslint:disable-next-line: no-floating-promises
    net
      .request('/user/customer/columns/getUserColumns', {
        method: 'GET',
      })
      .then(({ data }: { data: ColumnItemProps[] }) => {
        setColumns(
          data
            ?.map(({ system, name, uiType, ...others }) => {
              if (name === 'userName') {
                // 强行把名为 userName 的列转成 userText，配置点击弹层。
                return {
                  ...others,
                  name,
                  uiType: 'userText',
                  // fixed: 'left',
                  width: 120,
                  props: { userType: 'customer' },
                } as ColumnItemProps;
              }
              if (name === 'avatar') {
                return {
                  ...others,
                  name,
                  width: 100,
                  uiType,
                } as ColumnItemProps;
              }
              return {
                ...others,
                name,
                uiType,
              } as ColumnItemProps;
            })
            .concat({
              name: 'operation',
              uiType: 'buttonList',
              label: '操作',
              width: 100,
              props: {
                dataSource: [
                  {
                    text: '编辑',
                    uiType: 'link',
                    to:
                      '/contacts-v1/personnel-student-form/${id}?redirecUrl=' +
                      encodeURIComponent(location.pathname),
                  },
                  {
                    text: '移除',
                    uiType: 'request',
                    confirmBeforeClick: {
                      title: '您确认要移除 ${record.userName} 吗？',
                      content:
                        '提示：会把没有班级的学生移动到“异常校区-未知学段-异常年级-异常班级”下，请及时处理。',
                    },
                    refreshAfterRequest: true,
                    request: {
                      url: '/user/customer/class/batch/dept',
                      method: 'PUT',
                      params: {
                        deptId: activeKey,
                      },
                    },
                    onSuccess() {
                      reloadTree();
                    },
                  },
                ],
              },
            }),
        );
      });
  }, []);
  const props: ComposeManageProps = {
    dataRequest: {
      url: '/user/customer/class/list',
      method: 'GET',
      params: { classId: activeKey },
    },
    tableProps: {
      primaryKey: 'userId',
      comsMap: tableComsMap,
      columns,
      rowSelection: {
        type: 'checkbox',
      },
    },
    buttonList: [
      {
        uiType: 'link',
        to: `/contacts-v1/personnel-student-form?redirecUrl=${encodePathname}&activeKey=${activeKey}&activeKeyName=${
          (nowExpandedNode || {}).label
        }`,
        // to: `/contacts-v1/personnel-student-form?redirecUrl=${encodeURIComponent(
        //   location.pathname
        // )}`,
        text: '+ 添加学生/家长',
        buttonProps: { type: 'primary' },
      },
      {
        uiType: 'selectClass',
        text: '调班',
        isBatch: true,
        request: {
          url: '/user/customer/manage/batchUpdateUserDept',
          method: 'PUT',
          formatter: ({
            selectUser,
            idList,
            ...others
          }: {
            selectUser: SelectUserValueProps;
            idList: string[];
          }) => {
            return {
              ...others,
              // 会自动将选人组件的结果放入 selectUser 中，others 为传入的其他参数
              deptIds: selectUser?.deptInfoList?.map((dept) => dept.id),
              userIds: idList,
            };
          },
        },
        selectUserProps: {},
        onSuccess(result: any) {
          message.success(result.data || '', 4);
          reloadTree();
        },
      },
      {
        uiType: 'request',
        request: {
          url: '/user/customer/class/batch/dept',
          method: 'PUT',
          params: {
            deptId: activeKey,
          },
        },
        isBatch: true,
        text: '批量移除',
        confirmBeforeClick: {
          title: '确认要将选中的人员从该班级移除吗？',
          content:
            '提示：会把没有班级的学生移动到“异常校区-未知学段-异常年级-异常班级”下，请及时处理。',
        },
        onSuccess() {
          reloadTree();
        },
      },
    ],
  };

  return <ComposeManage {...props} />;
}
