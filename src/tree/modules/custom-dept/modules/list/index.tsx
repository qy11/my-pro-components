// 自定义学区-部门列表
import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ComposeTreeContext } from '@/components/compose-tree';
import ComposeManage, { ComposeManageProps } from '@/components/compose-manage';

export default withRouter(function ListModule({
  match,
}: RouteComponentProps<{
  treePath: string;
}>) {
  const { activeKey, treePaths, generateUrlByTreePaths, reloadTree } =
    useContext(ComposeTreeContext);
  const { path } = match;
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
                    '/:treePath/custom-class/setting',
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
                    '您确定要删除 ${record.label} ，并清空该学段下的所有信息吗？',
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
        text: '+ 添加部门/班级',
        dialogProps: { title: '添加部门/班级' },
        buttonProps: { type: 'primary' },
        request: {
          url: '/backend/org/school/custom/dept',
          method: 'POST',
          params: { parentId: activeKey },
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
          dataSource: [
            {
              uiType: 'input',
              label: '部门',
              name: 'deptName',
              rules: [
                {
                  required: true,
                  message: '请输入名称',
                },
                {
                  max: 30,
                  message: '最大长度不超过30个字符',
                },
              ],
              props: {
                maxLength: 30,
                placeholder: '请输入名称',
              },
            },
            {
              uiType: 'select',
              label: '所属部门类型',
              name: 'deptType',
              props: {
                dataSource: [
                  { label: '子部门', value: 'custom_dept' },
                  { label: '班级', value: 'custom_class' },
                ],
                rules: [{ required: true, message: '请选择类型' }],
              },
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
          content: '确认要将选中的部门删除，并清空该部门下的所有信息吗？',
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
