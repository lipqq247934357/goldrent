<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加其他负债
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of debtOthers"
            :key="item.sortIndex + ''"
            :label="item.title"
            :name="item.sortIndex + ''">
            <table class="lessinfoTbale">
                <tr>
                    <td>债权人</td>
                    <td>
                        <el-input type="text" v-model="item.creditor" class="inputLessinfo"></el-input>
                    </td>
                    <td>余额</td>
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
                </tr>
                <tr>
                    <td>至今账龄</td>
                    <td>
                        <el-input type="text" v-model="item.debtMaturity" class="inputLessinfo"></el-input>
                        <span style="position:absolute;right: 10px;">
                            月
                        </span>
                    </td>
                    <td>有无担保</td>
                    <td>
                        <el-select
                            v-model="item.isGuarantee"
                            clearable
                            class="inputLessinfo"
                            placeholder="请选择">
                            <el-option v-for="items in rulesField.isGuarantee"
                                :key="items.optionCode"
                                :label="items.optionName"
                                :value="items.optionCode">
                            </el-option>
                        </el-select>
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
            debtOthers: [
                {
                    title: '其他负债1',
                    name: '1',
                    id: '',
                    creditor: '', // 债权人
                    isGuarantee: '', //有无担保
                    debtBalance: '',//	余额
                    debtMaturity: '', //至今账龄
                    status: '', //状态
                    remark: '',//备注
                    sortIndex: '1'
                }
            ],
            childIndex: 1
		}
	},
    props: {
        qtfz: {
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
        qtfz(newVal,oldVal){
            if(newVal != undefined) {
                this.debtOthers = this.qtfz;
                this.debtOthers.forEach((item,index) => {
                    console.log(index);
                    item['name'] = item.sortIndex + '';
                    item['title'] = '其他负债' + item.sortIndex;
                });
                this.childrenTabs = '1';
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.debtOthers.push({
                title: '其他负债' + newTabName,
                name: newTabName,
                id: '',
                creditor: '', // 债权人
                isGuarantee: '', //有无担保
                debtBalance: '',//	余额
                debtMaturity: '', //至今账龄
                status: '', //状态
                remark: '',//备注
                sortIndex: newTabName
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {
            // 至少要保留一个
            if (this.debtOthers.length == 1) {
                return;
            }
            this.$post('/data/del',{
                id: this.debtOthers[targetName - 1].id,
                type: 'debtOther'
            }).then(res => {
                if(res.data.code =='2000000') {
                    this.$message.success('其他负债删除成功');
                    let tabs = this.debtOthers;
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
                    this.debtOthers = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.debtOthers.forEach(function(item, index, arr) {
                        item.sortIndex = index + 1;
                        item.title = '其他负债' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '其他负债' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.debtOthers.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.debtOthers.length;
                }
            });
        },

    },
}
</script>
<style lang="less">

</style>
