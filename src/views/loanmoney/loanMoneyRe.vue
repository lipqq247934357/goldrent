<template>
<div class="businfo" @keyup.enter="search">
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
            </div>
        </div>

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
                style="width: 100%">
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
                    label="融资金额（元）">
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
                    prop="name"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.status == '待处理' || scope.row.status == '处理中' || scope.row.status == '已退回'"
                            @click="edit(scope.row)"
                            type="text"
                            size="small"
                            :disabled="buttondeal == 'N'">
                            处理
                        </el-button>
                        <el-button
                            @click="handleClick(scope.row)"
                            type="text"
                            :disabled="buttoninfo == 'N'"
                            size="small">
                            详情
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
import formatter from '@/components/mixins/formatter';

export default {
    mixins:[formatter],
    data() {
        return {
            loading: false,
            parenTtext: '放款管理',
            url: '/layout/loanmoneyre?idJurisdiction=50',
            message: '筛选条件',
            titletext: '放款审批复核',
            contenttext: '任务信息',
            tableData: [
                // 返回示例
                // {
                //     "msg": "success",
                //     "code": "2000000",
                //     "data": {
                //         "currentPage": 1,
                //         "numPerPage": 10,
                //         "totalCount": 3,
                //         "recordList": [{
                //             "id": "1",
                //             "version": 0,
                //             "status": "03",
                //             "creator": "1",
                //             "createTime": "2019-04-10T03:17:21.000+0000",
                //             "editor": "1",
                //             "editTime": "2019-04-12T07:19:49.000+0000",
                //             "bussNo": "demoData2",
                //             "custId": "cust1",
                //             "custName": "name1",
                //             "taskType": "20",
                //             "isCurrent": "Y"
                //         }],
                //         "totalPage": 1,
                //         "beginPageIndex": 1,
                //         "endPageIndex": 1
                //     }
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
            buttondeal: '', // 处理按钮
            buttoninfo: '' // 详情按钮
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
                this.buttondeal = res.data.data.deal;
                this.buttoninfo = res.data.data.info;
            });
        },
        // 下拉框事件
        selectchange(val) {
        },
        //进入页面获取数据展示在表格中
        query(numbers){
            this.loading = true;
            this.$post('/LoanGrantOpinion/queryLoanGrantList',{
                bussNo: this.bussNumber, // 业务编号
                custName: this.loanName, // 承租人姓名
                status: this.value, //任务状态
                createTimeStart: this.beginTime, // 任务开始时间
                createTimeEnd: this.endTime, // 任务结束时间
                numPerPage: this.alsoSize, // 每页多少条
                currentPage: this.nowPage, // 当前页
                taskType: '41'
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
        handleClick(val) {
            //查看按钮
            this.$router.push({
                path: '/layout/loadapprovaldetail',
                query: {
                    disabled: 1, // 1为子页面input不可以编辑，2为可以
                    id:val.id,
                    bussNo:val.bussNo,
                    custId: val.custId,
                    arrangement: 6, // 默认贷款审批 2上会审议 3主任审批 4资深审批 5放款审批
                    nowpath: this.$route.path,
                    nowurlName: '放款审批列表',
                    loanmoneyOperation: '放款审批操作',
                    idJurisdiction: this.$route.query.idJurisdiction,
                    roleOperation: '30' // 区别是放款管理还是授信审批管理 10授信审批 30放款审批
                }
            })
        },
        edit(val) {
            // 编辑按钮
            this.$router.push({
                path: '/layout/loadapprovaldetail',
                query: {
                    disabled: 2, // 1为子页面input不可以编辑，2为可以
                    id:val.id,
                    bussNo:val.bussNo,
                    custId: val.custId,
                    arrangement: 6, //1 默认贷款审批 2上会审议 3主任审批 4资深审批 5放款审批经办 6 放款审批复核
                    nowpath: this.$route.path,
                    nowurlName: '放款审批列表',
                    loanmoneyOperation: '放款审批操作',
                    idJurisdiction: this.$route.query.idJurisdiction,
                    roleOperation: '30' // 区别是放款管理还是授信审批管理 10授信审批 30放款审批
                }
            })
        },
        // 查询按钮
        search() {
            this.loading = true;
            this.nowPage = 1;
            this.currentPage2 = 1;
            this.query();
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
</style>
