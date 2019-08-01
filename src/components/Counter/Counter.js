import React, { useState } from 'react';

// TODO: handleTimer need to implement a way to increment/decrement values by time as explained by danabramov on his blog and by click events

function Counter({ count: initialCount }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count => count + 1);
  const decrement = () => setCount(count => count - 1);

  return <div>{count}</div>;
}

export default Counter;
