<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            添加房产
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of assetsHouses"
            :key="item.name"
            :label="item.title" :name="item.name">
            <table class="lessinfoTbale">
                <tr>
                    <td>房产类型</td>
                    <td>
                        <el-select v-model="item.type" class="inputLessinfo" placeholder="请选择">
                            <el-option v-for="items in rulesField.houseType"
                                :key="items.optionCode"
                                :label="items.optionName"
                                :value="items.optionCode">
                            </el-option>
                        </el-select>
                    </td>
                    <td>面积</td>
                    <td>
                        <el-input-number
                            class="inputLessinfo"
                            v-model="item.acreage"
                            :precision="2"
                            :step="0.1"
                            :min="0.00"
                            >
                        </el-input-number>
                         ㎡
                    </td>
                </tr>
                <tr>
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
                    <td>所有权人</td>
                    <td>
                        <el-input type="text" v-model="item.owner" class="inputLessinfo"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>是否抵押</td>
                    <td>
                        <!-- <el-input type="text" v-model="item.naturalData.custSex" class="inputLessinfo"></el-input> -->
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
                    <td>抵押物地址/坐落</td>
                    <td>
                        <el-input type="text" v-model="item.address" class="inputLessinfo"></el-input>
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
            assetsHouses: [
                {
                    title: '房产1',
                    name: '1',
                    id: '',
                    type: '', // 房产类别
                    status: '', // 状态
                    owner: '', // 所有权人
                    mortgage: '', //是否抵押
                    haveCertificate: '', //是否有房产证明
                    currEvaluation: '', //当前估值
                    address: '', //抵押物地址
                    acreage: '' //面积
                }
            ],
            childIndex: 1
		}
	},
    props: {
        fc: {
            type: Array
        },
        rulesField: {
            type: Object
        }
    },
	created() {},
    mounted() {
    },
    watch:{
        fc(newVal,oldVal){
            if(newVal != undefined) {
                this.assetsHouses = this.fc;
                this.assetsHouses.forEach((item,index) => {
                    item['name'] = index + 1 + '';
                    item['title'] = '房产' + (index + 1);
                    item.type = item.type + '';
                    if(item.type == 0) {
                        item.type = '';
                    }
                });
                this.childrenTabs = '1';
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.assetsHouses.push({
                title: '房产' + newTabName,
                name: newTabName,
                id: '',
                type: '', // 房产类别
                status: '', // 状态
                owner: '', // 所有权人
                mortgage: '', //是否抵押
                haveCertificate: '', //是否有房产证明
                currEvaluation: '', //当前估值
                address: '', //抵押物地址
                acreage: '' //面积
            });
            this.childrenTabs = newTabName;
        },
        removeTab(targetName) {
            // 至少要保留一个
            if (this.assetsHouses.length == 1) {
                return;
            }
            this.$post('/data/del',{
                id: this.assetsHouses[targetName - 1].id,
                type: 'assetsHouse'
            }).then(res => {
                if(res.data.code =='2000000') {
                    this.$message.success('房产删除成功');
                    let tabs = this.assetsHouses;
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
                    this.assetsHouses = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.assetsHouses.forEach(function(item, index, arr) {
                        item.title = '房产' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '承租人' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.assetsHouses.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.assetsHouses.length;
                }
            });


        },

    },
}
</script>
<style lang="less">

</style>
