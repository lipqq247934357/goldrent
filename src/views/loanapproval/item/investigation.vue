<template>
<div class="externalinfo">
    <componentitle :message="message='其他增信措施'" />
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
                <!-- <select class="" name="" disabled>
                    <option value="" v-for="custRelation in statuslist.custRelation" :selected="item.relation == custRelation.optionCode ? true : false">
                        {{custRelation.optionName}}
                    </option>
                </select> -->
                <span v-for="custRelation in statuslist.custRelation" v-if="item.relation == custRelation.optionCode">
                    {{custRelation.optionName}}
                </span>
                <span v-if="item.relation == ''"></span>
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
                <span v-for="creditType in statuslist.creditType" v-if="item.evaluationAgency == creditType.optionCode">
                    {{creditType.evaluationAgency}}
                </span>
                <span v-if="item.evaluationAgency == ''"></span>
            </li>
            <li class="subliWidth">
                <p class="bz">备注</p>
                <div class="batextarrear">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder=""
                        class="inputtext"
                        disabled
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
                <span v-for="custRelation in statuslist.custRelation" v-if="item.relation == custRelation.optionCode">
                <!-- <select class="" name="" disabled>
                    <option value="" v-for="custRelation in statuslist.custRelation" :selected="item.relation == custRelation.optionCode ? true : false">
                        {{item.relation == '' ? '' :custRelation.optionName}}
                    </option>
                </select> -->
                    {{custRelation.optionName}}
                </span>
                <span v-if="item.relation == ''"></span>
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
            <li class="subliWidth">
                <p class="bz">备注</p>
                <div class="batextarrear">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder=""
                        class="inputtext"
                        disabled
                        v-model="item.remark">
                    </el-input>
                </div>
            </li>
        </ul>
    </div>

    <div class="bottombox">
        <componentitle :message="message='调查结论及风险评价'" />
        <h3>主办人</h3>
        <el-input
            v-for="item in sponsor"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="item.conclusion == '' ? '' : item.conclusion">
        </el-input>
        <h3>协办人</h3>
        <el-input
            v-for="item in assist"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="item.conclusion == '' ? '' : item.conclusion">
        </el-input>
        <h3>部门负责人</h3>
        <el-input
            v-for="item in responsible"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="item.conclusion == '' ? '' : item.conclusion">
        </el-input>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            textarea: '',
            houseMortgager: [], //房产抵押
            landMortgager: [], //土地抵押
            sponsor: '', //主办人
            assist: '', //协办人
            statuslist: { // 字典编码
                custRelation: [],
                creditType: [],
                serialNumberType: []
            },
            responsible: '' // 部门负责
        }
    },
    created() {
        // 字典编码约定
        this.$post('/getConstantConfig',{
            dictionaryCode: ['custRelation','creditAdditionType']
        }).then(res => {
            this.statuslist.custRelation = res.data.data.custRelation;
            this.statuslist.creditType = res.data.data.creditAdditionType;

        })
        // 主办人
        this.$post('/getSurveyConclusion',{
            bussNo: this.$route.query.bussNo,
            ownerType: 'ZB'
        }).then( res => {
            // 返回data
            // data
            // id	数据唯一ID	String
            // ownerId	所属人ID	String
            // ownerType	所属人身份	String
            // conclusion	调查结论	String
            if(res.data.code == '2000000') {
                this.sponsor = res.data.data;
            }
        });
        this.$post('/getSurveyConclusion',{
            bussNo: this.$route.query.bussNo,
            ownerType: 'FZ'
        }).then( res => {
            // 返回data
            // data
            // id	数据唯一ID	String
            // ownerId	所属人ID	String
            // ownerType	所属人身份	String
            // conclusion	调查结论	String
            if(res.data.code == '2000000') {
                this.responsible = res.data.data;
            }
        });
        // 协办人
        this.$post('/getSurveyConclusion',{
            bussNo: this.$route.query.bussNo,
            ownerType: 'XB'
        }).then( res => {
            if(res.data.code == '2000000') {
                this.assist = res.data.data;
            }
        });
        // 外部信息 input 填充
        this.$post('/additioncredit/info',{
            bussNo: this.$route.query.bussNo
        }).then(res => {
            // 示例
            // {
            //     "msg": "success",
            //     "code": "2000000",
            //     "data": {
            //         "surveyInformation": {
            //             "id": "8932f859056048379bdf60c2b1a5b182",
            //             "version": 0,
            //             "status": null,
            //             "creator": "",
            //             "createTime": "2019-04-12T02:19:36.000+0000",
            //             "editor": "",
            //             "editTime": "2019-04-12T02:19:36.000+0000",
            //             "remark": null,
            //             "bussNo": "test_data_for_app_0411_02",
            //             "lesseeCredit": "someone1",
            //             "guarantorCredit": "rela",
            //             "repurchaseCredit": "",
            //             "lesseeCreditZhongdeng": "",
            //             "lesseeCreditExternal": "",
            //             "guarantorCreditExternal": "",
            //             "repurchaseCreditExternal": ""
            //         },
            //         "bussNo": "test_data_for_app_0411_02"
            //     }
            // }
            if(res.data.code == '2000000') {
                this.houseMortgager = res.data.data.houseMortgager;
                if(this.houseMortgager == 0) {
                    this.$message.error('无房产抵押信息');
                }
                this.landMortgager = res.data.data.landMortgager;
                if(this.landMortgager == 0) {
                    this.$message.error('无土地使用权抵押信息');
                }
            }

        });
    },
    components: {
        componentitle,
    }
}
</script>
<style lang="less">
.externalinfo {
    h3 {
        padding-left: 15px;
        font-size: 14px;
    }
    .bottombox {
        .inputtext {
            width: 100%;
            display: block;
            vertical-align: middle;
        }
    }

}
</style>
