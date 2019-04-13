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



const data = Mock.mock('/datalist',getData);
const dataName = Mock.mock('/dataNames',nameData);
const list = Mock.mock('/datalists',datas);
const imageslist = Mock.mock('/imageslist',images);
const queryElement = Mock.mock('/lease/queryElement',queryData);
const queryDatas = Mock.mock('api/lease/query',leasequery);
const ternalinfo = Mock.mock('/surveyinformation/info',externalinfo);

export default {data,dataName,list,imageslist,queryData,leasequery,ternalinfo};
