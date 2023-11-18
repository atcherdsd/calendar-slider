import cl from '../SliderView/SliderView.module.scss';

export const toggleActiveBullet = (selectedBullet: HTMLButtonElement) => {
  selectedBullet.classList.add(`${cl.active}`);
  const bulletsWithoutActive = Array.from(
    document.querySelectorAll(`.${cl.pagination_button}`) as NodeListOf<HTMLButtonElement>
  ).filter(btn => btn !== selectedBullet);
  bulletsWithoutActive.forEach(btn => btn.classList.remove(`${cl.active}`));
};
