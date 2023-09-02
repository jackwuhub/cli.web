import {FileInfo} from "./file.d";

export declare type GetImage = (src:string) => Promise<HTMLImageElement>
export interface ImageInfo extends FileInfo{
    width: number
    height: number
}
export type GetImageInfo = (file:File) => Promise<ImageInfo>