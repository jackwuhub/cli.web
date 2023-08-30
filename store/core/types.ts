export type StoreOptionsState = {[key:string]:any}
export type StoreSetState = (key:string, value:any) => StoreOptionsState
export type StoreGetState = (key:string) => any
export type StoreDoAction = (actionsKey:string,data?:any) => any

export type StoreActionFn = (state:StoreOptionsState,data?:any) => any
export interface StoreOptions {
    id:string
    state: () => StoreOptionsState
    actions?: {[key:string]:StoreActionFn}
}
export interface ConstructorStoreInterface {
    setState:StoreSetState
    getState: StoreGetState
    doAction: StoreDoAction
}
