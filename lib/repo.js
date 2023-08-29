const ora = require("ora");
const child_process = require('child_process')
const {deleteFile, directoryExists} = require("./file");
const chalk = require("chalk");
const { spawn} = child_process


const download = (url,branch,filePath) => {
    return new Promise((resolve) => {
        const spinner = ora();
        spinner.spinner = 'simpleDotsScrolling'
        spinner.start('正在下载...')
        let command = spawn('git',['clone', '-b', branch, url, filePath])
        command.stdout.on('close',(e) => {
            if(directoryExists(filePath)){
                spinner.succeed('下载完成')
                deleteFile(`${filePath}/.git`).then(() => resolve(filePath))
                resolve(filePath)
            }else spinner.fail(chalk.red(`下载失败\n分支${branch}\n链接${url}`))
            resolve(null)
        })
    })
}
module.exports = (form) => {
    const { repo,projectName } = form
    const repoArr = repo.split('::')
    return download(repoArr[1],repoArr[0],`./${projectName}`)
}