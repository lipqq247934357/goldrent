import Mock from 'mockjs'

const Random = Mock.Random;

function listBussInfo() {
    let datalist = {
        code: '2000000',
        msg: 'ok',
        total:11,
    };
    let arr = [];
    for (let i = 0; i < 11; i++) {
        let newData = {
            id: 1,
            bussNo: '1', //  Random.csentence( min, max )
            custName: 'custName',
            taskname: 'taskname',
            status: '1',
            createTime: '20180101 12:23:23',
            finishTime: '20180101 12:23:23'
        }
        arr.push(newData);
    }
    datalist.data = arr;
    return {
        data: datalist
    }
}


const data = Mock.mock('/buss/listBussInfo', listBussInfo);

export default {data};
