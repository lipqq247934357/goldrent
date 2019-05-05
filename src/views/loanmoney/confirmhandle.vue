<template>
<div class="loanapproval confirm assetsinfo">
    <div class="div0 content">
        <componentitle :message="message='基本信息'" class="titlecomponent" />
        <ul class="infolist">
            <li>
                <span>业务编号</span>
                <span>
                </span>
            </li>
            <li>
                <span>承租人姓名</span>
                <span>

                </span>
            </li>
            <li>
                <span>租赁总额</span>
                <span></span>

            </li>
            <li>
                <span>租赁期限</span>
                <span>

                </span>
            </li>
            <li>
                <span>收款账户开户行</span>
                <span>

                </span>
            </li>
            <li>
                <span>收款账户账号</span>
                <span></span>
            </li>
        </ul>
        <componentitle :message="message='放款确认'" class="titlecomponent" />
        <div class="bottomdate">
            <span class="datetext">放款日期：</span>
            <el-date-picker
                v-model="endTime"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
            <!-- <button
                type="button"
                name="button"
                class="search el-icon-search"
                @keyup.enter="confirm"
                @click="confirm"
                :autofocus="true">
                查询
            </button> -->
            <el-button type="primary"
                class="search"
                @keyup.enter="confirm"
                @click="confirm"
                :autofocus="true">
                放款确认
            </el-button>
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            message: '', //title文字
            endTime: ''
        }
    },
    components: {
        componentitle
    },
    methods: {
        confirm() {
            alert(1);
        }
    }
}
</script>
<style lang="less">
.bottomdate {
    margin-top: 25px;
}
.search {
    display: block;
    margin: 20px auto;
}
</style>
