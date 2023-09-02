export declare type TimerMap = Map<number,any>
export declare type SetTimer = (callback:Function, time:number,loop?:boolean | number) => number
export declare type ClearTimer = (timerKey?:number) => void
export declare type Debounce = (callback:Function, time:number) => void
export declare type Throttle = (callback:Function, time:number) => void
export declare type Sleep = (time:number) => Promise<void>