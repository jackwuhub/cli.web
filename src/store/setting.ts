import {defineStore} from "pinia";
import {SettingState} from "@/store/@types/setting";
export default defineStore({
    id:'setting',
    state:():SettingState => ({
        tabs:[
            { label:'首页', route:'/', icon: 'home' },
            { label:'我的', route:'/my', icon: 'user' },
            { label:'登陆', route:'/login', icon: 'role' },
            { label:'测试2', route:'/test', icon: 'dept' },
        ]
    }),
    getters:{

    },
    actions:{

    }
})