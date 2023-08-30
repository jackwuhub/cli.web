export declare interface UrlQuery {
    baseUrl:string
    query:{[key:string]:string}
}

export declare type SpellUrl = (baseUrl:string, query:any) => string

export declare type UrlToQuery = (url:string) => UrlQuery
export declare type TransformDefaultString = (str:string,defaultValue?:string) => string