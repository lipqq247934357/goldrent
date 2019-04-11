import Vue from 'vue'
import Router from 'vue-router'
import welcome from './views/index/index.vue';
import login from './views/login/login.vue'; // 登陆页面
import loanapprovallist from './views/loanapproval/index.vue'; //贷款审批列表
import loadapproval from './views/loanapproval/loanApprovalDetail.vue'; // 贷款审批
import businfo from './views/businessinfo/businessInfo.vue'; // 业务信息列表
import businessadmin from './views/businessM/index.vue'; //商业伙伴管理
import businessdetail from './views/businessinfo/businessDetail.vue'; // 业务信息查看
import addbusine from './views/businessM/addbusine.vue'; //添加商业伙伴
import legalperson from './views/businessM/legalperson.vue'; //法人
import naturalperson from './views/businessM/naturalperson.vue'; //自然人
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
         path: '/businessdetail',
         name: 'businessdetail',
         component: businessdetail
        },
        {
         path: '/addbusine',
         name: 'addbusine',
         component: addbusine
        },
        {
         path: '/businessM',
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
