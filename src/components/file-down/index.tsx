import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import FileUpload from 'ss-files-upload';

import { ENV } from '@/common/util';

import './index.less';

export interface PropTypes {
  onChange?: (value: any) => void;
  value?: string;
}

export default function Index(props: any) {
  const { fileId } = props;
  const [data, setDateList] = useState<any>(fileId);

  useEffect(() => {
    setDateList(fileId);
  }, [fileId]);

  // const Dom = useMemo(() => {
  //   return <FileUpload edit="1" type="pc" groupId={data} APIEnv={ENV} />;
  // }, [data]);
  return <div>1</div>;
}
