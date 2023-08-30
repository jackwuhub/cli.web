export type FilterFn = (key:string,data:any) => boolean
export declare type FilterObject = (data:any, filterFn?:FilterFn) => any

export declare type RemoveObjectKey = (data:any, keyList?:string | string[]) => any
export declare type Type = 'array' | 'string' | 'number' | 'object' | 'boolean' | 'function'
export declare type IsType = (data:any, type?:Type) => boolean | Type