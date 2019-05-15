<template>
<div class="loanapproval bannerview">
    <h3 class="bannertitle">Banner图管理</h3>
    <div class="topdiv bannerimglist">
        <componentitle :message="message = '顶部Banner图管理'" :titletext="titletext" :parenTtext="parenTtext" :url="url"/>
        <ul>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
        </ul>
    </div>
    <div class="bottomdiv bannerimglist">
        <componentitle :message="message = '底部Banner图管理'" :titletext="titletext" :parenTtext="parenTtext" :url="url"/>
        <ul>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
            <li>

            </li>
        </ul>
    </div>
</div>
</template>

<script  type="text/ecmascript-6">
import componentitle from '../../components/title/title.vue';
export default {
    data() {
        return {
            message: '',
        }
    },
    components: {
        componentitle,
    },
}
</script>
<style lang="less">
.bannerview {
    .bannertitle {
        font-size: 16px;
        font-weight: bold;
        width: 96%;
        margin: 15px auto;
    }
    .titletop {
        width: 96%;
        margin: 0 auto;
    }
    .bannerimglist {
        ul {
            width: 96%;
            margin: 15px auto;
            li {
                width: 20%;
                height: 262px;
                border: 1px solid #afafaf;
                display: inline-block;
                margin-left: 3%;
                border-radius: 5px;
                overflow: hidden;
            }
        }
    }
}
</style>
