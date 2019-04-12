<template>
    <div>
        <div class="top">
            <img src="logo.png" alt="" width="20" height="20">
            <span>金租业务管理系统</span>
            <span class="username" @click="showUserInfo">魏然</span>
        </div>
        <div v-show="userInfoPop" class="userInfo">
            <ul class="first" v-Clickoutside="closeUserInfoPop">
                <li>管理员</li>
                <li @click="showUpdateInfoPop">个人信息</li>
                <li @click="showUpdatePasswordPop">更改密码</li>
            </ul>
            <ul class="second">
                <li @click="logout">登出</li>
            </ul>
        </div>
        <el-dialog
                title="更改个人信息"
                :visible.sync="updateInfoPop"
                custom-class="pop-class"
                width="30%">
            <div class="update-user-info">
                <el-form ref="form" label-width="60px">
                    <el-form-item label="用户名">
                        <el-input size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input size="mini"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn" slot="footer">
                <el-button size="small" @click="updateInfoPop = !updateInfoPop">关闭</el-button>
                <el-button size="small">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="更改密码"
                :visible.sync="updatePasswordPop"
                custom-class="pop-class"
                width="30%">
            <div class="update-user-info">
                <el-form ref="form" label-width="70px">
                    <el-form-item label="原密码">
                        <el-input size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input size="mini"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input size="mini"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn" slot="footer">
                <el-button size="small" @click="updatePasswordPop = !updatePasswordPop">关闭</el-button>
                <el-button size="small">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import Clickoutside from 'element-ui/src/utils/clickoutside';

    export default {
        data() {
            return {
                userInfoPop: false,
                updateInfoPop: false,
                updatePasswordPop: false,
                clickPos: 0,
            }
        },
        directives: {Clickoutside},
        methods: {
            showUserInfo() {
                this.userInfoPop = !this.userInfoPop;
                this.clickPos = 1;
            },
            logout() {
                alert('登出');
            },
            closeUserInfoPop() {
                setTimeout(() => {
                    if (this.clickPos === 1) {
                        this.clickPos = 0;
                    } else {
                        this.userInfoPop = false;
                    }
                })
            },
            showUpdateInfoPop() {
                this.closeUserInfoPop();
                this.updateInfoPop = true;

            },
            showUpdatePasswordPop() {
                this.closeUserInfoPop();
                this.updatePasswordPop = true;
            }
        }
    }
</script>
<style lang="less" scoped="scoped">
    .top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 50px;
        background: #f68e58;
        font-size: 16px;
        color: #fff;
        line-height: 50px;
        z-index: 99;

        img {
            text-align: center;
            vertical-align: sub;
            margin: 0 10px 0 20px;
        }

        .username {
            position: absolute;
            right: 50px;
            font-size: 14px;
            cursor: pointer;
        }
    }

    .userInfo {
        position: absolute;
        top: 52px;
        right: 5px;
        z-index: 90;
        width: 145px;

        font-size: 14px;
        color: #000;
        line-height: 22px;
        text-align: left;
        background: #ffffff;
        border: 1px solid #ccc;
        padding-top: 5px;

        .first {
            border-bottom: 1px solid #ccc;
        }

        li {
            cursor: pointer;
            padding-left: 20px;

            &:hover {
                background: linear-gradient(to bottom, #ffffff, #dddddd);
            }
        }

        .second {
            line-height: 30px;
        }

    }

    .mask {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 99;
    }

    .pop-class {
        position: fixed;
        top: 30%;
        z-index: 100;
        width: 30%;
        left: 35%;
        background: #ffffff;
        border-radius: 6px;

        .title {
            padding: 0 15px;
            overflow: hidden;
            border-bottom: 1px solid #ccc;

            span:nth-child(1) {
                float: left;
            }

            span:nth-child(2) {
                float: right;
                cursor: pointer;
            }
        }

        .btn {
            padding: 0 20px;
            text-align: right;

            .el-button {
                margin-right: 20px;
            }
        }

        .update-user-info {
            width: 70%;
            margin: 0 auto;
        }

    }

    .el-form-item {
        margin-bottom: 0 !important;
    }


    /*修改个人信息标题和x号水平*/
    /deep/ .el-dialog__header {
        padding: 20px 20px 10px;
    }

    /*修改弹框body部分*/
    /deep/ .el-dialog__body {
        padding: 0;
    }


</style>
