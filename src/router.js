import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index/index.vue';
import layout from './views/layout/index';
import login from './views/login/login.vue'; // 登陆页面
import loanapproval from './views/loanapproval/index.vue'; //贷款审批列表
import upper from './views/loanapproval/upper.vue'; //上会审议 upper director senior
import director from './views/loanapproval/director.vue'; //主任审批
import senior from './views/loanapproval/senior.vue'; //资深审批
import loanapprovaldetail from './views/loanapproval/loanApprovalDetail.vue'; // 贷款审批
import businfo from './views/businessInfo/businessInfo.vue'; // 业务信息列表
import businessadmin from './views/businessM/index.vue'; //商业伙伴管理
import businessdetail from './views/businessInfo/businessDetail.vue'; // 业务信息查看
import legal from './views/businessM/legal.vue'; //添加商业伙伴
import natural from './views/businessM/natural.vue'; //添加商业伙伴
import error404 from './views/404'; // 404

import loanmoney from './views/loanmoney/index.vue'; // 放款审批列表
import download from './views/loanmoney/download.vue'; // 下载放款审批
import loanmoneyconfirm from './views/loanmoney/loanmoneyconfirm.vue'; // 放款确认列表
import confirmhandle from './views/loanmoney/confirmhandle.vue'; // 放款确认详情

import banner from './views/bannermanagement/bannermanagement.vue'; // banner图管理
import appversion from './views/appversion/appversion.vue'; // app版本管理
import configuration from './views/configuration/configuration.vue'; // 用户权限管理
import tubepeople from './views/configuration/tubepeople.vue'; // 用户权限管理
// import loanmoneydetail from './views/loanmoney/loanmoneydetail.vue';
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/404',
            component: error404
        },
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
                    path: 'upper', // 审批列表
                    name: 'upper',
                    component: upper
                },
                {
                    path: 'director', // 审批列表
                    name: 'director',
                    component: director
                },
                {
                    path: 'senior', // 审批列表
                    name: 'senior',
                    component: senior
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
                    path: 'legal', //修改删除法人
                    name: 'legal',
                    component: legal
                },
                {
                    path: 'natural', //修改删除
                    name: 'natural',
                    component: natural
                },
                {

                    path: 'loanmoney', //放款审批列表
                    name: 'loanmoney',
                    component: loanmoney
                },
                {

                    path: 'download', //下载审批列表
                    name: 'download',
                    component: download
                },
                {

                    path: 'loanmoneyconfirm', //放款确认列表
                    name: 'loanmoneyconfirm',
                    component: loanmoneyconfirm
                },
                {

                    path: 'confirmhandle', //放款确认列表
                    name: 'confirmhandle',
                    component: confirmhandle
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
                    component: banner
                },
                {
                    path: '/appversion',
                    name: 'appversion',
                    component: appversion
                },
                {
                    path: '/configuration', // 角色管理
                    name: 'configuration',
                    component: configuration
                },
                {
                    path: '/tubepeople', // 用户权限管理
                    name: 'tubepeople',
                    component: tubepeople
                }
            ]
        },
        {
            path: '*',
            redirect: '/404',
        }
    ]
})
