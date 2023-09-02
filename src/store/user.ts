import {defineStore} from "pinia";
import axios from "@/utils/axios";
import {apis, servers} from "@/requestApis";
import {UserState} from "./@types/user";
export default defineStore({
    id:'user',
    state: (): UserState => ({
        userInfo: null
    }),
    getters:{
        /** 是否登陆 */
        isLogin(): Boolean {
            return !!this.userInfo && !!this.userInfo?.userId
        },
    },
    actions:{
        /** 更新用户数据 */
        upgradeUserInfo(){
            return new Promise(async (resolve,reject) => {
                await axios.get({
                    api:apis.userInfo,
                    server: servers.baseServer,
                    success: res => {
                        this.userInfo = res
                        resolve(res)
                    },
                    fail: ({status,message,msg}) => {
                        if(String(status) === '401') resolve(null)
                        else {
                            resolve(null)
                        }
                    },
                })
            })
        },
        /**清除用户数据*/
        clearUserInfo() {
            return new Promise(async (resolve,reject) => {
                this.userInfo = null
                resolve(true)
            })
        }
    },
})
