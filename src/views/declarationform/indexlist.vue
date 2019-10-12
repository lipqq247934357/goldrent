<template>
    <div class="businfo" @keyup.enter="queryclick">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext" :parenTtext="parenTtext" :url="url"/>
        </div>
        <div class="topcontent">
            <div>
                <label>业务编号</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="bussNo"></el-input>
                <label class="rightlabel">承租人姓名</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="custName"></el-input>
            </div>
            <div>

                <label>任务状态</label>
                <template>
                    <el-select class="choiceselect" placeholder="请选择" v-model="selectstatus" >
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <button
                @click="queryclick"
                class="search queryButton el-icon-search"
                name="button"
                @keyup.enter="queryclick"
                :autofocus="true"
                type="button">
                查询
            </button>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>任务列表</span>
                </div>
                <el-button
                    type="primary"
                    size="mini"
                    :disabled="lessinfobutton == 'N'"
                    @click="addnewForm"
                    class="addNew">
                    新建报单
                </el-button>
            </div>



            <!-- 表格 -->
            <template>
                <el-table
                        :data="tableData"
                        border
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        :header-cell-style="{
                            'color': '#212121',
                            'font-size': '14px',
                            'font-weight': 'bold'
                        }"
                        style="width: 100%;">
                    <el-table-column
                            min-width="210px"
                            label="业务编号"
                            prop="bussNo">
                    </el-table-column>
                    <el-table-column
                            label="承租人姓名"
                            prop="leaseholder">
                    </el-table-column>
                    <el-table-column
                            min-width="95px"
                            label="租赁期限"
                            prop="startDate">
                    </el-table-column>
                    <el-table-column
                            min-width="90px"
                            :formatter="formatAmount"
                            label="融资金额(元)"
                            prop="raiseFunds">
                    </el-table-column>
                    <el-table-column
                            label="内部收益率"
                            prop="leaseholder">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            prop="name">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleOrder(scope.row)"
                                size="small"
                                type="text"
                                :disabled="lessinfobutton == 'N'"
                                class="elmbutton">
                                处理
                            </el-button>
                            <el-button
                                @click="lookClick(scope.row)"
                                size="small"
                                type="text"
                                :disabled="lessinfobutton == 'N'"
                                class="elmbutton">
                                查看
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
                    :total="parseInt(allpage)">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../components/title/title.vue';
    import formatter from '@/components/mixins/formatter';

    export default {
        components: {
            componentitle,
        },
        mixins:[formatter],
        data() {
            return {
                url: '/layout/businfo',
                parenTtext: '业务信息',
                message: '筛选条件',
                titletext: '业务信息列表',
                contenttext: '任务信息',
                bussNo: '', // 订单号
                custName: '', // 承租人姓名
                task_name: 'ALL_ORDER', // 储存任务名称
                selectstatus: '', // 储存任务状态
                statusOptions: [
                    {
                        value: '全部',
                        label: '全部'
                    },
                    {
                        value: '00',
                        label: '待处理'
                    },
                    {
                        value: '01',
                        label: '处理中'
                    },
                    {
                        value: '02',
                        label: '已提交',
                    },
                    {
                        value: '03',
                        label: '已拒绝'
                    },
                    {
                        value: '04',
                        label: '已退回'
                    }
                ],

                tableData: [
                    // id	该业务对应的当前审核状态的id	string
                    // bussNo业务编号String
                    //
                    // custName租承租人姓名String
                    //
                    // taskname任务名称String
                    //
                    // ownerName任务员姓名String
                    // status任务状态String
                    //
                    // beginTime	任务开始时间	Timestamp
                    //
                    // finishTime	任务结束时间	Timestamp
                    //
                    // createTime	任务创建时间	Timestamp
                ],
                pagesothen: 10,
                nowpage: 1,
                currentPage2: 1,
                allpage: '',
                loading: true,
                lessinfobutton: ''
            }
        },
        created() {
            this.pages();
            this.jurisdiction();
        },
        methods: {
            jurisdiction(val) {
                let sonresourceId = this.$route.query.idJurisdiction; // 获取菜单栏的映射到uel上的id来请求ajax活的权限
                this.$get(`/user/get/sonresource?id=${sonresourceId}`).then(res => {
                    // 权限ajax
                    this.lessinfobutton = res.data.data.info
                });
            },
            handleSizeChange(val) {
                this.pagesothen = val;
                this.pages();
            },
            handleCurrentChange(val) {
                this.nowpage = val;
                this.pages();
            },
            queryclick() {
                this.pages();
                this.currentPage2 = 1;
            },
            //查询 点击分页 一页多少 统一调用这一函数
            pages() {
                this.$post('/buss/listBussInfo',{
                    bussNo: this.bussNo,
                    custName: this.custName,
                    taskName: this.task_name == '全部' ? '' : this.task_name,
                    currentPage: this.nowpage,
                    numPerPage: this.pagesothen
                }).then(res => {
                    if(res.data.code == '2000000') {
                        this.tableData = res.data.data.list;
                        this.allpage = res.data.data.totalCount;
                        this.loading = false;
                    }

                });
            },
            handleOrder(row) {

            },
            lookClick(row) {
                this.$router.push({
                    path: '/layout/businessdetail',query: {task_id:row.id,disabled:1,bussNo:row.bussNo,arrangementtype:'5',writeOffFlag:1}
                });
            },
            // 新建报单按钮
            addnewForm() {
                this.$router.push({
                    path: '/layout/declarationfromSign',
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
            width: 96%;
            margin: 0 auto;
        }

        .content {
            width: 95%;
            margin: 0 auto;
            .titletop {
                position: relative;
                .addNew {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    background: #ea9141;
                    border: 0;
                }
            }

        }

        .search {
            cursor: pointer;
            height: 27px;
            color: #d76500;
            font-weight: bold;
            background: #fff3e9;
            border:1px solid  #ffcb9d;
        }
    }
</style>
