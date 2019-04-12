<template>
<div class="businfosss">
    <componentitle :message="message='租赁要素'" />
    <ul class="factorlist">
        <li>
            <span>业务编号</span>
            <span>CON_ZZ02_0000_YYYYMM_四位流水号</span>
        </li>
        <li>
            <span>租赁模式</span>
            <span>直租</span>
        </li>
        <li>
            <span>租赁物名称</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>租赁物金额</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>首付款金额</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>租金金额</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>补贴金额</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>补贴时间</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>租赁期限</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>合同利率</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>厂商翻译金额</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>风险金</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>内部收益率IRR</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>租金支付方式</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>使用地点</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>起租日</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>止租日</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>留购价款</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
        <li>
            <span>提前结清手续费</span>
            <span>XXXXXXXXXXXXXXX</span>
        </li>
    </ul>
    <componentitle :message="message='租金计划表'" />
    <div class="tables">
        <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="date"
                    label="租金期数">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="租金总额">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="支付日期">
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="租赁本金">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="租赁利息">
                </el-table-column>
            </el-table>
        </template>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
            tableData: []
        }
    },
    components: {
        componentitle
    }
}
</script>
<style lang="less">
.businfosss {
    background: #fff;
    width: 100%;
    .factorlist {
        width: 95%;
        border: 1px solid #EBEEF5;
        margin: 20px auto;
        li {
            border-bottom: 1px solid #EBEEF5;
            text-align: center;
            height: 50px;
            line-height: 50px;
            color: #909399;
            font-size: 14px;
            span {
                display: inline-block;
                &:first-child {
                    width: 30%;
                    border-right: 1px solid #EBEEF5;
                }
                &:last-child {
                    width: 69.9%;
                }
            }
            &:nth-child(even) {
                background: #f5f7fa;
            }
            &:last-child {
                border: 0;
            }
        }
    }
    .tables {
        .cell {
            text-align: center;
        }
    }
}
</style>
