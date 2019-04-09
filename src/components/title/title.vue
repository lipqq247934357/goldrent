<template>
<div class="top">
    <span>{{message}}</span>
</div>
</template>

<script  type="text/ecmascript-6">
export default {
    props: {
        message: {
            type: String
        }
    }
}
</script>
<style lang="less">
.top {
    width: 100%;
    height: 50px;
    background: #f00;
    color: #fff;
}
</style>
