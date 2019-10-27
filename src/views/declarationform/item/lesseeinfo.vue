<template>
<div class="businfosss tabsinfo">
    <div class="subtabs newfrom">
        <div class="addbutton">
            <el-button size="small" @click="addTab(editableTabsValue)" class="el-icon-plus">
                增加承租人
            </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTables">
            <el-tab-pane v-for="(item, index) of naturalData" :key="item.name" :label="item.title" :name="item.name">
                <!-- <div class="matchingDiv"> -->

                    <!-- 暂时不做等下一期 -->

                    <!-- <div class="matchingText">
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
                    </el-button> -->
                <!-- </div> -->
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
                            <el-input
                                type="text"
                                v-model="item.custName"
                                @change="custNameBlur"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select
                                v-model="item.custEducation"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
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
                            <el-input
                                @change="idNumberType(item)"
                                type="text"
                                maxlength="18"
                                class="inputLessinfo"
                                v-model="item.certNo">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input
                                type="text"
                                @change="liveYears"
                                v-model="item.residenceYears"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            {{item.custSex == "M" ? "男" : item.custSex == "F" ? "女" : ""}}
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.cultureYears"
                                @change="plantYears"
                                class="inputLessinfo">
                            </el-input>
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
                            <el-select
                                v-model="item.hasChildren"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择"
                                @change="childChange">
                                <el-option
                                    v-for="items in rulesField.hasChildren"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>客户类别</td>
                        <td>
                            <el-select
                                v-model="item.custType"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
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
                            <el-select
                                v-model="item.hasCreditReport"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
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
                                maxlength="11"
                                v-model="item.custMobile"
                                class="inputLessinfo"
                                @change="natural">
                            </el-input>
                        </td>
                        <td>婚姻状况</td>
                        <td>
                            <el-select
                                v-model="item.custMarriage"
                                class="inputLessinfo"
                                clearable
                                @change="custMarriageChange"
                                placeholder="请选择">
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
                                clearable
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
                <table
                    class="lessinfoTbale"
                    v-show="item.custMarriage == 'married'"
                    v-for="(mateinfoTbale,mateinfoIndex) in item.mateInfo">
                    <tr>
                        <td>姓名</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select
                                v-model="mateinfoTbale.custEducation"
                                clearable
                                class="inputLessinfo"
                                placeholder="请选择">
                                <el-option v-for="items in rulesField.custEducation" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumberType(mateinfoTbale)" type="text" maxlength="18" class="inputLessinfo" v-model="mateinfoTbale.certNo">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input
                                type="text"
                                @change="spouseLiveYears"
                                v-model="mateinfoTbale.residenceYears"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            {{mateinfoTbale.custSex == "M" ? "男" :mateinfoTbale.custSex == "F" ? "女" : ""}}
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.cultureYears" @change="spousePlantYears" class="inputLessinfo"></el-input>
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
                            <el-select
                                v-model="mateinfoTbale.custMarriage = item.custMarriage"
                                disabled
                                clearable
                                class="inputLessinfo"
                                placeholder="请选择">
                                <el-option v-for="items in rulesField.custMarriage" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>客户类别</td>
                        <td>
                            <el-select
                                v-model="mateinfoTbale.custType"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option v-for="items in rulesField.custType" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>联系电话</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="mateinfoTbale.custMobile"
                                class="inputLessinfo"
                                maxlength="11"
                                @change="phoneChange">
                            </el-input>
                        </td>
                        <!-- <td>是否有离婚协议</td>
                        <td>
                            <el-select
                                v-model="mateinfoTbale.marriageSettlement"
                                clearable
                                class="inputLessinfo"
                                :disabled="item.mateInfo.custMarriage != 'divorced'" placeholder="请选择">
                                <el-option v-for="items in rulesField.marriageSettlement" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td> -->
                    </tr>
                    <tr>

                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custWechat" class="inputLessinfo"></el-input>
                        </td>
                    </tr>

                </table>

                <!-- 承租人子女 -->
                <lessinfochild
                    ref="headerChild"
                    @changeChildStatus="changeChildStatus(item)"
                    v-show="item.hasChildren == 'Y'"
                    :sfyzn="naturalData[index].childrenInfo"
                    :naturalData="naturalData"/>

                <!-- 资产情况 -->
                <componentitle :message="message='资产情况'" class="componentitle" />
                <div class="assetsAll">
                    <!-- 房产 -->
                    <p class="tableTitle">房产（如有）</p>
                    <assets ref="house" :fc="naturalData[index].assetsHouses" :rulesField="rulesField" />

                    <!-- 土地（含代收代耕）（如有） -->
                    <p class="tableTitle">土地（含代收代耕）</p>
                    <lands ref="lands" :tds="naturalData[index].assetsLands" :rulesField="rulesField"/>

                    <!-- 金融资产 -->
                    <p class="tableTitle">金融资产（如有）</p>
                    <financial ref="financial" :jrzc="naturalData[index].assetsFinances" :rulesField="rulesField"/>

                    <!-- 自用车 -->
                    <p class="tableTitle">自用车（如有）</p>
                    <homecar ref="homecar" :zyc="naturalData[index].assetsVehicles" :rulesField="rulesField"/>

                    <!-- 农机具 -->
                    <p class="tableTitle">农机具（如有）</p>
                    <farmtools ref="farmtools" :njj="naturalData[index].assetsFarmTools" :rulesField="rulesField"/>

                    <!-- 其他资产 -->
                    <p class="tableTitle">其他资产（如有）</p>
                    <assetsOthers ref="assetsOthers" :qtzc="naturalData[index].assetsOthers" :rulesField="rulesField"/>
                </div>
                <!-- 负债情况 -->
                <componentitle :message="message='负债情况'" class="componentitle" />
                <div class="liabilitiesDiv">
                    <!-- 债务情况 -->
                    <p class="tableTitle">债务情况（如有）</p>
                    <debt ref="debt" :zwqk="naturalData[index].debtSituations" :rulesField="rulesField" />

                    <!-- 对外担保 -->
                    <p class="tableTitle">对外担保（如有）</p>
                    <guarantee ref="guarantee" :dwdb="naturalData[index].debtGuarantees" :rulesField="rulesField" />

                    <!-- 其他负债 -->
                    <p class="tableTitle">其他负债（如有）</p>
                    <otherLiabilities :qtfz="naturalData[index].debtOthers" ref="otherLiabilities" :rulesField="rulesField" />

                </div>

                <!-- 收入情况 -->
                <componentitle :message="message='收入情况'" class="componentitle" />
                <div class="IncomeDiv">
                    <!-- 种植收入 -->
                    <p class="tableTitle">种植收入</p>
                    <plant ref="plant" :zzsr="naturalData[index].incomePlants" :rulesField="rulesField" />

                    <!-- 农机作业收入 -->
                    <p class="tableTitle">农机作业收入</p>
                    <agriculture ref="agriculture" :njzysr="naturalData[index].incomeFarmMachineryWork" :rulesField="rulesField" />

                    <!-- 其他收入 -->
                    <p class="tableTitle">其他收入（如有）</p>
                    <otherIncome ref="otherIncome" :qtsr="naturalData[index].incomeOthers" :rulesField="rulesField" />

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
                            <td>债偿比（年支出/年结余）</td>
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
                <componentitle :message="message='承租人相关影像资料'" class="componentitle" />
                <p class="tableTitle"> 点击保存后才能上传影像资料</p>
                <div class="imgbox"
                    v-for="(imgTrees ,imgIndex) in treeData"
                    v-show="item.id == imgTrees.custId">
                    <div v-if="imgTrees.itemTree">
                        <template v-for="(value,indexs) in imgTrees.itemTree">
                                <h3>{{value.nodeName}}</h3>
                                <ul>
                                    <imgUpload
                                        v-for="(val,key) in value.nodes"
                                        :disabled="type === 'detail'"
                                        :name="val"
                                        :bussNo="bussNo"
                                        :relationId="item.id"
                                        :type="val.key"
                                        @handlePictureCardPreview="handlePictureCardPreview"/>
                                </ul>
                        </template>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 底部按钮 -->
        <div class="bottomButtonDiv matchingDiv">
            <el-button type="primary" size="medium" class="matchingButton" @click="save('save')">
                保存
            </el-button>
            <el-button type="primary" size="medium" class="matchingButton" @click="save('next')">
                下一步
            </el-button>
        </div>
    </div>

    <el-dialog
        width="70%"
        :visible.sync="dialogVisible">
        <el-image
            style="width: 100%; height: 100%"
            :src="dialogImageUrl"
            :preview-src-list="srcList">
        </el-image>
    </el-dialog>
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
import imgUpload from '../imgUpload.vue'; //图片组件
export default {
    data() {
        return {
            treeData: [],
            arrIndexTab: 0,
            imgsUrl: '',
            srcList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            imgFile: [],
            tabChange: 1, //存储切换的tab name

            relationId: '', //图片影像资料需要用到的
            type: '', // 图片影像资料需要用到的
            message: '', //title
            maritalStatus: '',
            editableTabsValue: '1',
            matchingId: '', // 匹配按钮的身份证号
            otherData: [],//用来储存naturalData 承租人数组数据，因为删除页签之后会出现问题
            naturalData: [{
                title: '承租人1',
                name: '1',
                sortIndex: '1',
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
                otherwifeType: '',
                mateInfo: [{
                    id: '',
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
                childrenInfo: [
                    {
                        title: '承租人子女1',
                        name: '1',
                        id: '', // ID
                        certNo: '', // 身份证号
                        custName: '', // 姓名
                        custSex: '', //性别
                        custHomeplace: '', //户籍地址
                        custAge: '', //年龄
                        custAddress: '', //现住址
                        status: '' //状态
                    }
                ], //子女信息
                assetsHouses: [], //房产
                assetsLands: [],//土地
                assetsFinances: [],// 金融资产
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
        this.getData();
    },
    props: ['rulesField','bussNo'],
    mounted() {
    },
    methods: {

        // 页签切换
        changeTables(val) {
            this.tabChange = val.name;
        },

        custNameBlur(val) {
            // 汇款账户名沿用承租人姓名
            this.naturalData[this.tabChange - 1].accountInfos[0].accountName = val;
        },
        getData() {
            // 承租人详情
            this.$post('/leasee/info', {
                bussNo: this.bussNo,
                taskType:"10"
            }).then(res => {
                if (res.data.code == '2000000') {
                    if(res.data.data.naturalData.length != '0') {
                        this.naturalData = res.data.data.naturalData;
                        this.naturalData.forEach(function(item,index) {
                            item['name'] = item.sortIndex + '';
                            item['title'] = "承租人" + item.sortIndex;
                            item.otherwifeType = item.custMarriage;
                            if(item.mateInfo.length == '0') {
                                item.mateInfo = [{
                                    id: '',
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
                                }]
                            }
                        });
                        this.imgData();
                        this.tabIndex = res.data.data.naturalData.length;
                    }
                }
            });
        },
        handlePictureCardPreview(file) { // 图片浏览功能
            this.dialogImageUrl = file.url;

            this.dialogVisible = true;
        },
        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.otherData = this.naturalData;
            this.tabChange++;
            this.naturalData.push({
                title: '承租人' + newTabName,
                name: newTabName,
                certNo: '', //身份证号码
                residenceYears: '', //申请地居住年限
                custSex: '', // 性别
                sortIndex: newTabName,
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
                otherwifeType: '',
                mateInfo: [{
                    id: '',
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
                childrenInfo: [
                    {
                        title: '承租人子女1',
                        name: '1',
                        id: '', // ID
                        certNo: '', // 身份证号
                        custName: '', // 姓名
                        custSex: '', //性别
                        custHomeplace: this.$store.state.lessinfoAddress, //户籍地址
                        custAge: '', //年龄
                        custAddress: this.$store.state.lessinfoNowAddress, //现住址
                        status: '' //状态
                    }
                ], //子女信息
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
        },
        removeTab(targetName) {
            // console.log(this.naturalData[targetName - 1].id)
            if(this.naturalData[targetName - 1].id) {
                this.$post('/data/del',{
                    id: this.naturalData[targetName - 1].id,
                    type: 'custNature'
                }).then(res => {
                    if(res.data.code =='2000000') {
                        this.$message.success('删除成功');

                    }
                });
            }

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
                item.sortIndex = index + 1;
                item.title = '承租人' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '承租人' + parseInt(index + 1);
            })
            this.editableTabsValue = this.naturalData.length + '';
            this.tabChange = this.naturalData.length;
            //主要防止于添加的时候错误
            this.tabIndex = this.naturalData.length;

            this.tabChange--;
        },
        imgData() {
            this.$post('/buss/materialTree',{
                bussNo: this.bussNo
            }).then(res => {

                if(res.data.code == '2000000') {
                    if(res.data.data.leaseholder.length == '0') {
                        return;
                    }

                    this.treeData = res.data.data.leaseholder;
                    // res.data.data.leaseholder.forEach(function(item, index) {
                    //     if(item.custId == this.relationId) {
                    //         this.imgFile = item.itemTree;
                    //     }
                    // })

                    // if(res.data.data.leaseholder[this.tabChange - 1].itemTree) {
                    //     this.treeData = res.data.data.leaseholder;
                    //     let treeInfo = res.data.data.leaseholder[this.tabChange - 1].itemTree;
                    //     this.relationId = res.data.data.leaseholder[this.tabChange - 1].custId;
                    //     console.log(this.relationId);
                    //     let tempArr = [];
                    //     Object.keys(treeInfo).forEach((key) => {
                    //         tempArr.push(treeInfo[key]);
                    //     });
                    //     this.imgFile = tempArr;
                    // }

                }
            });
        },

        // 匹配信息按钮
        handleMatching() {

        },
        // 联系电话关联微信号
        phoneChange(val) {
            let nowIndex = this.tabChange - 1;
            if(isNaN(val) == true) {
                this.naturalData[nowIndex].mateInfo[0].custMobile = '';
            }
            if(!(/^1[3456789]\d{9}$/.test(val))){
                this.$message.error("手机号码有误，请重填");
                this.naturalData[nowIndex].mateInfo[0].custMobile = '';
            }
            setTimeout(function() {
                this.naturalData[nowIndex].mateInfo[0].custWechat = this.naturalData[nowIndex].mateInfo[0].custMobile;
            }.bind(this),100);
        },
        natural(val) {
            let nowIndex = this.tabChange - 1;
            if(isNaN(val) == true) {
                this.naturalData[nowIndex].custMobile = '';
            }
            if(!(/^1[3456789]\d{9}$/.test(val))){
                this.$message.error("手机号码有误，请重填");
                this.naturalData[nowIndex].custMobile = '';
            }
            setTimeout(function() {
                this.naturalData[nowIndex].custWechat = this.naturalData[nowIndex].custMobile;
                console.log(this.naturalData[nowIndex].custMobile);
            }.bind(this),100);
        },
        // 判断承租人申请地居住年限
        liveYears(val) {
            console.log(this.tabChange);
            if(parseInt(val) > parseInt(this.naturalData[this.tabChange - 1].custAge)) {
                this.$message.error('申请地居住年限不能大于年龄');
                this.naturalData[this.tabChange - 1].residenceYears = '';
            }
        },
        // 判断承租人配偶申请地居住年限
        spouseLiveYears(val) {
            if(parseInt(val) > parseInt(this.naturalData[this.tabChange - 1].mateInfo[0].custAge)) {
                this.$message.error('申请地居住年限不能大于年龄');
                this.naturalData[this.tabChange - 1].mateInfo[0].residenceYears = '';
            }
        },
        // 承租人判断种植年限
        plantYears(val) {
            if(parseInt(val) > parseInt(this.naturalData[this.tabChange - 1].custAge)) {
                this.$message.error('种植年限不能大于年龄');
                this.naturalData[this.tabChange - 1].cultureYears = '';
            } else {
                console.log(this.naturalData);
            }

        },
        // 承租人配偶判断种植年限
        spousePlantYears(val) {
            if(parseInt(val) > parseInt(this.naturalData[this.tabChange - 1].mateInfo[0].custAge)) {
                this.$message.error('种植年限不能大于年龄');
                this.naturalData[this.tabChange - 1].mateInfo[0].cultureYears = '';
            }
        },

        // 是否有子女
        childChange(val) {
            let childVal = null;
            let nowIndex = this.tabChange - 1;
            if(val == 'Y') {
                this.$store.state.lessinfoAddress = this.naturalData[nowIndex].custHomeplace; // 承租人户籍地址
                this.$store.state.lessinfoNowAddress = this.naturalData[nowIndex].custAddress; //承租人现住址
            }
            else {
                if(this.naturalData[nowIndex].childrenInfo.length !== 0) {
                    this.$message.error('请先依次删除子女');
                    this.naturalData[nowIndex].hasChildren = "Y";
                }
            }
            childVal = val;
        },

        // 婚姻状况切换
        custMarriageChange(val) {
            let infowifi = [{
                id: "",
                certNo: '', //身份证号码
                residenceYear: '', //申请地居住年限
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
            }];
            if(this.naturalData[this.tabChange - 1].otherwifeType == 'married') {
                this.$confirm('配偶录入的信息将被删除，是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    if(this.naturalData[this.tabChange - 1].mateInfo[0].id) {
                        let mateInfoNowId = this.naturalData[this.tabChange - 1].mateInfo[0].id;
                        this.$post('/data/del',{
                            id: mateInfoNowId,
                            type: 'custNature'
                        }).then(res => {
                            if(res.data.code == "2000000") {
                                this.naturalData[this.tabChange - 1].mateInfo = infowifi;
                                this.$message.success('配偶删除成功');
                            }
                        });
                    } else  {
                        this.$message.success('不通过后台删除配偶成功');
                        this.naturalData[this.tabChange - 1].mateInfo = infowifi;
                        this.naturalData[this.tabChange - 1].otherwifeType = val;
                    }

                }).catch(() => {
                   this.$message({
                       type: 'info',
                       message: '已取消删除',
                    });
                    this.naturalData[this.tabChange - 1].otherwifeType = 'married';
                    this.naturalData[this.tabChange - 1].custMarriage = 'married'; // 恢复成已婚
                });
            }


            if(val != 'divorced') {
                this.naturalData[this.tabChange - 1].marriageSettlement = '';
            }
            this.naturalData[this.tabChange - 1].otherwifeType = val;

        },
        // 债偿比计算
        incomeComputed() {
            let a = [];
            for(let i = 0; i < this.$refs.plant.length; i++) {
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
            let nowIndex = this.tabChange - 1;
            for (let i = a.length-1; i>=0; i--) {
                summation += a[i];
            }

            console.log(summation,a,nowIndex);
            // incomeDebtRatio

            // id: '', //主键ID
            // totalSurplus: '', //结余合计
            // annualRentalExpense: '', //年租金支出
            // otherDebtExpense: '', //其他负债支出
            // totalAnnualExpense: '', //年支出合计
            // incomeDebtRatio: '', //收入债偿比
            // status: '' //状态


            //偿债比=年支出合计/结余合计

            //年支出合计
            this.naturalData[nowIndex].incomeDebtRatios[0].totalAnnualExpense = this.naturalData[nowIndex].incomeDebtRatios[0].annualRentalExpense + this.naturalData[nowIndex].incomeDebtRatios[0].otherDebtExpense;
            // 结余合计
            this.naturalData[nowIndex].incomeDebtRatios[0].totalSurplus = summation;
            //债偿比
            this.naturalData[nowIndex].incomeDebtRatios[0].incomeDebtRatio = this.naturalData[nowIndex].incomeDebtRatios[0].totalAnnualExpense / this.naturalData[nowIndex].incomeDebtRatios[0].totalSurplus;
            console.log(this.naturalData[nowIndex].incomeDebtRatios);
        },
        // 获取录入的身份号
        idNumber(val) {
            let idcontent = this.$idCard.IDcode(val);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
                return;
            }
            let nowIndex = parseInt(this.tabChange) - 1;
            if(idcontent.Sex == "男") {
                idcontent.Sex = "M"
            } else {
                idcontent.Sex = "F";
            }

            this.naturalData[nowIndex].custSex = idcontent.Sex; // 赋值性别
            this.naturalData[nowIndex].custAge = idcontent.Age; // 赋值年龄
        },
        idNumberType(val) {
            let idcontent = this.$idCard.IDcode(val.certNo);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
            }

            if(idcontent.Sex == "男") {
                idcontent.Sex = "M"
            } else {
                idcontent.Sex = "F";
            }

            val.custSex = idcontent.Sex;
            val.custAge = idcontent.Age;
            // let nowIndex = this.tabChange - 1;
            // console.log(this.naturalData[nowIndex].mateInfo,nowIndex);
            // setTimeout(function() {
            //     this.naturalData[nowIndex].mateInfo[0].custSex = idcontent.Sex;
            //     this.naturalData[nowIndex].mateInfo[0].custAge = idcontent.Age;
            // }.bind(this),100);
        },

        save(param) { // 保存页面或者下一步
            if(param === 'save'){
                this.$emit("saveData");

            }else{
                this.$emit('update:bindText','保证人信息')
            }
        },
        // 保存
        saveData() {
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
                if(res.data.code == 2000000) {
                    this.imgData();
                    this.$message.success('承租人保存成功');
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
                    this.$emit('childVal',this.naturalData); // 子传父 承租人数据传递给父组件
                 }
            });
        },
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
            // if(this.leaseInfoData.hasChildren == "Y") {

            this.naturalData.forEach((item,index) => {
                if(item.custMarriage != 'married') {
                    item.mateInfo = null;
                }

            })

            for(let i = 0; i < this.$refs.headerChild.length; i++) {
                if(this.naturalData[i].hasChildren == 'N' || this.naturalData[i].hasChildren == "") {
                    this.naturalData[i].childrenInfo = null;
                } else {
                    this.naturalData[i].childrenInfo = this.$refs.headerChild[i].childrenInfo;
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
                this.$refs.homecar[i].assetsVehicles.forEach((item,index) => {
                    if(item.buyTime) {
                        item.buyTime = item.buyTime + '-01-01 00:00:00';
                    }
                });
                this.naturalData[i].assetsVehicles = this.$refs.homecar[i].assetsVehicles
            }
            for(let i = 0; i < this.$refs.farmtools.length; i++) {
                this.$refs.farmtools[i].assetsFarmTools.forEach((item,index) => {
                    if(item.buyTime) {
                        item.buyTime = item.buyTime + '-01-01 00:00:00';
                    }
                });
                this.naturalData[i].assetsFarmTools = this.$refs.farmtools[i].assetsFarmTools
            }
            for(let i = 0; i < this.$refs.assetsOthers.length; i++) {
                this.$refs.assetsOthers[i].assetsOthers.forEach((item,index) => {
                    if(item.buyTime) {
                        item.buyTime = item.buyTime + ' 00:00:00';
                    }
                });
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
                let len = this.$refs.plant[i].incomePlants.length;
                if(len > 0){
                    this.$refs.plant[i].incomePlants[len - 1].remark = this.$refs.plant[i].plantRemark;
                }
                this.naturalData[i].incomePlants = this.$refs.plant[i].incomePlants
            }
            for(let i = 0; i < this.$refs.agriculture.length; i++) {
                this.naturalData[i].incomeFarmMachineryWork = this.$refs.agriculture[i].incomeFarmMachineryWork
            }
            for(let i = 0; i < this.$refs.otherIncome.length; i++) {
                this.naturalData[i].incomeOthers = this.$refs.otherIncome[i].incomeOthers
            }
        },
        tabsFor(arrList) {
            arrList.forEach(function(item) {
                delete item.title;
                delete item.name;
            });
        },
        handlePictureCardPreview(file,imgUrls) { // 图片浏览功能
            this.dialogImageUrl = file.url;
            this.srcList.push(file.url);
            this.dialogVisible = true;
        },
        changeChildStatus(item){
            item.childrenInfo = [];
            item.hasChildren = 'N';
        }

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
        otherIncome,
        imgUpload
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
            position: relative;
            .inputLessinfo {
                width: 80%;
            }
        }
    }
    .bottomButtonDiv {
        width: 200px;
        margin: 20px auto;
    }
    .imgbox {
        border: 1px solid #EBEEF5;
        margin: 20px 0px;
        border-bottom: 0;
        h3 {
            font-size: 16px;
            font-weight: 700;
            background: #f5f5f5;
            height: 50px;
            line-height: 50px;
            padding-left: 15px;
            color: #585858;
        }
    }
}
</style>
