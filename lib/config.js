// 只有最终选项填写value, 内容为仓库url
// 不填写value, 没有choices 则禁用该选项
module.exports = {
    message:'您要开发什么?',
    choices:[
        {
            title: 'Web',
            description:'Web网页项目',
            message: '什么类型应用?',
            choices:[
                {
                    title:'Admin',
                    description:'后台管理项目, 带有鉴权',
                    message: '请选择开发框架',
                    choices:[
                        {
                            title: 'Vue3.js',
                            description: 'Vue3 + Vite',
                            message: '请选择UI组件库',
                            choices:[
                                {
                                    title:'Null UI',
                                    description: '不使用UI库',
                                },
                                {
                                    title: '(推荐)TDesignUI',
                                    description: '腾讯团队最新出品UI库',
                                    value: 'master::https://gitee.com/wuguangshuai/template.admin.vue3.tdsign.git'
                                },
                                {
                                    title:'elementUI',
                                    description: '饿了么团队出品的UI库',
                                },
                                {
                                    title:'ant-design-vue',
                                    description: 'antd社区版出品',
                                },
                            ]
                        },
                        {
                            title: 'Vue2.js',
                            description: 'Vue2 + Webpack'
                        },
                        {
                            title: 'React.js',
                            description: 'React + WebPack'
                        },
                        {
                            title: 'React@New.js',
                            description: 'React + Vite'
                        },
                        {
                            title:'Next.js',
                            description: 'SSR + React'
                        },
                        {
                            title:'Nuxt.js',
                            description: 'SSR + Vue2'
                        },
                        {
                            title:'Nuxt3.js',
                            description: 'SSR + Vue3'
                        }
                    ]
                },
                {
                    title: 'DataV',
                    description: '大屏项目, 暂未设定模板',
                    message: '请选择开发框架'
                },
                {
                    title: 'H5',
                    description: '移动端H5页面',
                    message: '请选择开发框架',
                    choices:[
                        {
                            title: 'Vue3.js',
                            description: 'Vue3 + Vite',
                            message: '请选择UI组件库',
                            choices:[
                                {
                                    title:'Null UI',
                                    description: '不使用UI库',
                                },
                                {
                                    title: '(推荐)TDesignUI-mobile',
                                    description: '腾讯团队最新出品UI库',
                                    value: 'master::https://gitee.com/wuguangshuai/template.h5.vue3.tdsign.git'
                                },
                                {
                                    title:'vantUI',
                                    description: '有赞团队老牌UI库',
                                },
                                {
                                    title:'ant-design-mobile-vue',
                                    description: 'antd社区版出品',
                                },

                            ]
                        },
                        {
                            title: 'Vue2.js',
                            description: 'Vue2 + Webpack'
                        },
                        {
                            title: 'React.js',
                            description: 'React + WebPack'
                        },
                        {
                            title: 'React@New.js',
                            description: 'React + Vite'
                        },
                        {
                            title:'Next.js',
                            description: 'SSR + React'
                        },
                        {
                            title:'Nuxt.js',
                            description: 'SSR + Vue2'
                        },
                        {
                            title:'Nuxt3.js',
                            description: 'SSR + Vue3'
                        }
                    ]
                },
                {
                    title: 'WeChatMiniProgram',
                    description: '微信小程序项目, 暂不支持第三方框架',
                    choices:[
                        {
                            title:'Null UI',
                            description: '不使用UI库',
                        },
                        {
                            title: '(推荐)TDesignUIMiniProgram',
                            description: '腾讯团队最新出品UI库',
                            value: 'master::https://gitee.com/wuguangshuai/template.wechat.tdsign.git'
                        },
                        {
                            title:'VantUI',
                            description: '有赞老牌UI库',
                        },
                    ]
                }
            ]
        },
        {
            title: 'Component',
            message:'请选择使用的项目',
            description:'快速构建一个UI组件'
        },
        {
            title: 'utils',
            message: '请选择工具工具包类型',
            description:'快速构建一个方法工具'
        },
    ]
}
