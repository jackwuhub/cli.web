export interface AnyObject<T> {
    [key:string]:T
}
export declare type SetCookie = (key:string, value:string, during:number, domain?:string) => void
export declare type DeleteCookie = (key?:string,domain?:string) => void
export declare type GetCookie = (key?:string) => string | AnyObject<string>