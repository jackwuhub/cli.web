const ora = require("ora");
const child_process = require('child_process')
const {deleteFile, directoryExists} = require("./file");
const chalk = require("chalk");
const { spawn} = child_process
const configUrl = 'https://gitee.com/wuguangshuai/cli.web.node/releases/download/V1.0/repoTree.json'
const fetch = require("node-fetch");
const localConfig = require("./repoTree.json")

/***
 * 解析仓库地址
 * @param repo
 * @returns {{branch: *, url: *}}
 */
const parseRepo = (repo) => {
    const repoArr = repo.split('::')
    const branch = repoArr[0]
    const url = repoArr[1]
    return { branch,url }
}
/***
 * 下载代码
 * @param repo
 * @param projectName
 * @returns {Promise<unknown>}
 */
const download = (repo,projectName) => {
    return new Promise((resolve) => {
        const {branch,url} = parseRepo(repo)
        const filePath = `./${projectName}`
        const spinner = ora();
        spinner.spinner = 'simpleDotsScrolling'
        spinner.start('正在下载...')
        let command = spawn('git',['clone', '-b', branch, url, filePath])
        command.stdout.on('close',(e) => {
            if(directoryExists(filePath)){
                spinner.succeed('下载完成')
                deleteFile(`${filePath}/.git`).then(() => resolve(filePath))
                resolve(`${process.cwd()}/${projectName}`)
            }else spinner.fail(chalk.red(`下载失败\n分支${branch}\n链接${url}`))
            resolve(null)
        })
    })
}
/**
 * 获取仓库信息
 * @param netWork
 * @returns {Promise<unknown>}
 */
const getRepoConfig = async (netWork = false) => {
    if(!netWork) return Promise.resolve(localConfig)
    else {
        const spinner = ora().start('正在获取repo-config')
        let config = await fetch(configUrl).then(res => res?.json())
        if(config?.status === 404) {
            spinner.fail('加载在线仓库失败, 使用离线仓库...')
            config = localConfig
        }
        spinner.succeed('加载仓库成功...')
        return Promise.resolve(config)
    }
}


/**
 * 获取仓库可用列表
 * */
const getRepoList = async () => {
    const json = await getRepoConfig(true)
    let canUseList = []
    const deepTree = (tree) => {
        const { value,choices } = tree
        if(!!value) canUseList.push({
            templateName: parseRepo(value).branch,
            repo:value
        })
        if(choices && choices?.length) choices.forEach(ele => deepTree(ele))
    }
    deepTree(json)
    return canUseList
}
module.exports = {
    download,
    getRepoConfig,
    getRepoList
}