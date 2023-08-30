import {FileDetail, FileType, GetFileDetail, GetFileInfo, IsFile} from "./@types/file.d";
import { getImageInfo} from "@/helper";
import {getVideoInfo} from "@/helper/browser/video";
import dayjs from "dayjs";


/** 校验文件 */
export class checkFile{
    file:File // 原始文件数据
    list: Array<(result:boolean) => Promise<string | void>> = []
    constructor(file:File) {this.file = file}
    /** 检查文件大小 */
    checkFileSize(size:number,unit: 'b' | 'kb' | 'mb' = 'kb'){
        const fn = (result:any):Promise<string | void> => {
            return new Promise((resolve, reject) =>{
                if(!result) return resolve()
                let ratio = 1
                if(unit === 'kb') ratio = 1024
                if(unit === 'mb') ratio = 1024 * 1024
                const fileSize = this.file.size
                if(size === 0) return resolve()
                if(fileSize > size * ratio) reject(`文件过大,超出${size}${unit.toUpperCase()}`)
                else resolve()
            })
        }
        this.list.push(fn)
        return this
    }
    /** 检查图片尺寸 */
    checkImageOffset(width:number, height: number){
        const fn = (result:any):Promise<void | string> => {
            return new Promise((resolve, reject) => {
                if(!result) return resolve()
                if(width === 0 || height === 0) return resolve()
                getImageInfo(this.file).then((res) => {
                    const { width:ImageWidth, height:ImageHeight } = res
                    if(ImageWidth > width || ImageHeight > height) reject(`图片尺寸过大,超出${width}x${height}`)
                    else resolve()
                })
            })
        }
        if(isFile(this.file,'image'))this.list.push(fn)
        return this
    }
    /** 检查视频时长 */
    checkVideoTimeLength(time:number,unit: 's' | 'min' = 's') {
        let ratio = 1
        if(!time) return this;
        if(unit === 'min') ratio = 60
        const fn = (result:any):Promise<void | string> => {
            return new Promise((resolve, reject) => {
                if(!result) return resolve()
                getVideoInfo(this.file).then(res => {
                    const { during } = res
                    if(during > time * ratio) reject(`视频时长超出${time}${unit}`)
                    else resolve()
                })
            })
        }
        if(isFile(this.file,'video')) this.list.push(fn)
        return this
    }
    /** 开始校验 */
    validate(){
        return new Promise(async (resolve, reject) => {
            let message:string = ''
            if(!this.list.length) return resolve('无检测内容')
            for(let i = 0; i < this.list.length; i++ ){
                const fn = this.list[i]
                if(!fn) continue
                await fn(!message).catch((msg:string) => { message = msg })
                if(!!message) {
                    reject(`${this.file.name}${message}`)
                    break
                }
                if(i === this.list.length - 1) resolve('通过测试')
            }
        })
    }
}
/** 检测文件类型 */
export const isFile:IsFile = (file,type) => {
    if(!file) return 'unknown'
    const { type:fileTypeOrigin } = file
    let fileType = fileTypeOrigin.split('/')[0]
    if(fileType === 'image') {
        if(!type) return 'image'
        else return fileType === type
    }
    if(fileType === 'video') {
        if(!type) return 'video'
        else return fileType === type
    }
    fileType = 'file'
    if(!type) return <FileType>fileType
    else return fileType === type
}


/** 获取文件详细信息 */
export const getFileDetail:GetFileDetail = (file) => {
    return new Promise(async resolve => {
        let fileInfo:FileDetail = null
        if(!file) resolve(fileInfo)
        if(file && isFile(file,'file')) fileInfo = await getFileInfo(file)
        if(file && isFile(file,'image')) fileInfo = await getImageInfo(file)
        if(file && isFile(file,'video')) fileInfo = await getVideoInfo(file)
        resolve(fileInfo)
    })
}

/** 文件基础信息 */
export const getFileInfo:GetFileInfo = (file) => {
    return new Promise(resolve => {
        resolve({
            unix: dayjs(file.lastModified).unix(),
            contentType: file.type,
            size: file.size,
            name: file.name,
            type: <FileType>isFile(file)
        })
    })
}
