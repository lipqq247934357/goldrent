<template>
<div class="loanapproval">
    <div class="content">
        <h3 class="titleh3">
            <span class="urlTextt">贷款审批</span>
            <i class="el-icon-arrow-right"></i>
            <router-link to="/layout/loadapproval" class="urlTextt">
                贷款审批列表
                <i class="el-icon-arrow-right"></i>
            </router-link>
            <span>&nbsp;{{bindText}}</span>
        </h3>
        <el-tabs type="border-card"
            v-model="bindText"
            @tab-click="handleClicktas">
            <el-tab-pane :lazy="true" :label="list.lease" :name="list.lease">
                <wantfactor />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.rentpeople" :name="list.rentpeople">
                <lesseeinfo />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.guarantor" :name="list.guarantor">
                <guarantor />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.repurchase" :name="list.repurchase">
                <buybackpeople />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.leasegoods" :name="list.leasegoods">
                <leasehold />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.externalnews" :name="list.externalnews">
                <externalinfo />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.investigation" :name="list.investigation">
                <investigation />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.loan" :name="list.loan">
                <operation />
            </el-tab-pane>
        </el-tabs>
    </div>

</div>
</template>

<script  type="text/ecmascript-6">
import wantfactor from './item/wantfactor.vue'; //租赁要素
import lesseeinfo from './item/lesseeinfo.vue'; //承租人信息
import guarantor from './item/guarantor.vue'; //保证人信息
import buybackpeople from './item/buybackpeople.vue'; //回购人信息
import leasehold from './item/leasehold.vue'; //租赁物信息
import externalinfo from './item/externalinfo.vue'; //外部信息
import investigation from './item/investigation.vue'; //调查环节
import operation from './item/operation.vue'; //贷款审批操作
export default {
    data() {
        return {
            list: {
                lease: '租赁要素',
                rentpeople: '承租人信息',
                guarantor: '保证人信息',
                repurchase: '回购人信息',
                leasegoods: '租赁物信息',
                externalnews: '外部信息',
                investigation: '调查环节综素',
                loan: '贷款审批操作',
            },
            bindText: '租赁要素'

        }
    },
    methods: {
        handleClicktas() {

        }
    },
    components: {
        wantfactor, //租赁要素
        lesseeinfo, //承租人信息
        guarantor, //保证人信息
        buybackpeople, //回购人信息
        leasehold, //租赁物信息
        externalinfo, //外部信息
        investigation, //调查环节
        operation //贷款审批操作
    }
}
</script>
<style lang="less">
.content {
    width: 96%;
    margin: 0 auto;
    .titleh3 {
        font-size: 14px;
        margin: 15px 0;
    }
    .el-tabs--border-card>.el-tabs__content {
        padding: 0;
    }
    .urlTextt {
        color: #333;
        text-decoration: none;
    }
    .el-icon-arrow-right {
        color: #333;
    }
    .el-tabs--border-card>.el-tabs__header {
        border-bottom: 2px solid #ff8f2b;
        padding-bottom: 1px;
    }
    .el-tabs--border-card {
        border: 0;
        box-shadow: 0 0 0 0;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item {
        border-top: 1px solid #e5e5e5;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        margin-left: 2px !important;
        margin-top: 0;
        &:first-child {
            margin-left: 0 !important;
        }
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        background: #ff8f2b !important;
        color: #fff;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        background: #ff8f2b !important;
        color: #fff;
    }
    .el-tabs--border-card>.el-tabs__header {
        background: #fff;
    }
}

</style>
