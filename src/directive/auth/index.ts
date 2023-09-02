import Auth from './src/main'
import {App} from "vue";

export default (app:App) => {
    app.directive('Auth',Auth)
}
