export interface Transition {
    duration?: string;
    timingFunction?: string;
}
export interface Items {
    [key: string]: (value: boolean) => void;
}
