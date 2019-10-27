<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            增加承租人子女
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab" @tab-click="childChange">
        <el-tab-pane
            v-for="(item, index) of childrenInfo"
            :key="item.sortIndex + ''"
            :label="item.title"
            :name="item.sortIndex + ''">
            <table class="lessinfoTbale">
                <tr>
                    <td>姓名</td>
                    <td>
                        <el-input type="text" v-model="item.custName" class="inputLessinfo">
                        </el-input>
                    </td>
                    <td>户籍地址</td>
                    <td>
                        <el-input type="text" maxlength="18" class="inputLessinfo" v-model="item.custHomeplace">
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td>身份证号码</td>
                    <td>
                        <el-input @change="idNumberType(item)" type="text" maxlength="18" class="inputLessinfo" v-model="item.certNo">
                        </el-input>
                    </td>
                    <td>年龄</td>
                    <td>
                        {{item.custAge}}
                    </td>
                </tr>
                <tr>
                    <td>性别</td>
                    <td>
                        <!-- <el-input type="text" v-model="item.naturalData.custSex" class="inputLessinfo"></el-input> -->
                        {{item.custSex}}
                    </td>
                    <td>现住址</td>
                    <td>
                        <el-input type="text" v-model="item.custAddress" class="inputLessinfo"></el-input>
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
            childrenInfo: [
                {
                    title: '承租人子女1',
                    name: '1',
                    id: '', // ID
                    certNo: '', // 身份证号
                    custName: '', // 姓名
                    custSex: '', //性别
                    custHomeplace: this.$store.state.lessinfoAddress, //户籍地址
                    custAge: '', //年龄
                    custAddress: this.$store.state.lessinfoNowAddress, //现住址
                    status: '', //状态
                    sortIndex: '1'
                }
            ],
            childIndex: 1,
            nowIndextab: 1,
            tabChange: 1,
		}
	},
    props: {
        sfyzn: {
            type: Array
        }
    },
	created() {},
    mounted() {
        // this.childrenInfo = this.sfyzn;
        // this.childrenInfo.forEach((item,index) => {
        //     item['name'] = index+1 + '';
        //     item['title'] = '承租人子女' + (index+1);
        // });
        // this.childrenTabs = '1';
    },
    watch: {
        sfyzn(newVal,oldVal){
            if(newVal != undefined) {
                this.childrenInfo = this.sfyzn;
                this.childrenInfo.forEach((item,index) => {
                    item['name'] = item.sortIndex + '';
                    item['title'] = '承租人子女' + item.sortIndex;
                });
                this.childrenTabs = '1';
            }
        }
    },
	methods: {
        // 页签切换
        childChange(val) {
            this.tabChange = val.name;
        },
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
            this.tabChange++;
            this.nowIndextab++;
            this.childrenInfo.push({
                title: '承租人子女' + newTabName,
                name: newTabName,
                id: '', // ID
                certNo: '', // 身份证号
                custName: '', // 姓名
                custSex: '', //性别
                custHomeplace: '', //户籍地址
                custAge: '', //年龄
                custAddress: '', //现住址
                status: '', //状态
                sortIndex: newTabName
            });
            this.childrenTabs = newTabName;
            console.log(this.childrenInfo,this.tabChange);
        },
        removeTab(targetName) {

            if(this.childrenInfo[targetName - 1].id) {
                this.$post('/data/del',{
                    id: this.childrenInfo[targetName - 1].id,
                    type: 'custNature'
                }).then(res => {
                    if(res.data.code =='2000000') {
                        this.$message.success('承租人子女删除成功');
                        let tabs = this.childrenInfo;
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
                        this.tabChange = this.childrenInfo.length + 1;
                        this.childrenInfo = tabs.filter(tab => tab.name !== targetName);

                        // 当删除成功后后一项承租人继承前一项承租人index
                        this.childrenInfo.forEach(function(item, index, arr) {
                            item.sortIndex = index + 1;
                            item.title = '承租人子女' + parseInt(index + 1);
                            item.name = parseInt(index + 1) + '';
                            item.content = '承租人' + parseInt(index + 1);
                        })
                        this.childrenTabs = this.childrenInfo.length + '';
                        //主要防止于添加的时候错误
                        this.childIndex = this.childrenInfo.length;
                    }
                });
            }
            else {
                let tabs = this.childrenInfo;
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

                this.childrenInfo = tabs.filter(tab => tab.name !== targetName);

                // 当删除成功后后一项承租人继承前一项承租人index
                this.childrenInfo.forEach(function(item, index, arr) {
                    item.sortIndex = index + 1;
                    item.title = '承租人子女' + parseInt(index + 1);
                    item.name = parseInt(index + 1) + '';
                    item.content = '承租人' + parseInt(index + 1);
                })
                this.childrenTabs = this.childrenInfo.length + '';
                this.tabChange = this.childrenTabs;
                //主要防止于添加的时候错误
                this.childIndex = this.childrenInfo.length;
            }

            // 如果child.length === 0
            if(this.childrenInfo.length === 0){
                this.tabChange = 0;
                console.log(this.childrenInfo,this.tabChange);
                this.$emit('changeChildStatus');
            }

        },
        // 子女身份证号码校验
        idNumber(val) {
            console.log(val);
            let idcodeCheck = this.$idCard.IDcode(val);
            let nowIndex = this.tabChange - 1;
            if(idcodeCheck.Status == false) {
                this.$message.error(idcodeCheck.msg);
                return;
            }
            for(let i = 0; i < this.childrenInfo.length; i++) {
                // console.log(this.childrenInfo[i].sortIndex,i);
                console.log(this.childrenInfo[i].sortIndex,this.tabChange);
                if(this.childrenInfo[i].sortIndex == this.tabChange) {
                    this.childrenInfo[i].custSex = idcodeCheck.Sex;
                    this.childrenInfo[i].custAge = idcodeCheck.Age;
                    // console.log(this.childrenInfo[i])
                    break
                }
            }
        },
        idNumberType(val) {
            let idcontent = this.$idCard.IDcode(val.certNo);
            if(idcontent.Status == false) {
                this.$message.error(idcontent.msg);
            }

            val.custSex = idcontent.Sex;
            val.custAge = idcontent.Age;
        }
    },
}
</script>
<style lang="less">

</style>
