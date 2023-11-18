import { Collection } from 'src/types/types';
import cl from '../ControlsView/ControlsView.module.scss';
import { scrollYearsDelay } from './utils';

export const arrangeElements = (
  orbitRadius: number,
  elemRadius: number,
  appliedAngles: number[],
  collection: Collection
): void => {
  Array.from(collection).map((elem, i) => {
    elem.style.top =
      orbitRadius - Math.round(orbitRadius * Math.sin(appliedAngles[i])) - elemRadius + 'px';
    elem.style.left =
      orbitRadius + Math.round(orbitRadius * Math.cos(appliedAngles[i])) - elemRadius + 'px';
  });
};

export const applyActiveClass = (
  button: HTMLButtonElement,
  currentSpan: HTMLSpanElement,
  currentCapture: HTMLDivElement,
  buttonsCollection: NodeListOf<HTMLButtonElement>,
  spansCollection: NodeListOf<HTMLSpanElement>,
  capturesCollection: NodeListOf<HTMLDivElement>
) => {
  button.classList.add(`${cl.active}`);
  currentSpan.classList.add(`${cl.active_span}`);
  setTimeout(() => currentCapture.classList.add(`${cl.active_capture}`), 1000);

  Array.from(buttonsCollection)
    .filter(btn => btn !== button)
    .forEach(btn => btn.classList.remove(`${cl.active}`));
  Array.from(spansCollection)
    .filter(span => span !== currentSpan)
    .forEach(span => span.classList.remove(`${cl.active_span}`));
  Array.from(capturesCollection)
    .filter(capture => capture !== currentCapture)
    .forEach(capture => capture.classList.remove(`${cl.active_capture}`));
};

export const rotateCircle = (
  button: HTMLButtonElement,
  block: HTMLDivElement,
  buttonsCollection: NodeListOf<HTMLButtonElement>
) => {
  let currentAngle = 0;
  const cssLeft = parseInt(window.getComputedStyle(button).left.slice(0, -2));
  switch (cssLeft) {
    case 105: {
      currentAngle = 60;
      break;
    }
    case -28: {
      currentAngle = 120;
      break;
    }
    case 104: {
      currentAngle = 180;
      break;
    }
    case 369: {
      currentAngle = -120;
      break;
    }
    case 502: {
      currentAngle = -60;
      break;
    }
    case 370: {
      currentAngle = 0;
      break;
    }
    default:
      return;
  }

  block.style.transform = `rotate(${currentAngle}deg)`;
  if (currentAngle >= 0) {
    buttonsCollection.forEach(btn => {
      btn.style.transform = `rotate(-${currentAngle}deg)`;
      btn.style.transition = 'transform 1s';
    });
  } else
    buttonsCollection.forEach(btn => {
      btn.style.transform = `rotate(${Math.abs(currentAngle)}deg)`;
      btn.style.transition = 'transform 1s';
    });
};

export const scrollYearNumbers = (
  yearFromRef: number,
  yearFromState: number,
  el: string,
  step: number
) => {
  if (yearFromRef === null) return;

  const diff = yearFromState - yearFromRef;
  const delay = diff !== 0 ? Math.abs(Math.round(scrollYearsDelay / (diff / step))) : 1;

  const interval = setInterval(() => {
    if (yearFromRef !== yearFromState) {
      yearFromRef = diff > 0 ? yearFromRef + step : yearFromRef - step;
      document.querySelector(el).innerHTML = String(yearFromRef);
    } else {
      clearInterval(interval);
    }
  }, delay);
};
