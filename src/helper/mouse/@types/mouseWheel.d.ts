export declare interface WheelOptions{
    throttle:boolean,
    debounce:boolean,
    duringTime:number,
}
export declare type MouseWheelScroll = (element:HTMLElement, callback:Function,options?:WheelOptions) => void