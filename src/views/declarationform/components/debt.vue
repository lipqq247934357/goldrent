<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加债务情况
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of debtSituations"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>债务种类</td>
                    <td>
                        <el-input type="text" v-model="item.debtType" class="inputLessinfo"></el-input>
                    </td>
                    <td>债务人</td>
                    <td>
                        <el-input type="text" v-model="item.debtPerson" class="inputLessinfo"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>债务余额(元)</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.debtBalance"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                        <span style="position:absolute;right: 10px;">
                            元
                        </span>
                    </td>
                    <td>债务期限</td>
                    <td>
                        <el-input type="text" v-model="item.debtTerm" class="inputLessinfo"></el-input>
                        <span style="position:absolute;right: 10px;">
                            月
                        </span>
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
            debtSituations: [
                {
                    title: '债务情况1',
                    name: '1',
                    id: '',
                    debtSituation: '', // 债务情况
                    debtType: '',//	债务种类
                    debtPerson: '', // 债务人
                    debtBalance: '', // 债务余额
                    debtTerm: '', //债务期限
                    status: '', //状态
                    remark: '',//备注
                    sortIndex: '1'
                }
            ],
            childIndex: 1
		}
	},
    props: {
        zwqk: {
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
        zwqk(newVal,oldVal){
            if(newVal != undefined) {
                this.debtSituations = this.zwqk;
                this.debtSituations.forEach((item,index) => {
                    console.log(index);
                    item['name'] = item.sortIndex + '';
                    item['title'] = '债务情况' + item.sortIndex;
                });
                this.childrenTabs = '1';
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.debtSituations.push({
                title: '债务情况' + newTabName,
                name: newTabName,
                id: '',
                debtSituation: '', // 债务情况
                debtType: '',//	债务种类
                debtPerson: '', // 债务人
                debtBalance: '', // 债务余额
                debtTerm: '', //债务期限
                status: '', //状态
                remark: '',//备注
                sortIndex: newTabName
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            // 至少要保留一个
            if (this.debtSituations.length == 1) {
                return;
            }

            this.$post('/data/del',{
                id: this.debtSituations[targetName - 1].id,
                type: 'debtSituation'
            }).then(res => {
                if(res.data.code =='2000000') {
                    this.$message.success('债务情况删除成功');
                    let tabs = this.debtSituations;
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
                    this.debtSituations = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.debtSituations.forEach(function(item, index, arr) {
                        item.sortIndex = index + 1;
                        item.title = '债务情况' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '债务情况' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.debtSituations.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.debtSituations.length;
                }
            });


        },

    },
}
</script>
<style lang="less">

</style>
