import axios from "@/utils/axios";
import {apis, servers} from "@/requestApis";
import {spellUrl} from "@/helper";


/** 获取微信oauth地址 */
export type GetOauthUrl = (redirectUrl:string) => Promise<string>
export const getOauthUrl:GetOauthUrl = (redirectUrl) => {
    return new Promise((resolve,reject) => {
        axios.post({
            api: apis.oauth,
            server: servers.baseServer,
            data:{ redirectUrl },
            success: (res:any) => resolve(<string>res ?? ''),
            fail: () => reject('')
        })
    })
}
/** 设置cookie鉴权 */
export type SetCookie = (auth_code:string,corpId:string) => Promise<void>
export const setCookie:SetCookie = (auth_code,corpId) => {
    return new Promise((resolve, reject) => {
        const data = new FormData()
        data.append('auth_code', auth_code)
        data.append('corp_id', corpId)
        data.append('password', 'none')
        data.append('type', 'MP_WEIXIN')
        axios.post({
            api: apis.setCookie,
            server: servers.baseServer,
            data,
            success: () => resolve(),
            fail: (error) => {
                const {code, msg} = error
                reject()
            }
        })
    })
}
/** 跳转微信公众号Oauth链接 */
export type GoOauth = (corpId:string,redirect?:string) => void
export const goOauth:GoOauth = async (corpId, redirect = '') => {
    const redirectUrl:string = spellUrl(`${window.location.origin}/#/login`,{ corpId, redirect})
    const oauthUrl:string = await getOauthUrl(redirectUrl)
    if(oauthUrl) window.location.replace(oauthUrl)
}

/** 重定向跳转页面 */
export type ReplaceLocation = (path:string,query:any) => void
export const replaceLocation:ReplaceLocation = (path,query) => {
    const replacePath:string = path.replace(/^(?!\/)|(\/{2,})/g, '/')
    window.location.replace(spellUrl(`${window.location.origin}/#${replacePath}`,query))
}