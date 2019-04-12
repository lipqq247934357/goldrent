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
import businedetail from './views/businessM/detail.vue'; //添加商业伙伴
import editbusine from './views/businessM/edit.vue'; //添加商业伙伴
import error404 from './views/404'; // 404
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
                    path: 'businedetail', //详情
                    name: 'businedetail',
                    component: businedetail
                },
                {
                    path: 'editbusine', //修改删除
                    name: 'editbusine',
                    component: editbusine
                }
            ]
        },
        {
            path: '*',
            name: '404',
            component: error404
        }
    ]
})
