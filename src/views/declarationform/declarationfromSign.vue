<template>
<div class="loanapproval">
    <div class="content">
        <h3 class="titleh3">
            <div class="el-icon-back back" @click="backUrl">
                返回
            </div>
        </h3>
        <el-tabs type="border-card"
            v-model="bindText"
            @tab-click="handleClicktas">
            <el-tab-pane :lazy="true" :label="list.lease" :name="list.lease">
                <wantfactor/>
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.rentpeople" :name="list.rentpeople">
                <lesseeinfo :rulesField="rulesField" />
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
            <el-tab-pane :lazy="true" :label="list.evaluate" :name="list.evaluate">
                <evaluate />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.approvalOpinion" :name="list.approvalOpinion">
                <approvalOpinion />
            </el-tab-pane>
            <el-tab-pane :lazy="true" :label="list.loan" :name="list.loan">
                <clauseTable />
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
import investigation from './item/investigation.vue'; //增信措施及综素
import evaluate from './item/evaluate.vue'; //调查结论及风险评价
import approvalOpinion from './item/approvalOpinion.vue'; //审批意见
import clauseTable from './item/clauseTable.vue'; //商业条款表

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
                investigation: '增信措施及综素',
                evaluate: '调查结论及风险评价',
                approvalOpinion: '审批意见',
                loan: '商业条款表',
            },
            bindText: '租赁要素',
            rulesField: [] // 字典编码
        }
    },
    created() {
        // 字典编码
        this.$post('/getConstantConfig', {
            dictionaryCode: [
                'leaseMode',  //租赁模式选项
                'comNature', //企业性质
                'agencyLevel', //经销商层级
                'feeRequire', // 咨询服务费
                'partnerType', // 伙伴类型
                'bussType', // 业务类型
                'custType', // 客户类别
                'custSex', //性别
                'custEducation', //教育程度
                'custMarriage', //婚姻状况
                'hasChildren',//是否有子女
                'certType', //证件类型
                'custRelation' ,// 与承租人关系
                'payWay', //租金支付方式
                'serialNoType', //识别码类型
                'mortgage' , //是否抵押
                'hasCreditReport', //征信报告有无
                'hasLawsuit', //是否涉诉
                'hasEnforced', //是否被执行
                'haveCertificate',//是否有房产证明
                'houseType', //房产类别
                'checkMode', //土地核实方法
                'isGuarantee', //有无担保
                'repayRate', //还款频率
                'payType', //还租方式
                'serialNumberType', //识别号类型
                'InsurancePurchaseTime', //保险购买时间
                'contractType', //合同类型
                'costType', //费用类型
                'identityType' ,//身份类型
                'creditAdditionType', //增信类型
                'receiptType' ,// 收款类型
                'fileSuffix', // 合同文件后缀
                'calcType', //计息方式
                'marriageSettlement', //有无离婚协议
                'rebateDate', //返利时间

            ]
        }).then(res => {
            if(res.data.code == 2000000) {
                this.rulesField = res.data.data;
            }
        })
    },
    methods: {
        handleClicktas(val) {
            console.log(this.$store.state.lesseeinfoArr);
        },
        backUrl() {
            this.$router.push({
                path: '/layout/declarationfrom',

            });
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
        evaluate,  //调查结论及风险评价
        approvalOpinion,  //审批意见
        clauseTable //商业条款表
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
    .back {
        cursor: pointer;
        font-size: 15px;
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
