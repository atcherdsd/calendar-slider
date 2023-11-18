import React, { useEffect, useRef } from 'react';
import cl from './YearsView.module.scss';
import { infoPeriods, stepForYearScrolling } from '../common/utils';
import { YearsViewProps } from 'src/types/types';
import { scrollYearNumbers } from '../common/helpers';

const YearsView = ({ periodNumber }: YearsViewProps): JSX.Element => {
  const periodIndex = periodNumber - 1;
  const startYearFromState = infoPeriods[periodIndex].period.start;
  const endYearFromState = infoPeriods[periodIndex].period.end;

  const startRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    startRef.current = startYearFromState;
    lastRef.current = endYearFromState;
  }, [endYearFromState, startYearFromState]);

  scrollYearNumbers(
    startRef.current,
    startYearFromState,
    `.${cl.first_year}`,
    stepForYearScrolling
  );
  scrollYearNumbers(lastRef.current, endYearFromState, `.${cl.last_year}`, stepForYearScrolling);

  return (
    <>
      <div className={cl.container}>
        <div className={cl.first_year} ref={startRef}>
          {infoPeriods[0].period.start}
        </div>
        <div className={cl.last_year} ref={lastRef}>
          {infoPeriods[0].period.end}
        </div>
      </div>
    </>
  );
};

export default YearsView;
