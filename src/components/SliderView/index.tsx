import React from 'react';
import cl from './SliderView.module.scss';
import { infoPeriods } from '../common/utils';
import { PeriodNumber } from 'src/types/types';

const SliderView = ({ periodNumber }: PeriodNumber) => {
  const currentIndex = periodNumber - 1;
  return (
    <>
      <div className={cl.container}>
        <button className={cl.year_back}>
          <img className={cl.year_arrow_back} src="../../assets/year-arrow.svg" alt="Arrow back" />
        </button>
        <div className={cl.content_block_wrapper}>
          {infoPeriods[currentIndex].content.map(item => (
            <div className={cl.content_block} key={item.year}>
              <h2 className={cl.event_year}>{item.year}</h2>
              <div className={cl.event_content}>{item.event}</div>
            </div>
          ))}
        </div>
        <button className={cl.year_forward}>
          <img
            className={cl.year_arrow_forward}
            src="../../assets/year-arrow.svg"
            alt="Arrow forward"
          />
        </button>
      </div>
    </>
  );
};

export default SliderView;
