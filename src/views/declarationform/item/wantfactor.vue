<template>
    <div>
        <div class="businfosss" v-show="!showRentTable">
            <componentitle :message="message='租赁要素'" class="componentitle"/>
            <table class="lessinfoTbale">
                <tr>
                    <td>租赁模式</td>
                    <td>回租</td>
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                                :min="0.00"
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
                    <td>租赁利率（固定利率）(%)</td>
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
                                :min="0.00"
                                :precision="2"
                                :step="0.1"
                                class="input-width"
                                type="text"
                                v-model="leaseInfo.depositAmt">
                        </el-input-number>
                    </td>
                </tr>
                <tr>
                    <td>提前结清手续费（%）</td>
                    <td>

                        <el-input-number
                                :min="0.00"
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
                            <el-input :disabled="true" class="input-width-2column"
                                      v-model="rentFactor.paymentAccountName"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>开户银行</td>
                        <td>
                            <el-input :disabled="true" class="input-width-2column"
                                      v-model="rentFactor.paymentAccountBank"></el-input>
                        </td>
                        <td>银行卡号</td>
                        <td>
                            <el-input :disabled="true" class="input-width-2column"
                                      v-model="rentFactor.paymentAccount"></el-input>
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
        <div class="renttable businfosss" v-if="showRentTable">
            <div class="titletop">
                <div class="topbox">
                    <span>租赁计划安排</span>
                    <div style="float: right;margin-right: 20px;">
                        <el-button @click="countZero" size="small" style="background: #ff8f2b;border:0" type="primary">
                            一键清零
                        </el-button>
                        <el-button @click="testCal" size="small" style="background: #ff8f2b;border:0" type="primary">
                            还款试算
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="tableTitle">
                您的融资金额为：<span style="color: #ffc18d;">{{leaseInfo.financeAmt}}</span>元
            </div>
            <el-table
                    :data="rentData"
                    :header-cell-style="{
                    'color': '#212121',
                    'font-size': '14px',
                    'font-weight': 'bold'
                }"
                    :summary-method="summaries"
                    border
                    element-loading-text="拼命加载中"
                    show-summary
                    size="small"
                    style="width: 100%">
                <el-table-column
                        :formatter="formatterPeriod"
                        label="期数"
                        prop="period">
                </el-table-column>
                <el-table-column
                        label="本金(元)"
                        prop="principal">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.principal"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="租赁利率(%)"
                        prop="moneyRate">
                </el-table-column>
                <el-table-column
                        label="利息(元)"
                        prop="interest">
                </el-table-column>
                <el-table-column
                        label="租金总额(元)"
                        prop="dueAmout">
                </el-table-column>
                <el-table-column
                        label="支付日期"
                        prop="dueDate">
                </el-table-column>
            </el-table>

            <div class="buttonNext" style="width: 300px;">
                <el-button @click="back()" class="buttonClass" type="primary">返回</el-button>
                <el-button @click="saveRent('next')" class="buttonClass" type="primary">保存</el-button>
            </div>
        </div>
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
                },
                showRentTable: false,
                rentData: []
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
        watch: {
            'rentFactor.payType'(newVal) {
                if (!newVal) {
                    this.rentFactor.paymentAccountName = '';
                    this.rentFactor.paymentAccountBank = '';
                    this.rentFactor.paymentAccount = '';
                    return;
                }

                this.$post('/contractclause/accountinfo', {
                    payType: newVal
                }).then(res => {
                    this.rentFactor.paymentAccountName = res.data.data.paymentAccountName;
                    this.rentFactor.paymentAccountBank = res.data.data.paymentAccountBank;
                    this.rentFactor.paymentAccount = res.data.data.paymentAccount;
                });
            }
        },
        methods: {
            getData() {
                // 2.租赁要素查询
                this.$post('/leaseinfo/queryElement', {
                    bussNo: this.bussNo,
                    taskType: "10"
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
            rentTableInfo() { // 获取租金计划表数据

                //融资金额
                if (this.leaseInfo.financeAmt === 0) {
                    this.$message.warning({message: '融资金额不能为0', duration: 1000});
                    return;
                }

                //起租日
                if (this.leaseInfo.startDate == '' || this.leaseInfo.startDate == null) {
                    this.$message.warning({message: '计划起租日不能为空', duration: 1000});
                    return;
                }

                //终止日
                if (this.leaseInfo.endDate == '' || this.leaseInfo.endDate == null) {
                    this.$message.warning({message: '计划终止日不能为空', duration: 1000});
                    return;
                }

                //租赁利率
                if (this.leaseInfo.leaseRate == '') {
                    this.$message.warning({message: '租赁利率不能为空', duration: 1000});
                    return;
                }

                this.showRentTable = true;
                // 3.相关条款查询
                this.$post('/leaseinfo/queryScheduleNew', {
                    bussNo: this.bussNo,
                    taskType: 10
                }).then(res => {
                    this.rentData = res.data.data;
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
                if (param === 'save') {
                    this.$emit("saveData");
                } else {
                    this.$emit('update:bindText', '承租人信息')
                }
            },
            rent() { // 租金计划表
                this.$emit("saveData", '', 'rent'); // 生成租金计划表
            },
            formatterPeriod(row, column) {
                let obj = {
                    rent: "租金",
                    retain: "留购价",
                    rebate: "厂商返利",
                    discount: "厂商贴息",
                    otherexpense: "其他费用"
                };

                if (row.costType !== 'rent') {
                    return obj[row.costType];
                } else {
                    return row.period;
                }
            },
            back() { // 隐藏租金计划表
                this.showRentTable = false;
            },
            saveRent() { // 保存租金计划表
                // 还款提交
                this.$post('/leaseinfo/addSchedule', {
                    bussNo: this.bussNo,
                    data: this.rentData
                }).then(res => {
                    if (res.data.code == '2000000') {
                        this.$message.success(`该笔业务的内部收益率为${this.mul(res.data.data.earningRate, 100)}%`);
                    }
                });
            },
            countZero() { // 清0
                this.rentData.forEach(item => {
                    item.principal = item.interest = item.dueAmout = 0;
                })
            },
            testCal() { // 还款试算
                this.$post('/leaseinfo/queryCalculation', {
                    bussNo: this.bussNo,
                    data: this.rentData
                }).then(res => {
                    if (res.data.code == '2000000') {
                        this.$message.success('试算成功');
                    }
                });
            },
            summaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    if (index === 2) {
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return this.add(prev, curr);
                            } else {
                                return prev;
                            }
                        }, 0);
                    }
                });
                return sums;
            },
            add(arg1, arg2) {
                let r1, r2, m;
                try {
                    r1 = arg1.toString().split(".")[1].length
                } catch (e) {
                    r1 = 0
                }
                try {
                    r2 = arg2.toString().split(".")[1].length
                } catch (e) {
                    r2 = 0
                }
                m = Math.pow(10, Math.max(r1, r2))
                return (this.mul(arg1, m) + this.mul(arg2, m)) / m
            },
            mul(arg1, arg2) { //js乘法
                let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
                try {
                    m += s1.split(".")[1].length
                } catch (e) {
                }
                try {
                    m += s2.split(".")[1].length
                } catch (e) {
                }
                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
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
