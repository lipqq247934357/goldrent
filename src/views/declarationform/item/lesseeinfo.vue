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
                        <el-input v-model="item.naturalData.matchingId" class="matchingId" placeholder="请输入身份证号">
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
                            <el-input
                                type="text"
                                v-model="item.naturalData.lessinfoName"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>教育程度</td>
                        <td>
                            <el-select
                                v-model="item.naturalData.educationLevel"
                                class="inputLessinfo"
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
                                type="text"
                                class="inputLessinfo"
                                v-model="idNum">
                            </el-input>
                        </td>
                        <td>申请地居住年限（年）</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="residenceYear"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>性别</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="lessinfoSex"
                                class="inputLessinfo"></el-input>
                        </td>
                        <td>种植年限</td>
                        <td>
                            <el-input
                            type="text"
                                v-model="plantYear"
                            class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>户籍地址</td>
                        <td>
                            <el-input type="text" class="inputLessinfo"></el-input>
                        </td>
                        <td>现住址</td>
                        <td>
                            <el-input type="text" class="inputLessinfo"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年龄</td>
                        <td>
                            <el-input type="text" class="inputLessinfo"></el-input>
                        </td>
                        <td>是否有子女</td>
                        <td>
                            <el-select
                                v-model="item.naturalData.hasChildren"
                                class="inputLessinfo"
                                placeholder="请选择">
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
                                v-model="item.naturalData.custType"
                                class="inputLessinfo"
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
                                v-model="item.naturalData.hasCreditReport"
                                class="inputLessinfo"
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
                            <el-input type="text" class="inputLessinfo"></el-input>
                        </td>
                        <td>婚姻状况</td>
                        <td>
                            <el-select
                                v-model="item.naturalData.custMarriage"
                                class="inputLessinfo"
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
                            <el-input type="text" class="inputLessinfo"></el-input>
                        </td>
                        <td>是否有离婚协议</td>
                        <td>
                            <el-select
                                v-model="item.naturalData.marriageSettlement"
                                class="inputLessinfo"
                                :disabled="item.naturalData.custMarriage != 'divorced'"
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
            </el-tab-pane>


        </el-tabs>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';

export default {
    data() {
        return {
            message: '', //title
            editableTabsValue: '1',
            editableTabs: [{
                title: '承租人1',
                name: '1',

                naturalData: [{
                    idNum: '', //身份证号码
                    residenceYear: '', //申请地居住年限
                    lessinfoSex: '' ,// 性别
                    plantYear: '', //种植年限
                    matchingId: '1', // 匹配按钮的身份证号
                    lessinfoName: '', //承租人信息姓名
                    educationLevel: '', //存储选中的教育程度
                    custType: '', //存储选中的客户类别
                    hasChildren: '',//存储选中的是否有子女
                    hasCreditReport: '', //存储选中的征信报告
                    custMarriage: '',//存储选中的婚姻状况
                    marriageSettlement: '', //存储选中的离婚协议
                }]
            }],
            tabIndex: 1,

        }
    },
    created() {
        this.$store.state.lesseeinfoArr = this.lessinfoArr;
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
                naturalData: [{
                    matchingId: '', // 匹配按钮的身份证号
                }]
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
        // 婚姻状况切换
        custMarriageChange(val) {
            console.log(val);
        }
    },
    components: {
        componentitle,
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
}
</style>
