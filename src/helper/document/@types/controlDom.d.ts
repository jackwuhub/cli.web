export type ElementType = string | HTMLElement
export declare interface SetDomOption {
    element?: ElementType
    width?:number | string
    height?: number | string
    x?: number | string
    y?: number | string
}
export declare type SetDomRect = (option:SetDomOption) => void


export declare type MoveDom = (element:ElementType,setElement:ElementType, callBack?:Function) => void

export declare interface ResizeDomOption {
    element?: ElementType
    targetDom?:ElementType
    direction?: 'both' | 'col' | 'row'
    minWidth?: number
    minHeight?: number
}
export declare type ResizeDom = (option:ResizeDomOption) => void