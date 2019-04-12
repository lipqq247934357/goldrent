<template>
<div class="leasehold">
    <componentitle :message="message='租赁物信息'" />
    <div class="assetsinfoul">
        <h3>租赁物情况</h3>
        <ul class="infolist">
            <li>
                <span>名称</span>
                <span>
                    宅基地
                </span>
            </li>
            <li>
                <span>规格型号</span>
                <span>1000</span>
            </li>
            <li>
                <span>购置价格/坐落</span>
                <span>XXXXXXXXXX</span>

            </li>
            <li>
                <span>唯一识别码</span>
                <span>XXXXXXXXXXX</span>
            </li>
            <li>
                <span>能否抵押受理</span>
                <span>XXXXXXXXXXXXXXX</span>

            </li>
            <li>
                <span>低压管理机关</span>
                <span>XXXXXXXXXXX</span>
            </li>
        </ul>
    </div>
    <div class="assetsinfoul">
        <h3>租赁物保险</h3>
        <ul class="infolist">
            <li>
                <span>险种</span>
                <span>
                    宅基地
                </span>
            </li>
            <li>
                <span>保险公司</span>
                <span>1000</span>
            </li>
            <li>
                <span>保险金额/坐落</span>
                <span>XXXXXXXXXX</span>

            </li>
            <li>
                <span>保险期限</span>
                <span>XXXXXXXXXXX</span>
            </li>
            <li>
                <span>第一受益人</span>
                <span>XXXXXXXXXXXXXXX</span>

            </li>
            <li>
                <span>备注</span>
                <span>XXXXXXXXXXX</span>
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
        }
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
