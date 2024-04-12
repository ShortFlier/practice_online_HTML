// 信息查询地址拼接
import {answer_apart} from "@/utils/constant";

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

export function isEmpty(value) {
    if (typeof value === 'number') {
        return value === 0;
    } else if (typeof value === 'boolean') {
        return value === false;
    } else if (typeof value === 'string') {
        return value === '';
    } else if (typeof value === 'object') {
        for (let key in value) {
            if (!isEmpty(value[key])) {
                return false;
            }
        }
        return true;
    } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            if (!isEmpty(value[i])) {
                return false;
            }
        }
        return true;
    } else {
        return true;
    }
}

//答案拼接
export function connectAnswer(array,length){
    let answer=''
    for (let i = 0; i < array.length; i++) {
        answer=answer+(array[i]?array[i]:'未作答')+answer_apart
    }
    const empty=length-array.length
    console.log('empty:'+empty)
    if(empty){//补空
        for (let i = 0; i < empty; i++) {
            answer=answer+'未作答'+answer_apart
        }
    }
    return answer
}