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
                        :index="String(index)"
                        v-if="item.authResource != null"
                        class="menugold">
                        <template slot="title">
                            <i>
                                <img v-if="item.img != ''" :src="nowactive == index ? require(`.${item.highlightImg}`) : require(`.${item.defaultImg}`)" alt="icon加载失败">
                                <!-- <img :src="require('.' + item.defaultImg)" alt=""> -->
                            </i>
                            <span :class="nowactive == index ? 'highlight' : ''">&nbsp;{{item.resourceName}}</span>
                        </template>
                        <el-menu-item
                            v-if="item.authResource != null"
                            v-for="(suburl,index) in item.authResource"
                            @click="linkMenu(suburl,index)"
                            :index="`${suburl.resourceUrl}`">
                            {{suburl.resourceName}}
                        </el-menu-item>
                        <!-- <el-menu-item>
                            {{item.authResource}}
                        </el-menu-item> -->
                    </el-submenu>
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
                deal: '', //处理按钮权限
                info: '', // 详情按钮权限
                nowactive: null, // 当前激活的字体颜色
                approval: require('./arropvala.png'),
                loan: require('./loana.png'),
                business: require('./admina.png'),
                menulist: [
                    // {
                    //     title: '业务信息',
                    //     img: require('./bussinfoa.png'),
                    //     heightlight: require('./bussinfol.png'),
                    //     url: [
                    //         {
                    //             path: '/layout/businfo',
                    //             name: '业务信息列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: '贷款审批管理',
                    //     img: require('./arropvala.png'),
                    //     heightlight: require('./approvall.png'),
                    //     url: [
                    //         {
                    //             path: '/layout/loadapproval',
                    //             name: '贷款审批'
                    //         },
                    //         {
                    //             path: '/layout/upper',
                    //             name: '上会审议'
                    //         },
                    //         {
                    //             path: '/layout/director',
                    //             name: '主任审批'
                    //         },
                    //         {
                    //             path: '/layout/senior',
                    //             name: '资深审批'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: '放款管理',
                    //     img: require('./loana.png'),
                    //     heightlight: require('./loanl.png'),
                    //     url: [
                    //         {
                    //             path: '/layout/loanmoney',
                    //             name: '放款审批'
                    //         },
                    //         {
                    //             path: '/layout/download',
                    //             name: '下载放款审批'
                    //         },
                    //         {
                    //             path: '/layout/loanmoneyconfirm',
                    //             name: '放款确认列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: '业务管理',
                    //     img: require('./admina.png'),
                    //     heightlight: require('./adminl.png'),
                    //     url: [
                    //         {
                    //             path: '/layout/businessM',
                    //             name: '商业伙伴管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: 'banner图管理',
                    //     img: '',
                    //     heightlight: '',
                    //     url: [
                    //         {
                    //             path: '/banner',
                    //             name: 'banner图管理'
                    //         }
                    //     ]
                    // },
                    // {
                    //     title: 'APP版本管理',
                    //     img: '',
                    //     heightlight: '',
                    //     url: [
                    //         {
                    //             path: '/appversion',
                    //             name: 'APP版本管理'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        created() {
            this.$post('/user/get/resource').then(res => {
                this.menulist = res.data.data;
            });
        },
        mounted() {
        },
        methods: {
            linkMenu(item, index) {
                // this.$get(`/user/get/sonresource?id=${item.id}`).then(res => {
                //     this.deal = res.data.data.deal;
                //     this.info = res.data.data.info;
                // });
            },
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
