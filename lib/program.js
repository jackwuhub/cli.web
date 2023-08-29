const updateChk = require("./upgrade");


const options = (program) => {
    program.
    version(`v${require('../package.json').version}`)
    program.helpOption(false)
}
const command = (program,actions) => {
    program.
    command('create <name>').
    description('创建项目').
    action(actions?.create)

    program.
    command('showdir <path>').
    description('查看项目结构').
    action(actions?.dir)

    program.
    command('upgrade').
    description('更新CLI').
    action(actions?.upgrade)
}


const register = (program,actions) => {
    options(program) // 注册提示信息
    command(program,actions) // 注册命令参数
    program.parse(process.argv)
}



module.exports = register