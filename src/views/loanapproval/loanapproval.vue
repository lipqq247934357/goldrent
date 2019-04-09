<template>
<div class="loanapproval">
    <h3>贷款审批</h3>
    <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label">
                <i class="el-icon-date"></i> {{list.lease}}
            </span>
            {{list.lease}}
            </el-tab-pane>
        <el-tab-pane :label="list.rentpeople">{{list.rentpeople}}</el-tab-pane>
        <el-tab-pane :label="list.guarantor">{{list.guarantor}}111</el-tab-pane>
        <el-tab-pane :label="list.repurchase">{{list.repurchase}}</el-tab-pane>
        <el-tab-pane :label="list.leasegoods">{{list.leasegoods}}</el-tab-pane>
        <el-tab-pane :label="list.externalnews">{{list.externalnews}}</el-tab-pane>
        <el-tab-pane :label="list.investigation">{{list.investigation}}</el-tab-pane>
        <el-tab-pane :label="list.loan">{{list.loan}}</el-tab-pane>
    </el-tabs>
</div>
</template>

<script  type="text/ecmascript-6">
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
    }
}
</script>
<style lang="less">

</style>
