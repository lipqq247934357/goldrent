<template>
<div class="businfosss">
    <componentitle :message="message='租赁要素'" />
    <ul class="factorlist">
        <li>
            <span>业务编号</span>
            <span>{{wantfactor.bussNo && wantfactor.bussNo}}</span>
        </li>
        <li>
            <span>租赁模式</span>
            <span>{{wantfactor.leaseMode && wantfactor.leaseMode}}</span>
        </li>
        <li>
            <span>租赁物名称</span>
            <span>{{wantfactor.leaseName && wantfactor.leaseName}}</span>
        </li>
        <li>
            <span>租赁物金额</span>
            <span>{{wantfactor.purchaseAmt && wantfactor.purchaseAmt}}</span>
        </li>
        <li>
            <span>首付款金额</span>
            <span>{{wantfactor.firstPayAmt && wantfactor.firstPayAmt}}</span>
        </li>
        <li>
            <span>租金金额</span>
            <span>{{wantfactor.leaseAmount && wantfactor.leaseAmount}}</span>
        </li>
        <li>
            <span>补贴金额</span>
            <span>{{wantfactor.allowanceAmt && wantfactor.allowanceAmt}}</span>
        </li>
        <li>
            <span>补贴时间</span>
            <span>{{wantfactor.allowanceDate && wantfactor.allowanceDate}}</span>
        </li>
        <li>
            <span>租赁期限</span>
            <span>{{wantfactor.leaseTerm && wantfactor.leaseTerm}}</span>
        </li>
        <li>
            <span>合同利率</span>
            <span>{{wantfactor.leaseRate && wantfactor.leaseRate}}</span>
        </li>
        <li>
            <span>厂商返利金额</span>
            <span>{{wantfactor.rebateAmt && wantfactor.rebateAmt}}</span>
        </li>
        <li>
            <span>风险金</span>
            <span>{{wantfactor.riskAmt && wantfactor.riskAmt}}</span>
        </li>
        <li>
            <span>内部收益率</span>
            <span>{{wantfactor.earningRate && wantfactor.earningRate}}</span>
        </li>
        <li>
            <span>租金支付方式</span>
            <span>{{wantfactor.payWay && wantfactor.payWay}}</span>
        </li>
        <li>
            <span>使用地点</span>
            <span>{{wantfactor.placeUse && wantfactor.placeUse}}</span>
        </li>
        <li>
            <span>起租日</span>
            <span>{{wantfactor.startDate && wantfactor.startDate}}</span>
        </li>
        <li>
            <span>止租日</span>
            <span>{{wantfactor.endDate && wantfactor.endDate}}</span>
        </li>
        <li>
            <span>留购价款</span>
            <span>{{wantfactor.depositAmt && wantfactor.depositAmt}}</span>
        </li>
        <li>
            <span>提前结清手续费</span>
            <span>{{wantfactor.settleAhead && wantfactor.settleAhead}}</span>
        </li>
    </ul>
    <componentitle :message="message='租金计划表'" />
    <div class="tables">
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="period"
                    label="租金期数">
                </el-table-column>
                <el-table-column
                    prop="dueAmout"
                    label="租金总额">
                </el-table-column>
                <el-table-column
                    prop="dueDate"
                    label="支付日期">
                </el-table-column>
                <el-table-column
                    prop="principal"
                    label="租赁本金">
                </el-table-column>
                <el-table-column
                    prop="moneyRate"
                    label="租赁利息">
                </el-table-column>
            </el-table>
        </template>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            tableData: [],
            wantfactor: {}
        }
    },
    created() {
        // 请求租赁要素结构
        this.$post('/leaseinfo/queryElement',{
            bussNo: this.$route.query.bussNo
            // bussNo: 'CON_ZZ02_0000_201904_0043'
        }).then( res => {
            if(res.data.code == '2000000') {
                this.wantfactor = res.data.data;
                // console.log(res,':::::::::::');
            }
        });
        // 租金计划表
        this.$post('/leaseinfo/querySchedule', {
            bussNo: this.$route.query.bussNo
            // bussNo: 'CON_ZZ02_0000_201904_0043'
        }).then( res => {
            if(res.data.code == '2000000') {
                // this.tableData = res.data.data;
                // console.log(res,'<<<<<<<<<<');
            }
        });
    },
    components: {
        componentitle
    }
}
</script>
<style lang="less">
.businfosss {
    background: #fff;
    width: 100%;
    .factorlist {
        width: 95%;
        border: 1px solid #EBEEF5;
        margin: 20px auto;
        li {
            border-bottom: 1px solid #EBEEF5;
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: #909399;
            font-size: 14px;
            span {
                display: inline-block;
                &:first-child {
                    width: 30%;
                    border-right: 1px solid #EBEEF5;
                }
                &:last-child {
                    width: 69.9%;
                }
            }
            &:nth-child(even) {
                background: #f5f7fa;
            }
            &:last-child {
                border: 0;
            }
        }
    }
    .tables {
        .cell {
            text-align: center;
        }
    }
}
</style>
