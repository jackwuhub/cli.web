import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/base.less'
import '@/assets/style/animation.less'
import '@/assets/style/custom.less'
import '@/assets/style/color.less'
import component from "@/components";
import directive from "@/directive";
import {router} from '@/router'
import routerMain from '@/router'
import pinia from './store'
import elementUI from "@/utils/elementUI/elementUI";
const bootstrap = async () => {
    const app = createApp(App)
    // 注册全局自定义组件
    app.use(component)
    // 注册自定义指令
    app.use(directive)
    // 加载pinia
    app.use(pinia)
    // 加载elementUI
    app.use(elementUI)
    // 注册router
    app.use(routerMain)
    // 等待路由加载完成
    await router.isReady()

    // 挂载页面
    app.mount('#app',true)
}

void bootstrap()
