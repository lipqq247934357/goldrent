<template>
<div class="buybackpeople">
    <componentitle :message="message='基本信息'"/>
    <div class="alldata" v-for="item in backpeople">
        <ul class="infolist">
            <li>
                <span>回购人名称</span>
                <span>
                    {{item.basicInfo == null ? '' : item.basicInfo.comFullname}}
                </span>
            </li>
            <li>
                <span>企业性质</span>
                <span>{{item.basicInfo == null ? '' : item.basicInfo.comNature}}</span>
            </li>
            <li>
                <span>注册资本金</span>
                <span>{{item.basicInfo == null ? '' : item.basicInfo.comRegisterdCapital}}</span>

            </li>
            <li>
                <span>年营业额</span>
                <span>{{item.basicInfo == null ? '' : item.basicInfo.comIncome}}</span>
            </li>
            <li>
                <span>经销商层级</span>
                <span>{{item.basicInfo == null ? '' : item.basicInfo.agencyLevel}}</span>

            </li>
            <li>
                <span>回购方负责人</span>
                <span>{{item.basicInfo == null ? '' : item.basicInfo.comManager}}</span>
            </li>
            <li>
                <span>回购方联系电话</span>
                <span>{{item.basicInfo == null ? '' : item.basicInfo.comMobile}}</span>
            </li>
        </ul>
        <componentitle :message="message='负债及对外担保情况'"/>
        <div class="assetsinfoul">
            <h3>回购人</h3>
            <ul class="infolist">
                <li>
                    <span>回购人</span>
                    <span>
                        {{item.debtInfo == null ? '' : item.debtInfo.personName}}
                    </span>
                </li>
                <li>
                    <span>债务种类</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.debtType}}</span>
                </li>
                <li>
                    <span>债务余额</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.debtBalance}}</span>
                </li>
                <li>
                    <span>担保余额</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.comMobile}}</span>
                </li>
                <li>
                    <span>被担保人</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.warrantee}}</span>

                </li>
                <li>
                    <span>备注</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.remark}}</span>
                </li>
            </ul>
        </div>
        <div class="assetsinfoul">
            <h3>回购方实际控制人</h3>
            <ul class="infolist" v-if="item.debtInfo != null">
                <li>
                    <span>回购方实际控制人</span>
                    <span>
                        {{item.debtInfo == null ? '' : item.debtInfo.personName}}
                    </span>
                </li>
                <li>
                    <span>债务种类</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.debtType}}</span>
                </li>
                <li>
                    <span>债务余额</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.debtBalance}}</span>
                </li>
                <li>
                    <span>担保余额</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.comMobile}}</span>
                </li>
                <li>
                    <span>被担保人</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.warrantee}}</span>

                </li>
                <li>
                    <span>备注</span>
                    <span>{{item.debtInfo == null ? '' : item.debtInfo.remark}}</span>
                </li>
            </ul>
        </div>
    </div>
    <componentitle :message="message='回购人相关影像资料'"/>
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
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';

export default {
    data() {
        return {
            message: '',
            backpeople: [],
            tableNull: ''
        }
    },
    created() {
        this.$post('/repurchase/info',{
            bussNo: 'CON_ZZ02_0000_201904_0001'
        }).then( res => {
            
            this.backpeople = res.data.data;

            console.log(res.data.data.debtInfo,'回购人');
        });
    },
    components: {
        componentitle,

    }
}
</script>
<style lang="less">
.buybackpeople {
    h3 {
        padding-left: 15px;
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
}
</style>
