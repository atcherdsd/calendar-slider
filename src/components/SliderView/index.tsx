import React from 'react';
import cl from './SliderView.module.scss';

const SliderView = () => {
  return (
    <>
      <div className={cl.container}>
        <div className={cl.top_block}></div>
        <div className={cl.side_block}></div>
      </div>
    </>
  );
};

export default SliderView;
