import {defineComponent, VNode, computed, h} from "vue";
import { ElMenu,ElMenuItem,ElSubMenu } from 'element-plus'
import {AsideMenuItem} from "../AsideMenu/types";
import {useRoute} from "vue-router";
import {settingStore} from "@/store";
import { ElIcon } from 'element-plus'
import {IconName, iconVNode} from "@/utils/elementUI/icons";
/** 检查是否是菜单组 */
export const isMenuGroup = (menuItem:AsideMenuItem):boolean => !!(menuItem.children && !!menuItem.children?.length)
/** 渲染图标 */
const renderIcon = (menuItem: AsideMenuItem):VNode | undefined => {
    if (menuItem.icon) return h(iconVNode(menuItem.icon as unknown as IconName))
}
/** 渲染菜单组 */
const renderSubMenu = (menuItem: AsideMenuItem, children: VNode[]): VNode => (
    <ElSubMenu index={menuItem.route}>
        {{
            title: () => (
                <>
                    <ElIcon> {renderIcon(menuItem)}</ElIcon>
                    <span>{menuItem.title}</span>
                </>
            ),
            default: () => children
        }}
    </ElSubMenu>
)
/** 渲染子项 */
const renderMenuItem = (menuItem: AsideMenuItem): VNode => {
    return (
        <ElMenuItem index={menuItem.route}>
            <>
                <ElIcon> {renderIcon(menuItem)}</ElIcon>
                <span>{menuItem.title}</span>
            </>
        </ElMenuItem>
    )
}
/** 解析菜单数据 */
const parseMenuData = (menuData: AsideMenuItem[]): VNode[] => {
    const deepMenuChildren = (menuItems: AsideMenuItem[] | undefined) => {
        let menuTemplate: any[] = []
        if (!menuItems) return menuTemplate
        menuItems.forEach((menuItem: AsideMenuItem) => {
            if (isMenuGroup(menuItem)) { // 是按钮组
                menuTemplate.push(
                    renderSubMenu(menuItem, deepMenuChildren(menuItem?.children) ?? [])
                )
            } else menuTemplate.push(renderMenuItem(menuItem)) // 是按钮
        })
        return menuTemplate
    }
    return deepMenuChildren(menuData)
}

// 构建组件
export default defineComponent({
    props: ['collapse'],
    setup: (props:any) => {
        const route = useRoute()
        const active = computed(() => route.path)
        return () => (
            <ElMenu
                collapse={props.collapse}
                default-active={active.value}
                router
            >
                {parseMenuData(settingStore.menuList)}
            </ElMenu>
        )
    }
})
