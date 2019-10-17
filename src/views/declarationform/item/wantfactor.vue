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
                            v-model="nameandModel">
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
                            v-model="purchaseMoney">
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
                            v-model="firstMoney">
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
                            v-model="financingMoney">
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
                            v-model="businessRebate">
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
                            v-model="businessDiscount">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>厂商贴息时间</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择" v-model="discount">
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
                            v-model="otherExpenditure">
                    </el-input-number>
                </td>
            </tr>
            <tr>
                <td>其他支出时间</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择" v-model="otherExpenditureTime">
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
                            v-model="riskPremium">
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
                            v-model="otherRiskPremium">
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
                            v-model="subsidyMoney">
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
                            v-model="subsidyTime"
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
                            v-model="beginTime"
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
                            v-model="endTime"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td>租赁期限（月）</td>
                <td>
                    {{term}}
                </td>
            </tr>
            <tr>
                <td>租赁利率（固定利率）</td>
                <td>
                    <el-input
                            class="input-width"
                            type="text"
                            v-model="loanRate">
                    </el-input>
                </td>
            </tr>
            <tr>
                <td>租金支付方式</td>
                <td>
                    <el-select class="input-width" clearable placeholder="请选择" v-model="paymentMethod">
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
                    <el-select class="input-width" clearable placeholder="请选择" v-model="frequency">
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
                            v-model="remainStock">
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
                            v-model="advance">
                    </el-input-number>
                </td>
            </tr>
        </table>
        <div class="buttonNext">
            <el-button @click="save('save')" class="buttonClass" type="primary">保存</el-button>
            <el-button @click="save('next')" class="buttonClass" type="primary">下一步</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    import dayjs from 'dayjs';

    export default {
        data() {
            return {
                message: '',
                rebateDate: [], // 预计补贴时间和厂商贴息时间字典
                payWay: [], // 租金支付方式字典
                repayRate: [], // 还款频次字典
                endpickerOptions: {
                    disabledDate: this.disabledDateEnd
                },
                nameandModel: '', //租赁物名称及规格型号
                discount: '', //厂商贴息时间
                beginTime: '', // 计划起租日
                endTime: '', //计划终止日
                term: '',// 租赁期限
                purchaseMoney: '', //购置价格
                firstMoney: '',//首付款金额
                financingMoney: '', //融资金额
                businessRebate: '', // 厂商返利
                businessDiscount: '', //厂商贴息
                otherExpenditure: '', //其他支出
                otherExpenditureTime: '',//其他支出时间
                riskPremium: '', //承租人风险金
                otherRiskPremium: '', //其他风险金
                subsidyMoney: '', // 补贴金额
                subsidyTime: '', //预计补贴时间
                loanRate: '', //租赁利率
                paymentMethod: '', //租金支付方式
                frequency: '', // 还款频次
                remainStock: '', //留购价款
                advance: '',// 提前结清手续费
            }
        },
        created() {
            if (1 == 1) { // 如果租金支付方式没有值的话设置为约定本金
                this.paymentMethod = 'YDBJ';
            }

            if (1 == 1) { // 如果还款频次没有值的话设置为约定本金
                this.frequency = 'M';
            }

            if (1 == 1) { // 如果没有留购价款，默认是1
                this.remainStock = 1;
            }

            //字典编码
            this.$post('/getConstantConfig', {
                dictionaryCode: ['rebateDate', 'payWay', 'repayRate']
            }).then(res => {
                this.rebateDate = res.data.data.rebateDate;
                this.payWay = res.data.data.payWay;
                this.repayRate = res.data.data.repayRate;
            });
        },
        components: {
            componentitle
        },
        methods: {
            // 限制计划终止日必须大于计划起租日的时间选择
            disabledDateEnd(time) {
                return time.getTime() < new Date(this.beginTime);
            },
            calculatorPeriod() { // 计划起租日改变

                // 如果开始或结束没值,清空租赁期限
                if (this.beginTime == null || this.beginTime == '' || this.endTime == '' || this.endTime == null) {
                    this.term = '';
                    return;
                }

                let startDate = dayjs(this.beginTime);
                let endDate = dayjs(this.endTime);

                if (endDate.isBefore(startDate) || endDate.isSame(startDate)) { // 是否结束时间小于等于开始时间
                    this.endTime = ''; // 清空结束时间
                    this.term = '';
                    this.$message.error('终止日必须大于起租日');
                    // 弹窗提示
                } else { // 计算几个月
                    console.log(endDate.diff(startDate, 'month', true));
                    this.term = Math.ceil(endDate.diff(startDate, 'month', true));
                }
            },
            save(param) { // 保存页面，或者下一步
                // todo 发起ajax请求
                alert(param);
                if (param === 'save') { // 保存数据

                } else { // 保存并跳转

                }
            },
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
