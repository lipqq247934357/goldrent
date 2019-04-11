<template>

<div class="businfo">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" />
    </div>
    <div class="topcontent">
        <div>
            <label>业务编号：</label>
            <input type="text" name="" value="">
            <label class="rightlabel">承租人姓名：</label>
            <input type="text" name="" value="">
        </div>
        <div>
            <label>任务名称：</label>
            <template>
                <el-select v-model="value2" placeholder="请选择" class="choiceselect">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </template>
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
        <button type="button" name="button">查询</button>
    </div>

    <div class="content">
        <div class="titletop">
            <div class="topbox">
                <span>任务信息</span>
            </div>
        </div>

        <!-- 表格 -->
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="业务编号">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="承租人姓名">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="任务名称">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="任务状态">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="任务创建时间">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="任务结束时间">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
    </div>

</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            message: '筛选条件',
            titletext: '业务信息列表',
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
            currentPage2:1,
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
            choiceoptions: [
                {
                    value: '选项1',
                    label: '报单申请'
                },
                 {
                    value: '选项2',
                    label: '贷款审批'
                },
                {
                    value: '选项3',
                    label: '合同签约'
                },
                {
                    value: '选项4',
                    label: '公证登记'
                },
                {
                    value: '选项5',
                    label: '放款审批'
                },
                {
                    value: '选项6',
                    label: '放款确认'
                },
                {
                    value: '选项7',
                    label: '结清确认'
                }
            ],
            value2: ''
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
            this.$router.push({
                path: '/layout/businessdetail'
            });
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
    }
}
</style>
