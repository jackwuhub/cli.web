import { GetDom, GetDomPosition} from "./@types/getDom"

/**
 * 获取dom
 * @param name dom元素名称
 */
export const getDom:GetDom = (name) => {
    if (typeof name === 'string'){
        if(/^#\w/.test(<string>name)) return document.getElementById(<string>name?.replace(/^#/,'')) // 精确id获取
        if(/^\.\w/.test(<string>name)) return document.getElementsByClassName(<string>name?.replace(/^\./,'')) // class获取 是一个数组建议不要使用
    }
    else return name
}

/**
 *  dom位置边界
 * @param element
 * @param isRelative
 */
export const getDomPosition:GetDomPosition = (element,isRelative = true)  => {
    const dom:HTMLElement = getDom(element)
    if(!dom) return null
    const { x,y,width,height } = dom?.getBoundingClientRect() || { x:0,y:0 ,width:0,height: 0} // dom
    return {
        top: isRelative ? dom?.offsetTop?? 0 : y,
        left:isRelative ? dom?.offsetLeft?? 0 : x,
        bottom: isRelative ? dom?.offsetTop?? 0 : y  + height,
        right: isRelative ? dom?.offsetLeft?? 0 : x + width,
        width,
        height
    }
}
