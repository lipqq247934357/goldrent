<template>
    <div class="businfo" @keyup.enter="queryFunc">
        <div class="topTitle">
            <componentTitle :message="firstTitle" :titletext="maxTitle"/>
        </div>
        <div class="topcontent">
            <div>
                <label>商业伙伴名称：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="partnerName"></el-input>
            </div>
            <button
                @click="queryFunc"
                class="search queryButton"
                name="button"
                type="button"
                @keyup.enter="queryFunc"
                :autofocus="true">查询
            </button>
        </div>

        <div class="content">
            <!-- 表格 -->
            <div class="grouptables">

                <el-tabs @tab-click="tabClick" type="border-card">
                    <el-tab-pane label="自然人">
                        <div class="add-btn">
                            <div class="button" @click="add">新增</div>
                        </div>
                        <template>
                            <el-table
                                :data="naturalData"
                                border
                                v-loading="loading"
                                element-loading-text="拼命加载中"
                                row-key="id"
                                style="width: 100%">
                                <el-table-column
                                        label="ID"
                                        prop="id">
                                </el-table-column>
                                <el-table-column
                                        label="全称"
                                        prop="custName">
                                </el-table-column>
                                <el-table-column
                                        label="客户类别"
                                        prop="custType">
                                </el-table-column>
                                <el-table-column
                                        label="性别"
                                        :formatter="formatSex"
                                        prop="custSex">
                                </el-table-column>
                                <el-table-column
                                        label="年龄"
                                        prop="custAge">
                                </el-table-column>
                                <el-table-column
                                        label="婚姻状况"
                                        :formatter="formatMariage"
                                        prop="custMarriage">
                                </el-table-column>
                                <el-table-column
                                        label="种植年限"
                                        prop="cultureYears">
                                </el-table-column>
                                <el-table-column
                                        label="身份证号码"
                                        prop="certNo">
                                </el-table-column>
                                <el-table-column
                                        label="户籍地址"
                                        prop="custHomeplace">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        prop="name">
                                    <template slot-scope="scope">
                                        <el-button @click="update(scope.row)" size="small" type="text">编辑</el-button>
                                        <el-button @click="detail(scope.row)" size="small" type="text">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 分页 -->
                        <div class="block">
                            <el-pagination
                                    :current-page.sync="naturalPagInfo.currentPage"
                                    :page-size="naturalPagInfo.pageSize"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :total="naturalPagInfo.total"
                                    @current-change="queryNaturalCurrentChange"
                                    @size-change="queryNaturalSizeChange"
                                    layout="sizes, prev, pager, next">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="法人">
                        <div class="add-btn">
                            <div class="button" @click="add">新增</div>
                        </div>
                        <template>
                            <el-table
                                    :data="legalData"
                                    border
                                    row-key="id"
                                    style="width: 100%">
                                <el-table-column
                                        label="ID"
                                        prop="id">
                                </el-table-column>
                                <el-table-column
                                        label="全称"
                                        prop="comFullname">
                                </el-table-column>
                                <el-table-column
                                        label="统一社会信用代码"
                                        prop="socialSerial">
                                </el-table-column>
                                <el-table-column
                                        label="证件生效时间"
                                        prop="certStartDate">
                                </el-table-column>
                                <el-table-column
                                        label="营业收入(万)"
                                        prop="comIncome">
                                </el-table-column>
                                <el-table-column
                                        label="注册资本(万)"
                                        prop="comRegisteredCapital">
                                </el-table-column>
                                <el-table-column
                                        label="法定代表人"
                                        prop="legalPerson">
                                </el-table-column>
                                <el-table-column
                                        label="法人证件类型"
                                        prop="legalCertType">
                                </el-table-column>
                                <el-table-column
                                        label="法人证件号码"
                                        prop="legalCertNo">
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        prop="name">
                                    <template slot-scope="scope">
                                        <el-button @click="update(scope.row)" size="small" type="text">编辑</el-button>
                                        <el-button @click="detail(scope.row)" size="small" type="text">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 分页 -->
                        <div class="block">
                            <el-pagination
                                    :current-page.sync="legalPagInfo.currentPage"
                                    :page-size="legalPagInfo.pageSize"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :total="legalPagInfo.total"
                                    @current-change="queryLegalCurrentChange"
                                    @size-change="queryLegalSizeChange"
                                    layout="sizes, prev, pager, next">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentTitle from '../../components/title/title.vue';
    import formatter from '../../components/mixins/formatter';

    export default {
        components: {
            componentTitle,
        },
        mixins:[formatter],
        data() {
            return {
                loading: false,
                firstTitle: '筛选条件', // 第一个标题
                maxTitle: '商业伙伴管理', // 大标题
                partnerName: '', // 商业伙伴名称
                statusOptions: [ // 任务状态
                    {
                        value: '1',
                        label: '待确认'
                    },
                    {
                        value: '2',
                        label: '已提交'
                    },
                    {
                        value: '3',
                        label: '进行中'
                    }
                ],
                naturalData: [], // 自然人表格
                naturalPagInfo: {
                    total: 10,
                    currentPage: 1,
                    pageSize: 10
                },
                legalData: [], // 法人表格
                legalPagInfo: {
                    total: 10,
                    currentPage: 1,
                    pageSize: 10
                },
                path: '/layout/natural', // 增删改地址
                queryFunc: this.queryNatural, // 查询的类型
                imgId: ''
            }
        },
        mounted() {
            this.queryNatural();
        },
        methods: {
            async queryNatural() { // 分页查询自然人数据
                this.loading = true;
                let data = await this.$get(`/bussPartner/listPartnerInfo?partnerName=${this.partnerName}&partnerType=1&currentPage=${this.naturalPagInfo.currentPage}&pageSize=${this.naturalPagInfo.pageSize}`);
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    // 示例
                    // data(自然人)
                    //
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
                    //     custEducation教育程度 String
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
                    //     cultureYears	种植年限
                    // data(法人)
                    //
                    //     bussNo String业务编号
                    //
                    //     com_fullname String客户姓名
                    //
                    //
                    //     com_nature String企业性质
                    //
                    //     com_industry String公司所属行业
                    //
                    //     com_registered_capital Decimal注册资本（万元）
                    //
                    //     total_assets Decimal营业总额（万元）
                    //
                    //     creator String创建人
                    this.naturalData = data.data.data.recordList;
                    this.naturalPagInfo.total = data.data.data.totalCount;
                    this.loading = false;
                }
            },
            async queryLegal() { // 分页查询法人数据
                this.loading = true;
                let data = await this.$get(`/bussPartner/listPartnerInfo?partnerName=${this.partnerName}&partnerType=2&currentPage=${this.legalPagInfo.currentPage}&pageSize=${this.legalPagInfo.pageSize}`);
                if (data.data.code === '2000000') { // 状态正确，执行更新操作
                    this.legalData = data.data.data.recordList;
                    this.legalPagInfo.total = data.data.data.totalCount;
                    this.loading = false;
                }
            },
            queryNaturalSizeChange(val) {
                this.naturalPagInfo.pageSize = val;
                this.queryNatural();
            },
            queryNaturalCurrentChange(val) {
                this.naturalPagInfo.currentPage = val;
                this.queryNatural();
            },
            queryLegalSizeChange(val) {
                this.legalPagInfo.pageSize = val;
                this.queryLegal();
            },
            queryLegalCurrentChange(val) {
                this.legalPagInfo.currentPage = val;
                this.queryLegal();
            },
            detail(row) { // 查看详情
                this.$router.push({path: this.path, query: {id: row.id, type: 'detail'}});
            },
            update(row) { // 编辑页面
                this.$router.push({path: this.path, query: {id: row.id, type: 'update'}});
            },
            add() { // 新增页面
                this.$router.push({path: this.path});
            },
            tabClick(tab) { // 0代表自然人 1代表法人
                this.path = tab.index === "0" ? '/layout/natural' : '/layout/legal';
                this.queryFunc = tab.index === "0" ? this.queryNatural : this.queryLegal;
                this.$nextTick(() => {
                    this.queryFunc();
                });
            },
        },
    }
</script>
<style lang="less" scoped>
    .bus-info {
        background: #fff;

        .top-title {
            width: 95%;
            margin: 0 auto;
        }

        .content {
            width: 95%;
            margin: 0 auto;

            .grouptables {
                .el-tabs__header {
                    margin-bottom: 15px;
                }
            }
        }
    }


    .add-btn {
        width: 100%;
        .button{
            cursor: pointer;
            float: right;
            margin: 4px 30px 4px 0;
            padding: 6px 10px;
            background: rgb(156, 135, 217);;
            border-radius: 4px;
            color: #fff;
        }
    }
</style>
