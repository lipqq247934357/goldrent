<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
            <div style="margin: 20px 0 0 20px">
                伙伴类型：法人
            </div>
            <ul class="tabInfo">
                <li>
                    <div>商业伙伴全称</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>商业伙伴编码</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>商业伙伴类别</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="value"
                        >
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
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>证件生效时间</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>证件失效时间</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>公司性质</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comNature"/>
                    </div>
                </li>
                <li>
                    <div>所属行业</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comIndustry"/>
                    </div>
                </li>
                <li>
                    <div>注册资本(万元)</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"
                                  v-model="data.comRegisteredCapital"/>
                    </div>
                </li>
                <li>
                    <div>成立日期</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"
                                  v-model="data.comEstablishDate"/>
                    </div>
                </li>
                <li>
                    <div>营业地址</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comAddress"/>
                    </div>
                </li>
                <li>
                    <div>从业人数</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comMembers"/>
                    </div>
                </li>
                <li>
                    <div>营业收入(万元)</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comIncome"/>
                    </div>
                </li>
                <li>
                    <div>经营范围</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comScope"/>
                    </div>
                </li>
                <li>
                    <div>资产总额(万元)</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.totalAssets"/>
                    </div>
                </li>
                <li>
                    <div>企业规模</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comScale"/>
                    </div>
                </li>
                <li>
                    <div>法定代表人</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.legalPerson"/>
                    </div>
                </li>
                <li>
                    <div>法人证件类型</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.legalCertType"/>
                    </div>
                </li>
                <li>
                    <div>法人证件号码</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.legalCertNo"/>
                    </div>
                </li>
                <li>
                    <div>法人证件失效时间</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text"
                                  v-model="data.legalCertDeadline"/>
                    </div>
                </li>
                <li>
                    <div>法人电话</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.legalMobile"/>
                    </div>
                </li>
                <li>
                    <div>法人地址</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.legalAddress"/>
                    </div>
                </li>
                <li>
                    <div>联系人</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>联系地址</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comMobile"/>
                    </div>
                </li>
                <li>
                    <div>管户人</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.accountHolder"/>
                    </div>
                </li>
                <li>
                    <div>贷款卡号</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.bankAccount"/>
                    </div>
                </li>
                <li class="attachment">
                    <div>附件</div>
                    <div>
                        <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                class="upload-demo"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </li>
                <li class="attachment">
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
                <div v-if="imgFile">
                    <template v-for="value in imgFile">
                        <h3>{{value.nodeName}}</h3>
                        <ul>
                            <upload :name="val" :relationId="22222" :type="key"
                                    @handlePictureCardPreview="handlePictureCardPreview"
                                    v-for="(val,key) in value.nodes"/>
                        </ul>
                    </template>
                </div>
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
    import upload from './upload';
    import {urlParse} from '../../utils/utils';

    export default {
        components: {
            componentitle, upload
        },
        data() {
            return {
                message: '基本信息',
                titletext: '商业伙伴维护',
                id: '',
                data: {},
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
                }],
                dialogVisible: false,
                dialogImageUrl: '',
                type: '',
                imgFile: {}
            }
        },
        created() {
            // 增删改数据
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

            //影像资料数据
            this.imgData();
        },
        methods: {
            async query(id) {
                // 添加信息`
                let data = await this.$get(`/bussPartner/getPartnerInfo?partnerType=2&partnerId=${id}`);
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    this.data = data.data.data;
                }
            },
            async getRelationId() { // 保存用户信息
                let data = await this.$post('/bussPartner/getPartnerId');
                if (data.data.code === '2000000') {
                    this.data.id = this.id = data.data.data;
                }
            },
            async imgData() {
                let data = await this.$post('/materialTree', {
                    materialType: 'LEGAL_MATERIAL',
                });
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    let treeInfo = data.data.data;
                    let tempArr = [];
                    Object.keys(treeInfo).forEach((key) => {
                        tempArr.push(treeInfo[key]);
                    });
                    this.imgFile = tempArr;
                }
            },
            async save() {

                if (this.type === 'add') { // 新增
                    let data = await this.$post('/bussPartner/addPartnerLegal', this.data);
                    if (data.data.code === '2000000') {
                        this.$router.push('/layout/businessM');
                    }
                } else { // 修改
                    let data = await this.$post('/bussPartner/updatePartnerLegal', this.data);
                    if (data.data.code === '2000000') {
                        this.$router.push('/layout/businessM');
                    }
                }
            },
            submit() {

            },
            handleRemove(file, fileList) { // 删除回调
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
            h3 {
                font-size: 16px;
                margin: 35px 0 35px 15px;
                font-weight: bold;
            }

            ul {
                width: 95%;
                margin: 0 auto;
                border: 1px solid #EBEEF5;
            }
        }

        .bottombut {
            width: 160px;
            margin: 15px auto;
        }
    }


    li.attachment {
        height: 55px !important;

        & > div {
            height: 55px !important;
        }

        & > div:nth-child(2) {
            padding: 0 5%;
        }

        /deep/ ul.el-upload-list {
            margin-top: 5px;
            float: right;
            width: 70%;
        }
    }

</style>
