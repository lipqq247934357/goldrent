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
                <el-button type="primary" class="againbutton" @click="batchloanconfirm" :disabled="downlod == 'N'">放款确认</el-button>
                <el-button type="primary" class="againbutton otheragainbutton" @click="downloadfirl" :disabled="sbmit == 'N'">导出清单</el-button>
            </div>
        </div>
        <!-- 弹出框 -->
        <el-dialog
                :before-close="handleClose"
                :visible.sync="dialogVisible"
                title="放款确认"
                width="40%">
            <div class="dialogDivmargin">
                <span>放款日期: </span>
                <el-date-picker
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        placeholder="选择日期"
                        type="date"
                        v-model="endTime"
                        style="min-width: 200px;width: 80%;"
                        value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>

            <div class="dialogDivmargin">
                开户行:&nbsp;&nbsp;&nbsp;
                <el-select v-model="bankId" style="min-width: 200px;width: 80%;">
                    <el-option
                            v-for="item in bankOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="dialogDivmargin">
                放款账号:
                <el-input readonly style="min-width: 200px;width: 80%;" v-model="bankCode"></el-input>
            </div>
            <div class="dialogDivmargin">
                <span style="vertical-align: top;margin-top: 10px;">审批意见&nbsp;:</span>
                <el-input type="textarea" style="min-width: 200px;width: 80%;" v-model="bankOpinion"></el-input>
            </div>
            <span class="dialog-footer" slot="footer">
                <el-button @click="batchConfirmation" type="primary" v-loading.fullscreen.lock="fullscreenLoading">通过</el-button>
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
                    :selectable='selectInit'
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
                    :formatter="formatAmount"
                    prop="raiseFunds"
                    label="融资金额(元)">
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
                    prop="receiptAccountName"
                    label="收款人姓名">
                </el-table-column>
                <el-table-column
                    prop="receiptAccount"
                    label="收款人账号">
                </el-table-column>
                <el-table-column
                    prop="receiptAccountBank"
                    label="收款人开户行">
                </el-table-column>
                <!-- <el-table-column
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
                        <!-- <el-button @click="look(scope.row)" type="text" size="small" v-if="scope.row.status == '02'">查看</el-button>
                        <el-button @click="tableloanconfirm(scope.row)" type="text" size="small" v-if="scope.row.status == '00'">放款确认</el-button>
                    </template>
                </el-table-column> -->
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
import formatter from '@/components/mixins/formatter';
import {getObjPropByPop} from '../../utils/utils';


export default {
    mixins:[formatter],
    data() {
        return {
            loading: false,
            parenTtext: '放款管理',
            url: '/layout/loanmoneyconfirm?idJurisdiction=61',
            message: '筛选条件',
            titletext: '放款确认经办',
            contenttext: '任务信息',
            bankOpinion: '' , //审批意见
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
            bankId:'', // 开户行
            bankOptions:[], // 开户行options
            bankCode:'', // 开户行号
            alsoSize: 10, // 默认10条
            nowPage: 1, // 当前页
            dialogVisible: false, // 弹出框
            bussNoarr: [], // 用于批量上传的bussNo
            downlod: '',
            sbmit: '',
            pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            submitStatus:false,
            fullscreenLoading: false,
        }
    },
    created() {
        this.query();
        this.jurisdiction();
        this.getBankInfo(); // 获取银行信息
    },
    watch: {
        bankId: function (val) {
            if(val){
                axios({
                    method: 'post',
                    url: 'accountinfo', // 请求地址
                    data: {
                        payType: val
                    }, // 参数
                }).then((res) => {
                    this.bankCode = res.data.data.lendAccount;
                })
            }
        },
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
            if(this.bussNoarr == 0) {
                this.$message.error('至少应该选择一条信息');
                return;
            }
            this.updateEndTime();
            this.dialogVisible = true;
        },
        updateEndTime(){
            if(this.bussNoarr.length > 1){
                this.endTime = '';
                this.bankCode = '';
                this.bankId = '';
            }else {
                let currentData = {};
                for (let i = 0, len = this.tableData.length; i < len; i++) {
                    if (this.tableData[i].bussNo == this.bussNoarr[0]) {
                        currentData = this.tableData[i];
                    }
                }
                this.endTime = currentData.loanDate || currentData.startDate;
                this.bankId = currentData.lendAccountBank && this.getObjPropByPop('value','label',currentData.lendAccountBank,this.bankOptions);
                this.bankCode = currentData.lendAccount;
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        batchConfirmation() {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            if(this.submitStatus)
                return;
            this.submitStatus = true;
            this.$post('/LoanGrantConfirm/batchDoGrantConfirm',{
                bussNos: this.bussNoarr,
                loanGrantDate: this.endTime,
                lendAccount: this.bankCode,
                lendAccountBank:this.getValueByParam('value',this.bankId,this.bankOptions),
                conclusion: this.bankOpinion
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('批量放款成功');
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.query();
                    this.dialogVisible = false;
                    this.submitStatus = false;
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
        query(numbers){
            this.loading = true;
            this.$post('/LoanGrantConfirm/queryLoanGrantList',{
                bussNo: this.bussNumber, // 业务编号
                custName: this.loanName, // 承租人姓名
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
                numPerPage: this.alsoSize, // 每页多少条
                currentPage: this.nowPage, // 当前页
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
            this.nowPage = 1;
            this.query();
            this.currentPage2 = 1;
        },
        // 全选
        handleSelectionChange(val) {
            let bussArr = [];
            for(let i = 0 ; i < val.length; i++) {
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
        selectInit(row,index){
            if (row.status == '02'){
                return false  //不可勾选
            } else {    
              return true  //可勾选
            }
        },
        getBankInfo(){ // 获取银行数据
            this.$post('/getConstantConfig',{
                dictionaryCode: ['lendAccount']
            }).then(res => {
                for(let item of res.data.data.lendAccount){
                    let obj = {};
                    obj.label = item.optionName;
                    obj.value = item.optionCode;
                    this.bankOptions.push(obj);
                }
            });
        },
        getValueByParam(name, value, arr) { // 获取某个对象中某个属性为某个值的对象，返回这个对象
            for(let item of arr){
                if(item[name] === value){
                    return item.label;
                }
            }
        },
        getObjPropByPop
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
.dialogDivmargin {
    width: 80%;
    margin: 10px auto;
}

.loanmoney .otheragainbutton {
    right: 150px;

}
</style>
