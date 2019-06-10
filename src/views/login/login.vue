<template>
    <div @keyup.enter="login" class="login">
        <img alt="" class="loginbg" src="./loginbg.png">
        <div class="inputText">
            <p class="logintext">Log in</p>
            <img alt="" class="logintextimg" src="./logintext.png">
            <div class="subTextdiv">
                <img alt="" class="pwdicon" src="./loginname.png">
                <input placeholder="用户名" type="text" v-model="name">
            </div>
            <div class="subTextdiv">
                <img alt="" class="pwdicon" src="./loginpassword.png">
                <input :type="password" placeholder="密码" v-model="pwd">
                <img @click="brighttext" alt="" class="iconpwd" src="./eye.png" v-if="passwordtype == 1">
                <img @click="darktext" alt="" class="iconpwd" src="./pwd.png" v-if="passwordtype == 2">
            </div>
            <div class="warrant">
                <el-checkbox v-model="isWarrant">是否微信授权登录</el-checkbox>
            </div>
            <el-button @click="login" class="loginbutton" type="primary">登录</el-button>
            <p class="tips">忘记密码请联系管理员</p>
            <p class="copyright">Copyright ©️ 2019 哈银金租有限责任公司版权所有</p>
        </div>
        <countDown :id="id" :showCD.sync="showCD" :timeOut="timeOut"/>
        <updatePwd :name="name" :pwd="pwd" :showPWD.sync="showPWD"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {setStore} from "../../utils/utils";
    import Cookies from 'js-cookie';
    import countDown from './countDown.vue'
    import updatePwd from './updatePwd.vue'

    export default {
        components: {
            countDown,
            updatePwd
        },
        data() {
            return {
                name: '',
                pwd: '',
                isWarrant: false,
                password: 'password',
                passwordtype: 1,// 密码明文暗文切换1明文，2暗文
                id: 20,
                timeOut: 30,
                showCD: false,
                showPWD: false
            }
        },
        methods: {
            async login() {
                let data = await this.$post('/user/login', {
                    name: this.name,
                    pwd: this.pwd,
                    isWarrant: Number(this.isWarrant)
                });
                if (data.data.code === '2000000') {
                    // 保存用户数据
                    if (this.isWarrant === true) { // 需要权限校验
                        this.id = data.data.data.id;
                        this.timeOut = data.data.data.timeOut;
                        // 弹窗并展示倒计时
                        this.showCD = true;
                    } else {
                        //跳首页
                        let user = data.data.data.user;
                        setStore('loginName', user.loginName || '');
                        setStore('userName', user.userName || '');
                        setStore('userPhone', user.userPhone || '');
                        setStore('userRole', user.roleName || '');
                        Cookies.set('token', data.data.data.token);
                        this.$router.push('/');
                    }
                } else if (data.data.code === '2000009') {
                    this.showPWD = true;
                }
            },
            //密码明文展示
            brighttext() {
                this.password = 'text';
                this.passwordtype = 2;
            },
            // 密码暗文展示
            darktext() {
                this.password = 'password';
                this.passwordtype = 1;
            }
        }
    }
</script>
<style lang="less">
    .login {
        font-size: 20px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        .loginbg {
            position: absolute;
            top: 0;
            left: 0;
            width: 490px;
            height: 100vh;
        }

        .logintext {
            text-align: left;
            font-size: 20px;
            color: #c0c4cc;
        }

        .inputText {
            width: 350px;
            padding: 10px;
            margin: 150px 0 0 736px;
            position: relative;

            .logintextimg {
                margin: 18px 0 60px 0;
            }

            .subTextdiv {
                height: 50px;
                line-height: 30px;
                position: relative;

                .pwdicon {
                    position: absolute;
                    top: 5px;
                }

                .title {
                    float: left;
                    width: 80px;
                    text-align: right;
                }

                input {
                    width: 268px;
                    height: 30px;
                    padding-left: 30px;
                    border: 0;
                    border-bottom: 1px solid #c0c4cc;
                    font-size: 16px;
                    color: #333;
                }

                input::placeholder {
                    color: #ccc;
                }

                .el-icon-view {
                    color: #ccc;
                }

                .iconpwd {
                    position: absolute;
                    top: 12px;
                    right: 55px;
                    cursor: pointer;
                }
            }

            .loginbutton {
                width: 80px;
                float: right;
                margin-right: 55px;
                margin-bottom: 15px;
                background: #f68f4e;
                border: 0;
                background: url('./loginbutton.png') no-repeat;
                line-height: 10px;
            }

            .tips {
                clear: both;
                font-size: 14px;
                color: #868686;
                margin-right: 55px;
                text-align: right;
            }
        }

        .copyright {
            position: absolute;
            bottom: -60%;
            right: 50px;
            font-size: 14px;
            color: #c0c4cc;
            white-space: nowrap;
        }
    }
</style>
<style lang="less">

    .warrant {
        margin-left: 3px;

        // 选中样式
        /deep/ .el-checkbox.is-checked {
            .el-checkbox__inner {
                background-color: #ff8f2b;
                border-color: #ff8f2b;
            }
        }

        // hover 样式修改
        /deep/ .el-checkbox__inner:hover {
            border-color: #ff8f2b;
        }

        // is-focus样式修改
        /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #ff8f2b;
        }

        // 文字颜色
        /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #606266;
        }

    }
</style>
