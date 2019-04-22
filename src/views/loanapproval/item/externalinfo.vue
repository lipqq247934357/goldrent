<template>
<div class="externalinfo">
    <componentitle :message="message='征信信息查询'" />
    <div class="">
        <h3>承租人征信状况描述（含配偶）</h3>
        <el-input
            type="textarea"
            :rows="2"
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
            :rows="2"
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
            :rows="2"
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
            :rows="2"
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
            :rows="2"
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
            :rows="2"
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
            :rows="2"
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
            textarea: {},
            inputdisabled: false
        }
    },
    created() {
        this.$post('/surveyinformation/info',{
            // bussNo: 'CON_ZZ02_0000_201904_0001'
            bussNo: this.$route.query.bussNo
        }).then( res => {
            if(res.data.code == '2000000') {
                if(res.data.data.surveyInformation == null) {
                    return;
                }
                this.textarea = res.data.data.surveyInformation;
                // console.log(this.textarea,'外部信息');
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
    }
    .inputtext {
        width: 95%;
        display: block;
        margin: 0 auto 20px;
    }
}
</style>
