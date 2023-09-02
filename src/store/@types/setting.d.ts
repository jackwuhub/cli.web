
import {IconName} from "@/utils/TDesign/icons";

export interface TabBarItem {
    label: string
    route: string
    icon?: IconName
}
export interface SettingState { // 设置
    tabs: TabBarItem[]
}