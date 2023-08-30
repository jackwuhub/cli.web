import {DEFAULT_USER_STATE, UserStoreState} from "./types";
import {ConstructorStore} from '@/store/core/index';
import request from "@/utils/request/index";
import {APIS, SERVERS} from "@/requestApis";
import {getLoginCode, loginByPhoneNum} from "@/utils/SDK/openApi";
import {PhoneNumConfig} from "@/utils/SDK/@types/openApi";
import {getCookieByKey} from "@/utils/request/helper";

export default new ConstructorStore({
    id: "user",
    state: ():UserStoreState => DEFAULT_USER_STATE,
    actions:{
        isLogin():boolean{
            console.log(getCookieByKey('ssoToken'))
            return !!getCookieByKey('ssoToken')
        },
        /** 判断是否登录 */
        checkIsLogin(state){
            return !!state.userId
        },
        /** 种植code */
        setLoginCode(state):Promise<void>{
            return new Promise(resolve => {
                getLoginCode().
                then(code => {
                    state.code = code
                    resolve(void 0)
                })
            })
        },
        /** 设置用户信息 */
        setUserInfo(_state:any):Promise<any>{
            return new Promise((resolve,reject) => {
                request.get({
                    api: APIS.userInfo,
                    service: SERVERS.baseUrl,
                    success(res:any){
                        _state.userId = res?.id
                        _state.avatar = res?.avatar ? res.avatar : 'https://s6.bihukankan.com/common/default.png'
                        _state.nickName = res?.nickName
                        resolve(void 0)
                    },
                }).
                catch(() => reject(void 0))
            })
        },
        /** 清空用户数据 */
        clearUserinfo(_state:any){
            return new Promise((resolve) => {
                _state = DEFAULT_USER_STATE
                resolve(void 0)
            })
        },
        /** 请求登录 */
        login(state:any,event:PhoneNumConfig){
            const _this = this
            return new Promise((resolve,reject) => {
                loginByPhoneNum(event).
                then(res => {
                    request.post({
                        api: APIS.login,
                        service:SERVERS.loginCenter,
                        header: {
                            AppId: 27,
                        },
                        data: {
                            loginType: 4,
                            authType: 2,
                            ...res
                        },
                        success(){
                            _this.setUserInfo(state). // 设置用户信息
                            then(() => resolve(void 0)).
                            catch(() => reject(void 0))
                        },
                        fail(err){
                            reject(err)
                        },
                    }).catch((err) => reject(err))
                }).
                catch( err => {
                    reject(err)
                })
            })
        },
    }
})
