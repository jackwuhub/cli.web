import {Ref} from "vue";
import { TdDialogProps,TdPrimaryTableProps } from 'tdesign-vue-next'
type AnyMethod = () => void
export interface TableRow {
    name: string
    title: string
}
export interface IUseMethods {
    dialogProps:Ref<TdDialogProps>
    closeDialog:AnyMethod
    listData:Ref<TableRow[]>
    tableProps:Ref<TdPrimaryTableProps>
    sendToDingTalk:AnyMethod
    getHistoryList: AnyMethod
}