import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index/index.vue';
import layout from './views/layout/index';
import login from './views/login/login.vue'; // 登陆页面
import loanapproval from './views/loanapproval/index.vue'; //贷款审批列表
import loanapprovaldetail from './views/loanapproval/loanApprovalDetail.vue'; // 贷款审批
import businfo from './views/businessInfo/businessInfo.vue'; // 业务信息列表
import businessadmin from './views/businessM/index.vue'; //商业伙伴管理
import businessdetail from './views/businessInfo/businessDetail.vue'; // 业务信息查看
import addbusine from './views/businessM/addbusine.vue'; //添加商业伙伴
import legalperson from './views/businessM/legalperson.vue'; //法人
import naturalperson from './views/businessM/naturalperson.vue'; //自然人
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '',
            component: layout,
            redirect: '/layout/index',
            name: 'Dashboard',
        },
        {
            path: '/layout',
            name: 'layout',
            component: layout,
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: index
                },
                {
                    path: 'businfo', // 业务信息
                    name: 'businfo',
                    component: businfo
                },

                {
                    path: 'businessdetail', //业务信息查看
                    name: 'businessdetail',
                    component: businessdetail
                },
                {
                    path: 'loadapproval', // 审批列表
                    name: 'loadapproval',
                    component: loanapproval
                },
                {
                    path: 'loadapprovaldetail', //审批详情
                    name: 'loadapprovaldetail',
                    component: loanapprovaldetail
                },
                {
                    path: 'businessM', // 业务管理
                    name: 'businessadmin',
                    component: businessadmin
                },
                {
                    path: 'addbusine', //添加
                    name: 'addbusine',
                    component: addbusine
                },

                {
                    path: 'legalperson', // 法人
                    name: 'legalperson',
                    component: legalperson
                },
                {
                    path: 'naturalperson', // 自然人
                    name: 'naturalperson',
                    component: naturalperson
                }
            ]
        },
    ]
})
