<template>
<div class="businfo">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" />
    </div>
    <div class="tableinfo">
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
                    label="任务名称">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="任务创建时间">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="任务开始时间">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="任务结束时间">
                </el-table-column>
            </el-table>
        </template>
    </div>


    <div class="content">
        <div class="titletop">
            <div class="topbox">
                <span>承租人信息</span>
            </div>
        </div>
        <ul class="infolist">
            <li>
                <span>业务编号</span>
                <span>CON_ZZ02_0000_YYYYMM_四位流水号</span>
            </li>
            <li>
                <span>客户类别</span>
                <span>A类客户</span>
            </li>
            <li>
                <span>姓名</span>
                <span>豹子头·林冲</span>

            </li>
            <li>
                <span>与承租人关系</span>
                <span>本人</span>
            </li>
        </ul>

        <div class="titletop">
            <div class="topbox">
                <span>租赁物信息</span>
            </div>
        </div>
        <ul class="infolist">
            <li>
                <span>业务编号</span>
                <span>CON_ZZ02_0000_YYYYMM_四位流水号</span>
            </li>
            <li>
                <span>客户类别</span>
                <span>A类客户</span>
            </li>
            <li>
                <span>姓名</span>
                <span>豹子头·林冲</span>

            </li>
            <li>
                <span>与承租人关系</span>
                <span>本人</span>
            </li>
        </ul>

        <div class="titletop">
            <div class="topbox">
                <span>租金计划表</span>
            </div>

            <template>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="租金期数">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="租金总额">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="支付日期">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="租赁本金">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="租赁利息">
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            message: '任务信息',
            titletext: '业务信息',
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
            currentPage2:1
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
            console.log(val);
        }
    },
}
</script>
<style lang="less">
.businfo {
    background: #fff;
    margin-bottom: 40px;
    .topTitle {
        width: 95%;
        margin: 0 auto;
    }
    .tableinfo {
        width: 95%;
        margin: 20px auto 50px;
    }
    .content {
        width: 95%;
        margin: 0 auto;
        .infolist {
            width: 100%;
            display: inline-block;
            border: 1px solid #EBEEF5;
            margin: 20px auto;
            li {
                width: 49.9%;
                height: 50px;
                border-bottom: 1px solid #EBEEF5;
                display: inline-block;
                border-right: 1px solid #EBEEF5;
                text-align: center;
                line-height: 50px;
                color: #606266;
                font-size: 14px;
                &:nth-child(even) {
                    border-right: 0;
                }
                span {
                    &:first-child {
                        width: 30%;
                        display: inline-block;
                    }
                    &:last-child {
                        width: 69%;
                        border-left: 1px solid #EBEEF5;
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>
