<template>
    <div class="businfo">
        <div class="topTitle">
            <componentitle :message="message" :titletext="titletext"/>
            <ul class="tabInfo">
                <li>
                    <div>回购人名称</div>
                    <div>
                        wwwwww
                    </div>
                </li>
                <li>
                    <div>企业性质</div>
                    <div>
                        wwwwww
                    </div>
                </li>
                <li>
                    <div>注册资本金</div>
                    <div>
                        wwwwww
                    </div>
                </li>
                <li>
                    <div>年营业额</div>
                    <div>
                        wwwwww
                    </div>
                </li>
                <li>
                    <div>经销商层级</div>
                    <div>
                        wwwwww
                    </div>

                </li>
                <li>
                    <div>回购方负责人</div>
                    <div>
                        wwwwww
                    </div>
                </li>
                <li>
                    <div>回购方联系电话</div>
                    <div>
                        wwwwww
                    </div>
                </li>
            </ul>
        </div>

        <div class="content">
            <div class="titletop">
                <div class="topbox">
                    <span>负债及对外担保情况</span>
                </div>

                <h3>回购人</h3>
                <ul class="tabInfo">
                    <li>
                        <div>回购人</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                    <li>
                        <div>债务种类</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                    <li>
                        <div>债务余额</div>
                        <div>
                            wwwwww
                        </div>

                    </li>
                    <li>
                        <div>担保余额</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                    <li>
                        <div>被担保人</div>
                        <div>
                            wwwwww
                        </div>

                    </li>
                    <li>
                        <div>备注</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                </ul>


                <h3>回购方实际控制人</h3>

                <ul class="tabInfo">
                    <li>
                        <div>回购方实际控制人</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                    <li>
                        <div>债务种类</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                    <li>
                        <div>债务余额</div>
                        <div>
                            wwwwww
                        </div>

                    </li>
                    <li>
                        <div>担保余额</div>
                        <div>
                            wwwwww
                        </div>
                    </li>
                    <li>
                        <div>被担保人</div>
                        <div>
                            wwwwww
                        </div>

                    </li>
                    <li>
                        <div>备注</div>
                        <div>
                            wwwwww
                        </div>
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
                <el-button @click="save" type="primary">保存</el-button>
                <el-button @click="submit" type="primary">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
<style lang="less" scoped>
    // 引入公共的样式
    @import '../../public/businessm';

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
