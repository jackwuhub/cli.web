import defaultLayout from './default.vue'
import mainLayout from './main.vue'
import {LayoutEnum} from "@/layouts/types";
export default {
    [LayoutEnum.default]: defaultLayout,
    [LayoutEnum.main]: mainLayout,
}
