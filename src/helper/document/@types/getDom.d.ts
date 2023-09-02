export declare interface DomPosition{
    width:number,
    height:number,
    top:number,
    bottom:number,
    left:number,
    right:number
}
export declare type GetDom = (name: string | HTMLElement ) => HTMLElement | HTMLCollection<HTMLElement> | null

export declare type GetDomPosition = (element: string | HTMLElement, isRelative?:boolean) => DomPosition | null