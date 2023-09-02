import { DomPosition } from "../document/@types/getDom";
import { PointerPosition } from "./@types/leftButton"
import { getDomPosition } from "../document/getDom";
import {DragEvent, GetPointerPosition} from "./@types/leftButton";

/** 鼠标位置 */
export const getPointerPosition:GetPointerPosition = (event) => ({ x:event?.pageX ?? 0,  y:event?.pageY ?? 0})

/**
 * 拖拽事件
 * @param element 拖砖元素
 * @param targetElement  目标控制元素
 * @param isRelative 相对距离
 * @param onMouseMove
 * @param onMouseDown 鼠标按下
 */
export const dragEvent:DragEvent = ({
    element = null,
    targetElement = null,
    isRelative = false,
    onMouseMove = () => {},
    onMouseDown = () => {}
}) => {
    if(!element || !targetElement) return console.error('未选取到元素')
    let targetElementPosition:DomPosition | null // 目标元素
    let mouseDownPosition:PointerPosition // 鼠标按下记录
    element.addEventListener('mousedown', (event:MouseEvent) => {
        targetElementPosition = getDomPosition(<HTMLElement>targetElement,isRelative) // 按下时的目标dom元素
        if(!targetElementPosition) return console.error('元素位置未知')
        mouseDownPosition = getPointerPosition(event) // 按下时的指针元素
        onMouseDown && onMouseDown({mouseDownPosition, targetElementPosition})
        window.document.addEventListener('mousemove', fn,false)
    })

    /** 实时计算方法 */
    const fn = (event:MouseEvent) => {
        const mouseMovePosition = getPointerPosition(event) // 实时指针
        const targetElementLivePosition = getDomPosition(targetElement,isRelative) // 实时targetDom变化
        const dragX = mouseMovePosition.x - mouseDownPosition.x // 移动的x
        const dragY = mouseMovePosition.y - mouseDownPosition.y // 移动的y
        onMouseMove && onMouseMove({targetElementPosition, targetElementLivePosition, mouseDownPosition, mouseMovePosition, dragX, dragY})
    }
    window.document.addEventListener('mouseup', () => window.document.removeEventListener('mousemove',fn))
}
