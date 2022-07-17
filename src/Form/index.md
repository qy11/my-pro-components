## Foo3f3

Demo:

```tsx
import React from 'react';
import ComposeForm from '@/components/compose-form';
import EventEmitter from '@/components/compose-form/events';

export default () => {
  // const eventEmitter = useRef(new EventEmitter());
  window.token =
    'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2luZm8iOiIlN0IlMjJhdmF0YXIlMjIlM0ElMjJodHRwJTNBJTJGJTJGd2V3b3JrLnFwaWMuY24lMkZiaXptYWlsJTJGSFFLYU83WGVOd0F4R3czb3ZTNTU2Z2Z6d1J6WTlUTzdOSlppYzJDcWRLVFFpYTdEMXlVM0ZnVXclMkYwJTIyJTJDJTIyaW5kdXN0cnlUeXBlJTIyJTNBJTIybXl0eGwlMjIlMkMlMjJsb2dpblR5cGUlMjIlM0ElMjJub3JtYWwlMjIlMkMlMjJtZW1iZXJJZCUyMiUzQTE0MzcyNTM0NTE5NDAyOTQ4MTIlMkMlMjJtZW1iZXJOYW1lJTIyJTNBJTIyJUU2JTlEJThFJUU1JUJCJUJBJUU1JUJEJUFDJTIyJTJDJTIybW9iaWxlJTIyJTNBJTIyMTM2NTcwODY0NTElMjIlMkMlMjJvcmdJZCUyMiUzQTMwMDEwMDEwMDEwMDAwMDYlMkMlMjJvcmdOYW1lJTIyJTNBJTIyJUU2JTlEJUFEJUU1JUI3JTlFJUU2JUFEJUEzJUU1JTlEJTlCJUU3JUE3JTkxJUU2JThBJTgwJUU2JTlDJTg5JUU5JTk5JTkwJUU1JTg1JUFDJUU1JThGJUI4JUVGJUJDJTg4JUU2JUFGJThEJUU1JUE5JUI0JUVGJUJDJTg5JTIyJTJDJTIyb3JnVHlwZSUyMiUzQSUyMmdlbmVyYWwlMjIlMkMlMjJyZWdpb25Db2RlJTIyJTNBJTIyMzMwMTAyMDAwMDAwMDAwMDAwJTIyJTJDJTIyc2hvcnROYW1lJTIyJTNBJTIyJUU2JUFEJUEzJUU1JTlEJTlCJUU3JUE3JTkxJUU2JThBJTgwJTIyJTJDJTIydXNlcklkJTIyJTNBMTQzNzI1MzQ1MTk0MDI5NDgxMiUyQyUyMnVzZXJOYW1lJTIyJTNBJTIyJUU2JTlEJThFJUU1JUJCJUJBJUU1JUJEJUFDJTIyJTJDJTIydXNlclR5cGUlMjIlM0ElMjJlbXBsb3llZSUyMiU3RCIsInVzZXJfbmFtZSI6IjMwMDEwMDEwMDEwMDAwMDZAMTQzNzI1MzQ1MTk0MDI5NDgxMkBlbXBsb3llZUBub3JtYWwiLCJvcmdfaWQiOjMwMDEwMDEwMDEwMDAwMDYsInNjb3BlIjpbIndyaXRlIl0sImV4cCI6MTY1MjkwMjI4MCwianRpIjoiNmRhYWY2YjUtMDU4My00ZDZhLWFkMTktNjU4M2UyMzM0YmM0IiwiY2xpZW50X2lkIjoic2l0In0.BPkI-CCHxLBORML3aCQjE5K-RADMdxSyL5I_l-bb-Psa6uisEKrNvsd0JKpWleLz5hbIc5GMBcH2DpxsbmQoSlETh2U6nPA1KdIu2WgDXkw-PXRqEY3K2xAfwrAy6vB4AYM9iBS97SesrNuuEE5yQmTKwX-ckHKdqqdiKDU8v7k';
  const dataForm = [
    {
      label: '附件',
      name: 'test',
      uiType: 'upload-file',
      props: {
        appCode: 'mico-site',
        maxCount: 1,
        tips: '这是一段文本提示',
      },
    },
    {
      label: '图片',
      name: 'text',
      uiType: 'upload-img',
      props: {
        appCode: 'mico-site',
        tips: '这是一段文本提示',
        // disabled: true,
      },
    },
    {
      label: '富文本',
      name: 'rich',
      uiType: 'rich-text',
      props: {
        appCode: 'mico-site',
        // showMenu: true,
        tips: '这是一段文本提示',
        // disabled: true,
      },
    },
    {
      uiType: 'select',
      label: '单选',
      name: 'select',
      props: {
        showSearch: true,
        disabled: true,
        dataSource: [
          {
            label: '单选2',
            value: 2,
          },
          {
            label: '单选1',
            value: 1,
          },
          {
            label: '单选3',
            value: 3,
          },
          {
            label: '单选4',
            value: 4,
          },
        ],
      },
    },
    {
      uiType: 'cascader-select',
      label: '单选',
      name: 'cascader-select',
      props: {
        dataSource: [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      uiType: 'date-range-picker',
      label: '时间区间',
      name: 'range-picker',
    },
    {
      uiType: 'date-picker',
      label: '时间区间',
      name: 'date-picker',
    },
    {
      uiType: 'switch',
      label: '开关',
      name: 'switch',
      props: {
        checkedChildren: '开启',
        unCheckedChildren: '关闭',
      },
    },
    {
      label: '单选',
      name: 'radio',
      uiType: 'radio',
      props: {
        dataSource: [
          {
            label: '单选1',
            value: 1,
          },
          {
            label: '单选1',
            value: 2,
          },
          {
            label: '单选1',
            value: 3,
          },
          {
            label: '单选1',
            value: 4,
          },
        ],
      },
    },
    // {
    //   label: '标题',
    //   name: 'input',
    //   uiType: 'input',
    //   props: {
    //     tips: '这是一段文本提示',
    //     placeholder: 'Basic usage',
    //     maxLength: 10,
    //     // showCount: true,
    //     // maxLength: 200,
    //     // bordered: false,
    //     // autoSize: { minRows: 4, maxRows: 4 },
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: '请上传',
    //     },
    //     {
    //       max: 10,
    //       message: '不得超过最大值',
    //     },
    //   ],
    // },
    {
      label: '标题',
      name: 'title',
      uiType: 'textarea',
      props: {
        placeholder: 'Basic usage',
        type: 'aa',
        // showCount: true,
        // maxLength: 200,
        // bordered: false,
        // autoSize: { minRows: 4, maxRows: 4 },
      },
    },
    {
      label: 'checkboxGroup',
      name: 'checkboxGroup',
      uiType: 'checkboxGroup',
      props: {
        placeholder: 'Basic usage',
        dataSource: [
          {
            label: '单选1',
            value: 1,
          },
          {
            label: '单选1',
            value: 2,
          },
          {
            label: '单选1',
            value: 3,
          },
          {
            label: '单选1',
            value: 4,
          },
        ],
        // showCount: true,
        // maxLength: 200,
        // bordered: false,
        // autoSize: { minRows: 4, maxRows: 4 },
      },
    },
    // {
    //   label: '图片',
    //   name: 'test2',
    //   uiType: 'upload-img',
    //   props: {
    //     appCode: 'mico-site',
    //     tips: '这是一段文本提示',
    //     disabled: true,
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: '请上传',
    //     },
    //   ],
    // },
    {
      name: 'deviceId2',
      uiType: 'selectTag',
      label: '标签',
      rules: [
        {
          message: '请选择关联设备',
          required: false,
        },
      ],
      props: {
        confirmContent: 'xx',
        wrapperKey: 'tagInfoList',
        selectUserProps: {
          showTabList: ['tagContacts'],
          userOrigin: 'http://gateway.community-sit.easyj.top/user-center',
          unCheckableNodeType: ['ORG'],
          // isSaveSelectSignature: true,
          // isSaveSelectSignature: true,
          // selectSignature: '3001001001000006-cb94f644c7384e9db6bef86fa1228758',
          // disabled: true,
          // multiple: true,
          noTagLabelPermission: true,
          isSaveSelectSignature: true,
          // selectSignature: '3001001001000006-98c3565effe34673880635157cefbb0a',
          // disabled: true,
          multiple: false,
          requestParams: {
            selectTypeList: ['user'],
            noTagLabelPermission: true,
          },

          selectType: 'dept',
          searchPlaceholder: '请输入设备编码进行搜素',
          dialogProps: {
            title: '选告警设备',
          },
        },
      },
    },
    {
      name: 'deviceId',
      uiType: 'selectTag',
      label: '标签2',
      rules: [
        {
          message: '请选择关联设备1',
          required: false,
        },
      ],
      props: {
        confirmContent: 'xx',
        wrapperKey: 'tagInfoList',
        selectUserProps: {
          showTabList: ['tagContacts'],
          userOrigin: 'http://gateway.community-sit.easyj.top/user-center',
          unCheckableNodeType: ['ORG'],
          // isSaveSelectSignature: true,
          isSaveSelectSignature: true,
          noTagLabelPermission: true,
          // selectSignature: '3001001001000006-98c3565effe34673880635157cefbb0a',
          // disabled: true,
          multiple: false,
          requestParams: {
            selectTypeList: ['group_tag'],
            noTagLabelPermission: true,
          },

          selectType: 'dept',
          searchPlaceholder: '请输入设备编码进行搜素',
          dialogProps: {
            title: '选告警设备',
          },
        },
      },
    },
    {
      label: '图片',
      name: 'test4',
      uiType: 'upload-img',
      props: {
        appCode: 'mico-site',
        maxCount: 9,
        disabled: true,
        tips: '这是一段文本提示',
      },
    },
    // {
    //   label: '图片',
    //   name: 'test5',
    //   uiType: 'date-picker',
    //   props: {
    //     appCode: 'mico-site',
    //     maxCount: 2,
    //     tips: '这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示这是一段文本提示',
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: '请上传',
    //     },
    //   ],
    // },
    // {
    //   label: '联级选择',
    //   name: 'cascader-select',
    //   uiType: 'cascader-select',
    //   props: {
    //     dataSource: [
    //       {
    //         label: '1',
    //         value: '1',
    //         children: null
    //       },
    //     ],
    //   },
    // },
    // {
    //   label: '时间',
    //   name: 'test3',
    //   uiType: 'date-range-picker',
    //   props: {
    //     appCode: 'mico-site',
    //     showTime: true,
    //     dateFormat: 'YYYY-MM-DD',
    //     tips: '这是一段文本提示',
    //   },
    // },
    // {
    //   label: '时间',
    //   name: 'test4',
    //   uiType: 'time-range-picker',
    //   props: {
    //     tips: '这是一段文本提示',
    //   },
    // },
    // {
    //   label: '时间',
    //   name: 'test5',
    //   uiType: 'time-range-picker',
    //   props: {
    //     appCode: 'mico-site',
    //   },
    // },
    // {
    //   label: '审批负责人',
    //   uiType: 'selectUser',
    //   name: 'deptIds',
    //   props: {
    //     selectUserProps: {
    //       showTabList: ['innerContacts'],
    //       requestParams: {
    //         selectTypeList: ['user'],
    //         // orgId: '3001001001000006',
    //       },
    //       onlyLeafCheckable: true,
    //       disabled: true,
    //       selectType: 'user',
    //       multiple: true,
    //       dialogProps: { title: '选人组件' },
    //       searchPlaceholder: '请搜索姓名，手机号',
    //       isSaveSelectSignature: true,
    //     },
    //   },
    // },
  ];
  const props = {
    title: '添加',
    controls: dataForm,
    initialValues: {
      // test2: '1509105356252717058',
      // deviceId: [
      //   {
      //     noTagLabelPermission: true,
      //     id: '1526090713693085697',
      //     name: '客户群系统标签1',
      //     type: 'TAG',
      //     contactType: 9,
      //     orgId: null,
      //     orgName: null,
      //     deptId: null,
      //     extendedAttribute: null,
      //     childDelete: true,
      //     selectType: 'checkbox',
      //     parentId: null,
      //   },
      //   {
      //     noTagLabelPermission: true,
      //     id: '1526091148898263042',
      //     name: '客户群系统标签5',
      //     type: 'TAG',
      //     contactType: 9,
      //     orgId: null,
      //     orgName: null,
      //     deptId: null,
      //     extendedAttribute: null,
      //     childDelete: true,
      //     selectType: 'checkbox',
      //     parentId: null,
      //   },
      // ],

      // test4: '1509105356252717058',
      // select: 1,
      // checkboxGroup: 1,
      deptIds: [
        {
          name: '',
          id: '',
        },
      ],
    },
    request: {
      url: 'https://baidu.com',
    },
    actions: [
      {
        uiType: 'submit',
        props: {
          customLoading: false,
          customDisabled: true,
          type: 'primary',
          children: '提交',
          'data-submit-action': 'add',
        },
      },
    ],
    onFinish: (form, currentTarget) => {},
  };
  return <ComposeForm {...props} />;
};
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
