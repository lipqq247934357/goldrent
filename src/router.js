import Vue from 'vue'
import Router from 'vue-router'
import welcome from './views/welcome/welcome.vue';
import login from './views/login/login.vue'; // 登陆页面
import loanapprovallist from './views/loanapproval/loanapprovallist.vue'; //贷款审批列表
import loadapproval from './views/loanapproval/loanapproval.vue'; // 贷款审批
import businfo from './views/businessinfo/businessinfo.vue'; // 业务信息列表
import businessadmin from './views/businessadmin/businessadmin.vue'; //商业伙伴管理
import seebusinessinfo from './views/businessinfo/seebusinessinfo.vue'; // 业务信息查看
import addbusine from './views/businessadmin/addbusine.vue'; //添加商业伙伴
import legalperson from './views/businessadmin/legalperson.vue'; //法人
import naturalperson from './views/businessadmin/naturalperson.vue'; //自然人
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
          path: '/',
          name: 'welcome',
          component: welcome
        },
        {
          path: '/login',
          name: 'login',
          component: login
        },
        {
          path: '/loanapprovallist',
          name: 'loanapprovallist',
          component: loanapprovallist
       },
       {
         path: '/loadapproval',
         name: 'loadapproval',
         component: loadapproval
       },
       {
        path: '/businfo',
        name: 'businfo',
        component: businfo
        },
        {
         path: '/seebusinessinfo',
         name: 'seebusinessinfo',
         component: seebusinessinfo
        },
        {
         path: '/addbusine',
         name: 'addbusine',
         component: addbusine
        },
        {
         path: '/businessadmin',
         name: 'businessadmin',
         component: businessadmin
         },
         {
          path: '/legalperson',
          name: 'legalperson',
          component: legalperson
          },
          {
           path: '/naturalperson',
           name: 'naturalperson',
           component: naturalperson
           },

        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})
