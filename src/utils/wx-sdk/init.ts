import {GetInitConfig, InitSDK} from './@types/init.d'
import axios from "@/utils/axios";
import {apis, servers} from "@/requestApis";

/**
 * 获取sdk配置
 * @param path
 */
export const getInitConfig:GetInitConfig = (path) => {
    return new Promise((resolve,reject) => {
        axios.post({
            api:apis.initConfig,
            server:servers.baseServer,
            data:{ url:path },
            success: (res:any) => console.log(res),
            fail: (err:any) => reject(err)
        })
    })
}

/** 初始化SDK */
export const initSDK:InitSDK = (path, config) => {
    return new Promise(async (resolve, reject) => {
        if(!path) path = window.location.origin
        if(!config) { // 获取初始化参数
            await getInitConfig(path).
                then((res) => config = res).
                catch((err:any) => reject(err))
        }
        if(!config) return reject()
        wx?.config({
            ...config,
            debug: true,
            jsApiList:[],
            openTagList:['wx-open-launch-app']
        })
        wx.ready(() => {
            resolve(true)
        })
        wx.error(() => {
            reject(false)
        })
    })
}
