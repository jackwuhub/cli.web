import {isType, removeObjectKey} from "./object";
import {GroupBy, MergeChild, OmitArrayByKey, OmitChildByKey} from "./@types/array";

/**
 * 数组分组
 * @param arr 数组
 * @param key 分组字段
 * @param addGroupByKey 添加至组的数据
 */
export const groupBy:GroupBy = (arr, key, addGroupByKey) => {
  if(!arr || !arr.length) return []
  if (!key) return arr
  let groupStaticKey: any = [key]
  if(addGroupByKey){ // 更新必要参数
    if(isType(addGroupByKey,'string')) groupStaticKey = [...groupStaticKey,addGroupByKey]
    if(isType(addGroupByKey,'array')) groupStaticKey = [...groupStaticKey,...addGroupByKey]
  }
  return arr.reduce((total, cur) => {
    const findItem = total.find( (ele:any) => ele?.[key] === cur?.[key] ) // 校验当前元素的key在数组中是否存在
    if(findItem) findItem?.list.push(cur) // 存在则放入list
    else total.push({list:[cur],...groupStaticKey.reduce((acc:any, curKey:string) => ({...acc,[curKey]:cur[curKey]}),{})}) // 不存在则创建新的对象
    return total
  },[])
}

/**
 *  合并子项
 * @param arr
 * @param parentKey
 * @param childKey
 */
export const mergeChild:MergeChild = (arr, parentKey, childKey) => {
  const list:Array<any> =  []
  if(!arr || !arr.length) return list
  arr.forEach((ele:any) => {
    const findIndex = list.findIndex((item:any) => item?.[parentKey] === ele?.[parentKey])
    if(findIndex === -1) list.push(ele) // list没有则全部放入
    else list[findIndex][childKey] = list?.[findIndex]?.[childKey]?.concat(ele?.[childKey])
  })
  return list
}

/**
 * 提取重复项合并成 parent，child形式
 * @param arr
 * @param parentKey
 * @param childKey
 */
export const omitChildByKey:OmitChildByKey = (arr, parentKey, childKey = 'child'):any[] => {
  const list:Array<any> =  []
  arr.forEach((ele:any) => {
    const findIndex = list.findIndex((item:any) => item?.[parentKey] === ele?.[parentKey])
    if(findIndex === -1) list.push({
      [parentKey]: ele?.[parentKey],
      [childKey]: [removeObjectKey(ele,parentKey)]
    })
    else list[findIndex][childKey] = list?.[findIndex]?.[childKey].concat( removeObjectKey(ele, parentKey)) ?? []
  })
  return list
}