<template>
<div class="loanapproval">
    <div class="content">
        <h3>贷款审批</h3>
        <el-tabs type="border-card">
            <el-tab-pane :lazy="true">
                <span slot="label">
                    {{list.lease}}
                </span>
                <wantfactor />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.rentpeople">
                <lesseeinfo />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.guarantor">
                <guarantor />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.repurchase">
                <buybackpeople />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.leasegoods">
                <leasehold />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.externalnews">
                <externalinfo />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.investigation">
                <investigation />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.loan">
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
                loan: '贷款审批操作'
            }
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
    width: 95%;
    margin: 0 auto;
    h3 {
        font-size: 14px;
        margin: 15px 0;
    }
    .el-tabs--border-card>.el-tabs__content {
        padding: 0;
    }
}
</style>
