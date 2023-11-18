import React, { MouseEvent, useEffect, useRef } from 'react';
import cl from './SliderView.module.scss';
import { arrangementArgs, infoPeriods, mobileScreenSize } from '../common/utils';
import { SliderViewProps } from 'src/types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { toggleActiveBullet } from '../common/toggleActiveButton';

const SliderView = ({
  periodNumber,
  setPeriod,
  isSliderAnimation,
  setIsSliderAnimation,
  setIsStart,
  setIsEnd,
  writtenPeriod,
}: SliderViewProps): JSX.Element => {
  const sliderRef = useRef(null);
  const isMobileScreen = window.innerWidth <= mobileScreenSize;

  const currentIndex = periodNumber - 1;
  const sliderContainer = document.getElementById('slider-cont');

  if (sliderContainer) {
    sliderContainer.classList.add(`${cl.slider_animation}`);
    setTimeout(() => {
      sliderContainer.classList.remove(`${cl.slider_animation}`);
    }, 800);
  }

  const handlePaginationClick = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement;
    toggleActiveBullet(target);

    const allPaginationBtns = document.querySelectorAll(
      `.${cl.pagination_button}`
    ) as NodeListOf<HTMLButtonElement>;

    const chosenPaginationBtnID = Array.from(allPaginationBtns)
      .find(btn => btn === target)
      .id.at(-1);
    setPeriod(+chosenPaginationBtnID);

    setIsSliderAnimation(true);

    writtenPeriod.setValue(+chosenPaginationBtnID);
    +chosenPaginationBtnID === 1 ? setIsStart(true) : setIsStart(false);
    +chosenPaginationBtnID === arrangementArgs.buttonsAmount ? setIsEnd(true) : setIsEnd(false);
  };

  useEffect(() => {
    sliderRef.current = currentIndex;
    setTimeout(() => {
      setIsSliderAnimation(false);
    }, 400);
  }, [currentIndex, setIsSliderAnimation]);

  useEffect(() => {
    if (isMobileScreen) {
      const chosenBullet = document.getElementById(
        'button' + writtenPeriod.getValue()
      ) as HTMLButtonElement;
      toggleActiveBullet(chosenBullet);
    }
  }, [isMobileScreen, writtenPeriod]);

  return (
    <>
      <div className={cl.container} id="slider-cont">
        <Swiper
          ref={sliderRef}
          className={cl.content_block_wrapper}
          modules={[Navigation]}
          slidesPerView={1.7}
          freeMode={false}
          spaceBetween={25}
          speed={1000}
          navigation={{
            prevEl: `.${cl.year_back}`,
            nextEl: `.${cl.year_forward}`,
          }}
          breakpoints={{
            1000: {
              slidesPerView: 'auto',
              spaceBetween: 80,
            },
          }}
          slideNextClass={`${cl.swiper_slide_next}`}
        >
          {!isSliderAnimation &&
            infoPeriods[currentIndex].content.map(item => (
              <SwiperSlide className={cl.slide_item} key={item.year}>
                <h2 className={cl.event_year}>{item.year}</h2>
                <div className={cl.event_content}>{item.event}</div>
              </SwiperSlide>
            ))}
          {isSliderAnimation &&
            infoPeriods[sliderRef.current].content.map(item => (
              <SwiperSlide className={cl.slide_item} key={item.year}>
                <h2 className={cl.event_year}>{item.year}</h2>
                <div className={cl.event_content}>{item.event}</div>
              </SwiperSlide>
            ))}
        </Swiper>
        <button className={cl.year_back}></button>
        <button className={cl.year_forward}></button>
      </div>
      <div className={cl.swiper_pagination}>
        {isMobileScreen &&
          infoPeriods.map((period, index: number) => (
            <button
              className={cl.pagination_button}
              onClick={handlePaginationClick}
              key={period.id}
              id={'button' + String(index + 1)}
            ></button>
          ))}
      </div>
    </>
  );
};

export default SliderView;
