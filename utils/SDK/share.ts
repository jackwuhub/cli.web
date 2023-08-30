import {ShareAppMessageConfig} from "./@types/share";
import {filterObject} from "@/helper/index";

export const shareAppMessageConfig:ShareAppMessageConfig = (option) => {
    const parseOption = filterObject(option)
    // config 暂时没有用到
    return (_config) => Promise.resolve(parseOption)
}