<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加土地
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of assetsLands"
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
                            v-model="item.value"
                            :precision="2"
                            :step="0.1"
                            :max="10000">
                        </el-input-number> 元
                    </td>
                    <td>土地地址坐落</td>
                    <td>
                        <el-input type="text" v-model="item.address" class="inputLessinfo"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>承包期限</td>
                    <td>
                        <el-input type="text" v-model="item.contractLife" class="inputLessinfo"></el-input> 年
                    </td>
                    <td>核实方法</td>
                    <td>
                        <el-select v-model="item.checkMode" class="inputLessinfo" placeholder="请选择">
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
            assetsLands: [
                {
                    title: '土地1',
                    name: '1',
                    id: '',
                    acreage:'', //	面积/单位为百分位
                    value: '',//	价值
                    contractLife: '',//	承包年限
                    mortgage: '',//	是否抵押 N:未抵押 Y:已抵押
                    address: '',//	抵押物地址/坐落
                    checkMode: '',//	核实方式
                    status: '',//	状态
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
    },
    watch: {

    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.assetsLands.push({
                title: '土地' + newTabName,
                name: newTabName,
                id: '',
                acreage:'', //	面积/单位为百分位
                value: '',//	价值
                contractLife: '',//	承包年限
                mortgage: '',//	是否抵押 N:未抵押 Y:已抵押
                address: '',//	抵押物地址/坐落
                checkMode: '',//	核实方式
                status: '',//	状态
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.assetsLands;
            let activeName = this.childrenTabs;

            // 至少要保留一个
            if (this.assetsLands.length == 1) {
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
            this.assetsLands = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.assetsLands.forEach(function(item, index, arr) {
                item.title = '土地' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '土地' + parseInt(index + 1);
            })
            this.childrenTabs = this.assetsLands.length + '';
            //主要防止于添加的时候错误
            this.childIndex = this.assetsLands.length;
        },

    },
}
</script>
<style lang="less">

</style>
