import React, { useContext } from 'react';
import { Collapse } from 'antd';
import { ComposeTreeContext } from '@/components/compose-tree';
import ComposeForm from '@/components/compose-form';
import useRequest from '@/common/use-request';
import StationKeSetting from '../../../../components/staion-ke';
import VisibleRange from '../../../../components/visible-range';

const { Panel } = Collapse;

export default function SettingModule() {
  const { activeKey, reloadTree } = useContext(ComposeTreeContext);
  const [stationData] = useRequest(
    '/user/customer/class/user/list',
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

  const _props: any = {
    labelCol: {
      xs: { span: 19 },
      sm: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  return (
    <>
      <Collapse activeKey="1">
        <Panel showArrow={false} header="岗位设置" key="1">
          <StationKeSetting dataSource={stationData} activeKey={activeKey} />
          <VisibleRange
            dataSource={visibleRange}
            subTitle="其他可查看该班级的通讯录"
            activeKey={activeKey}
          />
        </Panel>
      </Collapse>

      <Collapse activeKey="2">
        <Panel showArrow={false} header="班级设置" key="2">
          <ComposeForm
            {..._props}
            layout="horizontal"
            request={{
              url: '/backend/org/dept/update',
              method: 'POST',
              params: { deptId: activeKey },
            }}
            initialValuesRequest={{
              url: '/backend/org/inner/dept',
              method: 'GET',
              params: {
                activeKey,
              },
            }}
            controls={[
              {
                label: '班级名称',
                uiType: 'input',
                name: 'deptName',
                props: {
                  maxLength: 30,
                  placeholder: '请输入班级名称',
                },
                rules: [
                  {
                    max: 30,
                    message: '最大长度不超过30个字符',
                  },
                ],
              },
            ]}
            actions={[
              {
                uiType: 'submit',
                props: {
                  children: '保存',
                  type: 'primary',
                },
              },
            ]}
            onFinish={() => reloadTree()}
          />
        </Panel>
      </Collapse>
    </>
  );
}
