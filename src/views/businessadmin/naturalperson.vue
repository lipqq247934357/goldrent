<template>
<div class="businfo">
    <div class="topTitle">
        <componentitle :message="message" :titletext="titletext" />

        <ul class="infolist">
            <li>
                <span>回购人名称</span>
                <span>
                    xxxxxx
                </span>
            </li>
            <li>
                <span>企业性质</span>
                <span>企业法人</span>
            </li>
            <li>
                <span>注册资本金</span>
                <span>XXXXXXXXXXXXX</span>

            </li>
            <li>
                <span>年营业额</span>
                <span>XXXXXXXXXXX</span>
            </li>
            <li>
                <span>经销商层级</span>
                <span>一级经销商</span>

            </li>
            <li>
                <span>回购方负责人</span>
                <span>XXXXXXXXX</span>
            </li>
            <li>
                <span>回购方联系电话</span>
                <span>123123123123</span>
            </li>
        </ul>

    </div>

    <div class="content">
        <div class="titletop">
            <div class="topbox">
                <span>负债及对外担保情况</span>
            </div>

            <h3>回购人</h3>

            <ul class="infolist">
                <li>
                    <span>回购人</span>
                    <span>
                        xxxxxx
                    </span>
                </li>
                <li>
                    <span>债务种类</span>
                    <span>XXXXXXXX</span>
                </li>
                <li>
                    <span>债务余额</span>
                    <span>XXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>担保余额</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>被担保人</span>
                    <span>一级经销商</span>

                </li>
                <li>
                    <span>备注</span>
                    <span>XXXXXXXXX</span>
                </li>
            </ul>

            <h3>回购方实际控制人</h3>

            <ul class="infolist">
                <li>
                    <span>回购方实际控制人</span>
                    <span>
                        xxxxxx
                    </span>
                </li>
                <li>
                    <span>债务种类</span>
                    <span>XXXXXXXX</span>
                </li>
                <li>
                    <span>债务余额</span>
                    <span>XXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>担保余额</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>被担保人</span>
                    <span>一级经销商</span>

                </li>
                <li>
                    <span>备注</span>
                    <span>XXXXXXXXX</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="content">
        <div class="titletop">
            <div class="topbox">
                <span>回购人相关影像资料</span>
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
