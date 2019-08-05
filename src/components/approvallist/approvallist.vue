<template>
    <div>
        <componentitle :message="message='审批历史'"/>
        <el-table
                :data="data"
                border
                size="small"
                row-key="id"
                style="width: 100%">
            <el-table-column
                    label="序号"
                    min-width="110px"
                    type="index">
            </el-table-column>
            <el-table-column
                    label="处理人"
                    prop="operator">
            </el-table-column>
            <el-table-column
                    label="操作时间"
                    min-width="110px"
                    prop="editTime">
            </el-table-column>
            <el-table-column
                    label="审批环节"
                    prop="taskName">
            </el-table-column>
            <el-table-column
                    label="审批意见"
                    prop="opinion">
            </el-table-column>
            <el-table-column
                    min-width="250px"
                    label="意见描述"
                    prop="comments">
            </el-table-column>
        </el-table>
    </div>

</template>

<script type="text/ecmascript-6">
    import componentitle from '../title/title.vue';

    export default {
        components: {
            componentitle
        },
        props: ['bussNo'],
        data() {
            return {
                data: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                let data = await this.$post('/conclusions', {bussNo: this.$route.query.bussNo || this.bussNo});
                if (data.data.code == '2000000') {
                    this.data = data.data.data;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
</style>
