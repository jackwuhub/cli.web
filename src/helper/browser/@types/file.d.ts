import {VideoInfo} from "./video.d";
import {ImageInfo} from "./image.d";

export type FileType = 'file' | 'image' | 'video' | 'unknown'

export type IsFile = (file?:File, type?:FileType) => boolean | FileType


export interface FileInfo {
    size: number
    unix:number
    name: string
    type: FileType
    contentType:string
}


export type GetFileInfo = (file:File) => Promise<FileInfo>
export type FileDetail = FileInfo | ImageInfo | VideoInfo | null

export type GetFileDetail = (file?: File | undefined) => Promise<FileDetail>