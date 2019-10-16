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
            <el-tab-pane v-for="(item, index) of editableTabs" :key="item.name" :label="item.title" :name="item.name">
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
                            <el-input type="text" v-model="item.naturalData.lessinfoName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select v-model="item.naturalData.educationLevel" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.custEducation" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumber" type="text" maxlength="18" class="inputLessinfo" v-model="item.naturalData.idNum">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input type="text" v-model="item.naturalData.residenceYear" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            <!-- <el-input type="text" v-model="item.naturalData.lessinfoSex" class="inputLessinfo"></el-input> -->
                            {{item.naturalData.lessinfoSex}}
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input type="text" v-model="item.naturalData.plantYear" @change="plantYears" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>户籍地址</td>
                        <td>
                            <el-input type="text" v-model="item.naturalData.householdArrress" class="inputLessinfo"></el-input>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" v-model="item.naturalData.nowAddress" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年龄</td>
                        <td>
                            <!-- <el-input v-model="item.naturalData.lessinfoAge" type="text" class="inputLessinfo"></el-input> -->
                            {{item.naturalData.lessinfoAge}}
                        </td>
                        <td>是否有子女</td>
                        <td>
                            <el-select v-model="item.naturalData.hasChildren" class="inputLessinfo" placeholder="请选择" @change="childChange">
                                <el-option v-for="items in rulesField.hasChildren" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>客户类别</td>
                        <td>
                            <el-select v-model="item.naturalData.custType" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.custType" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>征信报告</td>
                        <td>
                            <el-select v-model="item.naturalData.hasCreditReport" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.hasCreditReport" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td>
                            <el-input type="text" v-model="item.naturalData.lessinfoPhone" class="inputLessinfo" @change="natural"></el-input>
                        </td>
                        <td>婚姻状况</td>
                        <td>
                            <el-select v-model="item.naturalData.custMarriage" class="inputLessinfo" @change="custMarriageChange" placeholder="请选择">
                                <el-option v-for="items in rulesField.custMarriage" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="item.naturalData.lessinfoWechat" class="inputLessinfo"></el-input>
                        </td>
                        <td>是否有离婚协议</td>
                        <td>
                            <el-select v-model="item.naturalData.marriageSettlement" class="inputLessinfo" :disabled="item.naturalData.custMarriage != 'divorced'" placeholder="请选择">
                                <el-option v-for="items in rulesField.marriageSettlement" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>

                <div class="tableTitle" v-show="item.naturalData.custMarriage == 'married'">
                    承租人配偶
                </div>
                <!-- 承租人信息表格 -->

                <table class="lessinfoTbale" v-show="item.naturalData.custMarriage == 'married'">
                    <tr>
                        <td>姓名</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.lessinfoName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select v-model="item.mateInfo.educationLevel" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.custEducation" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>身份证号码</td>
                        <td>
                            <el-input @change="idNumberType" type="text" maxlength="18" class="inputLessinfo" v-model="item.mateInfo.idNum">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.residenceYear" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            <!-- <el-input type="text" v-model="item.naturalData.lessinfoSex" class="inputLessinfo"></el-input> -->
                            {{item.mateInfo.lessinfoSex}}
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.plantYear" @change="plantYears" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>户籍地址</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.householdArrress" class="inputLessinfo"></el-input>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.nowAddress" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年龄</td>
                        <td>
                            <!-- <el-input v-model="item.naturalData.lessinfoAge" type="text" class="inputLessinfo"></el-input> -->
                            {{item.mateInfo.lessinfoAge}}
                        </td>
                        <td>婚姻状况</td>
                        <td>
                            <el-select v-model="item.mateInfo.custMarriage" class="inputLessinfo" @change="custMarriageChange" placeholder="请选择">
                                <el-option v-for="items in rulesField.custMarriage" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>客户类别</td>
                        <td>
                            <el-select v-model="item.mateInfo.custType" class="inputLessinfo" placeholder="请选择">
                                <el-option v-for="items in rulesField.custType" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>是否有离婚协议</td>
                        <td>
                            <el-select v-model="item.mateInfo.marriageSettlement" class="inputLessinfo" :disabled="item.mateInfo.custMarriage != 'divorced'" placeholder="请选择">
                                <el-option v-for="items in rulesField.marriageSettlement" :key="items.optionCode" :label="items.optionName" :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.lessinfoPhone" class="inputLessinfo" @change="phoneChange"></el-input>
                        </td>
                        <td>微信</td>
                        <td>
                            <el-input type="text" v-model="item.mateInfo.lessinfoWechat" class="inputLessinfo"></el-input>
                        </td>
                    </tr>

                </table>

                <!-- 承租人子女 -->
                <lessinfochild
                    ref="headerChild"
                    v-show="item.naturalData.hasChildren == 'Y'"
                    :editableTabs="editableTabs"/>

                <!-- 资产情况 -->
                <componentitle :message="message='资产情况'" class="componentitle" />
                <div class="assetsAll">
                    <!-- 房产 -->
                    <p class="tableTitle">房产（如有）</p>
                    <assets ref="house" :rulesField="rulesField" />

                    <!-- 土地（含代收代耕）（如有） -->
                    <p class="tableTitle">土地（含代收代耕）（如有）</p>
                    <lands ref="lands" :rulesField="rulesField"/>
                </div>
                <!-- 底部按钮 -->
                <div class="bottomButtonDiv matchingDiv">
                    <el-button type="primary" size="medium" class="matchingButton" @click="save">
                        保存
                    </el-button>
                    <el-button type="primary" size="medium" class="matchingButton" @click="next">
                        下一步
                    </el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import lessinfochild from '../components/lessinfochild.vue'; // 承租人子女
import assets from '../components/assets.vue'; // 资产情况
import lands from '../components/lands.vue'; // 土地（含代收代耕）（如有）
export default {
    data() {
        return {
            message: '', //title
            editableTabsValue: '1',
            editableTabs: [{
                title: '承租人1',
                name: '1',
                matchingId: '', // 匹配按钮的身份证号
                naturalData: {
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
                },
                mateInfo: {
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
                }
            }],
            tabIndex: 1,

        }
    },
    created() {
    },
    props: {
        rulesField: {
            type: Object
        }
    },
    mounted() {

    },
    methods: {

        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: '承租人' + newTabName,
                name: newTabName,
                naturalData: { // 承租人信息
                    idNum: '', //身份证号码
                    residenceYear: '', //申请地居住年限
                    lessinfoSex: '', // 性别
                    plantYear: '', //种植年限
                    matchingId: '1', // 匹配按钮的身份证号
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
                },
                mateInfo: {
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
                }
            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;

            // 至少要保留一个
            if (this.editableTabs.length == 1) {
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
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.editableTabs.forEach(function(item, index, arr) {
                item.title = '承租人' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '承租人' + parseInt(index + 1);
            })
            this.editableTabsValue = this.editableTabs.length + '';
            //主要防止于添加的时候错误
            this.tabIndex = this.editableTabs.length;
        },
        // 匹配信息按钮
        handleMatching() {

        },
        // 联系电话关联微信号
        phoneChange(val) {

            let nowIndex = this.tabIndex - 1;
            setTimeout(function() {
                this.editableTabs[nowIndex].mateInfo.lessinfoWechat = this.editableTabs[nowIndex].mateInfo.lessinfoPhone;
            }.bind(this),100);
        },
        natural(val) {
            let nowIndex = this.tabIndex - 1;
            setTimeout(function() {
                this.editableTabs[nowIndex].naturalData.lessinfoWechat = this.editableTabs[nowIndex].naturalData.lessinfoPhone;
            }.bind(this),100);
        },
        // 判断种植年限
        plantYears(val) {
            console.log(val);
            if(parseInt(val) > parseInt(this.editableTabs.naturalData.lessinfoAge)) {
                this.$message.error('种植年限不能大于年龄');
                this.editableTabs.naturalData.plantYear = '';
            }
        },
        // 婚姻状况切换
        custMarriageChange(val) {
            console.log(val);
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
                this.editableTabs[nowIndex].naturalData.lessinfoSex = idcontent.Sex;
                this.editableTabs[nowIndex].naturalData.lessinfoAge = idcontent.Age;
            }.bind(this),100);
        },
        idNumberType(val) {
            let idcontent = this.$idCard.IDcode(val);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
            }
            let nowIndex = this.tabIndex - 1;

            setTimeout(function() {
                this.editableTabs[nowIndex].mateInfo.lessinfoSex = idcontent.Sex;
                this.editableTabs[nowIndex].mateInfo.lessinfoAge = idcontent.Age;
            }.bind(this),100);
        },
        // 是否有子女
        childChange(val) {
            if(val == 'Y') {
                this.$store.state.lessinfoAddress = this.editableTabs[0].naturalData.householdArrress; // 承租人户籍地址
        		this.$store.state.lessinfoNowAddress = this.editableTabs[0].naturalData.nowAddress; //承租人现住址
            }
        },
        // 保存
        save() {
            // this.editableTabs[0]['oooo']=this.$refs.headerChild[0].childrenInfo
            for(let i = 0; i < this.$refs.headerChild.length; i++) {
                if(this.editableTabs[i].naturalData.hasChildren == "Y") {
                    this.editableTabs[i].childrenInfo = this.$refs.headerChild[i].childrenInfo
                }
            }
            console.log(this.$refs.house);
        },
        // 下一步
        next() {

        },

},
    components: {
        componentitle,
        lessinfochild,
        assets,
        lands
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
