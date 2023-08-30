import {FigureNumber, FormatNumber} from "./@types/number";

/**
 * 最大数字截断, 显示 + 号
 * eg: 100 => 99+
 * @param number 待处理数字
 * @param most 最大值
 * @param unit 截断符号
 */
export const figureNumber:FigureNumber = (number = 0, most = 100, unit = '+' ) =>{
    const parseNumber = Number(number)
    if(isNaN(parseNumber)) return number
    if(parseNumber >= most) return most - 1 + unit
    return number
}


/**
 * 格式化数字
 * @param number
 * @param reg 正则方法，前后增加东西使用 eg：¥unit => ¥200万
 * @param defaultNull 空值返回的样式
 * @param fixed 取几位小数
 * @returns {string|null}
 */
export const formatNumber:FormatNumber = (number = 0, reg = 'unit', fixed = 2,defaultNull = '-',) => {
    if(typeof number === 'undefined' || number == null ) return defaultNull
    const tempNumber = Number(number)
    if(isNaN(tempNumber)) return number

    //todo 正常条件
    if (tempNumber >= 100000000) {
        const returnValue = (tempNumber / 100000000).toFixed(fixed) + '亿'
        return reg.replace('unit',returnValue)
    }
    if(tempNumber >= 10000){
        const returnValue = (tempNumber / 10000).toFixed(fixed) + '万'
        return reg.replace('unit',returnValue)
    }
    return reg.replace('unit',tempNumber.toFixed(fixed))
}
