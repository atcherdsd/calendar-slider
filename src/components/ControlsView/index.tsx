import React, { MouseEvent, ReactNode, useEffect } from 'react';
import cl from './ControlsView.module.scss';
import { arrangementArgs, titles } from '../common/utils';
import { applyActiveClass, arrangeElements, rotateCircle } from '../common/helpers';
import { ControlsViewProps } from 'src/types/types';
import ArrowBack from './Arrows/ArrowBack';
import ArrowForward from './Arrows/ArrowForward';

const ControlsView = ({
  setPeriod,
  period,
  setIsSliderAnimation,
  isStart,
  setIsStart,
  isEnd,
  setIsEnd,
  writtenPeriod,
}: ControlsViewProps): JSX.Element => {
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

    rotateCircle(child, parent, buttons);

    setIsSliderAnimation(true);

    writtenPeriod.setValue(numberFromSpan);
    numberFromSpan === 1 ? setIsStart(true) : setIsStart(false);
    numberFromSpan === arrangementArgs.buttonsAmount ? setIsEnd(true) : setIsEnd(false);
  };

  const handleArrowClick = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    const currentPeriod = period;
    writtenPeriod.setValue(currentPeriod);

    const buttons = document.querySelectorAll(
      `.${cl.number_button}`
    ) as NodeListOf<HTMLButtonElement>;
    const spans = document.querySelectorAll(
      `.${cl.number_button} span`
    ) as NodeListOf<HTMLSpanElement>;
    const captures = document.querySelectorAll(
      `.${cl.button_capture}`
    ) as NodeListOf<HTMLDivElement>;
    const chosenCircleButton = target.classList.contains(`${cl.period_control_back}`)
      ? (document.querySelectorAll(`.${cl.number_button}`)[currentPeriod - 2] as HTMLButtonElement)
      : target.classList.contains(`${cl.period_control_forward}`)
      ? (document.querySelectorAll(`.${cl.number_button}`)[currentPeriod] as HTMLButtonElement)
      : null;
    const parentButtonBlock = chosenCircleButton.closest('div') as HTMLDivElement;
    const chosenCircleSpan = chosenCircleButton.querySelector('span') as HTMLSpanElement;
    const chosenCircleCapture = chosenCircleButton.querySelector('div') as HTMLDivElement;

    rotateCircle(chosenCircleButton, parentButtonBlock, buttons);
    applyActiveClass(
      chosenCircleButton,
      chosenCircleSpan,
      chosenCircleCapture,
      buttons,
      spans,
      captures
    );
    setIsSliderAnimation(true);

    if (target.classList.contains(`${cl.period_control_back}`)) {
      setIsEnd(false);
      if (currentPeriod > 1) {
        setPeriod(currentPeriod - 1);
        writtenPeriod.setValue(currentPeriod - 1);
      } else {
        setIsStart(true);
      }
    } else if (target.classList.contains(`${cl.period_control_forward}`)) {
      setIsStart(false);
      if (currentPeriod < arrangementArgs.buttonsAmount) {
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
    writtenPeriod.getValue() === arrangementArgs.buttonsAmount ? setIsEnd(true) : null;
  }, [setIsEnd, setIsStart, writtenPeriod]);

  return (
    <>
      <div className={cl.container}>
        <div className={cl.circle_border}></div>
        <div className={cl.top_block}>
          {Array(arrangementArgs.buttonsAmount)
            .fill(1)
            .map(
              (elem: ReactNode, index: number): JSX.Element =>
                (elem = (
                  <button className={cl.number_button} onClick={handleCircleClick} key={index}>
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
