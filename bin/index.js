#! /usr/bin/env node
const {program} = require("commander")
const programRegister = require('../lib/program')
// 注册指令
programRegister(program)

