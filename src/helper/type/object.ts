import {FilterFn, FilterObject, IsType, RemoveObjectKey, Type} from "./@types/object";
/** 过滤空值对象*/
const filterMethod:FilterFn =  (key,data) => data[key] !== null && data[key] !== undefined && data[key] !== ''
export const filterObject:FilterObject = (data , filterFn = filterMethod ) => {
    if (typeof data === 'undefined' || !data) return {}
    return Object.keys(data)
        .filter((key:string) => filterFn ?  filterFn(key,data) : true)
        .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
}

/** 按照key移除指定 **/
export const removeObjectKey:RemoveObjectKey = ( data = {}, keyList) => {
    const filterFn = (key:string | number):boolean => {
        if(typeof  keyList === 'string') return key !== keyList
        else return !keyList?.some( (ele:string | number) => ele === key)
    }
    return Object.keys(data)
        .filter( key => filterFn(key) )
        .reduce((acc:any, key:string) => ({ ...acc, [key]: data[key] }), {})
}
/** 类型校验 */
export const isType:IsType = (data,type) => {
    const parseType:Type = <Type>Object?.prototype?.toString?.call(data)?.match(/\[object (.*?)\]/)?.[1]?.toLowerCase()
    return !!type ? parseType === type?.toLowerCase() : parseType
}