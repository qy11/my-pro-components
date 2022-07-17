// 自定义部门
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:22

import React from 'react';
import ComposeTab, {
  PropTypes as ComposeTabProps,
} from '@/components/compose-tab';
import ListModule from './modules/list';
import SettingModule from './modules/setting';
import routerConfig from './router.config';
import composeHOC from '@/components/compose-hoc';

export default composeHOC(function CustomDeptManage() {
  const tabProps: ComposeTabProps = {
    dataSource: [
      { label: '列表', key: 'list' },
      { label: '部门设置', key: 'setting' },
    ],
    routerConfig,
    defaultActiveKey: 'list',
  };

  return (
    <ComposeTab {...tabProps}>
      <ListModule key="list" />
      <SettingModule key="setting" />
    </ComposeTab>
  );
});
