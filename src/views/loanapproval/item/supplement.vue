<template>
<div
    class="supplement loanmoneycomp"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <componentitle :message="message='补充内容'" />
    <div class="supplementTextarea">
        <p>补充内容描述：</p>
        <el-input type="textarea" :row="3" v-model="needInputTextarea" class="inputTextarea" disabled></el-input>
    </div>
    <componentitle :message="message='租赁物情况'" />
    <div class="supplementTextarea">
        <div class="renttable">
            <p>唯一识别号</p>
            <p>{{shibiehao}}</p>
            <p>识别号类型</p>
            <p v-for="itemtype in selectlist"
               v-if="itemtype.optionCode == shibieType">
                {{itemtype.optionName}}
            </p>
        </div>
    </div>
    <componentitle :message="message='影像资料'" />
    <div class="supplementImgList div3">
        <div class="imgbox" v-for="value in supplementimgFile">
            <h3>{{value.nodeName}}</h3>
            <ul>
                <imgLine :bussNo="bussNo" relationId="SUPPLEMENT_MATERIAL" v-for="(val,key,index) in value.nodes"
                         :index="index" :name="val" :type="key" />
            </ul>
        </div>
    </div>

    <componentitle :message="message='审批意见流水'" />
    <el-table
            :data="data"
            border
            size="small"
            row-key="id"
            style="width: 100%">
        <el-table-column
                label="序号"
                min-width="110px"
                type="index">
        </el-table-column>
        <el-table-column
                label="处理人"
                prop="operator">
        </el-table-column>
        <el-table-column
                label="操作时间"
                min-width="110px"
                prop="editTime">
        </el-table-column>
        <el-table-column
                label="审批环节"
                prop="taskName">
        </el-table-column>
        <el-table-column
                label="审批意见"
                prop="opinion">
        </el-table-column>
        <el-table-column
                min-width="250px"
                label="意见描述"
                prop="comments">
        </el-table-column>
    </el-table>

    <componentitle :message="message='放款审批意见'" />
    <div class="supplementTextarea">
        <p>意见描述：</p>
        <el-input type="textarea" :row="3" v-model="inputTextarea" class="inputTextarea"></el-input>
    </div>
    <div class="bottombutton">
        <el-button :disabled="inputdisabled" @click="save" type="primary" v-loading.fullscreen.lock="fullscreenLoading">通过</el-button>
        <el-button :disabled="inputdisabled" @click="adopt" type="primary" v-loading.fullscreen.lock="fullscreenLoading">退回</el-button>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import imgLine from '../../../views/loanapproval/item/imgLine.vue';
export default {
    data() {
        return {
            inputTextarea: '',
            imgFile: [],
            supplementimgFile: [],
            data: [],
            needInputTextarea: '',
            bussNo: '',
            inputdisabled: false, // 判断是否是可编辑状态
            loading: false,
            shibiehao: '',  //识别号
            shibieType: '', // 识别号类型
            selectlist: [], // 字典编码
            fullscreenLoading: false,
        }
    },
    created() {

        this.bussNo = this.$route.query.bussNo;

        this.getData();

        if(this.$route.query.disabled == 1) {
            this.inputdisabled = true;
        } else {
            this.inputdisabled = false;
        }

        this.$post('/materialTree', {
            materialType: 'ASSIGN_MATERIAL'
        }).then(res => {
            let treeInfo = res.data.data.ASSIGN_MATERIAL;
            let tempArr = [];
            Object.keys(treeInfo).forEach((key) => {
                tempArr.push(treeInfo[key]);
            });
            this.imgFile = tempArr;
        })

        this.$post('/materialTree', {
            materialType: 'SUPPLEMENT_MATERIAL'
        }).then(res => {
            let treeInfo = res.data.data.SUPPLEMENT_MATERIAL;
            let tempArr = [];
            Object.keys(treeInfo).forEach((key) => {
                tempArr.push(treeInfo[key]);
            });
            this.supplementimgFile = tempArr;
        })

        this.$get(`/LoanGrantOpinion/loanGrantSupplementDetail?bussNo=${this.$route.query.bussNo}`).then(res => {
            if (res.data.code == '2000000') {
                this.inputTextarea = res.data.data.reasonDescription
            }
        });

        this.$post('/LoanGrantOpinion/querySupplementInfo',{
            bussNo: this.$route.query.bussNo
        }).then(res => {
            if (res.data.code == '2000000') {
                this.needInputTextarea = res.data.data.supplementDesc;
                this.shibiehao = res.data.data.serialNumber;
                this.shibieType = res.data.data.serialNumberType;
            }
        });

        this.$post('/getConstantConfig', {
            dictionaryCode: ['serialNumberType']
        }).then(res => {
            console.log(res);
            this.selectlist = res.data.data.serialNumberType;
        })
    },
    methods: {
        async getData() {
            let data = await this.$post('/conclusions', {bussNo: this.$route.query.bussNo || this.bussNo});
            if (data.data.code == '2000000') {
                this.data = data.data.data;
            }
        },
        save() {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            this.$post('/LoanGrantOpinion/supplementSubmit',{
                bussNo: this.$route.query.bussNo,
                approvalComments: '1',
                reasonDescription: this.inputTextarea,
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('通过成功');
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.$router.push({
                        path: '/layout/loanmoney',
                    })
                } else {
                    this.$message.error(res.data.msg);
                    setTimeout(function() {
                        loading.close();
                    },200);
                }
            });
        },
        adopt() {
            const loading = this.$loading({
                                  lock: true,
                                  text: 'Loading',
                                  spinner: 'el-icon-loading',
                                  background: 'rgba(0, 0, 0, 0.7)'
                                });
            this.$post('/LoanGrantOpinion/supplementSubmit',{
                bussNo: this.$route.query.bussNo,
                approvalComments: '0',
                reasonDescription: this.inputTextarea,
            }).then(res => {
                if(res.data.code == '2000000') {
                    this.$message.success('退回成功');
                    setTimeout(function() {
                        loading.close();
                    },200);
                    this.$router.push({
                        path: '/layout/loanmoney',
                    })
                } else {
                    this.$message.error(res.data.msg);
                    setTimeout(function() {
                        loading.close();
                    },200);
                }
            });
        }
    },
    components: {
        componentitle,
        imgLine
    }
}
</script>
<style lang="less">
.supplement {
    .supplementTextarea {
        margin-top: 20px;
        p {
            font-size: 14px;
            display: inline-block;
            vertical-align: top;
        }
        .inputTextarea {
            width: calc(100% - 120px);
        }
        .renttable {
            p {
                display: inline-block;
                width: 39%;
                border: 1px solid #ffcb9d;
                line-height: 50px;
                border-right: 0;
                text-align: center;
                &:nth-child(odd) {
                    width: 10%;
                }
                &:last-child {
                    border-right: 1px solid #ffcb9d;
                }
            }
        }
    }
    .bottombutton {
        float: right;
        button {
            background: #ff8f2b;
            border: 0;
            margin-top: 20px;
        }
    }
}
</style>
