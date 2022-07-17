// 设置
import React, { useContext } from 'react';
import { Collapse } from 'antd';
import { ComposeTreeContext } from '@/components/compose-tree';
import ComposeForm from '@/components/compose-form';
import useRequest from '@/common/use-request';
import StationSetting from '../../../../components/staion';
import VisibleRange from '../../../../components/visible-range';

const { Panel } = Collapse;

export default function SettingModule() {
  const { activeKey, treePaths, reloadTree } = useContext(ComposeTreeContext);
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
        <Panel showArrow={false} header="部门信息" key="1">
          <ComposeForm
            {..._props}
            layout="horizontal"
            request={{
              url: '/backend/org/dept/update',
              method: 'POST',
              formatter: (data) => ({
                deptId: activeKey,
                ...data,
              }),
            }}
            initialValuesRequest={{
              url: '/backend/org/inner/dept',
              method: 'GET',
              params: { activeKey },
            }}
            controls={[
              {
                label: '部门名称',
                uiType: 'input',
                name: 'deptName',
                props: {
                  maxLength: 30,
                  placeholder: '请输入部门名称',
                },
                rules: [
                  {
                    required: true,
                    message: '请输入部门名称!',
                  },
                  {
                    max: 30,
                    message: '最大长度不超过30个字符',
                  },
                ],
              },
            ]}
            actions={[
              // {
              //   uiType: 'reset',
              //   props: {
              //     children: '重置'
              //   }
              // },
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
      <Collapse activeKey="2">
        <Panel showArrow={false} header="岗位设置" key="2">
          <StationSetting dataSource={stationData} activeKey={activeKey} />
          <VisibleRange
            dataSource={visibleRange}
            subTitle="可查看该部门的通讯录"
            activeKey={activeKey}
          />
        </Panel>
      </Collapse>
    </>
  );
}
