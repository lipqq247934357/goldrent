<template>
<div class="businfosss tabsinfo">
    <div class="subtabs newfrom">
        <div class="addbutton">
            <el-button size="small" @click="addTab(editableTabsValue)" class="el-icon-plus">
                增加回购人
            </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTables">
            <el-tab-pane v-for="(item, index) of legalMan" :key="item.name" :label="item.title" :name="item.name">
                <div class="matchingDiv">
                    <div class="matchingText">
                        商业伙伴类型
                    </div>
                    <div class="matchingText">
                        法人机构
                    </div>
                    <div class="matchingText" style="width: 20%;">
                        统一社会信用代码或回购人名称
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
                <!-- 回购人信息表格 -->
                <table class="lessinfoTbale">
                    <tr>
                        <td>回购人名称</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comFullname" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>统一社会信用代码</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.socialSerial" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>企业性质</td>
                        <td>
                            <el-select
                                v-model="item.basicInfo.comNature"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.comNature"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>注册资本金</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comRegisteredCapital" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年营业额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.basicInfo.comIncome"
                                :precision="2"
                                :step="0.1"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                万元
                            </span>
                        </td>
                        <td>经销商层级</td>
                        <td>
                            <el-select
                                v-model="item.basicInfo.agencyLevel"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.agencyLevel"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>回购放负责人姓名</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comManager" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>回购放负责人电话</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comMobile" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>回购条件</td>
                        <td>
                            <el-select
                                v-model="item.basicInfo.overdueDays"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.overdueDays"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>

                <componentitle :message="message='负债及对外担保情况'" class="componentitle" />
                <p class="tableTitle">回购人</p>

                <table class="lessinfoTbale">
                    <tr>
                        <td>债务种类</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[0].debtType" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>债务余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[0].debtBalance"
                                :precision="2"
                                :step="0.1"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                元
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>担保余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[0].guaranteeBalance"
                                :precision="2"
                                :step="0.1"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                元
                            </span>
                        </td>
                        <td>被担保人</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[0].warrantee" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colspan="4" style="padding: 5px 0;">
                            <el-input
                                type="textarea"
                                style="width: 98%;height40px;"
                                :rows="3"
                                placeholder="请输入内容"
                                maxlength="500"
                                show-word-limit
                                v-model="item.debtInfo[0].remark">
                            </el-input>
                        </td>
                    </tr>
                </table>
                <p class="tableTitle">回购方实际控制人</p>
                <table class="lessinfoTbale">
                    <tr>
                        <td>回购方实际控制人</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[1].personName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>债务种类</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[1].debtType" class="inputLessinfo">
                            </el-input>

                        </td>
                    </tr>
                    <tr>
                        <td>债务余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[1].debtBalance"
                                :precision="2"
                                :step="0.1"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                元
                            </span>
                        </td>
                        <td>担保余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[1].guaranteeBalance"
                                :precision="2"
                                :step="0.1"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                元
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>被担保人</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[1].warrantee" class="inputLessinfo">
                            </el-input>

                        </td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colspan="4" style="padding: 5px 0;">
                            <el-input
                                type="textarea"
                                style="width: 98%;height40px;"
                                :rows="3"
                                placeholder="请输入内容"
                                maxlength="500"
                                show-word-limit
                                v-model="item.debtInfo[1].remark">
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

    <el-dialog
        width="90%"
        :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        <!-- <div class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="dialogImageUrl"
                :preview-src-list="srcList">
            </el-image>
        </div> -->
    </el-dialog>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import imgUpload from '../imgUpload.vue'; //图片组件
export default {
    data() {
        return {
            srcList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            tabChange: 1, //存储切换的tab name
            imgFile: [],
            relationId: '', //图片影像资料需要用到的
            type: '', // 图片影像资料需要用到的
            message: '', //title
            maritalStatus: '',
            editableTabsValue: '1',
            matchingId: '', // 匹配按钮的身份证号
            otherData: [],//legalMan 承租人数组数据，因为删除页签之后会出现问题
            legalMan: [{
                title: '回购人1',
                name: '1',
                basicInfo: {
                    // 基本信息
                    id: '', //	数据ID(修改时不为空)	String
                    comFullname: '',//	回购人名称	String
                    comNature: '',//	企业性质	String
                    comRegisteredCapital: '',//	注册资金	double
                    comIncome: '',//	年营业额	double
                    agencyLevel: '',//	经销商层级	String
                    comManager: '',//	回购方负责人姓名	String
                    comMobile: '',//	回购方负责人电话	String
                    feeRequire: '',//	是否收取服务费	String
                    serviceFee: '',//	咨询服务费	double
                    partnerType: '',//	伙伴类型（方便以后扩展）	String
                    socialSerial: '', //统一社会信用代码
                },
                debtInfo: [
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    },
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
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
        this.imgData();
    },
    methods: {
        handlePictureCardPreview(file) { // 图片浏览功能
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.otherData = this.legalMan;
            this.tabChange++;
            this.legalMan.push({
                title: '回购人' + newTabName,
                name: newTabName,
                basicInfo: {
                    // 基本信息
                    id: '', //	数据ID(修改时不为空)	String
                    comFullname: '',//	回购人名称	String
                    comNature: '',//	企业性质	String
                    comRegisteredCapital: '',//	注册资金	double
                    comIncome: '',//	年营业额	double
                    agencyLevel: '',//	经销商层级	String
                    comManager: '',//	回购方负责人姓名	String
                    comMobile: '',//	回购方负责人电话	String
                    feeRequire: '',//	是否收取服务费	String
                    serviceFee: '',//	咨询服务费	double
                    partnerType: '',//	伙伴类型（方便以后扩展）	String
                    socialSerial: '', //统一社会信用代码
                },
                debtInfo: [
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    },
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    }
                ]
            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.legalMan;
            let activeName = this.editableTabsValue;

            // 至少要保留一个
            if (this.legalMan.length == 1) {
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
            this.legalMan = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.legalMan.forEach(function(item, index, arr) {
                item.title = '回购人' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '回购人' + parseInt(index + 1);
            })
            this.editableTabsValue = this.legalMan.length + '';
            //主要防止于添加的时候错误
            this.tabIndex = this.legalMan.length;
        },
        imgData() {
            this.$post('/buss/materialTree',{
                materialType: 'NATURE_MATERIAL',
            }).then(res => {
                if(res.data.code == '2000000') {
                    let treeInfo = res.data.data.leaseholder[this.tabChange - 1].itemTree;
                    let tempArr = [];
                    Object.keys(treeInfo).forEach((key) => {
                        tempArr.push(treeInfo[key]);
                    });
                    this.imgFile = tempArr;
                    console.log(this.imgFile);
                    this.relationId = tempArr[this.tabChange - 1].custId;
                }
            });
        },

        // 匹配信息按钮
        handleMatching() {

        },

        // 页签切换
        changeTables(val) {
            this.tabChange = val.name;
        },

        // 保存
        save() {
            console.log(this.legalMan);
            return;
            this.allTabData(this.legalMan);
            this.legalMan.forEach(function(item,index) { // 删除子tab 的name 和title 因为后台用不了传过去报错
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
                data: this.legalMan
            }).then(res => {
                if(res.data.code == 2000000) {
                    this.$message.success('承租人保存成功');
                    this.legalMan.forEach(function(item,index) { //用于ajax提交完成后返回删除的tab name 和title
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
                    this.$emit('childVal',this.legalMan); // 子传父 承租人数据传递给父组件
                 }
            });
        },
        // 下一步
        next() {
            this.save();
        },

        tabsFor(arrList) {
            arrList.forEach(function(item) {
                delete item.title;
                delete item.name;
            });
        },
        handlePictureCardPreview(file) { // 图片浏览功能
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
                if(this.legalMan[i].hasChildren == "Y") {
                    this.legalMan[i].childrenInfo = this.$refs.headerChild[i].childrenInfo
                }
            }
            for(let i = 0; i < this.$refs.house.length; i++) {
                this.legalMan[i].assetsHouses = this.$refs.house[i].assetsHouses;
            }
            for(let i = 0; i < this.$refs.lands.length; i++) {
                this.legalMan[i].assetsLands = this.$refs.lands[i].assetsLands
            }
            for(let i = 0; i < this.$refs.financial.length; i++) {
                    this.legalMan[i].assetsFinances = this.$refs.financial[i].assetsFinances
            }
            for(let i = 0; i < this.$refs.homecar.length; i++) {
                this.legalMan[i].assetsVehicles = this.$refs.homecar[i].assetsVehicles
            }
            for(let i = 0; i < this.$refs.farmtools.length; i++) {
                this.legalMan[i].assetsFarmTools = this.$refs.farmtools[i].assetsFarmTools
            }
            for(let i = 0; i < this.$refs.assetsOthers.length; i++) {
                this.legalMan[i].assetsOthers = this.$refs.assetsOthers[i].assetsOthers
            }
            for(let i = 0; i < this.$refs.debt.length; i++) {
                this.legalMan[i].debtSituations = this.$refs.debt[i].debtSituations
            }
            for(let i = 0; i < this.$refs.guarantee.length; i++) {
                this.legalMan[i].debtGuarantees = this.$refs.guarantee[i].debtGuarantees
            }
            for(let i = 0; i < this.$refs.otherLiabilities.length; i++) {
                this.legalMan[i].debtOthers = this.$refs.otherLiabilities[i].debtOthers
            }
            for(let i = 0; i < this.$refs.plant.length; i++) {
                this.legalMan[i].incomePlants = this.$refs.plant[i].incomePlants
            }
            for(let i = 0; i < this.$refs.agriculture.length; i++) {
                this.legalMan[i].incomeFarmMachineryWork = this.$refs.agriculture[i].incomeFarmMachineryWork
            }
            for(let i = 0; i < this.$refs.otherIncome.length; i++) {
                this.legalMan[i].incomeOthers = this.$refs.otherIncome[i].incomeOthers
            }
        },
},
    components: {
        componentitle,

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
