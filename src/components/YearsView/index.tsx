import React from 'react';
import cl from './YearsView.module.scss';
import { infoPeriods } from '../common/utils';
import { PeriodNumber } from 'src/types/types';

const YearsView = ({ periodNumber }: PeriodNumber): JSX.Element => {
  const periodIndex = periodNumber - 1;
  return (
    <>
      <div className={cl.container}>
        <div className={cl.first_year}>{infoPeriods[periodIndex].period.start}</div>
        <div className={cl.last_year}>{infoPeriods[periodIndex].period.end}</div>
      </div>
    </>
  );
};

export default YearsView;
