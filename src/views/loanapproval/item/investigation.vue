<template>
<div class="externalinfo">
    <componentitle :message="message='其他增信措施'" />
    <div class="assetsinfoul">
        <h3>房产抵押</h3>
        <ul class="infolist">
            <li>
                <span>房屋产权人(抵押人)</span>
                <span>
                    {{investigation.houseMortgager.mortgager}}
                </span>
            </li>
            <li>
                <span>与承租人关系</span>
                <span>{{investigation.houseMortgager.relation}}</span>
            </li>

            <li>
                <span>房屋产权证号</span>
                <span>{{investigation.houseMortgager.certificate}}</span>
            </li>
            <li>
                <span>建筑面积（平方米）</span>
                <span>{{investigation.houseMortgager.area}}</span>

            </li>
            <li>
                <span>建筑结构</span>
                <span>{{investigation.houseMortgager.structure}}</span>
            </li>
            <li>
                <span>评估价值（万元）</span>
                <span>{{investigation.houseMortgager.evaluateValue}}</span>
            </li>
            <li>
                <span>备注</span>
                <span>{{investigation.houseMortgager.remark}}</span>
            </li>
        </ul>
    </div>
    <div class="assetsinfoul">
        <h3>土地使用权抵押</h3>
        <ul class="infolist">
            <li>
                <span>土地使用权人（抵押人）</span>
                <span>
                    {{investigation.landMortgager.mortgager}}
                </span>
            </li>
            <li>
                <span>与承租人关系</span>
                <span>{{investigation.landMortgager.relation}}</span>
            </li>
            <li>
                <span>土地使用证号</span>
                <span>{{investigation.landMortgager.certificate}}</span>
            </li>
            <li>
                <span>土地使用权类型</span>
                <span>{{investigation.landMortgager.landType}}</span>
            </li>
            <li>
                <span>土地使用权期限</span>
                <span>{{investigation.landMortgager.landTerm}}</span>
            </li>
            <li>
                <span>面积（平方米）</span>
                <span>{{investigation.landMortgager.area}}</span>
            </li>
            <li>
                <span>坐落</span>
                <span>{{investigation.landMortgager.location}}</span>
            </li>
            <li>
                <span>评估价值（万元）</span>
                <span>{{investigation.landMortgager.evaluateValue}}</span>
            </li>
            <li>
                <span>备注</span>
                <span>{{investigation.landMortgager.remark}}</span>
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
            disabled
            v-model="investigation.conclusion">
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
            textarea: '',
            investigation: {
                houseMortgager: {},
                landMortgager: {}
            }
        }
    },
    created() {
        this.$post('/app/api/getSurveyConclusion').then( res => {
            this.investigation = res.data.data;
        });
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
