const prompts = require("prompts");
module.exports = () => {
    return prompts([
        {
            type: 'confirm',
            name: 'confirm',
            message: '确认使用此模板进行构建吗?',
            initial: true
        }
    ]).then(res => res?.confirm)
}