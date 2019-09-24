<template>
<div class="loanmoneycomp">
    <!--    收款账户信息-->
    <componentitle :message="message='收款账户信息'" class="componentitle"/>
    <ul class="factorlist">
        <li>
            <span>收款类型</span>
            <span>{{payeeAccount.receiptType && payeeAccount.receiptType === 'public' ?'对公':'对私'}}</span>
        </li>
        <li>
            <span>账户名称</span>
            <span>{{payeeAccount.receiptAccountName}}</span>
        </li>
        <li>
            <span>身份证号（如有）</span>
            <span>{{payeeAccount.certNo}}</span>
        </li>
        <li>
            <span>银行卡号</span>
            <span>{{payeeAccount.receiptAccount}}</span>
        </li>
        <li>
            <span>开户银行</span>
            <span>{{payeeAccount.receiptAccountBank}}</span>
        </li>
        <li>
            <span>租赁物唯一识别号</span>
            <span>{{leaseData.serialNumber}}</span>
        </li>
        <li>
            <span>识别号类型</span>
            <span>{{serialNumberTypeEnum[leaseData.serialNumberType]}}</span>
        </li>
    </ul>

    <div class="div3">
        <componentitle :message="message='放款审批'"/>
        <div class="imgbox" v-for="value in imgFile">
            <h3>{{value.nodeName}}</h3>
            <ul>
                <imgLine :bussNo="bussNo" relationId="ASSIGN_MATERIAL" v-for="(val,key,index) in value.nodes"
                         :index="index" :name="val" :type="key" />
            </ul>
        </div>
    </div>

    <!-- 审批意见流水   -->
    <approvallist/>

    <componentitle :message="message='放款审批意见'"/>
    <div class="subone" style="clear:both">
        <p class="titleloantext">审批报告：</p>
        <el-button @click="viewreport" class="spreport" type="primary">查看调查报告</el-button>
        <el-button @click="surveyprot" type="primary">生成审批报告</el-button>
    </div>
    <div class="subone opinionsdiv" style="clear:both">
        <p class="titleloantext">后补信息：</p>
        <template>
            <el-radio :disabled="inputdisabled || arrangement == 6" label="Y" v-model="radio2">需要</el-radio>
            <el-radio :disabled="inputdisabled || arrangement == 6" label="N" v-model="radio2">不需要</el-radio>
        </template>
    </div>
    <div class="subone opinionsdiv" style="clear:both">
        <p class="titleloantext" style="line-height:normal;">后补信息描述：</p>
        <el-input
            type="textarea"
            :disabled="radio2 == 'N' || inputdisabled || arrangement == 6"
            v-model="postFillDescription"
            :rows="3"
            class="postFillDescription"
            placeholder="请输入内容">
        </el-input>
    </div>
    <div class="subone opinionsdiv" style="clear:both">
        <p class="titleloantext">审批意见：</p>
        <template>
            <el-radio :disabled="inputdisabled || arrangement == 6" label="1" v-model="radio1">同意</el-radio>
            <el-radio :disabled="inputdisabled || arrangement == 6" label="0" v-model="radio1">不同意</el-radio>
        </template>
    </div>
    <div class="subone opinionsdiv" style="clear:both;margin-top:10px;">
        <p class="titleloantext" style="line-height:normal;">原因描述：</p>
        <el-input
            :disabled="inputdisabled || arrangement == 6"
            :rows="3"
            class="uppertextarea"
            placeholder="请输入原因描述"
            type="textarea"
            v-model="describewhy">
        </el-input>
    </div>

    <!-- 底部按钮 -->
    <div class="bottombutton" style="clear:both" v-if="arrangement == 5">
        <el-button :disabled="inputdisabled" @click="save" type="primary" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
        <el-button :disabled="inputdisabled" @click="adopt" type="primary" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
        <!-- <el-button type="primary" @click="exit" :disabled="inputdisabled">退回</el-button> -->
    </div>


    <div class="bottombutton" style="clear:both" v-if="arrangement == 6">
        <el-button :disabled="inputdisabled" @click="agreeOrBack(1)" type="primary" v-loading.fullscreen.lock="fullscreenLoading">同意</el-button>
        <el-button :disabled="inputdisabled" @click="agreeOrBack(0)" type="primary" v-loading.fullscreen.lock="fullscreenLoading">退回</el-button>
        <!-- <el-button type="primary" @click="exit" :disabled="inputdisabled">退回</el-button> -->
    </div>
    <!-- 底部按钮end -->
</div>
</template>

<script type="text/ecmascript-6">
import componentitle from '../title/title.vue';
import imgLine from '../../views/loanapproval/item/imgLine.vue';
import {urlParse} from "../../utils/utils";
import approvallist from '../../components/approvallist/approvallist.vue'; //

export default {
    data() {
        return {
            message: '',
            imgFile: [],
            id: '',
            bussNo: '', // 订单号
            radio1: '', // 同意不同意
            inputdisabled: '', // 判断是否是可编辑状态
            describewhy: '', // 原因描述
            radio2: '', // 后补租赁物识别号
            payeeAccount: {}, // 收款账户信息
            leaseData: {}, // 收款信息第二部分
            serialNumberTypeEnum:{}, // 识别号类型字典
            arrangement: '',
            saveStatus: false,
            submitStatus: false,
            postFillDescription: '农机唯一识别号、唯一识别号类型、发票、合格证、购机合同”，”其他补充材料', //后补信息描述
            textAreaChange: '',
            fullscreenLoading: false // element ui  指令式loading
        }
    },
    created() {
        this.arrangement = this.$route.query.arrangement;
        this.bussNo = this.$route.query.bussNo;
        this.$post('/materialTree', {
            materialType: 'ASSIGN_MATERIAL'
        }).then(res => {
            let treeInfo = res.data.data.ASSIGN_MATERIAL;
            let tempArr = [];
            Object.keys(treeInfo).forEach((key) => {
                tempArr.push(treeInfo[key]);
            });
            this.imgFile = tempArr;
        })
        if (this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }

        this.$get(`/LoanGrantOpinion/queryLoanGrantDetail?bussNo=${this.$route.query.bussNo}`).then(res => {
            if (res.data.code == '2000000') {
                // console.log(res);
                this.describewhy = res.data.data.reasonDescription;
                if (this.describewhy) {// save之后进入页面，原因展示以前写的内容
                    this.saveStatus = true;
                }
                this.radio2 = res.data.data.needSupplement;
                this.radio1 = res.data.data.approvalComments;
                this.postFillDescription = res.data.data.supplementDesc;
                this.textAreaChange = res.data.data.supplementDesc;
                console.log(this.postFillDescription);
            }
        });

        //  字段编码
        this.$post('/getConstantConfig', {
            dictionaryCode: ['serialNumberType']
        }).then(res => {
            var resData = res.data.data;
            let obj = {};
            resData.serialNumberType.forEach((item) => {
                obj[item.optionCode] = item.optionName;
            });
            this.serialNumberTypeEnum = obj;
        });

        // 获取收款账户信息
        this.$post(`/contractclause/info`, {bussNo: this.$route.query.bussNo}).then(res => {
            if (res.data.code == '2000000') {
                this.payeeAccount = res.data.data.clauseData;
                this.leaseData = res.data.data.leaseData;
            }
        });
    },
    watch: {
        radio1: function (newVal) {
            if (this.inputdisabled || this.arrangement == 6) {
            } else if (this.saveStatus) {
                this.saveStatus = false;
            } else {
                if (newVal == 1) {
                    this.describewhy = '同意';
                } else {
                    this.describewhy = '';
                }
            }
        },
        radio2: function(val) {
            if(val == 'Y') {
                if(!this.textAreaChange) {
                    this.postFillDescription = '农机唯一识别号、唯一识别号类型、发票、合格证、购机合同，其他补充材料';
                } else {
                    this.postFillDescription = this.textAreaChange;
                }
                // if(this.textAreaChange != null) {
                //     this.postFillDescription = this.textAreaChange;
                // } else {
                //     this.postFillDescription = this.textAreaChange = '农机唯一识别号、唯一识别号类型、发票、合格证、购机合同”，”其他补充材料';
                // }
                // this.postFillDescription = '农机唯一识别号、唯一识别号类型、发票、合格证、购机合同”，”其他补充材料';
            } else {
                this.textAreaChange = this.postFillDescription;
                this.postFillDescription = '';

            }
        }
    },
    methods: {
        // 查看调查报告
        viewreport() {
            window.location.href = (`/web/investReport?bussNo=${this.$route.query.bussNo}&taskType=30`);
        },
        // 生成审批报告
        surveyprot() {
            window.location.href = (`/web/approveReport?bussNo=${this.$route.query.bussNo}&taskType=30`);
        },
        // 保存
        save() {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            if (this.submitStatus)
                return;
            this.submitStatus = true;
            this.$post('/LoanGrantOpinion/saveGrant', {
                supplementDesc: this.postFillDescription,
                bussNo: this.$route.query.bussNo,
                approvalComments: this.radio1,
                reasonDescription: this.describewhy,
                needSupplement: this.radio2
            }).then(res => {
                this.submitStatus = false;
                if (res.data.code == '2000000') {
                    this.$message.success('保存成功');
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.$router.push({
                        path: '/layout/loanmoney',
                        query: {
                            idJurisdiction: this.$route.query.idJurisdiction
                        }
                    })
                } else {
                    setTimeout(function() {
                        loading.close();
                    },200);
                }
            });
        },
        // 提交
        adopt() {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            if (this.submitStatus)
                return;
            this.submitStatus = true;
            this.$post('/LoanGrantOpinion/submitApprove', {
                supplementDesc: this.postFillDescription,
                bussNo: this.$route.query.bussNo,
                approvalComments: this.radio1,
                reasonDescription: this.describewhy,
                needSupplement: this.radio2
            }).then(res => {
                this.submitStatus = false;
                if (res.data.code == '2000000') {
                    this.$message.success('通过');
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.$router.push({
                        path: '/layout/loanmoney',
                        query: {
                            idJurisdiction: this.$route.query.idJurisdiction
                        }
                    })
                } else {
                    setTimeout(function() {
                        loading.close();
                    },200);
                }
            });
        },
        // 同意或者退回
        agreeOrBack(val) {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            if (this.submitStatus)
                return;
            this.submitStatus = true;
            this.$post('/LoanGrantOpinion/submitApproveReview', {
                bussNo: this.$route.query.bussNo,
                approvalComments: val,
                needSupplement: this.radio2
            }).then(res => {
                this.submitStatus = false;
                if (res.data.code == '2000000') {
                    this.$message.success('通过');
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.$router.push({
                        path: '/layout/loanmoneyre',
                        query: {
                            idJurisdiction: this.$route.query.idJurisdiction
                        }
                    })
                } else {
                    setTimeout(function() {
                        loading.close();
                    },200);
                }
            });
        }
    },
    components: {
        imgLine,
        componentitle,
        approvallist
    }
}
</script>
<style lang="less">
.loanmoneycomp {
    .subone {
        .titleloantext {
            min-width: 145px;
        }
        .postFillDescription {
            width: calc(100% - 160px);

        }
    }

    .div3 {
        margin-top: 10px;

        .imgbox {
            clear: both;

            .imglist {
                margin-top: 16px;
            }

            h3 {
                font-size: 16px;
                background: #f5f5f5;
                line-height: 40px;
                padding-left: 15px;
                border-left: 1px solid #afafaf;
                border-right: 1px solid #afafaf;
            }

            .imgeslist {
                img {
                    float: left;
                    margin-left: 15px;
                }
            }

            ul {
                width: 99.8%;
                margin: -1px auto 0;
                border: 1px solid #afafaf;
                clear: both;

                &:last-child {
                    /*margin-bottom: 30px;*/
                }

                li {
                    width: 100%;
                    text-align: center;
                    clear: both;
                    border-bottom: 1px solid #afafaf;
                    overflow: hidden;
                    position: relative;
                    min-height: 134px;

                    &:last-child {
                        border-bottom: 0;
                    }
                }
            }
        }
    }

    .uppertextarea {
        width: calc(100% - 160px);
        float: right;
    }
}

.el-button--primary.is-disabled {
    background: #ff8f2b !important;
    border: 0 !important;
}

</style>
