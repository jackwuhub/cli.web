const prompts = require("prompts");
module.exports = () => {
    return prompts([
        {
            type: 'confirm',
            name: 'confirm',
            message: '是否立即安装node_modules?',
            initial: false
        }
    ])
}