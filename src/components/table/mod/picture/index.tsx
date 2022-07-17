import React from 'react';
import { Image } from 'antd';

function Index({ value }: any) {
  const pictureStyle = {
    display: 'flex',
    height: '32px',
    width: '32px',
  };
  return (
    <div style={pictureStyle}>
      {value ? <Image width={32} height={32} src={value} /> : '-'}
    </div>
  );
}

export default Index;
