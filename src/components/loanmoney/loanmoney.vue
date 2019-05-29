<template>
<div class="loanmoneycomp">
    <div class="div3">
        <componentitle :message="message='放款审批'" />
        <div class="imgbox" v-for="value in imgFile">
            <h3>{{value.nodeName}}</h3>
            <ul>
                <imgLine :name="val" :type="key" relationId="ASSIGN_MATERIAL" :bussNo="bussNo" v-for="(val,key,index) in value.nodes" :index="index"/>
            </ul>
        </div>
    </div>
    <componentitle :message="message='放款审批意见'" />
    <div class="subone" style="clear:both">
        <p class="titleloantext">审批报告：</p>
        <el-button type="primary" class="spreport" @click="viewreport">查看调查报告</el-button>
        <el-button type="primary" @click="surveyprot">生成审批报告</el-button>
    </div>
    <div class="subone opinionsdiv" style="clear:both">
        <p class="titleloantext">后补租赁物识别号：</p>
        <template>
            <el-radio v-model="radio2" label="Y" :disabled="inputdisabled">需要</el-radio>
            <el-radio v-model="radio2" label="N" :disabled="inputdisabled">不需要</el-radio>
        </template>
    </div>
    <div class="subone opinionsdiv" style="clear:both">
        <p class="titleloantext">审批意见：</p>
        <template>
            <el-radio v-model="radio1" label="1" :disabled="inputdisabled">同意</el-radio>
            <el-radio v-model="radio1" label="0" :disabled="inputdisabled">不同意</el-radio>
        </template>
    </div>
    <div class="subone opinionsdiv" style="clear:both;margin-top:10px;">
        <p  class="titleloantext" style="line-height:normal;">原因描述：</p>
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
        <!-- <el-button type="primary" @click="exit" :disabled="inputdisabled">退回</el-button> -->
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
            bussNo:'', // 订单号
            radio1: '', // 同意不同意
            inputdisabled: '', // 判断是否是可编辑状态
            describewhy: '', // 原因描述
            radio2: '' // 后补租赁物识别号
        }
    },
    created() {
        this.bussNo = this.$route.query.bussNo;
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
                reasonDescription: this.describewhy,
                needSupplement: this.radio2
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
                reasonDescription: this.describewhy,
                needSupplement: this.radio2
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
                reasonDescription: this.describewhy,
                needSupplement: this.radio2
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
    .subone {
        .titleloantext {
            min-width: 145px;
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
                    &:last-child {
                        border-bottom: 0;
                    }
                    div {
                        color: #606266;
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

</style>
