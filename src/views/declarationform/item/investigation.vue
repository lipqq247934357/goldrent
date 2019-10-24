<template>
    <div class="externalinfo">
        <componentitle :message="message='增信措施及综述'"/>

        <div class="tableTitle">
            1.1 房产抵押
        </div>
        <table class="lessinfoTbale">
            <tr>
                <td>房屋产权人(抵押人)</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.mortgager"></el-input>
                </td>
                <td>与承租人关系</td>
                <td>
                    <el-select class="input-width-2column" clearable placeholder="请选择"
                               v-model="houseMortgager.relation">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in custRelation">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>身份证号(自然人填写)</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.mortgagerCertNo"></el-input>
                </td>
                <td>房屋产权证号</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.certificate"></el-input>
                </td>
            </tr>
            <tr>
                <td>建筑面积（㎡）</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.area"></el-input>
                </td>
                <td>建筑结构</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.structure"></el-input>
                </td>
            </tr>
            <tr>
                <td>评估价值（万元）</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.evaluateValue"></el-input>
                </td>
                <td>抵押类别</td>
                <td>
                    <el-select class="input-width-2column" clearable placeholder="请选择"
                               v-model="houseMortgager.creditType">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in creditAdditionType">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>评估机构</td>
                <td>
                    <el-input class="input-width-2column" v-model="houseMortgager.evaluationAgency"></el-input>
                </td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>备注</td>
                <td>
                    <div class="batextarrear">
                        <el-input :rows="2"
                                  class="input-width-2column"
                                  placeholder=""
                                  type="textarea"
                                  v-model="houseMortgager.remark">
                        </el-input>
                    </div>
                </td>
            </tr>
        </table>

        <div class="tableTitle">
            1.2 土地使用权抵押
        </div>
        <table class="lessinfoTbale">
            <tr>
                <td>土地使用权人（抵押人）</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.mortgager"></el-input>
                </td>
                <td>与承租人关系</td>
                <td>
                    <el-select class="input-width-2column" clearable placeholder="请选择" v-model="landMortgager.relation">
                        <el-option
                                :key="item.optionCode"
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in custRelation">
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td>身份证号(自然人填写)</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.mortgagerCertNo"></el-input>
                </td>
                <td>土地使用证号</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.certificate"></el-input>
                </td>
            </tr>
            <tr>
                <td>土地使用权类型</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.landType"></el-input>
                </td>
                <td>土地使用权期限（年）</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.landTerm"></el-input>
                </td>
            </tr>
            <tr>
                <td>面积（㎡）</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.area"></el-input>
                </td>
                <td>坐落</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.location"></el-input>
                </td>
            </tr>
            <tr>
                <td>评估价值（万元）</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.evaluateValue"></el-input>
                </td>
                <td>评估机构</td>
                <td>
                    <el-input class="input-width-2column" v-model="landMortgager.evaluationAgency"></el-input>
                </td>
            </tr>
            <tr class="subliWidth">
                <td class="bz">备注</td>
                <td class="batextarrear">
                    <el-input :rows="2" class="input-width-2column"
                              placeholder=""
                              type="textarea"
                              v-model="landMortgager.remark">
                    </el-input>
                </td>
            </tr>
        </table>
        <div class="buttonNext" style="width: 300px;">
            <el-button @click="save('save')" class="buttonClass" type="primary">保存</el-button>
            <el-button @click="save('next')" class="buttonClass" type="primary">下一步</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    export default {
        props: ['bussNo', 'bindText'],
        components: {
            componentitle
        },
        data() {
            return {
                message: '',
                textarea: '',
                houseMortgager: {}, //房产抵押
                landMortgager: {}, //土地抵押
                custRelation: [], // 与承租人关系字典
                creditAdditionType: [], // 增信类型字典
            }
        },
        created() {
            // 获取字典
            this.$post('/getConstantConfig', {
                dictionaryCode: ['custRelation', 'creditAdditionType']
            }).then(res => {
                this.custRelation = res.data.data.custRelation;
                this.creditAdditionType = res.data.data.creditAdditionType;
            });
            this.getData();
        },
        methods: {
            getData() {
                // 房产抵押信息，土地使用权抵押信息
                this.$post('/additioncredit/info', {
                    bussNo: this.bussNo,
                    ownerType: 'ZB'
                }).then(res => {
                    if (res.data.code == '2000000') {
                        if (res.data.data.houseMortgager.length > 0) {
                            this.houseMortgager = res.data.data.houseMortgager[0];
                        }
                        if (res.data.data.landMortgager.length > 0) {
                            this.landMortgager = res.data.data.landMortgager[0];
                        }
                    }
                });
            },
            save(param) { // 保存页面或者下一步
                if (param === 'save') {
                    this.$emit("saveData");
                } else {
                    this.$emit('update:bindText', '调查结论及风险评价')
                }
            }
        }
    }
</script>
<style lang="less">
    .externalinfo {
        h3 {
            padding-left: 15px;
            font-size: 14px;
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
    }
</style>
