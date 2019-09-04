import vue from 'vue'
import vueRouter from 'vue-router'
import App from './app.vue'
import axios from './plugin/ajax/index'
import store from './store'
import filter from "./plugin/filter"

import './less/index.less'

vue.use(vueRouter)
vue.use(axios)

// 全局过滤器
filter(vue)

import routes from './router/index'
//实例化VueRouter
let router = new vueRouter({
    routes // （缩写）相当于 routes: routes
})


new vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

//判断是否是微信浏览器
vue.prototype.isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
