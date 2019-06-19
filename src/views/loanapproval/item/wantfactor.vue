<template>
    <div class="businfosss">
        <componentitle :message="message='租赁要素'" class="componentitle"/>
        <ul class="factorlist">
            <li>
                <span>业务编号</span>
                <span>{{wantfactor.bussNo}}</span>
            </li>
            <li>
                <span>租赁模式</span>
                <span v-for="leaseMode in statuslist.leaseMode" v-if="wantfactor.leaseMode == leaseMode.optionCode">
                <!-- <select class="" name="" disabled>
                    <option value="" v-for="leaseMode in statuslist.leaseMode" :selected="wantfactor.leaseMode == leaseMode.optionCode ? true : false">
                        {{leaseMode.optionName}}
                    </option>
                </select> -->
                {{leaseMode.optionName}}
            </span>
            </li>
            <li>
                <span>租赁物名称及规格型号</span>
                <span>{{wantfactor.leaseName}}</span>
            </li>
            <li>
                <span>购置价格（元）</span>
                <span>{{wantfactor.purchaseAmt}}</span>
            </li>
            <li>
                <span>首付款金额（元）</span>
                <span>{{wantfactor.firstPayAmt}}</span>
            </li>
            <li>
                <span>融资金额（元）</span>
                <span>{{wantfactor.financeAmt}}</span>
            </li>
            <li>
                <span>厂商返利（元）</span>
                <span>{{wantfactor.rebateAmt}}</span>
            </li>
            <li>
                <span>厂商贴息（元）</span>
                <span>{{wantfactor.rebateFirmAmt}}</span>
            </li>
            <li>
                <span>承租人风险金（元）</span>
                <span>{{wantfactor.lesseeRiskAmt}}</span>
            </li>
            <li>
                <span>厂商贴息时间</span>
                <span>{{rebateDate[wantfactor.firmRebateIntrestDate]}}</span>
            </li>
            <li>
                <span>其他支出(元)</span>
                <span>{{wantfactor.otherExpense}}</span>
            </li>
            <li>
                <span>其他支出时间</span>
                <span>{{rebateDate[wantfactor.otherExpenseDate]}}</span>
            </li>
            <li>
                <span>其他风险金（元）</span>
                <span>{{wantfactor.otherRiskAmt}}</span>
            </li>
            <li>
                <span>补贴金额（元）</span>
                <span>{{wantfactor.allowanceAmt}}</span>
            </li>
            <li>
                <span>预计补贴时间</span>
                <span>{{wantfactor.allowanceDate}}</span>
            </li>
            <li>
                <span>计划起租日</span>
                <span>{{wantfactor.startDate}}</span>
            </li>
            <li>
                <span>计划终止日</span>
                <span>{{wantfactor.endDate}}</span>
            </li>
            <li>
                <span>租赁期限（月）</span>
                <span>{{wantfactor.leaseTerm}}</span>
            </li>
            <li>
                <span>租赁利率（固定利率/月）%</span>
                <span>{{wantfactor.leaseRate}}</span>
            </li>
            <li>
                <span>租金支付方式</span>
                <span v-for="payWay in statuslist.payWay" v-if="wantfactor.payWay == payWay.optionCode">
                <!-- <select class="" name="" disabled>
                    <option value="" v-for="payWay in statuslist.payWay" :selected="wantfactor.payWay == payWay.optionCode ? true : false">
                        {{payWay.optionName}}
                    </option>
                </select> -->
                {{payWay.optionName}}
            </span>
                <span v-if="wantfactor.payWay ==''"></span>
            </li>
            <li>
                <span>还款频次</span>
                <span>{{wantfactor.repayRate == "M" ? '月': '季'}}</span>
            </li>
            <li>
                <span>计息方式</span>
                <!-- <span>{{wantfactor.calcType}}</span> -->
                <span>按日计息</span>
            </li>
            <li>
                <span>留购价款（元）</span>
                <span>{{wantfactor.depositAmt}}</span>
            </li>
            <li>
                <span>提前结清（%）</span>
                <span>{{wantfactor.settleAhead}}</span>
            </li>
            <li>
                <span>内部收益率(%)</span>
                <span>{{wantfactor.earningRate}}</span>
            </li>
        </ul>
        <componentitle :message="message='租金计划表'"/>
        <div class="tables">
            <template>
                <table class="renttable">
                    <tr>
                        <td class="tabletable">租金期数</td>
                        <td class="tabletable">租赁本金（元）</td>
                        <td class="tabletable">租赁利率（固定利率)（%）</td>
                        <td class="tabletable">租赁利息（元）</td>
                        <td class="tabletable">租金总额（元）</td>
                        <td class="tabletable">支付日期</td>
                    </tr>
                    <tr v-for="item in tableData" v-if="item.costType == 'rent'">
                        <td>{{item.period}}</td>
                        <td>{{item.principal}}</td>
                        <td>{{item.moneyRate}}</td>
                        <td>{{item.interest}}</td>
                        <td>{{item.dueAmout}}</td>
                        <td>{{item.dueDate}}</td>
                    </tr>
                </table>
            </template>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
                },
                rebateDate: {
                    before45: '起租前',
                    after45: '起租后45天'
                }
            }
        },
        created() {
            //字典编码
            this.$post('/getConstantConfig', {
                dictionaryCode: ['payWay', 'leaseMode']
            }).then(res => {
                this.statuslist.payWay = res.data.data.payWay;
                this.statuslist.leaseMode = res.data.data.leaseMode;
            })
            // 请求租赁要素
            this.$post('/leaseinfo/queryElement', {
                bussNo: this.$route.query.bussNo
            }).then(res => {
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
                if (res.data.code == '2000000') {
                    console.log(res.data.data);
                    this.wantfactor = res.data.data;
                }
            });
            // 租金计划表
            this.$post('/leaseinfo/querySchedule', {
                bussNo: this.$route.query.bussNo
            }).then(res => {
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
                //     ]
                // }
                if (res.data.code == '2000000') {
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
            width: 99.7%;
            border: 1px solid #afafaf;
            margin: 0 auto 20px;
            border-top: 0;

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
                    background: #fbfbfb;
                }

                &:last-child {
                    border: 0;
                }
            }
        }

        .tables {
            font-size: 14px;

            .renttable {
                text-align: center;
                width: 100%;
                border-top: 0;
                border: 1px solid #afafaf;
                border-top: 0;

                .tabletable {
                    border-top: 0;
                    font-size: 14px;
                    color: #333;
                    font-weight: bold;
                }

                tr {
                    height: 50px;

                    td {
                        color: #909399;
                        border: 1px solid #afafaf;
                    }
                }
            }

        }

        .componentitle {
            margin-top: 18px;
        }
    }
</style>
