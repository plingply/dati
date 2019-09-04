import vue from 'vue'
import vueRouter from 'vue-router'
import App from './app.vue'
import http from 'axios'
import axios from './plugin/ajax'
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

router.beforeEach(function(to, from, next) {

    if (store.state.msg.id) {
        next()
    } else {
        gethd(to, from, next)
    }
})

new vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

//判断是否是微信浏览器
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

function gethd(to, from, next) {

    http.get('/api/weixin/hd/dati/' + to.params.id)
        .then(data => {
            document.title = data.data.data.title
            store.commit('setmsg', data.data.data)
            store.commit('setSchool', data.data.data.school)
            if (isWeiXin()) {
                getWXquanxian(data.data.data)
            }
            gettiList(to, next)
        })
        .catch(err => {
            console.log(err)
        })
}

function gettiList(to, next) {
    http
        .get("/api/weixin/hd/dati/" + to.params.id + "/ti")
        .then(data => {
            var list = data.data.data.list;
            var q = [];
            list.map(item => {
                q.push({
                    ti_id: item.id,
                    select: ""
                });
            });
            store.commit("setd", q);
            store.commit("setList", list);
            next({ name: 'index', params: { id: to.params.id } })
        })
        .catch(err => {
            console.log(err);
        });
}

//获取微信权限
function getWXquanxian(obj) {
    var formData = new FormData();
    formData.append("url", window.location.href.split("#")[0]);
    http.post("/api/weixin/school/wxjs/jsconfig/" + store.state.school.token, formData)
        .then(function(data) {
            var result = typeof data.data == 'string' ? JSON.parse(data.data) : data.data;
            if (result.appId) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: result.appId, // 必填，公众号的唯一标识
                    timestamp: result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: result.nonceStr, // 必填，生成签名的随机串
                    signature: result.signature, // 必填，签名，见附录1
                    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function() {
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: obj.title, // 分享标题
                        desc: obj.school.name, // 分享描述
                        link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: 'http://wx.eduwxt.com/hd/dati/static/img/fenxiang.jpg', // 分享图标
                        success: function() {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: obj.title, // 分享标题
                        desc: obj.school.name, // 分享描述
                        link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: 'http://wx.eduwxt.com/hd/dati/static/img/fenxiang.jpg', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {},
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                })
            }

        }).catch(err => {
            console.log(err);
        });
}