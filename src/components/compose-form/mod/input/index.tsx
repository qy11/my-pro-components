import React from 'react';
import { Input } from 'antd';
import './index.less';

export default ({
  value,
  onChange,
  maxLength,
  noShowSuffix,
  tips,
  emitter,
  onBlur,
  form,
  ...others
}: any) => {
  return (
    <>
      <Input
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={() => onBlur && onBlur({ value, form })}
        maxLength={maxLength}
        placeholder="请输入"
        {...others}
        suffix={
          maxLength && !noShowSuffix ? `${value?.length || 0}/${maxLength}` : ''
        }
        className={maxLength ? 'input-withMaxLength' : ''}
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
