// axios全局配置文件
import axios from 'axios'
import {commonTip} from "@/utils/tip";
import store from "@/store";
// 配置访问主机
axios.defaults.baseURL='/api';


// 全局错误处理
axios.interceptors.response.use(
    response => {
        // 请求成功的回调
        if(response.data.code==200)
            return response.data;
        else {
            commonTip('error',response.data.msg)
            console.log(response.data.msg)
            return null;
        }
    }
);

axios.interceptors.request.use(
    config => {
        const token = store.state.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['token'] = token; // 添加token字段
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);




