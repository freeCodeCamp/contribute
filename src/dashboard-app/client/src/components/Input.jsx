import React from 'react';

const Container = () => {
  const containerStyle = {
    marginBottom: '10px'
  };

  return <input style={containerStyle} />;
};

const Input = React.forwardRef((props, ref) => (
  <Container
    type='text'
    onChange={props.onInputEvent}
    onKeyPress={props.onInputEvent}
    value={props.value}
    ref={ref}
  />
));

export default Input;
