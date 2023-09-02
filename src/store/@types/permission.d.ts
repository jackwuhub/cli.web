import {RouterRaw} from "@/router/@types/index";

export interface PermissionState { // 权限store
    roles:string[] // 角色
    permissions:string[] // 权限
    routes:RouterRaw[]
}