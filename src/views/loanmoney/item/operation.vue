<template>
<div class="operation">
    <componentitle :message="message='评分卡结果'" />
    <el-button type="primary" class="againbutton" @click="again" :disabled="inputdisabled">重评</el-button>
    <div class="presentation">
        <i>征信报告：</i>
        <template>
            <el-radio v-model="radio" label="Y" :disabled="inputdisabled">有</el-radio>
            <el-radio v-model="radio" label="N" :disabled="inputdisabled">无</el-radio>
        </template>
        <ul class="nothingshow" v-show="radio == 'Y'">
            <li>
                <span class="lefttext">信用卡及贷款24个月最大逾期期数</span>
                <input type="text" name="" v-model:value="overdue" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">信用卡及贷款24个月累计逾期次数</span>
                <input type="text" name="" v-model:value="overdueNo" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">最近1个月内的查询机构数(贷款审批)</span>
                <input type="text" name="" v-model:value="oneMonth" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">涉诉：</span>
                <el-select v-model="value2" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span class="lefttext">被执行信息：</span>
                <el-select v-model="value3" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
        <ul class="nothingshow" v-show="radio == 'N'">
            <li>
                <span class="lefttext">同盾贷前查询</span>
                <input type="text" name="" v-model:value="tongdunQuery" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">同盾信用评分</span>
                <input type="text" name="" v-model:value="tongdunCredit" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">涉诉</span>
                <el-select v-model="value2" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span class="lefttext">被执行信息</span>
                <el-select v-model="value3" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
        <h3 class="score">累计得分：<span>{{proposaltotalScore}}</span> <span>{{proposalsuggestResult}}</span> </h3>
        <table class="operationtable" style="width: 100%" border="1">
            <tr>
                <th>指标大类</th>
                <th>指标名称</th>
                <th>命中项</th>
                <th>得分</th>
            </tr>
            <template v-for="(itemOuter, index) in tableData">
                <tr v-for="(itemInner, indexInner) in itemOuter.itemList">
                    <td v-if="indexInner == 0" :rowspan="itemOuter.itemListSize">{{itemInner.variableName}}</td>
                    <td>{{itemInner.itemName}}</td>
                    <td>{{itemInner.itemHit}}</td>
                    <td>{{itemInner.itemScore}}</td>
                </tr>
            </template>
        </table>
    </div>
    <componentitle :message="message='审批意见'" />
    <div class="opinion">
        <div class="subone">
            <p>审批报告：</p>
            <el-button type="primary" style="background: rgb(67,68,140);border: 1px solid rgb(67,68,140);">查看调查报告</el-button>
            <el-button type="primary">生成审批报告</el-button>
        </div>
        <div class="subone">
            <p class="contract">面签合同：</p>
            <div class="checkbox" v-for="(item,index) in checkboxlist" >
                <input
                    :id="index"
                    type="checkbox"
                    name=""
                    @click="handelcheckbox(item,index)"
                    :disabled="inputdisabled"
                    :value="item.contractName">
                <span>{{item.contractName}}</span>
            </div>

        </div>
        <div class="subone opinionsdiv" style="clear:both">
            <p>审批意见：</p>
            <template>
                <el-radio v-model="radio1" label="1" :disabled="inputdisabled">同意该笔申请</el-radio>
                <el-radio v-model="radio1" label="0" :disabled="inputdisabled">不同意该笔申请</el-radio>
            </template>
        </div>
        <div class="subone">
            <p>原因描述：</p>
            <el-input
                type="textarea"
                class="textareawidth"
                :rows="3"
                placeholder="请输入内容"
                :disabled="inputdisabled"
                v-model="textarea">
            </el-input>
        </div>

        <div class="bottombutton">
            <el-button type="primary" disabled>保存</el-button>
            <el-button type="primary" disabled>上会审议</el-button>
            <el-button type="primary" @click="adopt" :disabled="inputdisabled">终审通过</el-button>
            <el-button type="primary" disabled>拒绝</el-button>
            <el-button type="primary" disabled>退回</el-button>
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            radio: 'Y', // 是否有征信报告
            radio1: '', //1同意 0不同意
            tableData: [], // 表格
            textarea: '', //文本域绑定
            checklist: [], // 合同按钮
            options: [
                {
                    value: 'Y',
                    label: '有'
                },
                 {
                    value: 'N',
                    label: '无'
                },
            ],
            value2: '', // 储存涉诉
            value3: '', // 储存被执行信息
            checkboxlist: [], // 面签合同
            loanFaceContracts: [], //储存点击面签合同
            checked: false,
            overdue: '', // 最大逾期数
            overdueNo: '', //累计逾期数
            oneMonth: '', //一个月
            tongdunQuery: '', //同盾查询
            tongdunCredit: '', // 同盾信用,
            rowspanlength: [],
            proposaltotalScore: '', // 评分卡得分展示
            proposalsuggestResult: '', // 评分卡得分结论
            inputdisabled: false
        }
    },
    created() {
        this.$get(`/LoanApprove/queryApproveDetail?bussNo=${this.$route.query.bussNo}`).then( res => {
            if(res.data.data == null ) {
                return;
            }
            this.checkboxlist = res.data.data.allContracts;
            this.radio1 = res.data.data.approvalComments;
            this.textarea = res.data.data.reasonDescription;
        });
        this.$get(`/decisionCreditScore/queryCreditScore?bussNo=${this.$route.query.bussNo}&custId=${this.$route.query.custId}`,{
        }).then(res => {
            // 返回示例
            // {
            //     "msg": "success",
            //     "code": "2000000",
            //     "data": {
            //         "decisionCreditScore": {
            //             "id": "201904161637132421000017968259",
            //             "version": 0,
            //             "status": null,
            //             "creator": null,
            //             "createTime": "2019-04-16 08:37:13",
            //             "editor": null,
            //             "editTime": "2019-04-18 10:15:29",
            //             "remark": null,
            //             "bussNo": "BUSS_NO_20190411_123456",
            //             "custId": "person2019041188881113",
            //             "haveCreditReport": "Y",
            //             "pbcScore": 800,
            //             "overdueNum24m": 1,
            //             "continueOverdueNum24m": 1,
            //             "overdueMaxAmount24m": 100,
            //             "loanApprovalQueryNum1m": 9,
            //             "tongDunLoanBefore": "Y",
            //             "tongDunScore": 330,
            //             "incomeDebtPercent": 25,
            //             "downPaymentPercent": 30,
            //             "farmMachinerySubsidyPercent": 1,
            //             "loanRecord": "2019贷款记录",
            //             "haveLoanRecord": "Y",
            //             "agriculturalLoanYear": 3,
            //             "externalGuaranteePercent": 12,
            //             "lawsuit": "N",
            //             "enforced": "N"
            //         },
            //         "guarantorCreditScoreList": [{
            //                 "id": "201904161637132711000027931048",
            //                 "version": 0,
            //                 "status": null,
            //                 "creator": null,
            //                 "createTime": "2019-04-16 08:37:13",
            //                 "editor": null,
            //                 "editTime": "2019-04-18 10:15:29",
            //                 "remark": null,
            //                 "bussNo": "BUSS_NO_20190411_123456",
            //                 "custId": "guarantor2019041310001",
            //                 "haveCreditReport": "Y",
            //                 "pbcScore": null,
            //                 "overdueNum24m": null,
            //                 "continueOverdueNum24m": 1,
            //                 "overdueMaxAmount24m": 88.99,
            //                 "loanApprovalQueryNum1m": null,
            //                 "tongDunLoanBefore": null,
            //                 "tongDunScore": null,
            //                 "incomeDebtPercent": null,
            //                 "downPaymentPercent": null,
            //                 "farmMachinerySubsidyPercent": null,
            //                 "loanRecord": null,
            //                 "haveLoanRecord": null,
            //                 "agriculturalLoanYear": null,
            //                 "externalGuaranteePercent": null,
            //                 "lawsuit": null,
            //                 "enforced": null
            //             }
            //         ],
            //         "repoCreditScoreList": [{
            //                 "id": "201904161637132951000047951302",
            //                 "version": 0,
            //                 "status": null,
            //                 "creator": null,
            //                 "createTime": "2019-04-16 08:37:13",
            //                 "editor": null,
            //                 "editTime": "2019-04-18 10:15:29",
            //                 "remark": null,
            //                 "bussNo": "BUSS_NO_20190411_123456",
            //                 "custId": "repo2019041310001",
            //                 "haveCreditReport": "Y",
            //                 "pbcScore": null,
            //                 "overdueNum24m": null,
            //                 "continueOverdueNum24m": 2,
            //                 "overdueMaxAmount24m": 1.123,
            //                 "loanApprovalQueryNum1m": null,
            //                 "tongDunLoanBefore": null,
            //                 "tongDunScore": null,
            //                 "incomeDebtPercent": null,
            //                 "downPaymentPercent": null,
            //                 "farmMachinerySubsidyPercent": null,
            //                 "loanRecord": null,
            //                 "haveLoanRecord": null,
            //                 "agriculturalLoanYear": null,
            //                 "externalGuaranteePercent": null,
            //                 "lawsuit": null,
            //                 "enforced": null
            //             }
            //         ],
            //         "decisionCreditScoreResult": {
            //             "id": "201904151447495301000067955355",
            //             "version": 0,
            //             "status": null,
            //             "creator": null,
            //             "createTime": "2019-04-15 06:47:49",
            //             "editor": null,
            //             "editTime": "2019-04-18 10:15:29",
            //             "remark": null,
            //             "bussNo": "BUSS_NO_20190411_123456",
            //             "custId": "person2019041188881113",
            //             "creditId": null,
            //             "totalScore": "80",
            //             "suggestResult": "通过"
            //         },
            //         "decisionCreditScoreResultItem": [{
            //                 "variableName": "资产状况",
            //                 "itemListSize": 3,
            //                 "itemList": [{
            //                         "id": "201904161656473431000017929813",
            //                         "version": 0,
            //                         "status": null,
            //                         "creator": null,
            //                         "createTime": "2019-04-16 08:56:47",
            //                         "editor": null,
            //                         "editTime": "2019-04-18 10:15:29",
            //                         "remark": null,
            //                         "bussNo": "BUSS_NO_20190411_123456",
            //                         "custId": "person2019041188881113",
            //                         "creditId": null,
            //                         "resultId": "201904151447495301000067955355",
            //                         "variableName": "资产状况",
            //                         "itemName": "收入偿债比",
            //                         "itemHit": "低于50%",
            //                         "itemScore": 25
            //                     },
            //                 ]
            //             },
            //             {
            //                 "variableName": "征信状况",
            //                 "itemListSize": 5,
            //                 "itemList": [{
            //                         "id": "201904161656473611000027971760",
            //                         "version": 0,
            //                         "status": null,
            //                         "creator": null,
            //                         "createTime": "2019-04-16 08:56:47",
            //                         "editor": null,
            //                         "editTime": "2019-04-18 10:15:29",
            //                         "remark": null,
            //                         "bussNo": "BUSS_NO_20190411_123456",
            //                         "custId": "person2019041188881113",
            //                         "creditId": null,
            //                         "resultId": "201904151447495301000067955355",
            //                         "variableName": "征信状况",
            //                         "itemName": "最近1个月内的查询机构数",
            //                         "itemHit": "2个及以上",
            //                         "itemScore": 0
            //                     }
            //                 ]
            //             },
            //             {
            //                 "variableName": "对外担保",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656473871000047983296",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:29",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "对外担保",
            //                     "itemName": " ",
            //                     "itemHit": "无",
            //                     "itemScore": 0
            //                 }]
            //             },
            //             {
            //                 "variableName": "基本情况",
            //                 "itemListSize": 3,
            //                 "itemList": [{
            //                         "id": "201904161656474081000057922791",
            //                         "version": 0,
            //                         "status": null,
            //                         "creator": null,
            //                         "createTime": "2019-04-16 08:56:47",
            //                         "editor": null,
            //                         "editTime": "2019-04-18 10:15:29",
            //                         "remark": null,
            //                         "bussNo": "BUSS_NO_20190411_123456",
            //                         "custId": "person2019041188881113",
            //                         "creditId": null,
            //                         "resultId": "201904151447495301000067955355",
            //                         "variableName": "基本情况",
            //                         "itemName": "客户年龄",
            //                         "itemHit": "31-45岁",
            //                         "itemScore": 6
            //                     }
            //                 ]
            //             },
            //             {
            //                 "variableName": "婚姻状况关注项",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656474291000067996118",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:29",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "婚姻状况关注项",
            //                     "itemName": " ",
            //                     "itemHit": "30岁以上未婚",
            //                     "itemScore": -5
            //                 }]
            //             },
            //             {
            //                 "variableName": "保证人",
            //                 "itemListSize": 4,
            //                 "itemList": [{
            //                         "id": "201904161656474571000087919847",
            //                         "version": 0,
            //                         "status": null,
            //                         "creator": null,
            //                         "createTime": "2019-04-16 08:56:47",
            //                         "editor": null,
            //                         "editTime": "2019-04-18 10:15:29",
            //                         "remark": null,
            //                         "bussNo": "BUSS_NO_20190411_123456",
            //                         "custId": "person2019041188881113",
            //                         "creditId": null,
            //                         "resultId": "201904151447495301000067955355",
            //                         "variableName": "保证人",
            //                         "itemName": "农机具机动车",
            //                         "itemHit": " ",
            //                         "itemScore": 0
            //                     }
            //                 ]
            //             },
            //             {
            //                 "variableName": "被执行信息",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656474861000107957025",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:29",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "被执行信息",
            //                     "itemName": " ",
            //                     "itemHit": "无",
            //                     "itemScore": 0
            //                 }]
            //             },
            //             {
            //                 "variableName": "首付比例",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656475041000117929006",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:30",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "首付比例",
            //                     "itemName": " ",
            //                     "itemHit": "无",
            //                     "itemScore": 0
            //                 }]
            //             },
            //             {
            //                 "variableName": "贷款记录",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656476421000147916380",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:30",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "贷款记录",
            //                     "itemName": " ",
            //                     "itemHit": " ",
            //                     "itemScore": 0
            //                 }]
            //             },
            //             {
            //                 "variableName": "农机补贴",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656476701000167994696",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:30",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "农机补贴",
            //                     "itemName": " ",
            //                     "itemHit": "超过农机购置总价每5%一次",
            //                     "itemScore": 0
            //                 }]
            //             },
            //             {
            //                 "variableName": "回购人",
            //                 "itemListSize": 3,
            //                 "itemList": [{
            //                         "id": "201904161656477571000207970629",
            //                         "version": 0,
            //                         "status": null,
            //                         "creator": null,
            //                         "createTime": "2019-04-16 08:56:47",
            //                         "editor": null,
            //                         "editTime": "2019-04-18 10:15:30",
            //                         "remark": null,
            //                         "bussNo": "BUSS_NO_20190411_123456",
            //                         "custId": "person2019041188881113",
            //                         "creditId": null,
            //                         "resultId": "201904151447495301000067955355",
            //                         "variableName": "回购人",
            //                         "itemName": "经销商层级",
            //                         "itemHit": " ",
            //                         "itemScore": 0
            //                     }
            //                 ]
            //             },
            //             {
            //                 "variableName": "增信措施",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656478441000247936415",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:30",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "增信措施",
            //                     "itemName": " ",
            //                     "itemHit": "增信措施4",
            //                     "itemScore": 4
            //                 }]
            //             },
            //             {
            //                 "variableName": "涉诉",
            //                 "itemListSize": 1,
            //                 "itemList": [{
            //                     "id": "201904161656479251000267912179",
            //                     "version": 0,
            //                     "status": null,
            //                     "creator": null,
            //                     "createTime": "2019-04-16 08:56:47",
            //                     "editor": null,
            //                     "editTime": "2019-04-18 10:15:31",
            //                     "remark": null,
            //                     "bussNo": "BUSS_NO_20190411_123456",
            //                     "custId": "person2019041188881113",
            //                     "creditId": null,
            //                     "resultId": "201904151447495301000067955355",
            //                     "variableName": "涉诉",
            //                     "itemName": " ",
            //                     "itemHit": "无",
            //                     "itemScore": 0
            //                 }]
            //             }
            //         ]
            //     }
            // }
            if(res.data.data == null || res.data.data.decisionCreditScoreResult == null || res.data.data.decisionCreditScoreResult == null) {
                return;
            }
            this.tableData = res.data.data.decisionCreditScoreResultItem;
            this.proposaltotalScore = res.data.data.decisionCreditScoreResult.totalScore;
            this.proposalsuggestResult = res.data.data.decisionCreditScoreResult.suggestResult;

        });
        // 1为禁用，2为取消禁用
        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }
    },
    methods: {
        // 点击合同事件push选中的合同编号和名称用于ajax上传
        handelcheckbox(item,index) {
            let a = {
                'templateId': item.id,
                'contractName': item.contractName,
                'contractType': item.contractType
            }
            if(document.getElementById(index).checked == true) {
                this.loanFaceContracts.push(a)
            } else {
                for(let i = 0 ; i < this.loanFaceContracts.length; i++) {
                    if(this.loanFaceContracts[i].templateId == this.loanFaceContracts[i].templateId) {
                        this.loanFaceContracts.splice(i, 1);
                        break;
                    }
                }
            }
        },
        again() {
            // overdue: '', // 最大逾期数
            // overdueNo: '', //累计逾期数
            // oneMonth: '', //一个月
            // overdue: '', // 最大逾期数
            // overdueNo: '', //累计逾期数
            // oneMonth: '', //一个月
            // tongdunQuery: '', //同盾查询
            // tongdunCredit: '' // 同盾信用
            //
            this.$post('/decisionCreditScore/creditGrade',{
                bussNo: this.$route.query.bussNo,
                custId: this.$route.query.custId,
                haveCreditReport: this.radio, //Y/N Y时提交征信类参数, N时提交同盾参数
                overdueNum24m: this.overdue,//最大逾期数
                continueOverdueNum24m: this.overdueNo ,//24个月累计逾期次数
                overdueMaxAmount24m: '0',//24个月内单笔最大逾期金额
                loanApprovalQueryNum1m: this.oneMonth,
                lawsuit: this.value2,//涉诉
                enforced: this.value3, // 被执行信息
                tongDunLoanBefore : this.tongdunQuery,
                tongDunScore: this.tongdunCredit

            }).then(res => {
                // 返回示例
                // {
                //     "bussNo": "BUSS_NO_20190411_123456",
                //     "custId": "person2019041188881113",
                //     "haveCreditReport": "Y",
                //     "pbcScore": "800",
                //     "overdueNum24m": 1,
                //     "continueOverdueNum24m": 1,
                //     "overdueMaxAmount24m": "100.0",
                //     "loanApprovalQueryNum1m": "9",
                //     "tongDunLoanBefore": "Y",
                //     "tongDunScore": "330",
                //     "incomeDebtPercent": "25",
                //     "downPaymentPercent": "30",
                //     "farmMachinerySubsidyPercent": "1",
                //     "loanRecord": "2019贷款记录",
                //     "haveLoanRecord": "Y",
                //     "agriculturalLoanYear": 3,
                //     "externalGuaranteePercent": "12",
                //     "lawsuit": "N",
                //     "enforced": "N",
                //     "guarantorList": [{
                //         "guarantorCustId": "guarantor2019041310001",
                //         "guarantorHaveCreditReport": "Y",
                //         "guarantorContinueOverdueNum24m": "1",
                //         "guarantorOverdueMaxAmount24m": "88.99"
                //     }, {
                //         "guarantorCustId": "guarantor2019041310002",
                //         "guarantorHaveCreditReport": "Y",
                //         "guarantorContinueOverdueNum24m": "1",
                //         "guarantorOverdueMaxAmount24m": "88.99"
                //     }],
                //     "repoList": [{
                //         "repoCustId": "repo2019041310001",
                //         "repoHaveCreditReport": "Y",
                //         "repoContinueOverdueNum24m": "2",
                //         "repoOverdueMaxAmount24m": "1.123"
                //     }, {
                //         "repoCustId": "repo2019041310002",
                //         "repoHaveCreditReport": "Y",
                //         "repoContinueOverdueNum24m": "2",
                //         "repoOverdueMaxAmount24m": "1.123"
                //     }]
                // }
                this.tableData = res.data.data.decisionCreditScoreResultItem;
            });
        },
        // 终审通过包含了保存的功能
        adopt() {
            this.$post('/LoanApprove/submitApprove',{
                bussNo: this.$route.query.bussNo, //单号
                approvalComments: this.radio1, //1同意 0 不同意
                reasonDescription: this.textarea, // 原因描述
                selectContracts: this.loanFaceContracts
            }).then( res => {
                if(res.data.code == '2000000') {
                    this.$router.push({
                        path: '/layout/loadapproval'
                    })
                }
            })
        }
    },
    components: {
        componentitle,
    }
}
</script>
<style lang="less">
.operation {
    .againbutton {
        position: absolute;
        top: 28px;
        right: 15px;
        height: 30px;
        line-height: 0px;
        color: #d76500;
        background: #fff;
        border: 1px solid #ffcb9d;
    }
    .presentation {
        margin: 15px 0;
        i {
            font-size: 16px;
            color: #333;
            font-style: normal;
            margin-right: 10px;
            margin-left: 15px;
            font-weight: bold;
        }
    }
    .nothingshow {
        margin: 15px 0;
        border: 1px solid #afafaf;
        li {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #afafaf;
            width: 100%;
            display: inline-block;
            color: #606266;
            &:last-child {
                border-bottom: 0;
            }
            .lefttext {
                margin-left: 15px;
                text-align: right;
                width: 40%;
                display: inline-block;
                text-align: center;
                border-right: 1px solid #afafaf;
                font-size: 14px;
                color: #212121;
                font-weight: bold;
            }
            .inputinfo {
                width: 50%;
                border: 0;
                margin-left: 20px;
                display: inline-block;
                border-bottom: 1px solid #afafaf;
                padding-left: 10px;
                color: #606266;
            }
        }
    }
    .subone {
        &:last-child {
            margin-bottom: 20px;
        }
        p {
            display: inline-block;
            line-height: 80px;
            color: #333;
            margin-left: 15px;
            font-weight: bold;
            font-size: 16px;
        }
        .contract {
            float: left;
        }
        .textareawidth {
            width: 80%;
            margin-bottom: 10px 0 20px 0;
        }
        .elcheckboxs {
            width: 90%;
            float: left;
            margin-top: 20px;
        }
    }
    .opinionsdiv {
        margin-top: 10px;
    }
    .bottombutton {
        float: right;
        margin: 20px 13% 20px 0;
        .el-button--primary {
            background: #ff8f2b;
            border: 0;
        }
    }
}
.operationtable {
    text-align: center;
    border: 1px solid #EBEEF5;
    color: #909399;
    tr {
        height: 50px;
        line-height: 50px;
        th {
            text-align: center;
        }
    }
}
.checkbox {
    display: inline-block;
    font-size: 14px;
    margin-top: 30px;
    margin-right: 10px;
    input {
        margin-right: 5px;
    }
}
.choiceselect {
    margin-left: 20px;
}
.score {
    margin: 15px 0;
}
</style>
