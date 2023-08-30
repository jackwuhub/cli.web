import {GetVideoInfo} from "./@types/video.d";
import {blobToDataUrl, getFileInfo} from "@/helper";

/** 视频信息 */
export const getVideoInfo:GetVideoInfo = (file) => {
    return new Promise((resolve, reject) => {
        blobToDataUrl(file).then(res => {
            const audio = new Audio(res)
            audio.onloadeddata = () => {
                const { duration:during } = audio
                getFileInfo(file).then((res) => {
                    resolve({
                        ...res,
                        during
                    })
                })
            }
        })
    })
}