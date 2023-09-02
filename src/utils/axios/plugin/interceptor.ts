import {AxiosOptions} from "../@type";
import {addPadding, removePadding} from "../plugin/padding";
import {AxiosResponse} from "axios";
import {router} from "@/router";
import {getCookie, spellUrl} from "@/helper";
import {CODE} from "@/requestApis";

/** 发起请求拦截 */
export const requestInterceptors = (request:AxiosOptions) => {
    addPadding(request)
    return request
}


/** 发起请求失败 */
export const requestInterceptorsError = (error: any, fail: ((error: any) => any) | undefined, complete: ((info: any) => any) | undefined) => {
    // console.log(error)
    // return error
}


/** 成功响应 */
export const responseInterceptors = (
    response: AxiosResponse,
    success: ((data: any) => void) | undefined,
    fail: ((error: any) => void) | undefined,
    complete: ((data: any) => void) | undefined
) => {
    const { data } = response
    removePadding(<AxiosOptions>response.config)
    const { code } = data
    const parseData = data?.data ?? data ?? response
    if(String(code) === CODE.success){
        if(success) success?.(parseData)
    }
    else fail?.(parseData)
    complete?.(parseData)
    return response
}

/** 响应失败 根据status进行验证判断 */
export const responseInterceptorsError = (
    error: any,
    fail: ((error: any) => void) | undefined,
    complete: ((error: any) => void) | undefined
) => {
    const status = error?.response?.status
    const failData = error?.response ?? error
    if(status === 401 && window.location.pathname !== '/' && !!getCookie('SESSION')) {
        alert('登录状态失效')
    }
    fail?.(failData)
    complete?.(failData)
    return  error
}
