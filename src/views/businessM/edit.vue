<template>
<div class="businfo">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" />

        <ul class="infolist">
            <li>
                <span>伙伴类型</span>
                <span>
                    <!-- <select>
                        <option>自然人</option>
                        <option>法人机构</option>
                    </select> -->
                    <el-select v-model="value" placeholder="请选择" class="infolistchoiceselect">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </span>
            </li>
            <li>
                <span>客户类别</span>
                <span>A类客户</span>
            </li>
            <li>
                <span>姓名</span>
                <span>豹子头·林冲</span>

            </li>
            <li>
                <span>与承租人关系</span>
                <span>本人</span>
            </li>
            <li>
                <span>性别</span>
                <span>男</span>

            </li>
            <li>
                <span>年龄</span>
                <span>28</span>
            </li>
            <li>
                <span>身份证号码</span>
                <span>123123123123</span>
            </li>
            <li>
                <span>婚姻状况</span>
                <span>已婚</span>
            </li>
            <li>
                <span>户籍地址</span>
                <span>XXXXXXXX</span>
            </li>
            <li>
                <span>现住地</span>
                <span>XXXXXXX</span>
            </li>
            <li>
                <span>种植年限</span>
                <span>XXXXXXXX</span>
            </li>
            <li>
                <span>申请地居住年限（年）</span>
                <span>XXXXXXX</span>
            </li>
            <li>
                <span>联系电话</span>
                <span>XXXXXXXX</span>
            </li>
            <li>
                <span>微信号</span>
                <span>XXXXXXX</span>
            </li>
            <li>
                <span>涉诉</span>
                <span>
                    <template>
                        <el-select v-model="value" placeholder="请选择" class="infolistchoiceselect">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </span>
            </li>
            <li>
                <span>被执行信息</span>
                <span>
                    <template>
                        <el-select v-model="value" placeholder="请选择" class="infolistchoiceselect">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </span>
            </li>
        </ul>

    </div>

    <div class="content">
        <div class="titletop">
            <div class="topbox">
                <span>相关影像资料</span>
            </div>
        </div>

        <div class="imgbox">
            <h3>基础资料</h3>

            <ul>
                <li>
                    <div>营业执照副本原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>开户许可证原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>公司章程工商调档原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>法人、实际控制人身份证原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>法人、实际控制人户口簿原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>法人、实际控制人婚姻状况证明材料原件</div>
                    <div class="">

                    </div>
                </li>
            </ul>

            <h3>财务资料</h3>
            <ul>
                <li>
                    <div>审计报告（财务报表）</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>纳税申请表</div>
                    <div class="">

                    </div>
                </li>
            </ul>

            <h3>征信证明务资料</h3>
            <ul>
                <li>
                    <div>人行征信报告</div>
                    <div class="">

                    </div>
                </li>
            </ul>
        </div>
        <div class="bottombut">
            <el-button type="primary">保存</el-button>
            <el-button type="primary">提交</el-button>
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            message: '基本信息',
            titletext: '商业伙伴维护',
            options: [
                {
                    value: '选项1',
                    label: '待处理'
                },
                 {
                    value: '选项2',
                    label: '进行中'
                },
                {
                    value: '选项3',
                    label: '已提交'
                },
                {
                    value: '选项4',
                    label: '已退回'
                }
            ],
            value: ''
        }
    },
    components: {
        componentitle,
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleClick(val) {
            console.log(val);
            this.$router.push({
                // 'path': '/'
            })
        },
        edit(val) {
            console.log(val);
        },
        add() {
            // 添加信息
        }
    },
}
</script>
<style lang="less">
.businfo {
    background: #fff;
    .topTitle {
        width: 95%;
        margin: 0 auto;
    }
    .content {
        width: 95%;
        margin: 0 auto;
    }
    .imgbox {
        h3 {
            font-size: 16px;
            margin: 35px 0 35px 15px;
            font-weight: bold;
        }
        ul {
            width: 95%;
            margin: 0 auto;
            border: 1px solid #EBEEF5;
            li {
                width: 100%;
                height: 100px;
                text-align: center;
                clear: both;
                div {
                    float: left;
                    border-bottom: 1px solid #EBEEF5;
                    height: 100px;
                    &:first-child {
                        width: 29.8%;
                        border-right: 1px solid #EBEEF5;
                        line-height: 100px;
                    }
                    &:last-child {
                        width: 70%;
                    }
                }
            }
        }
    }
    .bottombut {
        width: 160px;
        margin: 15px auto;
    }
}
</style>
