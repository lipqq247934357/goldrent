<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加其他收入
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of incomeOthers"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>上年收入</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.prevYearIncome"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                    </td>
                    <td>上年支出</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.prevYearPay"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                    </td>
                </tr>
                <tr>
                    <td>本年收入</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.currYearIncome"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                    </td>
                    <td>本年支出</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.currYearPay"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                    </td>
                </tr>
                <tr>
                    <td>结余</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.surplus"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
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
            incomeOthers: [
                {
                    title: '其他收入1',
                    name: '1',
                    id: '',
                    prevYearIncome: '', // 上年收入
                    prevYearPay: '', //上年支出
                    currYearIncome: '',//	本年收入
                    currYearPay: '', //本年支出
                    surplus: '',// 结余
                    status: '', //状态
                    remark: '',//备注
                }
            ],
            childIndex: 1
		}
	},
    props: {
        qtsr: {
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
        qtsr(newVal,oldVal){
            if(newVal != undefined) {
                this.incomeOthers = this.qtsr;
                this.incomeOthers.forEach((item,index) => {
                    console.log(index);
                    item['name'] = index+1 + '';
                    item['title'] = '其他收入' + (index+1);
                    item.type = item.type + '';
                });
                this.childrenTabs = '1';
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.incomeOthers.push({
                title: '其他收入' + newTabName,
                name: newTabName,
                id: '',
                prevYearIncome: '', // 上年收入
                prevYearPay: '', //上年支出
                currYearIncome: '',//	本年收入
                currYearPay: '', //本年支出
                surplus: '',// 结余
                status: '', //状态
                remark: '',//备注
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {
            // 至少要保留一个
            if (this.incomeOthers.length == 1) {
                return;
            }
            this.$post('/data/del',{
                id: this.incomeOthers[targetName - 1].id,
                type: 'incomeOther'
            }).then(res => {
                if(res.data.code =='2000000') {
                    this.$message.success('其他收入删除成功');
                    let tabs = this.incomeOthers;
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
                    this.incomeOthers = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.incomeOthers.forEach(function(item, index, arr) {
                        item.title = '其他收入' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '其他收入' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.incomeOthers.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.incomeOthers.length;
                }
            });
        },

    },
}
</script>
<style lang="less">

</style>
