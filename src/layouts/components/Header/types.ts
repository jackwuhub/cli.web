import type{Router} from "vue-router";
import type{Ref} from "vue";
export interface Info {
    name:string,
    avatar:string,
    avatarText:string
}
export type UseUser = (router:Router) => {
    info: Ref<Info>,
    loginOut: (callBack:Function) => void,//退出登录
    setInfo: (infos:Partial<Info>) => void,
}
