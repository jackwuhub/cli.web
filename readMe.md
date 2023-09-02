# H5-template-tdsign项目

##### 框架 jest + typescript + vite2 + vue3 + tDesignUI + pinia + vue-router + axios

## 功能（基础）

> - 接入微信公众号
> - 404错误页
> - axios二次封装，带有请求padding队列拦截（用于实时搜索框等场景）
> - path + modules 方式拆解项目 便于开发维护

## 目录说明

> - 核心内容在 main.ts文件 模块化加载，按需引入功能模块
> - pages存放页面路径，需要同步配置/routes下模板配合食用
> - modules文件夹层级对应pages目录层级，拆解使用
> - directive 存放一些自定义指令（比如：控制某个元素权益显隐,auth鉴权）
> - components 存放自定义公共组件，拆解越详细越好，要兼容多个使用场景，如果不确定则写到modules业务模块中
> - assets 可压缩代码，存放一些静态资源
> - helper 存放自定义快捷工具 便业务方向
> - utils 存放外部工具包，也可以是npm引入的工具二次封装（比如：tDesign组件、element组件、echarts、sdk等）
> - store 数据持久化 内部使用模块拆解
> - router 路由管理

## 请求
> 1. vite进行反向接口代理 对于官方vite配置进行二次封装 填入需要代理的后端接口前缀 prefix 以及 实际域名 target 即可
> 2. 使用axios需要配置```/requestApis.ts```文件,server代表选择的代理服务接口 apis代表请求的path映射
> 3. 封装方法支持 post、get、put、delete、patch方法，引入资源之后 使用axios.get(config)即可
> 4. config 基础为axios参数内容，post-data、 get-params

## 存储
> 1. 存储使用pinia模块，统计目录下是不同模块的拆分，比如```user.ts``` 为用户数据的存储
> 2. 新增数据依据模板进行建立并在```/store/index.ts```文件中引入即可

## 页面
> 1. 在pages目录下，每个页面需要在```/routes.ts```文件中进行引入，大致分为基础页面rootRouters、权限页面dynamicRoutes，按需进行填入即可
> 2. 动态路由添加放置于```/pages/login``` 页面下，目前暂无鉴权路由页面 故手动填入 格式为
>    {name:string, children:{name:string}}
> 3. 页面拆解规则为以当前路径为主
>    同级存有：
>    声明/页面hooks等 ```types.ts```
>    入口 ```index.vue```
>    模块```/modules```存储格式同样类似 为当前页面下的子模块组件
> 4. 路由规则校验使用vue-router守卫实现
> 5. 动态title：在路由表meta中填写，使用路由后置守卫进行变化
> 6. 加载进度条：使用Nprogress方案，路由前置守卫开启，后置守卫关闭
> 7. 添加页面：需要同时配置```/routes.ts```与```/router/index/setRouter()```两个部分才可以正常使用

## 登陆
> 1、项目进入即登陆，在没有session时则使用oauth进行授权
> 2、登陆功能在```/pages/login```实现，进入到此页面
> > - oauth回调进入
> >      + 需要识别query-code参数，query-path参数
> >      + code传递给服务端进行setCookie操作，此时cookie带有session信息，使用replace路由重新加载main.ts获取用户信息即可
> >      + redirect为重定向功能页面地址

## wx-sdk注册
> 使用hash路由方式，首次加载页面初始化即可


