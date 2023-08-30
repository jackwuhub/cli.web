export interface DrawWaterMarkOptions {
    container: HTMLElement
    width: number
    height: number
    zIndex: number
    waterImageSrc: string
}
export type DrawWaterMark = ( options:DrawWaterMarkOptions ) => void