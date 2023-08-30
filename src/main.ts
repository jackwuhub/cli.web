import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/base.less'
import '@/assets/style/animation.less'
import '@/assets/style/tDesignUI.less'
import '@/assets/style/custom.less'
import '@/assets/style/color.less'
import component from "@/components";
import directive from "@/directive";
import {router} from '@/router'
import routerMain from '@/router'
import pinia from './store'
import TDesignUI from "@/utils/TDesignUI";
const bootstrap = async () => {
    const app = createApp(App)
    // 注册全局自定义组件
    app.use(component)
    // 注册自定义指令
    app.use(directive)
    // 注册TDesignUI组件 按需手动引入
    app.use(TDesignUI)
    // 加载pinia
    app.use(pinia)
    // 注册router
    app.use(routerMain)
    // 等待路由加载完成
    await router.isReady()

    // 挂载页面
    app.mount('#app',true)
}

void bootstrap()
