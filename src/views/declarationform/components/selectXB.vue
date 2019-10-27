<template>
    <div>
        <el-dialog
                :show-close="false"
                :visible.sync="centerDialogVisible"
                center
                custom-class="repay-pop-custom-class"
                width="40%">
            <!--title内容-->
            <template v-slot:title>
                <div class="pop-title">
                    <div>选择协办人员</div>
                </div>
            </template>
            <!--content-->
            <template>
                <div style="padding: 10px 0;overflow: hidden;">
                    <div class="pop-content">
                        <div>
                            <p>请选择部门&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <el-select placeholder="请选择"
                                       v-model="depart">
                                <el-option
                                        :key="item.depart_code"
                                        :label="item.depart_name"
                                        :value="item.depart_code"
                                        v-for="item in departDict">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <p>请选择协办人员</p>
                            <el-select placeholder="请选择"
                                       v-model="assistUserInfo">
                                <el-option
                                        :key="item.user_id"
                                        :label="item.user_name"
                                        :value="item.user_id+'$'+item.user_name"
                                        v-for="item in assistDict">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="pop-footer">
                        <el-button @click="closePop" plain size="mini" style="margin-right: 20px;" type="primary">取消
                        </el-button>
                        <el-button @click="submit" plain size="mini" type="primary">提交</el-button>
                    </div>
                </div>
            </template>
            <!--footer内容-->
            <template v-slot:footer>
                <!--     注释掉footer在content中放footer           -->
                <!--        <span class="dialog-footer" slot="footer" style="display: inline-block;margin-top: -70px;">-->
                <!--          <el-button @click="centerDialogVisible = false" size="mini">取 消</el-button>-->
                <!--          <el-button @click="addUpdate" size="mini" type="primary" plain>确 定</el-button>-->
                <!--        </span>-->
            </template>
        </el-dialog>
    </div>
</template>
<script>

    import {mapGetters} from 'vuex'

    export default {
        props: ['show', 'listId', 'reloadPlan', 'bussNo'], // 是否展示，key,是否重新加载
        data() {
            return {
                info: {},
                status: '',
                depart: '',
                assistUserInfo: '',
                departDict: [], // 部门
                assistDict: [] // 协办
            }
        },
        created() {
            // 1.字典编码
            this.$post('/getAssistManList', {
                parCode: "ASSIST_ROLE",
                parType: "ROLE_PARAMS"
            }).then(res => {
                this.departDict = res.data.data;
            });
        },
        computed: {
            centerDialogVisible: {
                get() {
                    return this.show;
                },
                set(val) {
                    this.$emit('update:show', val);
                }
            },
            ...mapGetters(['userInfo'])
        },
        watch: {
            depart(val) {
                if (!val) {
                    this.assistDict = [];
                    return
                }
                this.departDict.forEach(item => {
                    if (item.depart_code === val) {
                        this.assistDict = item.list;
                    }
                })
            }
        },
        methods: {
            closePop() {
                this.centerDialogVisible = false;
            },
            async submit() { // 提交
                if (!this.assistUserInfo) {
                    this.$message.error('请选择协办人');
                    return;
                }

                let val = this.assistUserInfo.split('$');
                if (val.length !== 2) {
                    this.$message.error('请选择协办人');
                    return;
                }
                this.centerDialogVisible = false;
                // 1.提交协办
                this.$post('/submitChoiceAssistUser', {
                    bussNo: this.bussNo,
                    assistUserId: val[0],
                    assistUserName: val[1]
                }).then(res => {
                    if (res.data.code == '2000000') {
                        this.$alert('提交成功', '提示', {
                            confirmButtonText: '确定',
                            callback: () => {
                                this.$router.push({path: '/layout/declarationfrom'})
                            }
                        });
                    }
                });
            },
        }
    }


</script>
<style lang="less">

    .repay-table {
        width: 80%;
        margin: 0 auto 20px;
        border: 1px solid #f5f5f5;
        padding: 0;
        display: flex;
        flex-wrap: wrap;

        li {
            width: 70%;
            list-style: none;
            line-height: 30px;
            border-bottom: 1px solid #f5f5f5;
            border-right: 1px solid #f5f5f5;
            display: inline-block;
            text-align: center;
            font-size: 14px;

            &:nth-child(odd) {
                width: 30%;
            }

            &:nth-child(2n) {
                border-right: 0;
            }
        }

        .bottom-0 {
            border-bottom: 0;
        }
    }

    .header-cell-class-name {
        background: #f4f4f5 !important;
    }

    // 修改弹框默认样式
    .repay-pop-custom-class {

        .el-dialog__header {
            padding: 0;
        }

        .el-dialog__body {
            padding: 0;
        }

        .el-dialog__footer {
            padding: 0;
        }

    }

    .pop-title {
        border-bottom: 2px solid #cccccc;
        overflow: hidden;

        & > div {
            margin: 10px auto;
            width: 100%;
        }
    }

    .pop-content {
        display: flex;
        flex-direction: column;
        margin: 0 10%;

        > div {
            margin-bottom: 20px;
        }

        & p {
            float: left;
            line-height: 40px;
        }

        .el-select {
            float: left;
            margin-left: 10px;
        }
    }

    .pop-footer {
        display: flex;
        float: right;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 10%;
    }

</style>
