<template>
<div class="businfosss">
    <componentitle :message="message='租赁要素'" class="componentitle"/>
    <ul class="factorlist">
        <li>
            <span>业务编号</span>
            <span>{{wantfactor.bussNo && wantfactor.bussNo}}</span>
        </li>
        <li>
            <span>租赁模式</span>
            <span>
                <select class="" name="" disabled>
                    <option value="" v-for="leaseMode in statuslist.leaseMode" :selected="wantfactor.leaseMode == leaseMode.optionCode ? true : false">
                        {{leaseMode.optionName}}
                    </option>
                </select>
            </span>
        </li>
        <li>
            <span>租赁物名称</span>
            <span>{{wantfactor.leaseName && wantfactor.leaseName}}</span>
        </li>
        <li>
            <span>租赁物金额（元）</span>
            <span>{{wantfactor.purchaseAmt && wantfactor.purchaseAmt}}</span>
        </li>
        <li>
            <span>首付款金额（元）</span>
            <span>{{wantfactor.firstPayAmt && wantfactor.firstPayAmt}}</span>
        </li>
        <li>
            <span>租金金额（元）</span>
            <span>{{wantfactor.leaseAmount && wantfactor.leaseAmount}}</span>
        </li>
        <li>
            <span>预计补贴金额（元）</span>
            <span>{{wantfactor.allowanceAmt && wantfactor.allowanceAmt}}</span>
        </li>
        <li>
            <span>预计补贴时间（元）</span>
            <span>{{wantfactor.allowanceAmt && wantfactor.allowanceAmt}}</span>
        </li>
        <li>
            <span>补贴金额（元）</span>
            <span>{{wantfactor.allowanceAmt && wantfactor.allowanceAmt}}</span>
        </li>
        <li>
            <span>补贴时间</span>
            <span>{{wantfactor.allowanceDate && wantfactor.allowanceDate}}</span>
        </li>
        <li>
            <span>租赁期限（天）</span>
            <span>{{wantfactor.leaseTerm && wantfactor.leaseTerm}}</span>
        </li>
        <li>
            <span>合同利率（%）</span>
            <span>{{wantfactor.leaseRate && wantfactor.leaseRate}}</span>
        </li>
        <li>
            <span>厂商返利金额（元）</span>
            <span>{{wantfactor.rebateAmt && wantfactor.rebateAmt}}</span>
        </li>
        <li>
            <span>厂商贴息</span>
            <span>{{wantfactor.rebateAmt && wantfactor.rebateAmt}}</span>
        </li>
        <li>
            <span>风险金（元）</span>
            <span>{{wantfactor.riskAmt && wantfactor.riskAmt}}</span>
        </li>
        <li>
            <span>内部收益率（%）</span>
            <span>{{wantfactor.earningRate && wantfactor.earningRate}}</span>
        </li>
        <li>
            <span>租金支付方式</span>
                <span>
                    <select class="" name="" disabled>
                        <option value="" v-for="payWay in statuslist.payWay" :selected="wantfactor.payWay == payWay.optionCode ? true : false">
                            {{payWay.optionName}}
                        </option>
                    </select>
                </span>
            </span>
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
            <span>还款频次</span>
            <span>{{wantfactor.endDate && wantfactor.endDate}}</span>
        </li>
        <li>
            <span>留购价款（元）</span>
            <span>{{wantfactor.depositAmt && wantfactor.depositAmt}}</span>
        </li>
        <li>
            <span>提前结清手续费（%）</span>
            <span>{{wantfactor.settleAhead && wantfactor.settleAhead}}</span>
        </li>
    </ul>
    <componentitle :message="message='租金计划表'" />
    <div class="tables">
        <template>
            <el-table
                :data="tableData"
                border
                :header-cell-style="{
                    'color': '#212121',
                    'font-size': '14px',
                    'font-weight': 'bold'
                }"
                style="width: 100%">
                <el-table-column
                    prop="period"
                    label="租金期数">
                </el-table-column>
                <el-table-column
                    prop="dueAmout"
                    label="租金总额(元)">
                </el-table-column>
                <el-table-column
                    prop="dueDate"
                    label="支付日期">
                </el-table-column>
                <el-table-column
                    prop="principal"
                    label="租赁本金(元)">
                </el-table-column>
                <el-table-column
                    prop="moneyRate"
                    label="租赁利息(%)">
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
            tableData: [], // 租金计划表
            wantfactor: {}, // 租赁要素
            statuslist: { // 字典编码
                payWay: [],
                leaseMode: []
            }
        }
    },
    created() {
        //字典编码
        this.$post('/getConstantConfig',{
            dictionaryCode: ['payWay','leaseMode']
        }).then(res => {
            this.statuslist.payWay = res.data.data.payWay;
            this.statuslist.leaseMode = res.data.data.leaseMode;
        })
        // 请求租赁要素
        this.$post('/leaseinfo/queryElement',{
            bussNo: this.$route.query.bussNo
        }).then( res => {
            // 返回示例
            // {
            //     "msg": "success",
            //     "code": "2000000",
            //     "data": {
            //         "leaseTerm": 12,
            //         "allowanceAmt": 88,
            //         "endDate": "2019-10-01",
            //         "leaseName": "租赁物名称01",
            //         "financeAmt": 1000,
            //         "payWay": "01",
            //         "settleAhead": 0,
            //         "depositAmt": 100,
            //         "leaseInfoId": "f41f9ff7831648d2a37f78671898f7f7",
            //         "rebateAmt": 500,
            //         "firstPayAmt": 30000,
            //         "bussNo": "buss_no201904110002",
            //         "purchaseAmt": 2000,
            //         "id": "e83ef3935c314b89b5a3bc13b3fa26a8",
            //         "otherRiskAmt": 300,
            //         "leaseMode": "02",
            //         "startDate": "2019-04-12",
            //         "lesseeRiskAmt": 600,
            //         "allowanceDate": "2019-04-30",
            //         "leaseRate": "0.023000"
            //     }
            // }
            if(res.data.code == '2000000') {
                this.wantfactor = res.data.data;
            }
        });
        // 租金计划表
        this.$post('/leaseinfo/querySchedule', {
            bussNo: this.$route.query.bussNo
        }).then( res => {
            // 返回示例
            // {
            //     "msg": "success",
            //     "code": "2000000",
            //     "data": [
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10550984.8,
            //             "period": 1,
            //             "interest": 550984.8,
            //             "dueDate": "2019-05-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10412030.3,
            //             "period": 2,
            //             "interest": 412030.3,
            //             "dueDate": "2019-06-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10362490,
            //             "period": 3,
            //             "interest": 362490,
            //             "dueDate": "2019-07-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10337115.7,
            //             "period": 4,
            //             "interest": 337115.7,
            //             "dueDate": "2019-08-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10299658.4,
            //             "period": 5,
            //             "interest": 299658.4,
            //             "dueDate": "2019-09-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10253743,
            //             "period": 6,
            //             "interest": 253743,
            //             "dueDate": "2019-10-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10224743.8,
            //             "period": 7,
            //             "interest": 224743.8,
            //             "dueDate": "2019-11-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10181245,
            //             "period": 8,
            //             "interest": 181245,
            //             "dueDate": "2019-12-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10149829.2,
            //             "period": 9,
            //             "interest": 149829.2,
            //             "dueDate": "2020-01-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10112371.9,
            //             "period": 10,
            //             "interest": 112371.9,
            //             "dueDate": "2020-02-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10070081.4,
            //             "period": 11,
            //             "interest": 70081.4,
            //             "dueDate": "2020-03-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 10000000,
            //             "dueAmout": 10037457.3,
            //             "period": 12,
            //             "interest": 37457.3,
            //             "dueDate": "2020-04-20",
            //             "moneyRate": 0.0435
            //         },
            //         {
            //             "principal": 0,
            //             "dueAmout": 100,
            //             "period": 12,
            //             "interest": 0,
            //             "dueDate": "2020-04-20",
            //             "moneyRate": 0.0435
            //         }
            //     ]
            // }
            if(res.data.code == '2000000') {
                this.tableData = res.data.data;
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
        width: 99.8%;
        border: 1px solid #afafaf;
        margin: 0 auto 20px;
        li {
            border-bottom: 1px solid #afafaf;
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: #909399;
            font-size: 14px;
            span {
                display: inline-block;
                &:first-child {
                    width: 30%;
                    border-right: 1px solid #afafaf;
                    font-size: 14px;
                    color: #212121;
                    font-weight: bold;
                }
                &:last-child {
                    width: 69%;
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
    .componentitle {
        margin-top: 18px;
    }
}
</style>
