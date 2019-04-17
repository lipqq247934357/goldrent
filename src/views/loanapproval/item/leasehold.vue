<template>
<div class="leasehold">
    <componentitle :message="message='租赁物信息'" />
    <div class="assetsinfoul">
        <h3>租赁物情况</h3>
        <ul class="infolist">
            <li>
                <span>名称</span>
                <span>
                    {{rentinfo.leaseName}}
                </span>
            </li>
            <li>
                <span>规格型号</span>
                <span>{{rentinfo.leaseName}}</span>
            </li>
            <li>
                <span>购置价格/坐落</span>
                <span>{{rentinfo.purchasePrice}}</span>

            </li>
            <li>
                <span>唯一识别码</span>
                <span>{{rentinfo.serialNo}}</span>
            </li>
            <li>
                <span>能否抵押受理</span>
                <span>{{rentinfo.mortgage}}</span>

            </li>
            <li>
                <span>抵押管理机关</span>
                <span>{{rentinfo.mortgageAgency}}</span>
            </li>
        </ul>
    </div>
    <div class="assetsinfoul">
        <h3>租赁物保险</h3>
        <ul class="infolist">
            <li>
                <span>险种</span>
                <span>
                    {{rentinfo.insuranceType}}
                </span>
            </li>
            <li>
                <span>保险公司</span>
                <span>{{rentinfo.insuranceCompany}}</span>
            </li>
            <li>
                <span>保险金额/坐落</span>
                <span>XXXXXXXXXX</span>

            </li>
            <li>
                <span>保险期限</span>
                <span>{{rentinfo.insuranceTerm}}</span>
            </li>
            <li>
                <span>第一受益人</span>
                <span>{{rentinfo.firstBeneficiary}}</span>

            </li>
            <li>
                <span>备注</span>
                <span>{{rentinfo.remark}}</span>
            </li>
        </ul>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            rentinfo: {}
        }
    },
    created() {
        this.$post('api/lease/query').then( res => {
            this.rentinfo = res.data.data;
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
