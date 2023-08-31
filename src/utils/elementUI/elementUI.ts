import {App} from "vue";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Icon from './icons'
import {
    ElButton
} from "element-plus";

export default (app:App) => {
    app.use(ElButton)
    app.use(Icon)
}