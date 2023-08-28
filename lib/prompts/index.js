const prompts = require('prompts');
// 基础入口
const root = require('./questionos/root')
// 项目类型
const projectType = require('./questionos/projectType')
// 框架
const framework = require('./questionos/framework')
// 编程语言
const language = require('./questionos/language')

// 确认提示
const confirm = {
    type: 'confirm',
    name: 'confirm',
    message: '确认使用此模板进行构建吗?',
}
module.exports = () => prompts([
    ...root,
    ...projectType,
    ...framework,
    ...language,
    confirm
])