<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加农机具
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of assetsFarmTools"
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
                            type="year"
                            format="yyyy"
                            value-format="yyyy"
                            placeholder="选择年份">
                        </el-date-picker>
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
                    <td>是否获取发票</td>
                    <td>
                        <el-select
                            v-model="item.invoice"
                            @change='changeInvoiceAmt'
                            clearable
                            class="inputLessinfo"
                            placeholder="请选择">
                            <el-option v-for="items in rulesField.invoice"
                                :key="items.optionCode"
                                :label="items.optionName"
                                :value="items.optionCode">
                            </el-option>
                        </el-select>
                    </td>
                    <td>发票金额</td>
                    <td>
                        <el-input-number
                                :min="0.00"
                                :disabled="amountStatus"
                                :precision="2"
                                :step="0.1"
                                class="inputLessinfo"
                                type="text"
                                v-model="item.invoice_amount">
                        </el-input-number>
                    </td>
                </tr>
                <tr>
                    <td>车辆号牌</td>
                    <td>
                        <el-input type="text" v-model="item.serialNo" class="inputLessinfo"></el-input>
                    </td>
                    <td>当前估价</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.currEvaluation"
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
                    <td>品牌及型号</td>
                    <td>
                        <el-input type="text" v-model="item.brandModels" class="inputLessinfo"></el-input>
                    </td>
                    <td>所有权人</td>
                    <td>
                        <el-input type="text" v-model="item.owner" class="inputLessinfo"></el-input>
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
            assetsFarmTools: [
                {
                    title: '农机具1',
                    name: '1',
                    id: '',
                    buyTime: '', // 购买时间
                    currEvaluation: '', // 当前估值
                    owner: '', // 所有权人
                    mortgage: '', //是否抵押
                    serialNo: '', //号牌/车架号
                    status: '', //状态
                    invoice: '',//是否获取发票
                    brandModels: '', //品牌及型号
                    sortIndex: '1'
                }
            ],
            childIndex: 1,
            amountStatus:true
		}
	},
    props: {
        njj: {
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
        njj(newVal,oldVal){
            if(newVal != undefined) {
                this.assetsFarmTools = this.njj;
                this.assetsFarmTools.forEach((item,index) => {
                    item['name'] = item.sortIndex + '';
                    item['title'] = '农机具' + item.sortIndex;
                });
                this.childrenTabs = '1';
                this.childIndex = this.assetsFarmTools.length;
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.assetsFarmTools.push({
                title: '农机具' + newTabName,
                name: newTabName,
                id: '',
                buyTime: '', // 购买时间
                currEvaluation: '', // 当前估值
                owner: '', // 所有权人
                mortgage: '', //是否抵押
                serialNo: '', //号牌/车架号
                status: '', //状态
                invoice: '',//是否获取发票
                brandModels: '', //品牌及型号
                sortIndex: newTabName
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {
            // 至少要保留一个
            if (this.assetsFarmTools.length == 1) {
                return;
            }

            this.$post('/data/del',{
                id: this.assetsFarmTools[targetName - 1].id,
                type: 'assetsFarmTools'
            }).then(res => {
                if(res.data.code =='2000000') {
                    this.$message.success('农机具删除成功');
                    let tabs = this.assetsFarmTools;
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
                    this.assetsFarmTools = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.assetsFarmTools.forEach(function(item, index, arr) {
                        item.sortIndex = index + 1;
                        item.title = '农机具' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '农机具' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.assetsFarmTools.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.assetsFarmTools.length;
                }
            });
        },
        changeInvoiceAmt(val){
            if (val === 'Y') {
                this.amountStatus = false;
            } else {
                this.amountStatus = true;
            }
        }
    },
}
</script>
<style lang="less">

</style>
