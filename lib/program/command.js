module.exports = (program,actions) => {
    program.
    command('create <project>').
    description('创建项目').
    action(actions?.create)
}