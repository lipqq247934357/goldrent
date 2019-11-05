<template>
<div class="leasehold">
    <componentitle :message="message='租赁物信息'" />
    <div class="leasegoodsinfo" v-for="item in rentinfo">
        <div class="assetsinfoul">
            <h3>租赁物情况</h3>
            <table border="1" class="lessinfoTbale">
                <tr>
                    <td>租赁物名称及规格型号</td>
                    <td>
                        <el-input
                                :rows="2"
                                class="tdinput"
                                placeholder=""
                                readonly
                                type="textarea"
                                v-model="item.condition.leaseName">
                        </el-input>
                    </td>
                    <td>交付地点</td>
                    <td>{{item.condition.deliveryPlace}}</td>
                </tr>
                <tr>
                    <td>购置价格(元)</td>
                    <td>{{item.condition.purchasePrice && formatNumber(item.condition.purchasePrice)}}</td>
                    <td>是否抵押登记</span>
                    <td>{{item.condition.mortgage == "Y" ? '是': item.condition.mortgage == "N" ? '未抵押' : '抵押'}}</td>
                </tr>

                <tr>
                    <td>唯一识别码</td>
                    <td>
                        <el-input
                                :rows="2"
                                class="tdinput"
                                placeholder=""
                                readonly
                                type="textarea"
                                v-model="item.condition.serialNo">
                        </el-input>
                    </td>
                    <td>抵押管理机关</td>
                    <td>{{item.condition.mortgageAgency}}</td>
                </tr>

                <tr>
                    <td>识别号类型</td>
                    <td v-for="nuType in statuslist.serialNumberType" v-if="item.condition.serialNoType == nuType.optionCode">{{nuType.optionName}}</td>
                    <td v-if="item.condition.serialNoType == null"></td>
                </tr>

            </table>
        </div>
        <div class="assetsinfoul">
        <h3>租赁物保险</h3>
        <ul class="infolist ulisthostcss">
            <li>
                <span>险种</span>
                <span>
                    {{item.insurance.insuranceType}}
                </span>
            </li>
            <li>
                <span>保险公司</span>
                <span>{{item.insurance.insuranceCompany}}</span>
            </li>
            <li>
                <span>保额（元）</span>
                <span>{{item.insurance.coverage && formatNumber(item.insurance.coverage)}}</span>
            </li>
            <li>
                <span>保险期限（月）</span>
                <span>{{item.insurance.insuranceTerm}}</span>
            </li>
            <li>
                <span>购买时间</span>
                <span
                    v-for="subitemtype in statuslist.insurancePurchaseTime"
                    v-if="subitemtype.optionCode == item.insurance.insuranceBuyTime">
                    {{subitemtype.optionName}}
                </span>
                <span v-if="item.insurance.insuranceBuyTime == ''"></span>
            </li>

            <li>
                <span>第一受益人</span>
                <span>{{item.insurance.firstBeneficiary}}</span>
            </li>
            <br>
            <li class="subliWidth">
                <p class="bz">备注</p>
                <div class="batextarrear">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder=""
                        class="inputtext"
                        readonly
                        v-model="item.insurance.remark">
                    </el-input>
                </div>
            </li>
        </ul>
    </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import {formatNumber} from '../../../components/mixins/formatter/index';

export default {
    data() {
        return {
            message: '',
            rentinfo: [], //租赁物
            statuslist: {
                insurancePurchaseTime: [],
                serialNumberType: []
            },
        }
    },
    created() {
        // 字典编码
        this.$post('/getConstantConfig',{
            dictionaryCode: ['InsurancePurchaseTime','serialNumberType']
        }).then(res => {
            this.statuslist.insurancePurchaseTime = res.data.data.InsurancePurchaseTime;
            this.statuslist.serialNumberType = res.data.data.serialNumberType;
        })
        this.$post('/leaseinfo/query',{
             bussNo: this.$route.query.bussNo
        }).then( res => {
            // 返回示例
            // {
            //     "msg": "success",
            //     "code": "2000000",
            //     "data": {
            //         "bussNo": "1111111111",
            //         "lists": [
            //             {
            //                 "insurance": {
            //                     "firstBeneficiary": "老子",
            //                     "insuranceBuyTime": "2019-04-11T16:00:00.000+0000",
            //                     "insuranceTerm": "20",
            //                     "remark": "该吃吃,该喝喝,该玩玩",
            //                     "id": "d4c208f026464838a8302ba31b62bc43",
            //                     "insuranceType": "失身险",
            //                     "coverage": "0.000000",
            //                     "insuranceCompany": "中国人寿保险"
            //                 },
            //                 "condition": {
            //                     "serialNoType": "01",
            //                     "mortgage": "Y",
            //                     "bussNo": "1111111111",
            //                     "leaseName": "租赁物名称",
            //                     "id": "d4c208f026464838a8302ba31b62bc43",
            //                     "purchasePrice": 1000,
            //                     "mortgageAgency": "金融机构",
            //                     "serialNo": "only0001",
            //                     "deliveryPlace": "北京市朝阳区高碑店"
            //                 }
            //             },
            //             {
            //                 "insurance": {
            //                     "firstBeneficiary": "老子",
            //                     "insuranceBuyTime": "2019-04-11T16:00:00.000+0000",
            //                     "insuranceTerm": "20",
            //                     "remark": "该吃吃,该喝喝,该玩玩",
            //                     "id": "ece09b7d8cf1467b88900c0104750671",
            //                     "insuranceType": "失身险2",
            //                     "coverage": "0.000000",
            //                     "insuranceCompany": "中国人寿保险"
            //                 },
            //                 "condition": {
            //                     "serialNoType": "01",
            //                     "mortgage": "Y",
            //                     "bussNo": "1111111111",
            //                     "leaseName": "租赁物名称2",
            //                     "id": "ece09b7d8cf1467b88900c0104750671",
            //                     "purchasePrice": 1000,
            //                     "mortgageAgency": "金融机构",
            //                     "serialNo": "only0001",
            //                     "deliveryPlace": "北京市朝阳区高碑店"
            //                 }
            //             }
            //         ]
            //     }
            // }
            if(res.data.code == '2000000') {
                this.rentinfo = res.data.data.lists;
            }
        });
    },
    components: {
        componentitle,

    },methods:{
        formatNumber
    }
}
</script>
<style lang="less">
.leasehold {
    .assetsinfoul {
        h3 {
            background: #f5f5f5;
            margin: 0;
            margin-top: -5px;
            position: relative;
            height: 50px;
            line-height: 50px;
            color: #585858;
            border: 1px solid #afafaf;
            padding-left: 15px;
            font-size: 14px;
        }
    }
    .ulisthostcss {
        margin-top: -1px;
    }
    .lessinfoTbale {
        width: 100%;
        border: 1px solid #afafaf;
        border-top: 0;
        line-height: 50px;
        text-align: center;
        color: #606266;
        tr {
            td {
                &:nth-child(1) {
                    width: 16%;
                    color: #212121;
                }
                &:nth-child(2) {
                    width: 34%;
                }
                &:nth-child(3) {
                    width: 16%;
                    color: #212121;
                }
                &:nth-child(4) {
                    width: 34%;
                }
                .tdinput {
                    width: 95%;
                    margin: 2px;
                }
            }
        }
    }
}
</style>
