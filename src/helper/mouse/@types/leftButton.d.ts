import {DomPosition} from "../../document/@types/getDom";

export declare interface PointerPosition {
    x:number
    y:number
}
export declare type GetPointerPosition = (event:MouseEvent) => PointerPosition
export declare interface DragEventInfo{
    targetElementPosition:DomPosition | null
    targetElementLivePosition:DomPosition | null
    mouseDownPosition:PointerPosition | null
    mouseMovePosition:PointerPosition | null
    dragX:number
    dragY:number
}
export declare interface DragEventOption {
    element: HTMLElement
    targetElement: HTMLElement
    isRelative?:boolean
    onMouseMove?:(event:DragEventInfo) => void
    onMouseDown?:(mouseDown:{
        mouseDownPosition:PointerPosition,
        targetElementPosition: DomPosition
    }) => void
}

export declare type DragEvent = (option:DragEventOption) => void