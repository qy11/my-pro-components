import React from 'react';
import { InputNumber } from 'antd';

export default ({ value, index, onChange, tips, ...others }: any) => {
  return (
    <>
      <InputNumber
        value={value}
        onChange={(e) => onChange(e, index)}
        {...others}
      />
      {tips && (
        <div
          style={{
            color: '#999',
            fontSize: '12px',
            wordBreak: 'break-all',
            paddingTop: '8px',
          }}
        >
          {tips}
        </div>
      )}
    </>
  );
};
