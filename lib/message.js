const chalk = require('chalk');
const figlet = require('figlet');
const boxen  = require('boxen')
const {dirTree} = require("./file");



module.exports = {
    showMain:() => {
        const box = (text) => boxen(text, {
            borderColor: 'greenBright',
            textAlignment: 'center',
            padding: 2,
            margin: 1,
            borderStyle: 'round',
            title: 'CLI BY',
            titleAlignment: 'center',
        })
        const style =  chalk.greenBright
        const text = figlet.textSync('L D G Y',{
            font: 'ANSI Shadow',
            width: 80,
            whitespaceBreak: true,
        })
        console.clear()
        console.log(box(style(text)))
    },
    showDirTree:(dir) => {
        const box = (text) => boxen(text, {
            borderColor: 'greenBright',
            textAlignment: 'left',
            borderStyle: 'round',
            title: '项目结构',
            titleAlignment: 'center',
        })
        console.log(box(dirTree(dir,true)))
    }
}