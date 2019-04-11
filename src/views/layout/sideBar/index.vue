<template>
    <div class="menu">
        <el-row class="tac">
            <el-col :span="12">
                <el-menu
                        class="el-menu-vertical-demo"
                        :default-openeds="opends"
                        :unique-opened="opendsone"
                        :default-active="$route.path"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>业务信息</span>
                        </template>
                        <el-menu-item index="/layout/businfo">业务信息列表页</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>贷款审批管理</span>
                        </template>
                        <el-menu-item index="/layout/loadapproval">贷款审批</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>业务管理</span>
                        </template>
                        <el-menu-item index="/layout/businessM">商业伙伴管理</el-menu-item>
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
                opends: ['1'],
                opendsone: true,
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
<style lang="less">
    .menu {
        width: 200px;
        height: 100%;
        position: fixed;
        top: 50px;
        left: 0;
        background: #545c64;
        z-index: 1;

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
