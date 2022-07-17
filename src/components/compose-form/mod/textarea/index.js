import React from 'react';
import { Input } from 'antd';
import './index.less';

const { TextArea } = Input;

export default ({
  value,
  onChange,
  maxLength = 200,
  tips,
  form,
  type = 'normal',
  ...others
}) => {
  return (
    <>
      <TextArea
        className={type === 'normal' ? 'ssp-textarea' : ''}
        value={value}
        onChange={(e) => onChange(e)}
        maxLength={maxLength}
        bordered={type !== 'normal'}
        placeholder="请输入"
        showCount={type === 'normal'}
        autoSize={type !== 'normal' ? undefined : { minRows: 4, maxRows: 4 }}
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
