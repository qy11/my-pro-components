// 基础年级-班级列表
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:02

import React, { useContext, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ComposeTreeContext } from '@/components/compose-tree';
import ComposeManage, { ComposeManageProps } from '@/components/compose-manage';
import Net from '@/services';
import './index.less';

// const classNameList: { label: string; value: string }[] = [];
// Array.from(new Array(101).keys()).map(item => {
//   classNameList.push({ label: `${item}班`, value: `${item}班` });
// });
// classNameList.shift();

export default withRouter(function ListModule({
  match,
}: RouteComponentProps<{
  treePath: string;
}>) {
  const { activeKey, treePaths, generateUrlByTreePaths, reloadTree } =
    useContext(ComposeTreeContext);

  const { path } = match;
  const [className, setClassName] = useState('');
  const [deptName, setDeptName] = useState('');

  useEffect(() => {
    // 取左侧选择节点名称
    Net.request('/backend/org/inner/dept', {
      method: 'GET',
      data: { activeKey },
    }).then(({ data: { formValue } }) => {
      const deptName = formValue?.deptName.match(/[\u4e00-\u9fa5]{2,}/g);
      setDeptName(deptName?.length && deptName[0]);
    });
  }, []);

  const manageProps: ComposeManageProps = {
    dataRequest: {
      url: '/backend/org/school/sub/node',
      params: { activityKey: activeKey },
    },
    tableProps: {
      primaryKey: 'key',
      columns: [
        { name: 'label', label: '名称' },
        {
          name: 'totalStudent',
          label: '学生人数',
          help: '该部门及下属部门的学生成员的人数统计之和',
        },
        {
          name: 'totalParent',
          label: '家长人数',
          help: '该部门及下属部门的学生成员所关联的家长人数统计之和',
        },
        {
          name: 'totalTeacher',
          label: '关联老师',
          help: '该部门及下属部门的所任职岗位的员工人数统计之和',
        },
        {
          label: '操作',
          uiType: 'buttonList',
          props: {
            dataSource: [
              {
                text: '设置',
                uiType: 'link',
                to: generateUrlByTreePaths(
                  [...treePaths, '${record.key}'],
                  path.replace(
                    /\/:treePath(\/.*)$/,
                    '/:treePath/base-class/setting',
                  ),
                ),
              },
              {
                uiType: 'request',
                text: '删除',
                request: {
                  url: '/backend/org/inner/batch/dept',
                  method: 'PUT',
                },
                refreshAfterRequest: true,
                confirmBeforeClick: {
                  title:
                    '您确定要删除 ${record.label} ，并清空该班级下的所有信息吗？',
                },
                onSuccess() {
                  reloadTree();
                },
              },
            ],
          },
        },
      ],
      rowSelection: {
        type: 'checkbox',
      },
    },
    buttonList: [
      {
        uiType: 'form',
        text: '+ 添加班级',
        dialogProps: { title: '添加班级' },
        buttonProps: { type: 'primary' },
        request: {
          url: '/backend/org/school/learn/class/dept',
          method: 'POST',
          params: { nodeId: activeKey },
        },
        formItemLayout: {
          labelCol: {
            xs: { span: 19 },
            sm: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 18 },
            sm: { span: 18 },
          },
        },
        formProps: {
          onValuesChange: (changedValues: any) => {
            if (changedValues) {
              setClassName(changedValues?.className);
            }
          },
          dataSource: [
            {
              uiType: 'input',
              label: '班级名称',
              name: 'className',
              className: 'base-grade-list-className',
              // props: {
              //   dataSource: classNameList
              // },
              extra: `班级名称将展示为“${!deptName ? '' : deptName}${
                className || '（班级名称）'
              }”`,
              props: {
                maxLength: 30,
                placeholder: '请输入班级名称',
              },
              rules: [
                { required: true, message: '请输入班级名称' },
                { max: 30, message: '最多可输入30个字符' },
              ],
            },
            {
              uiType: 'input',
              label: '班级别名',
              name: 'nickName',
              tooltip:
                '班级别名设置后，会在班级名称后面展示，同时批量导入时也可以作为“所属班级”匹配导入。',
              props: {
                maxLength: 30,
                placeholder: '请输入班级别名',
              },
              rules: [{ max: 30, message: '最多可输入30个字符' }],
            },
          ],
        },
        onSuccess() {
          reloadTree();
        },
      },
      {
        uiType: 'request',
        request: {
          url: '/backend/org/inner/batch/dept',
          method: 'PUT',
          params: {
            deptId: activeKey,
          },
        },
        isBatch: true,
        text: '批量删除',
        confirmBeforeClick: {
          title: '操作确认',
          content: '确认要将选中的班级删除，并清空该班级下的所有信息吗？',
        },
        onSuccess() {
          reloadTree();
        },
      },
    ],
    sortProps: {
      swapRequest: { url: '/backend/org/inner/sorNum' },
      toTopRequest: { url: '/backend/org/inner/toTop' },
      onOrderChange() {
        reloadTree();
      },
    },
  };

  return <ComposeManage {...manageProps} />;
});
