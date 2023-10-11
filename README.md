# TamperMonkey-Template

## 架构 typescript + vite2 + vue3 + TDesignUI +  axios

## 功能（基础）
> - 开发脚本使用
> - 带有dev watch, 自动加入脚本至浏览器
> - axios二次封装，带有请求padding队列拦截（用于实时搜索框等场景）


## 目录说明

> - 核心内容在 main.ts文件 模块化加载，按需引入功能模块
> - modules对应的功能模块, 单个输出
> - hooks 存放一些基于框架封装的便捷方法（比如：autoFocus、mixin替代方案、props模板生成等）
> - components 存放自定义公共组件，拆解越详细越好，要兼容多个使用场景，如果不确定则写到modules业务模块中
> - helper 存放自定义快捷工具 便业务方向，目录下拆解为interactive（交互）、model（元素）、type（数据类型）
> - utils 存放外部工具包，也可以是npm引入的工具二次封装（比如：vant组件、element组件、echarts、sdk等

## 请求
> 1、vite进行反向接口代理 对于官方vite配置进行二次封装 填入需要代理的后端接口前缀 prefix 以及 实际域名 target 即可
> 2、使用axios需要配置```/requestApis.ts```文件,server代表选择的代理服务接口 apis代表请求的path映射
> 3、封装方法支持 post、get、put、delete、patch方法，引入资源之后 使用axios.get(config)即可
> 4、config 基础为axios参数内容，post-data、 get-params





## 调整
> 1. 针对TDesignUI icon 组件进行更新, 自定义绑定全部1200+图标样式, 实现无网络加载


