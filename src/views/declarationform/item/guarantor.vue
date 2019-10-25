<template>
<div class="businfosss tabsinfo">
    <div class="subtabs newfrom">
        <div class="addbutton">
            <el-button size="small" @click="addTab(editableTabsValue)" class="el-icon-plus">
                增加保证人
            </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTables">
            <el-tab-pane v-for="(item, index) of warrantorDatas" :key="item.name" :label="item.title" :name="item.name">
                <div class="matchingDiv">
                    <div class="matchingText">
                        商业伙伴类型
                    </div>
                    <div class="matchingText" style="border-right: 1px solid #e5e5e5;">
                        <el-select
                            style="width: 90%;"
                            v-model="item.partnerType"
                            class="inputLessinfo"
                            @change="friendType"
                            placeholder="请选择">
                            <el-option
                                v-for="items in rulesField.partnerType"
                                :key="items.optionCode"
                                :label="items.optionName"
                                :value="items.optionCode">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- <div class="matchingText">
                        身份证号码
                    </div>
                    <div class="matchingText matchId">
                        <el-input v-model="item.matchingId" maxlength="18" class="matchingId" placeholder="请输入身份证号">
                        </el-input>
                    </div> -->
                    <!-- <el-button type="primary" size="medium" @click="handleMatching" class="matchingButton">
                        匹配信息
                    </el-button> -->
                </div>
                <!-- 基本信息 -->

                <componentitle :message="message='基本信息'" class="componentitle" />
                <div class="tableTitle">
                    保证人信息
                </div>
                <!-- 保证人人信息表格 自然人 -->
                <table class="lessinfoTbale" v-if="item.partnerType == 'NAT'">
                    <tr>
                        <td>姓名</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.custName"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>联系电话</td>
                        <td>
                            <el-input type="text"
                                v-model="item.custMobile"
                                class="inputLessinfo"
                                @change="natural">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumber" type="text" maxlength="18" class="inputLessinfo" v-model="item.certNo">
                            </el-input>
                        </td>
                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="item.custWechat" class="inputLessinfo"></el-input>
                        </td>

                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            {{item.custSex == "M" ? "男" : item.custSex == "F" ? "女" : ""}}
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
                        <td>户籍所在地</td>
                        <td>
                            <el-input type="text" v-model="item.custHomeplace" class="inputLessinfo"></el-input>
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
                        <td>年龄</td>
                        <td>
                            {{item.custAge}}
                        </td>
                        <td>工作单位</td>
                        <td>
                            <el-input type="text" v-model="item.company" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>与承租人关系</td>
                        <td>
                            <el-select v-model="item.custRelation" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.custRelation"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" v-model="item.custAddress" class="inputLessinfo"></el-input>
                        </td>

                    </tr>
                    <tr>
                        <td>身份类型</td>
                        <td>
                            <el-select v-model="item.identityType" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.identityType"
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

                <!-- 保证人信息法人 -->
                <table class="lessinfoTbale"  v-if="item.partnerType == 'LEG'">
                    <tr>
                        <td>商业伙伴全称</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comFullname"
                                class="inputLessinfo">
                            </el-input>
                        </td>

                        <td>统一社会信用代码</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.socialSerial"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>商业伙伴编码</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.partnerSerial"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>证件生效时间</td>
                        <td>
                            <el-date-picker
                                    class="input-width inputLessinfo"
                                    placeholder="选择日期"
                                    type="date"
                                    v-model="item.certStartDate"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </td>
                    </tr>
                    <tr>

                        <td>证件长期有效</td>
                        <td>
                            <el-select v-model="item.certEndDateOption" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.certEndDateOption"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>

                        <td>证件失效时间</td>
                        <td>
                            <el-date-picker
                                    class="input-width inputLessinfo"
                                    placeholder="选择日期"
                                    type="date"
                                    v-model="item.legalCertDeadline"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>企业性质</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comNature"
                                class="inputLessinfo">
                            </el-input>
                        </td>

                        <td>所属行业</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comIndustry"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>

                        <td>注册资本</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comRegisteredCapital"
                                class="inputLessinfo">
                            </el-input>
                            <span style="position:absolute;right: 10px;">
                                万元
                            </span>
                        </td>
                        <td>成立时间</td>
                        <td>
                            <el-date-picker
                                    class="input-width inputLessinfo"
                                    placeholder="选择日期"
                                    type="date"
                                    v-model="item.comEstablishDate"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </td>
                    </tr>
                    <tr>

                        <td>营业收入</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comIncome"
                                class="inputLessinfo">
                            </el-input>
                            <span style="position:absolute;right: 10px;">
                                万元
                            </span>
                        </td>

                        <td>经营范围</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comScope"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>营业地址</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comAddress"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>从业人数</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comMembers"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>

                        <td>资产总额</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.totalAssets"
                                class="inputLessinfo">
                            </el-input>
                            <span style="position:absolute;right: 10px;">
                                万元
                            </span>
                        </td>
                        <td>企业规模</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.comScale"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>

                        <td>法定代表人</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.legalPerson"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>法人证件类型</td>
                        <td>
                            <el-select v-model="item.legalCertType" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.certType"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>

                        <td>法人证件号码</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.legalCertNo"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>法人证件失效时间</td>
                        <td>
                            <el-date-picker
                                    class="input-width inputLessinfo"
                                    placeholder="选择日期"
                                    type="date"
                                    v-model="item.legalCertDeadline"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>法人电话</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.legalMobile"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>法人地址</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.legalAddress"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>联系人</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.contactUser"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>联系地址</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.contactAddress"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>贷款卡号</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.bankAccount"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                </table>

                <div class="tableTitle" v-show="item.custMarriage == 'married'">
                    保证人配偶
                </div>
                <!-- 保证人人配偶信息表格 -->

                <table class="lessinfoTbale" v-show="item.custMarriage == 'married'" v-for="(mateinfoTbale,mateinfoIndex) in item.mateInfo">
                    <tr>
                        <td>姓名</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custName" class="inputLessinfo">
                            </el-input>
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

                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumberType" type="text" maxlength="18" class="inputLessinfo" v-model="mateinfoTbale.certNo">
                            </el-input>
                        </td>
                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custWechat" class="inputLessinfo"></el-input>
                        </td>

                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            {{mateinfoTbale.custSex == "M" ? "男" :mateinfoTbale.custSex == "F" ? "女" : ""}}
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
                        <td>户籍地址</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custHomeplace" class="inputLessinfo"></el-input>
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
                        <td>年龄</td>
                        <td>
                            {{mateinfoTbale.custAge}}
                        </td>
                        <td>工作单位</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.company" class="inputLessinfo"></el-input>
                        </td>

                    </tr>
                    <tr>
                        <td>身份类型</td>
                        <td>
                            <el-select v-model="mateinfoTbale.identityType" class="inputLessinfo" placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.identityType"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" v-model="mateinfoTbale.custAddress" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>婚姻状况</td>
                        <td>
                            <el-select v-model="mateinfoTbale.custMarriage" class="inputLessinfo" @change="custMarriageChange" placeholder="请选择">
                                <el-option v-for="items in rulesField.custMarriage" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>

                    </tr>

                </table>

                <!-- 资产情况 -->
                <componentitle :message="message='资产情况'" class="componentitle"  v-if="item.partnerType == 'NAT'" />
                <div class="assetsAll" v-if="item.partnerType == 'NAT'">
                    <!-- 房产 -->
                    <p class="tableTitle">房产（如有）</p>
                    <assets ref="house" :fc="warrantorDatas[index].assetsHouses" :rulesField="rulesField" />

                    <!-- 土地（含代收代耕）（如有） -->
                    <p class="tableTitle">土地（含代收代耕）（如有）</p>
                    <lands ref="lands" :tds="warrantorDatas[index].assetsLands" :rulesField="rulesField"/>


                    <!-- 自用车 -->
                    <p class="tableTitle">自用车（如有）</p>
                    <homecar ref="homecar" :zyc="warrantorDatas[index].assetsVehicles" :rulesField="rulesField"/>

                    <!-- 农机具 -->
                    <p class="tableTitle">农机具（如有）</p>
                    <farmtools ref="farmtools" :njj="warrantorDatas[index].assetsFarmTools" :rulesField="rulesField"/>

                    <!-- 其他资产 -->
                    <p class="tableTitle">其他资产（如有）</p>
                    <assetsOthers :qtzc="warrantorDatas[index].assetsOthers" ref="assetsOthers" :rulesField="rulesField"/>
                </div>
                <!-- 负债情况 -->
                <componentitle :message="message='负债情况'" class="componentitle"  v-if="item.partnerType == 'NAT'" />
                <div class="liabilitiesDiv"  v-if="item.partnerType == 'NAT'">
                    <!-- 债务情况 -->
                    <p class="tableTitle">债务情况（如有）</p>
                    <debt ref="debt" :zwqk="warrantorDatas[index].debtSituations" :rulesField="rulesField" />

                    <!-- 对外担保 -->
                    <p class="tableTitle">对外担保</p>
                    <guarantee ref="guarantee" :dwdb="warrantorDatas[index].debtGuarantees" :rulesField="rulesField" />

                    <!-- 其他负债 -->
                    <p class="tableTitle">其他负债</p>
                    <otherLiabilities ref="otherLiabilities" :qtfz="warrantorDatas[index].debtOthers" :rulesField="rulesField" />

                </div>

                <!-- 收入情况 -->
                <componentitle :message="message='收入情况'" class="componentitle"  v-if="item.partnerType == 'NAT'" />
                <div class="IncomeDiv"  v-if="item.partnerType == 'NAT'">
                    <!-- 种植收入 -->
                    <p class="tableTitle">种植收入</p>
                    <plant ref="plant" :zzsr="warrantorDatas[index].incomePlants" :rulesField="rulesField" />



                    <!-- 其他收入 -->
                    <p class="tableTitle">其他收入（如有）</p>
                    <guaranteeIncome ref="otherIncome" :qtsr="warrantorDatas[index].incomeOthers" :rulesField="rulesField" />
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
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import assets from '../components/assets.vue'; // 资产情况
import lands from '../components/lands.vue'; // 土地（含代收代耕）（如有）
import homecar from '../components/homeCar.vue'; // 自用车
import farmtools from '../components/farmTools.vue'; // 农机具
import assetsOthers from '../components/assetsOthers.vue'; // 其他资产
import debt from '../components/debt.vue'; // 债务情况
import guarantee from '../components/guarantee.vue'; // 对外担保
import otherLiabilities from '../components/otherLiabilities.vue'; // 其他负债
import plant from '../components/plant.vue'; // 种植收入
import guaranteeIncome from '../components/guaranteeIncome.vue'; // 其他收入
export default {
    data() {
        return {
            tabChange: 1, //存储切换的tab name
            message: '', //title
            maritalStatus: '',
            editableTabsValue: '1',
            matchingId: '', // 匹配按钮的身份证号
            otherData: [],//用来储存warrantorDatas 承租人数组数据，因为删除页签之后会出现问题
            warrantorDatass:[{ // 保证人为法人时
                id: '',
                partnerType: '', //商业伙伴类型
                title: '保证人1',
                name: '1',
                comFullname: '', //商业伙伴全称
                socialSerial: '', //统一社会信用代码
                partnerSerial: '', //商业伙伴编码
                certStartDate: '', //证件生效时间
                certEndDateOption: '', //证件长期有效
                legalCertDeadline: '', //证件失效时间
                comNature: '', //企业性质
                comIndustry: '', //所属行业
                comRegisteredCapital: '', //注册资本
                comEstablishDate: '', //成立时间
                comIncome: '', //营业收入
                comScope: '', //经营范围
                comAddress: '', //营业地址
                comMembers: '', //从业人数
                totalAssets: '',//资产总额
                comScale: '', //企业规模
                legalPerson: '',//法定代表人
                legalCertType: '', //法人证件类型
                legalCertNo: '', //法人证件号码
                legalCertDeadline: '',//法人证件失效时间
                legalMobile: '',//法人电话,
                legalAddress: '',//法人地址
                contactUser: '',//联系人
                contactAddress: '',//联系地址
                bankAccount: '',//贷款卡号
            }],
            warrantorDatas: [{
                id: '',
                partnerType: 'NAT', //商业伙伴类型
                title: '保证人1',
                name: '1',
                certNo: '', //身份证号码
                residenceYears: '', //申请地居住年限
                custSex: '', // 性别
                cultureYears: '', //种植年限
                custName: '', //承租人信息姓名
                custEducation: '', //存储选中的教育程度
                custType: '', //存储选中的客户类别
                hasCreditReport: '', //存储选中的征信报告
                custMarriage: '', //存储选中的婚姻状况
                marriageSettlement: '', //存储选中的离婚协议
                custRelation: '', //与承租人关系
                custHomeplace: '', // 户籍地址
                custAddress: '', //现住址
                custAge: '', //年龄
                custWechat: '', // 微信
                custMobile: '', // 电话
                company: '',//工作单位
                identityType: '',// 身份类型
                mateInfo: [{
                    certNo: '', //身份证号码
                    residenceYears: '', //申请地居住年限
                    custSex: '', // 性别
                    cultureYears: '', //种植年限
                    custName: '', //保证人信息姓名
                    custEducation: '', //存储选中的教育程度
                    custType: '', //存储选中的客户类别
                    custMarriage: '', //存储选中的婚姻状况
                    custHomeplace: '', // 户籍地址
                    custAddress: '', //现住址
                    custAge: '', //年龄
                    custWechat: '', // 微信
                    custMobile: '', // 电话
                    company: '',//工作单位
                    identityType: ''// 身份类型
                }],
                childrenInfo: [],
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
                incomeOthers: [], //其他收入
            }],
            tabIndex: 1,

        }
    },
    created() {
    },
    props: ['rulesField','bussNo'],
    mounted() {
    },
    methods: {
        getData() {
            this.$post('/warrantor/info',{
                bussNo: this.bussNo,
                taskType:"10"
            }).then(res => {
                if(res.data.code == '2000000') {
                    if(res.data.data.warrantorData.length != '0') {
                        this.warrantorDatas = res.data.data.warrantorData;
                        this.warrantorDatas.forEach(function(item,index) {
                            item['name'] = index + 1 + '';
                            item['title'] = "保证人" + parseInt(index + 1);
                        });
                    }
                }
            });
        },
        friendType(val) {
            this.warrantorDatas[this.tabChange -1] = [];
            // 商业伙伴类型切换
            let a = {
                id: '',
                partnerType: 'NAT', //商业伙伴类型
                title: '保证人' + this.tabChange,
                name: this.tabChange + '',
                certNo: '', //身份证号码
                residenceYears: '', //申请地居住年限
                custSex: '', // 性别
                cultureYears: '', //种植年限
                custName: '', //承租人信息姓名
                custEducation: '', //存储选中的教育程度
                custType: '', //存储选中的客户类别
                hasCreditReport: '', //存储选中的征信报告
                custMarriage: '', //存储选中的婚姻状况
                marriageSettlement: '', //存储选中的离婚协议
                custRelation: '', //与承租人关系
                custHomeplace: '', // 户籍地址
                custAddress: '', //现住址
                custAge: '', //年龄
                custWechat: '', // 微信
                custMobile: '', // 电话
                company: '',//工作单位
                identityType: '',// 身份类型
                mateInfo: [{
                    certNo: '', //身份证号码
                    residenceYears: '', //申请地居住年限
                    custSex: '', // 性别
                    cultureYears: '', //种植年限
                    custName: '', //保证人信息姓名
                    custEducation: '', //存储选中的教育程度
                    custType: '', //存储选中的客户类别
                    custMarriage: '', //存储选中的婚姻状况
                    custHomeplace: '', // 户籍地址
                    custAddress: '', //现住址
                    custAge: '', //年龄
                    custWechat: '', // 微信
                    custMobile: '', // 电话
                    company: '',//工作单位
                    identityType: ''// 身份类型
                }],
                childrenInfo: [],
                assetsHouses: [], //房产
                assetsLands: [],//土地
                assetsVehicles: [], //自用车
                assetsFarmTools: [],//农机具
                assetsOthers: [], //其他资产
                debtSituations: [], //债务情况
                debtGuarantees: [], //对外担保
                debtOthers: [], //其他负债
                incomePlants: [], //种植收入
                incomeOthers: [], //其他收入
            }
            let b = {
                id: '',
                partnerType: 'LEG', //商业伙伴类型
                title: '保证人' + this.tabChange,
                name: this.tabChange + '',
                comFullname: '', //商业伙伴全称
                socialSerial: '', //统一社会信用代码
                partnerSerial: '', //商业伙伴编码
                certStartDate: '', //证件生效时间
                certEndDateOption: '', //证件长期有效
                legalCertDeadline: '', //证件失效时间
                comNature: '', //企业性质
                comIndustry: '', //所属行业
                comRegisteredCapital: '', //注册资本
                comEstablishDate: '', //成立时间
                comIncome: '', //营业收入
                comScope: '', //经营范围
                comAddress: '', //营业地址
                comMembers: '', //从业人数
                totalAssets: '',//资产总额
                comScale: '', //企业规模
                legalPerson: '',//法定代表人
                legalCertType: '', //法人证件类型
                legalCertNo: '', //法人证件号码
                legalCertDeadline: '',//法人证件失效时间
                legalMobile: '',//法人电话,
                legalAddress: '',//法人地址
                contactUser: '',//联系人
                contactAddress: '',//联系地址
                bankAccount: '',//贷款卡号
            };
            if(val == 'LEG') {
                this.$set(this.warrantorDatas,this.tabChange - 1,b);

            } else {
                this.$set(this.warrantorDatas,this.tabChange - 1,a)
            }

        },
        // 页签切换
        changeTables(val) {
            this.tabChange = val.name;
            console.log(this.tabChange);
        },

        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.tabChange++;
            this.otherData = this.warrantorDatas;
            this.warrantorDatas.push({
                id: '',
                partnerType: 'NAT', //商业伙伴类型
                title: '保证人' + newTabName,
                name: newTabName,
                certNo: '', //身份证号码
                residenceYears: '', //申请地居住年限
                custSex: '', // 性别
                cultureYears: '', //种植年限
                custName: '', //承租人信息姓名
                custEducation: '', //存储选中的教育程度
                custType: '', //存储选中的客户类别
                hasCreditReport: '', //存储选中的征信报告
                custMarriage: '', //存储选中的婚姻状况
                marriageSettlement: '', //存储选中的离婚协议
                custRelation: '', //与承租人关系
                custHomeplace: '', // 户籍地址
                custAddress: '', //现住址
                custAge: '', //年龄
                custWechat: '', // 微信
                custMobile: '', // 电话
                company: '',//工作单位
                identityType: '',// 身份类型
                mateInfo: [{
                    certNo: '', //身份证号码
                    residenceYears: '', //申请地居住年限
                    custSex: '', // 性别
                    cultureYears: '', //种植年限
                    custName: '', //保证人信息姓名
                    custEducation: '', //存储选中的教育程度
                    custType: '', //存储选中的客户类别
                    custMarriage: '', //存储选中的婚姻状况
                    custHomeplace: '', // 户籍地址
                    custAddress: '', //现住址
                    custAge: '', //年龄
                    custWechat: '', // 微信
                    custMobile: '', // 电话
                    company: '',//工作单位
                    identityType: ''// 身份类型
                }],
                assetsHouses: [], //房产
                assetsLands: [],//土地
                assetsVehicles: [], //自用车
                assetsFarmTools: [],//农机具
                assetsOthers: [], //其他资产
                debtSituations: [], //债务情况
                debtGuarantees: [], //对外担保
                debtOthers: [], //其他负债
                incomePlants: [], //种植收入
                incomeOthers: [], //其他收入

            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.warrantorDatas;
            let activeName = this.editableTabsValue;

            // 至少要保留一个
            if (this.warrantorDatas.length == 1) {
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
            this.warrantorDatas = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项保证人人index
            this.warrantorDatas.forEach(function(item, index, arr) {
                item.title = '保证人' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '保证人' + parseInt(index + 1);
            })
            this.editableTabsValue = this.warrantorDatas.length + '';
            //主要防止于添加的时候错误
            this.tabIndex = this.warrantorDatas.length;
        },
        // 匹配信息按钮
        handleMatching() {

        },
        // 联系电话关联微信号
        phoneChange(val) {

            let nowIndex = this.tabChange - 1;
            if(isNaN(val) == true) {
                this.warrantorDatas[nowIndex].mateInfo.custMobile = '';
            }
            if(!(/^1[3456789]\d{9}$/.test(val))){
                this.$message.error("手机号码有误，请重填");
                this.warrantorDatas[nowIndex].mateInfo.custMobile = '';
            }
            setTimeout(function() {
                this.warrantorDatas[nowIndex].mateInfo.custWechat = this.warrantorDatas[nowIndex].mateInfo.custMobile;
            }.bind(this),100);
        },
        // 联系电话关联微信号
        natural(val) {
            let nowIndex = this.tabChange - 1;
            if(isNaN(val) == true) {
                this.warrantorDatas[nowIndex].custMobile = '';
            }
            if(!(/^1[3456789]\d{9}$/.test(val))){
                this.$message.error("手机号码有误，请重填");
                this.warrantorDatas[nowIndex].custMobile = '';
            }
            setTimeout(function() {
                this.warrantorDatas[nowIndex].custWechat = this.warrantorDatas[nowIndex].custMobile;
                console.log(this.warrantorDatas[nowIndex].custMobile);
            }.bind(this),100);
        },
        // 判断保证人人申请地居住年限
        liveYears(val) {
            if(parseInt(val) > parseInt(this.warrantorDatas[this.tabChange - 1].custAge)) {
                this.$message.error('申请地居住年限不能大于年龄');
                this.warrantorDatas[this.tabChange - 1].residenceYears = '';
            }
        },
        // 判断保证人配偶申请地居住年限
        spouseLiveYears(val) {
            if(parseInt(val) > parseInt(this.warrantorDatas[this.tabChange - 1].custAge)) {
                this.$message.error('申请地居住年限不能大于年龄');
                this.warrantorDatas[this.tabChange - 1].residenceYears = '';
            }
        },
        // 承租人判断种植年限
        plantYears(val) {
            if(parseInt(val) > parseInt(this.warrantorDatas[this.tabChange - 1].custAge)) {
                this.$message.error('种植年限不能大于年龄');
                this.warrantorDatas[this.tabChange - 1].cultureYears = '';
            }
        },
        // 承租人配偶判断种植年限
        spousePlantYears(val) {
            if(parseInt(val) > parseInt(this.warrantorDatas[this.tabChange - 1].mateInfo[this.tabChange - 1].custAge)) {
                this.$message.error('种植年限不能大于年龄');
                this.warrantorDatas[this.tabChange - 1].mateInfo[this.tabChange - 1].cultureYears = '';
            }
        },
        // 婚姻状况切换
        custMarriageChange(val) {
            let infowifi = [{
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
            }];
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

                  this.warrantorDatas[this.tabChange - 1].mateInfo = infowifi;


                }).catch(() => {
                   this.$message({
                       type: 'info',
                       message: '已取消删除',

                    });
                    this.maritalStatus = 'married';
                    this.warrantorDatas[this.tabChange - 1].custMarriage = 'married'; // 恢复成已婚
                });
            }
            this.maritalStatus = val;

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
            // incomeDebtRatios
            this.warrantorDatas[nowIndex].incomeDebtRatios[nowIndex].totalSurplus = summation;
        },
        // 获取录入的身份号
        idNumber(val) {
            let idcontent = this.$idCard.IDcode(val);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
                return;
            }
            let nowIndex = this.tabChange - 1;
            if(idcontent.Sex == "男") {
                idcontent.Sex = "M"
            } else {
                idcontent.Sex = "F";
            }
            this.warrantorDatas[nowIndex].custSex = idcontent.Sex;
            this.warrantorDatas[nowIndex].custAge = idcontent.Age;
        },
        idNumberType(val) {
            let idcontent = this.$idCard.IDcode(val);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
            }

            if(idcontent.Sex == "男") {
                idcontent.Sex = "M"
            } else {
                idcontent.Sex = "F";
            }
            let nowIndex = this.tabChange - 1;

            this.warrantorDatas[nowIndex].mateInfo[nowIndex].custSex = idcontent.Sex;
            this.warrantorDatas[nowIndex].mateInfo[nowIndex].custAge = idcontent.Age;
        },
        // 是否有子女
        childChange(val) {
            let nowIndex = this.tabChange - 1;
            if(val == 'Y') {
                this.$store.state.lessinfoAddress = this.warrantorDatas[nowIndex].custHomeplace; // 承租人户籍地址
                this.$store.state.lessinfoNowAddress = this.warrantorDatas[nowIndex].custAddress; //承租人现住址
                console.log(this.$store.state.lessinfoAddress,this.$store.state.lessinfoNowAddress)
            }
        },
        save(param) { // 保存页面或者下一步
            // console.log(this.warrantorDatas,'11111');
            if(param === 'save'){
                this.$emit("saveData",this.warrantorDatas);
            }else{
                this.$emit('update:bindText','回购人信息')
            }
        },
        // 保存
        saveData() {
            this.allTabData(this.warrantorDatas);
            console.log(this.warrantorDatas);

            this.$post('/warrantor/add',{
                bussNo: this.bussNo,
                data: this.warrantorDatas
            }).then(res => {
                if(res.data.code == 2000000) {
                    this.$message.success('保证人保存成功');

                 }
            });
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
            // console.log(this.$refs.headerChild);
            this.warrantorDatas.forEach((item,index) => {
                if(item.partnerType == "NAT") {
                    for(let i = 0; i < this.$refs.house.length; i++) {
                        item.assetsHouses = this.$refs.house[i].assetsHouses;
                    }
                    for(let i = 0; i < this.$refs.lands.length; i++) {
                        item.assetsLands = this.$refs.lands[i].assetsLands
                    }

                    for(let i = 0; i < this.$refs.homecar.length; i++) {
                        item.assetsVehicles = this.$refs.homecar[i].assetsVehicles
                    }
                    for(let i = 0; i < this.$refs.farmtools.length; i++) {
                        item.assetsFarmTools = this.$refs.farmtools[i].assetsFarmTools
                    }
                    for(let i = 0; i < this.$refs.assetsOthers.length; i++) {
                        item.assetsOthers = this.$refs.assetsOthers[i].assetsOthers
                    }
                    for(let i = 0; i < this.$refs.debt.length; i++) {
                        item.debtSituations = this.$refs.debt[i].debtSituations
                    }
                    for(let i = 0; i < this.$refs.guarantee.length; i++) {
                        item.debtGuarantees = this.$refs.guarantee[i].debtGuarantees
                    }
                    for(let i = 0; i < this.$refs.otherLiabilities.length; i++) {
                        item.debtOthers = this.$refs.otherLiabilities[i].debtOthers
                    }
                    for(let i = 0; i < this.$refs.plant.length; i++) {
                        item.incomePlants = this.$refs.plant[i].incomePlants
                    }

                    for(let i = 0; i < this.$refs.otherIncome.length; i++) {
                        item.incomeOthers = this.$refs.otherIncome[i].incomeOthers
                    }
                }
            });

        },
},
    components: {
        componentitle,
        assets,
        lands,
        homecar,
        farmtools,
        assetsOthers,
        debt,
        guarantee,
        otherLiabilities,
        plant,
        guaranteeIncome
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
            // border-right: 0;
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
