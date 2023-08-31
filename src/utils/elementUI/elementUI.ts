import {App} from "vue";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Icon from './icons'
import {
    ElConfigProvider,
    ElButton,
    ElSwitch,
    ElImage,
    ElPopover,
    ElAvatar,
    ElPopconfirm,
    ElScrollbar,
    ElLink
} from "element-plus";

export default (app:App) => {
    app.use(ElButton)
    app.use(ElLink)
    app.use(ElScrollbar)
    app.use(ElConfigProvider)
    app.use(ElSwitch)
    app.use(ElImage)
    app.use(ElPopover)
    app.use(ElAvatar)
    app.use(ElPopconfirm)
    app.use(Icon)
}