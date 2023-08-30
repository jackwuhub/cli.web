import defaultLayout from './default.vue'
import adminLayout from './admin.vue'
import {LayoutEnum} from "@/layouts/types";
export default {
    [LayoutEnum.default]: defaultLayout,
    [LayoutEnum.admin]: adminLayout
}
