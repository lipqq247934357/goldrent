<template>
<div class="lesseeinfoChild" style="position: relative;">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加农机作业收入
        </el-button>
    </div>

    <el-button
        style="position: absolute;background:#ff8f2b;border: 0;color: #fff;right: 10px;top: 10px;"
        @click="calculation"
        size="medium">
        计算
    </el-button>

    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab" @tab-click="changeTables">
        <el-tab-pane
            v-for="(item, index) of incomeFarmMachineryWork"
            :key="item.sortIndex + ''"
            :label="item.title"
            :name="item.sortIndex + ''">
            <table class="lessinfoTbale">
                <tr>
                    <td>作业类别</td>
                    <td>
                        <el-input type="text" v-model="item.plantType" class="inputLessinfo"></el-input>
                    </td>
                    <td>作业面积</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.plantArea"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                        <span style="position:absolute;right: 10px;">
                            亩
                        </span>
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
                            :min="0.00"
                            >
                        </el-input-number>
                        <span style="position:absolute;right: 10px;">
                            元
                        </span>
                    </td>
                    <td>单亩收入</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.oneIncome"
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
                    <td>结余</td>
                    <td style="padding: 5px 0;">
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.surplus"
                            :precision="2"
                            :step="0.1"
                            >
                        </el-input-number>
                        <span style="position:absolute;right: 10px;">
                            元
                        </span>
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
            incomeFarmMachineryWork: [
                {
                    title: '农机作业收入1',
                    name: '1',
                    id: '',
                    plantType: '无', // 作业种类
                    plantArea: '', //作业面积
                    oneCost: '',//	单亩成本
                    oneIncome: '', //单亩收入
                    surplus: '',// 结余
                    status: '', //状态
                    remark: '',//备注
                    sortIndex: '1',
                }
            ],
            tabChange: 1,
            childIndex: 1
		}
	},
    props: {
        njzysr: {
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
        njzysr(newVal,oldVal){
            if(newVal != undefined) {
                this.incomeFarmMachineryWork = this.njzysr;
                this.incomeFarmMachineryWork.forEach((item,index) => {
                    console.log(index);
                    item['name'] = item.sortIndex + '';
                    item['title'] = '农机作业收入' + item.sortIndex;
                });
                this.childrenTabs = '1';
                this.childIndex = this.incomeFarmMachineryWork.length;

            }
        }
    },
	methods: {
        changeTables(val) {
            this.tabChange = val.name;

        },
        // 计算
        calculation() {
            let a = this.tabChange - 1;
            this.incomeFarmMachineryWork.forEach((item,index) => {
                if(index == a) {
                    item.surplus = (item.oneIncome - item.oneCost) * item.plantArea;
                    console.log(item);
                }
            });
        },
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.incomeFarmMachineryWork.push({
                title: '农机作业收入' + newTabName,
                name: newTabName,
                id: '',
                plantType: '无', // 作业种类
                plantArea: '', //作业面积
                oneCost: '',//	单亩成本
                oneIncome: '', //单亩收入
                surplus: '',// 结余
                status: '', //状态
                remark: '',//备注
                sortIndex: newTabName
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {
            // 至少要保留一个
            if (this.incomeFarmMachineryWork.length == 1) {
                return;
            }
            if(this.incomeFarmMachineryWork[targetName - 1].id) {
                this.$post('/data/del',{
                    id: this.incomeFarmMachineryWork[targetName - 1].id,
                    type: 'incomePlant'
                }).then(res => {
                    if(res.data.code =='2000000') {
                        this.$message.success('农机作业收入删除成功');
                        let tabs = this.incomeFarmMachineryWork;
                        let activeName = this.childrenTabs;

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
                        this.incomeFarmMachineryWork = tabs.filter(tab => tab.name !== targetName);

                        // 当删除成功后后一项承租人继承前一项承租人index
                        this.incomeFarmMachineryWork.forEach(function(item, index, arr) {
                            item.sortIndex = index + 1;
                            item.title = '农机作业收入' + parseInt(index + 1);
                            item.name = parseInt(index + 1) + '';
                            item.content = '农机作业收入' + parseInt(index + 1);
                        })
                        this.childrenTabs = this.incomeFarmMachineryWork.length + '';
                        //主要防止于添加的时候错误
                        this.childIndex = this.incomeFarmMachineryWork.length;
                    }
                });
            }


        },

    },
}
</script>
<style lang="less">

</style>
