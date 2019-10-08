import React from 'react';

function Counter({ count }) {
  return (
    <div>{count < 10 ? `00${count}` : count < 100 ? `0${count}` : count}</div>
  );
}

export default Counter;
