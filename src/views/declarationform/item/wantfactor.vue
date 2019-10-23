<template>
    <div class="businfosss">
        <componentitle :message="message='租赁要素'" class="componentitle"/>
        <table class="lessinfoTbale">
            <tr>
                <td>租赁模式</td>
                <td>直租</td>
            </tr>
            <tr>
                <td>租赁物名称及规格型号</td>
                <td>
                    <el-input
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.leaseName">
                    </el-input>
                </td>
            </tr>
            <tr>
                <td>购置价格（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.purchaseAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>首付款金额（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.firstPayAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>融资金额（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.financeAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>厂商返利（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.rebateAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>厂商贴息（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.rebateFirmAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>厂商贴息时间</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择"
                               v-model="leaseInfo.firmRebateIntrestDate">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in rebateDate">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>其他支出</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.otherExpense">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>其他支出时间</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择" v-model="leaseInfo.otherExpenseDate">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in rebateDate">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>承租人风险金（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.lesseeRiskAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>其他风险金（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.otherRiskAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>补贴金额（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.allowanceAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>预计补贴时间</td>
                <td>

                    <el-date-picker
                            class="input-width"
                            placeholder="选择日期"
                            type="date"
                            v-model="leaseInfo.allowanceDate"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td>计划起租日</td>
                <td>
                    <el-date-picker
                            @change="calculatorPeriod"
                            class="input-width"
                            placeholder="选择日期"
                            type="date"
                            v-model="leaseInfo.startDate"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td>计划终止日</td>
                <td>
                    <el-date-picker
                            :picker-options="endpickerOptions"
                            @change="calculatorPeriod"
                            class="input-width"
                            placeholder="选择日期"
                            type="date"
                            v-model="leaseInfo.endDate"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td>租赁期限（月）</td>
                <td>
                    {{leaseInfo.leaseTerm}}
                </td>
            </tr>
            <tr>
                <td>租赁利率（固定利率）</td>
                <td>
                    <el-input
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.leaseRate">
                    </el-input>
                </td>
            </tr>
            <tr>
                <td>租金支付方式</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择" v-model="leaseInfo.payWay">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in payWay">
                        </el-option>
                    </el-select>
                </td>
            </tr>

            <tr>
                <td>计息方式</td>
                <td>按日计息</td>
            </tr>
            <tr>
                <td>还款频次</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择" v-model="leaseInfo.repayRate">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in repayRate">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>留购价款（元）</td>
                <td>
                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.depositAmt">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>提前结清（%）</td>
                <td>

                    <el-input-number
                            :precision="2"
                            :step="0.1"
                            class="input-width"
                            type="text"
                            v-model="leaseInfo.settleAhead">
                    </el-input-number>
                </td>
            </tr>
        </table>

        <div class="section2">
            <componentitle :message="message='(二) 相关条款'"/>
            <div class="tableTitle">
                2.1 金租收款账户
            </div>
            <table class="lessinfoTbale">
                <tr>
                    <td>还租方式</td>
                    <td>
                        <el-select class="input-width-2column" clearable placeholder="请选择"
                                   v-model="rentFactor.payType">
                            <el-option
                                    :key="item.optionCode"
                                    :label="item.optionName"
                                    :value="item.optionCode"
                                    v-for="item in payType">
                            </el-option>
                        </el-select>
                    </td>
                    <td>账户名称</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.paymentAccountName"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>开户银行</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.paymentAccountBank"></el-input>
                    </td>
                    <td>银行卡号</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.paymentAccount"></el-input>
                    </td>
                </tr>
            </table>
            <div class="tableTitle">
                2.2 租户收款账户信息
            </div>
            <table class="lessinfoTbale">
                <tr>
                    <td>收款账户类型</td>
                    <td>
                        <el-select class="input-width-2column" clearable placeholder="请选择"
                                   v-model="rentFactor.receiptType">
                            <el-option
                                    :key="item.optionCode"
                                    :label="item.optionName"
                                    :value="item.optionCode"
                                    v-for="item in receiptType">
                            </el-option>
                        </el-select>
                    </td>
                    <td>账户名称</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.receiptAccountName"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>身份证号（如有）</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.certNo"></el-input>
                    </td>
                    <td>开户银行</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.receiptAccount"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>银行卡号</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentFactor.receiptAccountBank"></el-input>
                    </td>
                </tr>
            </table>
        </div>

        <div class="buttonNext" style="width: 300px;">
            <el-button @click="save('save')" class="buttonClass" type="primary">保存</el-button>
            <el-button @click="rent" class="buttonClass" type="primary">租金计划表</el-button>
            <el-button @click="save('next')" class="buttonClass" type="primary">下一步</el-button>
        </div>
<!--        <rentTable :show="true"></rentTable>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';
    import rentTable from '../components/rentTable.vue';

    import dayjs from 'dayjs';

    export default {
        props: ['bussNo', 'bindText'],
        data() {
            return {
                message: '',
                rebateDate: [], // 预计补贴时间和厂商贴息时间字典
                payWay: [], // 租金支付方式字典
                repayRate: [], // 还款频次字典
                payType: [], // 还租方式字典
                receiptType: [], // 收款账户类型
                endpickerOptions: {
                    disabledDate: this.disabledDateEnd
                },
                leaseInfo: {
                    leaseName: '', //租赁物名称及规格型号
                    purchaseAmt: '', //购置价格
                    firstPayAmt: '',//首付款金额
                    financeAmt: '', //融资金额
                    rebateAmt: '', // 厂商返利
                    rebateFirmAmt: '', //厂商贴息时间
                    lesseeRiskAmt: '', //承租人风险金
                    firmRebateIntrestDate: '', //厂商贴息
                    otherExpense: '', //其他支出
                    otherExpenseDate: '',//其他支出时间
                    otherRiskAmt: '', //其他风险金
                    allowanceAmt: '', // 补贴金额
                    allowanceDate: '', //预计补贴时间
                    startDate: '', // 计划起租日
                    endDate: '', //计划终止日
                    leaseTerm: '',// 租赁期限
                    leaseRate: '', //租赁利率
                    payWay: '', //租金支付方式
                    repayRate: '', // 还款频次
                    depositAmt: '', //留购价款
                },
                rentFactor: { // 金租收款账户类型，租户收款账户类型
                    payType: '', // 还租方式
                    paymentAccountName: '', // 账户名称
                    paymentAccountBank: '', // 开户银行
                    paymentAccount: '', // 银行卡号
                    receiptType: '', // 收款账户类型
                    receiptAccountName: '', // 账户名称
                    certNo: '', // 证件号码
                    receiptAccountBank: '', // 开户银行
                    receiptAccount: '', //银行卡号
                }
            }
        },
        created() {
            // 1.字典编码
            this.$post('/getConstantConfig', {
                dictionaryCode: ['rebateDate', 'payWay', 'repayRate', 'payType', 'receiptType']
            }).then(res => {
                this.rebateDate = res.data.data.rebateDate;
                this.payWay = res.data.data.payWay;
                this.repayRate = res.data.data.repayRate;
                this.payType = res.data.data.payType;
                this.receiptType = res.data.data.receiptType;
            });
            this.getData();
        },
        components: {
            componentitle,
            rentTable
        },
        methods: {
            getData() {
                // 2.租赁要素查询
                this.$post('/leaseinfo/queryElement', {
                    bussNo: this.bussNo,
                    taskType:"10"
                }).then(res => {
                    if (res.data.code === '2000000' || res.data.code === 2000000) {
                        let leaseInfo = res.data.data;
                        if (leaseInfo.payWay == '' || leaseInfo.payWay === null) { // 如果租金支付方式没有值的话设置为约定本金
                            leaseInfo.payWay = 'YDBJ';
                        }
                        this.leaseInfo = leaseInfo;
                    }
                });

                // 3.相关条款查询
                this.$post('/contractclause/info', {
                    bussNo: this.bussNo
                }).then(res => {
                    if (res.data.code === '2000000' || res.data.code === 2000000) {
                        this.rentFactor = res.data.data.clauseData;
                    }
                });
            },
            // 限制计划终止日必须大于计划起租日的时间选择
            disabledDateEnd(time) {
                return time.getTime() < new Date(this.beginTime);
            },
            calculatorPeriod() { // 计划起租日改变
                // 如果开始或结束没值,清空租赁期限
                let beginTime = this.leaseInfo.startDate;
                let endTime = this.leaseInfo.endDate;
                if (beginTime == null || beginTime == '' || endTime == '' || endTime == null) {
                    this.leaseInfo.leaseTerm = '';
                    return;
                }
                let startDate = dayjs(beginTime);
                let endDate = dayjs(endTime);

                if (endDate.isBefore(startDate) || endDate.isSame(startDate)) { // 是否结束时间小于等于开始时间
                    this.leaseInfo.endDate = ''; // 清空结束时间
                    this.leaseInfo.leaseTerm = '';
                    this.$message.error('终止日必须大于起租日'); // 弹窗提示
                } else { // 计算几个月
                    this.leaseInfo.leaseTerm = Math.ceil(endDate.diff(startDate, 'month', true));
                }
            },
            save(param) { // 保存页面或者下一步
                if(param === 'save'){
                    this.$emit("saveData");
                }else{
                    this.$emit('update:bindText','承租人信息')
                }
            },
            rent(){ // 租金计划表

            }
        }
    }
</script>
<style lang="less">

    .businfosss {
        background: #fff;
        width: 100%;

        .componentitle {
            margin-top: 18px;
        }

        .tableTitle {
            font-size: 14px;
            margin: 20px 10px;
        }

        .lessinfoTbale {
            width: 100%;

            tr td {
                font-size: 14px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border: 1px solid #e5e5e5;

                .input-width {
                    width: 60%;
                }

                .input-width-2column {
                    width: 80%;
                }
            }
        }

        .buttonNext {
            width: 165px;
            margin: 40px auto;

            .buttonClass {
                background: #ea9141;
                border: 0;
            }
        }
    }

</style>
