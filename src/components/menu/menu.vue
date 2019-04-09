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
                    <el-menu-item-group>
                        <template slot="title">业务信息</template>
                        <el-menu-item index="/login">业务信息列表页</el-menu-item>
                        <el-menu-item index="1-222">业务信息查看</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>贷款审批管理</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">贷款审批</template>
                        <el-menu-item index="/loadapproval">贷款审批</el-menu-item>
                    </el-menu-item-group>
                    <!-- <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3123">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1421">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>放款审批</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-111">放款审批处理页</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>还款管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-112">代扣核销-列表</el-menu-item>
                        <el-menu-item index="1-113">代扣清单-下载</el-menu-item>
                        <el-menu-item index="1-114">主动核销</el-menu-item>
                        <el-menu-item index="1-115">核销管理处理页</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>业务管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-116">商业伙伴管理</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</div>
</template>

<script  type="text/ecmascript-6">
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
    height: 100vh;
    background: #545c64;
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
            // margin-left: 20px;

        }
    }
}
</style>
