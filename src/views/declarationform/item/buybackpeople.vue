<template>
<div class="businfosss tabsinfo">
    <div class="subtabs newfrom">
        <div class="addbutton">
            <el-button size="small" @click="addTab(editableTabsValue)" class="el-icon-plus">
                增加回购人
            </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="changeTables">
            <el-tab-pane v-for="(item, index) of legalMan" :key="item.name" :label="item.title" :name="item.name">

                 <div class="matchingDiv">

                    <div class="matchingText">
                        商业伙伴类型
                    </div>
                    <div class="matchingText">
                        法人机构
                    </div>
                    <div class="matchingText" style="width: 25%;">
                        统一社会信用代码或回购人名称
                    </div>
                    <div class="matchingText matchId">
                        <el-input v-model="item.matchingId" maxlength="18" class="matchingId" placeholder="请输入统一社会信用代码或回购人名称">
                        </el-input>
                    </div>
                    <el-button type="primary" size="medium" @click="handleMatching(item,index)" class="matchingButton">
                        匹配信息
                    </el-button>
                 </div>
                <!-- 基本信息 -->

                <componentitle :message="message='基本信息'" class="componentitle" />
                <div class="tableTitle">
                    回购人信息
                </div>
                <!-- 回购人信息表格 -->
                <table class="lessinfoTbale">
                    <tr>
                        <td>回购人名称</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comFullname" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>统一社会信用代码</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.socialSerial" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>企业性质</td>
                        <td>
                            <el-select
                                v-model="item.basicInfo.comNature"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.comNature"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                        <td>注册资本金（万元）</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comRegisteredCapital" class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>年营业额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.basicInfo.comIncome"
                                :precision="2"
                                :step="0.1"
                                :min="0.00"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                万元
                            </span>
                        </td>
                        <td>经销商层级</td>
                        <td>
                            <el-select
                                v-model="item.basicInfo.agencyLevel"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.agencyLevel"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td>回购放负责人姓名</td>
                        <td>
                            <el-input type="text" v-model="item.basicInfo.comManager" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>回购放负责人电话</td>
                        <td>
                            <el-input
                                type="text"
                                v-model="item.basicInfo.comMobile"
                                @change="phoneChange"
                                maxlength="11"
                                class="inputLessinfo">
                            </el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>回购条件（逾期天数）</td>
                        <td>
                            <el-select
                                v-model="item.basicInfo.overdueDays"
                                class="inputLessinfo"
                                clearable
                                placeholder="请选择">
                                <el-option
                                    v-for="items in rulesField.overdueDays"
                                    :key="items.optionCode"
                                    :label="items.optionName"
                                    :value="items.optionCode">
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                </table>

                <componentitle :message="message='负债及对外担保情况'" class="componentitle" />
                <p class="tableTitle">回购人</p>

                <table class="lessinfoTbale">
                    <tr>
                        <td>债务种类</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[0].debtType" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>债务余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[0].debtBalance"
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
                        <td>担保余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[0].guaranteeBalance"
                                :precision="2"
                                :step="0.1"
                                :min="0.00"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                元
                            </span>
                        </td>
                        <td>被担保人</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[0].warrantee" class="inputLessinfo">
                            </el-input>
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
                                v-model="item.debtInfo[0].remark">
                            </el-input>
                        </td>
                    </tr>
                </table>
                <p class="tableTitle">回购方实际控制人</p>
                <table class="lessinfoTbale">
                    <tr>
                        <td>回购方实际控制人</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[1].personName" class="inputLessinfo">
                            </el-input>
                        </td>
                        <td>债务种类</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[1].debtType" class="inputLessinfo">
                            </el-input>

                        </td>
                    </tr>
                    <tr>
                        <td>债务余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[1].debtBalance"
                                :precision="2"
                                :step="0.1"
                                :min="0.00"
                                >
                            </el-input-number>
                            <span style="position:absolute;right: 10px;">
                                元
                            </span>
                        </td>
                        <td>担保余额</td>
                        <td>
                            <el-input-number
                                class="inputLessinfo"
                                v-model="item.debtInfo[1].guaranteeBalance"
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
                        <td>被担保人</td>
                        <td>
                            <el-input type="text" v-model="item.debtInfo[1].warrantee" class="inputLessinfo">
                            </el-input>

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
                                v-model="item.debtInfo[1].remark">
                            </el-input>
                        </td>
                    </tr>
                </table>
                <componentitle :message="message='回购人相关影像资料'" class="componentitle" />
                <p class="tableTitle"> 点击保存后才能上传影像资料</p>
                <div class="imgbox"
                    v-for="(imgTrees ,imgIndex) in treeData"
                    v-show="item.basicInfo.id == imgTrees.custId">
                    <div v-if="imgTrees.itemTree">
                        <template v-for="(value,indexs) in imgTrees.itemTree">
                                <h3>{{value.nodeName}}</h3>
                                <ul>
                                    <imgUpload
                                        v-for="(val,key) in value.nodes"
                                        :disabled="type === 'detail'"
                                        :name="val"
                                        :bussNo="bussNo"
                                        :relationId="item.basicInfo.id"
                                        :type="val.key"
                                        @handlePictureCardPreview="handlePictureCardPreview"/>
                                </ul>
                        </template>
                    </div>
                </div>

            </el-tab-pane>
        </el-tabs>
        <!-- 底部按钮 -->
        <div class="bottomButtonDiv matchingDiv">
            <el-button type="primary" size="medium" class="matchingButton" @click="save('save')">
                保存
            </el-button>
            <el-button type="primary" size="medium" class="matchingButton" @click="save('next')">
                下一步
            </el-button>
        </div>
    </div>

    <el-dialog
        width="90%"
        :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        <div class="demo-image__preview">
            <el-image
                style="width: 100px; height: 100px"
                :src="dialogImageUrl"
                :preview-src-list="srcList">
            </el-image>
        </div>
    </el-dialog>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import imgUpload from '../imgUpload.vue'; //图片组件
export default {
    data() {
        return {
            treeData: [],
            srcList: [],
            dialogVisible: false,
            dialogImageUrl: '',
            tabChange: 1, //存储切换的tab name
            imgFile: [],
            relationId: '', //图片影像资料需要用到的
            type: '', // 图片影像资料需要用到的
            message: '', //title
            maritalStatus: '',
            editableTabsValue: '1',
            matchingId: '', // 匹配按钮的身份证号
            otherData: [],//legalMan 承租人数组数据，因为删除页签之后会出现问题
            legalMan: [{
                title: '回购人1',
                name: '1',
                basicInfo: {
                    // 基本信息
                    id: '', //	数据ID(修改时不为空)	String
                    comFullname: '',//	回购人名称	String
                    comNature: '',//	企业性质	String
                    comRegisteredCapital: '',//	注册资金	double
                    comIncome: '',//	年营业额	double
                    agencyLevel: '',//	经销商层级	String
                    comManager: '',//	回购方负责人姓名	String
                    comMobile: '',//	回购方负责人电话	String
                    feeRequire: '',//	是否收取服务费	String
                    serviceFee: '',//	咨询服务费	double
                    partnerType: '',//	伙伴类型（方便以后扩展）	String
                    socialSerial: '', //统一社会信用代码
                },
                debtInfo: [
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    },
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    }
                ]
            }],
            tabIndex: 1
        }
    },
    created() {
    },
    props: ['rulesField','bussNo'],
    mounted() {

    },
    methods: {
        // 电话校验
        phoneChange(val) {
            let nowIndex = this.tabChange - 1;
            if(isNaN(val) == true) {
                this.legalMan[nowIndex].basicInfo.comMobile = '';
            }
            if(!(/^1[3456789]\d{9}$/.test(val))){
                this.$message.error("手机号码有误，请重填");
                this.legalMan[nowIndex].basicInfo.comMobile = '';
            }
        },
        getData() {
            this.$post('/repurchase/info',{
                bussNo: this.bussNo,
                taskType:"10"
            }).then(res => {
                if(res.data.code == '2000000') {
                    if(res.data.data.length != '0') {
                        this.legalMan = res.data.data;
                        this.legalMan.forEach(function(item,index) {
                            if(!item.debtInfo) {
                                item.debtInfo = [
                                    {
                                        id: '',//	数据ID(修改时不为空)	String
                                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                                        personName: '',//	姓名	String
                                        debtType: '',//	债务种类	String
                                        debtBalance: '',//	债务余额	double
                                        warrantee: '',//	被担保人	String
                                        guaranteeBalance: '',//	担保余额	double
                                        remark: '',//	备注	String
                                    },
                                    {
                                        id: '',//	数据ID(修改时不为空)	String
                                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                                        personName: '',//	姓名	String
                                        debtType: '',//	债务种类	String
                                        debtBalance: '',//	债务余额	double
                                        warrantee: '',//	被担保人	String
                                        guaranteeBalance: '',//	担保余额	double
                                        remark: '',//	备注	String
                                    }];
                            }
                            if(item.debtInfo || item.basicInfo) {
                                this.legalMan = res.data.data;
                                item['name'] = index + 1 + '';
                                item['title'] = "回购人" + parseInt(index + 1);
                            }
                            this.imgData();
                        }.bind(this));
                        this.tabIndex = res.data.data.length;
                    }
                }
            });
        },
        handlePictureCardPreview(file) { // 图片浏览功能
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        addTab(targetName) {
            let newTabName = ++this.tabIndex + '';
            this.otherData = this.legalMan;
            this.tabChange++;
            this.legalMan.push({
                title: '回购人' + newTabName,
                name: newTabName,
                basicInfo: {
                    // 基本信息
                    id: '', //	数据ID(修改时不为空)	String
                    comFullname: '',//	回购人名称	String
                    comNature: '',//	企业性质	String
                    comRegisteredCapital: '',//	注册资金	double
                    comIncome: '',//	年营业额	double
                    agencyLevel: '',//	经销商层级	String
                    comManager: '',//	回购方负责人姓名	String
                    comMobile: '',//	回购方负责人电话	String
                    feeRequire: '',//	是否收取服务费	String
                    serviceFee: '',//	咨询服务费	double
                    partnerType: '',//	伙伴类型（方便以后扩展）	String
                    socialSerial: '', //统一社会信用代码
                },
                debtInfo: [
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    },
                    {
                        id: '',//	数据ID(修改时不为空)	String
                        repurchaseType: '',//	回购人类型1:回购人 2:回购方实际控制人String
                        personName: '',//	姓名	String
                        debtType: '',//	债务种类	String
                        debtBalance: '',//	债务余额	double
                        warrantee: '',//	被担保人	String
                        guaranteeBalance: '',//	担保余额	double
                        remark: '',//	备注	String
                    }
                ]
            });
            this.editableTabsValue = newTabName;
        },
        removeTab(targetName) {
            if(this.legalMan[targetName - 1].basicInfo.id) {
                this.$post('/data/del',{
                    id: this.legalMan[targetName - 1].basicInfo.id,
                    type: 'custLegal'
                }).then(res => {
                    if(res.data.code =='2000000') {
                        this.$message.success('回购人删除成功');
                    }
                });
            }

            let tabs = this.legalMan;
            let activeName = this.editableTabsValue;

            // 至少要保留一个
            if (this.legalMan.length == 1) {
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
            this.legalMan = tabs.filter(tab => tab.name !== targetName);

            // 当删除成功后后一项承租人继承前一项承租人index
            this.legalMan.forEach(function(item, index, arr) {
                item.title = '回购人' + parseInt(index + 1);
                item.name = parseInt(index + 1) + '';
                item.content = '回购人' + parseInt(index + 1);
            })
            this.editableTabsValue = this.legalMan.length + '';
            //主要防止于添加的时候错误
            this.tabIndex = this.legalMan.length;

        },
        imgData() {
            this.$post('/buss/materialTree',{
                bussNo: this.bussNo
            }).then(res => {
                if(res.data.code == '2000000') {
                    if(res.data.data.repurchase.length == '0') {
                        return;
                    }
                    this.treeData = res.data.data.repurchase;
                    // this.treeData = res.data.data.repurchase;
                    // let treeInfo = res.data.data.repurchase[this.tabChange - 1].itemTree;
                    // this.relationId = res.data.data.repurchase[this.tabChange - 1].custId;
                    // console.log(this.relationId);
                    // let tempArr = [];
                    // Object.keys(treeInfo).forEach((key) => {
                    //     tempArr.push(treeInfo[key]);
                    // });
                    // this.imgFile = tempArr;
                }
            });
        },

// 匹配信息按钮
        handleMatching(item,index) {
            // 主办人
            this.$post('/bussPartner/info', {
                bussType:'HG',
                partnerType: 'LEG',
                partnerSerial: item.matchingId
            }).then(res => {
                if (res.data.code == '2000000') {
                    if(res.data.data.repoMan === undefined){ // 如果data是空的，直接提示内容为空
                        this.$message.error('无对应信息');
                    } else {
                        if(this.legalMan[index].basicInfo.id) {
                            this.$post('/data/del',{
                                id: this.legalMan[index].basicInfo.id,
                                type: 'custLegal'
                            }).then(res2 => {
                                if(res2.data.code =='2000000') {
                                    this.addMatch(res,index);
                                }
                            });
                        }else{
                            this.addMatch(res,index);
                        }
                    }
                }
            });
        },
        addMatch(res,index){
            console.log(res.data.data.repoMan,'res.data.data.repoMan');
            let obj = {...this.legalMan[index],...res.data.data.repoMan,id:''};
            obj.sortIndex = index+1;
            console.log(obj,'obj');
            this.legalMan.splice(index,1,obj);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(()=>{
                this.$emit("saveData");
            },3000);
            setTimeout(()=>{
                // 获取url上是否有单号
                let bussNo = this.$route.query.bussNo;
                // 如果没有就拼上，否则就是直接刷新
                if(!bussNo){
                    window.location.href = window.location.href + '?bussNo=' + this.bussNo;
                }
                window.location.reload();
            },5000);
        },

        // 页签切换
        changeTables(val) {
            this.tabChange = val.name;
        },
        save(param) { // 保存页面或者下一步
            if(param === 'save'){
                this.$emit("saveData");
            }else{
                this.$emit('update:bindText','租赁物信息')
            }
        },
        // 保存
        saveData() {

            this.legalMan.forEach(function(item,index) { // 删除子tab 的name 和title 因为后台用不了传过去报错
                delete item.name;
                delete item.title;
            });
            this.$post('repurchase/add',{
                bussNo: this.bussNo,
                legalMan: this.legalMan
            }).then(res => {
                if(res.data.code == 2000000) {
                    this.$message.success('回购人保存成功');
                    this.legalMan.forEach(function(item,index) { //用于ajax提交完成后返回删除的tab name 和title
                        item['name'] = index + 1 + '';
                        item['title'] = '承租人' + parseInt( index + 1);
                    });
                    this.$emit('childVal',this.legalMan); // 子传父 承租人数据传递给父组件
                 }
            });
        },
        // 下一步
        next() {
            this.save();
        },

        tabsFor(arrList) {
            arrList.forEach(function(item) {
                delete item.title;
                delete item.name;
            });
        },

        handlePictureCardPreview(file,imgUrls) { // 图片浏览功能
            this.dialogImageUrl = file.url;
            this.srcList.push(file.url);
            this.dialogVisible = true;
        },

},
    components: {
        componentitle,

        imgUpload
    }
}
</script>
<style lang="less">
.newfrom {
    .addbutton {
        margin: 10px 0;
    }
    .matchingDiv {
        .matchingText {
            display: inline-block;
            font-size: 14px;
            width: 15%;
            text-align: center;
            border: 1px solid #e5e5e5;
            height: 50px;
            border-right: 0;
            line-height: 50px;
            .matchingId {
                width: 90%;
            }
        }
        .matchId {
            width: 30% !important;
            border-right: 1px solid #e5e5e5 !important;
        }
        .matchingButton {
            background: #ff8f2b;
            border: 0;
            margin-left: 10px;
        }
    }
    .tableTitle {
        font-size: 14px;
        margin: 20px 10px;
    }
    .lessinfoTbale {
        width: 100%;
        tr td {
            font-size: 14px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border: 1px solid #e5e5e5;
            position: relative;
            .inputLessinfo {
                width: 80%;
            }
        }
    }
    .bottomButtonDiv {
        width: 200px;
        margin: 20px auto;
    }
    .imgbox {
        border: 1px solid #EBEEF5;
        margin: 20px 0px;
        border-bottom: 0;
        h3 {
            font-size: 16px;
            font-weight: 700;
            background: #f5f5f5;
            height: 50px;
            line-height: 50px;
            padding-left: 15px;
            color: #585858;
        }
    }
}
</style>
