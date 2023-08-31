import {defineStore} from "pinia";
import {SettingState} from "./@types/index";
import {theme} from "ant-design-vue";

export default defineStore({
    id:'setting',
    state:():SettingState => ({
        menu: {
            collapse: false,
            menuList: [],
        },
        theme: {
            algorithm:theme.defaultAlgorithm
        },

    }),
    getters:{
        /** get 折叠 */
        collapse(): boolean { return !!this.menu?.collapse },
        /** 侧边栏 menu-item */
        menuList(): any[] {
            return this.menu.menuList
        }
    },
    actions:{
        /** 反转折叠 */
        toggleCollapse() { this.menu.collapse = !this.menu.collapse },
        /** 设置menu */
        setMenuList(menuList:any[] = []){ this.menu.menuList = menuList },
        /** 设置主题模式 */
        setThemeMode(mode: 'light' | 'dark'){
            if(mode === 'light') this.theme.algorithm = theme.defaultAlgorithm
            else this.theme.algorithm = theme.darkAlgorithm
        },
    }
})