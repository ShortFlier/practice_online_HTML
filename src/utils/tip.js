

import {ElMessage, ElMessageBox} from "element-plus";

// 普通信息提示
//type类型有success,warning,massage,error
export function commonTip(type, msg, time, top){
    ElMessage({
        message: msg,
        type: type,
        duration: time?time:2000,
        offset:top?top:170
    })
}


export function confirmationBox(message, type, access) {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(message, '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: type || 'warning'
        }).then(() => {
            if (access && typeof access === 'function') {
                access().then(() => {
                    resolve(true);
                }).catch(() => {
                    resolve(false);
                });
            } else {
                resolve(true);
            }
        }).catch(() => {
            resolve(false);
        });
    });
}



