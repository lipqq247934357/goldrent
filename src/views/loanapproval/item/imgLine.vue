<template>
    <li>
        <div>
            <div class="tabletitleul">
                {{name}}
            </div>
            <div class="imgRelevant">
                <img :src="item.url"
                     alt=""
                     class="imagescss"
                     height="100"
                     v-for="item in fileList"
                     width="100">
                     <!-- preview="0" preview编号一致为一组 -->

            </div>
        </div>

    </li>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';

    export default {
        components: {
            componentitle,
        },
        data() {
            return {
                fileList: []
            }
        },
        props: ['name', 'type', 'relationId', 'bussNo'],
        created() {
            this.getList();
        },
        methods: {
            async getList() {
                let data = await this.$post('/getFileIdByType', {
                    relationId: this.relationId + '',
                    dataType: this.type,
                    bussNo: this.bussNo
                });
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    data.data.data.forEach((val) => {
                        let obj = {};
                        obj.id = val;
                        obj.url = '/web/fileView?fileId=' + val;
                        this.fileList.push(obj);
                        this.$previewRefresh() // 异步调用放大组件方法
                    });
                }
            }
        },
    }
</script>
<style lang="less">
</style>
