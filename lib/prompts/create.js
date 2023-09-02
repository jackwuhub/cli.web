const prompts = require('prompts');
const chalk = require("chalk");

/**
 * 设置层级选项数据
 * @param ele 当前位置元素
 * @param level 当前位置级别
 * @returns {{name, type: (function(*): string|null), message: string, choices: *}}
 */
const setQuestionKey = (ele,level) => {
    const value = `_${(Math.random() * 100000).toFixed(0)}`
    const hasValue = ele?.choices?.some(item => !!item?.value)
    return {
        type: pre => pre === value || !pre? 'select' : null,
        disabled: !ele.value && !ele?.choices?.length,
        name: hasValue ? 'repo' : level,
        title: ele.title,
        message: chalk.greenBright(ele.message) ?? '',
        description: ele.description,
        value: ele?.value ?? value,
        choices: ele?.choices?.map(item => setQuestionKey(item,level+1))
    }
}

/** 解析树结构 */
const parseQuestionTree = (config) => {
    const arr = []
    const newTree = setQuestionKey(config,0)
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
    // fs.writeFileSync('./temp.json',JSON.stringify(questions[0]))
    return prompts(questions)
}