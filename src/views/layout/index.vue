<template>
    <div id="app">
        <navBar/>
        <sideBar/>
        <appMain/>
    </div>
</template>

<script type="text/ecmascript-6">
    import navBar from './navBar/index.vue';
    import sideBar from './sideBar/index.vue';
    import appMain from './AppMain';

    export default {
        components: {
            navBar,
            sideBar,
            appMain
        }
    }
</script>
<style lang="less">

    /*fade-transform*/
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .5s;
    }

    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }

    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }


</style>
