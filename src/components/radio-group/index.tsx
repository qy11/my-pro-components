import React, { useCallback, useMemo, useEffect } from 'react';
import { Radio } from 'antd';

export interface PropTypes {
  onChange?(value: any): void;
  value?: any;
  tips: string | React.ReactNode;
  dataSource: {
    value: any;
    label?: string;
    text?: string;
  }[];
}

export default function RadioGroup({
  dataSource,
  value,
  onChange,
  tips,
  ...others
}: PropTypes) {
  const handleOnChange = useCallback(
    (changedValue: any) => {
      onChange && onChange(changedValue);
    },
    [onChange],
  );

  useEffect(() => {
    if (!value) {
      handleOnChange(dataSource?.[0].value);
    }
  }, []);

  const $radios = useMemo(() => {
    return dataSource.map(({ value, label, text }) => (
      <Radio value={value} key={value}>
        {label || text}
      </Radio>
    ));
  }, [dataSource]);
  return (
    <>
      <Radio.Group onChange={handleOnChange} {...others} value={value}>
        {$radios}
      </Radio.Group>
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
}
