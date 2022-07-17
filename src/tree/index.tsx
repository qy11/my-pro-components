import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ComposeTab from '@/components/compose-tab';
import ComposeTree from '@/components/compose-tree';
// import { Provider } from 'react-redux';
// import configStore from '../store.js';
// import from './modules/school-root/index'
// const store = configStore();
export default ({ title }: { title: string }) => {
  const TreeComponent = () => (
    <ComposeTree
      request={{
        getTreeNodes: {
          url: '/data/get-tree-nodes.json',
          method: 'GET',
          params: { foo: '123233' },
        },
        searchTreeNodes: {
          url: '/data/search-tree.json',
          method: 'GET',
          params: { foo: '123' },
        },
      }}
      // rootIconType="orgRoot"
      routerConfig={[
        {
          path: 'school-root',
          Com: <div>3333</div>,
        },
        {
          path: 'base-campus', // 校区设置
          Com: React.lazy(() => import('./modules/base-campus')),
        },
        {
          path: 'base-period', // 学段设置
          Com: React.lazy(() => import('./modules/base-period')),
        },
        {
          path: 'base-grade', // 年级设置
          Com: React.lazy(() => import('./modules/base-grade')),
        },
        {
          path: 'base-class', // 班级设置
          Com: React.lazy(() => import('./modules/base-class')),
        },
        {
          path: 'custom-campus', // 自定义-校区设置
          Com: React.lazy(() => import('./modules/custom-campus')),
        },
        {
          path: 'custom-dept', // 自定义-部门设置
          Com: React.lazy(() => import('./modules/custom-dept')),
        },
        {
          path: 'custom-class', // 自定义-班级设置
          Com: React.lazy(() => import('./modules/custom-class')),
        },
      ]}
    />
  );

  const props = {
    request: {
      getTabDataSource: {
        url: '/data/get-tab-data-source.json',
        method: 'GET',
        params: { foo: '123' },
      },
    },
    onChange: () => {},
    defaultActiveKey: 'people',
    /* 直接 routerConfig 为 module 列表，path 与 tab 的 dataSource 的 key 保持一致，tab 改变时，展示相应的 module */
    routerConfig: [
      {
        path: 'people',
        // isTree: true,
        // Com: TreeComponent,
        Com: <div>3333</div>,
      },
      {
        path: 'department',
        Com: () => <div>department module222</div>,
      },
    ],
  };

  return <div>{TreeComponent}</div>;
};
