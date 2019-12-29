import { useState } from 'react';

const useField = (type) => {
  let [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

export default useField;