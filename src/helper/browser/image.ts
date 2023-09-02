import { GetImage,GetImageInfo } from './@types/image'
import {blobToDataUrl, getFileInfo} from "@/helper";

/**
 * 根据src获取image元素
 * @param src
 */
export const getImage:GetImage = (src) => {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = src
        image.onload = () => {
            resolve(image)
        }
    })
}
/** 图片信息 */
export const getImageInfo:GetImageInfo = (file) => {
    return new Promise((resolve) => {
        const image = new Image()
        blobToDataUrl(file).then(res => image.src = res)
        image.onload = () => {
            const { width,height } = image
            getFileInfo(file).then((res) => {
                resolve({
                    ...res,
                    width,
                    height
                })
            })
        }
    })
}