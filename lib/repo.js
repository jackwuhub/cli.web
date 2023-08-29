const ora = require("ora");
const child_process = require('child_process')
const {deleteFile} = require("./file");
const { spawn} = child_process


const download = (url,branch,filePath) => {
    return new Promise((resolve) => {
        const spinner = ora();
        spinner.spinner = 'simpleDotsScrolling'
        spinner.start('正在下载...')
        let command = spawn('git',['clone', '-b', branch, url, filePath])
        command.stderr.on('error',(e) => {
            spinner.fail('下载失败')
            resolve(false)
        })
        command.stdout.on('close',(e) => {
            spinner.succeed('下载完成')
            deleteFile(`${filePath}/.git`).then(() => resolve(filePath))
        })
    })
}
module.exports = (form) => {
    const { repo,projectName } = form
    return download(repo,'master',`./${projectName}`)
}