export interface AnyObject<T> {
    [key:string]:T
}
export type GroupBy = (arr:any[], key:string, addGroupByKey?:string[] | string) => any[]

export declare type MergeChild = (arr:any[], parentKey:string, childKey: string) => any[]

export declare type OmitChildByKey = (arr:any[], parentKey:string, childKey?: string) => any[]

export declare type OmitArrayByKey = (arr:any[], keyValue:AnyObject<any> ) => any[]