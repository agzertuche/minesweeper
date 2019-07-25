import React from 'react';

// TODO: render emojis based on the status, sad, happy, win

function Button(props) {
  return (
    <button type="button" {...props}>
      {props.children}
    </button>
  );
}

export default Button;
