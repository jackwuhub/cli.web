import {defineComponent, VNode, computed, h} from "vue";
import { Menu,MenuItem,MenuGroup,Submenu } from 'tdesign-vue-next'
import {AsideMenuItem} from "../AsideMenu/types";
import {useRoute, useRouter} from "vue-router";
import {settingStore} from "@/store";
import {IconName, tdIconVNode} from "@/utils/TDesignUI/icons";
/** 检查是否是菜单组 */
export const isMenuGroup = (menuItem:AsideMenuItem):boolean => !!(menuItem.children && !!menuItem.children?.length)
/** 渲染图标 */
const renderIcon = (menuItem: AsideMenuItem):VNode | undefined => {
    if (menuItem.icon) return h(tdIconVNode(menuItem.icon as unknown as IconName))
}
/** 渲染菜单组 */
const renderSubMenu = (menuItem: AsideMenuItem, children: VNode[]): VNode => (
    <MenuGroup title={menuItem.title}>
        {{
            default: () => children
        }}
    </MenuGroup>
)
/** 渲染子项 */
const renderMenuItem = (menuItem: AsideMenuItem): VNode => {
    return (
        <MenuItem value={menuItem.route} to={menuItem.route}>
            {{
                icon: () => renderIcon(menuItem),
                default: () => menuItem.title
            }}
        </MenuItem>
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
            <Menu width={['200px', '64px']}
                  collapsed={props.collapse}
                  value={active.value}
            >
                {parseMenuData(settingStore.menuList)}
            </Menu>
        )
    }
})
