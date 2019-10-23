<template>
    <div class="externalinfo">
        <componentitle :message="message='征信信息查询'"/>
        <div class="">
            <h3>承租人征信状况描述（含配偶）</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.lesseeCredit">
            </el-input>
        </div>
        <div class="">
            <h3>保证人征信状况描述（含配偶）</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.guarantorCredit">
            </el-input>
        </div>
        <div class="">
            <h3>回购人征信状况描述（含实际控制人）</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.repurchaseCredit">
            </el-input>
        </div>

        <componentitle :message="message='中登网查询'"/>

        <div class="">
            <h3>承租人中登网查询描述</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.lesseeCreditZhongdeng">
            </el-input>
        </div>

        <componentitle :message="message='其他外部信息查询（含工商局信息、裁判文书网、失信被执行信息等）'"/>

        <div class="">
            <h3>承租人外部信息查询描述（含配偶）</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.lesseeCreditExternal">
            </el-input>
        </div>
        <div class="">
            <h3>保证人外部信息查询描述（含配偶）</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.guarantorCreditExternal">
            </el-input>
        </div>
        <div class="">
            <h3>回购人外部信息查询描述（含实际控制人）</h3>
            <el-input
                    :rows="3"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="surveyInformation.repurchaseCreditExternal">
            </el-input>
        </div>

        <div class="buttonNext">
            <el-button @click="save('save')" class="buttonClass" type="primary">保存</el-button>
            <el-button @click="save('next')" class="buttonClass" type="primary">下一步</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    export default {
        props: ['bussNo', 'bindText'],
        data() {
            return {
                message: '',
                surveyInformation: {
                    id:"",
                    lesseeCredit: "",
                    guarantorCredit: "",
                    repurchaseCredit: "",
                    lesseeCreditZhongdeng: "",
                    lesseeCreditExternal: "",
                    guarantorCreditExternal: "",
                    repurchaseCreditExternal: ""
                } // ajax获取的主对象
            }
        },
        created() {
            this.getData(); // 外部信息查询
        },
        components: {
            componentitle,

        },
        methods: {
            getData() {
                this.$post('/surveyinformation/info', {
                    bussNo: this.bussNo
                }).then(res => {
                    if (res.data.code == '2000000') {
                        if (res.data.data.surveyInformation == null) {
                            return;
                        }
                        this.surveyInformation = res.data.data.surveyInformation;
                    }
                });
            },
            save(param) { // 保存页面或者下一步
                if (param === 'save') {
                    this.$emit("saveData");
                } else {
                    this.$emit('update:bindText', '增信措施及综素')
                }
            }
        }
    }
</script>
<style lang="less">
    .externalinfo {
        h3 {
            padding-left: 15px;
            background: #f5f5f5;
            margin: -5px 0 0;
            position: relative;
            height: 50px;
            line-height: 50px;
            color: #585858;
            border: 1px solid #afafaf;
            font-size: 14px;
        }

        .inputtext {
            width: 100%;
            display: block;
            margin: 0 auto 20px;

            textarea {
                border-radius: 0;
            }
        }

        .buttonNext {
            width: 165px;
            margin: 40px auto;

            .buttonClass {
                background: #ea9141;
                border: 0;
            }
        }
    }
</style>
