import React, { useState } from 'react';
import cl from './ContentSection.module.scss';
import { pageTitle } from '../common/utils';
import ControlsView from '../ControlsView';
import YearsView from '../YearsView';
import SliderView from '../SliderView';

const ContentSection = (): JSX.Element => {
  const [periodNumber, setPeriodNumber] = useState(1);
  return (
    <>
      <section className={cl.container}>
        <h1 className={cl.section_title}>{pageTitle}</h1>
        <div className={cl.content_wrapper}>
          <ControlsView setPeriod={setPeriodNumber} period={periodNumber} />
          <YearsView periodNumber={periodNumber} />
          <SliderView periodNumber={periodNumber} />
        </div>
      </section>
    </>
  );
};

export default ContentSection;
