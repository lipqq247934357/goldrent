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
        }
    }
}
