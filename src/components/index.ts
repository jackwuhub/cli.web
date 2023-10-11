import { App } from 'vue'
import Scrollbar from './Scrollbar'
/** 组件注册 */
export default (app:App) => {
    app.use(Scrollbar)
}
