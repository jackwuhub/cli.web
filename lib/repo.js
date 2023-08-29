const ora = require("ora");
const child_process = require('child_process')
const {deleteFile, directoryExists} = require("./file");
const chalk = require("chalk");
const { spawn} = child_process
const configUrl = 'https://gitee.com/wuguangshuai/cli.web.node/releases/download/V1.0/repoTree.json'
const fs = require("fs");
const fetch = require("node-fetch");
const localConfig = require("./repoTree.json")

const download = (url,branch,projectName) => {
    return new Promise((resolve) => {
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
const getRepoConfig = async (netWork = false) => {
    if(!netWork) return Promise.resolve(localConfig)
    else {
        const spinner = ora().start('正在获取repo-config')
        const config = await fetch(configUrl).then(res => res?.json())
        spinner.succeed('加载在线仓库成功...')
        return Promise.resolve(config)
    }
}
const gitRepoFetch = (form) => {
    const { repo,projectName } = form
    const repoArr = repo.split('::')
    return download(repoArr[1],repoArr[0],projectName)
}
module.exports = {
    gitRepoFetch,
    getRepoConfig
}