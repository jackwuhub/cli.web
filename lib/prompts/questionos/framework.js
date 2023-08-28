module.exports = [

    {
        type: pre => pre === 'wechat' ? null : 'select',
        name: 'framework',
        message: '选择项目类型(framework)',
        choices: [
            { title: 'Vue3', description: 'vue3 语法版本', value: 'vue3' },
            { title: 'Vue2', description: 'vue2 语法版本', value: 'vue2' },
            { title: 'react', description: 'react 语法版本', value: 'react' },
        ],
        initial: 0
    }
]