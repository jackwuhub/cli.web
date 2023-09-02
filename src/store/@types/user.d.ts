export interface UserState { // 用户store
    userInfo: {
        [key:string]:any
        photo:string
        name: string
        corpId:string
        userId:string
    } | null
}