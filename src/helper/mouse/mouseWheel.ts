import {debounce,throttle} from "../browser/index";
import { MouseWheelScroll } from './@types/mouseWheel'
/**
 * 滚轮事件
 * @param dom 监听元素
 * @param callback 回调函数
 * @param options
 */
export const mouseWheelScroll:MouseWheelScroll = (dom, callback,options) => {
    const ops = { // 配置默认参数
        debounce:options && options?.debounce || false,
        throttle: options && options?.throttle || false,
        duringTime: options && options?.duringTime || 0
    }
    dom.addEventListener('wheel', (event:WheelEvent) => {
        ops.debounce ?
            debounce( () => { callback && callback(event)},ops.duringTime) :
            ops.throttle ?
                throttle( () => {callback && callback(event)},ops.duringTime) :
                callback && callback(event)
    });
}
