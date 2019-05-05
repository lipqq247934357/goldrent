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
                        <!-- <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/> -->
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.comFullname"/>
                    </div>
                </li>
                <li>
                    <div>商业伙伴编码</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.partnerSerial"/>
                        <!-- <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.partnerSerial"/> -->
                    </div>
                </li>
                <li>
                    <div>商业伙伴类别</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="data.partnerType"
                        >
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in partnerTypeOptions">
                            </el-option>
                        </el-select>
                    </div>
                </li>
                <li>
                    <div>统一社会信用代码</div>
                    <div>
                        <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.socialSerial"/>
                    </div>
                </li>
                <li>
                    <div>证件生效时间</div>
                    <div>
                        <!-- <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.certStartDate"/> -->
                        <el-date-picker
                            v-model="data.certStartDate"
                            :disabled="type === 'detail'"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </li>
                <li>
                    <div>证件失效时间</div>
                    <div>
                        <!-- <el-input :disabled="type === 'detail'" size="mini" type="text" v-model="data.certEndDate"/> -->
                        <el-date-picker
                            v-model="data.certEndDate"
                            :disabled="type === 'detail'"
                            type="date"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </li>
                <li>
                    <div>公司性质</div>
                    <div>
                        <el-select :disabled="type === 'detail'" class="infolistchoiceselect" placeholder="请选择"
                                   size="mini"
                                   style="width: 100%;"
                                   v-model="data.comNature"
                        >
                            <el-option
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    v-for="item in comNatureOptions">
                            </el-option>
                        </el-select>
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
                        <!-- <el-input :disabled="type === 'detail'" size="mini" type="text"
                                  v-model="data.comEstablishDate"/> -->
                          <el-date-picker
                              v-model="data.comEstablishDate"
                              :disabled="type === 'detail'"
                              type="date"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
                          </el-date-picker>
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
                        <!-- <el-input :disabled="type === 'detail'" size="mini" type="text"
                                  v-model="data.legalCertDeadline"/> -->
                          <el-date-picker
                              v-model="data.legalCertDeadline"
                              :disabled="type === 'detail'"
                              type="date"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期">
                          </el-date-picker>
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
                        <el-input :disabled="type === 'detail'" size="mini" type="text"
                                  v-model="data.actualController"/>
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
                                :data="{bussNo:'',relationId:this.id,dataType:'2001',token:this.token}"
                                :limit="Number(1)"
                                :on-remove="handleRemove"
                                action="/web/fileUploadSingle"
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
                            <upload :name="val" :relationId="id" :type="key"
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
    import Cookies from 'js-cookie';

    export default {
        components: {
            componentitle, upload
        },
        data() {
            return {
                message: '基本信息',
                titletext: '商业伙伴维护',
                id: '',
                data: {}, // 储存ajaxdata
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
                comNatureOptions: [
                    {
                        value: 'QY01',
                        label: '企业法人'
                    },
                    {
                        value: 'SH02',
                        label: '个体工商户'
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
                dialogImageUrl: '', // 图片url
                type: '',
                imgFile: {},
                token:''
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

            // 获取token
            this.token = Cookies.get('token');

        },
        methods: {
            async query(id) {
                // 添加信息`
                let data = await this.$get(`/bussPartner/getPartnerInfo?partnerType=2&partnerId=${this.$route.query.id}`);
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    // 示例
                    // basicInfo
                    //         基本信息
                    //
                    //         id	数据ID	String
                    //         bussNo	业务编号	String
                    //         partnerType	商业伙伴类型, NAT - 自然人， LEG - 法人	String
                    //         bussType	伙伴类型 BZ -保证人， HG - 回购人	String
                    //         comFullname	商业伙伴全称/回购人名称	string
                    //         partnerSerial	伙伴编码	String
                    //         socialSerial	统一信息社会代码	String
                    //         certStartDate	证件生效时间	timestamp
                    //         feeRequire	是否收取服务费	String
                    //         serviceFee	咨询服务费	decimal
                    //         certEndDate	证件失效时间	timestamp
                    //         comNature	公司性质	String
                    //         comIndustry	公司所属行业	String
                    //         comRegisteredCapital	注册资本（万元）	decimal
                    //         comEstablishDate	公司成立日期	timestamp
                    //         comIncome	营业收入/年营业额（万元）	decimal
                    //         comAddress	营业地址	String
                    //         comMembers	从业人数	int
                    //         agencyLevel	回购方经销商层级	String
                    //         comManager	回购方负责人	String
                    //         actualController	实际控制人（评分卡使用）	String
                    //         comMobile	回购方联系电话/联系地址	String
                    //         serviceFee	回购方咨询服务费金	decimal
                    //         totalAssets	资产总额（万元）	decimal
                    //         comScale	企业规模	String
                    //         legalPerson	法人代表	String
                    //         legalCertType	法人证件类型	String
                    //         legalCertNo	法人证件号	String
                    //         legalCertDeadline	法人证件失效时间	String
                    //         legalMobile	法人电话	String
                    //         legalAddress	法人地址	String
                    //         accountHolder	管户人	String
                    //         bankAccount	借款卡号	String
                    //         partnerId	伙伴ID	String
                    //         creator	创建人	String
                    //         editor	编辑人	String
                    //         createTime	记录创建时间	timestamp
                    //         editTime	记录修改时间	timestamp
                    //         comScope	经营范围	string
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
                    let data = await this.$post('/bussPartner/update/PartnerLegal', this.data);
                    if (data.data.code === '2000000') {
                        this.$router.push('/layout/businessM');
                    }
                }
            },
            submit() {
                this.save();
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
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onExceed() {
                Message.error({message: '超出文件上传数量限制！', duration: 5 * 1000});
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
