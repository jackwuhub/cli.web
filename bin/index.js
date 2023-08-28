#! /usr/bin/env node
const {program} = require("commander")
const { showMain } = require('../lib/message/index')
const programRegister = require('../lib/program/index')
const prompts = require('../lib/prompts/index')
const repo = require('../lib/repo/index')
const config = require('../lib/repo/config')
showMain() // 显示文字
// 注册指令
programRegister(program,{
    create: async (projectName) => { // 创建command
        const promptsForm =  await prompts(config)
        repo({projectName,...promptsForm}) // 校验参数, 准备下载
    }
})

