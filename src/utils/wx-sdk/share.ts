import { ShareTo } from './@types/share'
/** 分享至QQ */
export const shareToQQ:ShareTo = ({
    title = '',
    desc = '',
    link = '',
    imgUrl = ''
    }) => {
    return new Promise((resolve,reject) => {
        console.log(title,desc,link,imgUrl)
        resolve(true)
    })
}