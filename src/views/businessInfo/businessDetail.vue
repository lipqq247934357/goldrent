<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
        </div>
        <div class="tableinfo">
            <template>
                <!-- <ul class="toplist">
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
                </ul> -->
                <table class="toplist" border=1>
                    <tr>
                        <td>业务编号</td>
                        <td>任务名称</td>
                        <td>任务创建时间</td>
                        <td>任务开始时间</td>
                        <td>任务结束时间</td>
                    </tr>
                    <tr v-for="item in task.task">
                        <td>{{item.bussNo}}</td>
                        <td>{{item.taskName}}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.beginTime}}</td>
                        <td>{{item.finishTime}}</td>
                    </tr>
                </table>
            </template>
        </div>


        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>承租人信息</span>
                </div>
            </div>
            <ul class="infolist infocss">
                <li>
                    <span>业务编号</span>
                    <span>{{task.custNature.bussNo}}</span>
                </li>
                <li>
                    <span>客户类别</span>
                    <span v-for="custType in statuslist.custType" v-if="task.custNature.custType == custType.optionCode">
                        <!-- <select class="" name="" disabled>
                            <option value="" v-for="custType in statuslist.custType" :selected="task.custNature.partnerType == custType.optionCode ? true : false">
                                {{custType.optionName}}
                            </option>
                        </select> -->
                        {{custType.optionName}}
                    </span>
                    <span v-if="task.custNature.custType == ''"></span>
                </li>
                <li>
                    <span>姓名</span>
                    <span>{{task.custNature.custName}}</span>

                </li>
                <li>
                    <span>与承租人关系</span>
                    <span>{{task.custNature.custRelation == 'SELF' ? '本人' : '本人'}}</span>
                </li>
                <li>
                    <span>性别</span>
                    <span v-for="sex in statuslist.custSex" v-if="task.custNature.custSex == sex.optionCode">
                        <!-- {{task.custNature.custSex}} -->
                        <!-- <select class="" name="" disabled>
                            <option value="" v-for="sex in statuslist.custSex" :selected="task.custNature.custSex == sex.optionCode ? true : false">
                                {{sex.optionName}}
                            </option>
                        </select> -->
                        {{sex.optionName}}
                    </span>
                    <span v-if="task.custNature.custSex == ''"></span>
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
                    <span v-for="marriagestatus in statuslist.marriage" v-if="task.custNature.custMarriage == marriagestatus.optionCode">
                        <!-- {{task.custNature.custMarriage}} -->
                        <!-- <select class="" name="" disabled>
                            <option value="" v-for="marriagestatus in statuslist.marriage" :selected="task.custNature.custMarriage ==marriagestatus.optionCode ? true : false">
                                {{marriagestatus.optionName}}
                            </option>
                        </select> -->
                        {{marriagestatus.optionName}}
                    </span>
                    <span v-if="task.custNature.custMarriage == ''"></span>
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
            <ul class="infolist infocss">
                <li>
                    <span>名称</span>
                    <span>{{task.leaseInfo.leaseName}}</span>
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
                    <span>{{task.leaseInfo.serialNumber}}</span>
                </li>
                <li>
                    <span>能否抵押受理</span>
                    <span>{{task.leaseInfo.mortgage == "Y" ? "是" : task.leaseInfo.mortgage == "N" ? "否" : ""}}</span>

                </li>
                <li>
                    <span>抵押管理机关</span>
                    <span>{{task.leaseInfo.mortgageAgency}}</span>
                </li>
            </ul>

            <div class="titletop">
                <div class="topbox">
                    <span>租赁计划表</span>
                </div>

                <template>
                    <!-- <el-table
                            :data="task.leasePlan"
                            border
                            :header-cell-style="{
                                'color': '#212121',
                                'font-size': '14px',
                                'font-weight': 'bold'
                            }"
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
                    </el-table> -->
                    <table class="renttable">
                        <tr>
                            <td class="tabletable">租金期数</td>
                            <td class="tabletable">租金总额（元）</td>
                            <td class="tabletable">支付日期</td>
                            <td class="tabletable">租赁本金（元）</td>
                            <td class="tabletable">租赁利息（%）</td>
                        </tr>
                        <tr v-for="item in task.leasePlan" v-if="item.costType == 'rent'">
                            <td>{{item.period}}</td>
                            <td>{{item.leaseAmount}}</td>
                            <td>{{item.payDate}}</td>
                            <td>{{item.capital}}</td>
                            <td>{{item.leaseInterest}}</td>
                        </tr>
                    </table>
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
                    task: [],
                    custNature: {},
                    leaseInfo: {},
                    leasePlan: []

                    // task: {
                    //     bussNo业务编号String
                    //
                    //     custName租承租人姓名String
                    //
                    //     taskname任务名称String
                    //
                    //     ownerName任务员姓名String
                    //
                    //     status任务状态String
                    //
                    //     beginTime	任务开始时间	Timestamp
                    //
                    //     finishTime	任务结束时间	Timestamp
                    //
                    //     createTime	任创建时间 Timestamp
                    // }
                    // custNature: {}
                    // leaseInfo: {},
                    // leasePlan: []

                },
                custNature: {},
                leaseInfo: {},
                leasePlan: [],
                currentPage2: 1,
                // 字典编码
                statuslist: {
                    marriage: [],
                    custSex: [],
                    custRelation: [],
                    custType: [],
                }
            }

        },
        created() {
            let data = urlParse();
            this.$get(`buss/getBussInfo?task_id=${this.$route.query.task_id}`).then(res => {
                if(res.data.code == '2000000') {
                    this.task = res.data.data;
                }
            });
            this.$post('/getConstantConfig',{
                dictionaryCode: ['custMarriage','custType','custSex','custRelation','houseType','isGuarantee']
            }).then(res => {
                this.statuslist.marriage = res.data.data.custMarriage;
                this.statuslist.custSex = res.data.data.custSex;
                this.statuslist.custRelation = res.data.data.custRelation;
                this.statuslist.custType = res.data.data.custType;
            })
        },
        methods: {
            async query(bussNo) {
                let data = await this.$post('buss/getBussInfo', {task_id: this.bussNo});
                if (data.data.data.code === '2000000') { // 状态正确，执行更新操作
                    data = data.data.data;
                    this.task = data.task;
                    this.custNature = data.task; //承租人信息
                    this.leaseInfo = data.leaseInfo; // 租赁物信息
                    this.leasePlan = data.leasePlan; //租金计划表
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
            width: 96%;
            margin: 0 auto;
        }

        .tableinfo {
            width: 96%;
            margin: 0px auto 50px;
        }

        .content {
            width: 95%;
            margin: 0 auto;
            .infocss {
                li {
                    &:last-child {
                        border-bottom: 0;
                    }
                    &:nth-last-child(2) {
                        border-bottom: 0;
                    }
                }
            }
            .infolist {
                width: 99.8%;
                display: inline-block;
                border: 1px solid #afafaf;
                margin: 0 auto 20px;
                border-top: 0;
                li {
                    width: 49.9%;
                    height: 50px;
                    border-bottom: 1px solid #afafaf;
                    display: inline-block;
                    border-right: 1px solid #afafaf;
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
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
    .toplist {
        width: 100%;
        border-top: 0;
        tr {
            width: 100%;
            height: 50px;
            border: 1px solid #afafaf;
            color: #606266;
            font-size: 12px;
            text-align: center;
            &:first-child {
                border-top: 0;
            }
        }
    }
    .renttable {
        text-align: center;
        width: 100%;
        border-top: 0;
        border: 1px solid #afafaf;
        border-top: 0;
        .tabletable {
            border-top: 0;
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }
        tr {
            height: 50px;
            td {
                color: #909399;
                border: 1px solid #afafaf;
            }
        }
    }
</style>
