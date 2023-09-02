import {AxiosRequestConfig, Canceler} from "axios";

/**
 *  输入配置项
 */
export declare interface AxiosOptions extends AxiosRequestConfig{
    api:string,
    server:string,
    routeParams?:any,
    isFormData?:boolean
    success?: (data:any) => any,
    fail?: (error:any) => any,
    complete?: (info:any) => any,
    onlyOnce?: boolean,
    onDownload?:(percentage:string,progress:any) => any,
    onUpload?:(percentage:string,progress:any) => any,
}
/** 列表Item */
export declare interface paddingItem  {
    key:string,
    cancel: Canceler
}
