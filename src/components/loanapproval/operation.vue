<template>
<div class="operation">
    <componentitle :message="message='评分卡结果'" />
    <div class="presentation">
        <i>征信报告：</i>
        <template>
            <el-radio v-model="radio" label="1">有</el-radio>
            <el-radio v-model="radio" label="2">无</el-radio>
        </template>
        <ul class="nothingshow">
            <li>
                <span>信用卡及贷款24个月最大逾期期数：</span>
                <input type="text" name="" value="" class="inputinfo">
            </li>
            <li>
                <span>信用卡及贷款24个月累计逾期次数：</span>
                <input type="text" name="" value="" class="inputinfo">
            </li>
            <li>
                <span>最近1个月内的查询机构数(贷款审批)：</span>
                <input type="text" name="" value="" class="inputinfo">
            </li>
            <li>
                <span>同盾贷前查询(手动填写)：</span>
                <input type="text" name="" value="" class="inputinfo">
            </li>
            <li>
                <span>同盾信用评分(手动填写)：</span>
                <input type="text" name="" value="" class="inputinfo">
            </li>
            <li>
                <span>涉诉：</span>

            </li>
            <li>
                <span>被执行信息：</span>

            </li>
        </ul>
        <h3>累计得分：88 建议通过</h3>
        <table style="width: 100%" border>
            <tr>
                <th>指标大类</th>
                <th>指标名称</th>
                <th>命中项</th>
                <th>得分</th>
            </tr>
            <tr>
                <td rowspan="4">基本情况</td>
            </tr>
            <tr>
                <td>客户类别</td>
            </tr>
            <tr>
                <td>婚姻状况</td>
            </tr>
            <tr>
                <td>年龄段</td>
            </tr>
            <tr>
                <td rowspan="4">资产状况</td>
            </tr>
            <tr>
                <td>房产</td>
            </tr>
            <tr>
                <td>农机具，机动车</td>
            </tr>
            <tr>
                <td>收入偿债比</td>
            </tr>
            <tr>
                <td rowspan="4">征信状况</td>
            </tr>
            <tr>
                <td>信用卡及贷款24个月最大逾期期数</td>
            </tr>
            <tr>
                <td>信用卡及贷款24个月累计逾期期数</td>
            </tr>
            <tr>
                <td>最近一个月内的查询机构数（贷款审批）</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../title/title.vue';
export default {
    data() {
        return {
            message: '',
            radio: '',
            tableData: []
        }
    },
    components: {
        componentitle,
    }
}
</script>
<style lang="less">
.operation {
    .presentation {
        margin: 15px;
        i {
            font-size: 14px;
            color: #f68e58;
            font-style: normal;
            margin-right: 10px;
        }
    }
    .nothingshow {
        width: 400px;
        margin: 15px;
        border: 1px solid #EBEEF5;
        li {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #EBEEF5;
            &:last-child {
                border-bottom: 0;
            }
            span {
                margin-left: 15px;
            }
            .inputinfo {
                width: 90px;
                border: 0;
                border-bottom: 1px solid #EBEEF5;
                padding-left: 10px;
            }
        }
    }
}
</style>
