<template>
    <div id="app">
        <navBar/>
        <sideBar/>
        <router-view/>
    </div>
</template>

<script type="text/ecmascript-6">
    import navBar from './views/layout/navBar/index.vue';
    import sideBar from './views/layout/sideBar/index.vue';

    export default {
        components: {
            navBar,
            sideBar
        }
    }
</script>
<style lang="less">

</style>
