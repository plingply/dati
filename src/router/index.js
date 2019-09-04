var routes = [{
    path: '/index/:id',
    name: 'index',
    component: require('../view/index.vue')
}, {
    path: '/Answering/:id',
    name: 'answering',
    component: require('../view/dati.vue')
}, {
    path: '/Information/:id',
    name: 'information',
    component: require('../view/msg.vue')
}, {
    path: '/Achievement/:id',
    name: 'achievement',
    component: require('../view/cj.vue')
}, {
    path: '/404',
    name: 'page404',
    component: require('../view/p404.vue')
}, {
    path: '*',
    redirect: "/404"
}]

export default routes