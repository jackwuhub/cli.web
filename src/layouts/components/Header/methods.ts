import type{ UseUser,Info } from "./types";
import type{Router} from "vue-router";
import type{Ref} from "vue";
import {ref} from "vue";
export const defaultUserInfo = {
    avatar:'',
    name:'',
    avatarText: ''
}
export const useUser:UseUser = (router:Router) => {
    const info:Ref<Info> = ref(defaultUserInfo);
    const loginOut = (callback:Function) => {
        callback();
        router.push({name:'login'}).then();
    }
    const setInfo = (infos:Partial<Info>) => {
        info.value = {...info.value,...infos};
    }
    return {
        info,
        loginOut,
        setInfo,
    }
}

