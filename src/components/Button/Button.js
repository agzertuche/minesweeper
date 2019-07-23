import React, { useState } from 'react';

// TODO: render emojis based on the status, sad, happy, win

function Button({ children }) {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {children}
    </button>
  );
}

export default Button;
