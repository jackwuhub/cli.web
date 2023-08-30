const version = require('./version')
const create = require('./create')
const dir = require('./dir')
const upgrade = require('./upgrade')
const options = (program) => {
    program.
    helpOption(false).
    version(`v${require('../../package.json').version}`)
}
const command = (program) => {
    program.
    command('create [project-name]').
    option('-t, --template [templateName]','use template to create project').
    option('-h, --help','show help').
    description('create project').
    action(create)

    program.
    command('version').
    description('display version').
    action(version)

    program.
    command('dir [path]').
    description('display project dir tree').
    option('-h, --help','show help').
    action(dir)

    program.
    command('repo').
    description('')

    program.
    command('upgrade').
    description('update CLI').
    action(upgrade)
}


const register = (program) => {
    options(program) // 注册提示信息
    command(program) // 注册命令参数
    program.parse(process.argv)
}



module.exports = register