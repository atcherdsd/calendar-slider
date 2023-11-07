import { useState } from 'react';

export const useSetState = (initialValue: number) => {
  const [value, setValue] = useState(initialValue);
  const getValue = () => {
    return value;
  };
  return {
    value,
    setValue,
    getValue,
  };
};
