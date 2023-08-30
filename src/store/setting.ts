import {defineStore} from "pinia";
import {SettingState} from "./@types/index";
import {AsideMenuItem} from "@/layouts/components/AsideMenu/types";

export default defineStore({
    id:'setting',
    state:():SettingState => ({
        menu: {
            collapse: false,
            menuList: [],
        },
        theme: 'light'
    }),
    getters:{
        /** get 折叠 */
        collapse(): boolean { return !!this.menu?.collapse },
        /** 侧边栏 menu-item */
        menuList(): AsideMenuItem[] {
            return this.menu.menuList
        }
    },
    actions:{
        /** 反转折叠 */
        toggleCollapse() { this.menu.collapse = !this.menu.collapse },
        /** 设置menu */
        setMenuList(menuList:AsideMenuItem[] = []){ this.menu.menuList = menuList },
        /** 设置主题 */
        setTheme(theme:'light' | 'dark'){
            document.documentElement.setAttribute('theme-mode', theme);
            this.theme = theme
        }
    }
})