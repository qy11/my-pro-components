const { content: ENV } = (document.querySelector(
  'meta[name="x-server-env"]',
) || { content: 'sit' }) as { content: string };

const urlCollect: any = {
  // 开发环境
  dev: {
    qrApi: '//aly-test.api-auth.ss.com',
    usercenter: '//gateway.dev.suosihulian.com/user-center',
    workbench: '//gateway.dev.suosihulian.com/workbench',
    file: '//gateway.dev.suosihulian.com/file-center',
  },
  // 测试环境
  sit: {
    usercenter: '//gateway.community-sit.easyj.top/user-center',
    file: '//gateway.community-sit.easyj.top/file-center',
    workbench: '//gateway.community-sit.easyj.top/workbench',
  },
  //预发环境
  pre: {
    usercenter: '//gateway.pre.suosihulian.com/user-center',
    file: '//gateway.pre.suosihulian.com/file-center',
  },
  // 生产环境
  production: {
    usercenter: '//gateway.suosihulian.com/user-center',
    file: '//gateway.suosihulian.com/file-center',
  },
};

export default urlCollect[ENV];
