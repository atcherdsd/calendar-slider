import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
import cl from './ControlsView.module.scss';
import { arrangementArgs, titles } from '../common/utils';
import { applyActiveClass, arrangeElements, turnCircle } from '../common/helpers';
import { SetPeriod } from 'src/types/types';
import { useSetState } from '../common/hooks';
import ArrowBack from './Arrows/ArrowBack';
import ArrowForward from './Arrows/ArrowForward';

const ControlsView = ({ setPeriod, period }: SetPeriod): JSX.Element => {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const writtenPeriod = useSetState(1);

  const handleMouseEnter = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    console.log('target: ', target);
  };

  const handleCircleClick = (event: MouseEvent) => {
    const child = event.currentTarget as HTMLButtonElement;
    const parent = child.closest('div') as HTMLDivElement;
    const currentSpan = child.querySelector('span') as HTMLSpanElement;
    const numberFromSpan = +currentSpan.innerText;

    setPeriod(numberFromSpan);
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

  const handleArrowClick = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement | HTMLImageElement;
    const currentPeriod = period;
    writtenPeriod.setValue(currentPeriod);
    const getPeriod = writtenPeriod.getValue();

    if (
      target.classList.contains(`${cl.period_control_back}`) ||
      target.classList.contains(`${cl.period_arrow_back}`)
    ) {
      setIsEnd(false);
      if (getPeriod > 1) {
        setPeriod(currentPeriod - 1);
        writtenPeriod.setValue(currentPeriod - 1);
      } else {
        setIsStart(true);
      }
    } else if (
      target.classList.contains(`${cl.period_control_forward}`) ||
      target.classList.contains(`${cl.period_arrow_forward}`)
    ) {
      setIsStart(false);
      if (getPeriod < arrangementArgs.buttonsAmount) {
        setPeriod(currentPeriod + 1);
        writtenPeriod.setValue(currentPeriod + 1);
      } else {
        setIsEnd(true);
      }
    }
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
  }, []);
  useEffect(() => {
    writtenPeriod.getValue() === 1 ? setIsStart(true) : null;
    writtenPeriod.getValue() === 6 ? setIsEnd(true) : null;
  }, [writtenPeriod]);

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
                    onClick={handleCircleClick}
                    onMouseEnter={handleMouseEnter}
                    key={index}
                  >
                    <span>{index + 1}</span>
                    <div className={cl.button_capture}>{titles[index]}</div>
                  </button>
                ))
            )}
        </div>
        <div className={cl.side_block}>
          <div className={cl.counter_wrapper}>
            <span className={cl.current_period}>0{period}</span>/
            <span className={cl.periods_amount}>0{arrangementArgs.buttonsAmount}</span>
          </div>
          <div className={cl.periods_controls} onClick={handleArrowClick}>
            <button
              className={`${cl.period_control_back} ${isStart ? cl.period_inactive : ''}`}
              disabled={isStart}
            >
              <ArrowBack isStart={isStart} />
            </button>
            <button
              className={`${cl.period_control_forward} ${isEnd ? cl.period_inactive : ''}`}
              disabled={isEnd}
            >
              <ArrowForward isEnd={isEnd} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlsView;
