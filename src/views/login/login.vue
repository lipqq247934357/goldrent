<template>
<div class="login">
    <img src="./logo.png" alt="">
    <div class="inputText">
        <div class="subTextdiv">
            <span>登录名：</span>
            <input type="text" name="" value="">
        </div>
        <div class="subTextdiv">
            <span class="passwordText">密&nbsp;&nbsp;&nbsp;码：</span>
            <input type="password" name="" value="">
        </div>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
export default {

}
</script>
<style lang="less">
.login {
    font-size: 20px;
    img {
        margin: 100px auto 50px;
        display: block;
    }
    .inputText {
        width: 300px;
        padding:  10px;
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
    }
}
</style>
