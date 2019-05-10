<template>
<!-- 评分卡table -->
<div class="">
    <componentitle :message="message='评分卡结果'" />
    <el-button type="primary" class="againbutton" @click="again" :disabled="inputdisabled">重评</el-button>
    <!-- 承租人 -->
    <div class="loanpeopletyle">
        承租人
    </div>
    <div class="presentation">
        <div class="peopletype">
            <span>承租人：{{custName}}</span><i>征信报告：</i>
        </div>
        <div class="buttondiv">
            <span @click="havethe" :class="radio == 'Y' ? 'spanactive' : ''">有</span>
            <span @click="nothing" :class="radio == 'N' ? 'spanactive' : ''">无</span>
        </div>
        <ul class="nothingshow" v-show="radio == 'Y'">
            <li>
                <span class="lefttext">农贷记录年数</span>
                <input
                    type="text"
                    name=""
                    v-model:value="years"
                    class="inputinfo"
                    ref="years"
                    :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">信用卡及贷款24个月最大逾期期数</span>
                <input
                    type="text"
                    name=""
                    v-model:value="overdue"
                    ref="overdue"
                    class="inputinfo"
                    :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">信用卡及贷款24个月累计逾期次数</span>
                <input
                    type="text"
                    name=""
                    v-model:value="overdueNo"
                    ref="overdueNo"
                    class="inputinfo"
                    :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">最近1个月内的查询机构数(贷款审批)</span>
                <input
                    type="text"
                    name=""
                    v-model:value="oneMonth"
                    ref="oneMonth"
                    class="inputinfo"
                    :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">涉诉：</span>
                <el-select
                    v-model="value2"
                    placeholder="请选择"
                    class="choiceselect"
                    :disabled="inputdisabled">
                    <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span class="lefttext">被执行信息：</span>
                <el-select
                    v-model="value3"
                    placeholder="请选择"
                    class="choiceselect"
                    :disabled="inputdisabled">
                    <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span class="lefttext">有无征信：</span>
                <el-select v-model="value4" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
        <ul class="nothingshow" v-show="radio == 'N'">
            <li>
                <span class="lefttext">农贷记录年数</span>
                <input type="text" name="" v-model:value="years" class="inputinfo" :disabled="inputdisabled">
            </li>
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
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span class="lefttext">被执行信息</span>
                <el-select v-model="value3" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
    </div>
    <!-- 承租人end -->

    <!-- 保证人 -->
    <div class="loanpeopletyle">
        保证人
    </div>
    <div class="presentation" v-for="item in guarantor">
        <div class="peopletype">
            <span>保证人：{{item.custName}}</span>
        </div>

        <ul class="nothingshow">
            <li>
                <span class="lefttext">信用卡及贷款24个月内单笔最大逾期金额</span>
                <input type="text" name="" v-model:value="item.largestamount" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">信用卡及贷款24个月累计逾期次数</span>
                <input type="text" name="" v-model:value="item.overdueNo" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">有无征信：</span>
                <el-select v-model="item.value4" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
    </div>
    <!-- 保证人end -->

    <!-- 回购人 -->
    <div class="loanpeopletyle">
        回购人
    </div>
    <div class="presentation" v-for="item in buyback">

        <div class="peopletype">
            <span>回购人：{{item.basicInfo.comFullname}}</span>
        </div>
        <ul class="nothingshow">
            <li>
                <span class="lefttext">信用卡及贷款24个月内单笔最大逾期金额</span>
                <input type="text" name="" v-model:value="item.largestamount" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">信用卡及贷款24个月累计逾期次数</span>
                <input type="text" name="" v-model:value="item.overdueNo" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span class="lefttext">有无征信：</span>
                <el-select v-model="item.value4" placeholder="请选择" class="choiceselect" :disabled="inputdisabled">
                    <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
    </div>
    <!-- 回购人end -->

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
</template>

<script  type="text/ecmascript-6">
import componentitle from '../title/title.vue';
export default {
    data() {
        return {
            tableData: [], //表格
            proposaltotalScore: '', // 评分卡得分展示
            proposalsuggestResult: '', // 评分卡得分结论
            inputdisabled: '',
            custName: '', //储存主承租人名字
            radio: 'Y', // 是否有征信报告
            years: '', // 农贷记录年数
            overdue: '', // 最大逾期数
            overdueNo: '', //累计逾期数
            oneMonth: '', //一个月
            value2: '', // 储存涉诉
            value3: '', // 储存被执行信息
            value4: '', //有无征信
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
            tongdunQuery: '', //同盾查询
            tongdunCredit: '', // 同盾信用,
            guarantor: [], // 保证人
            buyback: [], // 回购人
            lessinfo: [], // 承租人
        }
    },
    created() {
        this.custName = this.$route.query.custName; // 上一页带过来的主承租人姓名
        this.constomerstype(); // 客户类别
        // 1为禁用，2为取消禁用
        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }
        //  表格
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
    },
    methods: {
        //  重评 评分卡功能
        again() {
            // overdue: '', // 最大逾期数
            // overdueNo: '', //累计逾期数
            // oneMonth: '', //一个月
            // overdue: '', // 最大逾期数
            // overdueNo: '', //累计逾期数
            // oneMonth: '', //一个月
            // tongdunQuery: '', //同盾查询
            // tongdunCredit: '' // 同盾信用

            // 承租人
            var lessinfoListData = this.lessinfo.map((info, i) => {
                return {
                    radio : info.radio, // 有无征信报告
                    years : info.info, // 农贷记录年数
                    overdue : info.overdue, // 信用卡及贷款24个月最大逾期期数
                    overdueNo : info.overdueNo, // 信用卡及贷款24个月累计逾期次数
                    oneMonth : info.oneMonth, // 最近1个月内的查询机构数(贷款审批)
                    value2 : info.value2, //涉诉
                    value3 : info.value3, // 被执行信息
                    tongdunQuery : info.tongdunQuery,  //同盾贷前查询
                    tongdunCredit : info.tongdunQuery, //同盾信用评分
                };
            });

            // 保证人
            var guarantorListData = this.guarantor.map((info, i) => {
                return {
                    guarantorContinueOverdueNum24m: info.overdueNo, // 信用卡及贷款24个月累计逾期次数
                    guarantorHaveCreditRecord: info.value4, // 有无征信
                    guarantorOverdueMaxAmount24m: info.largestamount, // 最大逾期金额
                    guarantorCustId: info.id //保证人ID
                };
            });
            // 回购人
            var buybackListData = this.buyback.map((info, i) => {
                return {
                    repoContinueOverdueNum24m: info.overdueNo, // 信用卡及贷款24个月累计逾期次数
                    repoHaveCreditRecord: info.value4, // 有无征信
                    repoOverdueMaxAmount24m: info.largestamount, // 最大逾期金额
                    repoCustId: info.basicInfo.id // 回购人ID
                };
            });
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
                tongDunScore: this.tongdunCredit,
                haveCreditRecord: this.value4, // 有无征信
                guarantorList: guarantorListData, // 保证人
                repoList: buybackListData // 回购人


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
                this.proposaltotalScore = res.data.data.decisionCreditScoreResult.totalScore;
                this.proposalsuggestResult = res.data.data.decisionCreditScoreResult.suggestResult;
            });
        },
        havethe() {
            this.radio = 'Y'
            this.years = '';
            this.tongdunQuery = '';
            this.tongdunCredit = '';
            this.value2 = '';
            this.value3 = '';
        },
        nothing() {
            this.radio = 'N'
            this.years = '';
            this.overdue = '';
            this.overdueNo = '';
            this.oneMonth = '';
            this.value2 = '';
            this.value3 = '';
            this.value4 = '';
        },
        // 客户类别
         constomerstype() {
             // 承租人
             this.$post('/leasee/info',{
                bussNo: this.$route.query.bussNo
             }).then( res => {
                let list = res.data.data.naturalData;
                // if (list.length) {
                //     list.forEach((item,index) => {
                //         item.radio = 'Y'; // 有无征信报告
                //         item.years = ''; // 农贷记录年数
                //         item.overdue = ''; // 信用卡及贷款24个月最大逾期期数
                //         item.overdueNo = ''; // 信用卡及贷款24个月累计逾期次数
                //         item.oneMonth = ''; // 最近1个月内的查询机构数(贷款审批)
                //         item.value2 = ''; //涉诉
                //         item.value3 = ''; // 被执行信息
                //         item.tongdunQuery = '';  //同盾贷前查询
                //         item.tongdunCredit = ''; //同盾信用评分
                //
                //     });
                // }
                this.lessinfo = list;
             });
             // 保证人
             this.$post('/warrantor/info',{
                bussNo: this.$route.query.bussNo
             }).then( res => {
                let list = res.data.data.warrantorData;
                if (list.length) {
                    list.forEach((item,index) => {
                        item.overdueNo = ''; // 信用卡及贷款24个月累计逾期次数
                        item.value4 = ''; // 有无征信
                        item.largestamount = ''; // 最大逾期金额

                    });
                }
                this.guarantor = list;
             });
             // 回购人
             this.$post('/repurchase/info',{
                bussNo: this.$route.query.bussNo
             }).then( res => {
                let list = res.data.data;
                if (list.length) {
                    list.forEach((item,index) => {
                        item.overdueNo = ''; // 信用卡及贷款24个月累计逾期次数
                        item.value4 = ''; // 有无征信
                        item.largestamount = ''; // 最大逾期金额
                    });
                }
                this.buyback = list;
             });
         },
    },
    components: {
        componentitle
    }
}
</script>
<style lang="less">

</style>
