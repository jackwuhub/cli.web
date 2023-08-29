#! /usr/bin/env node
const {program} = require("commander")
const { showMain, showDirTree} = require('../lib/message')
const programRegister = require('../lib/program')
const {create,confirmCreate,confirmRemake} = require('../lib/prompts')
const download = require('../lib/repo')
const config = require('../lib/config')
const {directoryExists, deleteFile} = require("../lib/file");
const updateChk = require("../lib/upgrade");
// 注册指令
programRegister(program,{
    // 创建项目
    create: async (projectName) => {
        showMain() // 显示文字

        const hasUpgrade = await updateChk() // 检查更新
        if(hasUpgrade) return // 拦截


        const { repo } =  await create(config) // form信息
        const path = `./${projectName}`
        if(directoryExists(path)){ // 同名目录
            const res = await confirmRemake() // 是否删除
            if(res) await deleteFile(path) // 删除目录
            else return
        }

        const res = await confirmCreate() // 确认创建
        if(res) { // 校验参数, 准备下载
            const filePath = await download({projectName,repo})
            if(filePath) showDirTree(filePath)
        }

    },
    // 查看目录结构
    dir: (dir) => showDirTree(dir),
    // 手动更新项目
    upgrade: () => updateChk(true)
})

