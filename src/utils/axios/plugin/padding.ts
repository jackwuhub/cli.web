import Axios from "axios";
import {AxiosOptions, paddingItem } from '../@type'
let padding:paddingItem[] = []  // 请求队列

/**
 * 记录请求 ，在请求时，加入 onlyOnce：true 即可
 * @param config
 */
export function addPadding(config:AxiosOptions){
    if(!config.onlyOnce){ return null }
    removePadding(config)
    return  config.cancelToken =  new Axios.CancelToken( fn => { // 存入新的请求
        padding.push({key:config.url + '&' + config.method , cancel: fn})
    })
}
/**
 * 移除队列中的请求，用与阻止重复请求项
 * @param config
 */
export function removePadding(config:AxiosOptions){
    if(!config.onlyOnce){ return null }
    for (let [index,paddingElement] of padding.entries()) {
        if(paddingElement.key === config.url + '&' + config.method){
            paddingElement.cancel()
            padding.splice(index,1)
        }
    }
}