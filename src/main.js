import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './public/public.less';
import './public/iconfont.css';
import Vuex from 'vuex';
import store from './store/store.js'; // vuex配置
import IDcode from './utils/idCheck.js';
// import preview from 'vue-photo-preview'; // 图片预览插件
// import 'vue-photo-preview/dist/skin.css';

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//import mockdata from '../mock/mock.js';
//require('../mock/mock_busInfo');
import {get, post} from './http';
import './utils/beforeEach';


// Vue 注册全局组件
import Clickoutside from './utils/clickoutside';

Vue.directive("Clickoutside", Clickoutside);


//定义全局变量
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$idCard = IDcode
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(preview)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
