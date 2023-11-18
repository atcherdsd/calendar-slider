import React, { useState } from 'react';
import cl from './ContentSection.module.scss';
import { pageTitle } from '../common/utils';
import ControlsView from '../ControlsView';
import YearsView from '../YearsView';
import SliderView from '../SliderView';
import { useSetState } from '../common/hooks';

const ContentSection = (): JSX.Element => {
  const [periodNumber, setPeriodNumber] = useState(1);
  const [isSliderAnimation, setIsSliderAnimation] = useState(false);

  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const writtenPeriod = useSetState(1);

  return (
    <>
      <section className={cl.container}>
        <div className={cl.title_border}></div>
        <h1 className={cl.section_title}>{pageTitle}</h1>
        <div className={cl.content_wrapper}>
          <ControlsView
            setPeriod={setPeriodNumber}
            period={periodNumber}
            setIsSliderAnimation={setIsSliderAnimation}
            isStart={isStart}
            setIsStart={setIsStart}
            isEnd={isEnd}
            setIsEnd={setIsEnd}
            writtenPeriod={writtenPeriod}
          />
          <YearsView periodNumber={periodNumber} />
          <SliderView
            periodNumber={periodNumber}
            setPeriod={setPeriodNumber}
            isSliderAnimation={isSliderAnimation}
            setIsSliderAnimation={setIsSliderAnimation}
            setIsStart={setIsStart}
            setIsEnd={setIsEnd}
            writtenPeriod={writtenPeriod}
          />
        </div>
      </section>
    </>
  );
};

export default ContentSection;
