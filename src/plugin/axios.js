import axios from 'axios';
let Promise = require('es6-promise').Promise;

const Axios = axios.create({
    baseURL: '/',
    timeout: 5000,
    withCredentials: true, //带上 cookie
})

//添加一个请求拦截器
Axios.interceptors.request.use(config => {
    //POST传参序列化
    if (config.method === 'post') {
        // 数据序列化成表单
        // const formData = new FormData()
        // Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
        // config.data = formData
    }

    if (config.method === 'put' || config.method == 'delete') {
        let url = ''
        for (let key in config.data) {
            url += key + '=' + config.data[key] + '&'
        }
        url = url.slice(0, url.length - 1)
        config.data = url
    }

    if (config.method === 'get' && config.url && config.url.indexOf('/api/weixin/') != -1 && config.data) {
        let url = '?'
        for (let key in config.data) {
            url += key + '=' + config.data[key] + '&'
        }
        url = url.slice(0, url.length - 1)
        config.url += url
    }
    return config
}, error => {
    return Promise.reject(error)
})

//添加一个返回拦截器
Axios.interceptors.response.use(res => {
    const { data } = res
    return data
}, error => {
    return Promise.reject(error)
})

export default Axios