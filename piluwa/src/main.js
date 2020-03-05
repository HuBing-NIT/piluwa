import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入公共样式
import 'style/common.css'
import 'style/flexble.js' //100px = 1rem

// 引入icon图标库
import 'icon/iconfont.js'

// 引入mint-ui组件库
import Mint from 'mint-ui';
Vue.use(Mint);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')