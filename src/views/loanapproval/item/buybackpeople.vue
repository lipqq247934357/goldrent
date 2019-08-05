<template>
<div class="buybackpeople tabsinfo">
    <div class="subtabs">
        <el-tabs type="border-card">
            <el-tab-pane v-for="(item,index) in backpeople" :label="'回购人' + parseInt(index+1)">
                <componentitle :message="message='基本信息'" />
                <ul class="infolist byinfolist" v-if="item.basicInfo.socialSerial" >
                    <li>
                        <span>统一社会信用代码</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.socialSerial}}</span>
                    </li>
                    <li>
                        <span>回购人名称</span>
                        <span>
                            {{item.basicInfo == null ? '' : item.basicInfo.comFullname}}
                        </span>
                    </li>
                    <li>
                        <span>企业性质</span>
                        <span v-for="agencyLevel in statuslist.comNature" v-if="item.basicInfo.comNature == agencyLevel.optionCode">
                            <!-- <select class="" name="" disabled>
                                <option value="" v-for="agencyLevel in statuslist.comNature" :selected="item.basicInfo == agencyLevel.optionCode ? true : false">
                                    {{agencyLevel.optionName}}
                                </option>
                            </select> -->
                            {{agencyLevel.optionName}}
                        </span>
                        <span v-if="item.basicInfo.comNature == null"></span>
                    </li>
                    <li>
                        <span>注册资本金（万元）</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.comRegisteredCapital}}</span>

                    </li>
                    <li>
                        <span>年营业额（万元）</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.comIncome}}</span>
                    </li>
                    <li>
                        <span>经销商层级</span>
                        <span v-for="comNature in statuslist.agencyLevel" v-if="item.basicInfo.agencyLevel == comNature.optionCode">
                            <!-- <select class="" name="" disabled>
                                <option value="" v-for="comNature in statuslist.agencyLevel" :selected="item.basicInfo.agencyLevel == comNature.optionCode ? true : false">
                                    {{comNature.optionName}}
                                </option>
                            </select> -->
                            {{comNature.optionName}}
                        </span>
                        <span v-if="item.basicInfo.agencyLevel == null"></span>
                    </li>
                    <li>
                        <span>回购方负责人姓名</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.comManager}}</span>
                    </li>
                    <li>
                        <span>回购方负责人电话</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.comMobile}}</span>
                    </li>
                    <li style="border-bottom: 0;">
                        <span>回购条件(逾期天数)</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.overdueDays}}</span>
                    </li>
                    <!-- <li style="border-bottom: 0;">
                        <span>咨询服务费</span>
                        <span>{{item.basicInfo == null ? '' : item.basicInfo.serviceFee}}</span>
                    </li> -->
                </ul>
                <componentitle :message="message='负债及对外担保情况'"/>
                <div class="assetsinfoul" v-for="otherpeople in item.debtInfo">
                    <h3>&nbsp;&nbsp;&nbsp;{{otherpeople.repurchaseType == '1' ? '回购人' : '回购方实际控制人'}}</h3>
                    <ul class="infolist byinfolist">
                        <li>
                            <span>{{otherpeople.repurchaseType == '1' ? '回购人' : '回购方实际控制人'}}</span>
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
                            <span>{{otherpeople.debtBalance && formatNumber(otherpeople.debtBalance)}}</span>
                        </li>
                        <li>
                            <span>担保余额（元）</span>
                            <span>{{otherpeople.guaranteeBalance && formatNumber(otherpeople.guaranteeBalance)}}</span>
                        </li>
                        <li style="border-bottom: 0;">
                            <span>被担保人</span>
                            <span>{{otherpeople.warrantee}}</span>
                        </li>
                        <br>
                        <li class="subliWidth">
                            <p class="bz">备注</p>
                            <div class="batextarrear">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder=""
                                    class="inputtext"
                                    readonly
                                    v-model="otherpeople.remark">
                                </el-input>
                            </div>
                        </li>
                    </ul>
                </div>

                <componentitle :message="message='回购人相关影像资料'"/>
                <div class="imgbox-less" v-for="value in imgFile">
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
import {formatNumber} from '../../../components/mixins/formatter/index';

export default {
    data() {
        return {
            message: '',
            backpeople: [], // 获取回购人list这是主数组用于循环回购人
            tableNull: '',
            partner: '', // 储存法人还是自然人NAT自然人	 LEG法人
            imgFile: [], //预览图片文件
            id: '', //当前id
            bussNo:'', // 订单号
            statuslist: { // 字典编码
                agencyLevel: [],
                comNature: []
            }
        }
    },
    created() {
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
                 bussNo: this.$route.query.bussNo
              }).then( res => {
                  // basicInfo
                  //   基本信息
                  //
                  //   id	数据ID	String
                  //   comFullname	回购人名称	String
                  //   comNature	企业性质	String
                  //   comRegisterdCapital	注册资金	double
                  //   comIncome	年营业额	double
                  //   agencyLevel	经销商层级	String
                  //   comManager	回购方负责人姓名	String
                  //   comMobile	回购方负责人电话	String
                  //   feeRequire	是否收取服务费	String
                  //   serviceFee	咨询服务费	double
                  //   Object
                  //   debtInfo
                  //   负债及对外担保情况
                  //
                  //   id	数据ID	String
                  //   repurchaseType
                  //   回购人类型
                  //
                  //   1:回购人
                  //
                  //   2:回购方实际控制人
                  //
                  //   String
                  //
                  //   personName	姓名	String
                  //   debtType	债务种类	String
                  //   debtBalance	债务余额	double
                  //   warrantee	被担保人	String
                  //   guaranteeBalance	担保余额	double
                  //   remark	备注	String
                  if(res.data.code == '2000000') {
                      this.backpeople = res.data.data;
                      // console.log(this.backpeople[0].basicInfo);
                      for(let i = 0 ; i < this.backpeople.length ; i ++ ) {
                          if(this.backpeople[i].basicInfo.partnerType == null) {
                              // this.$message.error('回购人当前没有影像资料');
                              continue;
                          }
                          // console.log(this.backpeople[i].basicInfo.partnerType,'<<<<<<');
                          return this.backpeople[i].basicInfo.partnerType;
                      }
                  }
              })

          )();
          // 图片树形结构
          const stockPrice = await (() => {
              const matType = {"NAT":"NATURE_MATERIAL","LEG":"LEGAL_MATERIAL"};
              if (this.partner == undefined) {
                  return;
              }
              console.log(this.partner);
              return this.$post('/materialTree',{
                  materialType: matType[this.partner]
              }).then( res => {
                  if(res.data.code == '2000000') {
                      this.imageslist = res.data.data;
                      let treeInfo = res.data.data.LEGAL_MATERIAL;
                      let tempArr = [];
                      Object.keys(treeInfo).forEach((key) => {
                         tempArr.push(treeInfo[key]);
                      });
                      this.imgFile = tempArr;
                  }
              })
          })();

        },
        formatNumber
    },
    components: {
        componentitle,
        imgLine
    }
}
</script>
<style lang="less">
.buybackpeople {
    margin: 15px 0;
    .alldata {
        margin-top: 15px;
    }
    h3 {
        background: #f5f5f5;
        margin: 0;
        margin-top: -5px;
        position: relative;
        height: 50px;
        line-height: 50px;
        color: #585858;
        border: 1px solid #afafaf;
    }
    .byinfolist {
        margin-top: -1px;
    }
    .imgbox {
        clear: both;
        h3 {
            font-size: 16px;
            // margin: 35px 0 35px 15px;
            font-weight: bold;
            padding-left: 15px;
        }
        .imglist {
            margin-top: 16px;
        }
        .imgeslist {
            img {
                float: left;
                margin-left: 15px;
            }
        }
        ul {
            width: 99.9%;
            margin: 0 auto;
            border: 1px solid #afafaf;
            clear:both;
            &:last-child {
                margin-bottom: 30px;
            }
            li {
                width: 100%;
                text-align: center;
                clear: both;
                border-bottom: 1px solid #afafaf;
                border-bottom: 1px solid #afafaf;
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
