module.exports = [
    {
        type: pre => pre === 'web' ? 'select' : null,
        name: 'type',
        message: '选择项目类型(web)',
        choices: [
            { title: 'Admin', description: '管理后台项目, 带有鉴权', value: 'admin' },
            { title: 'DataV', description: '大屏项目, 暂不支持', value: 'datav', disabled: true },
            { title: 'H5', description: '移动端H5页面', value: 'h5' },
            { title: 'WeChatMiniProgram', description: '微信小程序项目, 暂不支持其他第三方框架', value: 'wechat' },
        ],
        initial: 0
    },
    {
        type: pre => pre === 'component' ? 'select' : null,
        message: '请选择使用的项目(component)',
        choices:[
            { title: 'PC', description: 'PC端组件', value: 'pc' },
            { title: 'H5', description: 'H5端组件', value: 'h5' },
        ],
        initial: 0
    },
    {
        type: pre => pre === 'utils' ? 'select' : null,
        message: '请选择工具包(utils)',
        name:'utils',
        choices:[
            { title: 'helper', description: '拓展现有的helper工具', value: 'helper' },
            { title: 'SDK', description: '公共SDK拓展工具', value: 'sdk' },
        ],
        initial: 0
    }
]