import { App } from 'vue'
import Auth from "./auth";
/** 组件注册 */
export default (app:App) => {
    app.use(Auth)
}
