<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
        </div>
        <div class="topcontent">
            <div>
                <label>业务编号：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="bussNo"></el-input>
                <label class="rightlabel">承租人姓名：</label>
                <el-input class="contentinout" placeholder="请输入内容" v-model="custName"></el-input>
            </div>
            <div>
                <label>任务名称：</label>
                <template>
                    <el-select class="choiceselect" placeholder="请选择" v-model="task_name">
                        <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in choiceoptions">
                        </el-option>
                    </el-select>
                </template>
                <label class="rightlabel">任务状态：</label>
                <template>
                    <el-select class="choiceselect" placeholder="请选择" v-model="status">
                        <el-option
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                v-for="item in statusOptions">
                        </el-option>
                    </el-select>
                </template>
            </div>
            <button @click="save" class="search" name="button" type="button">查询</button>
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
                            label="业务编号"
                            prop="bussNo">
                    </el-table-column>
                    <el-table-column
                            label="承租人姓名"
                            prop="custName">
                    </el-table-column>
                    <el-table-column
                            label="任务名称"
                            prop="taskname">
                    </el-table-column>
                    <el-table-column
                            label="任务状态"
                            prop="status">
                    </el-table-column>
                    <el-table-column
                            label="任务创建时间"
                            prop="createTime">
                    </el-table-column>
                    <el-table-column
                            label="任务结束时间"
                            prop="finishTime">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            prop="name">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" size="small" type="text">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>

            <!-- 分页 -->
            <div class="block">
                <el-pagination
                        :current-page.sync="pagesothen"
                        :page-size="nowpage"
                        :page-sizes="[10, 20, 30, 40]"
                        :total="allpage"
                        @current-change="pagechange"
                        @size-change="pageinfosearch"
                        layout="sizes, prev, pager, next">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../components/title/title.vue';

    export default {
        components: {
            componentitle,
        },
        data() {
            return {
                message: '筛选条件',
                titletext: '业务信息列表',
                contenttext: '任务信息',
                bussNo: '',
                custName: '',
                task_name: '',
                status: '',
                statusOptions: [
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
                tableData: [],
                pagesothen: 1,
                nowpage: 1,
                allpage: 100

            }
        },
        created() {
            // this.search();
            this.pages();
        },
        methods: {
            // async search() {
            //     let data = await this.$post('/buss/listBussInfo', {
            //         bussNo: this.bussNo,
            //         custName: this.custName,
            //         ownerName: '',
            //         taskName: this.task_name,
            //         status: this.status,
            //         currentPage: this.pagInfo.currentPage,
            //         pageSize: this.pagInfo.pageSize
            //     });
            //     if (data.data.code === '2000000') { // 状态正确，执行更新操作
            //         data = data.data.data;
            //         this.tableData = data.recordList;
            //         this.pagInfo = data.totalCount;
            //         console.log(data);
            //     }
            // },
            pagechange(val) {
                alert(val)
            },
            pageinfosearch(val) {
                alert(val);
            },
            save() {

            },
            pages() {
                this.$post('/buss/listBussInfo',{
                    // bussNo: this.bussNo,
                    // custName: this.custName,
                    // ownerName: '',
                    // taskName: this.task_name,
                    // status: this.status,
                    // currentPage: this.pagInfo.currentPage,
                    // pageSize: this.pagInfo.pageSize
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data.data.recordList;
                    this.allpage = res.data.data.totalCount;
                });
            },
            handleClick(row) {
                this.$router.push({
                    path: '/layout/businessdetail',query: {bussNo:row.bussNo}
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

        .search {
            cursor: pointer;
        }
    }
</style>
