<template>
<div class="buybackpeople">
    <componentitle :message="message='基本信息'"/>
    <div class="alldata">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(item,index) in backpeople" :label="'回购人' + parseInt(index+1)">
                <!-- <h1>{{item.basicInfo.id}}</h1> -->
                <ul class="infolist">
                    <li>
                        <span>回购人名称</span>
                        <span>
                            {{item.basicInfo == null ? '' : item.basicInfo.comFullname}}
                        </span>
                    </li>
                    <li>
                        <span>企业性质</span>
                        <!-- <span>{{item.basicInfo == null ? '' : item.basicInfo.comNature}}</span> -->
                        <span>
                            <select class="" name="" disabled>
                                <option value="" v-for="agencyLevel in statuslist.comNature" :selected="item.basicInfo == agencyLevel.optionCode ? true : false">
                                    {{agencyLevel.optionName}}
                                </option>
                            </select>
                        </span>
                    </li>
                    <li>
                        <span>注册资本金</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.comRegisteredCapital}}</span>

                    </li>
                    <li>
                        <span>年营业额</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.comIncome}}</span>
                    </li>
                    <li>
                        <span>经销商层级</span>
                        <!-- <span>{{item.basicInfo == null ? '' : item.basicInfo.agencyLevel}}</span> -->
                        <span>
                            <select class="" name="" disabled>
                                <option value="" v-for="comNature in statuslist.agencyLevel" :selected="item.basicInfo.agencyLevel == comNature.optionCode ? true : false">
                                    {{comNature.optionName}}
                                </option>
                            </select>
                        </span>
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
                <div class="assetsinfoul" v-for="otherpeople in item.debtInfo">
                    <h3>{{otherpeople.repurchaseType == '1' ? '回购人' : '回购方实际控制人'}}</h3>
                    <ul class="infolist">
                        <li>
                            <span>回购人</span>
                            <span>
                                {{otherpeople.personName}}
                            </span>
                        </li>
                        <li>
                            <span>债务种类</span>
                            <span>{{otherpeople.debtType}}</span>
                        </li>
                        <li>
                            <span>债务余额（元）</span>
                            <span>{{otherpeople.debtBalance}}</span>
                        </li>
                        <li>
                            <span>担保余额（元）</span>
                            <span>{{otherpeople.guaranteeBalance}}</span>
                        </li>
                        <li>
                            <span>被担保人</span>
                            <span>{{otherpeople.warrantee}}</span>

                        </li>
                        <br>
                        <li class="subliWidth">
                            <p class="bz">备注</p>
                            <div class="batextarrear">
                                <!-- {{item.debtInfo == null ? '' : item.debtInfo.remark}} -->
                                <!-- <textarea
                                    name="name"
                                    rows="2"
                                    cols="80"
                                    :value="otherpeople.remark"
                                    class="textareavalues"
                                    disabled>
                                </textarea> -->
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder=""
                                    class="inputtext"
                                    disabled
                                    v-model="otherpeople.remark">
                                </el-input>
                            </div>
                        </li>
                    </ul>
                </div>

                <componentitle :message="message='回购人相关影像资料'"/>
                <div class="imgbox" v-for="value in imgFile">
                    <h3>{{value.nodeName}}</h3>
                    <ul>
                        <imgLine :name="val" :type="key" :relationId="item.basicInfo.id" :bussNo="bussNo" v-for="(val,key) in value.nodes"/>
                    </ul>
                </div>
            </el-tab-pane>

        </el-tabs>

    </div>

</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import {urlParse} from "../../../utils/utils";
import imgLine from './imgLine';
export default {
    data() {
        return {
            message: '',
            backpeople: [],
            tableNull: '',
            partner: '',
            imgFile: [],
            id: '',
            bussNo:'',
            statuslist: {
                agencyLevel: [],
                comNature: []
            }
        }
    },
    created() {
        // this.$post('/repurchase/info',{
        //     bussNo: 'CON_ZZ02_0000_201904_0001'
        //     // bussNo: this.$route.query.bussNo
        // }).then( res => {
        //
        //     this.backpeople = res.data.data;
        //
        //     console.log(res.data.data.debtInfo,'回购人');
        // });
        let data = urlParse();
        this.id = data.id;
        this.bussNo = data.bussNo;
        this.getStockPriceByNames();
        this.$post('/getConstantConfig',{
            dictionaryCode: ['agencyLevel','comNature']
        }).then(res => {
            this.statuslist.agencyLevel = res.data.data.agencyLevel;
            this.statuslist.comNature = res.data.data.comNature;
        })
    },
    methods: {
        async getStockPriceByNames(res) {
          this.partner = await (() =>
              this.$post('/repurchase/info',{
                  // bussNo: 'CON_ZZ02_0000_201904_0001'
                 bussNo: this.$route.query.bussNo
              }).then( res => {
                  if(res.data.code == '2000000') {
                      this.backpeople = res.data.data;
                      console.log(this.backpeople,'11111110-0');
                      for(let i = 0 ; i < this.backpeople.length ; i ++ ) {
                          console.log(this.backpeople[i].basicInfo.partnerType);
                          if(this.backpeople[i].basicInfo.partnerType == null) {
                              this.$message.error('回购人当前没有影像资料');
                              console.log(this.backpeople[i].basicInfo,'回购人')
                          }
                          return this.backpeople[i].basicInfo.partnerType;
                      }
                  }
              })

          )();
          const stockPrice = await (() => {
              const matType = {"NAT":"NATURAL_MATERIAL","LEG":"LEGAL_MATERIAL"};
              if (!matType[this.partner]) {
                  this.$message.error('无回购人信息');
                  return;
              }
              return this.$post('/materialTree',{
                  materialType: matType[this.partner]
              }).then( res => {
                  if(res.data.code == '2000000') {
                      this.imageslist = res.data.data;
                      let treeInfo = res.data.data;
                      let tempArr = [];
                      Object.keys(treeInfo).forEach((key) => {
                         tempArr.push(treeInfo[key]);
                      });
                      this.imgFile = tempArr;
                  }
              })
          })();

        },
    },
    components: {
        componentitle,
        imgLine
    }
}
</script>
<style lang="less">
.buybackpeople {
    h3 {
        padding-left: 15px;
    }
    .imgbox {
        clear: both;
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
            clear:both;
            &:last-child {
                margin-bottom: 30px;
            }
            li {
                width: 100%;
                // height: 100px;
                text-align: center;
                clear: both;
                border-bottom: 1px solid #EBEBF5;
                border-bottom: 1px solid #EBEBF5;
                overflow: hidden;
                position: relative;
                min-height: 100px;
                div {
                    color: #606266;
                }
            }
        }
    }
}
</style>
