var routes = [{
    path: '/index/:id',
    name: 'index',
    component: require('../vue/index.vue')
}, {
    path: '/Answering/:id',
    name: 'answering',
    component: require('../vue/dati.vue')
}, {
    path: '/Information/:id',
    name: 'information',
    component: require('../vue/msg.vue')
}, {
    path: '/Achievement/:id',
    name: 'achievement',
    component: require('../vue/cj.vue')
}, {
    path: '*',
    redirect: "/index/:id"
}]

export default routes