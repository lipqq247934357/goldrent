<template>
<div class="businfosss">
    <componentitle :message="message='基本信息'" />
    <div class="subtabs">
        <el-tabs type="border-card">
            <el-tab-pane label="承租人1">
                <assetsinfo />
            </el-tab-pane>
            <el-tab-pane label="承租人2">
                承租人2
                <assetsinfo />
            </el-tab-pane>
            <el-tab-pane label="承租人3">
                承租人3
                <assetsinfo />
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import ulinfolist from './ulinfolist.vue'; // 基本信息 暂时废弃不引用移到assetsinfo组件
import assetsinfo from './assetsinfo.vue'; //资产信息
export default {
    data() {
        return {
            message: '',
            tableData: []
        }
    },
    components: {
        componentitle,
        ulinfolist,
        assetsinfo
    }
}
</script>
<style lang="less">
.businfosss {
    background: #fff;
    width: 100%;
    .subtabs {
        margin: 15px 0;
        .el-tabs__nav {
            border-top: 1px solid #DCDFE6;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
            border-top: 1px solid #DCDFE6;
        }
        .el-tabs__item {
            &:last-child {
                border-right: 1px solid #DCDFE6;
            }
        }
        .el-tabs--border-card {
            border-top: 0;

        }
    }
}
</style>
