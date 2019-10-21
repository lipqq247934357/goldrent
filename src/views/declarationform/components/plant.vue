<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加种植类别
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of incomePlants"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>作物种类</td>
                    <td>
                        <el-input type="text" v-model="item.plantType" class="inputLessinfo"></el-input>
                    </td>
                    <td>种植面积</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.plantArea"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 亩
                    </td>
                </tr>
                <tr>
                    <td>单亩成本</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.oneCost"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 亩
                    </td>
                    <td>单亩收入</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.oneIncome"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
                    </td>
                </tr>
                <tr>
                    <td>结余</td>
                    <td style="padding: 5px 0;">
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.surplus"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
                    </td>

                </tr>
                <tr>
                    <td colspan="4" style="text-align: left;border-bottom: 0;padding-left: 20px;">
                        种植经验描述
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="border-top: 0;">
                        <el-input
                            type="textarea"
                            style="width: 98%;height40px;margin-bottom: 10px;"
                            :rows="3"
                            placeholder="请输入内容"
                            maxlength="500"
                            show-word-limit
                            v-model="item.remark">
                        </el-input>
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
            incomePlants: [
                {
                    title: '种植类别1',
                    name: '1',
                    id: '',
                    plantType: '', // 作物种类
                    plantArea: '', //种植面积
                    oneCost: '',//	单亩成本
                    oneIncome: '', //单亩收入
                    surplus: '',// 结余
                    status: '', //状态
                    remark: '',//备注
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
            this.incomePlants.push({
                title: '种植类别' + newTabName,
                name: newTabName,
                id: '',
                plantType: '', // 作物种类
                plantArea: '', //种植面积
                oneCost: '',//	单亩成本
                oneIncome: '', //单亩收入
                surplus: '',// 结余
                status: '', //状态
                remark: '',//备注
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.incomePlants;
            let activeName = this.childrenTabs;

            // 至少要保留一个
            if (this.incomePlants.length == 1) {
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
            this.incomePlants = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.incomePlants.forEach(function(item, index, arr) {
                item.title = '种植类别' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '种植类别' + parseInt(index + 1);
            })
            this.childrenTabs = this.incomePlants.length + '';
            //主要防止于添加的时候错误
            this.childIndex = this.incomePlants.length;
        },

    },
}
</script>
<style lang="less">

</style>
