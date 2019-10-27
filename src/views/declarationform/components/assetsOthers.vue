<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加其他资产
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of assetsOthers"
            :key="item.sortIndex + ''"
            :label="item.title"
            :name="item.sortIndex + ''">
            <table class="lessinfoTbale">
                <tr>
                    <td>购买时间</td>
                    <td>
                        <el-date-picker
                            class="inputLessinfo"
                            v-model="item.buyTime"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                        <!-- <el-input
                            type="text"
                            v-model="item.buyTime"
                            placeholder="请输入日期格式 2019-10-24 18:42:56"
                            class="inputLessinfo">
                        </el-input> -->
                    </td>
                    <td>所有权人</td>
                    <td>
                        <el-input type="text" v-model="item.owner" class="inputLessinfo"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>价值</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.value"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                        <span style="position:absolute;right: 10px;">
                            元
                        </span>
                    </td>
                    <td>是否抵押</td>
                    <td>
                        <el-select
                            v-model="item.mortgage"
                            clearable
                            class="inputLessinfo"
                            placeholder="请选择">
                            <el-option v-for="items in rulesField.mortgage"
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
            assetsOthers: [
                {
                    title: '其他资产1',
                    name: '1',
                    id: '',
                    buyTime: '', // 购买时间
                    value: '',//	价值
                    currEvaluation: '', // 当前估值
                    owner: '', // 所有权人
                    mortgage: '', //是否抵押
                    status: '', //状态
                    remark: '',//备注
                    sortIndex: '1'
                }
            ],
            childIndex: 1
		}
	},
    props: {
        qtzc: {
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
        qtzc(newVal,oldVal){
            if(newVal != undefined) {
                this.assetsOthers = this.qtzc;
                this.assetsOthers.forEach((item,index) => {
                    item['name'] = item.sortIndex + '';
                    item['title'] = '其他资产' + item.sortIndex;
                });
                this.childrenTabs = '1';
                this.childIndex = this.assetsOthers.length;
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.assetsOthers.push({
                title: '其他资产' + newTabName,
                name: newTabName,
                id: '',
                buyTime: '', // 购买时间
                value: '',//	价值
                currEvaluation: '', // 当前估值
                owner: '', // 所有权人
                mortgage: '', //是否抵押
                status: '', //状态
                remark: '',//备注
                sortIndex: newTabName
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {

            // 至少要保留一个
            if (this.assetsOthers.length == 1) {
                return;
            }

            this.$post('/data/del',{
                id: this.assetsOthers[targetName - 1].id,
                type: 'assetsOther'
            }).then(res => {
                if(res.data.code =='2000000') {
                    this.$message.success('其他资产删除成功');
                    let tabs = this.assetsOthers;
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
                    this.assetsOthers = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.assetsOthers.forEach(function(item, index, arr) {
                        item.sortIndex = index + 1;
                        item.title = '其他资产' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '其他资产' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.assetsOthers.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.assetsOthers.length;
                }
            });


        },

    },
}
</script>
<style lang="less">

</style>
