<template>
<div class="loanapproval confirm assetsinfo">
    <div class="div0 content">
        <componentitle :message="message='基本信息'" class="titlecomponent" />
        <ul class="infolist">
            <li>
                <span>业务编号</span>
                <span>
                    {{queryBasicInfo.bussNo}}
                </span>
            </li>
            <li>
                <span>承租人姓名</span>
                <span>
                    {{queryBasicInfo.custName}}
                </span>
            </li>
            <li>
                <span>租赁总额（元）</span>
                <span>
                    {{queryBasicInfo.leaseCapital}}
                </span>

            </li>
            <li>
                <span>租赁期限(月)</span>
                <span>
                    {{queryBasicInfo.leaseTerm}}
                </span>
            </li>
            <li style="border-bottom: 0;">
                <span>收款账户开户行</span>
                <span>
                    {{queryBasicInfo.paymentAccountBank}}
                </span>
            </li>
            <li>
                <span>收款账户账号</span>
                <span>
                    {{queryBasicInfo.paymentAccount}}
                </span>
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
                :disabled="inputdisabled == 1"
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
                :disabled="inputdisabled == 1"
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
            endTime: '',
            queryBasicInfo: '',// 基本信息
            inputdisabled: ''
        }
    },
    created() {
        this.inputdisabled = this.$route.query.disabled;
        this.$get(`/LoanGrantConfirm/queryBasicInfo?bussNo=${this.$route.query.bussNo}`).then(res => {
            this.queryBasicInfo = res.data.data;
            console.log(this.queryBasicInfo);
        });
    },
    components: {
        componentitle
    },
    methods: {
        confirm() {
            this.$post('/LoanGrantConfirm/submitConfirm',{
                bussNo: this.$route.query.bussNo,
                loanDate: this.endTime
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('放款确认成功');
                    this.$router.push({
                        path: '/layout/loanmoneyconfirm'
                    })
                }
            });
        }
    }
}
</script>
<style lang="less">
.bottomdate {
    margin-top: 25px;
}
.loanapproval {
    .search {
        display: block;
        margin: 20px auto;
    }
}

</style>
