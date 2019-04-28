<template>
<div class="welcome">
    <img src="./text.png" alt="" width="174" height="50">
</div>
</template>

<script  type="text/ecmascript-6">
export default {

}
</script>
<style lang="less">
.welcome {
    background: url('./welcome.png') no-repeat;
    background-position: center;
    background-size: 100% 100%;
    width: calc(100% - 200px);
    height: calc(100% - 50px);
    img {
        position: absolute;
        top: 104px;
        left: 25%;
    }
}
</style>
