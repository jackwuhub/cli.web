# Axios 二次封装

## 功能描述
> #### 1. 支持5种常规restful方法 get、post、put、delete、patch
> #### 2. 请求每次重新创建axios对象，相互隔离
> #### 3. 带有下载、上传进度跟踪
> #### 4. 可控重复请求拦截，减少http请求量
> #### 5. 拆除api server部分，可以面向多个服务进行隔离
> #### 6. 内置success fail complete 回调方法
##举个栗子🌰
```js
import { get,post,put,delete, patch } from 'axios'
get({
    api:'', // api路由地址
    server:'', // 服务器地址
    success: (res) => {}, // 请求成功回调
    fail: (error) => {}, // 请求失败回调
    complete: () => {}, // 请求完成回调
    onDownload:(percent,res) => {}, // 监控下载
    onUpload: (percent,res) => {}, // 监控上传
    onlyOnce: false, // 拦截重复请求开关
    params:{}, // 参数
    data: {}, // formData 传递格式
    routerParams:{}, // 路由参数
    headers:{}, // 请求头配置
    ...defaultConfig // 默认axios配置
})

```


##文件模板
需要两个外部文件进行配置开发
> ##api
> ```js
> {
>  user: "/v1/user/{brandId}", // 此处{brandId} 即为路由参数，使用routerParams进行赋值
>  psDown: '/down/700cb8c55986dc55d8bd229429883baf/FSNotes-5.3.4.dmg?cts=dx-f-D115A227A193A117F58019&ctp=115A227A193A117&ctt=1642514513&limit=1&spd=340000&ctk=700cb8c55986dc55d8bd229429883baf&chk=e25d29cd88a850099329e038e5ebf548-15928825'
> }
>```

>##server
> ```js
>    baseApi: "/baseApi", // 路由转发地址，根据node代理进行合理配置
>    downloadP:'/downloadP'
> ```




##注意事项⚠️
> ####  1. *server* 为实际开发 node代理后的服务器地址名称
> ####  2. 不论是请求成功与失败 *complete* 都会执行，可以控制一些loading方法
> ####  3. 请求头默认使用 *application/json* 格式，如需更改使用header对象填写即可
> ####  4. *routerParams* 编写 api 中对应的 *routerId* 参数
> ####  5. onlyOnce = true 时开启重复检测，当前一个请求未完成，再次请求会停止前一个请求，保证数据唯一
> ####  6. then() / catch() 只负责请求响应数据, 不涉及业务
> ####  7. success / fail 只负责业务, 响应数据会进行包裹, 需要进行业务转换处理

## A&Q
>#### Q:如何拦截重复请求？ 
>#### A: 使用cancelToken方法进行控制，每次请求都会存储一个队列，根据url + methods作为key进行存储，请求成功或失败都会出队
> 
>#### Q: 最终请求链接是如何整合的？
>#### A：使用api + server + routerParams 参数进行整合url
