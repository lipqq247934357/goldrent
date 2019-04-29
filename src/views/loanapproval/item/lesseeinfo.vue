<template>
<div class="businfosss tabsinfo">
    <div class="subtabs">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(item,index) in lesseeinfolist" :label="'承租人' + parseInt(index + 1)">
                <componentitle :message="message='基本信息'" class="titlecomponent" />
                <div class="assetsinfo">
                    <div class="div0">
                        <ul class="infolist">
                            <li>
                                <span>业务编号</span>
                                <span>
                                    {{item.bussNo }}
                                </span>
                            </li>
                            <li>
                                <span>客户类别</span>
                                <span>
                                    <select class="" name="" disabled>
                                        <option value="" v-for="custType in statuslist.custType" :selected="item.custType == custType.optionCode ? true : false">
                                            {{custType.optionName}}
                                        </option>
                                    </select>
                                </span>
                            </li>
                            <li>
                                <span>姓名</span>
                                <span>{{item.custName}}</span>

                            </li>
                            <li>
                                <span>与承租人关系</span>
                                <span>
                                    <select class="" name="" disabled>
                                        <option value="" v-for="custRelation in statuslist.custRelation" :selected="item.custRelation == custRelation.optionCode ? true : false">
                                            {{item.custRelation == '' ? '本人' : custRelation.optionName}}
                                        </option>
                                    </select>
                                </span>
                            </li>
                            <li>
                                <span>性别</span>
                                <span>
                                    <select class="" name="" disabled>
                                        <option value="" v-for="sex in statuslist.custSex" :selected="item.custSex == sex.optionCode ? true : false">
                                            {{sex.optionName}}
                                        </option>
                                    </select>
                                </span>
                            </li>
                            <li>
                                <span>年龄</span>
                                <span>{{item.custAge}}</span>
                            </li>
                            <li>
                                <span>身份证号码</span>
                                <span>{{item.certNo}}</span>
                            </li>
                            <li ref="custMarriage">
                                <span>婚姻状况</span>
                                <span>
                                    <select class="" name="" disabled>
                                        <option value="" v-for="marriagestatus in statuslist.marriage" :selected="item.custMarriage ==marriagestatus.optionCode ? true : false">
                                            {{marriagestatus.optionName}}
                                        </option>
                                    </select>
                                </span>
                                </span>
                            </li>
                            <li>
                                <span>户籍地址</span>
                                <span>{{item.custHomeplace}}</span>
                            </li>
                            <li>
                                <span>现住址</span>
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
                    <!-- 配偶信息 -->
                    <div class="assetsinfoul">
                        <h3 v-if="item.custMarriage != 'unmarried'">配偶情况</h3>
                        <ul class="infolist" v-for="spouse in item.mateInfo">
                            <li>
                                <span>配偶姓名</span>
                                <span>
                                    {{spouse.custName}}
                                </span>
                            </li>
                            <li>
                                <span>性别</span>
                                <span>
                                    <select class="" name="" disabled v-if="spouse.custSex != ''">
                                        <option value="" v-for="sex in statuslist.custSex" :selected="spouse.custSex == spouse.custSex ? true : false">
                                            {{spouse.custSex == '' ? '' : sex.optionName}}
                                        </option>
                                    </select>
                                </span>
                            </li>
                            <li>
                                <span>户籍地址</span>
                                <span>{{spouse.custHomeplace}}</span>

                            </li>
                            <li>
                                <span>年龄</span>
                                <span>{{spouse.custAge}}</span>
                            </li>
                            <li>
                                <span>现住址</span>
                                <span>{{spouse.custAddress}}</span>
                            </li>
                            <li>
                                <span>身份证号</span>
                                <span>{{spouse.certNo}}</span>
                            </li>
                            <li>
                                <span>联系电话/微信</span>
                                <span>
                                    {{spouse.custWechat}}
                                </span>
                            </li>
                            <li>
                                <span>教育程度</span>
                                <span>
                                    {{spouse.custEducation}}
                                </span>
                            </li>
                            <li>
                                <span>婚姻状况</span>
                                <span>
                                    <select class="" name="" disabled v-if="spouse.custMarriage != ''">
                                        <option value="" v-for="marriagestatus in statuslist.marriage" :selected="spouse.custMarriage ==marriagestatus.optionCode ? true : false">
                                            {{spouse.custMarriage == '' ? '' : marriagestatus.optionName}}
                                        </option>
                                    </select>
                                </span>
                            </li>
                            <li>
                                <span>申请地居住年限</span>
                                <span>
                                    {{spouse.residenceYears}}
                                </span>
                            </li>
                            <li>
                                <span>种植年限</span>
                                <span>
                                    {{spouse.cultureYears}}
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div class="assetsinfoul">
                        <h3>子女情况</h3>
                        <ul class="infolist" v-for="childrenInfo in item.childrenInfo">
                            <li>
                                <span>姓名</span>
                                <span>
                                    {{childrenInfo.custName}}
                                </span>
                            </li>
                            <li>
                                <span>性别</span>
                                <span>
                                    <select class="" name="" disabled>
                                        <option value="" v-for="sex in statuslist.custSex" :selected="item.custSex == childrenInfo.custSex ? true : false">
                                            {{sex.optionName}}
                                        </option>
                                    </select>
                                </span>
                            </li>
                            <li>
                                <span>户籍地址</span>
                                <span>{{childrenInfo.custHomeplace}}</span>

                            </li>
                            <li>
                                <span>年龄</span>
                                <span>{{childrenInfo.custAge}}</span>
                            </li>
                            <li>
                                <span>现住址</span>
                                <span>{{childrenInfo.custAddress}}</span>
                            </li>
                            <li>
                                <span>身份证号</span>
                                <span>{{childrenInfo.certNo}}</span>
                            </li>
                        </ul>
                    </div>
                    <!-- 资产情况 -->
                    <div class="div1">
                        <componentitle :message="message='资产情况'" />
                        <div class="assetsinfoul">
                            <h3>房产信息</h3>
                            <ul class="infolist" v-for="assetsinfouls in item.assetsHouses">
                                <li>
                                    <span>房产类型</span>
                                    <span>
                                        <select class="" name="" disabled>
                                            <option value="" v-for="housrType in statuslist.houseType" :selected="assetsinfouls.type == housrType.optionCode ? true : false">
                                                {{housrType.optionName}}
                                            </option>
                                        </select>
                                    </span>
                                </li>
                                <li>
                                    <span>面积（㎡）</span>
                                    <span>{{assetsinfouls.acreage}}</span>
                                </li>
                                <li>
                                    <span>房产地址/坐落</span>
                                    <span>{{assetsinfouls.address}}</span>

                                </li>
                                <li>
                                    <span>当前估价（元）</span>
                                    <span>{{assetsinfouls.currEvaluation}}</span>
                                </li>
                                <li>
                                    <span>所有权人</span>
                                    <span>{{assetsinfouls.owner}}</span>

                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{assetsinfouls.mortgage == 'Y' ? '已抵押' : '未抵押'}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>土地（含代收代耕）</h3>
                            <ul class="infolist" v-for="assetsLands in item.assetsLands">
                                <li>
                                    <span>土地类型</span>
                                    <span>
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
                                    <span>价值（元）</span>
                                    <span>{{assetsLands.value}}</span>
                                </li>
                                <li>
                                    <span>承包期限（年）</span>
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
                            <ul class="infolist" v-for="car in item.assetsVehicles">
                                <li>
                                    <span>车产类型</span>
                                    <span>
                                    </span>
                                </li>
                                <li>
                                    <span>购买时间</span>
                                    <span>{{car.buyTime}}</span>
                                </li>
                                <li>
                                    <span>当前估价</span>
                                    <span>{{car.currEvaluation}}</span>
                                </li>
                                <li>
                                    <span>所有权人</span>
                                    <span>{{car.owner}}</span>
                                </li>
                                <li>
                                    <span>车辆号牌</span>
                                    <span>{{car.serialNo}}</span>
                                </li>
                                <li>
                                    <span>是否抵押</span>
                                    <span>{{car.mortgage == 'Y' ? '已抵押' : '未抵押' }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>农机具</h3>
                            <ul class="infolist" v-for="assetsFarmTools in item.assetsFarmTools">
                                <li>
                                    <span>农机具类型</span>
                                    <span>
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
                                    <span>是否抵押</span>
                                    <span>{{assetsOthers.mortgage == 'Y' ? '已抵押' : '未抵押' }}</span>
                                </li>
                                <br>
                                <li class="subliWidth">
                                    <p class="bz">备注</p>
                                    <div class="batextarrear">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder=""
                                            class="inputtext"
                                            disabled
                                            v-model="assetsOthers.remark">
                                        </el-input>
                                    </div>
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
                                    <span>债务余额（元）</span>
                                    <span>{{debtSituations.debtBalance}}</span>
                                </li>
                                <li>
                                    <span>债务期限（月）</span>
                                    <span>{{debtSituations.debtTerm}}</span>

                                </li>
                                <br>
                                <li class="subliWidth">
                                    <p class="bz">备注</p>
                                    <div class="batextarrear">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder=""
                                            class="inputtext"
                                            disabled
                                            v-model="debtSituations.remark">
                                        </el-input>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>对外担保</h3>
                            <ul class="infolist" v-for="debtGuarantees in item.debtGuarantees">
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
                                    <span>担保余额（元）</span>
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
                                <br>
                                <li class="subliWidth">
                                    <p class="bz">备注</p>
                                    <div class="batextarrear">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder=""
                                            class="inputtext"
                                            disabled
                                            v-model="debtGuarantees.remark">
                                        </el-input>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>其他负债</h3>
                            <ul class="infolist" v-for="debtOthers in item.debtOthers">
                                <li>
                                    <span>其他负债</span>
                                    <span>
                                    </span>
                                </li>
                                <li>
                                    <span>债权人</span>
                                    <span>{{debtOthers.creditor}}</span>
                                </li>
                                <li>
                                    <span>余额（元）</span>
                                    <span>{{debtOthers.debtBalance}}</span>

                                </li>
                                <li>
                                    <span>至今账龄（月）</span>
                                    <span>{{debtOthers.debtMaturity}}</span>
                                </li>
                                <li>
                                    <span>有无担保</span>
                                    <span>{{debtOthers.isGuarantee}}</span>

                                </li>
                                <br>
                                <li class="subliWidth">
                                    <p class="bz">备注</p>
                                    <div class="batextarrear">

                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder=""
                                            class="inputtext"
                                            disabled
                                            v-model="debtOthers.remark">
                                        </el-input>
                                    </div>
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
                                        种植收入
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
                                    <span>单亩成本（元）</span>
                                    <span>{{incomePlants.oneCost}}</span>
                                </li>
                                <li>
                                    <span>亩产收入（元）</span>
                                    <span>{{incomePlants.oneIncome}}</span>

                                </li>
                                <li>
                                    <span>结余（元）</span>
                                    <span>{{incomePlants.surplus}}</span>
                                </li>
                            </ul>
                            <div class="describeText">
                                <h3>种植经验描述</h3>
                                <div class=""
                                    v-for="(incomePlants,index) in item.incomePlants"
                                    >
                                    <el-input
                                        v-if="incomePlants.remark != ''"
                                        type="textarea"
                                        :rows="2"
                                        placeholder=""
                                        class="describetext"
                                        disabled
                                        v-model="incomePlants.remark">
                                    </el-input>
                                    <el-input
                                        v-if="incomePlants.remark == '' ? index == 1 : ''"
                                        type="textarea"
                                        :rows="2"
                                        placeholder=""
                                        class="describetext"
                                        disabled
                                        v-model="incomePlantsRemark">
                                    </el-input>
                                </div>

                            </div>
                        </div>
                        <div class="assetsinfoul">
                            <h3>农机作业收入</h3>
                            <ul class="infolist" v-for="incomeFarmMachineryWork in item.incomeFarmMachineryWork">
                                <li>
                                    <span>收入名称</span>
                                    <span>
                                        农机作业收入
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
                                    <span>单亩成本（元）</span>
                                    <span>{{incomeFarmMachineryWork.oneCost}}</span>
                                </li>
                                <li>
                                    <span>亩产收入（元）</span>
                                    <span>{{incomeFarmMachineryWork.oneIncome}}</span>

                                </li>
                                <li>
                                    <span>结余（元）</span>
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
                                        其他收入
                                    </span>
                                </li>
                                <li>
                                    <span>上年收入（元）</span>
                                    <span>{{incomeOthers.prevYearIncome}}</span>
                                </li>
                                <li>
                                    <span>上年支出（元）</span>
                                    <span>{{incomeOthers.prevYearPay}}</span>

                                </li>
                                <li>
                                    <span>本年收入（元）</span>
                                    <span>{{incomeOthers.currYearIncome}}</span>
                                </li>
                                <li>
                                    <span>本年支出（元）</span>
                                    <span>{{incomeOthers.currYearPay}}</span>

                                </li>
                                <li>
                                    <span>结余（元）</span>
                                    <span>{{incomeOthers.surplus}}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="assetsinfoul">
                            <h3>收入偿债比</h3>
                            <ul class="infolist" v-for="incomeDebtRatios in item.incomeDebtRatios">
                                <li>
                                    <span>结余合计（元）</span>
                                    <span>{{incomeDebtRatios.totalSurplus}}</span>
                                </li>
                                <li>
                                    <span>年租金支出（元）</span>
                                    <span>{{incomeDebtRatios.annualRentalExpense}}</span>

                                </li>
                                <li>
                                    <span>其他负债支出（元）</span>
                                    <span>{{incomeDebtRatios.otherDebtExpense}}</span>
                                </li>
                                <li>
                                    <span>年支出合计（元）</span>
                                    <span>{{incomeDebtRatios.totalAnnualExpense}}</span>

                                </li>
                                <li>
                                    <span>偿债比</span>
                                    <span>{{incomeDebtRatios.incomeDebtRatio}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 承租人相关影像资料 -->
                    <div class="div3">
                        <componentitle :message="message='承租人相关影像资料'" />
                        <div class="imgbox" v-for="value in imgFile">
                            <h3>{{value.nodeName}}</h3>
                            <ul>
                                <imgLine :name="val" :type="key" :relationId="item.id" :bussNo="bussNo" v-for="(val,key,index) in value.nodes" :index="index"/>
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
import imgLine from './imgLine';
import {urlParse} from "../../../utils/utils";

export default {
    data() {
        return {
            message: '', //title文字
            tableData: [],
            lesseeinfolist: [], //承租人列表
            images: [],
            partner: '', // 储存法人还是自然人NAT自然人	 LEG法人
            imageslist: {}, //
            fileId: [], //文件ID
            imageUrl: '',
            imgFile: [], // 储存数字结构key
            id: '', //当前ID
            bussNo:'', //订单号
            statuslist: {
                marriage: [],
                custSex: [],
                custRelation: [],
                custType: [],
                houseType: []
            },
            incomePlantsRemark: '' // 种植经验描述
        }
    },
    created() {
        let data = urlParse();
        this.id = data.id;
        this.bussNo = data.bussNo;
        this.getStockPriceByNames();

    },
    mounted() {
    },
    methods: {
        // 请求承租人详情接口拿到partnerType字段用于匹配循环出对应的图片树形结构title
        async getStockPriceByNames(res) {
          this.partner = await (() =>
              this.$post('/leasee/info',{
                 bussNo: this.$route.query.bussNo
              }).then( res => {
                  // 返回示例
                //   {
                //     "msg": "success",
                //     "code": "2000000",
                //     "data": {
                //         "naturalData": [
                //             {
                //                 "id": "fa46972225284c61bec18c094f110f2a",
                //                 "version": 0,
                //                 "status": "1",
                //                 "creator": "",
                //                 "createTime": "2019-04-11T08:59:59.000+0000",
                //                 "editor": "",
                //                 "editTime": "2019-04-11T08:59:59.000+0000",
                //                 "remark": null,
                //                 "bussNo": "test_data_for_app_0411_02",
                //                 "partnerType": "0",
                //                 "custName": "",
                //                 "custSex": "",
                //                 "certNo": "150430",
                //                 "custHomeplace": "",
                //                 "custAge": 0,
                //                 "custType": "",
                //                 "custMobile": "",
                //                 "custWechat": "",
                //                 "custEducation": "",
                //                 "custMarriage": "",
                //                 "custRelation": "",
                //                 "marriageSettlement": "",
                //                 "residenceYears": 0,
                //                 "cultureYears": 0,
                //                 "custAddress": "",
                //                 "bussType": "01",
                //                 "custIsMain": "",
                //                 "hasChildren": "",
                //                 "hasCreditReport": "",
                //                 "certType": "01",
                //                 "spouseId": "",
                //                 "hasLawsuit": "N",
                //                 "hasEnforced": "N",
                //                 "partnerId": "",
                //                 "parentId": "",
                //                 "mateInfo": [
                //                     {
                //                         "id": "d258d9d5919d47ada7d0ac40ac7e3ba8",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T08:59:59.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T08:59:59.000+0000",
                //                         "remark": null,
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "partnerType": "0",
                //                         "custName": "wife",
                //                         "custSex": "",
                //                         "certNo": "",
                //                         "custHomeplace": "",
                //                         "custAge": 0,
                //                         "custType": "",
                //                         "custMobile": "",
                //                         "custWechat": "",
                //                         "custEducation": "",
                //                         "custMarriage": "",
                //                         "custRelation": "配偶",
                //                         "marriageSettlement": "",
                //                         "residenceYears": 0,
                //                         "cultureYears": 0,
                //                         "custAddress": "",
                //                         "bussType": "",
                //                         "custIsMain": "",
                //                         "hasChildren": "",
                //                         "hasCreditReport": "",
                //                         "certType": "01",
                //                         "spouseId": "fa46972225284c61bec18c094f110f2a",
                //                         "hasLawsuit": "N",
                //                         "hasEnforced": "N",
                //                         "partnerId": "",
                //                         "parentId": "",
                //                         "mateInfo": null,
                //                         "childrenInfo": null,
                //                         "assetsHouses": null,
                //                         "assetsLands": null,
                //                         "assetsFinances": null,
                //                         "assetsVehicles": null,
                //                         "assetsFarmTools": null,
                //                         "assetsOthers": null,
                //                         "debtSituations": null,
                //                         "debtGuarantees": null,
                //                         "debtOthers": null,
                //                         "incomePlants": null,
                //                         "incomeFarmMachineryWork": null,
                //                         "incomeOthers": null,
                //                         "incomeDebtRatios": null
                //                     }
                //                 ],
                //                 "childrenInfo": [
                //                     {
                //                         "id": "23d1f7fb6a7a4506b32314cfb4d1ce20",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T08:59:59.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T08:59:59.000+0000",
                //                         "remark": null,
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "partnerType": "0",
                //                         "custName": "child1",
                //                         "custSex": "",
                //                         "certNo": "",
                //                         "custHomeplace": "",
                //                         "custAge": 0,
                //                         "custType": "",
                //                         "custMobile": "",
                //                         "custWechat": "",
                //                         "custEducation": "",
                //                         "custMarriage": "",
                //                         "custRelation": "子女",
                //                         "marriageSettlement": "",
                //                         "residenceYears": 0,
                //                         "cultureYears": 0,
                //                         "custAddress": "",
                //                         "bussType": "",
                //                         "custIsMain": "",
                //                         "hasChildren": "",
                //                         "hasCreditReport": "",
                //                         "certType": "01",
                //                         "spouseId": "",
                //                         "hasLawsuit": "N",
                //                         "hasEnforced": "N",
                //                         "partnerId": "",
                //                         "parentId": "fa46972225284c61bec18c094f110f2a",
                //                         "mateInfo": null,
                //                         "childrenInfo": null,
                //                         "assetsHouses": null,
                //                         "assetsLands": null,
                //                         "assetsFinances": null,
                //                         "assetsVehicles": null,
                //                         "assetsFarmTools": null,
                //                         "assetsOthers": null,
                //                         "debtSituations": null,
                //                         "debtGuarantees": null,
                //                         "debtOthers": null,
                //                         "incomePlants": null,
                //                         "incomeFarmMachineryWork": null,
                //                         "incomeOthers": null,
                //                         "incomeDebtRatios": null
                //                     }
                //                 ],
                //                 "assetsHouses": [
                //                     {
                //                         "id": "94209f4515b24202958a8ba78f46cd7b",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "type": 1,
                //                         "acreage": 100,
                //                         "currEvaluation": 0,
                //                         "owner": "",
                //                         "mortgage": "",
                //                         "address": "",
                //                         "haveCertificate": ""
                //                     }
                //                 ],
                //                 "assetsLands": [
                //                     {
                //                         "id": "27d9921730e74d25968628b24fff61b0",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "acreage": 245,
                //                         "value": 0,
                //                         "contractLife": 0,
                //                         "mortgage": "0",
                //                         "address": "",
                //                         "checkMode": ""
                //                     }
                //                 ],
                //                 "assetsFinances": [
                //                     {
                //                         "id": "4a3bdf68d236476ab621101e1a0e4b2f",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "deposit": 0,
                //                         "bigDeposit": 0,
                //                         "bond": 0,
                //                         "shares": 0,
                //                         "products": 0
                //                     }
                //                 ],
                //                 "assetsVehicles": [
                //                     {
                //                         "id": "ba47c7de3f7744e6bdfda2f9f2287ec4",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "buyTime": "2019-02-02 12:09:32",
                //                         "currEvaluation": 0,
                //                         "owner": "",
                //                         "mortgage": "",
                //                         "serialNo": "",
                //                         "invoiceAmount": 0
                //                     }
                //                 ],
                //                 "assetsFarmTools": [
                //                     {
                //                         "id": "49028c12d3e3417680dfb2167cf1089b",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "buyTime": "2019-03-02 09:09:32",
                //                         "currEvaluation": 0,
                //                         "owner": "",
                //                         "mortgage": "",
                //                         "serialNo": "",
                //                         "invoiceAmount": 0
                //                     }
                //                 ],
                //                 "assetsOthers": [
                //                     {
                //                         "id": "be87a5e3cba14a5f92814243c1bc5ba8",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "value": 245,
                //                         "currEvaluation": 100.02,
                //                         "mortgage": "",
                //                         "owner": ""
                //                     }
                //                 ],
                //                 "debtSituations": [
                //                     {
                //                         "id": "fb233672390f496eb38f195fd86ad00c",
                //                         "version": 0,
                //                         "status": null,
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "debtSituation": "一屁股债",
                //                         "debtType": "",
                //                         "debtPerson": "",
                //                         "debtBalance": 100,
                //                         "debtTerm": "0"
                //                     }
                //                 ],
                //                 "debtGuarantees": [
                //                     {
                //                         "id": "4087719e67fa43e1a1b89112898f50cd",
                //                         "version": 0,
                //                         "status": null,
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": null,
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "externalGuarantee": "一屁股债",
                //                         "creditor": "",
                //                         "guaranteeBalance": 0,
                //                         "warrantee": "",
                //                         "withWarranteeRelation": ""
                //                     }
                //                 ],
                //                 "debtOthers": [
                //                     {
                //                         "id": "27abb444d64b4eec9292284b6a074c17",
                //                         "version": 0,
                //                         "status": null,
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": null,
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "otherDebt": "",
                //                         "creditor": "一股债",
                //                         "debtBalance": 0,
                //                         "debtMaturity": "",
                //                         "isGuarantee": "0"
                //                     }
                //                 ],
                //                 "incomePlants": [
                //                     {
                //                         "id": "bc2c9946c3684ea080c06f6bb57a27ca",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "plantType": "玉米",
                //                         "plantArea": 0,
                //                         "oneCost": 0,
                //                         "oneIncome": 0,
                //                         "surplus": 1300,
                //                         "bussType": "00"
                //                     }
                //                 ],
                //                 "incomeFarmMachineryWork": [
                //                     {
                //                         "id": "da89cf77cfed4b8d9ceea25196ced4cd",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "plantType": "开荒",
                //                         "plantArea": 0,
                //                         "oneCost": 0,
                //                         "oneIncome": 0,
                //                         "surplus": 1000,
                //                         "bussType": "01"
                //                     }
                //                 ],
                //                 "incomeOthers": [
                //                     {
                //                         "id": "b7f884892ad34fc3ab6a7166447cb916",
                //                         "version": 0,
                //                         "status": "1",
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": "",
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "prevYearIncome": 0,
                //                         "prevYearPay": 0,
                //                         "currYearIncome": 0,
                //                         "currYearPay": 0,
                //                         "surplus": 0
                //                     }
                //                 ],
                //                 "incomeDebtRatios": [
                //                     {
                //                         "id": "274ea5a9a8264dedadf5b635a888c3d7",
                //                         "version": 0,
                //                         "status": null,
                //                         "creator": "",
                //                         "createTime": "2019-04-11T09:00:00.000+0000",
                //                         "editor": "",
                //                         "editTime": "2019-04-11T09:00:00.000+0000",
                //                         "remark": null,
                //                         "bussNo": "test_data_for_app_0411_02",
                //                         "custId": "fa46972225284c61bec18c094f110f2a",
                //                         "totalSurplus": 0,
                //                         "annualRentalExpense": 0,
                //                         "otherDebtExpense": 0,
                //                         "totalAnnualExpense": 0,
                //                         "incomeDebtRatio": 0
                //                     }
                //                 ]
                //             }
                //         ],
                //         "bussNo": "test_data_for_app_0411_02"
                //     }
                // }
                  if(res.data.code == '2000000') {
                      this.lesseeinfolist = res.data.data.naturalData;
                      for(let i = 0 ; i < this.lesseeinfolist.length ; i ++ ) {
                          // 获取各种option的默认选项匹配字典编码
                          this.$post('/getConstantConfig',{
                              dictionaryCode: ['custMarriage','custType','custSex','custRelation','houseType','isGuarantee']
                          }).then(res => {
                              this.statuslist.marriage = res.data.data.custMarriage;
                              this.statuslist.custSex = res.data.data.custSex;
                              this.statuslist.custRelation = res.data.data.custRelation;
                              this.statuslist.custType = res.data.data.custType;
                              this.statuslist.houseType = res.data.data.houseType;
                          })
                          return this.lesseeinfolist[i].partnerType;
                      }
                  }
              })
          )();
          //获取图片树形结构
          const stockPrice = await (() => {
              const matType = {"NAT":"NATURAL_MATERIAL","LEG":"LEGAL_MATERIAL"};
              if (!matType[this.partner]) {
                  this.$message.error('无承租人图片信息')
                  return;
              }
              return this.$post('/materialTree',{
                  materialType: matType[this.partner]
              }).then( res => {
                  if(res.data.code == '2000000') {

                      this.imageslist = res.data.data;
                      let treeInfo = res.data.data.NATURE_MATERIAL;
                      let tempArr = [];
                      Object.keys(treeInfo).forEach((key) => {
                         tempArr.push(treeInfo[key]);
                      });
                      this.imgFile = tempArr;
                      console.log(this.imgFile,'1');
                  }
              })
          })();
        },
    },
    components: {
        componentitle,
        imgLine,
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
            background: #f5f5f5;
            margin: 0;
            margin-top: -5px;
            position: relative;
            height: 50px;
            line-height: 50px;
            color: #585858;
            border: 1px solid #afafaf;
        }
        .assetsinfoul {
            ul {
                margin-top: -1px;
            }
        }
        .div3 {
            margin-top: 10px;
            .imgbox {
                clear: both;
                .imglist {
                    margin-top: 16px;
                }
                h3 {
                    font-size: 16px;
                    font-size: 14px;
                }
                .imgeslist {
                    img {
                        float: left;
                        margin-left: 15px;
                    }
                }
                ul {
                    width: 99.8%;
                    margin: -1px auto 0;
                    border: 1px solid #afafaf;
                    clear:both;
                    &:last-child {
                        /*margin-bottom: 30px;*/
                    }
                    li {
                        width: 100%;
                        text-align: center;
                        clear: both;
                        border-bottom: 1px solid #afafaf;
                        border-bottom: 1px solid #afafaf;
                        overflow: hidden;
                        position: relative;
                        min-height: 134px;

                        div {
                            color: #606266;
                        }
                    }
                }
            }
        }
    }
}
.tabletitleul {
    width: 29.8%;
    line-height: 100px;
    float: left;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}
.imgRelevant {
    width: 69.9%;
    float: right;
    overflow: hidden;
    /*
    border-right: 1px solid #afafaf;
    border-left: 1px solid #afafaf;
    height: 134px;
    */
    .imagescss {
        float: left;
        margin-left: 10px;
    }
}
.bz {
    width: 16%;
    float: left;
    color: #212121;
    font-weight: bold;
}
.batextarrear {
    width: 83%;
    float: left;
    margin-left: -1px;
    border-left: 1px solid #afafaf;
    .el-textarea__inner {
        padding: 0 15px;
    }
}
.describeText {
    .describetext {
        width: 99.8%;
        margin: 10px auto;
        display: block;
    }
}

.titlecomponent {
    margin-top: 10px;
}
.batextarrear .el-textarea {
    vertical-align: middle;
    margin-left: 5px;
}

</style>
