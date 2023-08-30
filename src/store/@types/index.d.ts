import {AsideMenuItem} from "@/layouts/components/AsideMenu/types";
import {RouterRaw} from "@/router/@types";

export interface UserState { // 用户store
    userInfo: {
        userId:string
        photo:string
        photoUrl:string
        email:string
        mobile: string
        deptId:string | null
        deptName: string | null
        name:string
        username:string
        brandId:string
    } | null
}
export interface PermissionState { // 权限store
    roles:string[] // 角色
    permissions:string[] // 权限
    routes:RouterRaw[]
}
export interface SettingState {
    menu: {
        collapse: boolean
        menuList: AsideMenuItem[]
    },
    theme: 'light' | 'dark'
}