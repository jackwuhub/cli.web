const prompts = require('prompts');
const fs = require("fs");

// 确认提示
const confirm = {
    type: 'confirm',
    name: 'confirm',
    message: '确认使用此模板进行构建吗?',
}

/**
 * 设置层级选项数据
 * @param ele 当前位置元素
 * @param level 当前位置级别
 * @param preKey
 * @returns {{name, type: (function(*): string|null), message: string, choices: *}}
 */
const setQuestionKey = (ele,level,preKey) => {
    const value = `${(Math.random() * 100000).toFixed(0)}`
    return {
        type: pre => pre === preKey || !preKey ? 'select' : null,
        disabled: !ele.value && !ele?.choices?.length,
        preKey,
        name: ele?.value ? 'finish' : level,
        title: ele.title,
        message: ele.message ?? '',
        description: ele.description,
        value: ele?.value ?? value,
        choices: ele?.choices?.map(item => setQuestionKey(item,level+1,value))
    }
}

/** 解析树结构 */
const parseQuestionTree = (config) => {
    const arr = []
    const newTree = setQuestionKey(config,0, null)
    // fs.writeFileSync('./temp.json',JSON.stringify(newTree))
    const deepTree = (questions,preLevel) => {
        questions?.forEach(ele => {
            const hasLength = !!arr[preLevel]?.length // 已经存在数组
            const hasChild = !!ele?.choices?.length
            if(hasLength) arr[preLevel]?.push(ele)
            else arr[preLevel] = [ele]
            if(hasChild) deepTree(ele.choices,preLevel + 1)
        })
    }
    deepTree([newTree],0)

    return arr?.reduce((total,currentValue) => (total.concat(...currentValue)),[])
}

module.exports = (config) => {
    const questions = parseQuestionTree(config)
    fs.writeFileSync('./temp.json',JSON.stringify(questions))
    return prompts([
        ...questions,
        confirm
    ])
}
