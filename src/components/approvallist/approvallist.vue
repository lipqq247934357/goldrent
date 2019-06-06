<template>
    <div>
        <componentitle :message="message='审批历史'"/>
        <ul class="approval-history">
            <li>
                <div>序号</div>
                <div>处理人</div>
                <div>操作时间</div>
                <div>审批环节</div>
                <div>意见描述</div>
            </li>
            <li v-for="item in data">
                <div>{{item.index}}</div>
                <div>{{item.operator}}</div>
                <div>{{item.editTime}}</div>
                <div>{{item.taskName}}</div>
                <div>{{item.comments}}</div>
            </li>
            <li v-if="data.length === 0">
            <p>暂无数据</p>
            </li>
        </ul>
    </div>

</template>

<script type="text/ecmascript-6">
    import componentitle from '../title/title.vue';

    export default {
        components: {
            componentitle
        },
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
                let data = await this.$post('/conclusions', {bussNo: this.$route.query.bussNo});
                if (data.data.code == '2000000') {
                    this.data = data.data.data;
                }
            }
        }
    }
</script>
<style lang="less" scoped>


    .approval-history {
        color: #909399;
        overflow: hidden;
        margin-top: 1px;
        border-right: 1px solid #cccccc;
        border-top: 1px solid #cccccc;

        > li {
            > div {
                float: left;
                width: 20%;
                text-align: center;
                font-size: 14px;
                line-height: 40px;
                height: 40px;
                border-left: 1px solid #cccccc;
                border-bottom: 1px solid #cccccc;
                box-sizing: border-box;
            }
            >p {
                float: left;
                font-size: 14px;
                text-align: center;
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-left: 1px solid #cccccc;
                border-bottom: 1px solid #cccccc;

            }
        }
    }

</style>
