const {showMain} = require("../message");
const updateChk = require("../upgrade");
const {getRepoConfig, download, getRepoList} = require("../repo");
const {create, confirmRemake, confirmCreate} = require("../prompts");
const {directoryExists, deleteFile} = require("../file");
const chalk = require("chalk");
const showPath = (filePath) => console.log(chalk.white('项目路径:') + chalk.green(filePath))
/**
 * 问答创建
 * @param projectName
 * @returns {Promise<void>}
 */
const createByProto = async (projectName) => {
    const config = await getRepoConfig(true)
    const { repo } =  await create(config) // form信息
    if(!repo) return
    const path = `./${projectName}`
    if(directoryExists(path)){ // 同名目录
        const res = await confirmRemake() // 是否删除
        if(res) await deleteFile(path) // 删除目录
        else return
    }
    // 确认
    const res = await confirmCreate() // 确认创建
    if(res) { // 校验参数, 准备下载
        const filePath = await download(repo,projectName)
        showPath(filePath)
    }
}
/**
 * 模板快速创建
 * @param projectName
 * @param templateName
 */
const createByTemplateName = async (projectName,templateName) => {
    const res = await getRepoList()
    const element = res?.find(ele => ele.templateName === templateName)
    if(!element?.repo) return console.log(chalk.red(`not found named by「${chalk.green(templateName)}」template`))
    else {
        const path = `./${projectName}`
        if(directoryExists(path)){ // 同名目录
            const res = await confirmRemake() // 是否删除
            if(res) await deleteFile(path) // 删除目录
            else return
        }
        const filePath = await download(element?.repo,projectName)
        showPath(filePath)
    }
}
/**
 * 显示帮助信息
 */
const showHelp = (type) => {
    if(type === 1) console.log(`\nCreateProject\n
        1.${chalk.green('「ldgy-cli create "projectName"」')},create by selector\n
        2.${chalk.green('「ldgy-cli create -t "templateName" "projectName"」')},create by order templateName to create`
    )

    if(type === 2) console.log(chalk.red(`not found <project-name> params, use ${chalk.green('「ldgy-cli create <project-name> -t <template-name> 」')}`))

    if(type === 3) console.log(chalk.red(`not found <project-name> params, use ${chalk.green('「ldgy-cli create <project-name> 」')}`))


}
module.exports = async (projectName,options) => {
    showMain() // 显示文字
    const hasUpgrade = await updateChk() // 检查更新
    if(hasUpgrade) return // 拦截
    const { template,help } = options

    if(!!help) return showHelp(1)
    if(String(template) === 'true') return showHelp(2)
    if(!projectName) return showHelp(3)
    if(!template) await createByProto(projectName) // 常规创建
    else await createByTemplateName(projectName,template)


}