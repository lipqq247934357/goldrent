<template>
    <div id="app">
        <topculumn />
        <leftmenu />
        <router-view/>
    </div>
</template>

<script  type="text/ecmascript-6">
import topculumn from './components/topcolumn/topcolumn.vue';
import leftmenu from './components/menu/menu.vue';
export default {
    data() {
        return {
            message: '我是头部'
        }
    },
    components: {
        topculumn,
        leftmenu
    }
}
</script>
<style lang="less">

</style>
