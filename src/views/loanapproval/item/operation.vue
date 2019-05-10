<template>
<div class="businfosss operation">
    <div class="" v-if="arrangementtype != 5">
        <!-- 评分卡table -->
        <scoretable />

        <!-- 审批意见等 -->
        <approvalopinions />
    </div>
    <div class="" v-if="arrangementtype == 5">
        <loanmoney />
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../../components/title/title.vue';
import loanmoney from '../../../components/loanmoney/loanmoney.vue';
import approvalopinions from '../../../components/approvalopinions/approvalopinions.vue'; // 审批意见
import scoretable from '../../../components/score/score.vue'; //评分卡table以及重评的功能提交等
export default {
    data() {
        return {
            arrangementtype: '', //当前的角色形式
        }
    },
    created() {
        this.arrangementtype  = this.$route.query.arrangement;
    },
    methods: {

    },
    components: {
        componentitle,
        loanmoney,
        approvalopinions,
        scoretable
    }
}
</script>
<style lang="less">
.operation {
    .againbutton {
        position: absolute;
        top: 28px;
        right: 15px;
        height: 30px;
        line-height: 0px;
        color: #d76500;
        background: #fff;
        border: 1px solid #ffcb9d;
    }
    .presentation {
        margin: 15px 0;
        i {
            font-size: 16px;
            color: #333;
            font-style: normal;
            margin-right: 10px;
            margin-left: 15px;
            font-weight: bold;
        }
        .peopletype {
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            color: #333;
            margin-left: 15px;
        }

    }
    .loanpeopletyle {
        background: #f5f5f5;
        margin: 10px 0 20px 0;
        position: relative;
        height: 40px;
        line-height: 40px;
        border: 1px solid #afafaf;
        padding-left: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    .nothingshow {
        margin: 15px 0;
        border: 1px solid #afafaf;
        font-size: 0;
        li {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #afafaf;
            width: 100%;
            display: inline-block;
            color: #606266;
            &:last-child {
                border-bottom: 0;
            }
            .lefttext {
                margin-left: 15px;
                text-align: right;
                width: 40%;
                display: inline-block;
                text-align: center;
                border-right: 1px solid #afafaf;
                font-size: 14px;
                color: #212121;
                font-weight: bold;
            }
            .inputinfo {
                width: 50%;
                border: 0;
                height: 30px;
                margin-left: 20px;
                display: inline-block;
                border-bottom: 1px solid #afafaf;
                padding-left: 10px;
                color: #606266;
                font-size: 14px;
            }
        }
    }
    .subone {
        .spreport {
            background: rgb(67,68,140);
            border: 1px solid rgb(67,68,140);
            margin-top:10px;
        }
        &:last-child {
            margin-top: 20px;
        }
        .suboneelinput {
            margin-top: 10px;
            .contentinout {
                width: calc(100% - 140px);
            }
        }

        .textdescribe {
            line-height: normal;
            height: 75px;
        }
        &:last-child {
            margin-bottom: 20px;
        }
        p {
            float: left;
            line-height: 60px;
            color: #333;
            margin-left: 15px;
            font-weight: bold;
            font-size: 16px;
            min-width: 120px;
            text-align: right;
        }
        .contract {
            float: left;
        }
        .textareawidth {
            width: calc(100% - 140px);
            margin-bottom: 10px 0 20px 0;
        }
        .elcheckboxs {
            width: 90%;
            float: left;
            margin-top: 20px;
        }
    }
    .opinionsdiv {
        line-height: 60px;
    }
    .bottombutton {
        float: right;
        margin: 20px 0 20px 0;
        .el-button--primary {
            background: #ff8f2b;
            border: 0;
        }
    }
}
.operationtable {
    text-align: center;
    border: 1px solid #EBEEF5;
    color: #909399;
    tr {
        height: 50px;
        line-height: 50px;
        th {
            text-align: center;
        }
    }
}
.checkbox {
    display: inline-block;
    font-size: 14px;
    margin-right: 10px;
    line-height: 60px;
    color: #606266;
    input {
        margin-right: 5px;
    }
}
.notallowed {
    color: #C0C4CC;
    cursor: not-allowed;
}
.choiceselect {
    margin-left: 20px;
}
.score {
    margin: 15px 0;
}
.upper {
    .uppertext {
        float: left;
        margin-top: 15px;
    }
    .uppertextareaup {
        margin-top: 15px;
        width: 100%;
    }
    .uppertextarea {
        width: calc(100% - 80px);
        float: right;
        margin-top: 15px;
    }
}
.eldiaLog {
    .el-dialog__header {
        border-bottom: 1px solid #e5e5e5;
    }
    .el-dialog__body {
        padding-top: 0;
    }
    .dialogdiv {
        margin-top: 20px;
        .dialogptitle {
            font-size: 14px;
            color: #333;
            background: #f5f5f5;
            height: 30px;
            line-height: 30px;
            border: 1px solid #e5e5e5;
            padding-left: 14px;
        }
        .department {
            border: 1px solid #e5e5e5;
            overflow: hidden;
            border-top: 0;
            li {
                height: 40px;
                line-height: 40px;
                padding-left: 45px;
                .el-radio__label {
                    padding-left: 30px;
                }
                .el-radio__input.is-checked+.el-radio__label {
                    color: #d76500;
                }
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #d76500;
                    background: #d76500;
                }
            }
        }
    }
    .avtiveborder {
        .dialogptitle {
            background: #fff3e9;
            color: #d76500;
        }
        .department {
            border: 1px solid #ffcb9d;
            overflow: hidden;
            border-top: 0;
        }
    }
    .dialog-footer {
        .el-button {
            height: 30px;
            line-height: 0px;
            background: #d76500;
            border: 0;
            color: #fff;
        }
        .cancel {
            background: #fff3e9;
            color: #d76500;
        }
    }
}
.buttondiv {
    border: 1px solid  #afafaf;
    width: 102px;
    height: 25px;
    display: inline-block;
    color: #a3a3a3;
    border-radius: 2px;
    span {
        display: inline-block;
        width: 50%;
        line-height: 25px;
        text-align: center;
        cursor: pointer;
    }
    .spanactive {
        background: #ff8f2b;
        color: #fff;
    }
}

</style>
