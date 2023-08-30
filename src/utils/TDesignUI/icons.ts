
import {App, defineComponent, h, VNode} from "vue";
export type IconName = keyof typeof TdIconEnum
type GetIcon = (key: IconName) => VNode
export const tdIconVNode:GetIcon = (key) => TdIconEnum?.[key]

export default (app:App) => {
    app.component('t-icon',defineComponent({
        props:['name'],
        setup(props){
            return () => h(defineComponent({
                render: () => tdIconVNode(props.name as unknown as IconName)
            }))
        }
    }))
}

import {
    HomeIcon,
    UserIcon,
    UsergroupIcon,
    SystemComponentsIcon
} from "tdesign-icons-vue-next/lib";
export const TdIconEnum = (() => ({
    home: h(HomeIcon),
    user: h(UserIcon),
    role: h(UsergroupIcon),
    dept: h(SystemComponentsIcon)
}))()