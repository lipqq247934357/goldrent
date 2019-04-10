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
const data = Mock.mock('/datalist',getData)
const dataName = Mock.mock('/dataNames',nameData)
const list = Mock.mock('/datalists',datas)
export default {data,dataName,list};
