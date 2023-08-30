import {GetCookieByKey, GetCookieByStore, ParseUrl, ReqRoad, SetCookie2Store} from "./types";

export const parseUrl:ParseUrl = (url, params) => url && url.replace(/\{(\w+)\}/g, (_m, n) => params[n])

export const reqRoad:ReqRoad = (api, routeParams, service) => service + parseUrl(api, routeParams ?? {})



export const setCookie:SetCookie2Store = (res) => {
    const cookie:string = res?.header?.["Set-Cookie"] ?? ''
    const cookieList:string[] = cookie.split(',')
    let cookieObj = wx.getStorageSync('cookie')
    cookieList.forEach((item) => {
        const parseValue = /([^=;\s]+)=([^;]+);?/g.exec(item)
        const key:string = parseValue?.[1] ?? ''
        const value:string = parseValue?.[2] ?? ''
        if(key) cookieObj = { ...cookieObj,[key]:value }
    })

    wx.setStorageSync('cookie',cookieObj)
}
export const parseCookie:GetCookieByStore = () => {
    let cookie = ''
    const cookieObj = wx.getStorageSync('cookie')
    if(!cookieObj) return cookie
    for (const key in cookieObj) {
        cookie += `${key}=${cookieObj[key]};`
    }
    return cookie
}
export const getCookieByKey:GetCookieByKey = (keyName:string) => {
    if(!keyName) return console.error('keyName不合法')
    const cookieObj = wx.getStorageSync('cookie')
    return cookieObj?.[keyName]
}