export type IconName = keyof typeof ElIconEnum
type GetIcon = (key: IconName) => VNode
export const iconVNode:GetIcon = (key) => ElIconEnum?.[key]
import {App, defineComponent, h, VNode} from "vue";
export default (app:App) => {
    app.component('el-icon',{
        props:['name'],
        setup(props){
            return () => h(defineComponent({
                render: () => iconVNode(props.name as unknown as IconName)
            }))
        }
    })
}

import {
    Lock,
    Plus,
    User,
    House
} from '@element-plus/icons-vue'

export const ElIconEnum = (() => ({
    plus: h(Plus),
    house: h(House),
    user: h(User),
    logout: h(Lock)
}))()