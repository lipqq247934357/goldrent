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
            }],
            tabIndex: 1
        }
    },
    created() {
        this.$store.state.lesseeinfoArr = this.lessinfoArr;
    },
    methods: {
        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: '承租人' + newTabName,
                name: newTabName,
                content: '承租人' + newTabName
            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {

            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;

            // 至少要保留一个
            if(this.editableTabs.length == 1) {
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
            for(let i = 0 ; i < this.editableTabs.length + 1; i++) {
                console.log(this.editableTabs[i].title = '承租人' + i);
            }
        }
    }
}
</script>
<style lang="less">

</style>
