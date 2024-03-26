// axios全局配置文件
import axios from 'axios'
import {commonTip} from "@/utils/tip";
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
            return null;
        }
    }
);


