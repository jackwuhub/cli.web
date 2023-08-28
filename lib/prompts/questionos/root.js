module.exports = [
    {
        type:'select',
        name: '1',
        message: '选择项目类型',
        choices: [
            { title: 'web', description: 'web网页', value: 'web',  },
            { title: 'component', description: '组件开发', value: 'component',disabled: true },
            { title: 'utils', description: '工具包', value: 'utils' },
        ],
        initial: 0
    }
]
