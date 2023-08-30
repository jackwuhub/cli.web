import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import {permissionStore, userStore} from "@/store";
import {Guard} from "@/router/@types";
export default (router:Router) => {
    router.beforeEach(  async (to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {
        const isLogin = userStore.isLogin
        // 未登录进入注册页面， 放行
        if(!isLogin && to.name === 'register') return next()
        // 已经登录 && 进入注册页 强制进入首页
        else if(isLogin && to.name === 'register') next(permissionStore.getHomePage())
        // 未登录 && 不是跳转登录页 强制拦截进入登录页面，并带上当前path
        else if(!isLogin && to.name !== 'login') next({name: 'login', query: {redirectPath: to.fullPath}})
        // 已经登录 && 进入登录页 强制进入首页
        else if(isLogin && to.name === 'login') next(permissionStore.getHomePage())
        // 正常放行
        else next()
    })
}