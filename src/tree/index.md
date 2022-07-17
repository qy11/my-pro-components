## test

Demo:

```tsx
import React from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ComposeTab from '@/components/compose-tab';
import ComposeTree from '@/components/compose-tree';
import { Provider } from 'react-redux';
import { Link } from 'umi';
import test from './modules/school-root';
import configStore from '../store.js';
const store = configStore();
export default ({ title }: { title: string }) => {
  const TreeComponent = () => (
    <ComposeTree
      request={{
        getTreeNodes: {
          url: '/data/get-tree-nodes.json',
          method: 'GET',
          params: { foo: '12322' },
        },
        searchTreeNodes: {
          url: '/data/search-tree.json',
          method: 'GET',
          params: { foo: '123' },
        },
      }}
      // showSearch={false}
      routerConfig={[
        {
          path: 'base-period1', // 校区设置
          Com: () => React.lazy(() => import('@/tree/modules/base-period')),
        },
        {
          path: 'base-campus2', // 校区设置
          Com: () => React.lazy(() => import('@/tree/modules/base-campus')),
        },
        // {
        //   path: 'base-campus', // 校区设置
        //   Com: <div>33</div>,
        // },
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
        isTree: true,
        Com: TreeComponent,
      },
      {
        path: 'department',
        Com: () => <div>department module</div>,
      },
    ],
  };

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/*" component={() => <ComposeTab {...props} />} />
        </Switch>
      </Router>
    </Provider>
  );
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
