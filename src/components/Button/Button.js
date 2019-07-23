import React, { useState } from 'react';

function Button({ children }) {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {children}
    </button>
  );
}

export default Button;
