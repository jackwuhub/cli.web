import {ConstructorStoreInterface, StoreActionFn, StoreOptions} from "./types";

export class ConstructorStore implements ConstructorStoreInterface{
    readonly id: string = 'unknown'
    readonly $state:any = {}
    readonly $actions: {[key:string]:StoreActionFn} = {}
    constructor(options: StoreOptions) {
        this.id = options.id
        this.$state = typeof options.state === 'function' && options.state()
        if(!!options.actions) {
            for (const actionKey in options?.actions) {
                this.$actions[actionKey] = options?.actions[actionKey]
            }
        }
    }
    setState(key:string, value:any){
        if(this.$state.hasOwnProperty(key)) this.$state[key] = value
        else console.error(`${this.id}-store未找到${key}的state`)
        return {...this.$state}
    }
    getState(key:keyof typeof this.$state){
        return this.$state?.[key]
    }
    doAction(actionKey: keyof typeof this.$actions,data?:any){
        if(this.$actions.hasOwnProperty(actionKey)) return this.$actions[actionKey](this.$state,data)
        else console.error(`${this.id}-store未找到${actionKey}的actions`)
    }
}
