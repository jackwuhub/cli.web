import Axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios'
import {AxiosOptions} from './@type'
import {requestInterceptors, requestInterceptorsError, responseInterceptors, responseInterceptorsError} from "./plugin/interceptor"
import { onDownLoadProgress, onUpLoadProgress } from './plugin/progress'
import {filterObject} from "@/helper";
import {object2FormData, parseUrl} from "./plugin/helper";

/**
 * 创建默认axios服务
 */
const creatDefaultServer = (config:AxiosOptions) => {
    const { onDownload,onUpload } = config
    Axios.defaults.headers.post['Content-Type'] = 'application/json'
    Axios.defaults.headers.patch['Content-Type'] = 'application/json'
    Axios.defaults.headers.put['Content-Type'] = 'application/json'
    Axios.defaults.timeoutErrorMessage = '请求超时'
    // Axios.defaults.transformResponse = (data: any) => jsonBig({ storeAsString: true }).parse(data)
    Axios.defaults.onDownloadProgress = (ProgressEvent: any) => onDownLoadProgress(onDownload,ProgressEvent)
    Axios.defaults.onUploadProgress = (ProgressEvent: any) => onUpLoadProgress(onUpload,ProgressEvent)
    return Axios.create()
}

/**
 * 创建请求
 * @param config
 * @param method
 */
const creatRequest =  (config:AxiosOptions,method:Method) => {
    const { isFormData,api,params, server, fail, success, complete,routeParams, ...otherConfig } = config
    const url = server + parseUrl(api,routeParams) // spell url
    const axios = creatDefaultServer(config) // creat New Request By Default Config
    axios.interceptors.request.use(
        (config: AxiosRequestConfig) => requestInterceptors(<AxiosOptions>config),
        (error: AxiosError) => requestInterceptorsError(error,fail,complete)
    )
    axios.interceptors.response.use(
        (res: AxiosResponse) => responseInterceptors(res,success,fail,complete) ,
        (error: AxiosError) => responseInterceptorsError(error,fail,complete))
    return axios.request(filterObject({
        ...otherConfig,
        method,
        url,
        params,
        data: method === 'post' && isFormData && !!otherConfig?.data ? object2FormData(otherConfig?.data) : otherConfig?.data,
    }) as AxiosRequestConfig)
}

export default {
        post: (config:AxiosOptions) => creatRequest(config,'post'),
        get:  (config:AxiosOptions) => creatRequest(config,'get'),
        put: (config:AxiosOptions) => creatRequest(config,'put'),
        delete: (config:AxiosOptions) => creatRequest(config,'delete'),
        patch: (config:AxiosOptions) => creatRequest(config,'patch')
}
