import React, { MouseEvent, ReactNode, useEffect } from 'react';
import cl from './ControlsView.module.scss';
import { arrangementArgs, titles } from '../common/utils';
import { applyActiveClass, arrangeElements, turnCircle } from '../common/helpers';

const ControlsView = (): JSX.Element => {
  const handleMouseEnter = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    console.log('target: ', target);
  };

  const handleClick = (event: MouseEvent) => {
    const child = event.currentTarget as HTMLButtonElement;
    const parent = child.closest('div') as HTMLDivElement;
    const currentSpan = child.querySelector('span') as HTMLSpanElement;
    const currentCapture = child.querySelector('div') as HTMLDivElement;

    const buttons = document.querySelectorAll(
      `.${cl.number_button}`
    ) as NodeListOf<HTMLButtonElement>;
    const spans = document.querySelectorAll(
      `.${cl.number_button} span`
    ) as NodeListOf<HTMLSpanElement>;
    const captures = document.querySelectorAll(
      `.${cl.button_capture}`
    ) as NodeListOf<HTMLDivElement>;

    applyActiveClass(child, currentSpan, currentCapture, buttons, spans, captures);

    turnCircle(child, parent, buttons);
  };

  useEffect(() => {
    const numberBtns = document.querySelectorAll(
      `.${cl.number_button}`
    ) as NodeListOf<HTMLButtonElement>;
    const firstSpan = numberBtns[0].querySelector('span');
    const firstDiv = numberBtns[0].querySelector('div');
    const { circleRadius, buttonRadius, pointsOnCircle } = arrangementArgs;

    arrangeElements(circleRadius, buttonRadius, pointsOnCircle, numberBtns);
    numberBtns[0].classList.add(`${cl.active}`);
    firstSpan.classList.add(`${cl.active_span}`);
    firstDiv.classList.add(`${cl.active_capture}`);
  });

  return (
    <>
      <div className={cl.container}>
        <div className={cl.top_block}>
          {Array(arrangementArgs.buttonsAmount)
            .fill(1)
            .map(
              (elem: ReactNode, index: number): JSX.Element =>
                (elem = (
                  <button
                    className={cl.number_button}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    key={index}
                  >
                    <span>{index + 1}</span>
                    <div className={cl.button_capture}>{titles[index]}</div>
                  </button>
                ))
            )}
        </div>
        <div className={cl.side_block}></div>
      </div>
    </>
  );
};

export default ControlsView;
