import React from 'react';
import cl from '../Arrows/Arrows.module.scss';
import { IsArrowProps } from 'src/types/types';

const ArrowBack = ({ isStart }: IsArrowProps): JSX.Element => {
  return (
    <svg className={cl.period_arrow_back} viewBox="0 0 10 14" fill="none">
      <path
        d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
        stroke={isStart ? '#9ba5b9' : '#42567A'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default ArrowBack;
