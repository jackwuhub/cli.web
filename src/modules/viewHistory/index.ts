import {createApp} from "vue";
import index from './src/index.vue'
export default () => {
    const app = createApp(index)
    app.mount('body > div.container > div.header-container > div.header-right > div.share-li.share-li-phone',true)
}
