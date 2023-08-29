// 引用 update-notifier 库，用于检查更新
const updateNotifier = require('update-notifier')
// 引入 package.json 文件，用于 update-notifier 库读取相关信息
const pkg = require('../../package.json')
const chalk = require("chalk");
const notifier = updateNotifier({pkg, updateCheckInterval: 1000,})

function updateChk(force = false) {
    return new Promise(async (resolve) => {
        if (notifier.update) {
            notifier.notify({
                message: '有版本更新 ' +
                    chalk.dim('{currentVersion}') +
                    chalk.reset(' → ') +
                    chalk.green('{latestVersion}') +
                    ' \n执行 ' + chalk.cyan('{updateCommand}') + ' 进行安装更新'
            })
            resolve(true)
        } else {
            if(force) console.log(chalk.green(`当前 ${pkg.version} 为最新版本,无需更新`))
            resolve(false)
        }
    })

}

// 将上面的 updateChk() 方法导出
module.exports = updateChk
