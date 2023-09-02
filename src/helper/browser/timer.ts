import { TimerMap,SetTimer,ClearTimer,Debounce,Throttle,Sleep } from './@types/timer'
/**
 * 定时器方法
 * @param callback { function } 回调函数
 * @param ms { number } 时间单位 ms
 * @param loop { number | boolean} 循环次数
 */
let timerMap:TimerMap = new Map() // timer Map
let debounceMap:TimerMap = new Map() // debounce value
let throttleMap:TimerMap = new Map()
export const  setTimer:SetTimer = (callback, ms, loop = true) => {
    let timerKey: number// timerKey
    const now = Date.now
    let startTime: number = now()
    let endTime: number
    const check = ():void => {
        endTime = now()
        if(endTime - startTime >= ms){
            startTime = endTime = now()
            loop = typeof loop === 'number' ? loop - 1 : true
            callback()
            if (!loop) {
                clearTimer(timerKey)
                return
            }
        }
        timerMap.set(timerKey, window.requestAnimationFrame(check))
    }
    timerKey = window.requestAnimationFrame(check)
    timerMap.set(timerKey, timerKey)
    return  timerKey
}

/**
 * 停止定时器
 * @param timerKey { number } 需要停止的定时器的key
 * @return void
 */
export const clearTimer:ClearTimer = ( timerKey) => {
    if(!!timerKey) {
        window.cancelAnimationFrame(timerMap.get(timerKey))
        timerMap.delete(timerKey)
    }
    else {
        timerMap.forEach( timerKey => {
            window.cancelAnimationFrame(timerKey)
            timerMap.delete(timerKey)
        })
    }
}

/**
 *  防抖
 * @param callback 回调函数
 * @param time 时长控制
 */
export const debounce:Debounce = (callback = () => {}, time = 100) => {
    const key = callback.toLocaleString()
    let timer = debounceMap.get(Number(key))
    if(timer) clearTimer(timer)
    timer = setTimer(() => {
        callback && callback()
        debounceMap.delete(Number(key))
    },time,1)
    debounceMap.set(Number(key),timer)
}
/**
 * 节流
 * @param callback 回调函数
 * @param time 时长控制
 */
export const throttle:Throttle = (callback = () => {}, time = 100) => {
    const key = callback.toLocaleString()
    let timer = throttleMap.get(Number(key))
    if(timer) return
    timer = setTimer(() => {
        callback && callback()
        throttleMap.delete(Number(key))
    },time,1)
    throttleMap.set(Number(key),timer)
}

/**
 * 睡眠延迟
 * @param time
 */
export const sleep:Sleep = (time) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), time)
    })
}
