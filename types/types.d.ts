/// <reference types="react" />
export type Collection = NodeListOf<HTMLButtonElement> | NodeListOf<HTMLDivElement> | NodeListOf<HTMLSpanElement>;
interface IWrittenPeriod {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    getValue: () => number;
}
export type ControlsViewProps = {
    setPeriod: (data: number) => void;
    period: number;
    setIsSliderAnimation: (data: boolean) => void;
    isStart: boolean;
    setIsStart: (data: boolean) => void;
    isEnd: boolean;
    setIsEnd: (data: boolean) => void;
    writtenPeriod: IWrittenPeriod;
};
export type YearsViewProps = {
    periodNumber: number;
};
export type SliderViewProps = {
    periodNumber: number;
    setPeriod: (data: number) => void;
    isSliderAnimation: boolean;
    setIsSliderAnimation: (data: boolean) => void;
    setIsStart: (data: boolean) => void;
    setIsEnd: (data: boolean) => void;
    writtenPeriod: IWrittenPeriod;
};
export type IsArrowProps = {
    isStart?: boolean;
    isEnd?: boolean;
};
export {};
