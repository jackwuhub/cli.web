

export interface AsideMenuItem {
    title:string
    route:string
    icon?: string // 图标
    children?:AsideMenuItem[]
}