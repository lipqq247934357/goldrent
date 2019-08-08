<template>
    <li>
        <div>
            <div class="tabletitleul">
                {{name.value}}
            </div>
            <div class="imgRelevant">
                <div class="imglist">
                    <span :key="item" v-for="item in fileList">
                        <el-image :preview-src-list="sortNewList(fileList,item)"
                                  :src="item"
                                  style="width: 100px;height: 100px;float: left;margin-left: 20px;margin-bottom: 20px;"
                        >
                    </el-image>
                    </span>
                </div>
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
                fileList: [],
                marginLeftPx: 0,
                marginRightPx: 0,
                b: '',
                dataNum: 0,
            }
        },
        props: ['name', 'type', 'relationId', 'bussNo', 'index'],
        created() {
            this.getList();
        },
        methods: {
            // 获取图片
            async getList() {
                let data = await this.$post('/getFileIdByType', {
                    relationId: this.relationId + '', // 用户id
                    dataType: this.name.key, // 类型
                    bussNo: this.bussNo // 订单号
                });
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    let arr = [];
                    data.data.data.forEach((val) => {
                        arr.push('/web/fileView?fileId=' + val);
                    });
                    this.fileList = arr;
                }
            },
            sortNewList(list, item) {
                let index = list.indexOf(item);
                let newArray = list.concat(); // 新的数组
                let after = newArray.splice(0, index); // 截取前半部分
                return newArray.concat(after); // 前半部分加到后半部分
            }
        },
    }
</script>
<style lang="less">
    .tabletitleul {
        color: #606266;
    }
</style>
