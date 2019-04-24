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
                <span>信用卡及贷款24个月最大逾期期数：</span>
                <input type="text" name="" v-model:value="overdue" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span>信用卡及贷款24个月累计逾期次数：</span>
                <input type="text" name="" v-model:value="overdueNo" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span>最近1个月内的查询机构数(贷款审批)：</span>
                <input type="text" name="" v-model:value="oneMonth" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span>涉诉：</span>
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
                <span>被执行信息：</span>
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
                <span>同盾贷前查询：</span>
                <input type="text" name="" v-model:value="tongdunQuery" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span>同盾信用评分：</span>
                <input type="text" name="" v-model:value="tongdunCredit" class="inputinfo" :disabled="inputdisabled">
            </li>
            <li>
                <span>涉诉：</span>
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
                <span>被执行信息：</span>
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
        <h3>累计得分：<span>{{proposaltotalScore}}</span> <span>{{proposalsuggestResult}}</span> </h3>
        <table style="width: 100%" border="1">
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
            <el-button type="primary">查看调查报告</el-button>
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
            radio: 'Y',
            radio1: '',
            tableData: [],
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
            value2: '',
            value3: '',
            checkboxlist: [],
            loanFaceContracts: [],
            checked: false,
            overdue: '', // 最大逾期数
            overdueNo: '', //累计逾期数
            oneMonth: '', //一个月
            tongdunQuery: '', //同盾查询
            tongdunCredit: '', // 同盾信用,
            rowspanlength: [],
            proposaltotalScore: '',
            proposalsuggestResult: '',
            inputdisabled: false
        }
    },
    created() {
        this.$get(`/LoanApprove/queryApproveDetail?bussNo=${this.$route.query.bussNo}`).then( res => {
            // console.log(res,':::::::');
            if(res.data.data == null ) {
                return;
            }
            this.checkboxlist = res.data.data.allContracts;
            this.radio1 = res.data.data.approvalComments;
            this.textarea = res.data.data.reasonDescription;
        });
        this.$get(`/decisionCreditScore/queryCreditScore?bussNo=${this.$route.query.bussNo}&custId=${this.$route.query.custId}`,{
        }).then(res => {
            if(res.data.data == null || res.data.data.decisionCreditScoreResult == null || res.data.data.decisionCreditScoreResult == null) {
                return;
            }
            this.tableData = res.data.data.decisionCreditScoreResultItem;
            this.proposaltotalScore = res.data.data.decisionCreditScoreResult.totalScore;
            this.proposalsuggestResult = res.data.data.decisionCreditScoreResult.suggestResult;

        });

        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }
    },
    methods: {
        handelcheckbox(item,index) {
            let a = {
                'templateId': item.id,
                'contractName': item.contractName,
                'contractType': item.contractType
            }
            if(document.getElementById(index).checked == true) {
                this.loanFaceContracts.push(a)
                console.log(this.loanFaceContracts);
            } else {
                for(let i = 0 ; i < this.loanFaceContracts.length; i++) {
                    if(this.loanFaceContracts[i].templateId == this.loanFaceContracts[i].templateId) {
                        this.loanFaceContracts.splice(i, 1);
                        console.log(this.loanFaceContracts);
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
                this.tableData = res.data.data.decisionCreditScoreResultItem;
            });
        },
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
        top: 7px;
        right: 15px;
    }
    .presentation {
        margin: 15px;
        i {
            font-size: 14px;
            color: #f68e58;
            font-style: normal;
            margin-right: 10px;
        }
    }
    .nothingshow {
        margin: 15px;
        border: 1px solid #EBEEF5;
        li {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #EBEEF5;
            width: 50%;
            display: inline-block;
            color: #606266;
            &:last-child {
                border-bottom: 0;
            }
            span {
                margin-left: 15px;
                text-align: right;
            }
            .inputinfo {
                width: 90px;
                border: 0;
                border-bottom: 1px solid #EBEEF5;
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
            color: #f68e58;
            margin-left: 15px;
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
            background: #f68e58;
            border: 0;
        }
    }
}
table {
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
</style>
