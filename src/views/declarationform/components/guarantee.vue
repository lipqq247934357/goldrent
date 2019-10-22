<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加对外担保
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of debtGuarantees"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>债权人</td>
                    <td>
                        <el-input type="text" v-model="item.creditor" class="inputLessinfo"></el-input>
                    </td>
                    <td>担保余额</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.guaranteeBalance"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
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
                        <el-input type="text" v-model="item.warrantee" class="inputLessinfo"></el-input>
                    </td>
                    <td>与被担保人关系</td>
                    <td>
                        <el-input type="text" v-model="item.withWarranteeRelation" class="inputLessinfo"></el-input>
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
            debtGuarantees: [
                {
                    title: '对外担保1',
                    name: '1',
                    id: '',
                    creditor: '', // 债权人
                    externalGuarantee: '', //对外担保
                    guaranteeBalance: '',//	担保余额
                    warrantee: '', // 被担保人
                    withWarranteeRelation: '', // 与被担保人关系
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
            this.debtGuarantees.push({
                title: '对外担保' + newTabName,
                name: newTabName,
                id: '',
                creditor: '', // 债权人
                externalGuarantee: '', //对外担保
                guaranteeBalance: '',//	担保余额
                warrantee: '', // 被担保人
                withWarranteeRelation: '', // 与被担保人关系
                status: '', //状态
                remark: '',//备注
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.debtGuarantees;
            let activeName = this.childrenTabs;

            // 至少要保留一个
            if (this.debtGuarantees.length == 1) {
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
            this.debtGuarantees = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.debtGuarantees.forEach(function(item, index, arr) {
                item.title = '对外担保' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '对外担保' + parseInt(index + 1);
            })
            this.childrenTabs = this.debtGuarantees.length + '';
            //主要防止于添加的时候错误
            this.childIndex = this.debtGuarantees.length;
        },

    },
}
</script>
<style lang="less">

</style>
