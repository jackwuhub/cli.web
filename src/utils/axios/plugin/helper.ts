import {isType} from "@/helper";

export const parseUrl = (path:string,routeParams:any = {}):string => {
    return path.replace(
        /{(\w+)}/g,
        (m:string, n:string) => routeParams[n]
    )
}
export const object2FormData = (data:any):FormData => {
    const formData = new FormData()
    for(let key in data){
        formData.append(
            key,
            isType(data?.[key],'object') ? object2FormData(data?.[key]):
                data?.[key]
        )
    }
    return formData
}
