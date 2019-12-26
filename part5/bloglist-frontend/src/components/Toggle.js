import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const toggle = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggle
    };
  });

  return (
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggle}>Cancel</button>
      </div>
      <button style={hideWhenVisible} onClick={toggle}>{props.buttonLabel}</button>
    </div>
  );
});

Toggle.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Toggle;