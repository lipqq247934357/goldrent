<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>

            <ul class="tabInfo">
                <li>
                    <div>商业伙伴全称</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>商业伙伴编码</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>商业伙伴类别</div>
                    <div>
                        <el-select class="infolistchoiceselect" placeholder="请选择" size="mini" style="width: 100%;"
                                   v-model="value">
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in options">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <div>统一社会信用代码</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>证件生效时间</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>证件失效时间</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>公司性质</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>所属行业</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>注册资本(万元)</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>成立日期</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>营业收入(万元)</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>经营范围</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>营业地址</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>从业人数</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>资产总额(万元)</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>企业规模</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>法定代表人</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>法人证件类型</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>法人证件号码</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>法人证件失效时间</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>法人电话</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>法人地址</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>联系人</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>联系地址</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>管户人</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>贷款卡号</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div>附件</div>
                    <div>
                        <el-input size="mini" type="text"/>
                    </div>
                </li>
                <li>
                    <div></div>
                    <div></div>
                </li>
            </ul>


        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>相关影像资料</span>
                </div>
            </div>

            <div class="imgbox">
                <h3>基础资料</h3>

                <ul>
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

                <h3>财务资料</h3>
                <ul>
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

                <h3>征信证明务资料</h3>
                <ul>
                    <li>
                        <div>人行征信报告</div>
                        <div class="">

                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottombut">
                <el-button @click="back" type="primary">返回</el-button>
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
        data() {
            return {
                message: '基本信息',
                titletext: '商业伙伴维护',
                options: [
                    {
                        value: '选项1',
                        label: '待处理'
                    },
                    {
                        value: '选项2',
                        label: '进行中'
                    },
                    {
                        value: '选项3',
                        label: '已提交'
                    },
                    {
                        value: '选项4',
                        label: '已退回'
                    }
                ],
                sexOptions: [
                    {
                        value: '1',
                        label: '男'
                    },
                    {
                        value: '2',
                        label: '女'
                    }
                ],
                marrayOptions: [
                    {
                        value: '1',
                        label: '未婚'
                    },
                    {
                        value: '2',
                        label: '已婚'
                    }
                ],
                value: '',
                fileList: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                dialogVisible:false,
                dialogImageUrl: ''
            }
        },
        components: {
            componentitle,
        },
        created() {
            this.form = {};
            // 获取updateId,如果有值说明是更新
            let params = urlParse();
            // 主键查询，有值是修改，将主键保存，否则设置增加人为自己
            if (params.updateId)
                this.query(params.updateId);
        },
        methods: {
            query(updateId) {
                // 添加信息
            },
            back() {

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
            h3 {
                font-size: 16px;
                margin: 35px 0 35px 15px;
                font-weight: bold;
            }

            ul {
                width: 95%;
                margin: 0 auto;
                border: 1px solid #EBEEF5;

                li {
                    width: 100%;
                    height: 100px;
                    text-align: center;
                    clear: both;

                    div {
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
        }

        .bottombut {
            width: 160px;
            margin: 15px auto;
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
