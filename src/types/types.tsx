export type Collection =
  | NodeListOf<HTMLButtonElement>
  | NodeListOf<HTMLDivElement>
  | NodeListOf<HTMLSpanElement>;

export type SetPeriod = {
  setPeriod: (data: number) => void;
  period: number;
};

export type PeriodNumber = {
  periodNumber: number;
};

export type IsArrowProps = {
  isStart?: boolean;
  isEnd?: boolean;
};
