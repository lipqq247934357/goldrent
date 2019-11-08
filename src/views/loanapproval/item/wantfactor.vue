<template>
    <div class="businfosss">
        <componentitle :message="message='租赁要素'" class="componentitle"/>
        <table class="factortable" border="1">
            <tr>
                <td>业务编号</td>
                <td>{{wantfactor.bussNo}}</td>
            </tr>
            <tr>
                <td>租赁模式</td>
                <td v-for="leaseMode in statuslist.leaseMode" v-if="wantfactor.leaseMode == leaseMode.optionCode">
                <!-- <select class="" name="" disabled>
                    <option value="" v-for="leaseMode in statuslist.leaseMode" :selected="wantfactor.leaseMode == leaseMode.optionCode ? true : false">
                        {{leaseMode.optionName}}
                    </option>
                </select> -->
                {{leaseMode.optionName}}

            </td>
        </tr>
            <tr>
                <td>租赁物名称及规格型号</td>
                <td>
                    <el-input
                        style="margin: 5px 0;width: 97%;"
                        type="textarea"
                        :rows="3"
                        class="input-width"
                        maxlength="500"
                        placeholder="字数限制0-500个字"
                        readonly
                        v-model="wantfactor.leaseName">
                    </el-input>
                </td>
            </tr>
            <tr>
                <td>购置价格（元）</td>
                <td>{{wantfactor.purchaseAmt && formatNumber(wantfactor.purchaseAmt)}}</td>
            </tr>
            <tr>
                <td>首付款金额（元）</td>
                <td>{{wantfactor.firstPayAmt && formatNumber(wantfactor.firstPayAmt)}}</td>
            </tr>
            <tr>
                <td>融资金额（元）</td>
                <td>{{wantfactor.financeAmt && formatNumber(wantfactor.financeAmt)}}</td>
            </tr>
            <tr>
                <td>厂商返利（元）</td>
                <td>{{wantfactor.rebateAmt && formatNumber(wantfactor.rebateAmt)}}</td>
            </tr>
            <tr>
                <td>厂商贴息（元）</td>
                <td>{{wantfactor.rebateFirmAmt && formatNumber(wantfactor.rebateFirmAmt)}}</td>
            </tr>
            <tr>
                <td>承租人风险金（元）</td>
                <td>{{wantfactor.lesseeRiskAmt && formatNumber(wantfactor.lesseeRiskAmt)}}</td>
            </tr>
            <tr>
                <td>厂商贴息时间</td>
                <td>{{rebateDate[wantfactor.firmRebateIntrestDate]}}</td>
            </tr>
            <tr>
                <td>其他支出(元)</td>
                <td>{{wantfactor.otherExpense && formatNumber(wantfactor.otherExpense)}}</td>
            </tr>
            <tr>
                <td>其他支出时间</td>
                <td>{{rebateDate[wantfactor.otherExpenseDate]}}</td>
            </tr>
            <tr>
                <td>其他风险金（元）</td>
                <td>{{wantfactor.otherRiskAmt && formatNumber(wantfactor.otherRiskAmt)}}</td>
            </tr>
            <tr>
                <td>补贴金额（元）</td>
                <td>{{wantfactor.allowanceAmt && formatNumber(wantfactor.allowanceAmt)}}</td>
            </tr>
            <tr>
                <td>预计补贴时间</td>
                <td>{{wantfactor.allowanceDate}}</td>
            </tr>
            <tr>
                <td>计划起租日</td>
                <td>{{wantfactor.startDate}}</td>
            </tr>
            <tr>
                <td>计划终止日</td>
                <td>{{wantfactor.endDate}}</td>
            </tr>
            <tr>
                <td>租赁期限（月）</td>
                <td>{{wantfactor.leaseTerm}}</td>
            </tr>
            <tr>
                <td>租赁利率（固定利率/月）%</td>
                <td>{{wantfactor.leaseRate}}</td>
            </tr>
            <tr>
                <td>租金支付方式</td>
                <td v-for="payWay in statuslist.payWay" v-if="wantfactor.payWay == payWay.optionCode">
                <!-- <select class="" name="" disabled>
                    <option value="" v-for="payWay in statuslist.payWay" :selected="wantfactor.payWay == payWay.optionCode ? true : false">
                        {{payWay.optionName}}
                    </option>
                </select> -->
                {{payWay.optionName}}
            </td>
                <td v-if="wantfactor.payWay ==''"></td>
            </tr>
            <tr>
                <td>还款频次</td>
                <td>{{wantfactor.repayRate == "M" ? '月': '季'}}</td>
            </tr>
            <tr>
                <td>计息方式</td>
                <!-- <span>{{wantfactor.calcType}}</span> -->
                <td>按日计息</td>
            </tr>
            <tr>
                <td>留购价款（元）</td>
                <td>{{wantfactor.depositAmt && formatNumber(wantfactor.depositAmt)}}</td>
            </tr>
            <tr>
                <td>提前结清（%）</td>
                <td>{{wantfactor.settleAhead}}</td>
            </tr>
            <tr>
                <td>内部收益率(%)</td>
                <td>{{wantfactor.earningRate}}</td>
            </tr>
        </table>
        <componentitle :message="message='租户收款账户'"/>

        <ul class="infolist">
            <li>
                <span>收款账户类型</span>
                <span v-for="item in statuslist.receiptType" v-show="item.optionCode == rentFactor.receiptType">{{item.optionName}}</span>
            </li>
            <li>
                <span>账户名称</span>
                <span>{{rentFactor.receiptAccountName}}</span>
            </li>
            <li>
                <span>证件号码</span>
                <span>{{rentFactor.certNo}}</span>
            </li>
            <li>
                <span>开户银行</span>
                <span>{{rentFactor.receiptAccountBank}}</span>
            </li>
            <li>
                <span>银行卡号</span>
                <span>{{rentFactor.receiptAccount}}</span>
            </li>
        </ul>

        <componentitle :message="message='金租收款账户'"/>
        <ul class="infolist">
            <li>
                <span>还租方式</span>
                <span v-for="item in payTypeArr"
                      v-show="item.optionCode == rentFactor.payType">{{item.optionName}}</span>
            </li>
            <li>
                <span>账户名称</span>
                <span>{{rentFactor.paymentAccountName}}</span>
            </li>
            <li style="border-bottom: 0;">
                <span>开户银行</span>
                <span>{{rentFactor.paymentAccountBank}}</span>
            </li>
            <li>
                <span>银行卡号</span>
                <span>{{rentFactor.paymentAccount}}</span>
            </li>
        </ul>
        <componentitle :message="message='租金计划表'"/>
        <el-button
            @click="download"
            class="download"
            type="mini">
            导出租金计划表
        </el-button>
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
                        <td class="tabletable" v-if="$route.query.writeOffFlag">是否核销</td>
                    </tr>
                    <tr v-for="item in tableData">
                        <td v-if="item.costType == 'rent'">{{item.period}}</td>
                        <td v-else>{{costType[item.costType]}}</td>
                        <td>{{item.principal && formatNumber(item.principal)}}</td>
                        <td>{{item.moneyRate}}</td>
                        <td>{{item.interest && formatNumber(item.interest) }}</td>
                        <td>{{item.dueAmout && formatNumber(item.dueAmout)}}</td>
                        <td>{{item.dueDate}}</td>
                        <td v-if="$route.query.writeOffFlag">{{item.writeOffFlag == 'NOT'?'未核销':'已核销'}}</td>
                    </tr>
                </table>
            </template>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';
    import {formatNumber} from '../../../components/mixins/formatter/index';
    import axios from 'axios';
    export default {
        data() {
            return {
                message: '',
                tableData: [], // 租金计划表
                wantfactor: {}, // 租赁要素
                statuslist: { // 字典编码
                    payWay: [],
                    leaseMode: [],
                    receiptType: []
                },
                rebateDate: {
                    before45: '起租前',
                    after45: '起租后45天'
                },
                taskType: '',
                rentFactor: [], //  租户收款和金租收款
                payTypeArr: [],
                costType: {
                    rent: "租金",
                    retain: "留购价",
                    rebate: "厂商返利",
                    discount: "厂商贴息",
                    otherexpense: "其他费用"
                }
            }
        },
        created() {
            let arrangementtype = this.$route.query.arrangement;
            if (arrangementtype != 5 && arrangementtype != 6) {
                this.taskType = '10'
            } else {
                this.taskType = '30'
            }

            this.$post('contractclause/info', {
                bussNo: this.$route.query.bussNo
            }).then(res => {
                if (res.data.code == '2000000') {

                    this.rentFactor = res.data.data.clauseData;
                }
            });

            //字典编码
            this.$post('/getConstantConfig', {
                dictionaryCode: ['payWay', 'leaseMode', 'payType', 'receiptType']
            }).then(res => {
                this.statuslist.payWay = res.data.data.payWay;
                this.statuslist.leaseMode = res.data.data.leaseMode;
                this.payTypeArr = res.data.data.payType;
                this.statuslist.receiptType = res.data.data.receiptType
            })
            // 请求租赁要素
            this.$post('/leaseinfo/queryElement', {
                bussNo: this.$route.query.bussNo,
                taskType: this.taskType
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
                    this.wantfactor = res.data.data;
                }
            });
            // 租金计划表
            this.$post('/leaseinfo/querySchedule', {
                bussNo: this.$route.query.bussNo,
                taskType: this.taskType
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
        },
        methods: {
            formatNumber,
            download() {
                axios({
                    method: 'post',
                    url: '/contractsign/download', // 请求地址
                    data: {
                        bussNo: this.$route.query.bussNo,
                        type: 'rent_plan',
                    }, // 参数
                    responseType: 'blob' // 表明返回服务器返回的数据类型
                })
                .then((res) => { // 处理返回的文件流
                    const content = res;
                    const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
                    const fileName = window.decodeURI(res.headers['content-disposition'].split('filename=')[1]);
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            },

        }
    }
</script>
<style lang="less">
    .businfosss {
        background: #fff;
        width: 100%;
        .factortable {
            width: 100%;
            text-align: center;
            border: 1px solid #afafaf;
            line-height: 50px;
            color: #909399;
            tr {
                min-height: 50px;
                td {
                    &:first-child {
                        width: 30%;
                    }
                    &:last-child {
                        width: 70%;
                        overflow: auto;
                        word-break:break-all
                    }
                }
            }
        }
        .factorlist {
            width: 99.7%;
            border: 1px solid #afafaf;
            margin: 0 auto 20px;
            border-top: 0;

            li {
                border-bottom: 1px solid #afafaf;
                text-align: center;
                min-height: 50px;
                color: #909399;
                font-size: 14px;
                margin: 5px 0;
                position: relative;
                span {
                    display: inline-block;
                    position: relative;
                    &:first-child {
                        width: 30%;
                        font-size: 14px;
                        color: #212121;
                        font-weight: bold;
                        .modefiydStyle {
                            font-style: normal;
                        }
                    }

                    &:last-child {
                        width: 69%;
                        border-left: 1px solid #afafaf;
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
        .download {
            float: right;
            margin: -35px 20px 0 0;
            z-index: 100;
            position: relative;
        }
    }
</style>
