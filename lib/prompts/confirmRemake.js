const prompts = require("prompts");
const chalk = require("chalk");
module.exports = () => {
    return prompts([
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.greenBright('已经存在该目录,是否覆盖?'),
            initial: true
        }
    ]).then(res => res?.confirm)
}