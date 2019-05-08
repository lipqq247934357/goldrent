<template>
<div class="operation">
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
        <!-- <template>
            <el-radio v-model="radio" label="Y" :disabled="inputdisabled">有</el-radio>
            <el-radio v-model="radio" label="N" :disabled="inputdisabled">无</el-radio>
        </template> -->
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

    <componentitle :message="message='审批意见'" />
    <div class="opinion">
        <!-- 贷款审批 -->
        <div class="loanval" v-if="this.$route.query.arrangement == 20">
            <div class="subone" style="clear:both">
                <p>审批报告：</p>
                <el-button type="primary" class="spreport">查看调查报告</el-button>
                <el-button type="primary">生成审批报告</el-button>
            </div>
            <div class="subone" style="clear:both">
                <p class="contract">面签合同：</p>
                <div class="checkbox" v-for="(item,index) in checkboxlist" :class="inputdisabled == true ? 'notallowed' : ''">
                    <input
                        :id="index"
                        type="checkbox"
                        name=""
                        @click="handelcheckbox(item,index)"
                        :class="inputdisabled == true ? 'notallowed' : ''"
                        :disabled="inputdisabled"
                        :value="item.contractName">
                    <span>{{item.contractName}}</span>
                </div>

            </div>
            <div class="subone opinionsdiv" style="clear:both">
                <p>审批意见：</p>
                <template>
                    <el-radio v-model="radio1" label="1" :disabled="inputdisabled">终审同意</el-radio>
                    <el-radio v-model="radio1" label="2" :disabled="inputdisabled">同意业务并提交资深审批</el-radio>
                    <el-radio v-model="radio1" label="3" :disabled="inputdisabled">同意业务并提交会议审批</el-radio>
                    <el-radio v-model="radio1" label="0" :disabled="inputdisabled">否决</el-radio>
                </template>
            </div>
            <div class="subone opinionsdiv" style="clear:both">
                <div class="suboneelinput" style="clear:both">
                    <p>放款前提条件：</p>
                    <el-input placeholder="请输入放款前提条件" class="contentinout" v-model="conditions" :disabled="radio1 == 0 || inputdisabled ? true : false "></el-input>
                </div>
                <div class="suboneelinput" style="clear:both">
                    <p>租后管理要求：</p>
                    <el-input placeholder="请输入租后管理要求" class="contentinout" v-model="requirements" :disabled="radio1 == 0 || inputdisabled ? true : false "></el-input>
                </div>
            </div>
            <div class="subone" style="clear:both">
                <p class="textdescribe">意见描述：</p>
                <el-input
                    type="textarea"
                    class="textareawidth"
                    :rows="3"
                    placeholder="请输入内容"
                    :disabled="inputdisabled"
                    v-model="textarea">
                </el-input>
            </div>
        </div>
        <!-- 贷款审批end -->
        <!-- 上会审议 -->
        <div class="upper" v-if="this.$route.query.arrangement == 22">
            <el-input
                type="textarea"
                class="uppertextareaup"
                :rows="3"
                placeholder="上会审议内容"
                :disabled="inputdisabled"
                v-model="textarea">
            </el-input>
            <componentitle :message="message='上会审议结论'" />
            <p class="uppertext">结论描述：</p>
            <el-input
                type="textarea"
                class="uppertextarea"
                :rows="3"
                placeholder="上会审议内容"
                :disabled="inputdisabled"
                v-model="conclusion">
            </el-input>
        </div>
        <!-- 上会审议 end-->

        <!-- 主任意见 -->
        <div class="upper director" v-if="this.$route.query.arrangement == 23">
            <el-input
                type="textarea"
                class="uppertextareaup"
                :rows="3"
                placeholder="审批提交的意见"
                :disabled="inputdisabled"
                v-model="textarea">
            </el-input>
            <componentitle :message="message='上会审议结论'" />
            <el-input
                type="textarea"
                class="textareawidth"
                :rows="3"
                placeholder="上会审议的结论"
                :disabled="inputdisabled"
                v-model="conclusion">
            </el-input>
            <componentitle :message="message='主任意见'" />
            <p class="uppertext">意见描述：</p>
            <el-input
                type="textarea"
                class="uppertextarea"
                :rows="3"
                placeholder="主任意见描述"
                :disabled="inputdisabled"
                v-model="director">
            </el-input>
        </div>
        <!-- 主任意见end -->
        <!-- 资深审批 -->
        <div class="upper" v-if="this.$route.query.arrangement == 21">
            <el-input
                type="textarea"
                class="uppertextareaup"
                :rows="3"
                placeholder="审批提交的意见"
                :disabled="inputdisabled"
                v-model="textarea">
            </el-input>
            <componentitle :message="message='资深审批意见'" />
            <p class="uppertext">意见描述：</p>
            <el-input
                type="textarea"
                class="uppertextarea"
                :rows="3"
                placeholder="资深内容"
                :disabled="inputdisabled"
                v-model="senior">
            </el-input>
        </div>
        <!-- 资深审批end -->

        <div class="bottombutton">
            <el-button type="primary" @click="save" :disabled="inputdisabled" >保存</el-button>
            <el-button type="primary" @click="adopt" :disabled="inputdisabled">提交</el-button>
            <el-button type="primary" @click="exit" :disabled="inputdisabled">退回</el-button>
        </div>
    </div>

    <!-- 资深审批弹框 -->
    <el-dialog
        title="选择资深审批人"
        :visible.sync="dialogVisible"
        width="30%"
        class="eldiaLog"
        :before-close="handleClose">
        <div class="dialogdiv"
             v-for="(item,index) in rolelist"
             :class="index == departmentindex ? 'avtiveborder' : '' "
             @click="dialogdiv(index)">
            <p class="dialogptitle">{{item.depart_name}}</p>
            <ul class="department">
                <li v-for="(subitem,index) in item.list">
                    <template>
                        <el-radio @change="rolelistchange(subitem.user_name)" v-model="dialoginput" :label="subitem.user_id">{{subitem.user_name}}</el-radio>
                    </template>
                </li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancel">取 消</el-button>
        <el-button type="primary" @click="dialogdetermine">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            conditions: '', // 放款前提条件
            requirements: '', // 租后管理要求
            rolelistName: '', // 角色列表名字
            departmentindex: null, // 用于渲染class
            dialoginput: '', // 弹框input绑定
            dialogVisible: false, // 资深审批弹框绑定
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
            value4: '', //有无征信
            checkboxlist: [], // 面签合同
            loanFaceContracts: [], //储存点击面签合同
            checked: false,
            overdue: '', // 最大逾期数
            overdueNo: '', //累计逾期数
            oneMonth: '', //一个月
            tongdunQuery: '', //同盾查询
            tongdunCredit: '', // 同盾信用,
            years: '', // 农贷记录年数
            rowspanlength: [],
            proposaltotalScore: '', // 评分卡得分展示
            proposalsuggestResult: '', // 评分卡得分结论
            inputdisabled: false,
            upper: '', //上会审议
            director: '', //  主任意见
            senior: '', // 资深审批
            conclusion: '', //上会审议结论
            lessinfo: [
                // {
                //
                // }
            ], // 承租人
            guarantor: [], // 保证人
            buyback: [], // 回购人
            nowurl: '',
            custName: '', //储存主承租人名字
            rolelist: [] // 角色列表
        }
    },
    created() {
        // 获取角色用户列表
        this.$post('/role/queryUserList',{
            parType: "ROLE_PARAMS",
            parCode: "SENIOR_APPROVAL"
        }).then( res => {
            this.rolelist = res.data.data;
        })
        this.custName = this.$route.query.custName;
        this.nowurl = this.$route.query.nowurl; // 获取上一页带过来的路由用于回退到不同的页面
        this.$get(`/LoanApprove/queryApproveDetail?bussNo=${this.$route.query.bussNo}`).then( res => {
            if(res.data.data == null ) {
                return;
            }
            this.checkboxlist = res.data.data.contracts; // 合同
            this.radio1 = res.data.data.approvalComments; //
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
           let list = res.data.data.naturalData;
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
    methods: {
        rolelistchange(name) {
            this.rolelistName = name
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
            });
        },
        // 提交ajax
        submitajax() {
            let role = this.$route.query.arrangement;
            this.$post({
                '20': '',
                '21': '/LoanApprove/seniorApprovalSubmit',
                '22': '/LoanApprove/reviewMeetingSubmit',
                '23': '/LoanApprove/directorOpinionSubmit'
            }[role],{
                bussNo: this.$route.query.bussNo, //单号
                opinion: role == 20 ? this.radio1 : '', //0：否决,1：终审同意 2：同意业务并提交资深审批 3：同意业务并提交会议审批
                // textarea: '' //贷款审批
                // upper: '', //上会审议
                // director: '', //  主任意见
                // senior: '', // 资深审批
                // conclusion: '', //上会审议结论
                reasonDescription: {
                    '20': this.textarea,
                    '21': this.senior,
                    '22': this.conclusion,
                    '23': this.director
                }[role], // 原因描述
                approveUserId: this.dialoginput,
                approveUserName: this.rolelistName,
                selectContracts: this.loanFaceContracts, // 合同数组
                role: String(role) //贷款审批：20 资深审批：21 上会审议：22 主任审批：23
            }).then( res => {
                if(res.data.code == '2000000') {
                    this.$message.success('提交成功');
                    this.$router.push({
                        path: this.nowurl == undefined ? '/layout/loadapproval': this.nowurl
                    })
                }
            })
        },
        // 提交
        adopt() {
            if(this.radio1 == '2') {
                this.dialogVisible = true;
                return;
            }
            this.submitajax();
        },
        //  确定提交
        dialogdetermine() {
            this.submitajax();
        },
        // 退回
        exit() {
            let role = this.$route.query.arrangement;
            this.$post({
                '20': '',
                '21': '/LoanApprove/seniorApprovalReject',
                '22': '/LoanApprove/reviewMeetingReject',
                '23': '/LoanApprove/directorOpinionReject'
            }[role],{
                bussNo: this.$route.query.bussNo, //单号
                opinion: role == 20 ? this.radio1 : '', //0：否决,1：终审同意 2：同意业务并提交资深审批 3：同意业务并提交会议审批
                // textarea: '' //贷款审批
                // upper: '', //上会审议
                // director: '', //  主任意见
                // senior: '', // 资深审批
                // conclusion: '', //上会审议结论
                reasonDescription: {
                    '20': this.textarea,
                    '21': this.senior,
                    '22': this.conclusion,
                    '23': this.director
                }[role], // 原因描述
                selectContracts: this.loanFaceContracts, // 合同数组
                role: String(role) //贷款审批：20 资深审批：21 上会审议：22 主任审批：23
            }).then( res => {
                if(res.data.code == '2000000') {
                    this.$message.success('退回成功');
                    this.$router.push({
                        path: this.nowurl == undefined ? '/layout/loadapproval': this.nowurl
                    })
                }
            })
        },
        // 保存按钮
        save() {
            let role = this.$route.query.arrangement;
            // '/LoanApprove/save'
            this.$post({
                '20': '',
                '21': '/LoanApprove/seniorApprovalSave ',
                '22': '/LoanApprove/reviewMeetingSave',
                '23': '/LoanApprove/directorOpinionSave'
            }[role],{
                bussNo: this.$route.query.bussNo, //单号
                opinion: role == 20 ? this.radio1 : '', //0：否决,1：终审同意 2：同意业务并提交资深审批 3：同意业务并提交会议审批
                // textarea: '' //贷款审批
                // upper: '', //上会审议
                // director: '', //  主任意见
                // senior: '', // 资深审批
                // conclusion: '', //上会审议结论
                reasonDescription: {
                    '20': this.textarea,
                    '21': this.senior,
                    '22': this.conclusion,
                    '23': this.director
                }[role], // 原因描述
                selectContracts: this.loanFaceContracts, // 合同数组
                role: String(role) //贷款审批：20 资深审批：21 上会审议：22 主任审批：23
            }).then( res => {
                return;
                if(res.data.code == '2000000') {
                    this.$message.success('保存成功');
                    this.$router.push({
                        path: this.nowurl == undefined ? '/layout/loadapproval': this.nowurl
                    })
                }
            })
        },
        // 资深审批弹框关闭按钮
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        // 弹框选择人物渲染class
        dialogdiv(val) {
            this.departmentindex = val;
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
        .peopletype {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            color: #333;
            margin-left: 15px;
        }

    }
    .loanpeopletyle {
        background: #f5f5f5;
        margin: 10px 0 20px 0;
        position: relative;
        height: 40px;
        line-height: 40px;
        border: 1px solid #afafaf;
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    .nothingshow {
        margin: 15px 0;
        border: 1px solid #afafaf;
        font-size: 0;
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
                height: 30px;
                margin-left: 20px;
                display: inline-block;
                border-bottom: 1px solid #afafaf;
                padding-left: 10px;
                color: #606266;
                font-size: 14px;
            }
        }
    }
    .subone {
        .spreport {
            background: rgb(67,68,140);
            border: 1px solid rgb(67,68,140);
            margin-top:10px;
        }
        &:last-child {
            margin-top: 20px;
        }
        .suboneelinput {
            margin-top: 10px;
            .contentinout {
                width: 80%;
            }
        }

        .textdescribe {
            line-height: normal;
            height: 75px;
        }
        &:last-child {
            margin-bottom: 20px;
        }
        p {
            float: left;
            line-height: 60px;
            color: #333;
            margin-left: 15px;
            font-weight: bold;
            font-size: 16px;
            min-width: 120px;
            text-align: right;
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
        line-height: 60px;
    }
    .bottombutton {
        float: right;
        margin: 20px 0 20px 0;
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
    margin-right: 10px;
    line-height: 60px;
    color: #606266;
    input {
        margin-right: 5px;
    }
}
.notallowed {
    color: #C0C4CC;
    cursor: not-allowed;
}
.choiceselect {
    margin-left: 20px;
}
.score {
    margin: 15px 0;
}
.upper {
    .uppertext {
        float: left;
        margin-top: 15px;
    }
    .uppertextareaup {
        margin-top: 15px;
    }
    .uppertextarea {
        width: 93%;
        float: right;
        margin-top: 15px;
    }
}
.eldiaLog {
    .el-dialog__header {
        border-bottom: 1px solid #e5e5e5;
    }
    .el-dialog__body {
        padding-top: 0;
    }
    .dialogdiv {
        margin-top: 20px;
        .dialogptitle {
            font-size: 14px;
            color: #333;
            background: #f5f5f5;
            height: 30px;
            line-height: 30px;
            border: 1px solid #e5e5e5;
            padding-left: 14px;
        }
        .department {
            border: 1px solid #e5e5e5;
            overflow: hidden;
            border-top: 0;
            li {
                height: 40px;
                line-height: 40px;
                padding-left: 45px;
                .el-radio__label {
                    padding-left: 30px;
                }
                .el-radio__input.is-checked+.el-radio__label {
                    color: #d76500;
                }
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #d76500;
                    background: #d76500;
                }
            }
        }
    }
    .avtiveborder {
        .dialogptitle {
            background: #fff3e9;
            color: #d76500;
        }
        .department {
            border: 1px solid #ffcb9d;
            overflow: hidden;
            border-top: 0;
        }
    }
    .dialog-footer {
        .el-button {
            height: 30px;
            line-height: 0px;
            background: #d76500;
            border: 0;
            color: #fff;
        }
        .cancel {
            background: #fff3e9;
            color: #d76500;
        }
    }
}
.buttondiv {
    // background: url('./loanbutton.png') no-repeat;
    // background-position: center;
    // background-size: cover;
    border: 1px solid  #afafaf;
    width: 102px;
    height: 25px;
    display: inline-block;
    color: #a3a3a3;
    border-radius: 2px;
    span {
        display: inline-block;
        width: 50%;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
    }
    .spanactive {
        background: #ff8f2b;
        color: #fff;
    }
}

</style>
