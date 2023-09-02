import { WxConfig } from '@types/wx-js-sdk-browser'

// 初始化config
export type InitSDK = (path?:string,config?:WxConfig) => Promise<boolean>
// 获取config数据参数
export type GetInitConfig = (path:string) => Promise<WxConfig | void>