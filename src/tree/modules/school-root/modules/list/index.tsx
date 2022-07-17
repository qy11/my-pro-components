// ROOT 列表
// @author Pluto <huarse@gmail.com>
// @create 2020/06/22 17:02

import React, { useContext } from 'react';
import { Typography } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ComposeManage, { ComposeManageProps } from '@/components/compose-manage';
import { ComposeTreeContext } from '@/components/compose-tree';
import useRequest from '@/common/use-request';
// import moment from 'dayjs';
const { Text } = Typography;
export default withRouter(function ListModule({
  match,
}: RouteComponentProps<{
  treePath: string;
}>) {
  // const [ refreshTime, setRefreshTime ] = useState('');
  const { activeKey, treePaths, generateUrlByTreePaths, reloadTree } =
    useContext(ComposeTreeContext);
  const { path } = match;
  const [campusOptions] = useRequest(
    '/backend/org/school/custom/campus/type',
    {
      method: 'GET',
    },
    (data) => data?.dataSource || [],
  );

  const manageProps: ComposeManageProps = {
    dataRequest: {
      url: '/backend/org/school/sub/node',
      params: {
        activityKey: activeKey,
      },
    },
    alertProps: treePaths?.length === 1 && {
      message: '提示：当前班级人数和关注数据每天凌晨自动更新一次。', // + refreshTime,
      hasRefresh: false,
      showIcon: true,
      type: 'info',
    },
    // onRequestSuccess() {
    //   setRefreshTime(moment(Date.now()).format('YYYY.MM.DD HH:mm:ss'));
    // },
    tableProps: {
      primaryKey: 'key',
      columns: [
        {
          name: 'label',
          label: '名称',
          width: 240,
          render: (title: '') => {
            return title.length > 14 ? (
              <span title={title}>{`${title.substring(0, 14)}...`}</span>
            ) : (
              <span title={title}>{title}</span>
            );
          },
        },
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
          width: 150,
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
                    '/:treePath/base-campus/setting',
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
                    '确认要将 ${record.label} 删除，并清空该校区下的所有信息吗？',
                  content: (
                    <Text type="secondary">
                      提示：会把没有班级的学生移动到“异常校区-未知学段-异常年级-异常班级”下，请及时处理。
                    </Text>
                  ),
                },
                onSuccess() {
                  reloadTree();
                },
              },
            ],
          },
        },
      ],
    },
    // 操作按钮
    buttonList: [
      {
        uiType: 'form',
        text: '+ 添加校区',
        dialogProps: { title: '添加校区' },
        buttonProps: { type: 'primary' },
        request: {
          url: '/backend/org/school/campus',
          method: 'POST',
          params: { parentId: activeKey },
        },
        refreshAfterRequest: true,
        formProps: {
          dataSource: [
            {
              label: '类型选择',
              uiType: 'radioWithTips',
              name: 'schoolAddressBookType',
              props: {
                placeholder: '请选择类型',
                dataSource: [
                  {
                    label: '基础教育家校通讯录',
                    value: 'base_school_address_book',
                    iconUR:
                      'https://.com/file/8f3802c7-9ecc-4764-8a65-71fc7fee951d.svg',
                    tipsTitle: '推荐：幼儿园、小学、初中、高中',
                    tipDescription: '面向K12学校，自动生成学段年级班级',
                  },
                  {
                    label: '自定义家校通讯录',
                    value: 'custom_school_type',
                    iconUR:
                      'https://s.com/file/2c47d295-a0e2-47a4-880c-0eb4b8417ff4.svg',
                    tipsTitle: '推荐：中高职、大学、培训机构',
                    tipDescription: '支持个性化设置学段、院系、班级',
                  },
                ],
              },
              rules: [
                {
                  required: true,
                  message: '请选择类型',
                },
              ],
            },
            {
              label: '校区名称',
              uiType: 'input',
              name: 'nodeName',
              props: {
                maxLength: 30,
                placeholder: '请输入校区名称',
              },
              rules: [
                {
                  required: true,
                  message: '请输入校区名称',
                },
                {
                  max: 30,
                  message: '最大长度不超过30个字符',
                },
              ],
            },
            {
              label: '校区类型',
              uiType: 'select',
              name: 'deptType',
              props: {
                placeholder: '请选择校区类型',
                dataSource: campusOptions,
              },
              rules: [
                {
                  required: true,
                  message: '请选择校区类型',
                },
              ],
              visibleOn: (data: any) =>
                data?.schoolAddressBookType
                  ? data.schoolAddressBookType !== 'base_school_address_book'
                  : false,
              newSourceParams: (prevParams: any, data: any) => ({
                ...prevParams,
                schoolAddressBookType: data?.schoolAddressBookType,
              }),
            },
          ],
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
