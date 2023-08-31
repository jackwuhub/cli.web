# LDGY-CLI 
## 快速构建前端项目, 包含 UI组件 / 工具包 / 项目模板

### 目前支持

1. 网页
> 1. admin 带有鉴权路由的权限系统
> 2. datav 大屏系统
> 3. wechat-miniprogram 微信小程序项目
> 4. h5 移动端网页

2. 涉及框架
> 1. vue3.js 
> 2. vue2.js (延后)
> 3. nuxt.js (延后)
> 4. nuxt3.js (正在补充)
> 5. next.js(延后)
> 6. react.js (延后)

3. 支持UI框架
> 1. TDesignUI
> 2. ElementUI (正在补充)
> 3. Ant design UI (正在补充)
> 4. Vant UI (正在补充)

4. utils 工具包含
> 1. helper: 常用处理方法
> 2. react-hooks 
> 3. vue3-hooks
> 4. SDK: 第三方包进行二次封装, 例如 Axios / tinyEditor

### 附加说明
> 1. 网页项目全部使用 ts + less 语法
> 2. utils 目前正在封装框架, 目标基于 vite / webpack / rollup 三种打包工具进行构建, 带有jest测试模板
> 3. component 需求较低, 目前大部分使用第三方UI库进行二次封装使用
> 4. datav 预期封装一套charts组件, 基于echarts / highCharts / antCharts