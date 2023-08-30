import IShareAppMessageOption = WechatMiniprogram.Page.IShareAppMessageOption;


export interface ShareAppMessageOption{
    title: string
    path?: string
    imageUrl?:string
}
export type ShareAppMessageConfig  = (option:ShareAppMessageOption) => (config:IShareAppMessageOption ) => Promise<ShareAppMessageOption>