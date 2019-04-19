<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
        </div>
        <div class="tableinfo">
            <template>
                <!-- <el-table
                        :data="task"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="业务编号"
                            prop="bussNo">
                    </el-table-column>
                    <el-table-column
                            label="任务名称"
                            prop="taskname">
                    </el-table-column>
                    <el-table-column
                            label="任务创建时间"
                            prop="createTime">
                    </el-table-column>
                    <el-table-column
                            label="任务开始时间"
                            prop="beginTime">
                    </el-table-column>
                    <el-table-column
                            label="任务结束时间"
                            prop="finishTime">
                    </el-table-column>
                </el-table> -->
                <ul class="toplist">
                    <li>
                        <span>业务编号</span>
                        <span>任务名称</span>
                        <span>任务创建时间</span>
                        <span>任务开始时间</span>
                        <span>任务结束时间</span>
                    </li>
                    <li>
                        <span>{{task.task.bussNo}}</span>
                        <span>{{task.task.taskName}}</span>
                        <span>{{task.task.createTime}}</span>
                        <span>{{task.task.beginTime}}</span>
                        <span>{{task.task.finishTime}}</span>
                    </li>
                </ul>
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
                    <span>{{task.custNature.bussNo}}</span>
                </li>
                <li>
                    <span>客户类别</span>
                    <span>{{task.custNature.partnerType}}</span>
                </li>
                <li>
                    <span>姓名</span>
                    <span>{{task.custNature.custName}}</span>

                </li>
                <li>
                    <span>与承租人关系</span>
                    <span>{{task.custNature.custRelation}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span>{{task.custNature.custSex}}</span>

                </li>
                <li>
                    <span>年龄</span>
                    <span>{{task.custNature.custAge}}</span>
                </li>
                <li>
                    <span>身份证号码</span>
                    <span>{{task.custNature.certNo}}</span>
                </li>
                <li>
                    <span>婚姻状况</span>
                    <span>{{task.custNature.custMarriage}}</span>
                </li>
                <li>
                    <span>户籍地址</span>
                    <span>{{task.custNature.custHomeplace}}</span>

                </li>
                <li>
                    <span>现住址</span>
                    <span>{{task.custNature.custAddress}}</span>
                </li>
                <li>
                    <span>种植年限</span>
                    <span>{{task.custNature.cultureYears}}</span>
                </li>
                <li>
                    <span>申请地居住年限（年）</span>
                    <span>{{task.custNature.residenceYears}}</span>
                </li>
                <li>
                    <span>联系电话</span>
                    <span>{{task.custNature.custMobile}}</span>

                </li>
                <li>
                    <span>微信号</span>
                    <span>{{task.custNature.custWechat}}</span>
                </li>
            </ul>

            <div class="titletop">
                <div class="topbox">
                    <span>租赁物信息</span>
                </div>
            </div>
            <ul class="infolist">
                <li>
                    <span>名称</span>
                    <span>{{task.leaseInfo.bussNo}}</span>
                </li>
                <li>
                    <span>规格型号</span>
                    <span>{{task.leaseInfo.leaseName}}</span>
                </li>
                <li>
                    <span>购置价格</span>
                    <span>{{task.leaseInfo.purchasePrice}}</span>

                </li>
                <li>
                    <span>唯一识别码</span>
                    <span>{{task.leaseInfo.serialNo}}</span>
                </li>
                <li>
                    <span>能否抵押受理</span>
                    <span>{{task.leaseInfo.mortgage}}</span>

                </li>
                <li>
                    <span>抵押管理机关</span>
                    <span>{{leaseInfo.mortgageAgency}}</span>
                </li>
            </ul>

            <div class="titletop">
                <div class="topbox">
                    <span>租金计划表</span>
                </div>

                <template>
                    <el-table
                            :data="task.leasePlan"
                            border
                            style="width: 100%">
                        <el-table-column
                                label="租金期数"
                                prop="period">
                        </el-table-column>
                        <el-table-column
                                label="租金总额"
                                prop="leaseAmount">
                        </el-table-column>
                        <el-table-column
                                label="支付日期"
                                prop="payDate">
                        </el-table-column>
                        <el-table-column
                                label="租赁本金"
                                prop="capital">
                        </el-table-column>
                        <el-table-column
                                label="租赁利息"
                                prop="leaseInterest">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../components/title/title.vue';
    import {urlParse} from "../../utils/utils";

    export default {
        components: {
            componentitle
        },
        data() {
            return {
                message: '任务信息',
                titletext: '业务信息',
                contenttext: '任务信息',
                task: {
                    task: {},
                    custNature: {},
                    leaseInfo: {},
                    leasePlan: []
                },
                custNature: {},
                leaseInfo: {},
                leasePlan: [],
                currentPage2: 1
            }
        },
        created() {
            let data = urlParse();
            // this.query(data.bussNo);
            this.$get(`buss/getBussInfo?task_id=${this.$route.query.task_id}`).then(res => {
                if(res.data.code == '2000000') {
                    this.task = res.data.data;
                    // console.log(this.task);
                }

            });
        },
        methods: {
            async query(bussNo) {
                let data = await this.$post('buss/getBussInfo', {task_id: this.bussNo});
                if (data.data.data.code === '2000000') { // 状态正确，执行更新操作
                    data = data.data.data;
                    this.task = data.task;
                    this.custNature = data.custNature;
                    this.leaseInfo = data.leaseInfo;
                    this.leasePlan = data.leasePlan;
                }
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
    .toplist {
        li {
            width: 100%;
            height: 50px;
            border: 1px solid #EBEEF5;
            color: #606266;
            font-size: 12px;
            span {
                display: inline-block;
                width: 19.8%;
                text-align: center;
                border-right: 1px solid #EBEEF5;
                line-height: 50px;
                &:last-child {
                    border-right: 0;
                }
            }
        }
    }
</style>
