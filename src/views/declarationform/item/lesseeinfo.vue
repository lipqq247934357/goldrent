<template>
<div class="businfosss tabsinfo">
    <div class="subtabs">
        <!-- <el-tabs type="border-card">
                <el-tab-pane :label="'承租人'">
                </el-tab-pane>
            </el-tabs> -->
        <div style="margin-bottom: 20px;">
            <el-button size="small" @click="addTab(editableTabsValue)" class="el-icon-plus">
                增加承租人
            </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                {{item.content}}
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
    data() {
        return {
            editableTabsValue: '1',
            editableTabs: [{
                title: '承租人1',
                name: '1',
                content: '承租人1'
            }, {
                title: '承租人2',
                name: '2',
                content: '承租人2'
            }],
            tabIndex: 2
        }
    },
    created() {
        this.$store.state.lesseeinfoArr = this.lessinfoArr;
    },
    methods: {
        addTab(targetName) {
            console.log(targetName);
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: 'New Tab',
                name: newTabName,
                content: 'New Tab content'
            });
            this.editableTabsValue = newTabName;
            console.log(this.editableTabs);
        },
        removeTab(targetName) {
            console.log(targetName);
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
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
        }
    }
}
</script>
<style lang="less">

</style>
