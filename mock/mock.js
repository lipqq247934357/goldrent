import Mock from 'mockjs'

const Random = Mock.Random;

function getData(){
  let datalist= [];
  for (let i = 0; i < 100; i++) {
    let newData = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    datalist.push(newData)
  }
  return {
    data: datalist
  }
}
function nameData(){
  let namelist= [];
  for (let i = 0; i < 30; i++) {
    let newData = {
      address: Random.city(), //  Random.csentence( min, max )
      // name: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    namelist.push(newData)
  }
  return {
    dataName: namelist
  }
}
function images(){
  let imageslist= [];
  for (let i = 0; i < 10; i++) {
    let newData = {
      images: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      name: Random.cname() // Random.cname() 随机生成一个常见的中文姓名
    }
    imageslist.push(newData)
  }
  return {
    dataName: imageslist
  }
}
function datas(){
  let list = {
      address: Random.city(),
      name: Random.cname(),
      id: Random.id()
  }
  return {
      datalists: list
  }
}

// 租赁要素

function queryData(){
    // 接口地址 /lease/queryElement

//     id	订单ID	varchar(32)	否
// leaseInfoId	租赁物信息ID	varchar(32)	否
// bussNo	订单号	varchar(32)	是
// leaseMode	租赁模式	varchar(2)	是
// leaseName	租赁物名称	varchar(32)	是
// purchaseAmt	购置价格	decimal(20,6)	是
// financeAmt	融资金额	decimal(20,6)	是
// firstPayAmt	首付款金额	decimal(20,6)	是
// allowanceAmt	补贴金额	decimal(20,6)	是
// allowanceDate	补贴时间	timestamp	是
// startDate	计划起租日	timestamp	是
// endDate	计划终止日	timestamp	是
// leaseTerm	租赁期限	int(4)	是
// leaseRate	租赁利率	decimal(20,6)	是
// rebateAmt	厂商返利金额	decimal(20,6)	是
// lesseeRiskAmt	承租人风险金	decimal(20,6)	是
// riskAmt	风险金额	decimal(20,6)	是
// payWay	租金支付方式	varchar(2)	是
// depositAmt	留购价款	decimal(20,6)	是
// settleAhead	提前结清	decimal(20,6)	是
  let queryElement = {
      id: Random.guid(),
      leaseInfoId: Random.cname(),
      bussNo: Random.id(),
      leaseMode: '直租',
      leaseName: '汽车',
      purchaseAmt: '20万',
      financeAmt: '100万',
      firstPayAmt: '50万',
      allowanceAmt: '1000',
      allowanceDate: '2019-01-01',
      startDate: '2019-01-01',
      endDate: '2019-01-02',
      leaseTerm: '10年',
      leaseRate: '1%',
      rebateAmt: '1000',
      lesseeRiskAmt: '1000',
      riskAmt: '1000',
      payWay: '11111',
      depositAmt: '2000',
      settleAhead: '1123',
      placeUse: Random.city(),
      earningRate: '1%',
      leaseAmount: '10万'
  }
  return {
      data: queryElement
  }
}

function leasequery(){
    // 租赁物信息

    // 接口地址 api/lease/query

    // id	租赁物ID	varchar(32)	否
    // bussNo	订单号	varchar(32)	是
    // leaseName	租赁物名称及规格型号	varchar(32)	是
    // purchasePrice	购置价格	decimal(20,6)	是
    // serialNo	唯一识别码	varchar(32)	是
    // serialNoType	识别码型号	varchar(32)	是
    // deliveryPlace	交付地点	varchar(100)	是
    // mortgage	是否抵押	varchar(2)	是
    // mortgageAgency	抵押管理机关	varchar(32)	是
    // insuranceType	险种	varchar(32)	是
    // insuranceCompany	保险公司	varchar(32)	是
    // insuranceTerm	保险期限	varchar(4)	是
    // insuranceBuyTime	购买时间	timestamp	是
    // firstBeneficiary	第一受益人	varchar(32)	是
    // remark	备注	varchar(200)	是
  let leasequery = {
      id: Random.guid(),
      bussNo: Random.id(),
      leaseName: Random.cname(),
      purchasePrice: '20万',
      serialNo: Random.guid(),
      serialNoType: Random.guid(),
      deliveryPlace: Random.city(),
      mortgage: '否',
      mortgageAgency: Random.city(),
      insuranceType: '强险',
      insuranceCompany: '太平洋保险',
      insuranceTerm: '20年',
      insuranceBuyTime: '2019-02-02',
      firstBeneficiary: Random.cname(),
      remark: '无'
  }
  return {
      data: leasequery
  }
}


function externalinfo(){
    // 外部信息
    // 接口地址 /surveyinformation/info
    // id: 主键ID
    // bussNo: 订单号
    // lesseeCredit: 承租人征信情况描述(含配偶)
    // guarantorCredit: 保证人征信情况描述(含配偶)
    // repurchaseCredit: 回购人征信情况描述(含实际控制人)
    // lesseeCreditZhongdeng: 承租人中登网查询描述
    // lesseeCreditExternal: 承租人外部信息查询描述(含配偶)
    // guarantorCreditExternal：保证人外部信息查询描述((含配偶)
    // repurchaseCreditExternal： 回购人外部信息查询描述(含实际控制人)
    // creator： 创建人
    // createTime： 创建时间
    // editor：修改人
    // editTime： 修改时间
  let externalinfo = {
      id: Random.guid(),
      bussNo: Random.id(),
      lesseeCredit: Random.paragraph(2),
      guarantorCredit: Random.paragraph(2),
      repurchaseCredit: Random.paragraph(2),
      lesseeCreditZhongdeng: Random.paragraph(2),
      lesseeCreditExternal: Random.paragraph(2),
      guarantorCreditExternal: Random.paragraph(2),
      repurchaseCreditExternal: Random.paragraph(2),
      creator: Random.paragraph(2),
      createTime: '2019-02-02',
      editor: Random.cname(),
      editTime:'2019-02-02'
  }
  return {
      data: externalinfo
  }
}

function investigation(){
    // 调查环节综素
    // 接口地址 /app/api/getSurveyConclusion
    // conclusion: 调查结论
    // //  房产抵押
    // houseMortgager： {
    //     id	ID	 	varchar(32)
    //     mortgager	抵押人	 	varchar(20)
    //     relation	与承租人关系	 	varchar(20)
    //     certificate	产权证号	 	varchar(40)
    //     area	面积,单位/平方米	 	decimal(12,6)
    //     structure	建筑结构	 	varchar(10)
    //     evaluateValue	评估价值,单位/元	 	decimal(20,6)
    //     remark	备注	 	varchar(100)
    //     status	状态
    // }
    // 土地使用权抵押
    // landMortgager: {
    //     id	ID	 	varchar(32)
    //     mortgager	抵押人	 	varchar(20)
    //     relation	与承租人关系	 	varchar(20)
    //     certificate	产权证号	 	varchar(40)
    //     landType	土地类型	 	varchar(10)
    //     landTerm	土地使用期限,单位/年	 	varchar(4)
    //     area	面积,单位/平方米	 	decimal(12,6)
    //     location	坐落'	 	varchar(100)
    //     evaluateValue	评估价值,单位/元	 	decimal(20,6)
    //     remark	备注	 	varchar(100)
    //     status	状态	 	varchar(2)
    // }
  let investigation = {
     conclusion: Random.paragraph(2),
     houseMortgager: {
         id: Random.guid(),
         mortgager:	Random.cname(),
         relation: '子',
         certificate: Random.guid(),
         area: '80²',
         structure:	'float',
         evaluateValue:	'100万',
         remark: "Random.paragraph(2)",
         status: 'xxxxx'
     },
     landMortgager: {
         id: Random.guid(),
         mortgager:	Random.cname(),
         relation: '妻',
         certificate: Random.guid(),
         landType: '宅基地',
         landTerm:	'70/年',
         area: '80²',
         location: Random.city(),
         evaluateValue:	'100万',
         remark: "Random.paragraph(2)",
         status: 'xxxx'
     }
  }
  return {
      data: investigation
  }
}

function buybackpeople(){
    // 回购人信息
    // 接口地址 /api/repurchase/info
    // basicInfo: {
    //     id	数据ID	String
    //     comFullname	回购人名称	String
    //     comNature	企业性质	String
    //     comRegisterdCapital	注册资金	double
    //     comIncome	年营业额	double
    //     agencyLevel	经销商层级	String
    //     comManager	回购方负责人姓名	String
    //     comMobile	回购方负责人电话	String
    //     feeRequire	是否收取服务费	String
    //     serviceFee	咨询服务费	double
    // }
    // debtInfo: {
    //     id	数据ID	String
    //     repurchaseType
    //     回购人类型 1:回购人 2:回购方实际控制人 String
    //     personName	姓名	String
    //     debtType	债务种类	String
    //     debtBalance	债务余额	double
    //     warrantee	被担保人	String
    //     guaranteeBalance	担保余额	double
    //     remark	备注
    // }
  let buybackpeople = {
      basicInfo: {
          id: Random.guid(),
          comFullname: Random.cname(),
          comNature: '私企',
          comRegisterdCapital: '1000万',
          comIncome: '5000万',
          agencyLevel: '一级',
          comManager: Random.cname(),
          comMobile: '1102023828123',
          feeRequire: '是',
          serviceFee: '10',
      },
      debtInfo: {
          id: Random.guid(),
          repurchaseType: '',
          personName: Random.cname(),
          debtType:	'贷款',
          debtBalance: '100万',
          warrantee: Random.cname(),
          guaranteeBalance: '1000万',
          remark: "Random.paragraph(2)"
      }
  }
  return {
      data: buybackpeople
  }
}


function lesseeinfo(){
    // 承租人信息
        // 接口地址 /api/leasee/info
        // bussNo: 订单号
        // naturalData: {
        //     custType:客户类别
        //     custName: 性别
        //     custSex： 性别
        //     custAge： 年龄
        //     certNo： 身份证号
        //     custMarriage：婚姻状况
        //     custHomeplace: 户籍地址
        //     custAddress：现住地址
        //     cultureYears： 种植年限
        //     residenceYears： 申请地居住年限
        //     custMobile：联系电话
        //     custWechat： 微信
        // }
  let lesseeinfo= [];
  for (let i = 0; i < 3; i++) {
    let newData = {
        bussNo: Random.id(),
        naturalData: {
            custType: 'A类客户',
            custName: Random.cname(),
            custSex: '男',
            custAge: '30',
            certNo: Random.id(),
            custMarriage: '未婚',
            custHomeplace: Random.city(),
            custAddress: Random.city(),
            cultureYears: '10年',
            residenceYears: '20年',
            custMobile: Random.increment(11),
            custWechat: Random.increment(10),
            //房产类型
            assetsHouses: {
                type: '商用住宅',
                acreage: '80㎡',
                currEvaluation: '100万',
                owner: '本人',
                mortgage: '否',
                address: Random.city()
            },
            // 土地
            assetsLands: {
                id:	Random.id(),
                acreage: '70²',
                value:	'20万',
                contractLife: '10年',
                mortgage: 'N',
                address: Random.city(),
                checkMode: '手动',
                status: '正常'
            },
            // 金融资产
            assetsFinances: {
                id: Random.id(),
                deposit: '20万',
                bigDeposit: '100万',
                bond: '无',
                shares: '无',
                products:  '无',
                status: '正常'
            },
            // 车产
            assetsVehicles: {
                id: Random.id(),
                buyTime: '2019-02-02',
                currEvaluation:	'20万',
                owner: Random.cname(),
                mortgage: 'N',
                serialNo: '京B BB110',
                status: '正常'
            },
            // 农机具
            assetsFarmTools: {
                id: Random.id(),
                buyTime: '2019-02-02',
                currEvaluation:	'20万',
                owner: Random.cname(),
                mortgage: 'N',
                serialNo: '京B BB110',
                status: '正常'
            },
            // assetsOthers 其他产
            assetsOthers: {
                id: Random.id(),
                value: '20万',
                currEvaluation: '100万',
                mortgage: 'Y',
                owner: Random.cname(),
                status: '正常',
                remark: 'haha'
            },
            // 债务情况
            debtSituations: {
                id: Random.id(),
                debtSituation: '负债',
                debtType: '房贷',
                debtPerson: Random.cname(),
                debtBalance: '20万',
                debtTerm: '20年',
                remark: '备注',
                status: '正常'
            },
            debtGuarantees: {
                id: Random.id(),
                externalGuarantee: '对外担保',
                creditor: Random.cname(),
                guaranteeBalance: '20万',
                warrantee: Random.cname(),
                withWarranteeRelation: '子',
                remark: '备注',
                status: ' 状态'
            },
            // 其他负债
            debtOthers: {
                id: Random.id(),
                creditor: Random.cname(),
                debtBalance: '20万',
                debtMaturity: '20期',
                isGuarantee: 1,
                remark:' 备注',
                status: '状态'
            },
            // incomePlants 土地收入
            incomePlants: {
                id: Random.id(),
                plantType: '水稻',
                plantArea: '20亩',
                oneCost: '200',
                oneIncome :'1000',
                surplus: '800',
                status: '	状态',
                remark: '备注'
            },
            // incomeFarmMachineryWork 农机具作业收入
            incomeFarmMachineryWork: {
                id: Random.id(),
                plantType: '水稻',
                plantArea: '20亩',
                oneCost: '200',
                oneIncome :'1000',
                surplus: '800',
                status: '	状态',
                remark: '备注'
            },
            // incomeOthers 其他收入
            incomeOthers: {
                id: Random.id(),
                prevYearIncome: '1000',
                prevYearPay: '200',
                currYearIncome:	'1200',
                currYearPay: '300',
                surplus: '900',
                status: '状态',
                remark:	'备注	varchar(150)	 '
            },
            incomeDebtRatios: {
                id: Random.id(),
                total_surplus: '10万',
                annual_rental_expense: '10',
                other_debt_expense: '20',
                total_annual_expense: '30',
                income_debt_ratio: '1%',
                status: '状态'

            }
        }
    }
    lesseeinfo.push(newData)
  }
  return {
    data: lesseeinfo
  }
}

const data = Mock.mock('/datalist',getData);
const dataName = Mock.mock('/dataNames',nameData);
const list = Mock.mock('/datalists',datas);
const imageslist = Mock.mock('/imageslist',images);
const queryElement = Mock.mock('/lease/queryElement',queryData);
const queryDatas = Mock.mock('api/lease/query',leasequery);
const ternalinfo = Mock.mock('/surveyinformation/info',externalinfo);
const tigation = Mock.mock('/app/api/getSurveyConclusion',investigation);
const backpeople = Mock.mock('/api/repurchase/info',buybackpeople);
const lesseeinfos = Mock.mock('/api/leasee/info',lesseeinfo);

export default {data, dataName, list, imageslist, queryData, leasequery, ternalinfo, investigation, lesseeinfos};
