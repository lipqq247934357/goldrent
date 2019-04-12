<template>
<div class="externalinfo">
    <componentitle :message="message='其他增信措施'" />
    <div class="assetsinfoul">
        <h3>财产抵押</h3>
        <ul class="infolist">
            <li>
                <span>抵押物种类</span>
                <span>
                    宅基地
                </span>
            </li>
            <li>
                <span>抵押物价值</span>
                <span>1000</span>
            </li>
            <li>
                <span>抵押人/坐落</span>
                <span>XXXXXXXXXX</span>

            </li>
            <li>
                <span>与承租人关系</span>
                <span>XXXXXXXXXXX</span>
            </li>
            <li>
                <span>备注</span>
                <span>XXXXXXXXXXXXXXX</span>

            </li>
        </ul>
    </div>
    <div class="assetsinfoul">
        <h3>资产质押</h3>
        <ul class="infolist">
            <li>
                <span>抵押物种类</span>
                <span>
                    宅基地
                </span>
            </li>
            <li>
                <span>抵押物价值</span>
                <span>1000</span>
            </li>
            <li>
                <span>抵押人/坐落</span>
                <span>XXXXXXXXXX</span>

            </li>
            <li>
                <span>与承租人关系</span>
                <span>XXXXXXXXXXX</span>
            </li>
            <li>
                <span>备注</span>
                <span>XXXXXXXXXXXXXXX</span>

            </li>
        </ul>
    </div>
    
    <div class="bottombox">
        <componentitle :message="message='调查结论及风险评价'" />
        <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            class="inputtext"
            v-model="textarea">
        </el-input>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            textarea: ''
        }
    },
    components: {
        componentitle,
    }
}
</script>
<style lang="less">
.externalinfo {
    h3 {
        padding-left: 15px;
    }
    .bottombox {
        .inputtext {
            margin: 20px auto 20px;
            width: 95%;
            display: block;
        }
    }

}
</style>
