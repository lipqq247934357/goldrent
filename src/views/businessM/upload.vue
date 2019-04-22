<template>
    <div>
        <li>
            <div>{{name}}</div>
            <div class="edit-pic">
                <el-upload
                        :limit="Number(6)"
                        :data="{bussNo:this.bussNo,relationId:this.relationId,dataType:this.type}"
                        :disabled="disabled"
                        :file-list="fileList"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        action="/web/fileUploadSingle"
                        :headers="{token:this.token}"
                        :on-exceed="onExceed"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </li>
    </div>
</template>

<script type="text/ecmascript-6">
    import Cookies from 'js-cookie';
    import {Message} from 'element-ui';

    export default {
        data() {
            return {
                bussNo: '',
                fileList: [],
                token: ''
            }
        },
        props: ['name', 'type', 'relationId', 'disabled'],
        created() {
            /**
             * 思路：
             *  1.获取标题，type和relationId，将type保存在data中
             *  2.在created中发起ajax请求获取该类型，该用户下的图片id集合
             *  3.将{name:id,url:address/id}放入fileList中
             *  4.
             */
            this.query();
            this.token = Cookies.get('token');
        },
        methods: {
            async query() {
                // 添加信息
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
                    });
                }
            },
            async handleRemove(file) { // 删除回调
                let id = '';
                if (file.id) {
                    id = file.id;
                } else {
                    id = file.response.data.id;
                }
                return await this.$post('/deleteImageData', {
                    id: id
                });
            },
            handlePictureCardPreview(file) { // 图片浏览功能
                this.$emit('handlePictureCardPreview', file);
            },
            onExceed(){
                Message.error({message: '超出文件上传数量限制！', duration: 5 * 1000});
            }
        },
    }
</script>
<style lang="less" scoped>

    li {
        width: 100%;
        height: 100px;
        text-align: center;
        clear: both;

        & > div {
            float: left;
            border-bottom: 1px solid #EBEEF5;
            height: 100px;

            &:first-child {
                width: 29.8%;
                border-right: 1px solid #EBEEF5;
                line-height: 100px;
            }

            &:last-child {
                width: 70%;
            }
        }
    }

    .edit-pic {
        /deep/ .el-upload-list--picture-card {
            display: block;
            float: left;

            & > li:nth-child(1) {
                margin-left: 20px;
            }

            & > li:last-child {
                margin-right: 0;
            }

            & > li {
                height: 80px;
                width: 80px;
                margin: 10px 5px;
            }
        }

        /deep/ .el-upload--picture-card {
            float: left;
            width: 80px;
            height: 80px;
            margin: 10px 0 10px 20px;
        }

        /deep/ .el-icon-plus {
            vertical-align: top;
            margin-top: 26px;
        }
    }


</style>
