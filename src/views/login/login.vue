<template>
    <div class="login" @keyup.enter="login">
        <img alt="" src="./logo.png">
        <p class="logintext">哈银租赁农机零售系统</p>
        <div class="inputText">
            <div class="subTextdiv">
                <div class="title">
                    <span>登录名：</span>
                </div>
                <input type="text" v-model="name">
            </div>
            <div class="subTextdiv">
                <div class="title">
                    <span class="passwordText">密码：</span>
                </div>
                <input type="password" v-model="pwd">
            </div>
            <el-button @click="login" class="loginbutton" type="primary">登录</el-button>
            <p class="tips">忘记密码请联系管理员</p>
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
                pwd: ''
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
                    Cookies.set('token', data.data.data.token);
                    this.$router.push('/');
                }
            }
        }
    }
</script>
<style lang="less">
    .login {
        font-size: 20px;
        background: #ffe3c7;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        img {
            margin: 10% auto 20px;
            display: block;
        }
        .logintext {
            text-align: center;
            font-size: 20px;
        }
        .inputText {
            width: 350px;
            padding: 10px;
            margin: 0 auto;

            .subTextdiv {
                height: 50px;
                line-height: 30px;

                .title {
                    float: left;
                    width: 80px;
                    text-align: right;
                }


                input {
                    width: 200px;
                    height: 30px;
                    padding-left: 10px;
                }
            }

            .loginbutton {
                width: 100px;
                float: right;
                margin-right: 55px;
                margin-bottom: 15px;
                background: #f68f4e;
                border: 0;
            }

            .tips {
                clear: both;
                font-size: 14px;
                color: #868686;
                margin-right: 55px;
                text-align: right;
            }
        }
    }
</style>
