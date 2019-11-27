<template>
    <div>
        <!-- 审批意见组件 -->
        <componentitle :message="message='审批意见'" v-if="this.$route.query.arrangement === 20"/>
        <componentitle :message="message='授信审批意见'" v-else/>
        <div class="opinion">
            <!-- 贷款审批 -->
            <div class="loanval" v-if="this.$route.query.arrangement == 20">
                <div class="subone" style="clear:both">
                    <p>审批报告：</p>
                    <el-button @click="viewreport" class="spreport" type="primary" v-if="haveAgreement">查看调查报告
                    </el-button>
                    <el-button @click="surveyprot" type="primary" v-if="haveAgreement">生成审批报告</el-button>
                    <div class="no-have-aggrement" v-if="!haveAgreement">选择审批意见后，保存或提交可以查看调查报告和审批报告</div>
                </div>
                <div class="subone" style="clear:both;">
                    <p class="contract">面签合同：</p>
                    <!-- <div class="checkbox" v-for="(item,index) in checkboxlist" :class="inputdisabled == true ? 'notallowed' : ''">
                        <input
                            :id="index"
                            type="checkbox"
                            disabled
                            checked
                            @click="handelcheckbox(item,index)"
                            v-model="checkedNames"
                            :class="inputdisabled == true ? 'notallowed' : ''"
                            :value="item.contractName">
                        <span>{{item.contractName}}</span>
                    </div> -->
                    <div style="margin-left: 134px;">
                        <el-checkbox :checked="true" disabled style="line-height: 60px;"
                                     v-for="(item,index) in checkboxlist">{{item.contractName}}
                        </el-checkbox>
                    </div>
                </div>
                <div class="subone opinionsdiv" style="clear:both">
                    <p>审批意见：</p>
                    <template>
                        <el-radio :disabled="inputdisabled" label="1" v-model="radio1">终审同意</el-radio>
                        <!-- <el-radio v-model="radio1" label="1" :disabled="inputdisabled">退回主办</el-radio> -->
                        <el-radio :disabled="inputdisabled" label="2" v-model="radio1">同意业务并提交资深审批</el-radio>
                        <el-radio :disabled="inputdisabled" label="3" v-model="radio1">同意业务并提交秘书审批</el-radio>
                        <el-radio :disabled="inputdisabled" label="0" v-model="radio1">否决</el-radio>
                        <el-radio :disabled="inputdisabled" label="4" v-model="radio1">退回</el-radio>
                    </template>
                </div>
                <div class="subone opinionsdiv" style="clear:both">
                    <div class="suboneelinput" style="clear:both">
                        <p class="textdescribe">放款前提条件：</p>
                        <el-input
                                :disabled="radio1 == '0' || radio1 == '4' || inputdisabled ? true : false"
                                :rows="5"
                                class="textareawidth"
                                placeholder="请输入放款前提条件"
                                type="textarea"
                                v-model="conditions"
                        >
                        </el-input>
                    </div>
                    <div class="suboneelinput" style="clear:both">
                        <p class="textdescribe">租后管理要求：</p>
                        <el-input
                                :disabled="radio1 == '0' || radio1 == '4' || inputdisabled  ? true : false"
                                :rows="5"
                                class="textareawidth"
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
                            :disabled="inputdisabled"
                            :rows="3"
                            class="textareawidth"
                            placeholder="请输入内容"
                            type="textarea"
                            v-model="textarea">
                    </el-input>
                </div>
            </div>
            <!-- 贷款审批end -->
            <!-- 上会审议 -->
            <div class="upper" v-if="this.$route.query.arrangement == 22">
                <xs
                        :checkboxlist="checkboxlist"
                        :conditions="conditions"
                        :haveAgreement="haveAgreement"
                        :requirements="requirements"
                        :textarea="textarea"></xs>
                <componentitle :message="message='上会审议结论'"/>
                <p class="uppertext">结论描述：</p>
                <el-input
                        :disabled="inputdisabled"
                        :rows="3"
                        class="uppertextarea"
                        placeholder="上会审议内容"
                        type="textarea"
                        v-model="conclusion">
                </el-input>
            </div>
            <!-- 上会审议 end-->

            <!-- 主任意见 -->
            <div class="upper director" v-if="this.$route.query.arrangement == 23">
                <xs
                        :checkboxlist="checkboxlist"
                        :conditions="conditions"
                        :haveAgreement="haveAgreement"
                        :requirements="requirements"
                        :textarea="textarea"></xs>
                <componentitle :message="message='上会审议结论'"/>
                <el-input
                        :rows="3"
                        class="uppertextareaup"
                        disabled
                        placeholder="上会审议的结论"
                        type="textarea"
                        v-model="conclusion">
                </el-input>
                <componentitle :message="message='主任意见'"/>
                <p class="uppertext">意见描述：</p>
                <el-input
                        :disabled="inputdisabled"
                        :rows="3"
                        class="uppertextarea"
                        placeholder="主任意见描述"
                        type="textarea"
                        v-model="director">
                </el-input>
            </div>
            <!-- 主任意见end -->
            <!-- 资深审批 -->
            <div class="upper" v-if="this.$route.query.arrangement == 21">
                <xs
                        :checkboxlist="checkboxlist"
                        :conditions="conditions"
                        :haveAgreement="haveAgreement"
                        :requirements="requirements"
                        :textarea="textarea"></xs>
                <componentitle :message="message='资深审批意见'"/>
                <div class="subone">
                    <div class="suboneelinput" style="clear:both">
                        <p class="textdescribe">放款前提条件：</p>
                        <el-input
                                :disabled="inputdisabled"
                                :rows="5"
                                class="textareawidth"
                                placeholder="请输入放款前提条件"
                                type="textarea"
                                v-model="loanPrecondition"
                        >
                        </el-input>
                    </div>
                    <div class="suboneelinput" style="clear:both">
                        <p class="textdescribe">租后管理要求：</p>
                        <el-input
                                :disabled="inputdisabled"
                                :rows="5"
                                class="textareawidth"
                                placeholder="请输入租后管理要求"
                                type="textarea"
                                v-model="postRentManage"
                        >
                        </el-input>
                    </div>
                    <div style="margin-top: 10px;">
                        <p class="textdescribe">意见描述：</p>
                        <el-input
                                :disabled="inputdisabled"
                                :rows="3"
                                class="textareawidth"
                                placeholder="资深内容"
                                type="textarea"
                                v-model="senior">
                        </el-input>
                    </div>
                </div>
            </div>
            <!-- 资深审批end -->

            <div class="bottombutton">
                <el-button :disabled="inputdisabled" @click="save" type="primary"
                           v-loading.fullscreen.lock="fullscreenLoading">保存
                </el-button>
                <el-button :disabled="inputdisabled" @click="adopt" type="primary"
                           v-loading.fullscreen.lock="fullscreenLoading">{{this.$route.query.arrangement == '23' ? '同意':
                    '提交'}}
                </el-button>
                <el-button :disabled="inputdisabled" @click="exit" type="primary"
                           v-if="this.$route.query.arrangement != '20'" v-loading.fullscreen.lock="fullscreenLoading">退回
                </el-button>
                <el-button :disabled="inputdisabled" @click="exitSponsor" type="primary"
                           v-if="this.$route.query.arrangement == '20'" v-loading.fullscreen.lock="fullscreenLoading">
                    退回主办
                </el-button>
            </div>

            <el-dialog
                    :before-close="handleClose"
                    :visible.sync="dialogVisible"
                    class="eldiaLog"
                    title="选择资深审批人"
                    width="30%">
                <div :class="index == departmentindex ? 'avtiveborder' : '' "
                     @click="dialogdiv(index)"
                     class="dialogdiv"
                     v-for="(item,index) in rolelist">
                    <p class="dialogptitle">{{item.depart_name}}</p>
                    <ul class="department">
                        <li v-for="(subitem,index) in item.list">
                            <template>
                                <el-radio :label="subitem.user_id" @change="rolelistchange(subitem.user_name)"
                                          v-model="dialoginput">{{subitem.user_name}}
                                </el-radio>
                            </template>
                        </li>
                    </ul>
                </div>
                <span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false" class="cancel">取 消</el-button>
                <el-button @click="dialogdetermine" type="primary">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import componentitle from '../title/title.vue';
    import xs from './sx'

    export default {
        data() {
            return {
                textarea: '', //文本域绑定
                arrangementtype: '', //当前的角色形式
                disabledtextarea: '', // 贷款审批展示文字
                conditions: '', // 放款前提条件
                requirements: '', // 租后管理要求
                rolelistName: '', // 角色列表名字
                senior: '',
                conclusion: '', //上会审议结论
                director: '', //  主任意见
                loanPrecondition: '', // 放款前提条件-资深审批
                postRentManage: '', // 租后管理要求-资深审批
                dialoginput: '', // 弹框input绑定
                loanFaceContracts: [], //储存点击面签合同
                checkboxlist: [], // 面签合同
                inputdisabled: false,
                radio1: '',
                dialogVisible: false, // 资深审批弹框绑定
                rolelist: [], // 角色列表
                departmentindex: null, // 用于渲染class
                checkList: [],
                haveAgreement: false, // 是否已经提交或者保存了审批意见
                submitStatus: false,
                fullscreenLoading: false,
            }
        },
        watch: {
            checkboxlist: function (val) {
                this.loanFaceContracts.length = 0
                val.forEach((element, index) => {
                    this.handelcheckbox(element, index)
                })
            },
            radio1: function (val) {
                if (val === '0' || val === '4') {
                    this.requirements = this.conditions = '';
                }
            }
        },
        created() {
            // 1为不可编辑 2位可以编辑
            if (this.$route.query.disabled == 1) {
                this.inputdisabled = true;
            } else {
                this.inputdisabled = false;
            }
            this.nowurl = this.$route.query.nowpath; // 获取上一页带过来的路由用于回退到不同的页面
            // 获取角色用户列表
            this.$post('/role/queryUserList', {
                parType: "ROLE_PARAMS",
                parCode: "SENIOR_APPROVAL"
            }).then(res => {
                this.rolelist = res.data.data;
            });
            // 合同列表 审批意见和描述
            this.$get(`/LoanApprove/queryApproveDetail?bussNo=${this.$route.query.bussNo}`).then(res => {

                if (res.data.data && res.data.data.approvalComments && res.data.data.approvalComments != 'undefined') { // 有值
                    this.haveAgreement = true;
                } else { // 没有值
                    this.haveAgreement = false;
                }

                if (res.data.data == null) {
                    return;
                }
                this.checkboxlist = res.data.data.contracts; // 合同
                this.conditions = res.data.data.loanPrecondition
                this.requirements = res.data.data.postRentManage
                this.conditions = res.data.data.loanPrecondition
                this.requirements = res.data.data.postRentManage
                if (this.$route.query.arrangement == '20') {
                    this.radio1 = String(res.data.data.approvalComments); // 审批意见
                }

                this.textarea = res.data.data.reasonDescription; // 意见
                for (let i = 0; i < this.checkboxlist.length; i++) {
                    let a = {
                        'templateId': this.checkboxlist[i].templateId,
                        'contractName': this.checkboxlist[i].contractName,
                        'contractType': this.checkboxlist[i].contractType,
                        'relationId': this.checkboxlist[i].relationId
                    }
                    this.checkList.push(a);
                }
            });
            this.textareinput(); //资深 上会 主任审批需要展示的内容
        },
        methods: {
            // 退回主办
            exitSponsor() {
                this.$post('/LoanApprove/backToSponsor', {
                    bussNo: this.$route.query.bussNo,
                    reasonDescription: this.textarea,
                }).then(res => {
                    if (res.data.code == '2000000') {
                        this.$message.success('退回成功');
                        this.$router.push({
                            path: this.nowurl == undefined ? '/layout/loadapproval' : this.nowurl
                        })
                    }
                });
            },
            textareinput() {
                //贷款审批：20 资深审批：21 上会审议：22 主任审批：23
                let roletype = this.$route.query.arrangement;
                this.arrangementtype = this.$route.query.arrangement;
                if (roletype != 20) {
                    this.$post('/LoanApprove/queryLoanApprovalDetail', {
                        bussNo: this.$route.query.bussNo
                    }).then(res => {
                        if (JSON.stringify(res.data.data)) {
                            if (JSON.stringify(res.data.data.taskType20)) {
                                this.disabledtextarea = res.data.data.taskType20.reasonDescription;
                            }
                            if (JSON.stringify(res.data.data.taskType23)) {
                                this.director = res.data.data.taskType23.reasonDescription;
                            }
                            if (JSON.stringify(res.data.data.taskType21)) {
                                this.senior = res.data.data.taskType21.reasonDescription;
                                this.loanPrecondition = res.data.data.taskType21.loanPrecondition;
                                this.postRentManage = res.data.data.taskType21.postRentManage;
                            }
                            if (JSON.stringify(res.data.data.taskType22)) {
                                this.conclusion = res.data.data.taskType22.reasonDescription;
                            }
                        }

                    });
                }
            },
            // 提交ajax
            submitajax() {

                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let role = this.$route.query.arrangement;

                if (!this.validateDesc()) {
                    return;
                }

                if (this.submitStatus)
                    return;
                this.submitStatus = true;

                this.timer = setTimeout(function () {
                }, 300);
                this.$post({
                    '20': '/LoanApprove/submitApprove',
                    '21': '/LoanApprove/seniorApprovalSubmit',
                    '22': '/LoanApprove/reviewMeetingSubmit',
                    '23': '/LoanApprove/directorOpinionSubmit'
                }[role], {
                    bussNo: this.$route.query.bussNo, //单号
                    approvalComments: role == 20 ? this.radio1 : '', //0：否决,1：终审同意 2：同意业务并提交资深审批 3：同意业务并提交会议审批 4：退回
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
                    ownerId: this.dialoginput, // 指派人员ID
                    ownerName: this.rolelistName, // 指派人员姓名
                    contracts: this.loanFaceContracts, // 合同数组
                    loanPrecondition: this.conditions,// 放款前提条件
                    postRentManage: this.requirements,// 租后管理要求
                    seniorPrecondition: this.loanPrecondition, // 放款前提条件-资深审批
                    seniorRentManage: this.postRentManage // 租后管理要求--资深审批
                }).then(res => {
                    this.submitStatus = false;
                    if (res.data.code == '2000000') {
                        this.$message.success('提交成功');
                        setTimeout(function () {
                            loading.close();
                        }, 200);
                        this.$router.push({
                            path: this.nowurl == undefined ? '/layout/loadapproval' : this.nowurl,
                            query: {
                                idJurisdiction: this.$route.query.idJurisdiction
                            }
                        })
                    } else {
                        setTimeout(function () {
                            loading.close();
                        }, 200);
                    }
                })
            },
            // 提交
            adopt() {
                if (this.radio1 == '2') {
                    if (this.checkHasSenior(this.rolelist)) {
                        this.dialogVisible = true;
                    } else {
                        this.$message.error('当前系统没有可以选择的资深审批人，请联系管理员增加资深审批人');
                    }
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

                if (!this.validateDesc()) {
                    return;
                }

                if (this.submitStatus)
                    return;
                this.submitStatus = true;

                this.$post({
                    '20': '/LoanApprove/withdrawApprove',
                    '21': '/LoanApprove/seniorApprovalReject',
                    '22': '/LoanApprove/reviewMeetingReject',
                    '23': '/LoanApprove/directorOpinionReject'
                }[role], {
                    bussNo: this.$route.query.bussNo, //单号
                    approvalComments: role == 20 ? this.radio1 : '', //0：否决,1：终审同意 2：同意业务并提交资深审批 3：同意业务并提交会议审批
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
                    contracts: this.checkList, // 合同数组
                    loanPrecondition: this.conditions,// 放款前提条件
                    postRentManage: this.requirements,// 租后管理要求
                    seniorPrecondition: this.loanPrecondition, // 放款前提条件-资深审批
                    seniorRentManage: this.postRentManage // 租后管理要求--资深审批
                }).then(res => {
                    this.submitStatus = false;
                    if (res.data.code == '2000000') {
                        this.$message.success('退回成功');
                        this.$router.push({
                            path: this.nowurl == undefined ? '/layout/loadapproval' : this.nowurl
                        })
                    }
                })
            },
            // 保存按钮
            save() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let role = this.$route.query.arrangement;

                if (!this.validateDesc()) {
                    return;
                }
                if (this.submitStatus)
                    return;
                this.submitStatus = true;
                // '/LoanApprove/save'
                this.$post({
                    '20': 'LoanApprove/saveApprove',
                    '21': '/LoanApprove/seniorApprovalSave ',
                    '22': '/LoanApprove/reviewMeetingSave',
                    '23': '/LoanApprove/directorOpinionSave'
                }[role], {
                    id: this.$route.query.id,
                    bussNo: this.$route.query.bussNo, //单号
                    approvalComments: role == 20 ? this.radio1 : '', //0：否决,1：终审同意 2：同意业务并提交资深审批 3：同意业务并提交会议审批
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
                    contracts: this.checkList, // 合同数组
                    loanPrecondition: this.conditions,// 放款前提条件
                    postRentManage: this.requirements,// 租后管理要求
                    seniorPrecondition: this.loanPrecondition, // 放款前提条件-资深审批
                    seniorRentManage: this.postRentManage // 租后管理要求--资深审批
                }).then(res => {
                    this.submitStatus = false;
                    if (res.data.code == '2000000') {
                        setTimeout(function () {
                            loading.close();
                        }, 200);
                        this.$message.success('保存成功');
                        this.$router.push({
                            path: this.nowurl == undefined ? '/layout/loadapproval' : this.nowurl,
                            query: {
                                idJurisdiction: this.$route.query.idJurisdiction
                            }
                        })
                    } else {
                        setTimeout(function () {
                            loading.close();
                        }, 200);
                    }
                })
            },
            // 查看调查报告
            viewreport() {
                window.location.href = (`/web/investReport?bussNo=${this.$route.query.bussNo}&taskType=10`);
            },
            // 查看审批报告
            surveyprot() {
                window.location.href = (`/web/approveReport?bussNo=${this.$route.query.bussNo}&taskType=10`);
            },
            // 资深审批弹框关闭按钮
            handleClose(done) {
                this.$confirm('确认关闭？').then(_ => {
                    done();
                }).catch(_ => {
                });
            },
            // 弹框选择人物渲染class
            dialogdiv(val) {
                this.departmentindex = val;
            },
            // 弹框选择人物选择切换name
            rolelistchange(name) {
                this.rolelistName = name
            },
            // 点击合同事件push选中的合同编号和名称用于ajax上传
            handelcheckbox(item, index) {
                let a = {
                    'templateId': item.templateId,
                    'contractName': item.contractName,
                    'contractType': item.contractType,
                    'relationId': item.relationId
                }
                this.loanFaceContracts.push(a)
                // if(document.getElementById(index).checked == true) {
                //     this.loanFaceContracts.push(a)
                // } else {
                //     for(let i = 0 ; i < this.loanFaceContracts.length; i++) {
                //         if(this.loanFaceContracts[i].templateId == this.loanFaceContracts[i].templateId) {
                //             this.loanFaceContracts.splice(i, 1);
                //             break;
                //         }
                //     }
                // }
            },
            checkHasSenior(rolelist) {
                if (rolelist.length > 0) {
                    for (let j = 0; j < rolelist.length; j++) {
                        if (rolelist[j].list.length > 0) {
                            return true
                        }
                    }
                }

                return false
            },
            validateDesc() { // 审批意见描述校验
                if (this.$route.query.arrangement == '20' && ('01234'.indexOf(this.radio1) === -1 || this.radio1 === '')) {
                    this.$message.warning({message: '请选择审批意见', duration: 1000});
                    return false;
                }
                return true;
            }
        },
        components: {
            componentitle,
            xs
        }
    }
</script>
<style lang="less">

    .no-have-aggrement {
        height: 60px;
        line-height: 60px;
    }

</style>
