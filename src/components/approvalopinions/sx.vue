<template>
    <!-- 贷款审批 -->
    <div class="loanval">
        <div class="subone" style="clear:both">
            <p>审批报告：</p>
            <el-button @click="viewreport" class="spreport" type="primary" v-if="haveAgreement">查看调查报告
            </el-button>
            <el-button @click="surveyprot" type="primary" v-if="haveAgreement">生成审批报告</el-button>
            <div class="no-have-aggrement" v-if="!haveAgreement">选择审批意见后，保存或提交可以查看调查报告和审批报告</div>
        </div>
        <div class="subone" style="clear:both;">
            <p class="contract">面签合同：</p>
            <div style="margin-left: 134px;">
                <el-checkbox :checked="true" disabled style="line-height: 60px;"
                             v-for="(item,index) in checkboxlist">{{item.contractName}}
                </el-checkbox>
            </div>
        </div>
        <!-- 贷款审批 -->
        <div class="loanval">
            <div class="subone opinionsdiv" style="clear:both">
                <div class="suboneelinput" style="clear:both">
                    <p class="textdescribe">放款前提条件：</p>
                    <el-input
                            :rows="5"
                            class="textareawidth"
                            disabled
                            placeholder="请输入放款前提条件"
                            type="textarea"
                            v-model="conditions"
                    >
                    </el-input>
                </div>
                <div class="suboneelinput" style="clear:both">
                    <p class="textdescribe">租后管理要求：</p>
                    <el-input
                            :rows="5"
                            class="textareawidth"
                            disabled
                            placeholder="请输入租后管理要求"
                            type="textarea"
                            v-model="requirements"
                    >
                    </el-input>
                </div>
            </div>
            <div class="subone" style="clear:both">
                <p class="textdescribe">意见描述：</p>
                <el-input
                        :rows="3"
                        class="textareawidth"
                        disabled
                        placeholder="请输入内容"
                        type="textarea"
                        v-model="textarea">
                </el-input>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['checkboxlist', 'haveAgreement', 'conditions', 'requirements', 'textarea'],
        methods: {
            // 查看调查报告
            viewreport() {
                window.location.href = (`/web/investReport?bussNo=${this.$route.query.bussNo}&taskType=10`);
            },
            // 查看审批报告
            surveyprot() {
                window.location.href = (`/web/approveReport?bussNo=${this.$route.query.bussNo}&taskType=10`);
            }
        }
    }
</script>
<style lang="less">

    .no-have-aggrement {
        height: 60px;
        line-height: 60px;
    }

</style>
