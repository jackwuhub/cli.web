import {computed, defineComponent, h, ref, VNode, watchEffect} from "vue";
import {ItemType, Menu} from 'ant-design-vue'
import {AsideMenuItem} from "../AsideMenu/types";
import {useRoute, useRouter} from "vue-router";
import {settingStore} from "@/store";
import {IconName, iconVNode} from "@/utils/antdUI/icons";
import {Key} from "ant-design-vue/es/_util/type";
import { MenuInfo} from "ant-design-vue/es/menu/src/interface";
import {findTreeRoute} from "@/helper/index";



/** 渲染图标 */
const renderIcon = (menuItem: AsideMenuItem):VNode | undefined => {
    if (menuItem.icon) return h(iconVNode(menuItem.icon as unknown as IconName))
}
/** 解析菜单数据 */
const parseMenuData = (menuData: AsideMenuItem[]): ItemType[] => {
    const deepMenuChildren = (menuItems: AsideMenuItem[] | undefined):ItemType[] | null => {
        if (!menuItems) return null
        return menuItems?.map((menuItem: AsideMenuItem) => ({
            key: menuItem.route,
            icon: renderIcon(menuItem),
            label: menuItem.title,
            children: deepMenuChildren(menuItem.children?.length
                ?  menuItem.children
                : void 0
            )
        }))
    }
    return deepMenuChildren(menuData) ?? []
}

const findKeys = (key:string, routes:ItemType[]):Key[] => {
    let keys:Key[] = []
    const path = findTreeRoute(routes,'key','children',key)
    keys = path?.map(ele => ele.key)
    return keys
}
// 构建组件
export default defineComponent({
    setup: () => {
        const route = useRoute()
        const router = useRouter()

        const selectedKeys = computed(() => findKeys(route.path,routes)) // 激活的key
        const openKeys = ref<Key[]>([]) // 展开的菜单keys, 只处理一次
        const routes = parseMenuData(settingStore.menuList) // 路由表
        const goRoute = (event:MenuInfo) => router.push({path: event.key as string}) // 跳转路由
        const stopOpenKeysWatcher = watchEffect(() => {
            if(!openKeys.value.length) openKeys.value = selectedKeys.value
            else stopOpenKeysWatcher()
        })
        return () => (
            <Menu
                selectable={false}
                onClick={goRoute}
                openKeys={openKeys.value}
                selectedKeys={selectedKeys.value}
                mode="inline"
                items={routes}
            >
            </Menu>
        )
    }
})
