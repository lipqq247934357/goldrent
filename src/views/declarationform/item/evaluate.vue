<template>
    <div class="externalinfo">
        <div class="bottombox">
            <componentitle :message="message='调查结论及风险评价'"/>
            <h3>主办人</h3>
            <el-input
                    :rows="4"
                    class="inputtext"
                    placeholder="字数限制0-500字"
                    type="textarea"
                    v-model="item.conclusion">
            </el-input>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    export default {
        components: {
            componentitle,
        },
        data() {
            return {
                item:{},
                message: '',
                sponsor: '', //主办人
            }
        },
        created() {
            // 主办人
            this.$post('/getSurveyConclusion', {
                bussNo: this.$route.query.bussNo,
                ownerType: 'ZB'
            }).then(res => {
                if (res.data.code == '2000000') {
                    this.sponsor = res.data.data;
                }
            });
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
