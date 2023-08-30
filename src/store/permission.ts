import {defineStore} from "pinia";
import {PermissionState} from "./@types/index";
import axios from "@/utils/axios";
import {apis, servers} from "@/requestApis";
export default defineStore({
    id:'permission',
    state:():PermissionState => ({
        roles: [],
        routes: [],
        permissions: []
    }),
    getters:{

    },
    actions:{
        /** 更新权限信息 */
        upgradePermissionInfo():Promise<void>{
            return new Promise(async (resolve) => {
                await axios.get({
                    api:apis.permission,
                    server: servers.baseServer,
                    success: (res:any) => {
                        const { permissions,roles,routes } = res ?? {}
                        this.roles = roles ?? []
                        this.permissions = permissions ?? []
                        this.routes = routes ?? []
                        resolve()
                    },
                    fail: ({status,message,msg}) => {
                        if(String(status) === '401') resolve()
                        else resolve()
                    },
                })
            })
        },
        /** 判定是否有操作权限 */
        hasPermission(name:string):boolean{
            return this.permissions.includes(name)
        },
        /** 判断是否有角色权限 */
        hasRole(names:string[]):boolean{
            return names?.some(
                (ele:string) => this.roles?.findIndex((role:string) => role === ele) !== -1
            )
        },
        /** 获取首个权限页面 */
        getHomePage():string {
            if(!this.routes.length) return '403'
            return this.routes?.[0].name.toLowerCase()
        }
    }
})