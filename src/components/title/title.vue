<template>
    <div class="titletop">
        <p class="titletext">
            <span class="parenTtext">{{parenTtext}} <i class="el-icon-arrow-right" v-if="parenTtext != null"></i></span>
            <router-link :to="{ path: url}">{{titletext}}</router-link>
        </p>
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
        url: {
            type: String
        },
        parenTtext: {
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
        font-size: 14px;
        line-height: 50px;
        color: #d76500;
        .parenTtext {
            color: #333;
            font-size: 14px;
        }
        a {
            text-decoration: none;
            color: #d76500;
        }
    }
    .topbox {
        width: 99.8%;
        height: 38px;
        color: #d76500;
        background: #fff3e9;
        border: 1px solid #ffcb9d;
        line-height: 38px;
        position: relative;
        padding-bottom: 5px;
        margin-top: 20px;
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
