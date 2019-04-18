<template>
<div class="leasehold">
    <componentitle :message="message='租赁物信息'" />
    <div class="leasegoodsinfo" v-for="item in rentinfo">
        <div class="assetsinfoul">
            <h3>租赁物情况</h3>
            <ul class="infolist">
                <li>
                    <span>名称</span>
                    <span>
                        {{item.condition.leaseName}}
                    </span>
                </li>
                <li>
                    <span>规格型号</span>
                    <span>{{item.condition.leaseName}}</span>
                </li>
                <li>
                    <span>购置价格/坐落</span>
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
                <span>保险金额/坐落</span>
                <span></span>

            </li>
            <li>
                <span>保险期限</span>
                <span>{{item.insurance.insuranceTerm}}</span>
            </li>
            <li>
                <span>第一受益人</span>
                <span>{{item.insurance.firstBeneficiary}}</span>

            </li>
            <li>
                <span>备注</span>
                <span>{{item.insurance.remark}}</span>
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
             bussNo: 'CON_ZZ02_0000_201904_0084'
        }).then( res => {
            this.rentinfo = res.data.data.lists;
            console.log(res.data.data.lists,'租赁物信息');
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
