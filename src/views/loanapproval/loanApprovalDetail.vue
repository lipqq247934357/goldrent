<template>
    <div class="loanapproval">
        <div class="content have-tabs-container">
            <h3 class="titleh3">
            </h3>
            <el-tabs @tab-click="handleClicktas"
                     type="border-card"
                     v-model="bindText">
                <el-tab-pane :label="list.lease" :lazy="true" :name="list.lease">
                    <wantfactor/>
                </el-tab-pane>
                <el-tab-pane :label="list.rentpeople" :lazy="true" :name="list.rentpeople">
                    <lesseeinfo/>
                </el-tab-pane>
                <el-tab-pane :label="list.guarantor" :lazy="true" :name="list.guarantor">
                    <guarantor/>
                </el-tab-pane>
                <el-tab-pane :label="list.repurchase" :lazy="true" :name="list.repurchase">
                    <buybackpeople/>
                </el-tab-pane>
                <el-tab-pane :label="list.leasegoods" :lazy="true" :name="list.leasegoods">
                    <leasehold/>
                </el-tab-pane>
                <el-tab-pane :label="list.externalnews" :lazy="true" :name="list.externalnews">
                    <externalinfo/>
                </el-tab-pane>
                <el-tab-pane :label="list.investigation" :lazy="true" :name="list.investigation">
                    <investigation/>
                </el-tab-pane>
                <el-tab-pane :label="list.riskAssess" :lazy="true" :name="list.riskAssess">
                    <riskAssess/>
                </el-tab-pane>
                <el-tab-pane :label="list.loan" :lazy="true" :name="list.loan" v-if="tabType == '70'">
                    <supplement/>
                </el-tab-pane>
                <el-tab-pane :label="list.loan" :lazy="true" :name="list.loan" v-else>
                    <operation/>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import wantfactor from './item/wantfactor.vue'; //租赁要素
    import lesseeinfo from './item/lesseeinfo.vue'; //承租人信息
    import guarantor from './item/guarantor.vue'; //保证人信息
    import buybackpeople from './item/buybackpeople.vue'; //回购人信息
    import leasehold from './item/leasehold.vue'; //租赁物信息
    import externalinfo from './item/externalinfo.vue'; //外部信息
    import investigation from './item/investigation.vue'; //增信措施及综述
    import riskAssess from './item/riskAssess.vue'; //调查结论及风险评价
    import operation from './item/operation.vue'; //贷款审批操作
    import supplement from './item/supplement.vue'; //贷款审批操作
    export default {
        components: {
            wantfactor, //租赁要素
            lesseeinfo, //承租人信息
            guarantor, //保证人信息
            buybackpeople, //回购人信息
            leasehold, //租赁物信息
            externalinfo, //外部信息
            investigation, //增信措施及综述
            riskAssess, // 调查结论及风险评价
            operation, //贷款审批操作
            supplement // 补充资料
        },
        data() {
            return {
                list: {
                    lease: '租赁要素',
                    rentpeople: '承租人信息',
                    guarantor: '保证人信息',
                    repurchase: '回购人信息',
                    leasegoods: '租赁物情况',
                    externalnews: '外部信息',
                    investigation: '增信措施及综述',
                    riskAssess: '调查结论及风险评价',
                    loan: '贷款审批操作',
                },
                bindText: '',
                nowurl: '',
                nowurlName: '',
                loanmoneyOperation: '', // 储存放款审批操作
                inputdisabled: false,
                tabType: '',
            }
        },
        created() {
            this.tabType = this.$route.query.taskType;
            if(this.tabType == '40' || !this.tabType) {
                this.list.loan = '贷款审批操作';
            } else {
                this.list.loan = '补充资料';
            }
            // this.list.loan = this.tabType == '40' ? this.$route.query.loanmoneyOperation || '贷款审批操作' : '补充资料'; // 放款审批操作
            this.showText();
            this.nowurl = this.$route.query.nowpath + '?idJurisdiction=' + this.$route.query.idJurisdiction; // 当前路由
            this.nowurlName = this.$route.query.nowurlName; // 当前路由名字
        },
        methods: {
            handleClicktas(val) {

            },
            showText() {
                this.arrangement = this.$route.query.arrangement;
                if (this.$route.query.disabled == 1) {
                    this.inputdisabled = true;
                } else {
                    this.inputdisabled = false;
                }
                this.bindText = this.inputdisabled ? '租赁要素' : this.list.loan;
            }
        },

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

        .el-tabs--border-card > .el-tabs__content {
            padding: 0;
        }

        .urlTextt {
            color: #333;
            text-decoration: none;
        }

        /*.el-icon-arrow-right {*/
        /*    color: #333;*/
        /*}*/

        .el-tabs--border-card > .el-tabs__header {
            border-bottom: 2px solid #ff8f2b;
            padding-bottom: 1px;
        }

        .el-tabs--border-card {
            border: 0;
            box-shadow: 0 0 0 0;
        }

        .el-tabs--border-card > .el-tabs__header .el-tabs__item {
            border-top: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            margin-left: 2px !important;
            margin-top: 0;

            &:first-child {
                margin-left: 0 !important;
            }
        }

        .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
            background: #ff8f2b !important;
            color: #fff;
        }

        .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
            background: #ff8f2b !important;
            color: #fff;
        }

        .el-tabs--border-card > .el-tabs__header {
            background: #fff;
        }

        .tabsinfo .el-tabs--border-card > .el-tabs__header {
            border-bottom: 0;
        }

        .tabsinfo .subtabs .el-tabs__nav {
            border-top: 0;
            // border-right: #DCDFE6 1px solid;
            margin-left: 10px;
        }

        .tabsinfo .subtabs .el-tabs__nav .is-top {
            border-right: 1px solid #DCDFE6 !important;
        }

        .tabsinfo .subtabs .el-tabs__nav .el-tabs__item {
            border: 0;
            padding: 0;
            height: 16px;
            line-height: 16px;
            padding: 0 10px 0 10px;
            border-left: 0;
            border-top: 0;
            border-right: #DCDFE6 1px solid;
        }

        .tabsinfo .subtabs .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
            border: 0;
            color: #d76500;
            background: #fff !important;
        }

    }

    .have-tabs-container /deep/ .el-tabs__item {
        padding: 0 10px !important;
    }


</style>
