<template>
    <div @keyup.enter="queryclick" class="businfo">
        <div class="topTitle" style="display: none">
            <componentitle :message="message" :parenTtext="parenTtext" :titletext="titletext" :url="url"/>
        </div>
        <div class="topcontent" style="display: none">
            <div>
                <label>业务编号</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="bussNo"></el-input>
                <label class="rightlabel">承租人姓名</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="custName"></el-input>
            </div>
            <div>
                <label>任务状态</label>
                <template>
                    <el-select class="choiceselect" placeholder="请选择" v-model="selectstatus">
                        <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in statusOptions">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <button
                    :autofocus="true"
                    @click="queryclick"
                    @keyup.enter="queryclick"
                    class="search queryButton el-icon-search"
                    name="button"
                    type="button">
                查询
            </button>
        </div>

        <div class="content" style="margin-top: 50px">
            <div class="titletop">
                <div class="topbox">
                    <span>任务列表</span>
                </div>
                <el-button
                        :disabled="lessinfobutton == 'N'"
                        @click="addnewForm"
                        class="addNew"
                        size="mini"
                        type="primary">
                    新建报单
                </el-button>
            </div>

            <!-- 表格 -->
            <template>
                <el-table
                        :data="tableData"
                        :header-cell-style="{
                            'color': '#212121',
                            'font-size': '14px',
                            'font-weight': 'bold'
                        }"
                        border
                        element-loading-text="拼命加载中"
                        style="width: 100%;"
                        v-loading="loading">
                    <el-table-column
                            label="业务编号"
                            min-width="210px"
                            prop="bussNo">
                    </el-table-column>
                    <el-table-column
                            label="承租人姓名"
                            prop="leaseholder">
                    </el-table-column>
                    <el-table-column
                            label="租赁期限"
                            min-width="95px"
                            prop="leaseTerm">
                    </el-table-column>
                    <el-table-column
                            :formatter="formatAmount"
                            label="融资金额(元)"
                            min-width="90px"
                            prop="raiseFunds">
                    </el-table-column>
                    <el-table-column
                            label="内部收益率"
                            prop="earningRate">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            prop="name">
                        <template slot-scope="scope">
                            <el-button
                                    :disabled="lessinfobutton == 'N'"
                                    @click="handleOrder(scope.row)"
                                    class="elmbutton"
                                    size="small"
                                    type="text">
                                处理
                            </el-button>
                            <!--                            <el-button-->
                            <!--                                    :disabled="lessinfobutton == 'N'"-->
                            <!--                                    @click="lookClick(scope.row)"-->
                            <!--                                    class="elmbutton"-->
                            <!--                                    size="small"-->
                            <!--                                    type="text">-->
                            <!--                                查看-->
                            <!--                            </el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <!-- 分页 -->
            <div class="block">
                <el-pagination
                        :current-page.sync="currentPage2"
                        :page-size="10"
                        :page-sizes="[10, 20, 30, 40]"
                        :total="parseInt(allpage)"
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
    import formatter from '@/components/mixins/formatter';

    export default {
        components: {
            componentitle,
        },
        mixins: [formatter],
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
                        value: '00',
                        label: '待处理'
                    },
                    {
                        value: '02',
                        label: '已提交',
                    }
                ],
                tableData: [],
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
            //查询 点击分页 一页多少 统一调用这一函数
            pages() {
                this.$post('/buss/orders', {
                    taskType: 'FLOW_SURVEY',
                    taskStatus: '01'
                }).then(res => {
                    if (res.data.code == '2000000') {
                        if (res.data.data != null) {
                            this.tableData = res.data.data;
                            this.allpage = res.data.data.totalCount;
                        } else {
                            this.tableData = [];
                            this.allpage = 0;
                        }
                        this.loading = false;
                    }
                });
            },
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

            handleOrder(row) {
                this.$router.push({
                    path: '/layout/declarationfromSign',
                    query: {bussNo:row.bussNo}
                })
            },
            lookClick(row) {
                this.$router.push({
                    path: '/layout/businessdetail',
                    query: {task_id: row.id, disabled: 1, bussNo: row.bussNo, arrangementtype: '5', writeOffFlag: 1}
                });
            },
            // 新建报单按钮
            addnewForm() {
                this.$router.push({path: '/layout/declarationfromSign'})
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
            border: 1px solid #ffcb9d;
        }
    }
</style>
