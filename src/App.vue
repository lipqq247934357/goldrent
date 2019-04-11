<template>
    <div id="app">
        <navBar/>
        <sideBar/>
        <router-view/>
    </div>
</template>

<script type="text/ecmascript-6">
    import navBar from './components/navBar/index.vue';
    import sideBar from './components/sideBar/index.vue';

    export default {
        components: {
            navBar,
            sideBar
        }
    }
</script>
<style lang="less">

</style>
