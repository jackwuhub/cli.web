
/**
 * 获取获取地址信息
 * @param {boolean} guide 是否引导
 * @param {string} content 引导内容
 * @return {Promise<Object>}
 */
export const getLocation = (guide = false,content = '监测到未授权地理位置，请授权') => {
    return new Promise( (resolve,reject) => {
        wx.getLocation({
            type: 'wgs84',
            success: res => { resolve(res) },
            fail: err => {
                const {  errMsg } = err
                reject(null)
                if(guide && errMsg === 'getLocation:fail auth deny'){ // 授权失败
                    wx.showModal({
                        title:'提示',
                        content,
                        confirmText:'授权',
                        cancelText:'取消',
                        success(res) {
                            const { confirm } = res
                            if(confirm){
                                wx.openSetting()
                            }
                        },
                    })
                }
            }
        })
    })
}


/**
 * 转换图片至临时路径,主要解决ios长按图片菜单无法保存的问题
 * @param {string} url
 */
export const covertPhotoToTempPath = (url:string) => {
    return new Promise((resolve, reject) => {
        if(!url) return resolve(url)
        wx.getImageInfo({
            src:url,
            success(res) {
                const {path} = res
                resolve(path)
            },
            fail() {
                reject(url)
            }
        })
    })
}

/**
 * rpxToPx
 * @param {number} rpx
 */
export const rpxToPx = (rpx:number) => rpx * wx.getSystemInfoSync()?.windowWidth / 750