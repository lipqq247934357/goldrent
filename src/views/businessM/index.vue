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
                        v-model="form.stDate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
                -
                <el-date-picker
                        v-model="form.edDate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>

                <label class="rightlabel">任务状态：</label>
                <template>
                    <el-select v-model="form.status" placeholder="请选择" class="choiceselect">
                        <el-option
                                v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <button type="button" name="button" class="search">查询</button>
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
                <el-tabs type="border-card">
                    <el-tab-pane label="自然人">
                        <template>
                            <el-table
                                    :data="tableData"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="ID">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="供应商名称">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="企业性质">
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="负责人姓名">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="负责人电话">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="债务种类">
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="年营业额（万）">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="担保余额（万）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="被担保人">
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="最后更新时间">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!-- 分页 -->
                        <div class="block">
                            <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="pagInfo.currentPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size="pagInfo.pageSize"
                                    layout="sizes, prev, pager, next"
                                    :total="pagInfo.total">
                            </el-pagination>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="法人">
                        <ul class="infolist">
                            <li>
                                <span>商业伙伴全称</span>
                                <span>
                                宅基地
                            </span>
                            </li>
                            <li>
                                <span>商业伙伴编码</span>
                                <span>1000</span>
                            </li>
                            <li>
                                <span>商业伙伴类别</span>
                                <span>XXXXXXXXXX</span>

                            </li>
                            <li>
                                <span>统一社会信用低吗</span>
                                <span>XXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>证件生效时间</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>证件失效时间</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>公司性质</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>所属行业</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>注册资本（万元）</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>成立日期</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>营业收入（万元）</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>经营范围</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>营业地址</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>从业人数</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>资产总额（万元）</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>企业规模</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>法定代表人</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>法人证件类型</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>法人证件号码</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>法人证件失效时间</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>法人电话</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>法人地址</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>联系人</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>联系地址</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>管户人</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>贷款卡号</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                            <li>
                                <span>附件</span>
                                <span>XXXXXXXXXXXXXXX</span>
                            </li>
                        </ul>
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
                pagInfo: {
                    total: 100,
                    currentPage: 1,
                    pageSize: 10
                },
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                ],
            }
        },
        methods: {
            query() {

            },
            handleClick(row) {
                this.$router.push({
                    path: '/layout/businedetail'
                })
            },
            edit(val) {
                console.log(val);
                this.$router.push({
                    path: '/layout/editbusine',
                    query: {}
                })
            },
            add() {
                this.$router.push({
                    path: '/layout/editbusine',
                    query: {}
                })
            },
            handleSizeChange() {
                query();
            },
            handleCurrentChange() {
                query();
            }
        },
    }
</script>
<style lang="less">
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
