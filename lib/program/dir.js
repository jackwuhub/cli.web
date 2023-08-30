const { showDirTree } = require('../message')
module.exports = (path) => {
    if(!path) path = './'
    showDirTree(path)
}