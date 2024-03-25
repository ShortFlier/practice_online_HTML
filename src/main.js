import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const app=createApp(App).use(store).use(router)


// 全局节流
app.directive('throttle', {
    mounted(el, binding) {
        const { value, arg } = binding
        const throttledFn = _.throttle(value, arg)
        el.addEventListener('click', throttledFn)
    },
})

app.mount('#app')
