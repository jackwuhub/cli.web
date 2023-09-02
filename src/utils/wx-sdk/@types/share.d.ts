export interface ShareBaseOptions {
    title:string
    imgUrl:string
}
export interface ShareToQQOptions extends ShareBaseOptions {
    desc:string
    link:string
}
export type ShareOptions = ShareBaseOptions | ShareToQQOptions
export type ShareTo = (ShareOptions) => Promise<boolean>