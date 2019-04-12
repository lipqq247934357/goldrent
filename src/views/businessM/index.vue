<template>
<div class="businfo">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" />
    </div>
    <div class="topcontent">
        <div>
            <label>业务编号：</label>
            <el-input placeholder="请输入内容" class="contentinout"></el-input>
            <label class="rightlabel">承租人姓名：</label>
            <el-input placeholder="请输入内容" class="contentinout"></el-input>
        </div>
        <div>
            <label>到期日期：</label>
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
            </el-date-picker>

            <label class="rightlabel">任务状态：</label>
            <template>
                <el-select v-model="value" placeholder="请选择" class="choiceselect">
                    <el-option
                        v-for="item in options"
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
                <label for="" @click="add" class="search">新增</label>
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
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                    <!-- 分页 -->
                    <div class="block">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="currentPage2"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="100"
                                layout="sizes, prev, pager, next"
                                :total="1000">
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

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            message: '筛选条件',
            titletext: '商业伙伴管理',
            contenttext: '任务信息',
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
            value: '',
            currentPage2: 1,
            value1: ''
        }
    },
    components: {
        componentitle,
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleClick(val) {
            //查看按钮
            console.log(val);
            this.$router.push({
                path: '/layout/addbusine'
            })
        },
        edit(val) {
            // 编辑按钮
            console.log(val);
            this.$router.push({
                path: '/layout/addbusine',
                query: {

                }
            })
        },
        add() {
            // 新增按钮
            this.$router.push({
                path: '/layout/addbusine',
                query: {

                }
            })
        }
    },
}
</script>
<style lang="less">
.businfo {
    background: #fff;
    .topTitle {
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
