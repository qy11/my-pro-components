// 自定义校区
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:21

import React from 'react';
import ComposeTab, {
  PropTypes as ComposeTabProps,
} from '@/components/compose-tab';
import routerConfig from './router.config';
import composeHOC from '@/components/compose-hoc';

export default composeHOC(function CustomCampusManage() {
  const tabProps: ComposeTabProps = {
    dataSource: [
      { label: '列表', key: 'list' },
      { label: '校区设置', key: 'setting' },
    ],
    routerConfig,
    defaultActiveKey: 'list',
  };

  return <ComposeTab {...tabProps} />;
});
