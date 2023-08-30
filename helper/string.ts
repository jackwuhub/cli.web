import {SpellUrl, TransformDefaultString, UrlToQuery} from "./@types/string";
/**
 * 拼接完成url项
 * @param baseUrl
 * @param query
 * @returns {string|*}
 */


export const spellUrl:SpellUrl = (baseUrl,query = {}) => {
    const queryArr = Object.keys(query)
    if(!queryArr.length) return baseUrl
    return queryArr.reduce( (total, key, index) => (
        total += index === 0 ? key + '=' + query[key] : '&' + key + '=' + query[key]
    ), baseUrl + '?')
}


/**
 *  地址转换url + query形式
 * @param url
 */
export const url2query:UrlToQuery = (url = '') => {
    const urlArr = url.split('?')
    if(urlArr.length <= 1) return {baseUrl:url, query:{}}
    const baseUrl = urlArr[0]
    const queryString = urlArr[1]
    const query = queryString.split('&').reduce( (total, ele) => {
        const key = ele.split('=')[0]
        const value =  ele.split('=')[1]
        return Object.assign(total,{[key]:value})
    },{})
    return { baseUrl, query }
}

/**
 * 格式化空数据字符串
 * @param str
 * @param defaultValue
 */
export const transformDefaultString:TransformDefaultString = (str, defaultValue = '--') => str ? str : defaultValue