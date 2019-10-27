<template>
    <div class="externalinfo">
        <div class="bottombox">
            <componentitle :message="message='调查结论及风险评价'"/>
            <h3>主办人</h3>
            <el-input
                    :rows="4"
                    class="inputtext"
                    placeholder="字数限制0-1000字"
                    type="textarea"
                    maxlength="1000"
                    v-model="sponsor.conclusion">
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
        components: {
            componentitle,
        },
        data() {
            return {
                message: '',
                sponsor: {
                    id: '',
                    ownerId: '',
                    ownerType: 'ZB',
                    conclusion: ''
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                // 主办人
                this.$post('/getSurveyEvaluation', {
                    bussNo: this.bussNo,
                    ownerType: 'ZB'
                }).then(res => {
                    if (res.data.code == '2000000' && res.data.data.length !== 0) {
                        this.sponsor = res.data.data[0];
                    }
                });
            },
            save(param) { // 保存页面或者下一步
                if (param === 'save') {
                    this.$emit("saveData");
                } else {
                    this.$emit('update:bindText', '审批意见')
                }
            }
        }
    }
</script>
<style lang="less">
    .externalinfo {
        h3 {
            padding-left: 15px;
            font-size: 14px;
        }
    }
</style>
