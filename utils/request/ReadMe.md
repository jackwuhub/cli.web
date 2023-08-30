# request

## 功能
> 1. 二次封装微信官方request方法
> 2. 使用Ts + Enum方式映射API, 简化更改操作
> 3. 劫持```set-token```, 将其部署到storage中, 无需关注cookie写入
> 4. 写法类似官方request
> 5. 请求可以使用callback接受promise, 也可以使用.then()/.catch方式
> 6. callback中可以作为原始数据初次处理, return 之后 使用promise接收亦可
> 7. formData格式处理
> 8. request请求任务回调


## 注意
> 1. .then() 只接受请求成功, 不包含业务, 证明链路无问题
> 2. .catch() 只接受请求失败, 不包含业务, 例如服务器异常500/400等, 数据只有错误的日志信息📔
> 3. success() 只接受 业务 正常, 例如code === 1
> 4. fail()  接受 业务 错误, 例如其他状态问题
## 案例
```ts
    request.post({
    api: APIS.login, // API项, 通过根目录requestAPI.ts文件修改
    service: SERVERS.baseUrl,
    isFormData: true,
    data:{
        username: 13333333333,
        password: 13333333333
    },
    success: () => {
        request.get({
            api: APIS.userInfo,
            service: SERVERS.baseUrl,
            success:(res) => {
                console.log(res)
                return res
            }
        })
    }
})
```
