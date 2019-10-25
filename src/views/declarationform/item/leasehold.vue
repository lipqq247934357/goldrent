<template>
    <div class="leasehold">
        <div>
            <componentitle :message="message='租赁物信息'"/>
            <div class="tableTitle">
                租赁物情况
            </div>
            <table class="lessinfoTbale">
                <tr>
                    <td>租赁物名称及规格型号</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentInfo.condition.leaseName"></el-input>
                    </td>
                    <td>交付地点</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentInfo.condition.deliveryPlace"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>购置价格(元)</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentInfo.condition.purchasePrice"></el-input>
                    </td>
                    <td>是否抵押登记</td>
                    <td>
                        <el-select class="input-width-2column" clearable placeholder="请选择"
                                   v-model="rentInfo.condition.mortgage">
                            <el-option
                                    :key="item.optionCode"
                                    :label="item.optionName"
                                    :value="item.optionCode"
                                    v-for="item in mortgage">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>唯一识别码</td>
                    <td>
                        <el-input class="input-width-2column" v-model="rentInfo.condition.serialNo"></el-input>
                    </td>
                    <td>抵押管理机关</td>
                    <td>
                        <el-input :disabled="mortgageAgencyStatus" class="input-width-2column"
                                  v-model="rentInfo.condition.mortgageAgency"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>识别号类型</td>
                    <td>
                        <el-select class="input-width-2column" clearable placeholder="请选择"
                                   v-model="rentInfo.condition.serialNoType">
                            <el-option
                                    :key="item.optionCode"
                                    :label="item.optionName"
                                    :value="item.optionCode"
                                    v-for="item in serialNoType">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
        </div>
        <div class="tableTitle">
            租赁物保险
        </div>
        <table class="lessinfoTbale">
            <tr>
                <td>险种</td>
                <td>
                    <el-input class="input-width-2column" v-model="rentInfo.insurance.insuranceType"></el-input>
                </td>
                <td>保险公司</td>
                <td>
                    <el-input class="input-width-2column" v-model="rentInfo.insurance.insuranceCompany"></el-input>
                </td>
            </tr>
            <tr>
                <td>保额（元）</td>
                <td>
                    <el-input class="input-width-2column" v-model="rentInfo.insurance.coverage"></el-input>
                </td>
                <td>保险期限（月）</td>
                <td>
                    <el-input class="input-width-2column" v-model="rentInfo.insurance.insuranceTerm"></el-input>
                </td>
            </tr>
            <tr>
                <td>购买时间</td>
                <td>
                    <el-select class="input-width-2column" clearable placeholder="请选择"
                               v-model="rentInfo.insurance.insuranceBuyTime">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in InsurancePurchaseTime">
                        </el-option>
                    </el-select>
                </td>
                <td>第一受益人</td>
                <td>
                    哈银金融租赁有限责任公司
                </td>
            </tr>
            <tr>
                <td>备注</td>
                <td>
                    <el-input class="input-width-2column" placeholder="字数限制0-200字"
                              v-model="rentInfo.insurance.remark"></el-input>
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
    import {formatNumber} from '../../../components/mixins/formatter/index';

    export default {
        props: ['bussNo', 'bindText'],
        data() {
            return {
                message: '',
                mortgage: [], // 抵押登记字典
                serialNoType: [], // 识别号类型字典
                InsurancePurchaseTime: [], // 保险购买时间字典
                condition: {},
                insurance: {},
                rentInfo: {
                    condition: {
                        leaseName: '', // 租赁物名称及规格型号
                        deliveryPlace: '', // 交付地点
                        purchasePrice: '', // 购置价格
                        mortgage: '', // 是否抵押登记
                        serialNo: '', // 唯一识别码
                        mortgageAgency: '', // 抵押管理机关
                        serialNoType: '', // 识别号类型
                    },
                    insurance: {
                        insuranceType: '', // 险种
                        insuranceCompany: '', // 保险公司
                        coverage: '', // 保额
                        insuranceTerm: '', // 保险期限
                        insuranceBuyTime: '', // 购买时间
                        firstBeneficiary: '', // 第一受益人
                        remark: '', // 备注
                    }
                },
                mortgageAgencyStatus: true
            }
        },
        created() {
            //  1.获取3个字典
            this.$post('/getConstantConfig', {
                dictionaryCode: ['mortgage', 'serialNoType', 'InsurancePurchaseTime']
            }).then(res => {
                this.mortgage = res.data.data.mortgage;
                this.serialNoType = res.data.data.serialNoType;
                this.InsurancePurchaseTime = res.data.data.InsurancePurchaseTime;
            });
            this.getData();
        },
        components: {
            componentitle,

        },
        watch: {
            'rentInfo.condition.mortgage'(newVal) {
                if (!newVal || newVal === 'N') {
                    this.rentInfo.condition.mortgageAgency = '';
                    this.mortgageAgencyStatus = true;
                } else {
                    this.mortgageAgencyStatus = false;
                }
            }
        },
        methods: {
            getData() {
                this.$post('/leaseinfo/query', {
                    bussNo: this.bussNo
                }).then(res => {
                    if (res.data.data.lists.length > 0) {
                        this.rentInfo = res.data.data.lists[0];
                    }
                });
            },
            formatNumber,
            save(param) { // 保存页面或者下一步
                if (param === 'save') {
                    this.$emit("saveData");
                } else {
                    this.$emit('update:bindText', '外部信息')
                }
            }
        }
    }
</script>
<style lang="less">
    .leasehold {

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
