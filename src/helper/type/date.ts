import dayjs from "dayjs";
import {DiffTime, FormatDuring} from "./@types/date";
/**
 * 计算时间差
 * @param startDate
 * @param endDate
 * @param format
 * */
export const diffTime:DiffTime = (startDate,endDate,format = '{D}天{H}时{M}分{S}秒') => {
    let diff = dayjs.unix(endDate).diff(dayjs.unix(startDate), 'second')//时间差的秒数
    return formatDuring(diff,format)
}
/**
 * 格式化时间差
 * @param diff
 * @param format
 * @param defaultValue
 * */
export const formatDuring:FormatDuring = (diff,format = '{D}天{H}时{M}分{S}秒',defaultValue='-') => {
    if(!diff) return defaultValue
    format = format.toUpperCase()
    let days, hours, minutes, seconds: number | string = 0
    if (format.includes('{D}')) {
        days = Math.floor(diff / (24 * 3600)) //计算出相差天数
        diff %= 24 * 3600   // 除去天数剩余的秒
    }
    if (format.includes('{H}')) {
        hours = Math.floor(diff / 3600) // 格式化小时数
        hours =  hours > 9 ? hours : '0' + hours
        diff %= 3600 // 除去小时剩余的秒数
    }
    if (format.includes('{M}')) {
        minutes = Math.floor(diff / 60) // 格式化分钟数
        minutes = hours =  minutes > 9 ? minutes : '0' + minutes
        diff %= 60 // 除去分钟剩余的秒数
    }
    if (format.includes('{S}')) {
        seconds = Math.round(diff) // 格式化秒数
        seconds =  seconds > 9 ? seconds : '0' + seconds
    }
    return format
        .replace(/\{D\}/g, String(days))
        .replace(/\{H\}/g, String(hours))
        .replace(/\{M\}/g, String(minutes))
        .replace(/\{S\}/g, String(seconds))
}
