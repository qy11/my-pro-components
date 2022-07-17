import React from 'react';
import { Popover } from 'antd';

export default function TableCellText(props) {
  const { value, tableProps, minWidth = 70, maxWidth = 280, ...others } = props;
  const _value =
    value === undefined || value === null || value?.length === 0 ? '-' : value;
  const content = <span className="popoverText">{_value}</span>;
  const overlayStyle = {
    maxWidth: '20em',
    wordBreak: 'break-all',
    fontSize: '12px',
    color: '#666',
    overflow: 'auto',
    backgroud: '#fff',
    maxHeight: '400px',
    boxShadow: '5px 5px 10px rgba(129, 133, 167, 0.2)',
  };

  const text = {
    display: 'block',
    minWidth,
    maxWidth,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  return (
    <Popover
      content={content}
      placement="bottomLeft"
      overlayStyle={overlayStyle}
    >
      <span {...others} style={text}>
        {_value}
      </span>
    </Popover>
  );
}

// Text.displayName = 'Text';
// Text.propTypes = {
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   tableProps: PropTypes.shape({
//     index: PropTypes.number,
//     record: PropTypes.object,
//   }).isRequired,
// };
