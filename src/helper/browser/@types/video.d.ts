import {FileInfo, VideoInfo} from "./file.d";
export declare interface VideoInfo extends FileInfo{
    during: number
}
export declare type GetVideoInfo = (file:File) => Promise<VideoInfo>