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
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.custName"/>
                    </div>
                </li>
                <li>
                    <div>客户类别</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="data.custType"
                        >
                            <el-option
                                :label="item.optionName"
                                :value="item.optionCode"
                                v-for="item in partnerTypeOptions">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <div>性别</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="data.custSex"
                        >
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in sexOptions">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <div>年龄</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.custAge"/>
                    </div>
                </li>
                <li>
                    <div>联系电话</div>
                    <div>
                        <el-input maxlength="11" :disabled="type === 'detail'" size="mini" type="text" v-model="data.custMobile"/>
                    </div>
                </li>
                <li>
                    <div>微信</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.custWechat"/>
                    </div>
                </li>
                <li>
                    <div>身份证号码</div>
                    <div>
                        <el-input  maxlength="18" :disabled="type === 'detail'" size="mini" type="text" v-model="data.certNo"/>
                    </div>
                </li>
                <li>
                    <div>教育程度</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="data.custEducation"
                        >
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in custEducationOptions">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <div>婚姻状况</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="data.custMarriage"
                        >
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in custMarriageOptions">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <div>申请地居住年限</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.residenceYears"/>
                    </div>
                </li>
                <li>
                    <div>种植年限</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.cultureYears"/>
                    </div>
                </li>
                <li>
                    <div>户籍地址</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.custHomeplace"/>
                    </div>
                </li>
                <li>
                    <div>现住地</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.custAddress"/>
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
                <div v-if="imgFile">
                    <template v-for="value in imgFile">
                        <h3>{{value.nodeName}}</h3>
                        <ul>
                            <upload :disabled="type === 'detail'"
                                    :name="val"
                                    :relationId="relationId"
                                    :type="val.key"
                                    @handlePictureCardPreview="handlePictureCardPreview"
                                    v-for="(val,key) in value.nodes"/>
                        </ul>
                    </template>
                </div>
            </div>
            <div class="bottombut" v-if="type !== 'detail'">
                <el-button @click="save" type="primary"  v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
                <el-button @click="submit" type="primary"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
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
    import upload from './upload';

    export default {
        components: {
            componentitle, upload
        },
        data() {
            return {
                message: '1  基本信息',
                titletext: '商业伙伴维护',
                id: '',
                data: {},
                dialogImageUrl: '',
                dialogVisible: false,
                type: '',
                imgFile: {},
                partnerTypeOptions: [
                    {
                        value: 'NAT',
                        label: '自然人'
                    },
                    {
                        value: 'LEG',
                        label: '法人'
                    }
                ],
                sexOptions: [
                    {
                        value: 'M',
                        label: '男'
                    },
                    {
                        value: 'F',
                        label: '女'
                    }
                ],
                custEducationOptions: [
                    {
                        value: 'college',
                        label: '大专及以上'
                    },
                    {
                        value: 'senior',
                        label: '高中'
                    },
                    {
                        value: 'middle',
                        label: '初中'
                    },
                    {
                        value: 'primary',
                        label: '初中以下'
                    }
                ],
                custMarriageOptions: [
                    {
                        value: "married",
                        label: "已婚"
                    },
                    {
                        value: "widowed",
                        label: "丧偶"
                    },
                    {
                        value: "unmarried",
                        label: "未婚"
                    },
                    {
                        value: "divorced",
                        label: "离异"
                    },
                ],
                relationId: '', //
                fullscreenLoading: false,
            }
        },
        created() {
            let id = this.$route.query.id;
            this.relationId = id;
            let params = urlParse();
            if (params.id) {
                this.id = params.id;
                if (params.type === 'detail') { // 设置元素不可被更改
                    this.type = 'detail';
                } else { // 更新
                    this.type = 'update';
                }
                this.query(this.id);
            } else { // 新增
                this.type = 'add';
                this.getRelationId();
            }

            this.imgData();

            // 获取编码后台约定
            this.$post('/getConstantConfig',{
                dictionaryCode: ['custType']
            }).then(res => {
                this.partnerTypeOptions = res.data.data.custType;
            })

        },
        methods: {
            async query(id) {
                // 添加信息
                let data = await this.$get(`/bussPartner/getPartnerInfo?partnerType=1&partnerId=${id}`);
                // data
                //     id	数据ID	String
                //     partnerType 商业伙伴类型 String
                //
                //     certNo 身份证号 String
                //
                //     custName 商业伙伴全称 String
                //
                //     custSex 性别 String
                //
                //     custHomeplace 户籍地址 String
                //
                //     custAge 年龄 String
                //
                //     custMobile 联系电话 String
                //
                //     custWechat 微信 String
                //
                //     custEducation 教育程度 String
                //
                //     custMarriage 婚姻状况 String
                //
                //     residenceYears 申请地居住年限 String
                //
                //     company 工作单位 String
                //
                //     custAddress 现住址 String
                //
                //     creditRating 征信报告 String
                //
                //     cultureYears	种植年限
                //     custType	客户渠道
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    this.data = data.data.data;
                }
            },
            async imgData() {
                let data = await this.$post('/materialTree', {
                    materialType: 'NATURE_MATERIAL',
                });
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    let treeInfo = data.data.data.NATURE_MATERIAL;
                    let tempArr = [];
                    Object.keys(treeInfo).forEach((key) => {
                        tempArr.push(treeInfo[key]);
                    });
                    this.imgFile = tempArr;
                }
            },
            async getRelationId() { // 保存用户信息
                let data = await this.$post('/bussPartner/getPartnerId');
                if (data.data.code === '2000000') {
                    this.data.id = this.id = this.relationId= data.data.data;
                }
            },
            async save() { // 保存用户信息
                const loading = this.$loading({
                                      lock: true,
                                      text: 'Loading',
                                      spinner: 'el-icon-loading',
                                      background: 'rgba(0, 0, 0, 0.7)'
                                    });
                if (this.type === 'add') { // 新增
                    let data = await this.$post('/bussPartner/addPartnerNature', this.data);
                    if (data.data.code === '2000000') {
                        setTimeout(function() {
                            loading.close();
                        },200);
                        this.$router.push('/layout/businessM');
                    } else {
                        setTimeout(function() {
                            loading.close();
                        },200);
                    }
                } else { // 修改
                    let data = await this.$post('/bussPartner/updatePartnerNature', this.data);
                    if (data.data.code === '2000000') {
                        this.$router.push('/layout/businessM');
                        setTimeout(function() {
                            loading.close();
                        },200);
                    } else {
                        setTimeout(function() {
                            loading.close();
                        },200);
                    }
                }
            },
            submit() {
                this.save();
            },
            handleRemove(file, fileList) { // 删除回调
            },
            handlePictureCardPreview(file) { // 图片浏览功能
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
        }
    }
</script>
<style lang="less" scoped>

    // 引入公共的样式
    @import '../../public/businessm';

    .businfo {
        background: #fff;

        .topTitle {
            width: 96%;
            margin: 0 auto;
        }

        .content {
            width: 95%;
            margin: 0 auto;
        }

        .imgbox {
            h3 {
                font-size: 16px;
                font-weight: bold;
                background: #f5f5f5;
                height: 50px;
                line-height: 50px;
                padding-left: 15px;
                color: #585858;
            }

            ul {
                width: calc(100% - 3px);
                margin: 0 auto;
                border: 1px solid #EBEEF5;
                border-bottom: 0;
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
