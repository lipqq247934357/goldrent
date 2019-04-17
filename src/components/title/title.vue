<template>
    <div class="titletop">
        <p class="titletext">{{titletext}}</p>
        <div class="topbox">
            <span>{{message}}</span>
        </div>
    </div>

</template>

<script  type="text/ecmascript-6">
export default {
    props: {
        message: {
            type: String
        },
        titletext: {
            type: String
        }
    }
}
</script>
<style lang="less">
.titletop {
    .titletext {
        font-size: 20px;
        font-weight: bold;
        line-height: 50px;
        color: #f68e58;
    }
    .topbox {
        width: 100%;
        height: 50px;
        color: #fff;
        background: #f68e58;
        border-top: 3px solid rgb(255, 95, 0);
        border-radius: 2px;
        line-height: 50px;
        position: relative;
        span {
            margin-left: 15px;
        }
        label {
            position: absolute;
            top: 10px;
            right: 15px;
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background: #3385ff;
            border-radius: 5px;
        }
    }
}

</style>
