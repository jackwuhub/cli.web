import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/index.less'
import component from "@/components";
import directive from "@/directive";
import {router} from '@/router'
import routerMain from '@/router'
import pinia from './store'
import AntdUI from "@/utils/antdUI";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh');
const bootstrap = async () => {
    const app = createApp(App)
    // 注册全局自定义组件
    app.use(component)
    // 注册自定义指令
    app.use(directive)
    // 加载pinia
    app.use(pinia)
    // 加载elementUI
    app.use(AntdUI)
    // 注册router
    app.use(routerMain)
    // 等待路由加载完成
    await router.isReady()

    // 挂载页面
    app.mount('#app',true)
}

void bootstrap()
