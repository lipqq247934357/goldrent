<template>
    <li>
        <div>
            <div class="tabletitleul">
                {{name}}
            </div>
            <div class="imgRelevant">
                <div class="imglist">
                    <img :src="item.url"
                         alt=""
                         class="imagescss"
                         height="100"
                         v-for="item in fileList"
                         preview="0"
                         width="100">
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
                dataNum: 0
            }
        },
        props: ['name', 'type', 'relationId', 'bussNo','index'],
        created() {
            this.getList();
        },
        methods: {
            // 获取图片
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
                        this.$nextTick( () => {
                            // 异步调用放大组件方法
                            this.$previewRefresh();
                        });
                    });
                }
            },
            // 左切换 暂时废弃
            left(index) {
                var imglist = document.querySelectorAll(".imglist");
                imglist[this.index].setAttribute('data-num',this.dataNum += 100);
                let nownum = parseInt(imglist[this.index].getAttribute('data-num'));
                let a = this.marginLeftPx -= 100;
                imglist[this.index].style.marginLeft = -nownum +"px";
                this.b = parseInt(imglist[this.index].style.marginLeft.split('px')[0])

            },
            // 右切换 暂时废弃
            right(item) {
                let rightrun = this.dataNum -= 100;
                var imglist = document.querySelectorAll(".imglist");
                imglist[this.index].setAttribute('data-num',rightrun);

                if(imglist[this.index].style.marginLeft == '' || imglist[this.index].style.marginLeft == '0px') {
                    return;
                }
                let a = this.b += 100;
                imglist[this.index].style.marginLeft = a +"px";

            }
        },
    }
</script>
<style lang="less">

</style>
