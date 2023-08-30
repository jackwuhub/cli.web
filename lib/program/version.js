const chalk = require("chalk");
const pck = require("../../package.json");
const updateChk = require("../upgrade");
module.exports = () => {
    console.log('当前版本为: ' + chalk.green(pck.version))
    updateChk(false)
}