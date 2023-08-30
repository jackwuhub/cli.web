import {defineStore} from "pinia";
import axios from "@/utils/axios";
import {apis, servers} from "@/requestApis";
import {UserState} from "./@types/index";
export default defineStore({
    id:'user',
    state: (): UserState => ({
        userInfo: null
    }),
    getters:{
        /** 是否登陆 */
        isLogin(): boolean {
            return !!this.userInfo
        },
    },
    actions:{
        /** 更新用户数据 */
        upgradeUserInfo():Promise<void>{
            return new Promise(async (resolve,reject) => {
                await axios.get({
                    api:apis.userInfo,
                    server: servers.baseServer,
                    success: res => {
                        this.userInfo = res
                        resolve(res)
                    },
                    fail: ({status,message,msg}) => {
                        if(String(status) === '401') resolve()
                        else resolve()
                    },
                })
            })
        },
        /**退出登录*/
        logout():Promise<boolean> {
            return new Promise(async (resolve,reject) => {
                axios.post({
                    api: apis.userLogout,
                    server: servers.baseServer,
                    success:(res:any) => {
                        this.userInfo = null
                        resolve(true)
                        window.location.replace('/')
                    },
                    fail:() => reject(false)
                })

            })
        }
    },
})
