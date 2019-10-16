<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加土地
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of assetsHouses"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>面积</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.acreage"
                            :precision="2"
                            :step="0.1"
                            :max="10000">
                        </el-input-number> 亩
                    </td>
                    <td>是否抵押</td>
                    <td>
                        <el-select v-model="item.mortgage" class="inputLessinfo" placeholder="请选择">
                            <el-option v-for="items in rulesField.mortgage"
                                :key="items.optionCode"
                                :label="items.optionName"
                                :value="items.optionCode">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>当前估值</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.currEvaluation"
                            :precision="2"
                            :step="0.1"
                            :max="10000">
                        </el-input-number> 元
                    </td>
                    <td>土地地址坐落</td>
                    <td>
                        <el-input type="text" v-model="item.owner" class="inputLessinfo"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>承包期限</td>
                    <td>
                        <!-- <el-input type="text" v-model="item.naturalData.custSex" class="inputLessinfo"></el-input> -->
                        <el-input type="text" v-model="item.owner" class="inputLessinfo"></el-input> 年
                    </td>
                    <td>合适方法</td>
                    <td>
                        <el-select v-model="item.mortgage" class="inputLessinfo" placeholder="请选择">
                            <el-option v-for="items in rulesField.checkMode"
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
</template>

<script  type="text/ecmascript-6">

export default {
	data() {
		return {
            childrenTabs: '1',
            assetsHouses: [
                {
                    title: '土地1',
                    name: '1',
                    // childData: {
                    //     id: '',
                    //     type: '', // 房产类别
                    //     status: '', // 状态
                    //     owner: '', // 所有权人
                    //     mortgage: '', //是否抵押
                    //     haveCertificate: '', //是否有房产证明
                    //     currEvaluation: '', //当前估值
                    //     address: '', //抵押物地址
                    //     acreage: '' //面积
                    // }
                    id: '',
                    type: '', // 房产类别
                    status: '', // 状态
                    owner: '', // 所有权人
                    mortgage: '', //是否抵押
                    haveCertificate: '', //是否有房产证明
                    currEvaluation: '', //当前估值
                    address: '', //抵押物地址
                    acreage: '' //面积
                }
            ],
            childIndex: 1
		}
	},
    props: {
        editableTabs: {
            type: Array
        },
        rulesField: {
            type: Object
        }
    },
	created() {},
    mounted() {
        console.log(this.rulesField);
    },
    watch: {

    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.assetsHouses.push({
                title: '土地' + newTabName,
                name: newTabName,
                id: '',
                type: '', // 房产类别
                status: '', // 状态
                owner: '', // 所有权人
                mortgage: '', //是否抵押
                haveCertificate: '', //是否有房产证明
                currEvaluation: '', //当前估值
                address: '', //抵押物地址
                acreage: '' //面积
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.assetsHouses;
            let activeName = this.childrenTabs;

            // 至少要保留一个
            if (this.assetsHouses.length == 1) {
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

            this.childrenTabs = activeName;
            this.assetsHouses = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.assetsHouses.forEach(function(item, index, arr) {
                item.title = '土地' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '土地' + parseInt(index + 1);
            })
            this.childrenTabs = this.assetsHouses.length + '';
            //主要防止于添加的时候错误
            this.childIndex = this.assetsHouses.length;
        },

    },
}
</script>
<style lang="less">

</style>
