// 信息查询地址拼接
export function connectPath(object){
    let path
    for (const key in object) {
        if(object[key]){
            if(!path)
                path=`${key}=${object[key]}`
            else
                path=path+`&${key}=${object[key]}`
        }
    }
    return path
}