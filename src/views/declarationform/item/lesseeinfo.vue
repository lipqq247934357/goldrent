<template>
<div class="businfosss tabsinfo">
    <div class="subtabs newfrom">
        <!-- <el-tabs type="border-card">
                <el-tab-pane :label="'承租人'">
                </el-tab-pane>
            </el-tabs> -->
        <div class="addbutton">
            <el-button size="small" @click="addTab(editableTabsValue)" class="el-icon-plus">
                增加承租人
            </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="(item, index) of naturalData" :key="item.name" :label="item.title" :name="item.name">
                <div class="matchingDiv">
                    <div class="matchingText">
                        商业伙伴类型
                    </div>
                    <div class="matchingText">
                        自然人
                    </div>
                    <div class="matchingText">
                        身份证号码
                    </div>
                    <div class="matchingText matchId">
                        <el-input v-model="item.matchingId" maxlength="18" class="matchingId" placeholder="请输入身份证号">
                        </el-input>
                    </div>
                    <el-button type="primary" size="medium" @click="handleMatching" class="matchingButton">
                        匹配信息
                    </el-button>
                </div>
                <!-- 基本信息 -->

                <componentitle :message="message='基本信息'" class="componentitle" />
                <div class="tableTitle">
                    承租人信息
                </div>
                <!-- 承租人信息表格 -->

                <table class="lessinfoTbale">
                    <tr>
                        <td>姓名</td>
                        <td>
                            <el-input type="text" v-model="item.custName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select v-model="item.custEducation" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.custEducation"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumber" type="text" maxlength="18" class="inputLessinfo" v-model="item.certNo">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input type="text" v-model="item.residenceYear" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            {{item.custSex}}
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input type="text" v-model="item.cultureYears" @change="plantYears" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>户籍地址</td>
                        <td>
                            <el-input type="text" v-model="item.custHomeplace" class="inputLessinfo"></el-input>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" v-model="item.custAddress" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年龄</td>
                        <td>
                            {{item.custAge}}
                        </td>
                        <td>是否有子女</td>
                        <td>
                            <el-select v-model="item.hasChildren" class="inputLessinfo" placeholder="请选择" @change="childChange">
                                <el-option v-for="items in rulesField.hasChildren" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>客户类别</td>
                        <td>
                            <el-select v-model="item.custType" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.custType"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>征信报告</td>
                        <td>
                            <el-select v-model="item.hasCreditReport" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.hasCreditReport"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td>
                            <el-input type="text"
                                v-model="item.custMobile"
                                class="inputLessinfo"
                                @change="natural">
                            </el-input>
                        </td>
                        <td>婚姻状况</td>
                        <td>
                            <el-select v-model="item.custMarriage" class="inputLessinfo" @change="custMarriageChange" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.custMarriage"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="item.custWechat" class="inputLessinfo"></el-input>
                        </td>
                        <td>是否有离婚协议</td>
                        <td>
                            <el-select
                                v-model="item.marriageSettlement"
                                class="inputLessinfo"
                                :disabled="item.custMarriage != 'divorced'"
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.marriageSettlement"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>

                <div class="tableTitle" v-show="item.custMarriage == 'married'">
                    承租人配偶
                </div>
                <!-- 承租人配偶信息表格 -->

                <table class="lessinfoTbale" v-show="item.custMarriage == 'married'" v-for="(mateinfoTbale,mateinfoIndex) in item.mateInfo">
                    <tr>
                        <td>姓名</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select v-model="mateinfoTbale.custEducation" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.custEducation" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumberType" type="text" maxlength="18" class="inputLessinfo" v-model="mateinfoTbale.certNo">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.residenceYears" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            <!-- <el-input type="text" v-model="item.naturalData.lessinfoSex" class="inputLessinfo"></el-input> -->
                            {{mateinfoTbale.custSex}}
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.plantYear" @change="plantYears" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>户籍地址</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custHomeplace" class="inputLessinfo"></el-input>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custAddress" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年龄</td>
                        <td>
                            {{mateinfoTbale.custAge}}
                        </td>
                        <td>婚姻状况</td>
                        <td>
                            <el-select v-model="mateinfoTbale.custMarriage" class="inputLessinfo" @change="custMarriageChange" placeholder="请选择">
                                <el-option v-for="items in rulesField.custMarriage" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>客户类别</td>
                        <td>
                            <el-select v-model="mateinfoTbale.custType" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.custType" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>是否有离婚协议</td>
                        <td>
                            <el-select v-model="mateinfoTbale.marriageSettlement" class="inputLessinfo" :disabled="item.mateInfo.custMarriage != 'divorced'" placeholder="请选择">
                                <el-option v-for="items in rulesField.marriageSettlement" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custMobile" class="inputLessinfo" @change="phoneChange"></el-input>
                        </td>
                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custWechat" class="inputLessinfo"></el-input>
                        </td>
                    </tr>

                </table>

                <!-- 承租人子女 -->
                <lessinfochild
                    ref="headerChild"
                    v-show="item.hasChildren == 'Y'"
                    :naturalData="naturalData"/>

                <!-- 资产情况 -->
                <componentitle :message="message='资产情况'" class="componentitle" />
                <div class="assetsAll">
                    <!-- 房产 -->
                    <p class="tableTitle">房产（如有）</p>
                    <assets ref="house" :rulesField="rulesField" />

                    <!-- 土地（含代收代耕）（如有） -->
                    <p class="tableTitle">土地（含代收代耕）（如有）</p>
                    <lands ref="lands" :rulesField="rulesField"/>

                    <!-- 金融资产 -->
                    <p class="tableTitle">金融资产（如有）</p>
                    <financial ref="financial" :rulesField="rulesField"/>

                    <!-- 自用车 -->
                    <p class="tableTitle">自用车（如有）</p>
                    <homecar ref="homecar" :rulesField="rulesField"/>

                    <!-- 农机具 -->
                    <p class="tableTitle">农机具（如有）</p>
                    <farmtools ref="farmtools" :rulesField="rulesField"/>

                    <!-- 其他资产 -->
                    <p class="tableTitle">其他资产（如有）</p>
                    <assetsOthers ref="assetsOthers" :rulesField="rulesField"/>
                </div>
                <!-- 负债情况 -->
                <componentitle :message="message='负债情况'" class="componentitle" />
                <div class="liabilitiesDiv">
                    <!-- 债务情况 -->
                    <p class="tableTitle">债务情况（如有）</p>
                    <debt ref="debt" :rulesField="rulesField" />

                    <!-- 对外担保 -->
                    <p class="tableTitle">对外担保</p>
                    <guarantee ref="guarantee" :rulesField="rulesField" />

                    <!-- 其他负债 -->
                    <p class="tableTitle">其他负债</p>
                    <otherLiabilities ref="otherLiabilities" :rulesField="rulesField" />

                </div>

                <!-- 收入情况 -->
                <componentitle :message="message='收入情况'" class="componentitle" />
                <div class="IncomeDiv">
                    <!-- 种植收入 -->
                    <p class="tableTitle">种植收入</p>
                    <plant ref="plant" :rulesField="rulesField" />

                    <!-- 农机作业收入 -->
                    <p class="tableTitle">农机作业收入</p>
                    <agriculture ref="agriculture" :rulesField="rulesField" />

                    <!-- 其他收入 -->
                    <p class="tableTitle">其他收入（如有）</p>
                    <otherIncome ref="otherIncome" :rulesField="rulesField" />

                    <!-- 收入偿债比 -->
                    <p class="tableTitle" style="display:inline-block;">收入偿债比</p>
                    <el-button
                        @click="incomeComputed"
                        type="primary"
                        size="medium"
                        class="matchingButton"
                        style="float:right;background:#ff8f2b;border: 0;">
                        计算
                    </el-button>
                    <table class="lessinfoTbale" v-for="(debtrepayment,index) in item.incomeDebtRatios">
                        <tr>
                            <td>结余合计</td>
                            <td>
                                <el-input-number
                                    class="inputLessinfo"
                                    v-model="debtrepayment.totalSurplus"
                                    :precision="2"
                                    :step="0.1"
                                    >
                                </el-input-number>
                            </td>
                            <td>年租金支出</td>
                            <td>
                                <el-input-number
                                    class="inputLessinfo"
                                    v-model="debtrepayment.annualRentalExpense"
                                    :precision="2"
                                    :step="0.1"
                                    >
                                </el-input-number>
                            </td>
                        </tr>
                        <tr>
                            <td>其他负债支出</td>
                            <td>
                                <el-input-number
                                    class="inputLessinfo"
                                    v-model="debtrepayment.otherDebtExpense"
                                    :precision="2"
                                    :step="0.1"
                                    >
                                </el-input-number>
                            </td>
                            <td>年支出合计</td>
                            <td>
                                <el-input-number
                                    class="inputLessinfo"
                                    v-model="debtrepayment.totalAnnualExpense"
                                    :precision="2"
                                    :step="0.1"
                                    >
                                </el-input-number>
                            </td>
                        </tr>
                        <tr>
                            <td>债偿比（年支出、年结余）</td>
                            <td>
                                <el-input-number
                                    class="inputLessinfo"
                                    v-model="debtrepayment.incomeDebtRatio"
                                    :precision="2"
                                    :step="0.1"
                                    >
                                </el-input-number>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- 回款账户 -->
                <componentitle :message="message='回款账户'" class="componentitle" />
                <p class="tableTitle">预计回款账户（如有）</p>
                <!-- "accountInfos": "预计回款账户",
  "account": "银行账号",
  "accountBank": "开户银行",
  "accountName": "账户名称", -->
                <table class="lessinfoTbale" v-for="(itemsName,index) in item.accountInfos">
                    <tr>
                        <td>账户名称</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="itemsName.accountName"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>开户银行</td>
                        <td>
                            <el-input
                                type="text"
                                class="inputLessinfo"
                                v-model="itemsName.accountBank">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>银行账号</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="itemsName.account"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                </table>

            </el-tab-pane>
        </el-tabs>
        <!-- 底部按钮 -->
        <div class="bottomButtonDiv matchingDiv">
            <el-button type="primary" size="medium" class="matchingButton" @click="save">
                保存
            </el-button>
            <el-button type="primary" size="medium" class="matchingButton" @click="next">
                下一步
            </el-button>
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import lessinfochild from '../components/lessinfochild.vue'; // 承租人子女
import assets from '../components/assets.vue'; // 资产情况
import lands from '../components/lands.vue'; // 土地（含代收代耕）（如有）
import financial from '../components/lessinfoFinancial.vue'; // 金融资产
import homecar from '../components/homeCar.vue'; // 自用车
import farmtools from '../components/farmTools.vue'; // 农机具
import assetsOthers from '../components/assetsOthers.vue'; // 其他资产
import debt from '../components/debt.vue'; // 债务情况
import guarantee from '../components/guarantee.vue'; // 对外担保
import otherLiabilities from '../components/otherLiabilities.vue'; // 其他负债
import plant from '../components/plant.vue'; // 种植收入
import agriculture from '../components/agriculture.vue'; // 农机作业收入
import otherIncome from '../components/otherIncome.vue'; // 其他收入
export default {
    data() {
        return {
            message: '', //title
            maritalStatus: '',
            editableTabsValue: '1',
            matchingId: '', // 匹配按钮的身份证号
            otherData: [],//用来储存naturalData 承租人数组数据，因为删除页签之后会出现问题
            naturalData: [{
                title: '承租人1',
                name: '1',
                certNo: '', //身份证号码
                residenceYears: '', //申请地居住年限
                custSex: '', // 性别
                cultureYears: '', //种植年限
                custName: '', //承租人信息姓名
                custEducation: '', //存储选中的教育程度
                custType: '', //存储选中的客户类别
                hasChildren: '', //存储选中的是否有子女
                hasCreditReport: '', //存储选中的征信报告
                custMarriage: '', //存储选中的婚姻状况
                marriageSettlement: '', //存储选中的离婚协议
                custHomeplace: '', // 户籍地址
                custAddress: '', //现住址
                custAge: '', //年龄
                custWechat: '', // 微信
                custMobile: '', // 电话
                mateInfo: [{
                    certNo: '', //身份证号码
                    residenceYears: '', //申请地居住年限
                    custSex: '', // 性别
                    cultureYears: '', //种植年限
                    custName: '', //承租人信息姓名
                    custEducation: '', //存储选中的教育程度
                    custType: '', //存储选中的客户类别
                    hasChildren: '', //存储选中的是否有子女
                    hasCreditReport: '', //存储选中的征信报告
                    custMarriage: '', //存储选中的婚姻状况
                    marriageSettlement: '', //存储选中的离婚协议
                    custHomeplace: '', // 户籍地址
                    custAddress: '', //现住址
                    custAge: '', //年龄
                    custWechat: '', // 微信
                    custMobile: '', // 电话
                }],
                childrenInfo: [],
                childrenInfo: [], //子女信息
                assetsHouses: [], //房产
                assetsLands: [],//土地
                assetsFinances: [],// 进入资产
                assetsVehicles: [], //自用车
                assetsFarmTools: [],//农机具
                assetsOthers: [], //其他资产
                debtSituations: [], //债务情况
                debtGuarantees: [], //对外担保
                debtOthers: [], //其他负债
                incomePlants: [], //种植收入
                incomeFarmMachineryWork: [],//农机作业收入
                incomeOthers: [], //其他收入
                incomeDebtRatios: [
                    {
                        id: '', //主键ID
                        totalSurplus: '', //结余合计
                        annualRentalExpense: '', //年租金支出
                        otherDebtExpense: '', //其他负债支出
                        totalAnnualExpense: '', //年支出合计
                        incomeDebtRatio: '', //收入债偿比
                        status: '' //状态
                    }
                ],
                accountInfos:[
                    {
                        account: "", //银行账号
                        accountBank: "", //开户银行
                        accountName: "", //账户名称
                    }
                ]
            }],

            tabIndex: 1,

        }
    },
    created() {
    },
    props: {
        rulesField: {
            type: Object
        },
        bussNo: {
            type: String
        }
    },
    mounted() {
        console.log(this.bussNo);
    },
    methods: {

        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.otherData = this.naturalData;
            this.naturalData.push({
                title: '承租人' + newTabName,
                name: newTabName,
                idNum: '', //身份证号码
                residenceYear: '', //申请地居住年限
                lessinfoSex: '', // 性别
                plantYear: '', //种植年限
                lessinfoName: '', //承租人信息姓名
                educationLevel: '', //存储选中的教育程度
                custType: '', //存储选中的客户类别
                hasChildren: '', //存储选中的是否有子女
                hasCreditReport: '', //存储选中的征信报告
                custMarriage: '', //存储选中的婚姻状况
                marriageSettlement: '', //存储选中的离婚协议
                householdArrress: '', // 户籍地址
                nowAddress: '', //现住址
                lessinfoAge: '', //年龄
                lessinfoWechat: '', // 微信
                lessinfoPhone: '', // 电话
                mateInfo: [{
                    idNum: '', //身份证号码
                    residenceYear: '', //申请地居住年限
                    lessinfoSex: '', // 性别
                    plantYear: '', //种植年限
                    lessinfoName: '', //承租人信息姓名
                    educationLevel: '', //存储选中的教育程度
                    custType: '', //存储选中的客户类别
                    custMarriage: '', //存储选中的婚姻状况
                    marriageSettlement: '', //存储选中的离婚协议
                    householdArrress: '', // 户籍地址
                    nowAddress: '', //现住址
                    lessinfoAge: '', //年龄
                    lessinfoWechat: '', // 微信
                    lessinfoPhone: '', // 电话
                }],
                childrenInfo: [], //子女信息
                assetsHouses: [], //房产
                assetsLands: [],//土地
                assetsFinances: [],// 进入资产
                assetsVehicles: [], //自用车
                assetsFarmTools: [],//农机具
                assetsOthers: [], //其他资产
                debtSituations: [], //债务情况
                debtGuarantees: [], //对外担保
                debtOthers: [], //其他负债
                incomePlants: [], //种植收入
                incomeFarmMachineryWork: [],//农机作业收入
                incomeOthers: [], //其他收入
                incomeDebtRatios: [ //收入偿债比
                    {
                        id: '', //主键ID
                        totalSurplus: '', //结余合计
                        annualRentalExpense: '', //年租金支出
                        otherDebtExpense: '', //其他负债支出
                        totalAnnualExpense: '', //年支出合计
                        incomeDebtRatio: '', //收入债偿比
                        status: '' //状态
                    }
                ],
                accountInfos:[
                    {
                        account: "", //银行账号
                        accountBank: "", //开户银行
                        accountName: "", //账户名称
                    }
                ]
            });
            this.editableTabsValue = newTabName;
            console.log(this.naturalData);
        },
        removeTab(targetName) {

            let tabs = this.naturalData;
            let activeName = this.editableTabsValue;

            // 至少要保留一个
            if (this.naturalData.length == 1) {
                return;
            }


            if (activeName === targetName) {
                tabs.forEach((tab, index) => {

                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {

                            activeName = nextTab.name;
                        }
                    }
                });
            }

            this.editableTabsValue = activeName;
            this.naturalData = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.naturalData.forEach(function(item, index, arr) {
                item.title = '承租人' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '承租人' + parseInt(index + 1);
            })
            this.editableTabsValue = this.naturalData.length + '';
            //主要防止于添加的时候错误
            this.tabIndex = this.naturalData.length;
        },
        // 匹配信息按钮
        handleMatching() {

        },
        // 联系电话关联微信号
        phoneChange(val) {

            let nowIndex = this.tabIndex - 1;
            setTimeout(function() {
                this.naturalData[nowIndex].mateInfo.custWechat = this.naturalData[nowIndex].mateInfo.custMobile;
            }.bind(this),100);
        },
        natural(val) {
            let nowIndex = this.tabIndex - 1;
            setTimeout(function() {
                this.naturalData[nowIndex].custWechat = this.naturalData[nowIndex].custMobile;
                console.log(this.naturalData[nowIndex].custMobile);
            }.bind(this),100);
        },
        // 判断种植年限
        plantYears(val) {
            console.log(val);
            if(parseInt(val) > parseInt(this.naturalData.naturalData.lessinfoAge)) {
                this.$message.error('种植年限不能大于年龄');
                this.naturalData.naturalData.plantYear = '';
            }
        },
        // 婚姻状况切换
        custMarriageChange(val) {
            if(this.maritalStatus == 'married') {
                this.$confirm('配偶录入的信息将被删除，是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除',
                    // this.naturalData.mateInfo[this.tabIndex].custMarriage = 'married';

                  });
                });
            }
            this.maritalStatus = val;

        },
        // 债偿比计算
        incomeComputed() {
            let a = [];
            for(let i = 0; i < this.$refs.plant.length; i++) {
                // this.naturalData[i].incomePlants =
                // a.push();
                this.$refs.plant[i].incomePlants.forEach(function(item) {
                    a.push(item.surplus)
                });
            }
            for(let i = 0; i < this.$refs.agriculture.length; i++) {
                this.$refs.agriculture[i].incomeFarmMachineryWork.forEach(function(item) {
                    a.push(item.surplus)
                });
            }
            for(let i = 0; i < this.$refs.otherIncome.length; i++) {
                this.$refs.otherIncome[i].incomeOthers.forEach(function(item) {
                    a.push(item.surplus)
                });
            }
            let summation = 0;
            let nowIndex = this.tabIndex - 1;
            for (let i = a.length-1; i>=0; i--) {
                summation += a[i];
            }
            // incomeDebtRatios
            this.naturalData[nowIndex].incomeDebtRatios[nowIndex].totalSurplus = summation;
            console.log(summation);
        },
        // 获取录入的身份号
        idNumber(val) {
            let idcontent = this.$idCard.IDcode(val);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
                return;
            }
            let nowIndex = this.tabIndex - 1;
            setTimeout(function() {
                this.naturalData[nowIndex].custSex = idcontent.Sex;
                this.naturalData[nowIndex].custAge = idcontent.Age;
            }.bind(this),100);
        },
        idNumberType(val) {
            let idcontent = this.$idCard.IDcode(val);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
            }
            let nowIndex = this.tabIndex - 1;

            setTimeout(function() {
                this.naturalData[nowIndex].mateInfo[nowIndex].custSex = idcontent.Sex;
                this.naturalData[nowIndex].mateInfo[nowIndex].custAge = idcontent.Age;
                console.log(this.naturalData[nowIndex].mateInfo[nowIndex].custAge);
            }.bind(this),100);
        },
        // 是否有子女
        childChange(val) {
            if(val == 'Y') {
                this.$store.state.lessinfoAddress = this.naturalData[0].householdArrress; // 承租人户籍地址
        		this.$store.state.lessinfoNowAddress = this.naturalData[0].nowAddress; //承租人现住址
            }
        },
        // 保存
        save() {
            // this.$post('/leasee/info',{
            //     bussNo: 'NJZL-HZ-201910-0018'
            // }).then(res => {
            //     console.log(res);
            // });
            // return;
            this.allTabData(this.naturalData);
            this.naturalData.forEach(function(item,index) { // 删除子tab 的name 和title 因为后台用不了传过去报错
                delete item.name;
                delete item.title;
                item.childrenInfo.forEach(function(subItem) { // 子女
                    delete subItem.name;
                    delete subItem.title;
                });

                item.assetsHouses.forEach(function(subItem) { // 房产
                    delete subItem.name;
                    delete subItem.title;
                });

                item.assetsLands.forEach(function(subItem) { // 土地
                    delete subItem.name;
                    delete subItem.title;
                });

                item.assetsFinances.forEach(function(subItem) { // 金融资产
                    delete subItem.name;
                    delete subItem.title;
                });

                item.assetsVehicles.forEach(function(subItem) { // 自用车
                    delete subItem.name;
                    delete subItem.title;
                });

                item.assetsFarmTools.forEach(function(subItem) { // 农机具
                    delete subItem.name;
                    delete subItem.title;
                });

                item.assetsOthers.forEach(function(subItem) { // 其他资产
                    delete subItem.name;
                    delete subItem.title;
                });

                item.debtSituations.forEach(function(subItem) { // 债务情况
                    delete subItem.name;
                    delete subItem.title;
                });

                item.debtGuarantees.forEach(function(subItem) { // 对外担保
                    delete subItem.name;
                    delete subItem.title;
                });

                item.debtOthers.forEach(function(subItem) { // 其他负债
                    delete subItem.name;
                    delete subItem.title;
                });

                item.incomePlants.forEach(function(subItem) { // 种植收入
                    delete subItem.name;
                    delete subItem.title;
                });

                item.incomeFarmMachineryWork.forEach(function(subItem) { // 农机作业收入
                    delete subItem.name;
                    delete subItem.title;
                });

                item.incomeOthers.forEach(function(subItem) { // 其他收入
                    delete subItem.name;
                    delete subItem.title;
                });
            });
            this.$post('/leasee/add',{
                bussNo: this.bussNo,
                data: this.naturalData
            }).then(res => {
                console.log(res);
                if(res.data.code == 2000000) {
                    this.naturalData.forEach(function(item,index) { //用于ajax提交完成后返回删除的tab name 和title
                        item['name'] = index + 1 + '';
                        item['title'] = '承租人' + parseInt( index + 1);
                        item.assetsHouses.forEach(function(subItem,indexs) {
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '房产' + parseInt( indexs + 1);
                        });
                        item.childrenInfo.forEach(function(subItem,indexs) { // 子女
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '承租人子女' + parseInt( indexs + 1);
                        });

                        item.assetsLands.forEach(function(subItem,indexs) { // 土地
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '土地' + parseInt( indexs + 1);
                        });

                        item.assetsFinances.forEach(function(subItem,indexs) { // 金融资产
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '金融资产' + parseInt( indexs + 1);
                        });

                        item.assetsVehicles.forEach(function(subItem,indexs) { // 自用车
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '自用车' + parseInt( indexs + 1);
                        });

                        item.assetsFarmTools.forEach(function(subItem,indexs) { // 农机具
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '农机具' + parseInt( indexs + 1);
                        });

                        item.assetsOthers.forEach(function(subItem,indexs) { // 其他资产
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '其他资产' + parseInt( indexs + 1);
                        });

                        item.debtSituations.forEach(function(subItem,indexs) { // 债务情况
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '债务情况' + parseInt( indexs + 1);
                        });

                        item.debtGuarantees.forEach(function(subItem,indexs) { // 对外担保
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '对外担保' + parseInt( indexs + 1);
                        });

                        item.debtOthers.forEach(function(subItem,indexs) { // 其他负债
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '其他负债' + parseInt( indexs + 1);
                        });

                        item.incomePlants.forEach(function(subItem,indexs) { // 种植收入
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '种植收入' + parseInt( indexs + 1);
                        });

                        item.incomeFarmMachineryWork.forEach(function(subItem,indexs) { // 农机作业收入
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '农机作业收入' + parseInt( indexs + 1);
                        });

                        item.incomeOthers.forEach(function(subItem,indexs) { // 其他收入
                            subItem['name'] = indexs + 1 + '';
                            subItem['title'] = '其他收入' + parseInt( indexs + 1);
                        });
                    });
                }
            });
        },
        // 下一步
        next() {

        },

        tabsFor(arrList) {
            arrList.forEach(function(item) {
                delete item.title;
                delete item.name;
            });
        },
        // 整合所有tab的数据
        allTabData() {

            // console.log(assetschild);
            // console.log(this.$refs.headerChild,'承租人子女') //承租人子女
            // console.log(this.$refs.house,'房产')  //房产
            // console.log(this.$refs.lands,'土地（含代收代耕）（如有）') //土地（含代收代耕）（如有）
            // console.log(this.$refs.financial,'金融资产')  // 金融资产
            // console.log(this.$refs.homecar,'自用车') // 自用车
            // console.log(this.$refs.farmtools,'农机具') //农机具
            // console.log(this.$refs.assetsOthers,'其他资产')  // 其他资产
            // console.log(this.$refs.debt,'债务情况') // 债务情况
            // console.log(this.$refs.guarantee,'对外担保') // 对外担保
            // console.log(this.$refs.otherLiabilities,'其他负债')  // 其他负债
            // console.log(this.$refs.plant,'种植收入') //种植收入
            // console.log(this.$refs.agriculture,'农机作业收入') //农机作业收入
            // console.log(this.$refs.otherIncome,'其他收入') //其他收入
            // this.tabsFor(this.naturalData)
            // console.log(this.$refs.headerChild);
            for(let i = 0; i < this.$refs.headerChild.length; i++) {
                if(this.naturalData[i].hasChildren == "Y") {
                    this.naturalData[i].childrenInfo = this.$refs.headerChild[i].childrenInfo
                }
            }
            for(let i = 0; i < this.$refs.house.length; i++) {
                this.naturalData[i].assetsHouses = this.$refs.house[i].assetsHouses;
            }
            for(let i = 0; i < this.$refs.lands.length; i++) {
                this.naturalData[i].assetsLands = this.$refs.lands[i].assetsLands
            }
            for(let i = 0; i < this.$refs.financial.length; i++) {
                    this.naturalData[i].assetsFinances = this.$refs.financial[i].assetsFinances
            }
            for(let i = 0; i < this.$refs.homecar.length; i++) {
                this.naturalData[i].assetsVehicles = this.$refs.homecar[i].assetsVehicles
            }
            for(let i = 0; i < this.$refs.farmtools.length; i++) {
                this.naturalData[i].assetsFarmTools = this.$refs.farmtools[i].assetsFarmTools
            }
            for(let i = 0; i < this.$refs.assetsOthers.length; i++) {
                this.naturalData[i].assetsOthers = this.$refs.assetsOthers[i].assetsOthers
            }
            for(let i = 0; i < this.$refs.debt.length; i++) {
                this.naturalData[i].debtSituations = this.$refs.debt[i].debtSituations
            }
            for(let i = 0; i < this.$refs.guarantee.length; i++) {
                this.naturalData[i].debtGuarantees = this.$refs.guarantee[i].debtGuarantees
            }
            for(let i = 0; i < this.$refs.otherLiabilities.length; i++) {
                this.naturalData[i].debtOthers = this.$refs.otherLiabilities[i].debtOthers
            }
            for(let i = 0; i < this.$refs.plant.length; i++) {
                this.naturalData[i].incomePlants = this.$refs.plant[i].incomePlants
            }
            for(let i = 0; i < this.$refs.agriculture.length; i++) {
                this.naturalData[i].incomeFarmMachineryWork = this.$refs.agriculture[i].incomeFarmMachineryWork
            }
            for(let i = 0; i < this.$refs.otherIncome.length; i++) {
                this.naturalData[i].incomeOthers = this.$refs.otherIncome[i].incomeOthers
            }
        },
},
    components: {
        componentitle,
        lessinfochild,
        assets,
        lands,
        financial,
        homecar,
        farmtools,
        assetsOthers,
        debt,
        guarantee,
        otherLiabilities,
        plant,
        agriculture,
        otherIncome
    }
}
</script>
<style lang="less">
.newfrom {
    .addbutton {
        margin: 10px 0;
    }
    .matchingDiv {
        .matchingText {
            display: inline-block;
            font-size: 14px;
            width: 15%;
            text-align: center;
            border: 1px solid #e5e5e5;
            height: 50px;
            border-right: 0;
            line-height: 50px;
            .matchingId {
                width: 90%;
            }
        }
        .matchId {
            width: 30% !important;
            border-right: 1px solid #e5e5e5 !important;
        }
        .matchingButton {
            background: #ff8f2b;
            border: 0;
            margin-left: 10px;
        }
    }
    .tableTitle {
        font-size: 14px;
        margin: 20px 10px;
    }
    .lessinfoTbale {
        width: 100%;
        tr td {
            font-size: 14px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid #e5e5e5;
            .inputLessinfo {
                width: 80%;
            }
        }
    }
    .bottomButtonDiv {
        width: 200px;
        margin: 20px auto;
    }
}
</style>
