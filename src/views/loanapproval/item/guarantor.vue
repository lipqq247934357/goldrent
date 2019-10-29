<template>
    <div class="businfosss tabsinfo">
        <div class="subtabs">
            <el-tabs type="border-card">
                <el-tab-pane :label="'保证人' + parseInt(index + 1)" v-for="(item,index) in guarantordata">
                    <componentitle :message="message='保证人情况'"/>
                    <div class="assetsinfo" v-if="item.partnerType == 'LEG'">
                        <div class="div0">
                            <ul class="infolist">
                                <li>
                                    <span>商业伙伴全称</span>
                                    <span>
                                    {{item.comFullname}}
                                </span>
                                </li>
                                <li>
                                    <span>商业伙伴编码</span>
                                    <span>
                                    {{item.partnerSerial}}
                                </span>
                                </li>
                                <li>
                                    <span>社会统一信息代码</span>
                                    <span>
                                    {{item.socialSerial}}
                                </span>
                                </li>
                                <li>
                                    <span>证件生效时间</span>
                                    <span>
                                    {{item.certStartDate}}
                                </span>
                                </li>
                                <li>
                                    <span>证件失效时间</span>
                                    <span>
                                    {{item.certEndDate}}
                                </span>
                                </li>

                                <li>
                                    <span>企业性质</span>
                                    <span>
                                    {{item.comNature == 'QY01' ?'企业法人':'个体工商户'}}
                                </span>
                                </li>
                                <li>
                                    <span>所属行业</span>
                                    <span>
                                    {{item.comIndustry}}
                                </span>
                                </li>
                                <li>
                                    <span>注册资本（万元）</span>
                                    <span>
                                    {{item.comRegisteredCapital}}
                                </span>
                                </li>
                                <li>
                                    <span>成立日期</span>
                                    <span>
                                    {{item.comEstablishDate}}
                                </span>
                                </li>
                                <li>
                                    <span>营业收入（万元）</span>
                                    <span>
                                    {{item.comIncome}}
                                </span>
                                </li>
                                <li>
                                    <span>经营范围</span>
                                    <span>
                                    {{item.comScope}}
                                </span>
                                </li>
                                <li>
                                    <span>经营地址</span>
                                    <span>
                                    {{item.comAddress}}
                                </span>
                                </li>
                                <li>
                                    <span>从业人数</span>
                                    <span>
                                    {{item.comMembers}}
                                </span>
                                </li>
                                <li>
                                    <span>资产总额(万元)</span>
                                    <span>
                                    {{item.totalAssets}}
                                </span>
                                </li>
                                <li>
                                    <span>企业规模</span>
                                    <span>
                                    {{item.comScale}}
                                </span>
                                </li>
                                <li>
                                    <span>法定代表人</span>
                                    <span>
                                    {{item.legalPerson}}
                                </span>
                                </li>
                                <li>
                                    <span>法人证件类型</span>
                                    <span>
                                    {{certType[item.legalCertType]}}
                                </span>
                                </li>

                                <li>
                                    <span>法人证件号码</span>
                                    <span>
                                    {{item.legalCertNo}}
                                </span>
                                </li>
                                <li>
                                    <span>是否长期有效</span>
                                    <span>
                                    {{item.certEndDateOption === 'Y'?'是':'否'}}
                                </span>
                                </li>
                                <li>
                                    <span>法人证件失效时间</span>
                                    <span>
                                    {{item.legalCertDeadline}}
                                </span>
                                </li>
                                <li>
                                    <span>法人电话</span>
                                    <span>
                                    {{item.legalMobile}}
                                </span>
                                </li>
                                <li>
                                    <span>法人地址</span>
                                    <span>
                                    {{item.legalAddress}}
                                </span>
                                </li>
                                <li>
                                    <span>联系人</span>
                                    <span>
                                    {{item.contactAddress}}
                                </span>
                                </li>
                                <li>
                                    <span>联系地址</span>
                                    <span>
                                    {{item.contactUser}}
                                </span>
                                </li>
                                <!--                            <li>-->
                                <!--                                <span>管户人</span>-->
                                <!--                                <span>-->
                                <!--                                    {{item.accountHolder}}-->
                                <!--                                </span>-->
                                <!--                            </li>-->
                                <li>
                                    <span>贷款卡号</span>
                                    <span>
                                    {{item.bankAccount}}
                                </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="assetsinfo" v-if="item.partnerType == 'NAT'">
                        <div class="div0">
                            <ul class="infolist">
                                <li>
                                    <span>业务编号</span>
                                    <span>
                                    {{item.bussNo}}
                                </span>
                                </li>
                                <li>
                                    <span>婚姻状况</span>
                                    <span v-for="marriagestatus in statuslist.marriage"
                                          v-if="item.custMarriage ==marriagestatus.optionCode">
                                    <!-- <select class="" name="" disabled>
                                        <option value="" v-for="marriagestatus in statuslist.marriage" :selected="item.custMarriage ==marriagestatus.optionCode ? true : false">
                                            {{marriagestatus.optionName}}
                                        </option>
                                    </select> -->
                                    {{marriagestatus.optionName}}
                                </span>
                                    <span v-if="item.custMarriage == ''"></span>
                                </li>
                                <li>
                                    <span>姓名</span>
                                    <span>{{item.custName}}</span>
                                </li>
                                <li>
                                    <span>性别</span>
                                    <span v-for="sex in statuslist.custSex" v-if="item.custSex == sex.optionCode">
                                    <!-- <select class="" name="" disabled>
                                        <option value="" v-for="sex in statuslist.custSex" :selected="item.custSex == sex.optionCode ? true : false">
                                            {{sex.optionName}}
                                        </option>
                                    </select> -->
                                    {{sex.optionName}}
                                </span>
                                    <span v-if="item.custSex == ''"></span>
                                </li>
                                <li>
                                    <span>身份证号码</span>
                                    <span>{{item.certNo}}</span>
                                </li>
                                <li>
                                    <span>申请地居住年限（年）</span>
                                    <span>{{item.residenceYears}}</span>
                                </li>
                                <li>
                                    <span>户籍地址</span>
                                    <span>{{item.custHomeplace}}</span>
                                </li>
                                <li>
                                    <span>身份类型</span>
                                    <span v-for="tityType in statuslist.identityType"
                                          v-if="tityType.optionCode == item.identityType">
                                    {{tityType.optionName}}
                                </span>
                                    <span v-if="item.identityType == ''"></span>
                                </li>
                                <li>
                                    <span>年龄</span>
                                    <span>{{item.custAge}}</span>
                                </li>
                                <li>
                                    <span>现住址</span>
                                    <span>{{item.custAddress}}</span>
                                </li>

                                <li>
                                    <span>与承租人关系</span>
                                    <span v-for="custRelation in statuslist.custRelation"
                                          v-if="item.custRelation == custRelation.optionCode">
                                    <!-- <select class="" name="" disabled>
                                        <option value="" v-for="custRelation in statuslist.custRelation" :selected="item.custRelation == custRelation.optionCode ? true : false">
                                            {{item.custRelation == '' ? '本人' : custRelation.optionName}}
                                        </option>
                                    </select> -->
                                    {{custRelation.optionName}}
                                </span>
                                    <span v-if="item.custRelation == ''"></span>
                                </li>
                                <li>
                                    <span>工作单位</span>
                                    <span>{{item.company}}</span>
                                </li>
                                <li>
                                    <span>联系电话</span>
                                    <span>{{item.custMobile}}</span>
                                </li>
                                <li>
                                    <span>征信报告</span>
                                    <span>{{item.hasCreditReport == 'Y' ? '有' : item.hasCreditReport == 'N' ? '无' : '' }}</span>
                                </li>
                                <li style="border-bottom: 0">
                                    <span>微信</span>
                                    <span>{{item.custWechat}}</span>
                                </li>
                                <li>
                                    <span>教育程度</span>
                                    <span v-for="ducation in statuslist.custEducation"
                                          v-if="item.custEducation == ducation.optionCode">
                                    {{ducation.optionName}}
                                </span>
                                    <span v-if="item.custEducation == ''"></span>
                                </li>
                            </ul>
                        </div>
                        <!-- 配偶信息 -->
                        <div class="assetsinfoul" v-if="item.mateInfo.length !== 0">
                            <h3>&nbsp;&nbsp;&nbsp;配偶情况</h3>
                            <ul class="infolist" v-for="spouse in item.mateInfo">
                                <li>
                                    <span>姓名</span>
                                    <span>
                                    {{spouse.custName}}
                                </span>
                                </li>
                                <li>
                                    <span>联系电话</span>
                                    <span>
                                    {{spouse.custMobile}}
                                </span>
                                </li>
                                <li>
                                    <span>性别</span>
                                    <span v-for="sex in statuslist.custSex" v-if="spouse.custSex == sex.optionCode">
                                    <!-- <select class="" name="" disabled v-if="spouse.custSex != ''">
                                        <option value="" v-for="sex in statuslist.custSex" :selected="spouse.custSex == sex.custSex ? true : false">
                                            {{spouse.custSex == '' ? '' : sex.optionName}}
                                        </option>
                                    </select> -->
                                    {{sex.optionName}}
                                </span>
                                    <span v-if="spouse.custSex == ''"></span>
                                </li>
                                <li>
                                    <span>微信</span>
                                    <span>
                                    {{spouse.custWechat}}
                                </span>
                                </li>
                                <li>
                                    <span>身份证号码</span>
                                    <span>{{spouse.certNo}}</span>
                                </li>
                                <li>
                                    <span>教育程度</span>
                                    <span v-for="ducation in statuslist.custEducation"
                                          v-if="spouse.custEducation == ducation.optionCode">
                                    {{ducation.optionName}}
                                </span>
                                    <span v-if="spouse.custEducation ==''"></span>
                                </li>
                                <li>
                                    <span>户籍地址</span>
                                    <span>{{spouse.custHomeplace}}</span>
                                </li>
                                <li>
                                    <span>婚姻状况</span>
                                    <span v-for="marriagestatus in statuslist.marriage"
                                          v-if="spouse.custMarriage ==marriagestatus.optionCode">
                                    <!-- <select class="" name="" disabled v-if="spouse.custMarriage != ''">
                                        <option value="" v-for="marriagestatus in statuslist.marriage" :selected="spouse.custMarriage ==marriagestatus.optionCode ? true : false">
                                            {{spouse.custMarriage == '' ? '' : marriagestatus.optionName}}
                                        </option>
                                    </select> -->
                                    {{marriagestatus.optionName}}
                                </span>
                                    <span v-if="spouse.custMarriage == ''"></span>
                                </li>
                                <li>
                                    <span>年龄</span>
                                    <span>{{spouse.custAge}}</span>
                                </li>
                                <li>
                                    <span>申请地居住年限</span>
                                    <span>
                                    {{spouse.residenceYears}}
                                </span>
                                </li>
<!--                                <li>-->
<!--                                    <span>与承租人关系</span>-->
<!--                                    <span v-for="custRelation in statuslist.custRelation"-->
<!--                                          v-if="spouse.custRelation == custRelation.optionCode">-->
<!--                                    &lt;!&ndash; <select class="" name="" disabled>-->
<!--                                        <option value="" v-for="custRelation in statuslist.custRelation" :selected="spouse.custRelation == custRelation.optionCode ? true : false">-->
<!--                                            {{spouse.custRelation == '' ? '本人' : custRelation.optionName}}-->
<!--                                        </option>-->
<!--                                    </select> &ndash;&gt;-->
<!--                                    {{custRelation.optionName}}-->
<!--                                </span>-->
<!--                                    <span v-if="spouse.custRelation == ''"></span>-->
<!--                                </li>-->
                                <li>
                                    <span>工作单位</span>
                                    <span>{{item.company}}</span>
                                </li>
                                <li>
                                    <span>现住址</span>
                                    <span>{{spouse.custAddress}}</span>
                                </li>
                                <li>
                                    <span>身份类型</span>
                                    <span v-for="tityType in statuslist.identityType"
                                          v-if="tityType.optionCode == spouse.identityType">
                                    {{tityType.optionName}}
                                </span>
                                    <span v-if="spouse.identityType == ''"></span>
                                </li>
                            </ul>
                        </div>

                        <!-- <div class="assetsinfoul">
                            <h3>&nbsp;&nbsp;&nbsp;子女情况</h3>
                            <ul class="infolist" v-for="childrenInfo in item.childrenInfo">
                                <li>
                                    <span>姓名</span>
                                    <span>
                                        {{childrenInfo.custName}}
                                    </span>
                                </li>
                                <li>
                                    <span>性别</span>
                                    <span v-for="sex in statuslist.custSex" v-if="item.custSex == childrenInfo.optionCode">
                                        <select class="" name="" disabled>
                                            <option value="" v-for="sex in statuslist.custSex" :selected="item.custSex == childrenInfo.custSex ? true : false">
                                                {{sex.optionName}}
                                            </option>
                                        </select>
                                        {{sex.optionName}}
                                    </span>
                                    <span v-if="item.custSex == ''"></span>
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
                        </div> -->
                        <!-- 资产情况 -->
                        <div class="div1">
                            <componentitle :message="message='资产情况'"/>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;房产信息</h3>
                                <ul class="infolist" v-for="assetsHouses in item.assetsHouses">
                                    <li>
                                        <span>房产类别</span>
                                        <span v-for="housrType in statuslist.houseType"
                                              v-if="assetsHouses.type == housrType.optionCode">
                                        <!-- <select class="" name="" disabled>
                                            <option value="" v-for="housrType in statuslist.houseType" :selected="assetsHouses.type == housrType.optionCode ? true : false">
                                                {{housrType.optionName}}
                                            </option>
                                        </select> -->
                                        {{housrType.optionName}}
                                    </span>
                                        <span v-if="assetsHouses.type == ''"></span>
                                    </li>
                                    <li>
                                        <span>面积（㎡）</span>
                                        <span>{{assetsHouses.acreage}}</span>
                                    </li>
                                    <li class="line-height2">
                                        <span>抵押物地址/坐落</span>
                                        <span>{{assetsHouses.address}}</span>
                                    </li>
                                    <li class="line-height2-neighbour">
                                        <span>当前估价（元）</span>
                                        <span>{{assetsHouses.currEvaluation && formatNumber(assetsHouses.currEvaluation)}}</span>
                                    </li>
                                    <li style="border-bottom: 0">
                                        <span>所有权人</span>
                                        <span>{{assetsHouses.owner}}</span>

                                    </li>
                                    <li>
                                        <span>是否抵押</span>
                                        <span>{{assetsHouses.mortgage == 'Y' ? '已抵押' : assetsHouses.mortgage == 'N' ? '未抵押' : '' }}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;土地（含代收代耕）</h3>
                                <ul class="infolist" v-for="assetsLands in item.assetsLands">

                                    <li>
                                        <span>面积（亩）</span>
                                        <span>{{assetsLands.acreage}}</span>
                                    </li>
                                    <li>
                                        <span>价值（元）</span>
                                        <span>{{assetsLands.value && formatNumber(assetsLands.value)}}</span>
                                    </li>
                                    <li class="line-height2">
                                        <span>土地地址/坐落</span>
                                        <span>{{assetsLands.address}}</span>
                                    </li>
                                    <li class="line-height2-neighbour">
                                        <span>是否抵押</span>
                                        <span>{{assetsLands.mortgage == 'Y' ? '已抵押' : assetsLands.mortgage == 'N' ? '未抵押' : '' }}</span>
                                    </li>
                                    <li style="border-bottom: 0">
                                        <span>承包期限（年）</span>
                                        <span>{{assetsLands.contractLife}}</span>
                                    </li>
                                    <li>
                                        <span>核实方法</span>
                                        <span>{{assetsLands.checkMode == '01' ? '通过农补账户流水核实' : (assetsLands.checkMode == '02' ? '通过农场政研室核实' : '')}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;车产情况</h3>
                                <ul class="infolist" v-for="assetsVehicles in item.assetsVehicles">
                                    <li>
                                        <span>购买时间</span>
                                        <span>{{assetsVehicles.buyTime}}</span>
                                    </li>
                                    <li>
                                        <span>是否抵押</span>
                                        <span>{{assetsVehicles.mortgage == 'Y' ? '已抵押' : assetsVehicles.mortgage == 'N' ? '未抵押' : '' }}</span>
                                    </li>
                                    <li>
                                        <span>当前估价（元）</span>
                                        <span>{{assetsVehicles.currEvaluation && formatNumber(assetsVehicles.currEvaluation)}}</span>
                                    </li>
                                    <li>
                                        <span>车辆牌号</span>
                                        <span>{{assetsVehicles.serialNo}}</span>
                                    </li>
                                    <li>
                                        <span>所有权人</span>
                                        <span>{{assetsVehicles.owner}}</span>
                                    </li>
                                    <li>
                                        <span>发票金额(元)</span>
                                        <span>{{assetsVehicles.invoiceAmount && formatNumber(assetsVehicles.invoiceAmount)}}</span>
                                    </li>
                                    <li style="border-bottom: 0;">
                                        <span>是否获取发票</span>
                                        <span>{{assetsVehicles.invoice == '' ? '':(assetsVehicles.invoice === 'Y'?'是':'否')}}</span>
                                    </li>
                                    <li style="border-bottom: 0;">
                                        <span>品牌及型号</span>
                                        <span>{{assetsVehicles.brandModels}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;农机具</h3>
                                <ul class="infolist" v-for="assetsFarmTools in item.assetsFarmTools">
                                    <li>
                                        <span>购买时间</span>
                                        <span>{{assetsFarmTools.buyTime}}</span>
                                    </li>
                                    <li>
                                        <span>是否抵押</span>
                                        <span>{{assetsFarmTools.mortgage == 'Y' ? '已抵押' : assetsFarmTools.mortgage == 'N' ? '未抵押' : '' }}</span>
                                    </li>
                                    <li>
                                        <span>当前估价（元）</span>
                                        <span>{{assetsFarmTools.currEvaluation && formatNumber(assetsFarmTools.currEvaluation)}}</span>
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
                                        <span>发票金额(元)</span>
                                        <span>{{assetsFarmTools.invoiceAmount && formatNumber(assetsFarmTools.invoiceAmount)}}</span>
                                    </li>
                                    <li style="border-bottom: 0;">
                                        <span>是否获取发票</span>
                                        <span>{{assetsFarmTools.invoice == '' ? '':(assetsFarmTools.invoice === 'Y'?'是':'否')}}</span>
                                    </li>
                                    <li style="border-bottom: 0;">
                                        <span>品牌及型号</span>
                                        <span>{{assetsFarmTools.brandModels}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;其他资产</h3>
                                <ul class="infolist" v-for="assetsOthers in item.assetsOthers">
                                    <!-- <li>
                                        <span>其他资产</span>
                                        <span>
                                            {{assetsOthers.serialNo}}
                                        </span>
                                    </li> -->
                                    <li>
                                        <span>购买时间</span>
                                        <span>{{assetsOthers.buyTime}}</span>
                                    </li>
                                    <li>
                                        <span>是否抵押</span>
                                        <span>{{assetsOthers.mortgage == 'Y' ? '已抵押' : assetsOthers.mortgage == 'N' ? "未抵押" : '' }}</span>
                                    </li>
                                    <li>
                                        <span>价值（元）</span>
                                        <span>{{assetsOthers.value && formatNumber(assetsOthers.value)}}</span>

                                    </li>
                                    <li>
                                        <span>所有权人</span>
                                        <span>{{assetsOthers.owner}}</span>
                                    </li>
                                    <br>
                                    <li class="subliWidth">
                                        <p class="bz">备注</p>
                                        <div class="batextarrear">
                                            <el-input
                                                    :rows="2"
                                                    class="inputtext"
                                                    placeholder=""
                                                    readonly
                                                    type="textarea"
                                                    v-model="assetsOthers.remark">
                                            </el-input>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- 负债情况 -->
                        <div class="div2">
                            <componentitle :message="message='负债情况'"/>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;房产信息</h3>
                                <ul class="infolist" v-for="debtSituations in item.debtSituations">
                                    <!-- <li>
                                        <span>债务情况</span>
                                        <span>
                                            {{debtSituations.debtSituation}}
                                        </span>
                                    </li> -->
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
                                        <span>{{debtSituations.debtBalance && formatNumber(debtSituations.debtBalance)}}</span>
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
                                                    :rows="2"
                                                    class="inputtext"
                                                    placeholder=""
                                                    readonly
                                                    type="textarea"
                                                    v-model="debtSituations.remark">
                                            </el-input>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;对外担保</h3>
                                <ul class="infolist" v-for="debtGuarantees in item.debtGuarantees">
                                    <!-- <li>
                                        <span>对外担保</span>
                                        <span>
                                            {{debtGuarantees.externalGuarantee}}
                                        </span>
                                    </li> -->
                                    <li>
                                        <span>债权人</span>
                                        <span>{{debtGuarantees.creditor}}</span>
                                    </li>
                                    <li>
                                        <span>担保余额（元）</span>
                                        <span>{{debtGuarantees.guaranteeBalance && formatNumber(debtGuarantees.guaranteeBalance)}}</span>

                                    </li>
                                    <li>
                                        <span>被担保人</span>
                                        <span>{{debtGuarantees.warrantee}}</span>
                                    </li>
                                    <li>
                                        <span>与被担保人关系</span>
                                        <span>{{debtGuarantees.withWarranteeRelation}}</span>
                                    </li>
                                    <br>
                                    <li class="subliWidth">
                                        <p class="bz">备注</p>
                                        <div class="batextarrear">
                                            <el-input
                                                    :rows="2"
                                                    class="inputtext"
                                                    placeholder=""
                                                    readonly
                                                    type="textarea"
                                                    v-model="debtGuarantees.remark">
                                            </el-input>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;其他负债</h3>
                                <ul class="infolist" v-for="debtOthers in item.debtOthers">
                                    <li>
                                        <span>债权人</span>
                                        <span>{{debtOthers.creditor}}</span>
                                    </li>
                                    <li>
                                        <span>余额（元）</span>
                                        <span>{{debtOthers.debtBalance && formatNumber(debtOthers.debtBalance)}}</span>
                                    </li>
                                    <li>
                                        <span>至今账龄（月）</span>
                                        <span>{{debtOthers.debtMaturity}}</span>
                                    </li>
                                    <li>
                                        <span>有无担保</span>
                                        <span>
                                        <!-- <select class="" name="" disabled>
                                            <option value="" v-for="isGuarantee in statuslist.isGuarantee" :selected="debtOthers.isGuarantee == isGuarantee.optionCode ? true : false">
                                                {{isGuarantee.optionName}}
                                            </option>
                                        </select> -->
                                        {{debtOthers.isGuarantee == "Y" ? "有" : debtOthers.isGuarantee == "N" ? "无" : ""}}
                                    </span>
                                    </li>
                                    <br>
                                    <li class="subliWidth">
                                        <p class="bz">备注</p>
                                        <div class="batextarrear">
                                            <el-input
                                                    :rows="2"
                                                    class="inputtext"
                                                    placeholder=""
                                                    readonly
                                                    type="textarea"
                                                    v-model="debtOthers.remark">
                                            </el-input>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- 收入情况 -->
                        <div class="div3">
                            <componentitle :message="message='收入情况'"/>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;种植收入</h3>
                                <ul class="infolist" v-for="incomePlants in item.incomePlants">
                                    <!-- <li>
                                        <span>收入名称</span>
                                        <span>
                                            种植收入
                                        </span>
                                    </li> -->
                                    <li>
                                        <span>作物种类</span>
                                        <span>{{incomePlants.plantType}}</span>
                                    </li>
                                    <li>
                                        <span>种植面积/亩</span>
                                        <span>{{incomePlants.plantArea}}</span>

                                    </li>
                                    <li>
                                        <span>单亩成本（元）</span>
                                        <span>{{incomePlants.oneCost && formatNumber(incomePlants.oneCost)}}</span>
                                    </li>
                                    <li>
                                        <span>单亩收入（元）</span>
                                        <span>{{incomePlants.oneIncome && formatNumber(incomePlants.oneIncome)}}</span>
                                    </li>
                                    <li>
                                        <span>结余（元）</span>
                                        <span>{{incomePlants.surplus && formatNumber(incomePlants.surplus)}}</span>
                                    </li>

                                </ul>
                            </div>
                            <div class="describeText">
                                <h3>&nbsp;&nbsp;&nbsp;种植经验描述</h3>
                                <div class=""
                                     style="margin-top: -10px;"
                                     v-for="incomePlants in plantExpDesc">
                                    <el-input
                                            :rows="2"
                                            :value="incomePlants"
                                            class="describetext"
                                            placeholder=""
                                            readonly
                                            type="textarea">
                                    </el-input>
                                </div>

                            </div>
                            <div class="assetsinfoul">
                                <h3>&nbsp;&nbsp;&nbsp;其他收入</h3>
                                <ul class="infolist" v-for="incomeOthers in item.incomeOthers">
                                    <!-- <li>
                                        <span>收入名称</span>
                                        <span>
                                            其他收入
                                        </span>
                                    </li> -->
                                    <li>
                                        <span>近一年收入（元）</span>
                                        <span>{{incomeOthers.prevYearIncome && formatNumber(incomeOthers.prevYearIncome)}}</span>
                                    </li>
                                    <li>
                                        <span>近一年支出（元）</span>
                                        <span>{{incomeOthers.prevYearPay && formatNumber(incomeOthers.prevYearPay)}}</span>

                                    </li>
                                    <li>
                                        <span>结余（元）</span>
                                        <span>{{incomeOthers.surplus && formatNumber(incomeOthers.surplus)}}</span>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="assetsinfo">
                        <div class="div3">
                            <componentitle :message="message='保证人相关影像资料'"/>
                            <div class="imgbox-less" v-for="value in imgFile[item.id]">
                                <h3>{{value.nodeName}}</h3>
                                <ul>
                                    <imgLine :bussNo="bussNo" :index="index" :name="val"
                                             :relationId="item.id" :type="key" v-for="(val,key,index) in value.nodes"/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import componentitle from '../../../components/title/title.vue';
    import imgLine from './imgLine';
    import {urlParse} from "../../../utils/utils";
    import {formatNumber} from '../../../components/mixins/formatter/index';

    export default {
        data() {
            return {
                message: '',
                tableData: [],
                images: [],
                guarantordata: [
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
                    //                         "custRelation": "",
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
                    //                 ]
                    //             }
                    //         ],
                    //         "bussNo": "test_data_for_app_0411_02"
                    //     }
                    // }
                ], // 保证人的list主数组用于循环
                partner: {}, // 储存法人还是自然人NAT自然人	 LEG法人
                id: '', // 当前ID
                bussNo: '', // 订单号
                certType: {
                    'PASSPORT': '护照',
                    'MILITARY_ID': '军官证',
                    'ID_CARD': '身份证'
                },
                imgFile: {}, //预览图片文件
                legImgfile: [], // 法人图片
                statuslist: { // 字典编码
                    marriage: [],
                    custSex: [],
                    custRelation: [],
                    custType: [],
                    houseType: [],
                    isGuarantee: [],
                    custEducation: [],
                    identityType: []
                },
                PlantExpDesc: []
            }
        },
        created() {
            let data = urlParse();

            this.bussNo = data.bussNo;
            this.getStockPriceByNames();

            //  字段编码
            this.$post('/getConstantConfig', {
                dictionaryCode: ['custMarriage', 'custType', 'custSex', 'custRelation', 'houseType', 'isGuarantee', 'custEducation', 'identityType']
            }).then(res => {
                var resData = res.data.data;
                this.statuslist.marriage = resData.custMarriage;
                this.statuslist.custSex = resData.custSex;
                this.statuslist.custRelation = resData.custRelation;
                this.statuslist.custType = resData.custType;
                this.statuslist.houseType = resData.houseType;
                this.statuslist.isGuarantee = resData.isGuarantee;
                this.statuslist.custEducation = resData.custEducation;
                this.statuslist.identityType = resData.identityType;
            })
        },
        methods: {
            getStockPriceByNames(res) {
                this.$post('/warrantor/info', {
                    bussNo: this.$route.query.bussNo
                }).then(res => {
                    if (res.data.code == '2000000') {
                        const matType = {
                            "NAT": "NATURE_MATERIAL",
                            "LEG": "LEGAL_MATERIAL"
                        };
                        var infoData = res.data.data;
                        var warrantorData = infoData.warrantorData;
                        this.setPlantExpDesc(warrantorData);
                        this.guarantordata = warrantorData;
                        for (let i = 0; i < warrantorData.length; i++) {
                            // 储存 partnerType 用于匹配不同影像信息
                            let typeLong = matType[warrantorData[i].partnerType];
                            let partnerId = warrantorData[i].id;
                            // if (!typeLong) {
                            //     this.$message.error('无保证人图片信息');
                            //     return;
                            // }
                            this.$post('/materialTree', {
                                materialType: typeLong
                            }).then(res => {
                                if (res.data.code == '2000000') {
                                    this.$set(this.imgFile, partnerId, res.data.data[typeLong]);
                                }
                            });
                        }
                    }
                });
            },
            setPlantExpDesc(data) {
                if (!(data && data[0] && data[0].incomePlants)) {
                    return;
                }
                let platExpDesc = data[0].incomePlants;
                let set = new Set();
                for (let item of platExpDesc) {
                    if (item.remark) {
                        set.add(item.remark);
                    }
                }
                if (set.size === 0) {
                    set.add('');
                }
                this.plantExpDesc = Array.from(set);
                console.log(this.plantExpDesc);
            },
            formatNumber

        },
        components: {
            componentitle,
            imgLine
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

            .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
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
            .assetsinfoul {
                ul {
                    margin-top: -1px;
                }
            }

            .div3 {

            }
        }

        .line-height2 {
            height: 200px;

            > span:nth-child(1) {
                line-height: 200px;
                height: 200px;
            }

            > span:nth-child(2) {
                height: 200px;
                text-overflow: inherit;
                white-space: inherit;
            }

        }

        .line-height2-neighbour {
            height: 200px;

            > span:nth-child(1) {
                line-height: 200px;
                height: 200px;
            }

            > span:nth-child(2) {
                height: 200px;
            }
        }
    }
</style>
