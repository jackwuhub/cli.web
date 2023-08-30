/** 检查是否是菜单组 */
export const isMenuGroup = (menuItem:AsideMenuItem):boolean => !!(menuItem.children && !!menuItem.children?.length)
export interface AsideMenuItem {
    title:string
    route?:string
    icon?:string // 图标
    children?:AsideMenuItem[]
}