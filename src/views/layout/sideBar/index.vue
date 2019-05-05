<template>
    <div class="menu">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                    class="el-menu-vertical-demo"
                    :default-openeds="opends"
                    :unique-opened="true"
                    :default-active="$route.path"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#1e1e1e"
                    text-color="#606266"
                    active-text-color="#ffd04b"
                    router>
                    <el-submenu
                        v-for="(item , index) in menulist"
                        :index="String(index)" class="menugold">
                        <template slot="title">
                            <i>
                                <img :src="nowactive == index ? item.heightlight : item.img" alt="icon加载失败">
                            </i>
                            <span :class="nowactive == index ? 'highlight' : ''">&nbsp;{{item.title}}</span>
                        </template>
                        <el-menu-item
                            v-for="subitem in item.url"
                            :index="subitem.path">&nbsp;&nbsp;&nbsp;{{subitem.name}}</el-menu-item>
                    </el-submenu>
                    <!-- <el-submenu
                        index="1" class="menugold">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span :class="{highlight: nowactive}">业务信息</span>
                        </template>
                        <el-menu-item index="/layout/businfo">&nbsp;&nbsp;&nbsp;业务信息列表页</el-menu-item>
                    </el-submenu> -->
                    <!-- <el-submenu index="2" class="menugold">
                        <template slot="title">
                            <i>
                                <img :src="approval" alt="">
                            </i>
                            <span :class="{highlight: index == 2}">&nbsp;贷款审批管理</span>
                        </template>
                        <el-menu-item index="/layout/loadapproval">&nbsp;&nbsp;&nbsp;贷款审批</el-menu-item>
                        <el-menu-item index="/layout/upper">&nbsp;&nbsp;&nbsp;上会审议</el-menu-item>
                        <el-menu-item index="/layout/director">&nbsp;&nbsp;&nbsp;主任审批</el-menu-item>
                        <el-menu-item index="/layout/senior">&nbsp;&nbsp;&nbsp;资深审批</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" class="menugold">
                        <template slot="title">
                            <i>
                                <img :src="loan" alt="">
                            </i>
                            <span :class="{highlight: nowactive == 3}">&nbsp;放款管理</span>
                        </template>
                        <el-menu-item index="/layout/loanmoney">&nbsp;&nbsp;&nbsp;放款审批</el-menu-item>
                        <el-menu-item index="/layout/download">&nbsp;&nbsp;&nbsp;下载放款审批</el-menu-item>
                        <el-menu-item index="/layout/loanmoneyconfirm">&nbsp;&nbsp;&nbsp;放款确认列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4" class="menugold">
                        <template slot="title">
                            <i>
                                <img :src="business" alt="">
                            </i>
                            <span :class="{highlight: nowactive == 4}">&nbsp;业务管理</span>
                        </template>
                        <el-menu-item index="/layout/businessM">&nbsp;&nbsp;&nbsp;商业伙伴管理</el-menu-item>
                    </el-submenu> -->
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                opends: [],
                nowactive: null, // 当前激活的字体颜色
                approval: require('./arropvala.png'),
                loan: require('./loana.png'),
                business: require('./admina.png'),
                menulist: [
                    {
                        title: '业务信息',
                        img: require('./bussinfoa.png'),
                        heightlight: require('./bussinfol.png'),
                        url: [
                            {
                                path: '/layout/businfo',
                                name: '业务信息列表'
                            }
                        ]
                    },
                    {
                        title: '贷款审批管理',
                        img: require('./arropvala.png'),
                        heightlight: require('./approvall.png'),
                        url: [
                            {
                                path: '/layout/loadapproval',
                                name: '贷款审批'
                            },
                            {
                                path: '/layout/upper',
                                name: '上会审议'
                            },
                            {
                                path: '/layout/director',
                                name: '主任审批'
                            },
                            {
                                path: '/layout/senior',
                                name: '资深审批'
                            }
                        ]
                    },
                    {
                        title: '放款管理',
                        img: require('./loana.png'),
                        heightlight: require('./loanl.png'),
                        url: [
                            {
                                path: '/layout/businfo',
                                name: '放款审批'
                            },
                            {
                                path: '/layout/download',
                                name: '下载放款审批'
                            },
                            {
                                path: '/layout/loanmoneyconfirm',
                                name: '放款确认列表'
                            }
                        ]
                    },
                    {
                        title: '业务管理',
                        img: require('./admina.png'),
                        heightlight: require('./adminl.png'),
                        url: [
                            {
                                path: '/layout/businessM',
                                name: '商业伙伴管理'
                            }
                        ]
                    }
                ]
            }
        },
        mounted() {
        },
        methods: {

            //  匹配当前index 切换不同active
            handleOpen(key, keyPath) {
                this.nowactive = key;
            },
            handleClose(key, keyPath) {

            }
        }
    }
</script>
<style lang="less">
    .menu {
        width: 250px;
        height: 100%;
        position: fixed;
        top: 50px;
        left: 0;
        background: #1e1e1e;
        z-index: 1;
        .highlight {
            color: #fff;
        }
        .menugold {
            img {
                vertical-align: text-bottom;
            }
        }
        .tac {
            .el-col-12 {
                width: 100%;
            }
        }

        .el-menu {
            overflow: hidden;
            border-right: 0;
        }

        .el-menu-item-group {
            ul {

            }
        }
    }
</style>
