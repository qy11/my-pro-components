// 自定义班级
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:22

import React from 'react';
import ComposeTab, {
  PropTypes as ComposeTabProps,
} from '@/components/compose-tab';
import routerConfig from './router.config';
import composeHOC from '@/components/compose-hoc';

export default composeHOC(function CustomClassManage() {
  const tabProps: ComposeTabProps = {
    dataSource: [
      { label: '列表', key: 'list' },
      { label: '班级设置', key: 'setting' },
    ],
    routerConfig,
    defaultActiveKey: 'list',
  };

  return <ComposeTab {...tabProps} />;
});
