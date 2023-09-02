import {Base64ToBlob, BlobToDataUrl} from './@types/ecoded'

/**
 * base64 转 blob
 * @param base64 {string} 编码
 */
export const base64ToBlob:Base64ToBlob = (base64) => {
    const arr:string[] = base64.split(',')
    const mine:string = arr?.[0]?.match(/:(.*?);/)?.[1] ?? 'text'
    const bStr = atob(arr?.[1])
    let length = bStr.length
    const u8arr = new Uint8Array(length)
    while(length--) u8arr[length] = bStr.charCodeAt(length)
    return new Blob([u8arr],{type:mine})
}
/**
 * blob转dataUrl
 * @param blob
 */
export const blobToDataUrl:BlobToDataUrl = (blob) => {
    return new Promise((resolve,reject) => {
        const file:FileReader = new FileReader()
        file.onload = (event) => {
            resolve(<string>event?.target?.result ?? '')
        }
        file.readAsDataURL(blob)
    })
}