<template>
    <div class="login" @keyup.enter="login">
        <img src="./loginbg.png" alt="" class="loginbg">
        <div class="inputText">
            <p class="logintext">Log in</p>
            <img src="./logintext.png" alt="" class="logintextimg">
            <div class="subTextdiv">
                <img src="./loginname.png" alt="" class="pwdicon">
                <input type="text" v-model="name" placeholder="用户名">
            </div>
            <div class="subTextdiv">
                <img src="./loginpassword.png" alt="" class="pwdicon">
                <input :type="password" v-model="pwd" placeholder="密码">
                <img src="./eye.png" alt="" class="iconpwd" v-if="passwordtype == 1" @click="brighttext">
                <img src="./pwd.png" alt="" class="iconpwd" v-if="passwordtype == 2" @click="darktext">
            </div>
            <el-button @click="login" class="loginbutton" type="primary">登录</el-button>
            <p class="tips">忘记密码请联系管理员</p>
            <p class="copyright">Copyright ©️ 2019 哈银金融租赁有限责任公司版权所有</p>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {setStore} from "../../utils/utils";
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                name: '',
                pwd: '',
                password: 'password',
                passwordtype: 1,// 密码明文暗文切换1明文，2暗文
            }
        },
        methods: {
            async login() {
                let data = await this.$post('/user/login', {name: this.name, pwd: this.pwd});
                if (data.data.code === '2000000') {
                    //跳首页，保存用户数据
                    let user = data.data.data.user;
                    setStore('loginName', user.loginName || '');
                    setStore('userName', user.userName || '');
                    setStore('userPhone', user.userPhone || '');
                    setStore('userRole', user.roleName || '');
                    Cookies.set('token', data.data.data.token);
                    this.$router.push('/');
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
            top:0;
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
                input::placeholder{
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
