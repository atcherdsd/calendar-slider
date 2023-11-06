import React from 'react';
import cl from './ContentSection.module.scss';
import { pageTitle } from '../common/utils';
import ControlsView from '../ControlsView';
import YearsView from '../YearsView';
import SliderView from '../SliderView';

const ContentSection = (): JSX.Element => {
  return (
    <>
      <section className={cl.container}>
        <h1 className={cl.section_title}>{pageTitle}</h1>
        <div className={cl.content_wrapper}>
          <ControlsView />
          <YearsView />
          <SliderView />
        </div>
      </section>
    </>
  );
};

export default ContentSection;
