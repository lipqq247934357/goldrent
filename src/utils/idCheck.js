
export function IDcode(card){
        //身份证地区
        var areaID = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        };
        //性别
        var sexMap = {
            0: "女",
            1: "男"
        };
        /*********************************************
         * 检验身份证格式是否正确
         ********************************************/
        var checkIdCard = function(IDCard) {
            var iSum = 0;
            var info = "";
            if (!/^\d{17}(\d|x)$/i.test(IDCard))
                return {
                    status: false,
                    message: '你输入的身份证长度或格式错误!'
                };
            IDCard = IDCard.replace(/x$/i, "a");
            if (areaID[parseInt(IDCard.substr(0, 2))] == null)
                return {
                    status: false,
                    message: '你的身份证地区非法!'
                };
            var sBirthday = IDCard.substr(6, 4) + "-" + Number(IDCard.substr(10, 2)) + "-" + Number(IDCard.substr(12, 2));
            var d = new Date(sBirthday.replace(/-/g, "/"));
            if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))
                return {
                    status: false,
                    message: '身份证上的出生日期非法!'
                };
            for (var i = 17; i >= 0; i--)
                iSum += (Math.pow(2, i) % 11) * parseInt(IDCard.charAt(17 - i), 11);
            if (iSum % 11 != 1)
                return {
                    status: false,
                    message: '你输入的身份证号非法!'
                };
            //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
            return {
                status: true,
                message: '校验成功！'
            };
        };
        /*********************************************
         * 根据身份证号获取性别
         *********************************************/
        var getSexByIdCard = function(idCard) {
            if (idCard.length == 15) {
                return sexMap[idCard.substring(14, 15) % 2];
            } else if (idCard.length == 18) {
                return sexMap[idCard.substring(14, 17) % 2];
            } else {
                //不是15或者18,null
                return '';
            }
        };
        /*********************************************
         * 根据身份证号获取生日
         *********************************************/
        var getBirthdayByIdCard = function(idCard) {
            var birthStr;
            if (15 == idCard.length) {
                birthStr = idCard.charAt(6) + idCard.charAt(7);
                if (parseInt(birthStr) < 10) {
                    birthStr = '20' + birthStr;
                } else {
                    birthStr = '19' + birthStr;
                }
                birthStr = birthStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11);
            } else if (18 == idCard.length) {
                birthStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13);
            }
            return birthStr;
        };
        /*********************************************
         * 根据身份证号获取出生地
         *********************************************/
        var getAreaByIdCard = function(idCard) {
            return areaID[parseInt(idCard.substr(0, 2))];
        };
        /*********************************************
         * 根据身份证号获取年龄
         *********************************************/
        var getAgeByIdCard = function(idCard) {
            var birthStr = getBirthdayByIdCard(idCard);
            var r = birthStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null) return '';
            var d = new Date(r[1], r[3] - 1, r[4]);
            if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                var Y = new Date().getFullYear();
                return (Y - r[1]);
            } else {
                return '';
            }
        };
        let $arr = new Array();
        $arr['Status'] = checkIdCard(card).status;
        $arr['msg'] = checkIdCard(card).message;
        if (checkIdCard(card).status) {
            $arr['Sex'] = getSexByIdCard(card);
            $arr['Date'] = getBirthdayByIdCard(card);
            $arr['Add'] = getAreaByIdCard(card);
            $arr['Age'] = getAgeByIdCard(card);
        }
        return $arr;
    }
export default {IDcode}
