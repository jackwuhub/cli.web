import {GetLoginCode, LoginByPhoneNum, PhoneNumExpose} from "./@types/openApi";


/**
 * 获取登陆code
 */
export const getLoginCode:GetLoginCode = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res){
                const { code, errMsg } = res
                if(errMsg === 'login:ok') resolve(code)
            },
            fail(err){
               const { errMsg, errno } = err
                console.error(errMsg)
                reject(errno)
            }
        })
    })
}
/**
 * 获取登陆信息通过手机号
 * @param config {PhoneNumConfig}
 */
export const loginByPhoneNum:LoginByPhoneNum = (config) => {
    return new Promise((resolve, reject) => {
        if(config.errMsg === 'getPhoneNumber:ok'){
            getLoginCode().
            then(code => {
                const option:PhoneNumExpose = {
                    wxEncryptedData: config.encryptedData,
                    wxIv: config.iv,
                    wxJsCode:code,
                    wxPhoneCode: config.code
                }
                resolve(option)
            }).
            catch(errno => {
                console.error("登陆失败Errno:",errno)
                reject(errno)
            })
        }else reject(config.errMsg)
    })
}