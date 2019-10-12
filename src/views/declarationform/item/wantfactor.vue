<template>
    <div class="businfosss">
        <componentitle :message="message='租赁要素'" class="componentitle"/>
        <ul class="factorlist">
            <li>
                <span class="leftSpan">租赁模式</span>
                <div class="rightDiv">直租</div>
            </li>
            <li>
                <span class="leftSpan">租赁物名称及规格型号</span>
                <div class="rightDiv">
                    <el-input
                        class="elinputWidth"
                        type="text"
                        v-model="nameandModel">
                    </el-input>
                </div>
            </li>
            <li>
                <span class="leftSpan">购置价格（元）</span>
                <div class="rightDiv">
                    <el-input
                        class="elinputWidth"
                        type="text"
                        v-model="purchaseMoney">
                    </el-input>
                </div>
            </li>
            <li>
                <span class="leftSpan">首付款金额（元）</span>
                <div class="rightDiv">
                    <el-input
                        class="elinputWidth"
                        type="text"
                        v-model="firstMoney">
                    </el-input>
                </div>
            </li>
            <li>
                <span class="leftSpan">融资金额（元）</span>
                <div class="rightDiv">
                    <el-input
                        class="elinputWidth"
                        type="text"
                        v-model="financingMoney">
                    </el-input>
                </div>
            </li>
            <li>
                <span class="leftSpan">厂商返利（元）</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="businessRebate">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">厂商贴息（元）</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="businessDiscount">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">厂商贴息时间</span>
                <div class="rightDiv">
                    <el-select v-model="discount" placeholder="请选择" class="subSelect">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li>
                <span class="leftSpan">其他支出</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="otherExpenditure">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">其他支出时间</span>
                <div class="rightDiv">
                    <el-select v-model="otherExpenditureTime" placeholder="请选择" class="subSelect">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li>
                <span class="leftSpan">承租人风险金（元）</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="riskPremium">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">其他风险金（元）</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="otherRiskPremium">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">补贴金额（元）</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="subsidyMoney">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">预计补贴时间</span>
                <div class="rightDiv">

                    <el-date-picker
                        class="subSelect"
                        v-model="subsidyTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </li>
            <li>
                <span class="leftSpan">计划起租日</span>
                <div class="rightDiv">
                    <el-date-picker
                        class="subSelect"
                        v-model="beginTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </li>
            <li>
                <span class="leftSpan">计划终止日</span>
                <div class="rightDiv">
                    <el-date-picker
                        class="subSelect"
                        v-model="endTime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        :picker-options="endpickerOptions"
                        @blur="computedTime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </li>
            <li>
                <span class="leftSpan">租赁期限（月）</span>
                <div class="rightDiv">
                    {{term}}
                </div>
            </li>
            <li>
                <span class="leftSpan">租赁利率（固定利率）</span>
                <div class="rightDiv">
                    <el-input
                        class="elinputWidth"
                        type="text"
                        v-model="loanRate">
                    </el-input>
                </div>
            </li>
            <li>
                <span class="leftSpan">租金支付方式</span>
                <div class="rightDiv">
                    <el-select v-model="paymentMethod" placeholder="请选择" class="subSelect">
                        <el-option
                            v-for="item in statuslist.payWay"
                            :key="item.optionCode"
                            :label="item.optionName"
                            :value="item.optionCode">
                        </el-option>
                    </el-select>
                </div>
            </li>

            <li>
                <span class="leftSpan">计息方式</span>
                <div class="rightDiv">按日计息</div>
            </li>
            <li>
                <span class="leftSpan">还款频次</span>
                <div class="rightDiv">
                    <el-select v-model="frequency" placeholder="请选择" class="subSelect">
                        <el-option
                            v-for="item in loanMoneyOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </li>
            <li>
                <span class="leftSpan">留购价款（元）</span>
                <div class="rightDiv">
                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="remainStock">
                    </el-input-number>
                </div>
            </li>
            <li>
                <span class="leftSpan">提前结清（%）</span>
                <div class="rightDiv">

                    <el-input-number
                        :precision="2"
                        :step="0.1"
                        class="elinputWidth"
                        type="text"
                        v-model="advance">
                    </el-input-number>
                </div>
            </li>
        </ul>
        <div class="buttonNext">
            <el-button type="primary" class="buttonClass">保存</el-button>
            <el-button type="primary" class="buttonClass">下一步</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    export default {
        data() {
            return {
                message: '',
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
                loanMoneyOption: [ // 还款频次下拉框
                    {
                        value: '月',
                        label: '月'},
                    {
                        value: '季',
                        label: '季'
                    }
                ],
                options: [
                    {
                        value: '起租前45天',
                        label: '起租前45天'
                    },
                    {
                        value: '起租后45天',
                        label: '起租后45天'
                    }
                ],
                endpickerOptions: {
                    disabledDate: this.disabledDateEnd
                },
                payTypeArr: [],
                nameandModel: '', //租赁物名称及规格型号
                discount: '', //厂商贴息时间
                beginTime: '', // 计划起租日
                endTime: '', //计划终止日
                term: '',// 租赁期限
                purchaseMoney: '', //购置价格
                firstMoney: '',//首付款金额
                financingMoney: '', //融资金额
                businessRebate: '0.00', // 厂商返利
                businessDiscount: '0.00', //厂商贴息
                discount: '', //厂商贴息时间
                otherExpenditure: '0.00', //其他支出
                otherExpenditureTime: '',//其他支出时间
                riskPremium: '0.00', //承租人风险金
                otherRiskPremium: '0.00', //其他风险金
                subsidyMoney: '0.00', // 补贴金额
                subsidyTime: '', //预计补贴时间
                loanRate: '', //租赁利率
                paymentMethod: '', //租金支付方式
                frequency: '', // 还款频次
                remainStock: '1.00', //留购价款
                advance: '0.00' ,// 提前结清手续费
            }
        },
        created() {

            //字典编码
            this.$post('/getConstantConfig', {
                dictionaryCode: ['payWay', 'leaseMode','payType','receiptType']
            }).then(res => {
                this.statuslist.payWay = res.data.data.payWay;
                this.statuslist.leaseMode = res.data.data.leaseMode;
                this.payTypeArr = res.data.data.payType;
                this.statuslist.receiptType = res.data.data.receiptType
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
           // 计算租赁期限
           computedTime() {

                // 拆分年月日

                // console.log(parseInt(this.endTime.split('-')[1]) - this.beginTime.split('-')[1]);

                if(this.beginTime == '') {
                    this.$message.error('请选择起租日时间');
                }

                //两个日期
                var date1 = this.endTime;
                var date2 = this.beginTime;
                // 拆分年月日
                date1 = date1.split('-');
                // 得到月数
                date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
                // 拆分年月日
                date2 = date2.split('-');
                // 得到月数
                date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
                var m = Math.abs(date1 - date2);

                var m1 = this.endTime.split('-');
                var m2 = this.beginTime.split('-');

                // 如果两月相减等于0 默认为1个月
                if(m == '0') {
                    m++;
                }
                // 不足一个月按一个月显示，1个月零几天按两个月显示
                if(parseInt(m1[2]) - parseInt(m2[2]) < 0) {
                    this.term++
                }
                this.term = m;
           },
        }
    }
</script>
<style lang="less">
    .businfosss {
        background: #fff;
        width: 100%;
        .buttonNext {
            width: 165px;
            margin: 0 auto;
            .buttonClass {
                background: #ea9141;
                border: 0;
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
                height: 50px;
                line-height: 50px;
                color: #909399;
                font-size: 14px;
                .rightDiv {
                    height: 50px;
                    display: inline-block;
                    border-left: 1px solid #afafaf;
                    position: relative;
                    width: 67%;
                    text-align: left;
                    padding-left: 30px;
                    overflow: hidden;
                    .subSelect {
                        position: absolute;
                        top: 0;
                        left: 30px;
                    }
                    .elinputWidth {
                        width: 80%;
                        position: absolute;
                        top: 0;
                        left: 30px;
                    }
                }
                .leftSpan {
                    display: inline-block;
                    line-height: 50px;
                    height: 50px;
                    overflow: hidden;
                    &:first-child {
                        width: 30%;

                        font-size: 14px;
                        color: #212121;
                        font-weight: bold;
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
