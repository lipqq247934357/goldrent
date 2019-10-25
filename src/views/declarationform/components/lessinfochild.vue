<template>
<div class="lesseeinfoChild">
    <div class="addbutton">
        <el-button size="small" @click="addTab(childrenTabs)" class="el-icon-plus">
            增加承租人子女
        </el-button>
    </div>
    <el-tabs v-model="childrenTabs" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
            v-for="(item, index) of childrenInfo"
            :key="item.name"
            :label="item.title" :name="item.name">
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
                        <el-input @change="idNumber" type="text" maxlength="18" class="inputLessinfo" v-model="item.certNo">
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
                    status: '' //状态
                }
            ],
            childIndex: 1
		}
	},
    props: {
        sfyzn: {
            type: Array
        }
    },
	created() {},
    mounted() {
    },
    watch: {
        sfyzn(newVal,oldVal){
            if(newVal != undefined) {
                this.childrenInfo = this.sfyzn;
                this.childrenInfo.forEach((item,index) => {
                    console.log(index);
                    item['name'] = index+1 + '';
                    item['title'] = '承租人子女' + (index+1);
                });
                this.childrenTabs = '1';
            }
        }
    },
	methods: {
        addTab(targetName) {
            let newTabName = ++this.childIndex + '';
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
                status: '' //状态
            });
            this.childrenTabs = newTabName;
            console.log(this.childrenInfo);
        },
        removeTab(targetName) {

            // 至少要保留一个
            if (this.childrenInfo.length == 1) {
                return;
            }

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
                    this.childrenInfo = tabs.filter(tab => tab.name !== targetName);

                    // 当删除成功后后一项承租人继承前一项承租人index
                    this.childrenInfo.forEach(function(item, index, arr) {
                        item.title = '承租人子女' + parseInt(index + 1);
                        item.name = parseInt(index + 1) + '';
                        item.content = '承租人' + parseInt(index + 1);
                    })
                    this.childrenTabs = this.childrenInfo.length + '';
                    //主要防止于添加的时候错误
                    this.childIndex = this.childrenInfo.length;
                }
            });


        },
        // 子女身份证号码校验
        idNumber(val) {
            let idcodeCheck = this.$idCard.IDcode(val);
            let nowIndex = this.childIndex - 1;
            if(idcodeCheck.Status == false) {
                this.$message.error(idcodeCheck.msg);
                return;
            }
            setTimeout(function() {
                this.childrenInfo[nowIndex].custSex = idcodeCheck.Sex;
                this.childrenInfo[nowIndex].custAge = idcodeCheck.Age;
            }.bind(this),100);
        }
    },
}
</script>
<style lang="less">

</style>
