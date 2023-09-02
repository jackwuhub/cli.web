/**
 * 下载进度
 * @param onDownload
 * @param ProgressEvent 当前进度对象
 */
export const onDownLoadProgress = (onDownload: ((percentage: string,progressEvent:any) => any) | undefined, ProgressEvent: any) => {
    if(onDownload){
        const { total,loaded } = ProgressEvent
        const percentage = (loaded * 100 / total).toFixed(2)
        onDownload(percentage,ProgressEvent)
    }
}

export const onUpLoadProgress = (onUpload: ((progress: string,progressEvent:any) => any) | undefined, ProgressEvent: any) => {
    if(onUpload){
        const { total,loaded } = ProgressEvent
        const percentage = (loaded * 100 / total).toFixed(2)
        onUpload(percentage,ProgressEvent)
    }
}
