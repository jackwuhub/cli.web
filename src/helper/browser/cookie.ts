import {AnyObject, DeleteCookie, GetCookie, SetCookie} from './@types/cookie'
/** 设置cookie */
export const setCookie:SetCookie = (key, value, during,domain = document.domain) => {
    const expDays = new Date()
    expDays.setTime(expDays.getTime() + during * 1000 * 60 * 60 * 24)
    document.cookie = `${key}=${escape(value)};expires=${expDays.toString()};path=/;domain=${domain}`
}


/**
 * 删除cookie
 * @param key cookie key
 * @param domain 清除的域名
 */
export const deleteCookie:DeleteCookie = (key, domain):void => {
    if(key){
        setCookie(key,'',-1)
        setCookie(key,'',-1,domain)
    }else{
        for (let cookieKey in getCookie() as AnyObject<string>) {
            setCookie(cookieKey,'',-1)
            setCookie(cookieKey,'',-1,domain)
        }
    }
}


/**
 *  获取cookie内容
 * @param key   cookie的key
 * @return value  cookie 的值
 */
export const getCookie:GetCookie = ( key ) => {
        const cookie = document.cookie
        let cookieArr:string[] = []
        let cookieObject:{[key:string]:any} = {}
        if(cookie){
            cookieArr = cookie.split(';')
            cookieObject = cookieArr.reduce( (total:any, ele:string):any => {
                const key = ele.split('=')[0].trim()
                total[key] = ele.split('=')[1].trim()
                return total
            },{})
        }
        return key ? cookieObject[key] : cookieObject
    // }
}

