// 引用 update-notifier 库，用于检查更新
const updateNotifier = require('update-notifier')
// 引入 package.json 文件，用于 update-notifier 库读取相关信息
const pkg = require('../../package.json')
const chalk = require("chalk");

// updateNotifier 是 update-notifier 的方法，其他方法可到 npmjs 查看
const notifier = updateNotifier({
    // 从 package.json 获取 name 和 version 进行查询
    pkg,
    // 设定检查更新周期，默认为 1000 * 60 * 60 * 24（1 天）
    // 这里设定为 1000 毫秒（1秒）
    updateCheckInterval: 1000,
})

function updateChk() {
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
            console.log(chalk.green(`当前 ${pkg.version} 为最新版本,无需更新`))
            resolve(false)
        }
    })

}

// 将上面的 updateChk() 方法导出
module.exports = updateChk
