<template>
<div class="operation">
    <componentitle :message="message='评分卡结果'" />
    <el-button type="primary" class="againbutton" @click="again">重评</el-button>
    <div class="presentation">
        <i>征信报告：</i>
        <template>
            <el-radio v-model="radio" label="1">有</el-radio>
            <el-radio v-model="radio" label="2">无</el-radio>
        </template>
        <ul class="nothingshow" v-show="radio == 2">
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
                <el-select v-model="value2" placeholder="请选择" class="choiceselect">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li>
                <span>被执行信息：</span>
                <el-select v-model="value2" placeholder="请选择" class="choiceselect">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul>
        <h3>累计得分：88 建议通过</h3>
        <table style="width: 100%" border="1">
            <tr>
                <th>指标大类</th>
                <th>指标名称</th>
                <th>命中项</th>
                <th>得分</th>
            </tr>
            <tr>
                <td rowspan="3">基本情况</td>
                <td>客户类别</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>婚姻状况</td>
                <td>婚姻状况</td>
                <td>X</td>
            </tr>
            <tr>
                <td>年龄段</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td rowspan="3">资产状况</td>
                <td>客户类别</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>婚姻状况</td>
                <td>婚姻状况</td>
                <td>X</td>
            </tr>
            <tr>
                <td>年龄段</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td rowspan="3">征信状况</td>
                <td>客户类别</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>婚姻状况</td>
                <td>婚姻状况</td>
                <td>X</td>
            </tr>
            <tr>
                <td>年龄段</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td rowspan="4">保证人</td>
                <td>客户类别</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>婚姻状况</td>
                <td>婚姻状况</td>
                <td>X</td>
            </tr>
            <tr>
                <td>年龄段</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>年龄段</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td rowspan="3">回购人</td>
                <td>客户类别</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>婚姻状况</td>
                <td>婚姻状况</td>
                <td>X</td>
            </tr>
            <tr>
                <td>年龄段</td>
                <td>年龄段</td>
                <td>X</td>
            </tr>
            <tr>
                <td>首付比例</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
            <tr>
                <td>农机补贴</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
            <tr>
                <td>贷款记录</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
            <tr>
                <td>对外担保</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
            <tr>
                <td>婚姻状况关注项</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
            <tr>
                <td>涉诉</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
            <tr>
                <td>被执行信息</td>
                <td></td>
                <td>XXXXXXXXXXXXXX</td>
                <td>XXXXXX</td>
            </tr>
        </table>
    </div>
    <componentitle :message="message='审批意见'" />
    <div class="opinion">
        <div class="subone">
            <p>审批报告：</p>
            <el-button type="primary">查看调查报告</el-button>
            <el-button type="primary">生成审批报告</el-button>
        </div>
        <div class="subone">
            <p>面签合同：</p>
            <template>
                <el-checkbox-group v-model="checklist" class="elcheckboxs">
                    <el-checkbox label="抵押合同"></el-checkbox>
                    <el-checkbox label="XX合同1"></el-checkbox>
                    <el-checkbox label="XX合同2"></el-checkbox>
                    <el-checkbox label="XX合同3"></el-checkbox>
                    <el-checkbox label="XX合同4"></el-checkbox>
                    <el-checkbox label="XX合同5"></el-checkbox>
                </el-checkbox-group>
            </template>
        </div>
        <div class="subone">
            <p>审批意见：</p>
            <template>
                <el-radio v-model="radio" label="1">同意该笔申请</el-radio>
                <el-radio v-model="radio" label="2">不同意该笔申请</el-radio>
            </template>
        </div>
        <div class="subone">
            <p>原因描述：</p>
            <el-input
                type="textarea"
                class="textareawidth"
                :rows="3"
                placeholder="请输入内容"
                v-model="textarea">
            </el-input>
        </div>

        <div class="bottombutton">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">上会审议</el-button>
            <el-button type="primary">终审通过</el-button>
            <el-button type="primary">拒绝</el-button>
            <el-button type="primary">退回</el-button>
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
            radio: '',
            tableData: [],
            textarea: '', //文本域绑定
            checklist: [], // 合同按钮
            options: [
                {
                    value: '选项1',
                    label: '有'
                },
                 {
                    value: '选项2',
                    label: '无'
                },
            ],
            value2: ''
        }
    },
    methods: {
        again() {
            this.$message.error('测试');
        }
    },
    components: {
        componentitle,
    }
}
</script>
<style lang="less">
.operation {
    .againbutton {
        position: absolute;
        top: 7px;
        right: 15px;
    }
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
        margin: 15px;
        border: 1px solid #EBEEF5;
        li {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #EBEEF5;
            width: 50%;
            display: inline-block;
            color: #606266;
            &:last-child {
                border-bottom: 0;
            }
            span {
                margin-left: 15px;
                text-align: right;
            }
            .inputinfo {
                width: 90px;
                border: 0;
                border-bottom: 1px solid #EBEEF5;
                padding-left: 10px;
                color: #606266;
            }
        }
    }
    .subone {
        &:last-child {
            margin-bottom: 20px;
        }
        p {
            display: inline-block;
            line-height: 80px;
            color: #f68e58;
            margin-left: 15px;
        }
        .textareawidth {
            width: 80%;
            margin-bottom: 10px 0 20px 0;
        }
        .elcheckboxs {
            display: inline-block;
        }
    }
    .bottombutton {
        float: right;
        margin: 20px 13% 20px 0;
        .el-button--primary {
            background: #f68e58;
            border: 0;
        }
    }
}
table {
    text-align: center;
    border: 1px solid #EBEEF5;
    color: #909399;
    tr {
        height: 50px;
        line-height: 50px;
    }
}
</style>
