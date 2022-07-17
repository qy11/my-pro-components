import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Collapse, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import ComposeForm from '@/components/compose-form';
import { ComposeTreeContext } from '@/components/compose-tree';
import useRequest from '@/common/use-request';
import SettingTips from '@/pages/contacts/family-school/components/setting-tips';
import StationSetting from '../../../../components/staion';
import VisibleRange from '../../../../components/visible-range';
import './index.less';

const { Panel } = Collapse;

export default function SettingModule() {
  const { activeKey, treePaths, reloadTree } = useContext(ComposeTreeContext);
  const [enrollmentYear, setEnrollmentYear] = useState([]);
  const [customCampus, setCustomCampus] = useState(false);

  const [stationData] = useRequest(
    '/backend/user/dept/station/user/list',
    {
      method: 'GET',
      data: {
        deptId: activeKey,
      },
    },
    (data) => data?.dataSource || [],
  );

  const [visibleRange] = useRequest(
    '/dept/customer/visible/range/setting/users',
    {
      method: 'GET',
      data: {
        deptId: activeKey,
      },
    },
    (data) => data || [],
  );

  useEffect(() => {
    const year = new Date().getFullYear();
    const ret = [];
    // 年级是根据每年的八月份开始当前学年，故将月份大于等于八月才出现当前年
    // let i = (new Date().getMonth() + 1) <= 7 ? 1 : 0;
    // for (; i <= 9; i++) {
    //   ret.push({ label: (Number(year) - i).toString(), value: (Number(year) - i).toString() });
    // }

    // 从当前年份开始
    for (let i = 0; i <= 9; i++) {
      ret.push({
        label: (Number(year) - i).toString(),
        value: (Number(year) - i).toString(),
      });
    }
    setEnrollmentYear(ret);
  }, []);

  const onEnableSwitcherChange = useCallback(
    (e: CheckboxChangeEvent) => {
      setCustomCampus(e.target.checked);
    },
    [customCampus],
  );

  const handleCustomDom = () => {
    return customCampus
      ? [
          {
            uiType: 'input',
            name: 'customDeptName',
            label: '年级名称',
            className: 'custom-node-name',
            props: {
              maxLength: 30,
              placeholder: '请输入年级名称',
            },
            rules: [
              { required: true, message: '请输入年级名称' },
              { max: 30, message: '最大长度不超过30个字符' },
            ],
          },
          {
            uiType: 'select',
            name: 'schoolYear',
            label: '入学年份',
            props: {
              placeholder: '请选择入学年份',
              dataSource: enrollmentYear,
            },
            rules: [{ required: true, message: '请选择入学年份' }],
          },
        ]
      : [
          {
            label: '年级名称',
            uiType: 'select',
            name: 'deptName',
            rules: [
              {
                required: true,
                message: '请选择年级',
              },
            ],
            source: {
              url: '/backend/org/school/grade/name',
              params: { id: treePaths[treePaths.length - 2] },
            },
          },
        ];
  };

  return (
    <div className="base-gtade-setting">
      <Collapse activeKey="1">
        <Panel showArrow={false} header="年级信息" key="1">
          <div className="base-gtade-setting-switcher">
            <Checkbox onChange={onEnableSwitcherChange}>
              开启自定义年级设置
            </Checkbox>
          </div>
          <ComposeForm
            request={{
              url: '/backend/org/dept/update',
              method: 'POST',
              formatter: (data) => ({
                deptId: activeKey,
                deptName: customCampus ? data.customDeptName : data.deptName,
                ...data,
              }),
            }}
            initialValuesRequest={{
              url: '/backend/org/inner/dept',
              method: 'GET',
              params: { activeKey },
            }}
            dataFormatAfterInit={({ deptName, ...formValue }) => ({
              ...formValue,
              deptName,
              customDeptName: deptName,
            })}
            controls={handleCustomDom()}
            actions={[
              {
                uiType: 'confirmSubmit',
                props: {
                  title: '年级信息',
                  content:
                    '调整年级名称后，会同步调整该年级的入学年份，请确认选择调整的年级名称是否正确？',
                  okText: '确定',
                  cancelText: '取消',
                  btnProps: {
                    children: '保存',
                    type: 'primary',
                  },
                },
              },
            ]}
            onFinish={() => reloadTree()}
          />
          {customCampus && (
            <SettingTips
              title="年级设置说明："
              texts={[
                '1.请将年级名称修改为规范的命名格式，例如：一年级2018级。',
                '2.年级名称修改为不规范的命名格式，将会导致升班失败，需手动完成升班操作。',
              ]}
            />
          )}
        </Panel>
      </Collapse>
      <Collapse activeKey="2">
        <Panel showArrow={false} header="岗位设置" key="2">
          <StationSetting dataSource={stationData} activeKey={activeKey} />
          <VisibleRange
            dataSource={visibleRange}
            subTitle="可查看该年级的通讯录"
            activeKey={activeKey}
          />
        </Panel>
      </Collapse>
    </div>
  );
}
