const prompts = require("prompts");
module.exports = () => {
    return prompts([
        {
            type: 'confirm',
            name: 'confirm',
            message: '是否更新CLI至最新版本?',
            initial: true
        }
    ]).then(res => res?.confirm)
}