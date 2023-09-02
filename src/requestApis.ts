// 请求api
export enum apis {
    userInfo = '/sys/user/customer_info', // 获取用户信息
    oauth = '/public/wx/oauth', // oauth登录
    setCookie = '/login', // 登陆
    initConfig = '/public/wx/jsapi_signature' // 获取jsdk签名
}
// 服务映射多个接口配合使用
export enum servers{
    baseServer = '/api'
}

export enum CODE {
    success = '1'
}
