## test2

Demo:

```tsx
import React, { useState, useEffect } from 'react';
// import style from './index.less';
import moment from 'moment';
// console.log(import './index.less');
import ComposeManage, { ColumnItemProps } from '@/components/compose-manage';
import net from '@/services/net';
import { isCurrentUser, isIncludeCurrentUser } from '@/utils';
// console.log(isCurrentUser());
export default () => {
  window.token =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwcyUzQSUyRiUyRndld29yay5xcGljLmNuJTJGYml6bWFpbCUyRmtNT0VlV0RWOWliSHFmUXpSVGFNZFNaREN0SVkxRVJaR3BhbzdDY2ZpYVJzdXM1ZDhWMnhpY2ljRFElMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIyZWR1Y2F0aW9uJTIyJTJDJTIybG9naW5UeXBlJTIyJTNBJTIybm9ybWFsJTIyJTJDJTIybWVtYmVySWQlMjIlM0ExNDMyNTgxNDE3NzE0NjM0NzUzJTJDJTIybWVtYmVyTmFtZSUyMiUzQSUyMiVFOSVCMiU4RCVFNiU5NSU4RiUyMiUyQyUyMm1vYmlsZSUyMiUzQSUyMjE1ODU4MTMyMjg5JTIyJTJDJTIyb3JnSWQlMjIlM0EzMDAxMDAxMDAxMDAwMDA1JTJDJTIyb3JnTmFtZSUyMiUzQSUyMiVFNiU5NSU5OSVFOCU4MiVCMiVFNSVBRCVBNiVFNiVBMCVBMSVFNiVCNSU4QiVFOCVBRiU5NSUyMiUyQyUyMm9yZ1R5cGUlMjIlM0ElMjJnZW5lcmFsJTIyJTJDJTIycmVnaW9uQ29kZSUyMiUzQSUyMiUyMiUyQyUyMnNob3J0TmFtZSUyMiUzQSUyMiUyMiUyQyUyMnVzZXJJZCUyMiUzQTE0MzI1ODE0MTc3MTQ2MzQ3NTMlMkMlMjJ1c2VyTmFtZSUyMiUzQSUyMiVFOSVCMiU4RCVFNiU5NSU4RiUyMiUyQyUyMnVzZXJUeXBlJTIyJTNBJTIyZW1wbG95ZWUlMjIlN0QiLCJ1c2VyX25hbWUiOiIxNTg1ODEzMjI4OUBAbm9ybWFsIiwib3JnX2lkIjozMDAxMDAxMDAxMDAwMDA1LCJzY29wZSI6WyJ3cml0ZSJdLCJleHAiOjE2NTI3MzcyNDgsImp0aSI6IjA2YmQxNzc3LTRjMTgtNDYxZi05NjhmLWJlZGQyYTZhNDM4MSIsImNsaWVudF9pZCI6InNpdCJ9.nrNU4GtDkbVS0m1xX1wNKaE7jWoFWMbbc1gim6jYUdixt4V-xyoLeIJ4SfC3j_a1paXxzeNYIwhcO_fpeykgPaDrFKWpf5o51zMWw5EUag9yMqlC-HQJWS9-B_UMxORu7FvKVo_dhHGkqD_G-Zu3BlWsDkhKj2hXnhbRw9HijzA';
  const [orgId, setOrgId] = useState('');

  const getDate = (value) => {
    return value;
  };

  const url = {
    publicity: 'http://gateway.community-sit.easyj.top/publicity',
  };

  const [columns, setColumns] = useState([]);
  const [formColumns, setFormColumns] = useState([]);
  useEffect(() => {
    net(`${url.publicity}/web/matrice/getFormColumn`, {
      method: 'GET',
    })
      .then((res) => {
        const forms = res?.data?.dataSource.map((val) => {
          const { uiType } = val;
          if (uiType === 'upload-img') {
            val.props = {
              ...val.props,
              appCode: 'gzh-matrice',
              maxCount: 1,
              requestUrl: url.file,
            };
          }
          return { ...val };
        });
        setFormColumns(forms);
        return Promise.resolve(forms);
      })
      .then((formData) => {
        net(`${url.publicity}/web/matrice/getTableColumn`).then(({ data }) => {
          setColumns(
            data?.dataSource
              // 编辑删除
              .concat({
                name: 'operation',
                uiType: 'buttonList',
                label: '操作',
                fixed: 'right',
                width: 196,
                props: {
                  dataSource: [
                    {
                      uiType: 'link',
                      text: '查看文章信息',
                      to: getDate('${record.columnId}'),

                      onBeforeClick: (value) => {
                        history.push(
                          `/microsite/official/news/${value}?redirecUrl=${encodeURIComponent(
                            getPathnameBybase(),
                          )}`,
                        );
                        return Promise.reject();
                      },
                    },
                    {
                      uiType: 'form',
                      request: {
                        url: `${url?.publicity}/web/matrice/update`,
                        method: 'POST',
                      },
                      text: '修改',
                      dialogProps: {
                        title: '设置',
                      },
                      formItemLayout: {
                        labelCol: {
                          xs: { span: 19 },
                          sm: { span: 5 },
                        },
                        wrapperCol: {
                          xs: { span: 19 },
                          sm: { span: 19 },
                        },
                      },
                      refreshAfterRequest: true,
                      formProps: {
                        dataSource: formData,

                        initialValuesRequest: {
                          url: `${url.publicity}/web/matrice/detail`,
                          method: 'GET',
                        },
                        dataFormatAfterInit: async (values) => {
                          const { id } = values;
                          const newValue = { ...values };
                          if (id) {
                            const files = await loadFiles();
                            if (files && files.length) {
                              files.forEach((val) => {
                                const { formName, groupId } = val;
                                newValue[formName] = groupId;
                              });
                            }
                          }
                          return newValue;

                          async function loadFiles() {
                            const { data: file } = await net(
                              `${url.file}/web/file/find?appCode=gzh-matrice&bizId=${id}`,
                            );
                            return file;
                          }
                        },
                      },
                      onSuccess() {
                        // reloadTree();
                      },
                    },
                    {
                      uiType: 'request',
                      text: '删除',
                      request: {
                        url: `${url.publicity}/web/matrice/del`,
                        method: 'POST',
                      },
                      refreshAfterRequest: true,
                      confirmBeforeClick: {
                        title: '您确定要删除吗？',
                        // content: (
                        //   <Text type="secondary">
                        //     提示：分组删除后，会移除分组所属的组织。
                        //   </Text>
                        // ),
                      },
                      onSuccess() {
                        // reloadTree();
                      },
                    },
                  ],
                },
              }),
          );
        });
      });
  }, []);

  const props = {
    dataRequest: {
      url: `${url.publicity}/web/matrice/page`,
      method: 'POST',
    },
    // 表格数据排序
    sortProps: {
      // 交换接口
      // 参数：firstId，secondId，顺序不重要，后端自己判断
      swapRequest: {
        url: `${url.publicity}/web/matrice/sortNum`,
        method: 'GET',
      },
      // 置顶接口
      // 参数：id，置顶后刷新页面
      toTopRequest: {
        url: `${url.publicity}/web/matrice/toTop`,
        method: 'GET',
      },
      onOrderChange() {
        // reloadTree();
      },
    },
    filterProps: [
      {
        type: 'search',
        name: 'keyword',
        className: 'employee-search-name',
        allowClear: true,
        label: '标题',
      },
      {
        name: 'time',
        type: 'dateRangePicker',
        label: '发布时间',
      },
      {
        name: 'publishStatus',
        type: 'select',
        label: '发布状态',
        dataSource: [
          {
            label: '全部',
            value: '',
          },
          {
            label: '未发布',
            value: 2,
          },
          {
            label: '已发布',
            value: 1,
          },
        ],
      },
      {
        name: 'select111',
        type: 'cascader-select',
        label: '连级选择',
        dataSource: [
          {
            label: '选项1',
            value: 1,
            children: [
              {
                label: '选项11',
                value: 11,
              },
            ],
          },
          {
            label: '选项2',
            value: 2,
          },
          {
            label: '选项3',
            value: 3,
          },
        ],
      },
    ],
    // 添加
    buttonList: [
      {
        uiType: 'form',
        request: {
          url: `${url?.publicity}/web/matrice/add`,
          method: 'POST',
        },
        text: '添加',
        buttonProps: {
          type: 'primary',
        },
        dialogProps: {
          title: '添加',
        },

        formItemLayout: {
          labelCol: {
            xs: { span: 19 },
            sm: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 19 },
            sm: { span: 19 },
          },
        },
        formProps: {
          dataSource: formColumns,

          value: {
            openStatus: true,
          },
        },
      },
    ],
    tableProps: {
      primaryKey: 'id',
      otherKey: 'id',
      columns,
      checkable: true,
      onSelectChange: (a, b) => {
        console.log(a, b);
      },
    },
  };

  return <ComposeManage {...props} />;
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
