<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
            <ul class="tabInfo">
                <li>
                    <div>回购人名称</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>企业性质</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>注册资本金</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>

                </li>
                <li>
                    <div>年营业额</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>经销商层级</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>

                </li>
                <li>
                    <div>回购方负责人</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>回购方联系电话</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
            </ul>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>负债及对外担保情况</span>
                </div>

                <h3>回购人</h3>
                <ul class="tabInfo">
                    <li>
                        <div>回购人</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                    <li>
                        <div>债务种类</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                    <li>
                        <div>债务余额</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>

                    </li>
                    <li>
                        <div>担保余额</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                    <li>
                        <div>被担保人</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>

                    </li>
                    <li>
                        <div>备注</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                </ul>


                <h3>回购方实际控制人</h3>

                <ul class="tabInfo">
                    <li>
                        <div>回购方实际控制人</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                    <li>
                        <div>债务种类</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                    <li>
                        <div>债务余额</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>

                    </li>
                    <li>
                        <div>担保余额</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                    <li>
                        <div>被担保人</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>

                    </li>
                    <li>
                        <div>备注</div>
                        <div>
                            <el-input size="mini" type="text"/>
                        </div>
                    </li>
                </ul>

            </div>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>回购人相关影像资料</span>
                </div>
            </div>

            <div class="imgbox">
                <h3 class="img-box-title">基础资料</h3>

                <ul class="img-box-content">
                    <li>
                        <div>营业执照副本原件</div>
                        <div class="edit-pic">
                            <el-upload
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
                        <div class="">

                        </div>
                    </li>
                    <li>
                        <div>公司章程工商调档原件</div>
                        <div class="">

                        </div>
                    </li>
                    <li>
                        <div>法人、实际控制人身份证原件</div>
                        <div class="">

                        </div>
                    </li>
                    <li>
                        <div>法人、实际控制人户口簿原件</div>
                        <div class="">

                        </div>
                    </li>
                    <li>
                        <div>法人、实际控制人婚姻状况证明材料原件</div>
                        <div class="">

                        </div>
                    </li>
                </ul>

                <h3 class="img-box-title">财务资料</h3>
                <ul class="img-box-content">
                    <li>
                        <div>审计报告（财务报表）</div>
                        <div class="">

                        </div>
                    </li>
                    <li>
                        <div>纳税申请表</div>
                        <div class="">

                        </div>
                    </li>
                </ul>

                <h3 class="img-box-title">征信证明务资料</h3>
                <ul class="img-box-content">
                    <li>
                        <div>人行征信报告</div>
                        <div class="">

                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottombut">
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

    export default {
        data() {
            return {
                message: '基本信息',
                titletext: '商业伙伴维护',
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }]
            }
        },
        components: {
            componentitle,
        },
        methods: {
            save() {
            },
            submit() {
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
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

           /deep/ .el-icon-plus {
               vertical-align: inherit;
               margin-top: 26px;
            }
        }
    }

</style>
