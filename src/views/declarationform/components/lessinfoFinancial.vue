<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加金融资产
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of assetsFinances"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>存款</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.deposit"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
                    </td>
                    <td>股票</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.shares"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
                    </td>
                </tr>
                <tr>
                    <td>大额存单</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.bigDeposit"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
                    </td>
                    <td>理财产品</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.products"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
                    </td>
                </tr>
                <tr>
                    <td>债券</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.bond"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number> 元
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
            assetsFinances: [
                {
                    title: '金融资产1',
                    name: '1',
                    id: '',
                    deposit: '', // 存款
                    bigDeposit: '', // 大额存单
                    bond: '', // 债券
                    shares: '', //股票
                    products: '', //理财产品
                    status: '', //状态
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
            this.assetsFinances.push({
                title: '金融资产' + newTabName,
                name: newTabName,
                id: '',
                deposit: '', // 存款
                bigDeposit: '', // 大额存单
                bond: '', // 债券
                shares: '', //股票
                products: '', //理财产品
                status: '', //状态
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.assetsFinances;
            let activeName = this.childrenTabs;

            // 至少要保留一个
            if (this.assetsFinances.length == 1) {
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
            this.assetsFinances = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.assetsFinances.forEach(function(item, index, arr) {
                item.title = '金融资产' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '金融资产' + parseInt(index + 1);
            })
            this.childrenTabs = this.assetsFinances.length + '';
            //主要防止于添加的时候错误
            this.childIndex = this.assetsFinances.length;
        },

    },
}
</script>
<style lang="less">

</style>
