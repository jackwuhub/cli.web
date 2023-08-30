import Scrollbar from './src/Scrollbar.vue';
import {App} from 'vue'
const install = (app:App) => {
    app.component('ScrollBar',Scrollbar)
}
export default install
