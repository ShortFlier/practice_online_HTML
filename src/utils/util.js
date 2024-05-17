// 信息查询地址拼接
import {answer_apart, identity_admin} from "@/utils/constant";
import store from "@/store";

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

//简单登入验证
export function isLogin(){
    if(store.state.account&&store.state.token&&store.state.identity)
        return store.state.identity
    else{
        console.log('NOT_LOGIN')
        return false
    }
}

//字符串排序
export function sortString(str) {
    return str.split('').sort().join('');
}

//获取登入信息
export function getLoginInfo(){
    if(store.state.identity==identity_admin)
        return '[admin]:'+store.state.account
    else
        return '['+store.state.identity+']:'+store.state.id
}

// 获取当前时间的字符串表示（"yyyy-MM-dd HH:mm:ss"格式）
export function getCurrentDateTimeString() {
    let currentDate = new Date();
    return formatDate(currentDate);
}

// 将当前时间加上指定天数并返回字符串表示（"yyyy-MM-dd HH:mm:ss"格式）
export function addDaysToCurrentDateTime(days) {
    let currentDate = new Date();
    let futureDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
    return formatDate(futureDate);
}

// 格式化日期为"yyyy-MM-dd HH:mm:ss"格式
export function formatDate(date) {
    return date.getFullYear() + "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + "T" +
        ("0" + date.getHours()).slice(-2) + ":" +
        ("0" + date.getMinutes()).slice(-2) + ":" +
        ("0" + date.getSeconds()).slice(-2);
}