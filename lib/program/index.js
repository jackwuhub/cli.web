const options  = require('./options')
const command = require('./command')
const register = (program,actions) => {
    options(program) // 注册提示信息
    command(program,actions) // 注册命令参数
    program.parse(process.argv)
}



module.exports = register