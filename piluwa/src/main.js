import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import axios from './untils/axios'

// 引入公共样式
import 'style/common.css'
import 'style/flexble.js' //100px = 1rem

// 引入icon图标库
import './assets/icon/iconfont.css'

// 引入动画库
import 'animate.css/animate.css'



// 导入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// import { Toast } from 'vant';
// Vue.use(Toast);


Vue.config.productionTip = false



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')