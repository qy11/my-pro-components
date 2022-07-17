// 设置
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:05

import React, { useContext, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'dayjs';
import ComposeForm from '@/components/compose-form';
import useRequest from '@/common/use-request';
import { ComposeTreeContext } from '@/components/compose-tree';
import net from '@/services/index';
import StationSetting from '../../../../components/staion';
import VisibleRange from '../../../../components/visible-range';
import Graduate from '../../../../components/graduate';
import SettingTips from '@/pages/contacts/family-school/components/setting-tips';

const { Panel } = Collapse;

export default function SettingModule() {
  const { activeKey, reloadTree } = useContext(ComposeTreeContext);
  const { currentUser } = useSelector((state) => state.user);
  const { orgId } = currentUser;
  const [graduateList, setGraduateList] = useState([]);
  const getGraduateList = () => {
    net
      .request('/backend/org/school/getGrades', {
        method: 'GET',
        data: {
          orgId,
        },
      })
      .then((data) => {
        setGraduateList(data?.data?.dataSource || []);
      });
  };

  useEffect(() => getGraduateList(), []);

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

  return (
    <>
      <Collapse activeKey="1">
        <Panel showArrow={false} header="岗位设置" key="1">
          <StationSetting dataSource={stationData} activeKey={activeKey} />
          <VisibleRange dataSource={visibleRange} activeKey={activeKey} />
        </Panel>
      </Collapse>
      <Collapse activeKey="2">
        <Panel showArrow={false} header="自动升班设置" key="2">
          <ComposeForm
            layout="horizontal"
            request={{
              url: '/backend/org/school/auto/up/dept',
              method: 'POST',
              formatter(formValue: any) {
                let autoDate = '';
                const auto = !!formValue?.auto;
                if (formValue?.autoDate) {
                  autoDate = moment(new Date(formValue?.autoDate)).format(
                    'MM-DD',
                  );
                }
                return { ...formValue, autoDate, auto };
              },
            }}
            initialValuesRequest={{
              url: '/backend/org/school/auto/up/dept',
              method: 'GET',
            }}
            controls={[
              {
                label: '开启自动升班',
                uiType: 'checkbox',
                name: 'auto',
                valuePropName: 'checked',
              },
              {
                label: '设置升班日期',
                uiType: 'dateOnly',
                name: 'autoDate',
              },
              {
                label: '年级/班级名称命名校验统计',
                uiType: 'linkText',
                name: 'linkText',
                props: {
                  text: '立即去校验',
                  router: '/contacts-v1/analysis',
                  style: {
                    fontSize: 14,
                  },
                },
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
          <SettingTips
            title="自动升班说明："
            texts={[
              '1.升班前，请将年级名称和班级名称修改为规范的命名格式，例如：一年级2018级，一年级1班',
              '2.不符合命名规范的年级或班级名称，自动升班时将无法生效',
              '3.年级名称自动升级，例如“一年级2018级”更名为“二年级2018级”',
              '4.班级名称自动升级，例如“一年级1班”更名为“二年级1班”，若使用别名，别名将不会变化',
              '5.每个自然年仅支持升班1次，若成功升班后再修改时间，将不会生效',
              '6.若为最高年级班级，名称改为“2015级”和“2015级1班”，等待管理员操作毕业',
            ]}
          />
        </Panel>
      </Collapse>
      <Collapse activeKey="3">
        <Panel showArrow={false} header="批量毕业设置" key="3">
          <Graduate
            data={graduateList}
            orgId={orgId}
            onSuccess={getGraduateList}
          />
        </Panel>
      </Collapse>
    </>
  );
}
