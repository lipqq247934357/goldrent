<template>
<div class="businfo" @keyup.enter="search">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" :parenTtext="parenTtext" :url="url"/>
    </div>
    <div class="topcontent">
        <div class="timeChoice">
            <label>任务创建时间：</label>
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
                <el-button type="primary" class="againbutton" @click="downloadfirl">下载待放款清单</el-button>
            </div>
        </div>

        <!-- 表格 -->
        <template>
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                border
                size="small"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                :header-cell-style="{
                    'color': '#212121',
                    'font-size': '14px',
                    'font-weight': 'bold'
                }"
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
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
import axios from 'axios';
export default {
    data() {
        return {
            parenTtext: '贷款审批',
            url: '/layout/loadapproval',
            message: '筛选条件',
            titletext: '放款审批列表',
            contenttext: '任务信息',
            tableData: [], // 表格
            alldata: '', // 总页数
            bussNumber: '', //业务编号
            loanName: '', // 承租人姓名
            options: [
                {
                    value: '全部',
                    label: '全部'
                },
                {
                    value: '待处理',
                    label: '待处理'
                },
                 {
                    value: '处理中',
                    label: '处理中'
                },
                {
                    value: '已提交',
                    label: '已提交'
                },
                {
                    value: '已拒绝',
                    label: '已拒绝'
                },
                {
                    value: '已终止',
                    label: '已终止'
                },
                {
                    value: '已退回',
                    label: '已退回'
                }
            ],
            value: '', // 储存任务状态
            currentPage2: 1,
            beginTime: '', // 开始控件时间
            endTime: '',  // 结束控件时间
            alsoSize: 10, // 默认10条
            nowPage: 1, // 当前页
            idlist: [],
            fileName: ''
        }
    },
    created() {
        this.query();
    },
    components: {
        componentitle,
    },
    methods: {
        // 下载待放款清单
        downloadfirl() {
            axios({ // 用axios发送post请求
                method: 'post',
                url: '/LoanGrantOpinion/downLoadLoanGrant', // 请求地址
                data: {
                  ids: this.idlist
                }, // 参数
                responseType: 'blob' // 表明返回服务器返回的数据类型
            })
            .then((res) => { // 处理返回的文件流
                const content = res;
                const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
                const fileName = window.decodeURI(res.headers['content-disposition'].split('filename=')[1]);
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                } else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }
            })
        },
        // 表格全选功能与单选功能
        handleSelectionChange(val) {
            if(val) {
                for(let a = 0 ; a < val.length; a++) {
                    this.idlist = [...new Set([...this.idlist, val[a].bussNo])];
                }
            }
            if(val.length == 0) {
                this.idlist = [];
            }
        },
        // 下拉框事件
        selectchange(val) {

        },
        //进入页面获取数据展示在表格中
        query(numbers){
            this.$post('/LoanGrantOpinion/queryLoanGrantDownList',{
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
                numPerPage: this.alsoSize, // 每页多少条
                currentPage: '1' // 每次点击查询按钮都是第一页
            }).then(res => {
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
                if(res.data.code == '2000000') {
                    this.alldata = res.data.data;
                    this.tableData = res.data.data.recordList;

                }
            });
        },
        handleSizeChange(val) {
            this.alsoSize = val;
            this.$post('/LoanGrantOpinion/queryLoanGrantDownList',{
                currentPage: this.nowPage,
                numPerPage: this.alsoSize,
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间

            }).then(res => {
                if(res.data.code == '2000000') {
                    this.alldata = res.data.data;
                    this.tableData = res.data.data.recordList;
                }
            });
        },
        handleCurrentChange(val) {
            this.nowPage = val;
            this.$post('/LoanGrantOpinion/queryLoanGrantDownList',{
                currentPage: this.nowPage, //当前页
                numPerPage: this.alsoSize, // 页大小
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.alldata = res.data.data;
                    this.tableData = res.data.data.recordList;
                }
            });
        },
        // 查询按钮
        search() {
            this.$post('/LoanGrantOpinion/queryLoanGrantDownList',{
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
                numPerPage: this.alsoSize, // 每页多少条
                currentPage: '1' // 每次点击查询按钮都是第一页
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.alldata = res.data.data;
                    this.tableData = res.data.data.recordList;
                }
            });
        }
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
    .topbox {
        .againbutton {
            position: absolute;
            top: 7px;
            right: 15px;
            height: 30px;
            line-height: 0px;
            color: #d76500;
            background: #fff;
            border: 1px solid #ffcb9d;
            text-align: center;
            span {
                margin: 0;
            }
        }
    }
</style>
