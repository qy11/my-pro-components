// 学校通讯录 ROOT
import React from 'react';
import ComposeTab, {
  PropTypes as ComposeTabProps,
} from '@/components/compose-tab';
import routerConfig from './router.config';

export default function SchoolRootManage() {
  console.log('时来了');
  const tabProps: ComposeTabProps = {
    dataSource: [
      { label: '列表', key: 'list' },
      { label: '学校设置', key: 'setting' },
    ],
    routerConfig,
    defaultActiveKey: 'list',
  };

  return <ComposeTab {...tabProps} routerConfig={routerConfig} />;
}
