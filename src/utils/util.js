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

export function getType(str){
    if (str=="全部题型")
        return 0
    else if(str=="单选题")
        return 1
    else if(str=="多选题")
        return 2
    else if(str=="判断题")
        return 3
    else if(str=="填空题")
        return 4
    else if(str=="应用题")
        return 5
    else
        return -1
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}