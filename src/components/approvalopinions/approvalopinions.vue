<template>
    <div>
        <!-- 审批意见组件 -->
        <componentitle :message="message='审批意见'" />
        <div class="opinion">
            <!-- 贷款审批 -->
            <div class="loanval" v-if="this.$route.query.arrangement == 20">
                <div class="subone" style="clear:both">
                    <p>审批报告：</p>
                    <el-button type="primary" class="spreport" @click="viewreport">查看调查报告</el-button>
                    <el-button type="primary" @click="surveyprot">生成审批报告</el-button>
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

                    <div class="checkbox" style="width: 85%;float: right;">
                        <el-checkbox v-for="(item,index) in checkboxlist" disabled  :checked="true">{{item.contractName}}</el-checkbox>
                    </div>

                </div>
                <div class="subone opinionsdiv" style="clear:both">
                    <p>审批意见：</p>
                    <template>
                        <el-radio v-model="radio1" label="1" :disabled="inputdisabled">终审同意</el-radio>
                        <el-radio v-model="radio1" label="2" :disabled="inputdisabled">同意业务并提交资深审批</el-radio>
                        <el-radio v-model="radio1" label="3" :disabled="inputdisabled">同意业务并提交会议审批</el-radio>
                        <el-radio v-model="radio1" label="0" :disabled="inputdisabled">否决</el-radio>
                        <el-radio v-model="radio1" label="4" :disabled="inputdisabled">退回</el-radio>
                    </template>
                </div>
                <div class="subone opinionsdiv" style="clear:both">
                    <div class="suboneelinput" style="clear:both">
                        <p>放款前提条件：</p>
                        <el-input placeholder="请输入放款前提条件" class="contentinout" v-model="conditions" :disabled="radio1 == '0' || radio1 == '4' || inputdisabled ? true : false "></el-input>
                    </div>
                    <div class="suboneelinput" style="clear:both">
                        <p>租后管理要求：</p>
                        <el-input placeholder="请输入租后管理要求" class="contentinout" v-model="requirements" :disabled="radio1 == '0' || radio1 == '4' || inputdisabled  ? true : false "></el-input>
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
                    placeholder="贷款审批内容"
                    disabled
                    v-model="disabledtextarea">
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
                    placeholder="贷款审批内容"
                    disabled
                    v-model="disabledtextarea">
                </el-input>
                <componentitle :message="message='上会审议结论'" />
                <el-input
                    type="textarea"
                    class="uppertextareaup"
                    :rows="3"
                    placeholder="上会审议的结论"
                    disabled
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
                    disabled
                    v-model="disabledtextarea">
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
                <el-button type="primary" @click="adopt" :disabled="inputdisabled">{{this.$route.query.arrangement == '23' ? '同意': '提交'}}</el-button>
                <el-button type="primary" @click="exit" :disabled="inputdisabled" v-if="this.$route.query.arrangement != '20'">退回</el-button>
            </div>

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
    </div>

</template>

<script  type="text/ecmascript-6">
import componentitle from '../title/title.vue';
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
            dialoginput: '', // 弹框input绑定
            loanFaceContracts: [], //储存点击面签合同
            checkboxlist: [], // 面签合同
            inputdisabled: false,
            radio1: '',
            dialogVisible: false, // 资深审批弹框绑定
            rolelist: [], // 角色列表
            departmentindex: null, // 用于渲染class
            checkList: []
        }
    },
    created() {
        // 1为不可编辑 2位可以编辑
        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }
        this.nowurl = this.$route.query.nowpath; // 获取上一页带过来的路由用于回退到不同的页面
        // 获取角色用户列表
        this.$post('/role/queryUserList',{
            parType: "ROLE_PARAMS",
            parCode: "SENIOR_APPROVAL"
        }).then( res => {
            this.rolelist = res.data.data;
        });
        // 合同列表 审批意见和描述
        this.$get(`/LoanApprove/queryApproveDetail?bussNo=${this.$route.query.bussNo}`).then( res => {
            if(res.data.data == null ) {
                return;
            }
            this.checkboxlist = res.data.data.contracts; // 合同
            this.conditions = res.data.data.loanPrecondition
            this.requirements = res.data.data.postRentManage
            this.conditions = res.data.data.loanPrecondition
            this.requirements = res.data.data.postRentManage
            if(this.$route.query.arrangement == '20') {
                this.radio1 = String(res.data.data.approvalComments); // 审批意见
            }
            this.textarea = res.data.data.reasonDescription; // 意见
            for(let i = 0 ; i < this.checkboxlist.length; i++) {
                let a = {
                    'templateId': this.checkboxlist[i].templateId,
                    'contractName': this.checkboxlist[i].contractName,
                    'contractType': this.checkboxlist[i].contractType,
                    'relationId': this.checkboxlist[i].relationId
                }
                this.checkList.push(a);
                console.log(this.checkList);
            }
        });
        this.textareinput(); //资深 上会 主任审批需要展示的内容
    },
    methods: {
        textareinput() {
            //贷款审批：20 资深审批：21 上会审议：22 主任审批：23
            let roletype = this.$route.query.arrangement;
            this.arrangementtype  = this.$route.query.arrangement;
            if(roletype != 20) {
                this.$post('/LoanApprove/queryLoanApprovalDetail',{
                    bussNo: this.$route.query.bussNo
                }).then(res => {
                    if(JSON.stringify(res.data.data)) {
                        if(JSON.stringify(res.data.data.taskType)) {
                            this.disabledtextarea = res.data.data.taskType.reasonDescription;
                        }
                        if(JSON.stringify(res.data.data.taskType23)) {
                            this.director = res.data.data.taskType23.reasonDescription;
                        }
                        if(JSON.stringify(res.data.data.taskType21)) {
                            this.senior = res.data.data.taskType21.reasonDescription;
                        }
                        if(JSON.stringify(res.data.data.taskType22)) {
                            this.conclusion = res.data.data.taskType22.reasonDescription;
                        }
                    }

                });
            }
        },
        // 提交ajax
        submitajax() {
            let role = this.$route.query.arrangement;
            this.$post({
                '20': '/LoanApprove/submitApprove',
                '21': '/LoanApprove/seniorApprovalSubmit',
                '22': '/LoanApprove/reviewMeetingSubmit',
                '23': '/LoanApprove/directorOpinionSubmit'
            }[role],{
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
                ownerId: this.dialoginput, // 指派人员ID
                ownerName: this.rolelistName, // 指派人员姓名
                contracts: this.loanFaceContracts, // 合同数组
                loanPrecondition: this.conditions,// 放款前提条件
                postRentManage: this.requirements// 租后管理要求
            }).then( res => {
                if(res.data.code == '2000000') {
                    this.$message.success('提交成功');
                    this.$router.push({
                        path: this.nowurl == undefined ? '/layout/loadapproval': this.nowurl,
                        query: {
                            idJurisdiction: this.$route.query.idJurisdiction
                        }
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
                '20': '/LoanApprove/withdrawApprove',
                '21': '/LoanApprove/seniorApprovalReject',
                '22': '/LoanApprove/reviewMeetingReject',
                '23': '/LoanApprove/directorOpinionReject'
            }[role],{
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
                postRentManage: this.requirements// 租后管理要求
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
                '20': 'LoanApprove/saveApprove',
                '21': '/LoanApprove/seniorApprovalSave ',
                '22': '/LoanApprove/reviewMeetingSave',
                '23': '/LoanApprove/directorOpinionSave'
            }[role],{
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
                postRentManage: this.requirements// 租后管理要求
            }).then( res => {
                if(res.data.code == '2000000') {
                    this.$message.success('保存成功');
                    this.$router.push({
                        path: this.nowurl == undefined ? '/layout/loadapproval': this.nowurl,
                        query: {
                            idJurisdiction: this.$route.query.idJurisdiction
                        }
                    })
                }
            })
        },
        // 查看调查报告
        viewreport() {
            window.location.href = (`/web/investReport?bussNo=${this.$route.query.bussNo}`);
        },
        // 查看审批报告
        surveyprot() {
            window.location.href = (`/web/approveReport?bussNo=${this.$route.query.bussNo}`);
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
        },
        // 弹框选择人物选择切换name
        rolelistchange(name) {
            this.rolelistName = name
        },
        // 点击合同事件push选中的合同编号和名称用于ajax上传
        handelcheckbox(item,index) {
            let a = {
                'templateId': item.templateId,
                'contractName': item.contractName,
                'contractType': item.contractType,
                'relationAssertId': item.relationAssertId
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
    },
    components: {
        componentitle
    }
}
</script>
<style lang="less">

</style>
