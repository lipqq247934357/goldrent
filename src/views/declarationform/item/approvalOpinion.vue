<template>
    <div class="externalinfo">
        <div class="bottombox">
            <componentitle :message="message='审批意见'"/>
            <h3>主办人</h3>
            <el-input
                    :rows="4"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="opinion.conclusion">
            </el-input>
        </div>

        <div class="buttonNext">
            <el-button @click="save('save')" class="buttonClass" type="primary">保存</el-button>
            <el-button @click="save('submit')" class="buttonClass" type="primary">提交</el-button>
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
                opinion: {}, //主办人
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                // 主办人
                this.$post('/getMainSubmitOpinion', {
                    bussNo: this.bussNo
                }).then(res => {
                    if (res.data.code == '2000000' && res.data.data.length !== 0) {
                        this.opinion = res.data.data;
                    }
                });
            },
            save(param) { // 保存页面或者下一步
                if (param == 'save') { // 保存数据
                    this.$emit("saveData");
                } else { // 提交数据

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
