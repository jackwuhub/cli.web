import {getDom} from "./getDom";
import {dragEvent} from "../mouse/index";


import {MoveDom, ResizeDom, SetDomRect} from './@types/controlDom'

/**
 * 设置dom样式
 * @param element 被设置的元素
 * @param width 宽度
 * @param height 高度
 * @param x 位置x
 * @param y 位置y
 */
export const setDomRect: SetDomRect = ({element = '', width = 0, height = 0, x = 0, y = 0} = {}) => {
    const dom: HTMLElement = getDom(element)
    if (dom) {
        dom.style.height = typeof height === 'number' ? height + 'px' : height
        dom.style.width = typeof width === 'number' ? width + 'px' : width
        dom.style.top = typeof y === 'number' ? (y < 0 ? 0 : y) + 'px' : y
        dom.style.left = typeof x === 'number' ? x + 'px' : x
    }
}
/**
 * 移动dom元素
 * @param {string | object} ele 选取元素
 * @param {number} setElement 目标元素
 * @param callBack 回调函数
 */
export const moveDom: MoveDom = (ele, setElement, callBack) => {
    const element = getDom(ele)
    const targetElement = getDom(setElement)
    if (!element || !targetElement) return
    dragEvent({
        element,
        targetElement,
        isRelative: false,
        onMouseMove: (event) => {
            const {targetElementPosition, dragX, dragY} = event
            if (!targetElementPosition) return console.error('未捕获元素')
            const {width, height, left, top} = targetElementPosition // 鼠标按下Dom初始值
            setDomRect({element: targetElement, width, height, x: left + dragX, y: top + dragY})
            callBack && callBack(event)
        }
    })
}
/**
 * 改变dom大小
 * @param element 鼠标选取元素
 * @param targetDom 控制目标元素
 * @param direction 可控方向
 * @param minWidth  最小宽度
 * @param minHeight 最小高度
 * @param callBack 回调函数
 */
export const resizeDom: ResizeDom = ({
   element = '',
   targetDom = '',
   direction = 'both',
   minWidth = 10,
   minHeight = 10
}) => {
    const dom = getDom(element)
    const setDom = getDom(targetDom)
    if (!dom || !setDom) return
    dragEvent({
        element: dom,
        targetElement: setDom,
        isRelative: true,
        onMouseMove: (event) => {
            const {targetElementPosition, dragX, dragY, mouseDownPosition, targetElementLivePosition} = event
            if (!targetElementPosition) return console.error('获取dom位置出错')

            const {
                width:targetWidth,
                height:targetHeight,
                left:targetLeft,
                top:targetTop
            } = targetElementPosition // 鼠标按下Dom初始值

            if (!mouseDownPosition) return console.error('获取鼠标位置出错')
            const {x:mouseX, y:mouseY} = mouseDownPosition // 鼠标按下鼠标初始值

            const isTop = (mouseY - targetTop <= 20)  // 鼠标在上边界
            const isLeft = (mouseX - targetLeft <= 20)  // 鼠标在左边界
            const disabledLeft = (targetWidth - dragX <= minWidth) && isLeft // 禁用左
            const disabledTop = (targetHeight - dragY <= minHeight) && isTop // 禁用右

            if (direction === 'both') {
                const element = setDom
                const width = isLeft ? targetWidth - dragX : targetWidth + dragX
                const height = isTop ? targetHeight - dragY : targetHeight + dragY
                const x = isLeft && !disabledLeft ? targetLeft + dragX : targetElementLivePosition?.left
                const y = isTop && !disabledTop ? targetTop + dragY : targetElementLivePosition?.top
                setDomRect({ element, width, height, x, y })
            }
            if (direction === 'col') {
                if (disabledTop) return
                const element = setDom
                const height = isTop ? targetHeight - dragY : targetHeight + dragY
                const y = isTop ? targetTop + dragY : targetTop
                setDomRect({ element, width:targetWidth, height, x:targetLeft, y })
            }
            if (direction === 'row') {
                if (disabledLeft) return
                const element = setDom
                const width = isLeft ? targetWidth - dragX : targetWidth + dragX
                const x = isLeft ? targetLeft + dragX : targetLeft
                setDomRect({ element, width, height:targetHeight, x, y:targetTop })
            }
        }
    })
}
