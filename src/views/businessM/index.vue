<template>
    <div class="businfo">
        <div class="topTitle">
            <componentTitle :message="firstTitle" :titletext="maxTitle"/>
        </div>
        <div class="topcontent">
            <div>
                <label>业务编号：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="form.busNo"></el-input>
                <label class="rightlabel">承租人姓名：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="form.busName"></el-input>
            </div>
            <div>
                <label>到期日期：</label>
                <el-date-picker
                        placeholder="选择日期"
                        type="date"
                        v-model="form.stDate">
                </el-date-picker>
                -
                <el-date-picker
                        placeholder="选择日期"
                        type="date"
                        v-model="form.edDate">
                </el-date-picker>

                <label class="rightlabel">任务状态：</label>
                <template>
                    <el-select class="choiceselect" placeholder="请选择" v-model="form.status">
                        <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in statusOptions">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <button class="search" name="button" type="button">查询</button>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>任务信息</span>
                    <label @click="add" class="search" style="background: #9c87d9;">新增</label>
                </div>
            </div>

            <!-- 表格 -->
            <div class="grouptables">
                <el-tabs @tab-click="tabClick" type="border-card">
                    <el-tab-pane label="自然人">
                        <template>
                            <el-table
                                    :data="naturalData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        label="ID"
                                        prop="date">
                                </el-table-column>
                                <el-table-column
                                        label="供应商名称"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="企业性质"
                                        prop="address">
                                </el-table-column>
                                <el-table-column
                                        label="负责人姓名"
                                        prop="date">
                                </el-table-column>
                                <el-table-column
                                        label="负责人电话"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="债务种类"
                                        prop="address">
                                </el-table-column>
                                <el-table-column
                                        label="年营业额（万）"
                                        prop="date">
                                </el-table-column>
                                <el-table-column
                                        label="担保余额（万）"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="被担保人"
                                        prop="address">
                                </el-table-column>
                                <el-table-column
                                        label="最后更新时间"
                                        prop="date">
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
                                    @current-change="queryNatural"
                                    @size-change="queryNatural"
                                    layout="sizes, prev, pager, next">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="法人">
                        <template>
                            <el-table
                                    :data="legalData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        label="商业伙伴全称"
                                        prop="date">
                                </el-table-column>
                                <el-table-column
                                        label="商业伙伴编码"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="商业伙伴类别"
                                        prop="address">
                                </el-table-column>
                                <el-table-column
                                        label="统一社会信用代码"
                                        prop="date">
                                </el-table-column>
                                <el-table-column
                                        label="证件失效时间"
                                        prop="name">
                                </el-table-column>
                                <el-table-column
                                        label="公司性质"
                                        prop="address">
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
                                    @current-change="queryLegal"
                                    @size-change="queryLegal"
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

    export default {
        components: {
            componentTitle,
        },
        created() {
            // 1.查找默认数据
        },
        data() {
            return {
                firstTitle: '筛选条件', // 第一个标题
                maxTitle: '商业伙伴管理', // 大标题
                form: {
                    busNo: '',
                    busName: '',
                    stDate: '',
                    edDate: '',
                    status: ''
                },
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
                naturalPagInfo: {
                    total: 100,
                    currentPage: 1,
                    pageSize: 10
                },
                legalPagInfo: {
                    total: 100,
                    currentPage: 1,
                    pageSize: 10
                },
                naturalData: [
                    {
                        id: '1',
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: '2',
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                legalData: [
                    {
                        id: '1',
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: '2',
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                path: '/layout/natural', // 增删改地址
            }
        },
        methods: {
            async query() { // 查询所有数据
                let data = await this.$post('', '');

            },
            async queryNatural() { // 分页查询自然人数据
                let data = await this.$post('', '');
            },
            async queryLegal() { // 分页查询法人数据
                let data = await this.$post('', '');
            },
            detail(row) { //查看详情
                this.$router.push({path: this.path, query: {id: row.id, type: 'detail'}});
            },
            update(row) { // 编辑页面
                this.$router.push({path: this.path, query: {id: row.id, type: 'update'}});
            },
            add() { // 新增页面
                this.$router.push({path: this.path, query: {}});
            },
            tabClick(tab) { // 0代表自然人 1代表法人
                this.path = tab.index === "0" ? '/layout/natural' : '/layout/legal';
            }
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

    .search {
        cursor: pointer;
    }
</style>
