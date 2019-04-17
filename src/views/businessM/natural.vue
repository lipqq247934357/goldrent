<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
            <div style="margin: 20px 0 0 20px">
                伙伴类型：自然人
            </div>
            <ul class="tabInfo">
                <li>
                    <div>商业伙伴全称</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>客户类别</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" />
                    </div>
                </li>
                <li>
                    <div>性别</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>

                </li>
                <li>
                    <div>年龄</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>联系电话</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>

                </li>
                <li>
                    <div>微信</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>身份证号码</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>教育程度</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>婚姻状况</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>申请地居住年限</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>种植年限</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>户籍地址</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>现住地</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div></div>
                    <div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>2  相关影像资料</span>
                </div>
            </div>

            <div class="imgbox">
                <h3 class="img-box-title">基础资料</h3>

                <ul class="img-box-content">
                    <li>
                        <div>营业执照副本原件</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </li>
                    <li>
                        <div>开户许可证原件</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </li>
                    <li>
                        <div>公司章程工商调档原件</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                    <li>
                        <div>法人、实际控制人身份证原件</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                    <li>
                        <div>法人、实际控制人户口簿原件</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                    <li>
                        <div>法人、实际控制人婚姻状况证明材料原件</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                </ul>

                <h3 class="img-box-title">财务资料</h3>
                <ul class="img-box-content">
                    <li>
                        <div>审计报告（财务报表）</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                    <li>
                        <div>纳税申请表</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                </ul>

                <h3 class="img-box-title">征信证明务资料</h3>
                <ul class="img-box-content">
                    <li>
                        <div>人行征信报告</div>
                        <div class="edit-pic">
                            <el-upload
                                    :disabled="type === 'detail'"
                                    :file-list="fileList"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card">
                                <i class="el-icon-plus"></i>
                            </el-upload>


                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottombut" v-if="type !== 'detail'">
                <el-button @click="save" type="primary">保存</el-button>
                <el-button @click="submit" type="primary">提交</el-button>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img :src="dialogImageUrl" alt="" width="100%">
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../components/title/title.vue';
    import {urlParse} from '../../utils/utils';

    export default {
        components: {
            componentitle,
        },
        data() {
            return {
                message: '1  基本信息',
                titletext: '商业伙伴维护',
                data:{},
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                type: ''
            }
        },
        created() {
            let params = urlParse();
            if (params.id) {
                if (params.type === 'detail') { // 设置元素不可被更改
                    this.type = 'detail';
                } else { // 更新
                    this.type = 'update';
                }
            } else { // 新增
                this.type = 'add';
            }
        },
        methods: {
            save() {
            },
            submit() {
            },
            handleRemove(file, fileList) { // 删除回调
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) { // 图片浏览功能
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        },
    }
</script>
<style lang="less" scoped>

    // 引入公共的样式
    @import '../../public/businessm';

    .businfo {
        background: #fff;

        .topTitle {
            width: 95%;
            margin: 0 auto;
        }

        .content {
            width: 95%;
            margin: 0 auto;
        }

        .imgbox {
            .img-box-title {
                font-size: 16px;
                margin: 35px 0 35px 15px;
                font-weight: bold;
            }
        }

        .bottombut {
            width: 160px;
            margin: 15px auto;
        }
    }

    .img-box-content {
        width: 95%;
        margin: 0 auto;
        border: 1px solid #EBEEF5;

        & > li {
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
            vertical-align: inherit;
            margin-top: 26px;
        }
    }

</style>
