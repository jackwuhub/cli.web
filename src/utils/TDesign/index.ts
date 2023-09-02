import {App} from "vue";
import Icon from './icons'
import {
    Button as TButton,
    TabBar as TTabBar,
    TabBarItem as TTabBarItem
} from 'tdesign-mobile-vue'
export default (app:App) => {
    app.use(TButton)
    app.use(TTabBar)
    app.use(TTabBarItem)
    app.use(Icon)
}
