import GetWeRunDataSuccessCallbackResult = WechatMiniprogram.GetWeRunDataSuccessCallbackResult;

export interface PhoneNumConfig extends GetWeRunDataSuccessCallbackResult{
    code: string
}
export interface PhoneNumExpose {
    wxIv: string
    wxJsCode: string
    wxEncryptedData: string
    wxPhoneCode: string
}

/**
 * 通过手机号登陆
 */
export type LoginByPhoneNum = (event:PhoneNumConfig) => Promise<PhoneNumExpose>

/** 登陆获取code */
export type GetLoginCode = () => Promise<string>