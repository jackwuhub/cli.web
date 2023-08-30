import {APIS, SERVERS} from "../../requestApis";
import RequestOption = WechatMiniprogram.RequestOption;


export interface RequestOptions extends Partial<RequestOption>{
    api:APIS
    service: SERVERS
    routeParams?:{[key:string]: any}
    isFormData?:boolean
    requestTask?:RequestTask
}
export type Method =
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
export type RequestTask = (task: WechatMiniprogram.RequestTask) => void
export type ParseUrl = (url:string, params:{[key:string]:any}) => string
export type ReqRoad = (api:string, routeParams:{[key:string]:any} | undefined,service:string) => string
export type SetCookie2Store = (res:{[key:string]:any}) => void
export type GetCookieByStore = () => string
export type RequestMethod = (options:RequestOptions) => Promise<any>
export type GetCookieByKey = (keyName:string) => string | null
export type GenericRequest = (method:Method) => RequestMethod
