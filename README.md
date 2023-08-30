# Wechat-MiniProgram-Template

## 架构 typescript + TDesignUI + Less

## 功能（基础）
> - request二次封装, 采用映射APIEnum方式
> - 项目使用typescript构建, 各个模块严格按照types校验执行, 加强代码严谨度
> - 小程序使用第三方UI包, 采用TDesignUI-Miniprogram版本, PC/H5 风格统一,减少UI侧压力
> - 


## 目录说明

> - pages存放页面路径，需要同步配置/router/routes下模板配合食用
> - modules文件夹层级对应pages目录层级，拆解使用
> - components 存放自定义公共组件，拆解越详细越好，要兼容多个使用场景，如果不确定则写到modules业务模块中
> - helper 存放自定义快捷工具, 分为一些数据处理方法, 小程序设置等, 通常跟着项目搬运
> - utils 存放外部工具包，一些压缩的Npm包等,移植的内容 ,也可以是npm引入的工具二次封装, 可以移植的SDK
> - store 数据持久化 内部使用模块拆解

## 请求
> 1、```/requestApis.ts```文件,server代表选择的代理服务接口 apis代表请求的path映射
> 2、封装方法支持 post、get、put、delete、patch方法，引入资源之后 使用request.get方式即可
> 4、config 为自定义配置项,详情查看request目录下的ReadMe文件

## 分包
> 1. 项目采用分包策略进行维护, 防止后续开发由于包过大导致项目无法合理拆解
> 2. ```/pages/mainPack```为默认包,也就是进入小程序看到的基础页面
> 3. 后续分包根据子页进行拆分, 为tabBar页面的子页面

## 页面
> 1、使用微信官网配置方式, 放入pages内并且再app.json中进行补充
> 2、页面拆解规则为以当前路径为主
> 同级存有：
>> 声明 ```index.json```
>> 入口 ```index.less```
>> 样式 ```index.ts```
>> 模板 ```index.wxml```
>> 模块```/modules```存储格式同样类似 为当前页面下的子模块组件




