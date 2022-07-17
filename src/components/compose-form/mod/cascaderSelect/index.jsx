import React from 'react';
import { Cascader } from 'antd';

export default function cascader({
  dataSource = [],
  value = [],
  onChange,
  allowClear = true,
  disabled,
  ...others
}) {
  // console.log('cascader', value, dataSource);
  const onValueChange = (val) => {
    onChange(val);
  };

  const getReadOnlyValue = () => {
    const startData = dataSource.find((item) => item.value === value[0]);

    const finalArr = [];

    function recursion(param) {
      param.forEach((item) => {
        finalArr.push({ label: item.label, value: item.value });
        if (item?.children) {
          recursion(item.children);
        }
      });
    }
    recursion(startData?.children);
    const dizData = finalArr.filter((item) =>
      value.some((iv) => iv === item?.value),
    );

    return (
      <>
        {startData?.label}
        {dizData && dizData?.length
          ? dizData.map((item) => (
              <>
                {'/'}
                {item.label}
              </>
            ))
          : null}
      </>
    );
  };

  return (
    <>
      {disabled ? (
        value.length && dataSource.length ? (
          getReadOnlyValue()
        ) : (
          '-'
        )
      ) : (
        <Cascader
          allowClear={allowClear}
          options={dataSource}
          value={value}
          placeholder="请选择"
          onChange={onValueChange}
          {...others}
        />
      )}
    </>
  );
}
