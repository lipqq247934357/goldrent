let data = {
    partnerTypeOptions: [
        {
            value: 'NAT',
            label: '自然人'
        },
        {
            value: 'LEG',
            label: '法人'
        }
    ],
    sexOptions: [
        {
            value: 'M',
            label: '男'
        },
        {
            value: 'F',
            label: '女'
        }
    ],
    // custEducationOptions: [
    //     {
    //         value: 'college',
    //         label: '大专及以上'
    //     },
    //     {
    //         value: 'senior',
    //         label: '高中'
    //     },
    //     {
    //         value: 'middle',
    //         label: '初中'
    //     },
    //     {
    //         value: 'primary',
    //         label: '初中以下'
    //     }
    // ],
    custMarriageOptions: [
        {
            value: "married",
            label: "已婚"
        },
        {
            value: "widowed",
            label: "丧偶"
        },
        {
            value: "unmarried",
            label: "未婚"
        },
        {
            value: "divorced",
            label: "离异"
        },
    ]
};
export default {
    methods: {
        formatCusType(row, column, cellValue) {
            for (let item of data.partnerTypeOptions) {
                if (item.value == cellValue) {
                    return item.label;
                }
            }
        },
        formatSex(row, column, cellValue) {
            for (let item of data.sexOptions) {
                if (item.value == cellValue) {
                    return item.label;
                }
            }
        },
        formatMariage(row, column, cellValue) {
            for (let item of data.custMarriageOptions) {
                if (item.value == cellValue) {
                    return item.label;
                }
            }
        },
        formatAmount(row, column, cellValue) {
            return this.formatNumber(cellValue, 2);
        },
        /**
         * 格式化金额
         */
        /**
         * 格式化数字千分位逗号分割(可限制小数位保留位数)
         * s  金额
         * n  保留位数
         */
        formatNumber(s, n) {
            if (s === undefined) return;
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        },
    }
}

export function formatNumber(s, n) {
    if (s === undefined) return;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

