<template>
<div class="externalinfo">
    <componentitle :message="message='其他增信措施'" />
    <div class="assetsinfoul">
        <h3>房产抵押</h3>
        <ul class="infolist" v-for="item in houseMortgager">
            <li>
                <span>房屋产权人(抵押人)</span>
                <span>
                    {{item.mortgager}}
                </span>
            </li>
            <li>
                <span>与承租人关系</span>
                <select class="" name="" disabled>
                    <option value="" v-for="custRelation in statuslist.custRelation" :selected="item.relation == custRelation.optionCode ? true : false">
                        {{custRelation.optionName}}
                    </option>
                </select>
            </li>

            <li>
                <span>房屋产权证号</span>
                <span>{{item.certificate}}</span>
            </li>
            <li>
                <span>建筑面积（平方米）</span>
                <span>{{item.area}}</span>

            </li>
            <li>
                <span>建筑结构</span>
                <span>{{item.structure}}</span>
            </li>
            <li>
                <span>评估价值（万元）</span>
                <span>{{item.evaluateValue}}</span>
            </li>
            <li class="subliWidth">
                <p class="bz">备注</p>
                <div class="batextarrear">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder=""
                        class="inputtext"
                        disabled
                        v-model="item.remark">
                    </el-input>
                </div>
            </li>
        </ul>
    </div>
    <div class="assetsinfoul">
        <h3>土地使用权抵押</h3>
        <ul class="infolist" v-for="item in landMortgager">
            <li>
                <span>土地使用权人（抵押人）</span>
                <span>
                    {{item.mortgager}}
                </span>
            </li>
            <li>
                <span>与承租人关系</span>
                <span>
                <select class="" name="" disabled>
                    <option value="" v-for="custRelation in statuslist.custRelation" :selected="item.relation == custRelation.optionCode ? true : false">
                        {{item.relation == '' ? '' :custRelation.optionName}}
                    </option>
                </select>
                </span>
            </li>
            <li>
                <span>土地使用证号</span>
                <span>{{item.certificate}}</span>
            </li>
            <li>
                <span>土地使用权类型</span>
                <span>{{item.landType}}</span>
            </li>
            <li>
                <span>土地使用权期限（年）</span>
                <span>{{item.landTerm}}</span>
            </li>
            <li>
                <span>面积（平方米）</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span>坐落</span>
                <span>{{item.location}}</span>
            </li>
            <li>
                <span>评估价值（万元）</span>
                <span>{{item.evaluateValue}}</span>
            </li>
            <li class="subliWidth">
                <p class="bz">备注</p>
                <div class="batextarrear">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder=""
                        class="inputtext"
                        disabled
                        v-model="item.remark">
                    </el-input>
                </div>
            </li>
        </ul>
    </div>

    <div class="bottombox">
        <componentitle :message="message='调查结论及风险评价'" />
        <h3>主办人</h3>
        <el-input
            v-for="item in sponsor"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="item.conclusion">
        </el-input>
        <h3>协办人</h3>
        <el-input
            v-for="item in assist"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            class="inputtext"
            disabled
            v-model="item.conclusion == '' ? '' : item.conclusion">
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
            houseMortgager: [],
            landMortgager: [],
            sponsor: '', //主办人
            assist: '', //协办人
            statuslist: {
                custRelation: []
            }
        }
    },
    created() {
        this.$post('/getConstantConfig',{
            dictionaryCode: ['custRelation']
        }).then(res => {
            this.statuslist.custRelation = res.data.data.custRelation;
            console.log(this.statuslist.houseType,'222');
        })
        this.$post('/getSurveyConclusion',{
            bussNo: this.$route.query.bussNo,
            ownerType: 'ZB'
        }).then( res => {
            if(res.data.code == '2000000') {
                this.sponsor = res.data.data;
            }
        });
        this.$post('/getSurveyConclusion',{
            bussNo: this.$route.query.bussNo,
            ownerType: 'XB'
        }).then( res => {
            if(res.data.code == '2000000') {
                this.assist = res.data.data;
            }
        });
        this.$post('/additioncredit/info',{
            bussNo: this.$route.query.bussNo
        }).then(res => {
            if(res.data.code == '2000000') {
                this.houseMortgager = res.data.data.houseMortgager;
                this.landMortgager = res.data.data.landMortgager;
            }

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
