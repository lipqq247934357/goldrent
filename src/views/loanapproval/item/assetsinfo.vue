<template>
<div class="assetsinfo">
    <div class="div0">
        <ul class="infolist">
            <li>
                <span>业务编号</span>
                <span>
                    CON_ZZ02_0000_YYYYMM_四位流水号
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
        </ul>
    </div>
    <!-- 资产情况 -->
    <div class="div1">
        <componentitle :message="message='资产情况'" />
        <div class="assetsinfoul">
            <h3>房产信息</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>土地（含代收代耕）</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>车产情况</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>农机具</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>其他产</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
    </div>

    <!-- 负债情况 -->
    <div class="div2">
        <componentitle :message="message='负债情况'" />
        <div class="assetsinfoul">
            <h3>房产信息</h3>
            <ul class="infolist">
                <li>
                    <span>债务情况</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>债务种类</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>债务人</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>债务余额</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>债务期限</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>备注</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>对外担保</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>其他负债</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
    </div>

    <!-- 收入情况 -->
    <div class="div3">
        <componentitle :message="message='收入情况'" />
        <div class="assetsinfoul">
            <h3>种植收入</h3>
            <ul class="infolist">
                <li>
                    <span>收入名称</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>种植类别</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>种植面积/亩</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>单亩成本</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>亩产收入</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>结余</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>农机作业收入</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>其他收入</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>收入偿债比</h3>
            <ul class="infolist">
                <li>
                    <span>房产类型</span>
                    <span>
                        宅基地
                    </span>
                </li>
                <li>
                    <span>面积（㎡）</span>
                    <span>1000</span>
                </li>
                <li>
                    <span>房产地址/坐落</span>
                    <span>XXXXXXXXXX</span>

                </li>
                <li>
                    <span>当前估价</span>
                    <span>XXXXXXXXXXX</span>
                </li>
                <li>
                    <span>所以权人</span>
                    <span>XXXXXXXXXXXXXXX</span>

                </li>
                <li>
                    <span>是否抵押</span>
                    <span>XXXXXXXXXXX</span>
                </li>
            </ul>
        </div>
    </div>

    <!-- 承租人相关影像资料 -->
    <div class="div3">
        <componentitle :message="message='承租人相关影像资料'" />
        <div class="imgbox">
            <h3>身份证明材料</h3>
            <ul>
                <li>
                    <div>身份证原件</div>
                    <div class="imgeslist">
                        <img
                            src="../../../assets/logo.png"
                            preview="1"
                            preview-text="身份证原件"
                            width="100"
                            height="100"
                            >
                        <img
                            src="../../../assets/logo0.png"
                            preview="1"
                            preview-text="身份证原件"
                            width="100"
                            height="100"
                            >
                    </div>
                </li>
                <li>
                    <div>户口簿原件</div>
                    <div class="imgeslist">
                        <img
                            src="../../../assets/logo0.png"
                            preview="2"
                            preview-text="户口簿原件"
                            width="100"
                            height="100"
                            >
                        <img
                            src="../../../assets/logo.png"
                            preview="2"
                            preview-text="户口簿原件"
                            width="100"
                            height="100"
                            >
                    </div>
                </li>
            </ul>

            <h3>婚姻证明材料</h3>
            <ul>
                <li>
                    <div>单身证明原件</div>
                    <div class="">

                    </div>
                </li>
            </ul>

            <h3>资产证明材料</h3>
            <ul>
                <li>
                    <div>房产证/购房合同</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>土地承包合同原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>机动车辆行驶原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>补贴账户流水近一年流水</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>农机具购置合同原件</div>
                    <div class="">

                    </div>
                </li>
                <li>
                    <div>主要结算账户近一年流水</div>
                    <div class="">

                    </div>
                </li>
            </ul>
            <h3>征信证明材料</h3>
            <ul>
                <li>
                    <div>人行征信报告</div>
                    <div class="">

                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
export default {
    data() {
        return {

        }
    },
    created() {
        // this.$post('/imageslist').then((response) => {
        //     console.log(response)
        // })
    },
    methods: {

    },
    components: {
        componentitle,
    }
}
</script>
<style lang="less">
.assetsinfo {
    h3 {
        padding-left: 15px;
    }
    .assetsinfoul {
        ul {
            margin-top: 0;
        }
    }
    .div3 {
        .imgbox {
            h3 {
                font-size: 16px;
                margin: 35px 0 35px 15px;
                font-weight: bold;
            }
            .imgeslist {
                img {
                    float: left;
                    margin-left: 15px;
                }
            }
            ul {
                width: 95%;
                margin: 0 auto;
                border: 1px solid #EBEEF5;
                &:last-child {
                    margin-bottom: 30px;
                }
                li {
                    width: 100%;
                    height: 100px;
                    text-align: center;
                    clear: both;
                    div {
                        float: left;
                        border-bottom: 1px solid #EBEEF5;
                        height: 100px;
                        color: #606266;
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
    }
}
</style>
