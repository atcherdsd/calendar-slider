import React from 'react';
import cl from '../Arrows/Arrows.module.scss';
import { IsArrowProps } from 'src/types/types';

const ArrowForward = ({ isEnd }: IsArrowProps): JSX.Element => {
  return (
    <svg className={cl.period_arrow} viewBox="0 0 10 14" fill="none">
      <path
        d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
        stroke={isEnd ? '#9ba5b9' : '#42567A'}
        strokeWidth="2"
      />
    </svg>
  );
};

export default ArrowForward;
