import {RouteLocationNormalized, Router} from "vue-router";
import config from "@/config";
/**
 *  设置网页title
 * @param title { string }
 */
const setTitle = (title:string):void => {
    const doc = window?.document
    if(!doc) return console.warn('设置标题：获取document出错')
    doc.title = title
}
const afterGuard = (router:Router) => {
    router.afterEach((to:RouteLocationNormalized,from:RouteLocationNormalized) => {
        const { title } = to?.meta
        setTitle(title as string ?? config.title )
    })
}
export default afterGuard
