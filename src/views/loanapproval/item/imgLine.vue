<template>
    <li>
        <div>
            <div class="tabletitleul">
                {{name.value}}
            </div>
            <div class="imgRelevant">
                <div class="imglist">
                    <span :key="item" v-for="item in imgList">
                        <el-image :preview-src-list="sortNewList(imgList,item)"
                                  :src="item"
                                  style="width: 100px;height: 100px;float: left;margin-left: 20px;margin-bottom: 20px;"
                        >
                    </el-image>
                    </span>
                </div>
            </div>
            <div class="imgRelevant file-style" v-if="fileMap && fileMap.size > 0">
                <span v-for="item in fileMap">
                    <el-link :href="item[1]" type="primary">{{item[0]}}</el-link>
                </span>
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
                imgList: [],
                fileMap: null,
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
                    // let fileIndex = ["pdf", "doc", "docx", "xls", "xlsx", "txt", "ppt", "pptx", "rar", "zip"];
                    let imgArr = []; // 图片数组
                    let fileMap = new Map(); // 文件对象
                    let imgIndex = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];
                    data.data.data.forEach((val) => {
                        let index = val.fileType.substring(1); // 文件名字
                        if (imgIndex.includes(index)) { // 是图片
                            imgArr.push('/web/fileView?fileId=' + val.id);
                        } else {
                            fileMap.set(val.fileName, '/web/fileDown?fileId=' + val.id);
                        }
                    });
                    this.imgList = imgArr;
                    this.fileMap = fileMap;
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

    .file-style {
        border-top: 1px solid #afafaf;
        text-align: left;
        padding: 30px 0;
        box-sizing: border-box;

        > span {
            display: block;
            margin-left: 20px;
            padding: 5px 0;
        }
    }
</style>
