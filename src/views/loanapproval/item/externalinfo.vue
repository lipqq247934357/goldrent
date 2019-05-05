<template>
<div class="externalinfo">
    <componentitle :message="message='征信信息查询'" />
    <div class="">
        <h3>承租人征信状况描述（含配偶）</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.lesseeCredit">
        </el-input>
    </div>
    <div class="">
        <h3>保证人征信状况描述（含配偶）</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.guarantorCredit">
        </el-input>
    </div>
    <div class="">
        <h3>回购人人征信状况描述（含实际控制人）</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.repurchaseCredit">
        </el-input>
    </div>

    <componentitle :message="message='中登网查询'" />

    <div class="">
        <h3>承租人中登网查询描述</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.lesseeCreditZhongdeng">
        </el-input>
    </div>

    <componentitle :message="message='其他外部信息查询（含工商局信息、裁判文书网、失信被执行信息等）'" />

    <div class="">
        <h3>承租人征信状况描述（含配偶）</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.lesseeCreditExternal">
        </el-input>
    </div>
    <div class="">
        <h3>保证人征信状况描述（含配偶）</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.guarantorCreditExternal">
        </el-input>
    </div>
    <div class="">
        <h3>回购人人征信状况描述（含实际控制人）</h3>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="textarea.repurchaseCreditExternal">
        </el-input>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            textarea: {}, // ajax获取的主对象
            inputdisabled: false
        }
    },
    created() {
        this.$post('/surveyinformation/info',{
            bussNo: this.$route.query.bussNo
        }).then( res => {
            // 返回示例
            // {
            //     "msg": "success",
            //     "code": "2000000",
            //     "data": {
            //         "surveyInformation": {
            //             "id": "8932f859056048379bdf60c2b1a5b182",
            //             "version": 0,
            //             "status": null,
            //             "creator": "",
            //             "createTime": "2019-04-12T02:19:36.000+0000",
            //             "editor": "",
            //             "editTime": "2019-04-12T02:19:36.000+0000",
            //             "remark": null,
            //             "bussNo": "test_data_for_app_0411_02",
            //             "lesseeCredit": "someone1",
            //             "guarantorCredit": "rela",
            //             "repurchaseCredit": "",
            //             "lesseeCreditZhongdeng": "",
            //             "lesseeCreditExternal": "",
            //             "guarantorCreditExternal": "",
            //             "repurchaseCreditExternal": ""
            //         },
            //         "bussNo": "test_data_for_app_0411_02"
            //     }
            // }
            if(res.data.code == '2000000') {
                if(res.data.data.surveyInformation == null) {
                    return;
                }
                this.textarea = res.data.data.surveyInformation;
            }
        });
        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }
    },
    components: {
        componentitle,

    }
}
</script>
<style lang="less">
.externalinfo {
    h3 {
        padding-left: 15px;
        background: #f5f5f5;
        margin: 0;
        margin-top: -5px;
        position: relative;
        height: 50px;
        line-height: 50px;
        color: #585858;
        border: 1px solid #afafaf;
        padding-left: 15px;
        font-size: 14px;
    }
    .inputtext {
        width: 100%;
        display: block;
        margin: 0 auto 20px;
        textarea {
            border-radius: 0px;
        }
    }
}
</style>
