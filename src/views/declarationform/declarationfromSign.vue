<template>
    <div class="loanapproval">
        <div class="content">
            <h3 class="titleh3">
                <div class="el-icon-back back" @click="backUrl">
                    返回
                </div>
            </h3>
            <el-tabs v-if="bussNo"
                     type="border-card"
                     tab-click="tabClick"
                     v-model="bindText"
                     :before-leave = "beforeLeave"
            >
                <el-tab-pane :label="list.lease" :name="list.lease">
                    <!--    bussNo:业务编号  bindText:跳转tabs   -->
                    <wantfactor ref="lease" :bussNo="bussNo" :bindText.sync="bindText" @saveData="lease"/>
                </el-tab-pane>
                <el-tab-pane :label="list.rentpeople" :name="list.rentpeople">
                    <lesseeinfo ref="rentpeople" :bussNo="bussNo" :rulesField="rulesField" @saveData="rentpeople" :bindText.sync="bindText"/>
                </el-tab-pane>
                <el-tab-pane :label="list.guarantor" :name="list.guarantor">
                    <guarantor ref="guarantor" :bussNo="bussNo" :rulesField="rulesField" @saveData="guarantor" :bindText.sync="bindText" />
                </el-tab-pane>
                <el-tab-pane :bussNo="bussNo" :label="list.repurchase" :name="list.repurchase">
                    <buybackpeople ref="repurchase" :bussNo="bussNo" :rulesField="rulesField" @saveData="repurchase" :bindText.sync="bindText"/>
                </el-tab-pane>
                <el-tab-pane :label="list.leasehold" :name="list.leasehold">
                    <leasehold ref="leasehold" :bussNo="bussNo" :bindText.sync="bindText" @saveData="leasehold"/>
                </el-tab-pane>
                <el-tab-pane :label="list.externalnews" :name="list.externalnews">
                    <externalinfo ref="externalnews" :bussNo="bussNo" :bindText.sync="bindText" @saveData="externalnews"/>
                </el-tab-pane>
                <el-tab-pane :label="list.investigation" :name="list.investigation">
                    <investigation ref="investigation" :bussNo="bussNo" :bindText.sync="bindText" @saveData="investigation"/>
                </el-tab-pane>
                <el-tab-pane :label="list.evaluate" :name="list.evaluate">
                    <evaluate ref="evaluate" :bussNo="bussNo" :bindText.sync="bindText" @saveData="evaluate"/>
                </el-tab-pane>
                <el-tab-pane :label="list.approvalOpinion" :name="list.approvalOpinion">
                    <approvalOpinion ref="approvalOpinion" :bussNo="bussNo" :bindText.sync="bindText" @saveData="approvalOpinion"/>
                </el-tab-pane>
                <!--            <el-tab-pane :label="list.loan" :name="list.loan">-->
                <!--                <clauseTable />-->
                <!--            </el-tab-pane>-->
            </el-tabs>
        </div>

    </div>
</template>

<script  type="text/ecmascript-6">
    import wantfactor from './item/wantfactor.vue'; //租赁要素
    import lesseeinfo from './item/lesseeinfo.vue'; //承租人信息
    import guarantor from './item/guarantor.vue'; //保证人信息
    import buybackpeople from './item/buybackpeople.vue'; //回购人信息
    import leasehold from './item/leasehold.vue'; //租赁物信息
    import externalinfo from './item/externalinfo.vue'; //外部信息
    import investigation from './item/investigation.vue'; //增信措施及综素
    import evaluate from './item/evaluate.vue'; //调查结论及风险评价
    import approvalOpinion from './item/approvalOpinion.vue'; //审批意见
    // import clauseTable from './item/clauseTable.vue'; //商业条款表

    export default {
        data() {
            return {
                lessinfosData: [], //储存承租人信息
                list: {
                    lease: '租赁要素',
                    rentpeople: '承租人信息',
                    guarantor: '保证人信息',
                    repurchase: '回购人信息',
                    leasehold: '租赁物信息',
                    externalnews: '外部信息',
                    investigation: '增信措施及综素',
                    evaluate: '调查结论及风险评价',
                    approvalOpinion: '审批意见'
                },
                bindText: '租赁要素',
                rulesField: {}, // 字典编码
                bussNo:'',
                leaseInfoData: [],// 承租人
                guarantorData: [], // 保证人数据
                repurchaseData: [], //回购人
            }
        },
        created() {

            // 获取订单号
            this.bussNo = this.$route.query.bussNo; // 从url上获取
            if(!this.bussNo){ // url上没有参数
                this.getBussNo();
            }
            // 字典编码
            this.$post('/getConstantConfig', {
                dictionaryCode: [
                    'overdueDays', //回购条件
                    'leaseMode',  //租赁模式选项
                    'comNature', //企业性质
                    'agencyLevel', //经销商层级
                    'feeRequire', // 咨询服务费
                    'partnerType', // 伙伴类型
                    'bussType', // 业务类型
                    'custType', // 客户类别
                    'custSex', //性别
                    'custEducation', //教育程度
                    'custMarriage', //婚姻状况
                    'hasChildren',//是否有子女
                    'certType', //证件类型
                    'custRelation' ,// 与承租人关系
                    'payWay', //租金支付方式
                    'serialNoType', //识别码类型
                    'mortgage' , //是否抵押
                    'hasCreditReport', //征信报告有无
                    'hasLawsuit', //是否涉诉
                    'hasEnforced', //是否被执行
                    'haveCertificate',//是否有房产证明
                    'houseType', //房产类别
                    'checkMode', //土地核实方法
                    'isGuarantee', //有无担保
                    'repayRate', //还款频率
                    'payType', //还租方式
                    'serialNumberType', //识别号类型
                    'InsurancePurchaseTime', //保险购买时间
                    'contractType', //合同类型
                    'costType', //费用类型
                    'identityType' ,//身份类型
                    'creditAdditionType', //增信类型
                    'receiptType' ,// 收款类型
                    'fileSuffix', // 合同文件后缀
                    'calcType', //计息方式
                    'marriageSettlement', //有无离婚协议
                    'rebateDate', //返利时间
                    'invoice', //是否有发票
                    'certEndDateOption', //证件长期有效
                ]
            }).then(res => {
                if(res.data.code == 2000000) {
                    this.rulesField = res.data.data;
                }
            });
        },
        methods: {

            getBussNo(){ // 生成订单号
                this.$post('/buss/genBussNo',{
                    leaseMode:'ZZ02'
                }).then(res => {
                    this.bussNo = res.data.data.bussNo;
                });
            },
            beforeLeave:function(activeName, oldActiveName){ // 切换处理
                /**
                 * 思路:
                 *  1.获取新打开标签和以前标签的名字
                 *  2.通过名字获取对应的标签
                 *  3.通过对应的标签获取对应的数据 (通过ref获取)
                 *  4.对旧标签对应的数据执行保存操作
                 *  5.保存成功之后切换到新的页签
                 *  6.保存失败返回false，不跳转，弹出错误提示
                 *  7.return true
                 */

                let ref = this.getKey(oldActiveName);
                // 保存数据
                return this[ref](activeName);
            },
            lease(activeName) { // 租赁要素save方法
                let leaseInfo = this.$refs.lease.leaseInfo;
                let rentFactor = this.$refs.lease.rentFactor;
                return new Promise((resolve, reject) => {
                    Promise.all([
                        this.$post('/leaseinfo/addElement', {...leaseInfo, bussNo: this.bussNo}),
                        this.$post('/contractclause/add', {orderData:{},clauseData:rentFactor, bussNo: this.bussNo})
                    ]).then((data) => {
                        if (data[0].data.resultCode === '2000000' && data[1].data.resultCode === '2000000') {
                            resolve();
                        } else {
                            this.$message.warning({message: data.data.resultMsg, duration: 2000})
                            resolve();
                        }
                    }).catch(() => {
                        activeName && this.initData(activeName);
                        resolve();
                    })
                });
            },
            rentpeople(res) {

                this.$refs.rentpeople.naturalData.forEach((item,i) => {
                    item.assetsHouses = this.$refs.rentpeople.$refs.house[i].assetsHouses;
                    item.incomeFarmMachineryWork = this.$refs.rentpeople.$refs.agriculture[i].incomeFarmMachineryWork;
                    item.assetsOthers = this.$refs.rentpeople.$refs.assetsOthers[i].assetsOthers;
                    item.debtSituations = this.$refs.rentpeople.$refs.debt[i].debtSituations;
                    item.assetsFarmTools = this.$refs.rentpeople.$refs.farmtools[i].assetsFarmTools;
                    item.assetsFinances = this.$refs.rentpeople.$refs.financial[i].assetsFinances;
                    item.debtGuarantees = this.$refs.rentpeople.$refs.guarantee[i].debtGuarantees;
                    item.assetsVehicles = this.$refs.rentpeople.$refs.homecar[i].assetsVehicles;
                    item.assetsLands = this.$refs.rentpeople.$refs.lands[i].assetsLands;
                    item.incomeOthers = this.$refs.rentpeople.$refs.otherIncome[i].incomeOthers;
                    item.debtOthers = this.$refs.rentpeople.$refs.otherLiabilities[i].debtOthers;
                    item.incomePlants = this.$refs.rentpeople.$refs.plant[i].incomePlants
                });
                this.leaseInfoData = this.$refs.rentpeople.naturalData;
                this.$post('/leasee/add',{
                    bussNo: this.bussNo,
                    data: this.leaseInfoData
                }).then(res => {
                    if(res.data.code == 2000000) {
                        this.$message.success('承租人保存成功');

                     }
                });
            },
            guarantor() {

                let data = this.$refs.guarantor.warrantorDatas;
                this.$refs.guarantor.allTabData(data);
                console.log(data,'<<<<::::::保证人');
                this.$post('/warrantor/add',{
                    bussNo: this.bussNo,
                    data: data
                }).then(res => {
                    if(res.data.code == 2000000) {
                        this.$message.success('保证人保存成功');
                     }
                });
            },
            repurchase() {
                this.repurchaseData = this.$refs.repurchase.legalMan;
                this.repurchaseData.forEach(function(item,index) { // 删除子tab 的name 和title 因为后台用不了传过去报错
                    delete item.name;
                    delete item.title;
                });
                this.$post('repurchase/add',{
                    bussNo: this.bussNo,
                    legalMan: this.repurchaseData
                }).then(res => {
                    if(res.data.code == 2000000) {
                        this.$message.success('回购人保存成功');
                        this.repurchaseData.forEach(function(item,index) { //用于ajax提交完成后返回删除的tab name 和title
                            item['name'] = index + 1 + '';
                            item['title'] = '承租人' + parseInt( index + 1);
                        });
                        // this.$emit('childVal',this.legalMan); // 子传父 承租人数据传递给父组件
                     }
                });
            },
            leasehold(activeName) { // 租赁物信息save方法
                let leaseInfo = this.$refs.leasehold.rentInfo;
                return new Promise((resolve, reject) => {
                    leaseInfo.insurance.firstBeneficiary = '哈银金融租赁有限责任公司';
                    this.$post('/leaseinfo/add', {
                        bussNo: this.bussNo,
                        lists: [{...leaseInfo,calcType:'DAY'}]
                    }).then(() => {
                        activeName && this.initData(activeName);
                        resolve();
                    }).catch(() => {
                        reject();
                    })
                });

                return new Promise((resolve, reject) => {
                    this.$post('/leasee/add',{
                        bussNo: this.bussNo,
                        data: this.leaseInfoData
                    }).then(res => {
                        if(res.data.code == 2000000) {
                            this.$message.success('承租人保存成功');
                            this.leaseInfoData.forEach(function(item,index) { //用于ajax提交完成后返回删除的tab name 和title
                                item['name'] = index + 1 + '';
                                item['title'] = '承租人' + parseInt( index + 1);
                                item.assetsHouses.forEach(function(subItem,indexs) {
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '房产' + parseInt( indexs + 1);
                                });
                                item.childrenInfo.forEach(function(subItem,indexs) { // 子女
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '承租人子女' + parseInt( indexs + 1);
                                });

                                item.assetsLands.forEach(function(subItem,indexs) { // 土地
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '土地' + parseInt( indexs + 1);
                                });

                                item.assetsFinances.forEach(function(subItem,indexs) { // 金融资产
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '金融资产' + parseInt( indexs + 1);
                                });

                                item.assetsVehicles.forEach(function(subItem,indexs) { // 自用车
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '自用车' + parseInt( indexs + 1);
                                });

                                item.assetsFarmTools.forEach(function(subItem,indexs) { // 农机具
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '农机具' + parseInt( indexs + 1);
                                });

                                item.assetsOthers.forEach(function(subItem,indexs) { // 其他资产
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '其他资产' + parseInt( indexs + 1);
                                });

                                item.debtSituations.forEach(function(subItem,indexs) { // 债务情况
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '债务情况' + parseInt( indexs + 1);
                                });

                                item.debtGuarantees.forEach(function(subItem,indexs) { // 对外担保
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '对外担保' + parseInt( indexs + 1);
                                });

                                item.debtOthers.forEach(function(subItem,indexs) { // 其他负债
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '其他负债' + parseInt( indexs + 1);
                                });

                                item.incomePlants.forEach(function(subItem,indexs) { // 种植收入
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '种植收入' + parseInt( indexs + 1);
                                });

                                item.incomeFarmMachineryWork.forEach(function(subItem,indexs) { // 农机作业收入
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '农机作业收入' + parseInt( indexs + 1);
                                });

                                item.incomeOthers.forEach(function(subItem,indexs) { // 其他收入
                                    subItem['name'] = indexs + 1 + '';
                                    subItem['title'] = '其他收入' + parseInt( indexs + 1);
                                });
                            });
                         }
                    });
                });
            },
            externalnews(activeName) {
                let surveyInformation = this.$refs.externalnews.surveyInformation;
                return new Promise((resolve, reject) => {
                    this.$post('/surveyinformation/add', {
                        bussNo: this.bussNo,
                        surveyInformation:surveyInformation
                    }).then(() => {
                        activeName && this.initData(activeName);
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                });
            },
            investigation(activeName) {
                let houseMortgager = this.$refs.investigation.houseMortgager;
                let landMortgager = this.$refs.investigation.landMortgager;
                return new Promise((resolve, reject) => {
                    // 房产抵押信息，土地使用权抵押信息
                    this.$post('/additioncredit/add', {
                        bussNo: this.bussNo,
                        houseMortgager: [houseMortgager],
                        landMortgager: [landMortgager]
                    }).then(() => {
                        activeName && this.initData(activeName);
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                });
            },
            evaluate(activeName) {
                let sponsor = this.$refs.evaluate.sponsor;
                return new Promise((resolve, reject) => {
                    // 主办人
                    this.$post('/setSurveyEvaluation', {
                        bussNo: this.bussNo,
                        ...sponsor,
                        ownerType: 'ZB'
                    }).then(() => {
                        activeName && this.initData(activeName);
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                });
            },
            approvalOpinion(activeName) {
                let sponsor = this.$refs.approvalOpinion.opinion;
                return new Promise((resolve, reject) => {
                    // 主办人
                    this.$post('/setMainSubmitOpinion', {
                        bussNo: this.bussNo,
                        ...sponsor,
                        ownerType: 'ZB'
                    }).then(() => {
                        activeName && this.initData(activeName);
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                });

            },
            getKey (name){
                let val = '';
                Object.keys(this.list).forEach(item => {
                    if (this.list[item] === name)
                        val = item;
                });
                return val;
            },
            initData(activeName){
                let ref = this.getKey(activeName);
                this.$refs[ref].getData();
            },
            backUrl() {
                this.$router.push({
                    path: '/layout/declarationfrom',
                });
            },
            // 整合所有tab的数据
            allTabData() {

                // console.log(assetschild);
                // console.log(this.$refs.headerChild,'承租人子女') //承租人子女
                // console.log(this.$refs.house,'房产')  //房产
                // console.log(this.$refs.lands,'土地（含代收代耕）（如有）') //土地（含代收代耕）（如有）
                // console.log(this.$refs.financial,'金融资产')  // 金融资产
                // console.log(this.$refs.homecar,'自用车') // 自用车
                // console.log(this.$refs.farmtools,'农机具') //农机具
                // console.log(this.$refs.assetsOthers,'其他资产')  // 其他资产
                // console.log(this.$refs.debt,'债务情况') // 债务情况
                // console.log(this.$refs.guarantee,'对外担保') // 对外担保
                // console.log(this.$refs.otherLiabilities,'其他负债')  // 其他负债
                // console.log(this.$refs.plant,'种植收入') //种植收入
                // console.log(this.$refs.agriculture,'农机作业收入') //农机作业收入
                // console.log(this.$refs.otherIncome,'其他收入') //其他收入
                // this.tabsFor(this.naturalData)
                // if(this.leaseInfoData.hasChildren == "Y") {
                for(let i = 0; i < this.$refs.headerChild.length; i++) {
                    this.leaseInfoData[i].childrenInfo = this.$refs.headerChild[i].childrenInfo
                }
                // }

                for(let i = 0; i < this.$refs.house.length; i++) {
                    this.leaseInfoData[i].assetsHouses = this.$refs.house[i].assetsHouses;
                }
                for(let i = 0; i < this.$refs.lands.length; i++) {
                    this.leaseInfoData[i].assetsLands = this.$refs.lands[i].assetsLands
                }
                for(let i = 0; i < this.$refs.financial.length; i++) {
                    this.leaseInfoData[i].assetsFinances = this.$refs.financial[i].assetsFinances
                }
                for(let i = 0; i < this.$refs.homecar.length; i++) {
                    this.leaseInfoData[i].assetsVehicles = this.$refs.homecar[i].assetsVehicles
                }
                for(let i = 0; i < this.$refs.farmtools.length; i++) {
                    this.leaseInfoData[i].assetsFarmTools = this.$refs.farmtools[i].assetsFarmTools
                }
                for(let i = 0; i < this.$refs.assetsOthers.length; i++) {
                    this.leaseInfoData[i].assetsOthers = this.$refs.assetsOthers[i].assetsOthers
                }
                for(let i = 0; i < this.$refs.debt.length; i++) {
                    this.leaseInfoData[i].debtSituations = this.$refs.debt[i].debtSituations
                }
                for(let i = 0; i < this.$refs.guarantee.length; i++) {
                    this.leaseInfoData[i].debtGuarantees = this.$refs.guarantee[i].debtGuarantees
                }
                for(let i = 0; i < this.$refs.otherLiabilities.length; i++) {
                    this.leaseInfoData[i].debtOthers = this.$refs.otherLiabilities[i].debtOthers
                }
                for(let i = 0; i < this.$refs.plant.length; i++) {
                    this.leaseInfoData[i].incomePlants = this.$refs.plant[i].incomePlants
                }
                for(let i = 0; i < this.$refs.agriculture.length; i++) {
                    this.leaseInfoData[i].incomeFarmMachineryWork = this.$refs.agriculture[i].incomeFarmMachineryWork
                }
                for(let i = 0; i < this.$refs.otherIncome.length; i++) {
                    this.leaseInfoData[i].incomeOthers = this.$refs.otherIncome[i].incomeOthers
                }
            },
        },
        components: {
            wantfactor, //租赁要素
            lesseeinfo, //承租人信息
            guarantor, //保证人信息
            buybackpeople, //回购人信息
            leasehold, //租赁物信息
            externalinfo, //外部信息
            investigation, //调查环节
            evaluate,  //调查结论及风险评价
            approvalOpinion,  //审批意见
            // clauseTable //商业条款表
        },
        beforeRouteLeave (to, from, next) {
            // 通过订单号查询订单状态，如果订单数据不全，那么就提示弹框，如果继续离开就离开，否则取消离开
            this.$post('/giveUpEditNoticeDelete', { // 发起ajax查询订单状态
                bussNo: this.bussNo
            }).then(res => {
                if (res.data.data.deleteFlag === 'N') {
                    next();
                } else { // 如果数据不全，弹框
                    this.$confirm('退出后此单将作废，如果不想作废请填写完整租赁要素与承租人信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        next();
                    }).catch(() => {
                        next(false);
                    });
                }
            });
        }
    }
</script>
<style lang="less">
    .content {
        width: 96%;
        margin: 0 auto;
        .titleh3 {
            font-size: 14px;
            margin: 15px 0;
        }
        .back {
            cursor: pointer;
            font-size: 15px;
        }
        .el-tabs--border-card>.el-tabs__content {
            padding: 0;
        }
        .urlTextt {
            color: #333;
            text-decoration: none;
        }
        .el-icon-arrow-right {
            color: #333;
        }
        .el-tabs--border-card>.el-tabs__header {
            border-bottom: 2px solid #ff8f2b;
            padding-bottom: 1px;
        }
        .el-tabs--border-card {
            border: 0;
            box-shadow: 0 0 0 0;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item {
            border-top: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            margin-left: 2px !important;
            margin-top: 0;
            &:first-child {
                margin-left: 0 !important;
            }
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
            background: #ff8f2b !important;
            color: #fff;
        }
        .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
            background: #ff8f2b !important;
            color: #fff;
        }
        .el-tabs--border-card>.el-tabs__header {
            background: #fff;
        }
    }

</style>
