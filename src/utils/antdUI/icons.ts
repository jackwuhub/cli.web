export type IconName = keyof typeof AIconEnum
type GetIcon = (key: IconName) => VNode
export const iconVNode:GetIcon = (key) => AIconEnum?.[key]
import {App, defineComponent, h, VNode} from "vue";
export default (app:App) => {
    app.component('a-icon',{
        props:['name'],
        setup(props){
            return () => h(defineComponent({
                render: () => iconVNode(props.name as unknown as IconName)
            }))
        }
    })
}

import {
    MailOutlined,
} from '@ant-design/icons-vue'

export const AIconEnum = (() => ({
    mail: h(MailOutlined),
}))()