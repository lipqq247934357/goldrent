<template>
<div class="leasehold">
    <componentitle :message="message='租赁物信息'" />
    <div class="leasegoodsinfo" v-for="item in rentinfo">
        <div class="assetsinfoul">
            <h3>租赁物情况</h3>
            <ul class="infolist">
                <li>
                    <span>租赁物名称及规格型号</span>
                    <span>
                        {{item.condition.leaseName}}
                    </span>
                </li>
                <li>
                    <span>购置价格</span>
                    <span>{{item.condition.purchasePrice}}</span>

                </li>
                <li>
                    <span>唯一识别码</span>
                    <span>{{item.condition.serialNo}}</span>
                </li>
                <li>
                    <span>能否抵押受理</span>
                    <span>{{item.condition.mortgage == 'Y' ? '已抵押' : '未抵押'}}</span>

                </li>
                <li>
                    <span>抵押管理机关</span>
                    <span>{{item.condition.mortgageAgency}}</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
        <h3>租赁物保险</h3>
        <ul class="infolist">
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
                <span>{{item.insurance.conerage}}</span>

            </li>
            <li>
                <span>保险期限（月）</span>
                <span>{{item.insurance.insuranceTerm}}</span>
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
                        disabled
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
export default {
    data() {
        return {
            message: '',
            rentinfo: []
        }
    },
    created() {
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

    }
}
</script>
<style lang="less">
.leasehold {
    .assetsinfoul {
        h3 {
            margin-left: 15px;
        }
    }
}
</style>
