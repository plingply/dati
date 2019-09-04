import http from './axios.js'
export default {
    install: function(Vue, name = '$http') {
        Object.defineProperty(Vue.prototype, name, { value: http });
    }
}