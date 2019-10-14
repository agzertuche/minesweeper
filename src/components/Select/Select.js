import React from 'react';

function Select({ label, options, onChange }) {
  return (
    <div>
      {`${label}: `}
      <select onChange={onChange}>
        {Object.values(options).map(({ description }) => (
          <option key={description} value={description}>
            {description.toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
