<template>
<div class="loanmoneycomp">
    <div class="div3">
        <componentitle :message="message='放款审批'" />
        <div class="imgbox" v-for="value in imgFile">
            <h3>{{value.nodeName}}</h3>
            <ul>
                <imgLine :name="val" :type="key" :bussNo="bussNo" v-for="(val,key,index) in value.nodes" :index="index"/>
            </ul>
        </div>
    </div>
    <componentitle :message="message='放款审批意见'" />
    <div class="subone" style="clear:both">
        <p>审批报告：</p>
        <el-button type="primary" class="spreport" @click="viewreport">查看调查报告</el-button>
        <el-button type="primary" @click="surveyprot">生成审批报告</el-button>
    </div>
    <div class="subone opinionsdiv" style="clear:both">
        <p>审批意见：</p>
        <template>
            <el-radio v-model="radio1" label="1" :disabled="inputdisabled">同意</el-radio>
            <el-radio v-model="radio1" label="0" :disabled="inputdisabled">不同意</el-radio>
        </template>
    </div>
    <div class="subone opinionsdiv" style="clear:both;margin-top:10px;">
        <p style="line-height:normal;">原因描述：</p>
        <el-input
            type="textarea"
            class="uppertextarea"
            :rows="3"
            placeholder="请输入原因描述"
            :disabled="inputdisabled"
            v-model="describewhy">
        </el-input>
    </div>

    <!-- 底部按钮 -->
    <div class="bottombutton">
        <el-button type="primary" @click="save" :disabled="inputdisabled" >保存</el-button>
        <el-button type="primary" @click="adopt" :disabled="inputdisabled">通过</el-button>
        <el-button type="primary" @click="exit" :disabled="inputdisabled">退回</el-button>
    </div>
    <!-- 底部按钮end -->
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../title/title.vue';
import imgLine from '../../views/loanapproval/item/imgLine.vue';
import {urlParse} from "../../utils/utils";
export default {
    data() {
        return {
            message: '',
            imgFile: [],
            id: '',
            bussNo:'',
            radio1: '',
            inputdisabled: '',
            describewhy: ''
        }
    },
    created() {
        this.$post('/materialTree',{
            materialType: 'ASSIGN_MATERIAL'
        }).then(res => {
            let treeInfo = res.data.data.ASSIGN_MATERIAL;
            let tempArr = [];
            Object.keys(treeInfo).forEach((key) => {
               tempArr.push(treeInfo[key]);
            });
            this.imgFile = tempArr;
        })
        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }

    },
    methods: {
        // 查看调查报告
        viewreport() {
            window.location.href = (`/web/investReport?bussNo=${this.$route.query.bussNo}`);
        },
        // 生成审批报告
        surveyprot() {
            window.location.href = (`/web/approveReport?bussNo=${this.$route.query.bussNo}`);
        },
        // 保存
        save() {
            this.$post('/LoanGrantOpinion/saveGrant',{
                bussNo: this.$route.query.bussNo,
                approvalComments: this.radio1,
                reasonDescription: this.describewhy
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('保存成功');
                }
            });
        },
        // 通过
        adopt() {
            this.$post('/LoanGrantOpinion/submitApprove',{
                bussNo: this.$route.query.bussNo,
                approvalComments: this.radio1,
                reasonDescription: this.describewhy
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('通过');
                    this.$router.push({
                        path: '/layout/loanmoney'
                    })
                }
            });

        },
        // 退回
        exit() {
            this.$post('/LoanGrantOpinion/rejectGrant',{
                bussNo: this.$route.query.bussNo,
                approvalComments: this.radio1,
                reasonDescription: this.describewhy
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('退回');
                    this.$router.push({
                        path: '/layout/loanmoney'
                    })
                }
            });

        }
    },
    components: {
        imgLine,
        componentitle
    }
}
</script>
<style lang="less">
.loanmoneycomp {
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
                clear:both;
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

                    div {
                        color: #606266;
                    }
                }
            }
        }
    }
    .uppertextarea {
        width: calc(100% - 140px);
        float: right;
    }
}

</style>
