// 基础校区-学段列表
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:02

import React, { useContext, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ComposeTreeContext } from '@/components/compose-tree';
import useRequest from '@/common/use-request';
import ComposeManage, { ComposeManageProps } from '@/components/compose-manage';

// const classNumData: { label: number; value: number }[] = [];
// Array.from(new Array(101).keys()).map(item => {
//   classNumData.push({ label: item, value: item });
// });
// classNumData.shift();

// const gradeNumData: { label: number; value: number }[] = [];
// Array.from(new Array(10).keys()).map(item => {
//   gradeNumData.push({ label: item, value: item });
// });
// gradeNumData.shift();
export default withRouter(function ListModule({
  match,
}: RouteComponentProps<{
  treePath: string;
}>) {
  const { activeKey, treePaths, generateUrlByTreePaths, reloadTree } =
    useContext(ComposeTreeContext);
  const [nodeType, setNodeType] = useState(null);
  const [gradeNumData, setGradeNumData] = useState([]);
  const [classNumData, setClassNumData] = useState([]);
  // 根据学校类型联动学段
  // TODO: 根据实际情况调整
  useEffect(() => {
    let gradeCount = 0;
    const classCount = 100;
    switch (nodeType) {
      case 'kindergarten_period':
        gradeCount = 4;
        break;
      case 'primary_period':
      case 'junior_period':
      case 'senior_period':
        gradeCount = 9;
        break;
      default:
    }
    setGradeNumData(
      new Array(gradeCount)
        .fill(0)
        .map((_, index) => ({ label: index + 1, value: index + 1 })),
    );
    setClassNumData(
      new Array(classCount)
        .fill(0)
        .map((_, index) => ({ label: index + 1, value: index + 1 })),
    );
  }, [nodeType]);
  const { path } = match;
  const [campusOptions] = useRequest(
    '/backend/org/school/science/type',
    {
      method: 'GET',
    },
    (data) => data?.dataSource || [],
  );

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
                    '/:treePath/base-period/setting',
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
        text: '+ 添加学段',
        dialogProps: { title: '添加学段' },
        buttonProps: { type: 'primary' },
        request: {
          url: '/backend/org/school/learn/level/dept',
          method: 'POST',
          params: { nodeId: activeKey },
        },
        formItemLayout: {
          labelCol: {
            xs: { span: 17 },
            sm: { span: 6 },
          },
          wrapperCol: {
            xs: { span: 17 },
            sm: { span: 17 },
          },
        },
        formProps: {
          dataSource: [
            {
              uiType: 'select',
              name: 'nodeType',
              label: '请选择学段类型',
              props: {
                dataSource: campusOptions,
                rules: [{ required: true, message: '请选择学段类型' }],
              },
            },
            {
              uiType: 'select',
              name: 'gradeNum',
              label: '请选择年级数量',
              props: {
                // TODO 根据选择的学段动态改变选项
                dataSource: gradeNumData,
                rules: [{ required: true, message: '请选择年级数量' }],
              },
            },
            {
              uiType: 'select', // TODO 这里自定义逻辑太多了，需要自己写自定义组件
              name: 'classNum',
              label: '请选择班级数量',
              props: {
                // TODO 根据选择的学段动态改变选项
                dataSource: classNumData,
                rules: [{ required: true, message: '请选择班级数量' }],
              },
            },
          ],
          value: {
            gradeNum:
              gradeNumData.length > 0
                ? nodeType === 'primary_period'
                  ? 6
                  : 3
                : null,
          },
          onValuesChange(_, formValue) {
            setNodeType(formValue.nodeType);
          },
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
        },
        text: '批量删除',
        isBatch: true,
        confirmBeforeClick: {
          title: '操作确认',
          content: '确认要将选中的学段删除，并清空该学段下的所有信息吗？',
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
