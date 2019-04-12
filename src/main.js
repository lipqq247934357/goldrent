import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './public/public.less';
import './public/iconfont.css';

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mockdata from '../mock/mock.js';
import axios from 'axios';
import {get, post} from './http';


//定义全局变量
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
