module.exports = [
    {
        type: pre => pre === 'web' ? 'select' : null,
        name: 'type',
        message: '选择项目类型(web)',
        choices: [
            { title: 'webpack', description: 'webpack打包工具', value: 'webpack' },
            { title: 'rollup', description: 'rollup打包工具', value: 'rollup' },
            { title: 'vite', description: 'vite打包工具', value: 'vite' },
        ],
        initial: 0
    }
]