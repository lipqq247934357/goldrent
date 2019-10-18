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
                        <el-input class="input-width-2column" v-model="condition.leaseName"></el-input>
                    </td>
                    <td>交付地点</td>
                    <td>
                        <el-input class="input-width-2column" v-model="condition.detrveryPlace"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>购置价格(元)</td>
                    <td>
                        <el-input class="input-width-2column" v-model="condition.purchasePrice"></el-input>
                    </td>
                    <td>是否抵押登记</td>
                    <td>
                        <el-select class="input-width-2column" clearable placeholder="请选择" v-model="condition.purchasePrice">
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
                        <el-input class="input-width-2column" v-model="condition.serialNo"></el-input>
                    </td>
                    <td>抵押管理机关</td>
                    <td>
                        <el-input class="input-width-2column" v-model="condition.mortgageAgency"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>识别号类型</td>
                    <td>
                        <el-select class="input-width-2column" clearable placeholder="请选择" v-model="condition.purchasePrice">
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
                    <el-input class="input-width-2column" v-model="insurance.insuranceType"></el-input>
                </td>
                <td>保险公司</td>
                <td>
                    <el-input class="input-width-2column" v-model="insurance.insuranceCompany"></el-input>
                </td>
            </tr>
            <tr>
                <td>保额（元）</td>
                <td>
                    <el-input class="input-width-2column" v-model="insurance.coverage"></el-input>
                </td>
                <td>保险期限（月）</td>
                <td>
                    <el-input class="input-width-2column" v-model="insurance.insuranceTerm"></el-input>
                </td>
            </tr>
            <tr>
                <td>购买时间</td>
                <td>
                    <el-select class="input-width-2column" clearable placeholder="请选择" v-model="condition.purchasePrice">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in InsurancePurchaseTime">
                        </el-option>
                    </el-select>
                </td>
                <td v-if="insurance.insuranceBuyTime == ''"></td>
                <td>第一受益人</td>
                <td>
                    哈银金融租赁有限责任公司
                </td>
            </tr>
            <tr>
                <td>备注</td>
                <td>
                    <el-input class="input-width-2column" placeholder="字数限制0-200字" v-model="insurance.remark"></el-input>
                </td>
            </tr>
        </table>

        <div class="buttonNext">
            <el-button class="buttonClass" type="primary">保存</el-button>
            <el-button class="buttonClass" type="primary">下一步</el-button>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';
    import {formatNumber} from '../../../components/mixins/formatter/index';

    export default {
        data() {
            return {
                message: '',
                mortgage:[], // 抵押登记字典
                serialNoType:[], // 识别号类型字典
                InsurancePurchaseTime:[], // 保险购买时间字典
                condition: {},
                insurance: {}
            }
        },
        created() {
            //  1.获取3个字典
            this.$post('/getConstantConfig', {
                dictionaryCode: ['mortgage','serialNoType','InsurancePurchaseTime']
            }).then(res => {
                this.mortgage = res.data.data.mortgage;
                this.serialNoType = res.data.data.serialNoType;
                this.InsurancePurchaseTime = res.data.data.InsurancePurchaseTime;
            });

            // 2.查看url上是否有订单编号参数

            // if (1 == 2) { // 没有参数，新增
            //
            // } else { // 通过订单号查询数据
            //
            // }
        },
        components: {
            componentitle,

        }, methods: {
            formatNumber
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
