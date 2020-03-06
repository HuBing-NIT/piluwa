import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import my from 'components/My/my.vue'
import home from 'components/Home/home.vue'
import cart from 'components/Cart/cart.vue'
import classify from 'components/Classify/classify.vue'
import tologin from 'components/User/tologin.vue'
import login from 'components/User/login.vue'


// Vue.component({ tologin })
const routes = [{
        path: '/my',
        component: my,
    },
    {
        path: '/tologin',
        component: tologin,
        children: [{
            path: ':login',
            component: login,
        }]
    },
    { path: '/home', component: home },
    { path: '/cart', component: cart },
    { path: '/classify', component: classify },
    { path: '/', component: home },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router