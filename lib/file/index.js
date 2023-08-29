const fs = require('fs');
const path = require('path');
const dirTree = require("./dirTree");

module.exports = {
    // 获取目录名称
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd());
    },
    deleteFile:(dir) => {
        return new Promise((resolve) => {
            fs.rm(dir,{recursive:true},(e) => {
                resolve()
            })
        })
    },
    dirTree,
    // 判断目录是否存在
    directoryExists: (filePath) => {
        return fs.existsSync(filePath);
    },
};