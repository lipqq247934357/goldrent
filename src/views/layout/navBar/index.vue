<template>
    <div>
        <div class="top">
            <img alt="" height="20" src="./logo.png" width="20">
            <span>哈银金租农机零售系统</span>
            <span @click="showUserInfo" class="username">{{userName}}</span>
        </div>
        <div class="userInfo" v-show="userInfoPop">
            <ul class="first" v-Clickoutside="closeUserInfoPop">
                <li @mouseover="admin" @mouseout="admin1">
                    <span class="iconfont">
                        <img :src="admina" alt="">
                    </span>
                    &nbsp;
                    {{roleName}}
                </li>
                <li @mouseover="personalimg" @mouseout="personalhover"
                    @click="showUpdateInfoPop">
                    <span class="iconfont">

                        <img :src="personal" alt="">
                    </span>
                    &nbsp;个人信息
                </li>
                <li
                    @mouseover="passwordiconl" @mouseout="passwordicona"
                    @click="showUpdatePasswordPop">
                    <span class="iconfont">
                        <img :src="password" alt="">
                    </span>
                    &nbsp;更改密码
                </li>
            </ul>
            <ul class="second">
                <li
                    @mouseover="outl" @mouseout="outa"
                    @click="logout">
                    <span class="iconfont">
                        <img :src="out" alt="">
                    </span>
                    &nbsp;登出
                </li>
            </ul>
        </div>
        <el-dialog
                :before-close="handleInfoClose"
                :visible.sync="updateInfoPop"
                custom-class="pop-class"
                title="更改个人信息"
                width="30%">
            <div class="update-user-info">
                <el-form label-width="60px" ref="form">
                    <el-form-item label="用户名">
                        <el-input disabled size="mini" v-model="loginName"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input disabled size="mini" v-model="newUserName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input size="mini" v-model="userPhone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn" slot="footer">
                <el-button @click="handleInfoClose" size="small">关闭</el-button>
                <el-button @click="updateInfo" size="small">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog
                :before-close="handlePwdClose"
                :visible.sync="updatePasswordPop"
                custom-class="pop-class"
                title="更改密码"
                width="30%">
            <div class="update-user-info">
                <el-form label-width="70px" ref="form">
                    <el-form-item label="原密码">
                        <el-input size="mini" type="password" v-model="oldPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input size="mini" type="password" v-model="newPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input size="mini" type="password" v-model="rnewPwd"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn" slot="footer">
                <el-button @click="handlePwdClose" size="small">关闭</el-button>
                <el-button @click="updatePwd" size="small">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script type="text/ecmascript-6">
    import Clickoutside from 'element-ui/src/utils/clickoutside';
    import {setStore, getStore} from "../../../utils/utils";
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                userInfoPop: false,
                updateInfoPop: false,
                updatePasswordPop: false,
                clickPos: 0,
                loginName: '',
                userName: '',
                newUserName: '',
                userPhone: '',
                oldPwd: '',
                newPwd: '',
                rnewPwd: '',
                roleName: '',
                admina: require('./iconadmina.png'),
                personal: require('./icongerena.png'),
                password: require('./passworda.png'),
                out: require('./outa.png')
            }
        },
        directives: {Clickoutside},
        created() {
            this.userName = this.newUserName = getStore('userName') || '';
            this.loginName = getStore('loginName') || '';
            this.userPhone = getStore('userPhone') || '';
            this.roleName = getStore('userRole') || '';
        },
        methods: {
            // 登出
            outl() {
                this.out = require('./outl.png');
            },
            outa() {
                this.out = require('./outa.png');
            },
            // 修改密码
            passwordiconl() {
                this.password = require('./passwordl.png');
            },
            passwordicona() {
                this.password = require('./passworda.png');
            },
            // 个人信息
            personalimg() {
                this.personal = require('./icongerenl.png');
            },
            personalhover() {
                this.personal = require('./icongerena.png');
            },
            // 管理员
            admin() {
                this.admina = require('./iconadminl.png');
            },
            admin1() {
                this.admina = require('./iconadmina.png');
            },
            showUserInfo() {
                this.userInfoPop = !this.userInfoPop;
                this.clickPos = 1;
            },
            logout() {
                Cookies.remove('session');
                this.$router.push('/login');
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
            },
            async updateInfo() {
                let data = await this.$post('user/updateUser', {
                    userName: this.newUserName,
                    userPhone: this.userPhone
                });
                if (data.data.code === '2000000') {
                    this.userName = this.newUserName;
                    setStore('userName', this.userName);
                    setStore('userPhone', this.userPhone);
                    this.handleInfoClose();
                }
            },
            async updatePwd() {
                let data = await this.$post('/user/updatepwd', {
                    oldPwd: this.oldPwd,
                    newPwd: this.newPwd,
                    rnewPwd: this.rnewPwd
                });
                if (data.data.code === '2000000') {
                    this.handlePwdClose();
                    // 修改成功返回登录页
                    this.$router.push({
                        path: '/login',
                    })
                }
            },
            handleInfoClose() {
                this.updateInfoPop = false;
                this.newUserName = this.userName;
                this.userPhone = getStore('userPhone');
            },
            handlePwdClose() {
                this.updatePasswordPop = false;
                this.oldPwd = '';
                this.newPwd = '';
                this.rnewPwd = '';
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
        background: #ff8f2b;
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
        position: fixed;
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
            img {
                vertical-align:middle
            }
        }

        li {
            cursor: pointer;
            padding-left: 20px;

            &:hover {
                background: #f0f0f0;
                color: #ff8f2b;
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
