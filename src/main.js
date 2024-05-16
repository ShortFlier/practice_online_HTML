import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

import 'bootstrap-icons/font/bootstrap-icons.css'

import _ from 'lodash';

import '../axios.config'

import zhCn from 'element-plus/es/locale/lang/zh-cn'



const app=createApp(App)

app.use(ElementPlus, {
    locale: zhCn,
})

//ElementUI组件的引入
app.use(ElementPlus)

app.use(store).use(router)

// 全局节流
app.directive('throttle', {
    mounted(el, binding) {
        const { value, arg } = binding
        const throttledFn = _.throttle(value, arg)
        el.addEventListener('click', throttledFn)
    },
})


app.mount('#app')
