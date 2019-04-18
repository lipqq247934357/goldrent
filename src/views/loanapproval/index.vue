<template>
<div class="businfo">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" />
    </div>
    <div class="topcontent">
        <div>
            <label>业务编号：</label>
            <el-input placeholder="请输入内容" class="contentinout" v-model="bussNumber"></el-input>
            <label class="rightlabel">承租人姓名：</label>
            <el-input placeholder="请输入内容" class="contentinout" v-model="loanName"></el-input>
        </div>
        <div>
            <label>任务创建时间：</label>
            <el-date-picker
                v-model="beginTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
                v-model="endTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>

            <label class="rightlabel">任务状态：</label>
            <template>
                <el-select v-model="value" placeholder="请选择" class="choiceselect" @change="selectchange(value)">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"

                        :value="item.value">
                    </el-option>
                </el-select>
            </template>
        </div>
        <button type="button" name="button" class="search" @click="search">查询</button>
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
                size="small"
                style="width: 100%">
                <el-table-column
                    prop="bussNo"
                    label="业务编号">
                </el-table-column>
                <el-table-column
                    prop="custName"
                    label="租赁人姓名">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="任务创建时间">
                </el-table-column>
                <el-table-column
                    prop="ownerName"
                    label="任务员姓名">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="任务状态">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">处理</el-button>
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
                :page-size="10"
                layout="sizes, prev, pager, next"
                :total="alldata.totalCount">
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
            titletext: '贷款审批列表',
            contenttext: '任务信息',
            tableData: [],
            alldata: '',
            bussNumber: '', //业务编号
            loanName: '', // 承租人姓名
            options: [
                {
                    value: '待处理',
                    label: '待处理'
                },
                 {
                    value: '进行中',
                    label: '进行中'
                },
                {
                    value: '已提交',
                    label: '已提交'
                },
                {
                    value: '已退回',
                    label: '已退回'
                }
            ],
            value: '',
            currentPage2: 1,
            beginTime: '', // 开始控件时间
            endTime: '',  // 结束控件时间
            alsoSize: 10,
            nowPage: 1
        }
    },
    created() {
        this.query();
    },
    components: {
        componentitle,
    },
    methods: {
        //进入页面获取数据展示在表格中
        query(numbers){
            this.$post('/LoanApprove/queryApproveList',{}).then(res => {
                this.alldata = res.data.data;
                this.tableData = res.data.data.recordList;
            });
        },
        handleSizeChange(val) {
            this.alsoSize = val;
            this.$post('/LoanApprove/queryApproveList',{
                currentPage: this.nowPage,
                numPerPage: this.alsoSize
            }).then(res => {
                this.alldata = res.data.data;
                this.tableData = res.data.data.recordList;
            });
        },
        handleCurrentChange(val) {
            console.log('页大小',this.alsoSize);
            this.$post('/LoanApprove/queryApproveList',{
                currentPage: val,
                numPerPage: this.alsoSize
            }).then(res => {
                this.alldata = res.data.data;
                this.tableData = res.data.data.recordList;
            });
        },
        handleClick(val) {
            //查看按钮
            console.log(val);
            this.$router.push({
                path: '/layout/loadapprovaldetail',
                query: {
                    disabled: 1 // 1为子页面input不可以编辑，2为可以
                }
            })
        },
        edit(val) {
            // 编辑按钮
            console.log(val);
            this.$router.push({
                path: '/layout/loadapprovaldetail',
                query: {
                    disabled: 2 // 1为子页面input不可以编辑，2为可以
                }
            })
        },
        // 查询按钮
        search() {
            console.log(this.alsoSize);
            this.$post('/LoanApprove/queryApproveList',{
                bussNo: this.bussNumber, // 业务编号
                custName: this.loanName, // 承租人姓名
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
                numPerPage: this.alsoSize, // 每页多少条
                currentPage: '1' // 每次点击查询按钮都是第一页
            }).then(res => {
                this.alldata = res.data.data;
                this.tableData = res.data.data.recordList;
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
    .search {
        cursor: pointer;
    }

</style>
