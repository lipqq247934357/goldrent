<template>
    <div class="login">
        <img src="./logo.png" alt="">
        <div class="inputText">
            <div class="subTextdiv">
                <span>登录名：</span>
                <input type="text" v-model="name">
            </div>
            <div class="subTextdiv">
                <span class="passwordText">密&nbsp;&nbsp;&nbsp;码：</span>
                <input type="password" v-model="pwd">
            </div>
            <el-button type="primary" class="loginbutton" @click="login">登录</el-button>
            <p class="tips">忘记密码请联系管理员</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {setStore} from "../../utils/utils";

    export default {
        data() {
            return {
                name: '',
                pwd: ''
            }
        },
        methods: {
            async login() {
                // let data = await this.$post('user/login', {name: this.name, pwd: this.pwd});
                // if (data.data.code === 2000000) {
                //     //跳首页，保存用户数据
                //     setStore('name', data.data.name || 'name');
                //     setStore('username', data.data.username || 'username');
                //     setStore('phone', data.data.phone || 'phone');
                // }
                setStore('name', 'name');
                setStore('username', 'username');
                setStore('phone', 'phone');
                this.$router.push('/');
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
            margin: 10% auto 30px;
            display: block;
        }

        .inputText {
            width: 350px;
            padding: 10px;
            margin: 0 auto;

            .subTextdiv {
                height: 50px;
                line-height: 30px;

                .passwordText {
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
