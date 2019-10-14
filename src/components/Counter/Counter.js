import React from 'react';

function Counter({ count, label }) {
  return (
    <div>
      {label}
      {count < 10 ? `00${count}` : count < 100 ? `0${count}` : count}
    </div>
  );
}

export default Counter;
