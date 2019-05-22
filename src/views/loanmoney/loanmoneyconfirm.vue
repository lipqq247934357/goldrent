<template>
<div class="businfo loanmoney" @keyup.enter="search">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" :parenTtext="parenTtext" :url="url"/>
    </div>
    <div class="topcontent">
        <div>
            <label>业务编号：</label>
            <el-input placeholder="请输入内容" class="contentinout" v-model="bussNumber"></el-input>
            <label class="rightlabel">承租人姓名：</label>
            <el-input placeholder="请输入内容" class="contentinout" v-model="loanName"></el-input>
        </div>
        <div class="timeChoice">
            <!-- <label>任务创建时间：</label>
            <el-date-picker
                v-model="beginTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
            <p class="divborder"></p>
            <el-date-picker
                v-model="endTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker> -->

            <label>任务状态：</label>
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
        <button
            type="button"
            name="button"
            class="search el-icon-search"
            @keyup.enter="search"
            @click="search"
            :autofocus="true">
            查询
        </button>
    </div>

    <div class="content">
        <div class="titletop">
            <div class="topbox">
                <span>任务信息</span>
                <el-button type="primary" class="againbutton" @click="batchloanconfirm">批量放款确认</el-button>

            </div>
        </div>
        <!-- 弹出框 -->
        <el-dialog
            title="放款确认"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
                <span>放款日期：</span>
                <el-date-picker
                    v-model="endTime"
                    type="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="batchConfirmation">确认</el-button>
                <el-button @click="dialogVisible = false">关闭</el-button>
                </span>
            </el-dialog>
        <!-- 弹出框end -->
        <!-- 表格 -->
        <template>
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                element-loading-text="拼命加载中"
                size="small"
                :header-cell-style="{
                    'color': '#212121',
                    'font-size': '14px',
                    'font-weight': 'bold'
                }"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="bussNo"
                    width="200"
                    label="业务编号">
                </el-table-column>
                <el-table-column
                    prop="custName"
                    label="租赁人姓名">
                </el-table-column>
                <el-table-column
                    prop="startDate"
                    label="计划起租日">
                </el-table-column>
                <el-table-column
                    prop="raiseFunds"
                    label="融资金额">
                </el-table-column>
                <el-table-column
                    prop="organiser"
                    label="主办">
                </el-table-column>
                <el-table-column
                    prop="coordinator"
                    label="协办">
                </el-table-column>
                <el-table-column
                    prop="taskName"
                    label="任务名称">
                </el-table-column>
                <el-table-column
                    prop="ownerName"
                    label="当前处理人">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="操作">
                    <template slot-scope="scope">
                        <!-- status 待处理 00 ，02 已提交 -->
                        <el-button @click="look(scope.row)" type="text" size="small" v-if="scope.row.status == '02'">查看</el-button>
                        <el-button @click="tableloanconfirm(scope.row)" type="text" size="small" v-if="scope.row.status == '00'">放款确认</el-button>
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
            loading: false,
            parenTtext: '贷款审批',
            url: '/layout/loadapproval',
            message: '筛选条件',
            titletext: '放款审批列表',
            contenttext: '任务信息',
            tableData: [
                // 返回示例
                // {
                //   "msg": "success",
                //   "code": "2000000",
                //   "data": {
                //     "currentPage": 1,
                //     "numPerPage": 10,
                //     "totalCount": 3,
                //     "recordList": [
                //       {
                //         "id": "1",
                //         "version": 0,
                //         "status": "03",
                //         "creator": "1",
                //         "createTime": "2019-04-10T03:17:21.000+0000",
                //         "editor": "1",
                //         "editTime": "2019-04-12T07:19:49.000+0000",
                //         "bussNo": "demoData2",
                //         "custId": "cust1",
                //         "custName": "name1",
                //         "taskType": "20",
                //         "isCurrent": "Y"
                //       },
                //       {
                //         "id": "2",
                //         "version": 0,
                //         "status": "00",
                //         "creator": "cre1",
                //         "createTime": "2019-04-13T05:51:07.000+0000",
                //         "editor": "edi1",
                //         "editTime": "2019-04-13T05:51:07.000+0000",
                //         "bussNo": "task1",
                //         "custId": "cust2",
                //         "custName": "name2",
                //         "taskType": "20",
                //         "taskName": "张三",
                //         "ownerId": "oid1",
                //         "ownerName": "oname1",
                //         "isCurrent": "Y"
                //       },
                //       {
                //         "id": "3",
                //         "version": 0,
                //         "status": "00",
                //         "creator": "cre2",
                //         "createTime": "2019-04-13T05:52:16.000+0000",
                //         "editor": "edi2",
                //         "editTime": "2019-04-13T05:52:16.000+0000",
                //         "bussNo": "task2",
                //         "custId": "cust2",
                //         "custName": "name2",
                //         "taskType": "20",
                //         "taskName": "李四",
                //         "ownerId": "oid2",
                //         "ownerName": "oname2",
                //         "isCurrent": "Y"
                //       }
                //     ],
                //     "totalPage": 1,
                //     "beginPageIndex": 1,
                //     "endPageIndex": 1
                //   }
                // }
            ], // 表格
            alldata: '', // 总页数
            bussNumber: '', //业务编号
            loanName: '', // 承租人姓名
            options: [
                {
                    value: '待处理',
                    label: '待处理'
                },

                {
                    value: '已提交',
                    label: '已提交'
                }
            ],
            value: '待处理', // 储存任务状态
            currentPage2: 1,
            beginTime: '', // 开始控件时间
            endTime: '',  // 结束控件时间
            alsoSize: 10, // 默认10条
            nowPage: 1, // 当前页
            dialogVisible: false, // 弹出框
            bussNoarr: [] // 用于批量上传的bussNo
        }
    },
    created() {
        this.query();
    },
    components: {
        componentitle,
    },
    methods: {
        batchloanconfirm() {
            if(this.bussNoarr == 0) {
                this.$message.error('至少应该选择一条信息');
                return;
            }
            this.dialogVisible = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        batchConfirmation() {
            this.$post('/LoanGrantConfirm/batchGrantConfirm',{
                bussNos: this.bussNoarr,
                loanGrantDate: this.endTime
            }).then(res => {
                console.log(res);
                if(res.data.code == '2000000') {
                    this.$message.success('批量放款成功');
                    this.query();
                    this.dialogVisible = false;
                }
            });
        },
        loanconfirm() {
            this.dialogVisible = true;
        },
        // 下拉框事件
        selectchange(val) {

        },
        //进入页面获取数据展示在表格中
        query(numbers){
            this.loading = true;
            this.$post('/LoanGrantConfirm/queryLoanGrantList',{
                bussNo: this.bussNumber, // 业务编号
                custName: this.loanName, // 承租人姓名
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
                numPerPage: this.alsoSize, // 每页多少条
                currentPage: '1', // 每次点击查询按钮都是第一页
                taskType: '50'
            }).then(res => {

                if(res.data.code == '2000000') {
                    this.alldata = res.data.data;
                    this.tableData = res.data.data.recordList;
                    this.loading = false;
                }
            });
        },
        handleSizeChange(val) {
            this.loading = true;
            this.alsoSize = val;
            this.query();
        },
        handleCurrentChange(val) {
            this.loading = true;
            this.nowPage = val;
            this.query();
        },
        look(val) {
            // 查看按钮
            this.$router.push({
                path: '/layout/confirmhandle',
                query: {
                    disabled: 1, // 1为子页面input不可以编辑，2为可以
                    bussNo:val.bussNo,
                }
            })
        },
        tableloanconfirm(val) {
            // 放款确认
            this.$router.push({
                path: '/layout/confirmhandle',
                query: {
                    disabled: 2, // 1为子页面input不可以编辑，2为可以
                    bussNo:val.bussNo,
                }
            })
        },
        // 查询按钮
        search() {
            this.loading = true;
            this.query();
            this.currentPage2 = 1;
        },
        // 全选
        handleSelectionChange(val) {
            if(val) {
                for(let a = 0 ; a < val.length; a++) {
                    this.bussNoarr = [...new Set([...this.bussNoarr, val[a].bussNo])];
                }
            }
            if(val.length == 0) {
                this.bussNoarr = [];
            }
        },
    },
}
</script>
<style lang="less">
.businfo {
    background: #fff;
    .topTitle {
        width: 96%;
        margin: 0 auto;
    }
    .content {
        width: 96%;
        margin: 0 auto;
    }
}
.search {
    cursor: pointer;
}
.divborder {
    display: inline-block;
    border-top: 1px solid #DCDFE6;
    height: 3px;
    width: 18px;
    position: relative;
    margin-left: 25px;
}
.loanmoney .againbutton {
    position: absolute;
    top: 7px;
    right: 15px;
    height: 30px;
    line-height: 0px;
    color: #d76500;
    background: #fff;
    border: 1px solid #ffcb9d;
    span {
        margin: 0;
    }
}
</style>
