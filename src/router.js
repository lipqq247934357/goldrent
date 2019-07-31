import Vue from 'vue'
import Router from 'vue-router'
// import index from './views/index/index.vue';
// import layout from './views/layout/index';
// import login from './views/login/login.vue'; // 登陆页面
// import loanapproval from './views/loanapproval/index.vue'; //贷款审批列表
// import upper from './views/loanapproval/upper.vue'; //上会审议 upper director senior
// import director from './views/loanapproval/director.vue'; //主任审批
// import senior from './views/loanapproval/senior.vue'; //资深审批
// import loanapprovaldetail from './views/loanapproval/loanApprovalDetail.vue'; // 贷款审批
// import businfo from './views/businessInfo/businessInfo.vue'; // 业务信息列表
// import businessadmin from './views/businessM/index.vue'; //商业伙伴管理
// import businessdetail from './views/businessInfo/businessDetail.vue'; // 业务信息查看
// import legal from './views/businessM/legal.vue'; //添加商业伙伴
// import natural from './views/businessM/natural.vue'; //添加商业伙伴
// import error404 from './views/404'; // 404
//
// import loanmoney from './views/loanmoney/index.vue'; // 放款审批列表
// import loanmoneyRe from './views/loanmoney/loanMoneyRe.vue'; // 放款审批列表
// import download from './views/loanmoney/download.vue'; // 下载放款审批
// import loanmoneyconfirm from './views/loanmoney/loanmoneyconfirm.vue'; // 放款确认列表
// import loanmoneyconfirmRe from './views/loanmoney/loanmoneyconfirmRe.vue'; // 放款确认列表
//
// import confirmhandle from './views/loanmoney/confirmhandle.vue'; // 放款确认详情
//
// import banner from './views/bannermanagement/bannermanagement.vue'; // banner图管理
// import appversion from './views/appversion/appversion.vue'; // app版本管理
// import configuration from './views/configuration/configuration.vue'; // 用户权限管理
// import tubepeople from './views/configuration/tubepeople.vue'; // 用户权限管理
// import importOrder from './views/importOrder/index.vue';  // 订单导入
Vue.use(Router)


/**
 *
 () => import(  './views/index/index.vue')
 */

export default new Router({
    routes: [
        {
            path: '/404',
            component: () => import(  './views/404')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(  './views/login/login.vue')
        },
        {
            path: '',
            component: () => import(  './views/layout/index'),
            redirect: '/layout/index',
            name: 'Dashboard',
        },
        {
            path: '/layout',
            name: 'layout',
            component: () => import(  './views/layout/index'),
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: () => import(  './views/businessInfo/businessInfo.vue')
                },
                {
                    path: 'businfo', // 业务信息
                    name: 'businfo',
                    component: () => import(  './views/businessInfo/businessInfo.vue')
                },

                {
                    path: 'businessdetail', //业务信息查看
                    name: 'businessdetail',
                    component: () => import(  './views/businessInfo/businessDetail.vue')
                },
                {
                    path: 'loadapproval', // 审批列表
                    name: 'loadapproval',
                    component: () => import(  './views/loanapproval/index.vue')
                },
                {
                    path: 'upper', // 审批列表
                    name: 'upper',
                    component: () => import(  './views/loanapproval/upper.vue')
                },
                {
                    path: 'director', // 审批列表
                    name: 'director',
                    component: () => import(  './views/loanapproval/director.vue')
                },
                {
                    path: 'senior', // 审批列表
                    name: 'senior',
                    component: () => import(  './views/loanapproval/senior.vue')
                },
                {
                    path: 'loadapprovaldetail', //审批详情
                    name: 'loadapprovaldetail',
                    component: () => import(  './views/loanapproval/loanApprovalDetail.vue')
                },
                {
                    path: 'businessM', // 业务管理
                    name: 'businessadmin',
                    component: () => import(  './views/businessM/index.vue')
                },
                {
                    path: 'legal', //修改删除法人
                    name: 'legal',
                    component: () => import(  './views/businessM/legal.vue')
                },
                {
                    path: 'natural', //修改删除
                    name: 'natural',
                    component:
                        () => import(  './views/businessM/natural.vue')
                },
                {

                    path: 'loanmoney', //放款审批列表
                    name: 'loanmoney',
                    component: () => import(  './views/loanmoney/index.vue')
                },
                {

                    path: 'loanmoneyre', //放款审批列表
                    name: 'loanmoneyre',
                    component: () => import(  './views/loanmoney/loanMoneyRe.vue')
                },
                {

                    path: 'download', //下载审批列表
                    name: 'download',
                    component: () => import(  './views/loanmoney/download.vue')
                },
                {

                    path: 'loanmoneyconfirm', //放款确认列表
                    name: 'loanmoneyconfirm',
                    component: () => import(  './views/loanmoney/loanmoneyconfirm.vue')
                },
                {

                    path: 'loanmoneyconfirmre', //放款确认列表
                    name: 'loanmoneyconfirmre',
                    component: () => import(  './views/loanmoney/loanmoneyconfirmRe.vue')
                },
                {

                    path: 'confirmhandle', //放款确认列表
                    name: 'confirmhandle',
                    component: () => import(  './views/loanmoney/confirmhandle.vue')
                },
                // {
                //
                //     path: 'loanmoneydetail', //放款审批列表详情
                //     name: 'loanmoneydetail',
                //     component: loanmoneydetail
                // }
                {
                    path: '/banner',
                    name: 'banner',
                    component: () => import(  './views/bannermanagement/bannermanagement.vue')
                },
                {
                    path: '/appversion',
                    name: 'appversion',
                    component: () => import(  './views/appversion/appversion.vue')
                },
                {
                    path: '/configuration', // 角色管理
                    name: 'configuration',
                    component: () => import(  './views/configuration/configuration.vue')
                },
                {
                    path: '/tubepeople', // 用户权限管理
                    name: 'tubepeople',
                    component: () => import(  './views/configuration/tubepeople.vue')
                },
                {
                    path: 'importOrder', // 订单导入
                    name: 'importOrder',
                    component: () => import(  './views/importOrder/index.vue')
                }
            ]
        },
        {
            path: '*',
            redirect: '/404',
        }
    ]
})
