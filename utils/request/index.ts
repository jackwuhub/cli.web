import {GenericRequest, RequestMethod} from "./types";
import {parseCookie, reqRoad, setCookie} from "./helper";
import {CODE} from "../../requestApis";
const JSONBig = require('../../miniprogram_npm/json-bigint/index')
const JSONbig = JSONBig({storeAsString: true})
export const genericRequest:GenericRequest = (method) => {
    const requestMethod:RequestMethod = (options) => {
        const {api,
            routeParams,
            data,
            service,
            fail,
            success,
            isFormData,
            requestTask,
            ...otherConfig
        } = options;
        const url = reqRoad(api, routeParams, service);
        return new Promise((resolve, reject) => {
            const task = wx.request({
                method,
                url,
                data,
                header:{
                    Accept: "application/json",
                    "Content-Type": isFormData ? 'application/x-www-form-urlencoded; charset=UTF-8' : "application/json",
                    'cookie': parseCookie(),
                },
                ...otherConfig,
                success: (res) => {
                    setCookie(res) // 种植cookie
                    const data = JSONbig.parse(JSONbig.stringify(res?.data ? res.data : res))
                    const parseData = data?.data ?? data ?? res
                    const code = String(data?.code)
                    if (code === CODE.success ) { if(success) success(parseData) } // 一切正常
                    else if(  // 鉴权失败
                        code === CODE.notLogin ||
                        res?.statusCode === 401
                    ) { wx.setStorageSync('cookie','') }
                    else if(fail) fail(parseData) // 其他异常
                    resolve(res)
                },
                fail: (err) => {
                    reject(err)
                }
            })
            requestTask && requestTask(task)

        })
    }
    return requestMethod
}


export default {
    get: genericRequest('GET'),
    post: genericRequest('POST'),
    delete: genericRequest('DELETE'),
    put: genericRequest('PUT'),
    trance: genericRequest('TRACE'),
    connect: genericRequest('CONNECT'),
    options: genericRequest('OPTIONS'),
}
