module.exports = [
    {
        type: pre => pre === 'wechat' ? null : 'select',
        name: 3,
        message: '选择项目类型(framework)',
        choices: [
            { title: 'Vue3', description: 'vue3 vite', value: 'vue3' },
            { title: 'Vue2', description: 'vue2 webpack', value: 'vue2' },
            { title: 'react', description: 'react vite', value: 'react' },
        ],
        initial: 0
    }
]
