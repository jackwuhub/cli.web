// 请求api
export enum apis {
    userInfo = '/sys/user/info', // 获取用户信息
    userLogout = '/logout',
    permission = '/sys/user/get_resources', // 获取权限信息
}
// 服务映射多个接口配合使用
export enum servers{
    baseServer = '/api'
}
export enum CODE {
    success = '1'
}
