<template>
<div class="businfosss">
    <componentitle :message="message='保证人情况'" />
    <div class="subtabs">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(item,index) in guarantordata" :label="'保证人' + parseInt(index + 1)">
                <div class="assetsinfo">
                    <div class="div0">
                        <ul class="infolist">
                            <li>
                                <span>业务编号</span>
                                <span>
                                    {{item.bussNo}}
                                </span>
                            </li>
                            <li>
                                <span>客户类别</span>
                                <span>{{item.custType}}</span>
                            </li>
                            <li>
                                <span>姓名</span>
                                <span>{{item.custName}}</span>

                            </li>
                            <li>
                                <span>与承租人关系</span>
                                <span>本人</span>
                            </li>
                            <li>
                                <span>性别</span>
                                <span>{{item.custSex}}</span>

                            </li>
                            <li>
                                <span>年龄</span>
                                <span>{{item.custAge}}</span>
                            </li>
                            <li>
                                <span>身份证号码</span>
                                <span>{{item.certNo}}</span>
                            </li>
                            <li>
                                <span>婚姻状况</span>
                                <span>{{item.custMarriage}}</span>
                            </li>
                            <li>
                                <span>户籍地址</span>
                                <span>{{item.custHomeplace}}</span>
                            </li>
                            <li>
                                <span>现住地</span>
                                <span>{{item.custAddress}}</span>
                            </li>
                            <li>
                                <span>种植年限</span>
                                <span>{{item.cultureYears}}</span>
                            </li>
                            <li>
                                <span>申请地居住年限（年）</span>
                                <span>{{item.residenceYears}}</span>
                            </li>
                            <li>
                                <span>联系电话</span>
                                <span>{{item.custMobile}}</span>
                            </li>
                            <li>
                                <span>微信号</span>
                                <span>{{item.custWechat}}</span>
                            </li>
                        </ul>
                    </div>
                    <!-- 资产情况 -->
                    <div class="div1">
                        <componentitle :message="message='资产情况'" />
                        <div class="assetsinfoul">
                            <h3>房产信息</h3>
                            <ul class="infolist" v-for="assetsHouses in item.assetsHouses">
                                <li>
                                    <span>房产类型</span>
                                    <span>
                                        {{assetsHouses.type}}
                                    </span>
                                </li>
                                <li>
                                    <span>面积（㎡）</span>
                                    <span>{{assetsHouses.acreage}}</span>
                                </li>
                                <li>
                                    <span>房产地址/坐落</span>
                                    <span>{{assetsHouses.address}}</span>

                                </li>
                                <li>
                                    <span>当前估价</span>
                                    <span>{{assetsHouses.currEvaluation}}</span>
                                </li>
                                <li>
                                    <span>所有权人</span>
                                    <span>{{assetsHouses.owner}}</span>

                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{assetsHouses.mortgage}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>土地（含代收代耕）</h3>
                            <ul class="infolist" v-for="assetsLands in item.assetsLands">
                                <li>
                                    <span>土地类型</span>
                                    <span>
                                        <!-- {{item.naturalData.assetsLands.mortgage}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>面积（㎡）</span>
                                    <span>{{assetsLands.acreage}}</span>
                                </li>
                                <li>
                                    <span>房产地址/坐落</span>
                                    <span>{{assetsLands.address}}</span>

                                </li>
                                <li>
                                    <span>价值</span>
                                    <span>{{assetsLands.value}}</span>
                                </li>
                                <li>
                                    <span>承包期限</span>
                                    <span>{{assetsLands.contractLife}}</span>

                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{assetsLands.mortgage == 'Y' ? '已抵押' : '未抵押' }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>车产情况</h3>
                            <ul class="infolist" v-for="assetsVehicles in item.assetsVehicles">
                                <li>
                                    <span>车产类型</span>
                                    <span>
                                        <!-- {{item.naturalData.assetsVehicles.contractLife}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>购买时间</span>
                                    <span>{{assetsVehicles.buyTime}}</span>
                                </li>
                                <li>
                                    <span>当前估价</span>
                                    <span>{{assetsVehicles.currEvaluation}}</span>
                                </li>
                                <li>
                                    <span>所有权人</span>
                                    <span>{{assetsVehicles.owner}}</span>
                                </li>
                                <li>
                                    <span>车辆号牌</span>
                                    <span>{{assetsVehicles.serialNo}}</span>
                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{assetsVehicles.mortgage == 'Y' ? '已抵押' : '未抵押' }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>农机具</h3>
                            <ul class="infolist" v-for="assetsFarmTools in item.assetsFarmTools">
                                <li>
                                    <span>农机具类型</span>
                                    <span>
                                        <!-- {{item.naturalData.assetsFarmTools.serialNo}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>购买时间</span>
                                    <span>{{assetsFarmTools.buyTime}}</span>
                                </li>
                                <li>
                                    <span>当前估价</span>
                                    <span>{{assetsFarmTools.currEvaluation}}</span>
                                </li>
                                <li>
                                    <span>所有权人</span>
                                    <span>{{assetsFarmTools.owner}}</span>
                                </li>
                                <li>
                                    <span>号牌/车架号</span>
                                    <span>{{assetsFarmTools.serialNo}}</span>
                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{assetsFarmTools.mortgage == 'Y' ? '已抵押' : '未抵押' }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>其他资产</h3>
                            <ul class="infolist" v-for="assetsOthers in item.assetsOthers">
                                <li>
                                    <span>其他资产</span>
                                    <span>
                                        {{assetsOthers.serialNo}}
                                    </span>
                                </li>
                                <li>
                                    <span>购买时间</span>
                                    <span></span>
                                </li>
                                <li>
                                    <span>价值</span>
                                    <span>{{assetsOthers.value}}</span>

                                </li>
                                <li>
                                    <span>所有权人</span>
                                    <span>{{assetsOthers.owner}}</span>
                                </li>
                                <li>
                                    <span>备注</span>
                                    <span>{{assetsOthers.remark}}</span>

                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{assetsOthers.mortgage == 'Y' ? '已抵押' : '未抵押' }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 负债情况 -->
                    <div class="div2">
                        <componentitle :message="message='负债情况'" />
                        <div class="assetsinfoul">
                            <h3>房产信息</h3>
                            <ul class="infolist" v-for="debtSituations in item.debtSituations">
                                <li>
                                    <span>债务情况</span>
                                    <span>
                                        {{debtSituations.debtSituation}}
                                    </span>
                                </li>
                                <li>
                                    <span>债务种类</span>
                                    <span>{{debtSituations.debtType}}</span>
                                </li>
                                <li>
                                    <span>债务人</span>
                                    <span>{{debtSituations.debtPerson}}</span>

                                </li>
                                <li>
                                    <span>债务余额</span>
                                    <span>{{debtSituations.debtBalance}}</span>
                                </li>
                                <li>
                                    <span>债务期限</span>
                                    <span>{{debtSituations.debtTerm}}</span>

                                </li>
                                <li>
                                    <span>备注</span>
                                    <span>{{debtSituations.remark}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>对外担保</h3>
                            <ul class="infolist" v-for="debtGuarantees in item.externalGuarantee">
                                <li>
                                    <span>对外担保</span>
                                    <span>
                                        {{debtGuarantees.externalGuarantee}}
                                    </span>
                                </li>
                                <li>
                                    <span>债权人</span>
                                    <span>{{debtGuarantees.creditor}}</span>
                                </li>
                                <li>
                                    <span>担保余额</span>
                                    <span>{{debtGuarantees.guaranteeBalance}}</span>

                                </li>
                                <li>
                                    <span>被担保人</span>
                                    <span>{{debtGuarantees.warrantee}}</span>
                                </li>
                                <li>
                                    <span>承租人与被担保人关系</span>
                                    <span>{{debtGuarantees.withWarranteeRelation}}</span>

                                </li>
                                <li>
                                    <span>备注</span>
                                    <span>{{debtGuarantees.remark}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>其他负债</h3>
                            <ul class="infolist" v-for="debtOthers in item.debtOthers">
                                <li>
                                    <span>其他负债</span>
                                    <span>
                                        <!-- {{item.naturalData.debtOthers.remark}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>债权人</span>
                                    <span>{{debtOthers.creditor}}</span>
                                </li>
                                <li>
                                    <span>余额</span>
                                    <span>{{debtOthers.debtBalance}}</span>

                                </li>
                                <li>
                                    <span>至今赊龄（月）</span>
                                    <span></span>
                                </li>
                                <li>
                                    <span>有无担保</span>
                                    <span>{{debtOthers.isGuarantee}}</span>

                                </li>
                                <li>
                                    <span>备注</span>
                                    <span>{{debtOthers.remark}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 收入情况 -->
                    <div class="div3">
                        <componentitle :message="message='收入情况'" />
                        <div class="assetsinfoul">
                            <h3>种植收入</h3>
                            <ul class="infolist" v-for="incomePlants in item.incomePlants">
                                <li>
                                    <span>收入名称</span>
                                    <span>
                                        <!-- {{item.naturalData.incomePlants.remark}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>种植类别</span>
                                    <span>{{incomePlants.plantType}}</span>
                                </li>
                                <li>
                                    <span>种植面积/亩</span>
                                    <span>{{incomePlants.plantArea}}</span>

                                </li>
                                <li>
                                    <span>单亩成本</span>
                                    <span>{{incomePlants.oneCost}}</span>
                                </li>
                                <li>
                                    <span>亩产收入</span>
                                    <span>{{incomePlants.oneIncome}}</span>

                                </li>
                                <li>
                                    <span>结余</span>
                                    <span>{{incomePlants.surplus}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>农机作业收入</h3>
                            <ul class="infolist" v-for="incomeFarmMachineryWork in item.incomeFarmMachineryWork">
                                <li>
                                    <span>收入名称</span>
                                    <span>
                                        <!-- {{item.naturalData.incomeFarmMachineryWork.surplus}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>作业类别</span>
                                    <span>{{incomeFarmMachineryWork.plantType}}</span>
                                </li>
                                <li>
                                    <span>作业面积/亩</span>
                                    <span>{{incomeFarmMachineryWork.plantArea}}</span>

                                </li>
                                <li>
                                    <span>单亩成本</span>
                                    <span>{{incomeFarmMachineryWork.oneCost}}</span>
                                </li>
                                <li>
                                    <span>亩产收入</span>
                                    <span>{{incomeFarmMachineryWork.oneIncome}}</span>

                                </li>
                                <li>
                                    <span>结余</span>
                                    <span>{{incomeFarmMachineryWork.surplus}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>其他收入</h3>
                            <ul class="infolist" v-for="incomeOthers in item.incomeOthers">
                                <li>
                                    <span>收入名称</span>
                                    <span>
                                        <!-- {{item.naturalData.incomeOthers.surplus}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>上年收入</span>
                                    <span>{{incomeOthers.prevYearIncome}}</span>
                                </li>
                                <li>
                                    <span>上年支出</span>
                                    <span>{{incomeOthers.prevYearPay}}</span>

                                </li>
                                <li>
                                    <span>本年收入</span>
                                    <span>{{incomeOthers.currYearIncome}}</span>
                                </li>
                                <li>
                                    <span>本年支出</span>
                                    <span>{{incomeOthers.currYearPay}}</span>

                                </li>
                                <li>
                                    <span>结余</span>
                                    <span>{{incomeOthers.surplus}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>收入偿债比</h3>
                            <ul class="infolist" v-for="incomeDebtRatios in item.incomeDebtRatios">
                                <li>
                                    <span>收入偿债比</span>
                                    <span>
                                        <!-- {{item.naturalData.incomeDebtRatios.surplus}} -->
                                    </span>
                                </li>
                                <li>
                                    <span>结余合计</span>
                                    <span>{{incomeDebtRatios.total_surplus}}</span>
                                </li>
                                <li>
                                    <span>年租金支出</span>
                                    <span>{{incomeDebtRatios.annual_rental_expense}}</span>

                                </li>
                                <li>
                                    <span>其他负债支出</span>
                                    <span>{{incomeDebtRatios.other_debt_expense}}</span>
                                </li>
                                <li>
                                    <span>年支出合计</span>
                                    <span>{{incomeDebtRatios.total_annual_expense}}</span>

                                </li>
                                <li>
                                    <span>偿债比</span>
                                    <span>{{incomeDebtRatios.income_debt_ratio}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 承租人相关影像资料 -->
                    <div class="div3">
                        <componentitle :message="message='承租人相关影像资料'" />
                        <div class="imgbox">
                            <h3>身份证明材料</h3>
                            <ul>
                                <li>
                                    <div>身份证原件</div>
                                    <div class="imgeslist">
                                        <img
                                            v-for="(item,index) in images"
                                            :src="item.images"
                                            preview="1"
                                            preview-text="身份证原件"
                                            width="100"
                                            height="100"
                                            >
                                    </div>
                                </li>
                                <li>
                                    <div>户口簿原件</div>
                                    <div class="imgeslist">
                                        <img
                                            src="../../../assets/logo0.png"
                                            preview="2"
                                            preview-text="户口簿原件"
                                            width="100"
                                            height="100"
                                            >
                                        <img
                                            src="../../../assets/logo.png"
                                            preview="2"
                                            preview-text="户口簿原件"
                                            width="100"
                                            height="100"
                                            >
                                    </div>
                                </li>
                            </ul>

                            <h3>婚姻证明材料</h3>
                            <ul>
                                <li>
                                    <div>单身证明原件</div>
                                    <div class="">

                                    </div>
                                </li>
                            </ul>

                            <h3>资产证明材料</h3>
                            <ul>
                                <li>
                                    <div>房产证/购房合同</div>
                                    <div class="">

                                    </div>
                                </li>
                                <li>
                                    <div>土地承包合同原件</div>
                                    <div class="">

                                    </div>
                                </li>
                                <li>
                                    <div>机动车辆行驶原件</div>
                                    <div class="">

                                    </div>
                                </li>
                                <li>
                                    <div>补贴账户流水近一年流水</div>
                                    <div class="">

                                    </div>
                                </li>
                                <li>
                                    <div>农机具购置合同原件</div>
                                    <div class="">

                                    </div>
                                </li>
                                <li>
                                    <div>主要结算账户近一年流水</div>
                                    <div class="">

                                    </div>
                                </li>
                            </ul>
                            <h3>征信证明材料</h3>
                            <ul>
                                <li>
                                    <div>人行征信报告</div>
                                    <div class="">

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import ulinfolist from './ulinfolist.vue'; // 基本信息 暂时废弃不引用移到assetsinfo组件
import assetsinfo from './assetsinfo.vue'; //资产信息
export default {
    data() {
        return {
            message: '',
            tableData: [],
            images: [],
            guarantordata: []
        }
    },
    created() {
        this.$post('/warrantor/info',{
            bussNo: 'CON_ZZ02_0000_201904_0001'
        }).then( res => {
            this.guarantordata = res.data.data.naturalData;
        });
        // this.$post('/imageslist').then((response) => {
        //     this.images = response.data.dataName;
        //     this.$previewRefresh() // 异步生成图片调用插件方法
        //     // console.log(this.images);
        // })
    },
    components: {
        componentitle,
        ulinfolist,
        assetsinfo
    }
}
</script>
<style lang="less">
.businfosss {
    background: #fff;
    width: 100%;
    .subtabs {
        margin: 15px 0;
        .el-tabs__nav {
            border-top: 1px solid #DCDFE6;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
            border-top: 1px solid #DCDFE6;
        }
        .el-tabs__item {
            &:last-child {
                border-right: 1px solid #DCDFE6;
            }
        }
        .el-tabs--border-card {
            border-top: 0;

        }
    }
    .assetsinfo {
        h3 {
            padding-left: 15px;
        }
        .assetsinfoul {
            ul {
                margin-top: 0;
            }
        }
        .div3 {
            .imgbox {
                h3 {
                    font-size: 16px;
                    margin: 35px 0 35px 15px;
                    font-weight: bold;
                }
                .imgeslist {
                    img {
                        float: left;
                        margin-left: 15px;
                    }
                }
                ul {
                    width: 95%;
                    margin: 0 auto;
                    border: 1px solid #EBEEF5;
                    &:last-child {
                        margin-bottom: 30px;
                    }
                    // li {
                    //     width: 100%;
                    //     height: 100px;
                    //     text-align: center;
                    //     clear: both;
                    //     div {
                    //         float: left;
                    //         border-bottom: 1px solid #EBEEF5;
                    //         height: 100px;
                    //         color: #606266;
                    //         &:first-child {
                    //             width: 29.8%;
                    //             border-right: 1px solid #EBEEF5;
                    //             line-height: 100px;
                    //         }
                    //         &:last-child {
                    //             width: 70%;
                    //         }
                    //     }
                    // }
                }
            }
        }
    }
}
</style>
