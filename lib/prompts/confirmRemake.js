const prompts = require("prompts");
module.exports = () => {
    return prompts([
        {
            type: 'confirm',
            name: 'confirm',
            message: '已经存在该目录,是否覆盖?',
            initial: true
        }
    ])
}