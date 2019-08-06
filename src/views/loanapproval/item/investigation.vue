<template>
    <div class="externalinfo">
        <componentitle :message="message='增信措施及综述'"/>
        <div class="assetsinfoul">
            <h3>房产抵押</h3>
            <ul class="infolist" v-for="item in houseMortgager">
                <li>
                    <span>房屋产权人(抵押人)</span>
                    <span>
                    {{item.mortgager}}
                </span>
                </li>
                <li>
                    <span>与承租人关系</span>
                    <span v-for="custRelation in statuslist.custRelation"
                          v-if="item.relation == custRelation.optionCode">
                    {{custRelation.optionName}}
                </span>
                    <span v-if="item.relation == ''"></span>
                </li>
                <li>
                    <span>身份证号(自然人填写)</span>
                    <span>{{item.mortgagerCertNo}}</span>
                </li>
                <li>
                    <span>房屋产权证号</span>
                    <span>{{item.certificate}}</span>
                </li>
                <li>
                    <span>建筑面积（㎡）</span>
                    <span>{{item.area}}</span>

                </li>
                <li>
                    <span>建筑结构</span>
                    <span>{{item.structure}}</span>
                </li>
                <li>
                    <span>评估价值（万元）</span>
                    <span>{{item.evaluateValue}}</span>
                </li>
                <li>
                    <span>抵押类别</span>
                    <span v-for="creditType in statuslist.creditType" v-if="item.creditType == creditType.optionCode">
                    {{creditType.optionName}}
                </span>
                    <span v-if="item.creditType == ''"></span>
                </li>
                <li>
                    <span>评估机构</span>
                    <span>{{item.evaluationAgency}}</span>
                </li>
                <li>
                </li>
                <li class="subliWidth">
                    <p class="bz">备注</p>
                    <div class="batextarrear">
                        <el-input
                                :rows="2"
                                class="inputtextIg"
                                placeholder=""
                                readonly
                                type="textarea"
                                v-model="item.remark">
                        </el-input>
                    </div>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>土地使用权抵押</h3>
            <ul class="infolist" v-for="item in landMortgager">
                <li>
                    <span>土地使用权人（抵押人）</span>
                    <span>
                    {{item.mortgager}}
                </span>
                </li>
                <li>
                    <span>与承租人关系</span>
                    <span v-for="custRelation in statuslist.custRelation"
                          v-if="item.relation == custRelation.optionCode">
                    {{custRelation.optionName}}
                </span>
                    <span v-if="item.relation == ''"></span>
                </li>
                <li>
                    <span>身份证号(自然人填写)</span>
                    <span>{{item.mortgagerCertNo}}</span>
                </li>
                <li>
                    <span>土地使用证号</span>
                    <span>{{item.certificate}}</span>
                </li>
                <li>
                    <span>土地使用权类型</span>
                    <span>{{item.landType}}</span>
                </li>
                <li>
                    <span>土地使用权期限（年）</span>
                    <span>{{item.landTerm}}</span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>{{item.area}}</span>
                </li>
                <li>
                    <span>坐落</span>
                    <span>{{item.location}}</span>
                </li>
                <li>
                    <span>评估价值（万元）</span>
                    <span>{{item.evaluateValue}}</span>
                </li>
                <li>
                    <span>评估机构</span>
                    <span>{{item.evaluationAgency}}</span>
                </li>
                <li class="subliWidth">
                    <p class="bz">备注</p>
                    <div class="batextarrear">
                        <el-input
                                :rows="2"
                                class="inputtextIg"
                                placeholder=""
                                readonly
                                type="textarea"
                                v-model="item.remark">
                        </el-input>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    export default {
        components: {
            componentitle
        },
        data() {
            return {
                message: '',
                textarea: '',
                houseMortgager: [], //房产抵押
                landMortgager: [], //土地抵押
                statuslist: { // 字典编码
                    custRelation: [],
                    creditType: []
                }
            }
        },
        created() {
            // 获取字典
            this.$post('/getConstantConfig', {
                dictionaryCode: ['custRelation', 'creditAdditionType']
            }).then(res => {
                this.statuslist.custRelation = res.data.data.custRelation;
                this.statuslist.creditType = res.data.data.creditAdditionType;
            });
            // 房产抵押信息，土地使用权抵押信息
            this.$post('/additioncredit/info', {
                bussNo: this.$route.query.bussNo
            }).then(res => {
                if (res.data.code == '2000000') {
                    this.houseMortgager = res.data.data.houseMortgager;
                    this.landMortgager = res.data.data.landMortgager;
                }
            });
        }
    }
</script>
<style lang="less">
    .externalinfo {
        h3 {
            padding-left: 15px;
            font-size: 14px;
        }
    }
</style>
