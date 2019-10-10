<template>
    <div @keyup.enter="search" class="businfo loanmoney">
        <div class="topTitle">
            <componentitle :message="message" :parenTtext="parenTtext" :titletext="titletext" :url="url"/>
        </div>
        <div class="topcontent">
            <div>
                <label>业务编号：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="bussNumber"></el-input>
                <label class="rightlabel">承租人姓名：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="loanName"></el-input>
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
                    <el-select @change="selectchange(value)" class="choiceselect" placeholder="请选择" v-model="value">
                        <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in options">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <button
                    :autofocus="true"
                    @click="search"
                    @keyup.enter="search"
                    class="search el-icon-search"
                    name="button"
                    type="button">
                查询
            </button>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>任务信息</span>
                    <el-button :disabled="downlod == 'N'" @click="batchloanconfirm" class="againbutton" type="primary">
                        放款确认
                    </el-button>
                    <el-button :disabled="sbmit == 'N'" @click="downloadfirl" class="againbutton otheragainbutton"
                               type="primary">导出清单
                    </el-button>
                </div>
            </div>
            <!-- 弹出框 -->
            <el-dialog
                    :before-close="handleClose"
                    :visible.sync="dialogVisible"
                    title="放款确认"
                    width="40%">
                <div class="dialogDivmargin">
                    <span>放款日期:  </span>
                    <el-date-picker
                            readonly
                            :picker-options="pickerOptions"
                            format="yyyy 年 MM 月 dd 日"
                            placeholder="选择日期"
                            style="min-width: 200px;width: 80%;"
                            type="date"
                            v-model="endTime"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="dialogDivmargin">
                    开户行:&nbsp;&nbsp;&nbsp;
                    <el-input readonly style="min-width: 200px;width: 80%;" v-model="bankName"></el-input>
                </div>
                <div class="dialogDivmargin">
                    放款账号:
                    <el-input readonly style="min-width: 200px;width: 80%;" v-model="bankCode"></el-input>
                </div>
                <div class="dialogDivmargin">
                    <span style="vertical-align: top;margin-top: 10px;">审批意见: </span>
                    <el-input type="textarea" :rows="10" style="min-width: 200px;width: 80%;" v-model="bankOpinion"></el-input>
                </div>
                <span class="dialog-footer" slot="footer">
                <el-button @click="batchConfirmation" type="primary" v-loading.fullscreen.lock="fullscreenLoading">确认</el-button>
                <el-button @click="back">退回</el-button>
                </span>
            </el-dialog>
            <!-- 弹出框end -->
            <!-- 表格 -->
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="{
                    'color': '#212121',
                    'font-size': '14px',
                    'font-weight': 'bold'
                }"
                        @selection-change="handleSelectionChange"
                        border
                        element-loading-text="拼命加载中"
                        ref="multipleTable"
                        size="small"
                        style="width: 100%"
                        v-loading="loading">
                    <el-table-column
                            :selectable='selectInit'
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="业务编号"
                            prop="bussNo"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            label="租赁人姓名"
                            prop="custName">
                    </el-table-column>
                    <el-table-column
                            label="计划起租日"
                            prop="startDate">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatAmount"
                            label="融资金额(元)"
                            prop="raiseFunds">
                    </el-table-column>
                    <el-table-column
                            label="主办"
                            prop="organiser">
                    </el-table-column>
                    <el-table-column
                            label="协办"
                            prop="coordinator">
                    </el-table-column>
                    <el-table-column
                            label="收款人姓名"
                            prop="receiptAccountName">
                    </el-table-column>
                    <el-table-column
                            label="收款人账号"
                            prop="receiptAccount">
                    </el-table-column>
                    <el-table-column
                            label="收款人开户行"
                            prop="receiptAccountBank">
                    </el-table-column>
                </el-table>
            </template>

            <!-- 分页 -->
            <div class="block">
                <el-pagination
                        :current-page.sync="currentPage2"
                        :page-size="10"
                        :page-sizes="[10, 20, 30, 40]"
                        :total="alldata.totalCount"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        layout="sizes, prev, pager, next">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../components/title/title.vue';
    import axios from 'axios';
    import formatter from '@/components/mixins/formatter';


    export default {
        mixins: [formatter],
        data() {
            return {
                loading: false,
                parenTtext: '放款管理',
                bankOpinion: '' , //审批意见
                url: '/layout/loanmoneyconfirmre?idJurisdiction=9',
                message: '筛选条件',
                titletext: '放款确认复核',
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
                bankName: '', // 开户行名称
                bankCode: '', // 开户行号
                alsoSize: 10, // 默认10条
                nowPage: 1, // 当前页
                dialogVisible: false, // 弹出框
                bussNoarr: [], // 用于批量上传的bussNo
                downlod: '',
                sbmit: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                submitStatus: false,
                fullscreenLoading: false,

            }
        },
        created() {
            this.query();
            this.jurisdiction();
        },
        components: {
            componentitle,
        },
        methods: {
            jurisdiction(val) {
                let sonresourceId = this.$route.query.idJurisdiction; // 获取菜单栏的映射到uel上的id来请求ajax活的权限
                this.$get(`/user/get/sonresource?id=${sonresourceId}`).then(res => {
                    // 权限ajax
                    this.downlod = res.data.data.downlod;
                    this.sbmit = res.data.data.sbmit;
                });
            },
            batchloanconfirm() {
                // console.log(this.bussNoarr);
                if (this.bussNoarr == 0) {
                    this.$message.error('至少应该选择一条信息');
                    return;
                }
                this.updateEndTime();
            },
            updateEndTime() {
                if (this.bussNoarr.length > 1) { // 提示用户是否确认取消
                    this.$confirm('您选择了多条待放款的数据，放款时间和放款账户信息可能不同，' +
                        '若要查看放款信息，请单笔放款，若确认多条放款，请点击通过', '放款确认', {
                        confirmButtonText: '通过',
                        cancelButtonText: '关闭',
                        type: 'info'
                    }).then(() => {
                        this.batchConfirmation();
                    }).catch(() => {
                    })
                } else { // 展示弹框
                    let currentData = [];
                    for (let i = 0, len = this.tableData.length; i < len; i++) {
                        if (this.tableData[i].bussNo == this.bussNoarr[0]) {
                            currentData = this.tableData[i];
                        }
                    }
                    this.endTime = currentData.loanDate;
                    this.bankName = currentData.lendAccountBank;
                    this.bankCode = currentData.lendAccount;
                    this.dialogVisible = true;
                }
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            batchConfirmation() {
                const loading = this.$loading({
                                      lock: true,
                                      text: 'Loading',
                                      spinner: 'el-icon-loading',
                                      background: 'rgba(0, 0, 0, 0.7)'
                                    });
                if (this.submitStatus)
                    return;
                this.submitStatus = true;
                this.$post('/LoanGrantConfirm/batchGrantConfirm', {
                    bussNos: this.bussNoarr,
                    loanGrantDate: this.endTime, // 可以不传
                    conclusion: this.bankOpinion, // 审批意见

                }).then(res => {
                    this.submitStatus = false;
                    // console.log(res);
                    if (res.data.code == '2000000') {
                        this.$message.success('批量放款成功');
                        setTimeout(function() {
                            loading.close();
                        },200);
                        this.query();
                        this.dialogVisible = false;
                    } else {
                        setTimeout(function() {
                            loading.close();
                        },200);
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
            query(numbers) {
                this.loading = true;
                this.$post('/LoanGrantConfirm/queryLoanGrantList', {
                    bussNo: this.bussNumber, // 业务编号
                    custName: this.loanName, // 承租人姓名
                    status: this.value, //任务状态
                    createTimeStart: this.beginTime, // 任务开始时间
                    createTimeEnd: this.endTime, // 任务结束时间
                    numPerPage: this.alsoSize, // 每页多少条
                    currentPage: '1', // 每次点击查询按钮都是第一页
                    taskType: '51'
                }).then(res => {
                    if (res.data.code == '2000000') {
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
                        bussNo: val.bussNo,
                    }
                })
            },
            tableloanconfirm(val) {
                // 放款确认
                this.$router.push({
                    path: '/layout/confirmhandle',
                    query: {
                        disabled: 2, // 1为子页面input不可以编辑，2为可以
                        bussNo: val.bussNo,
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
                let bussArr = [];
                for (let i = 0; i < val.length; i++) {
                    bussArr.push(val[i].bussNo);
                }
                this.bussNoarr = bussArr;
            },
            downloadfirl() {
                axios({
                    method: 'post',
                    url: '/LoanGrantOpinion/downLoadLoanGrant', // 请求地址
                    data: {
                        ids: this.bussNoarr
                    }, // 参数
                    responseType: 'blob' // 表明返回服务器返回的数据类型
                }).then((res) => { // 处理返回的文件流
                        const content = res;
                        const blob = new Blob([res.data], {type: 'application/vnd.ms-excel'});
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
            selectInit(row, index) {
                if (row.status == '02') {
                    return false  //不可勾选
                } else {
                    return true  //可勾选
                }
            },
            back() {
                if (this.submitStatus) {
                    return;
                }
                this.submitStatus = true;
                axios({
                    method: 'post',
                    url: '/LoanGrantConfirm/backGrantConfirm', // 请求地址
                    data: {
                        bussNos: this.bussNoarr,
                        conclusion: this.bankOpinion // 审批意见

                    }, // 参数
                }).then((res) => { // 退回成功，刷新页面
                    if(res.data.code === "2000000"){
                        this.$message.success('退回成功');
                        this.dialogVisible = false;
                        this.query();
                    }else{
                        this.$message.success(res.data.msg);
                    }
                    this.submitStatus = false;
                })
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

    .loanmoney .otheragainbutton {
        right: 150px;
    }
    .dialogDivmargin {
        width: 80%;
        margin: 10px auto;
    }
</style>
