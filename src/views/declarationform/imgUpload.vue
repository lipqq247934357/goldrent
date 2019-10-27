<template>
    <li class="listimg">
        <div>
            <p class="imgtitlename">{{name.value}} <span style="color: #f00;">{{name.require == '1' ? '必传' : ''}}</span> </p>
        </div>
        <div class="edit-pic">
            <!-- <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="srcList"> -->
            <div style="overflow:hidden;">
                <el-upload
                        :data="{bussNo:this.bussNo,relationId:this.relationId,dataType:this.type}"
                        :disabled="disabled"
                        :file-list="fileList"
                        :headers="{token:this.token}"
                        :limit="Number(6)"
                        :on-exceed="onExceed"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        action="/web/fileUploadSingle"
                        list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <!-- </el-image> -->
            <div style="width: 100%;border-top: 1px solid #EBEEF5;">
                <div style="
                float: left;
                margin: 10px;
                padding-top: 10px;
                ">
                    <el-upload
                            :data="{bussNo:this.bussNo,relationId:this.relationId,dataType:this.type}"
                            :file-list="fileList4File"
                            :headers="{token:this.token}"
                            :limit="Number(6)"
                            :on-exceed="onExceed"
                            :on-remove="handleRemove"
                            action="/web/fileUploadSingle">
                        <el-button class="primary" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </div>
            </div>
        </div>
    </li>

</template>

<script type="text/ecmascript-6">
    import Cookies from 'js-cookie';
    import {Message} from 'element-ui';

    export default {
        data() {
            return {
                fileList: [],
                fileList4File: [],
                token: '',
                url: '',
                srcList: [],
                previewImgArr: [],
            }
        },
        props: ['name', 'type', 'relationId', 'disabled', 'bussNo'],
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
        mounted() {
        },
        methods: {
            async query() {
                if(this.relationId == undefined || this.relationId == '') {
                    return;
                }

                let data = await this.$post('/getFileIdByType', {
                    relationId: this.relationId + '', // 用户id
                    dataType: this.name.key, // 类型
                    // bussNo: this.bussNo // 订单号
                });
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    // let fileIndex = ["pdf", "doc", "docx", "xls", "xlsx", "txt", "ppt", "pptx", "rar", "zip"];
                    let imgArr = []; // 图片数组
                    let fileArr = []; // 文件对象
                    let imgIndex = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];
                    data.data.data.forEach((val) => {
                        // console.log(data);
                        let index = val.fileType.substring(1); // 文件名字
                        if (imgIndex.includes(index)) { // 是图片
                            imgArr.push({url: '/web/fileView?fileId=' + val.id,id:val.id});
                        } else {
                            fileArr.push({url: '/web/fileDown?fileId=' + val.id, name: val.fileName,id:val.id});
                        }
                    });
                    this.fileList = imgArr;
                    this.fileList4File = fileArr;
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
                this.$emit('handlePictureCardPreview', file, this.previewImgArr);
            },
            onExceed() {
                Message.error({message: '超出文件上传数量限制！', duration: 5 * 1000});
            }
        },
    }
</script>
<style lang="less" scoped>

    li {
        width: 100%;
        text-align: center;
        clear: both;
        overflow: hidden;
        border-bottom: 1px solid #EBEEF5;
        position: relative;

        & > div {
            float: right;

            &:first-child {
                width: 29.8%;
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;

                .imgtitlename {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                }
            }

            &:last-child {
                width: 70%;
            }
        }
    }

    .edit-pic {
        border-left: 1px solid #EBEEF5;

        /deep/ .el-upload-list--picture-card {
            display: block;

            & > li:nth-child(1) {
            }

            & > li:last-child {
                margin-right: 0;
            }

            & > li {
                height: 80px;
                width: 80px;
                margin: 10px 0 10px 20px;
                float: left;
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
