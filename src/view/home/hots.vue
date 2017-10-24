<template>
    <div class="wrapper">
        <header class="header"></header>
    </div>
 </template>
<style lang="less" src="../../style/wx.less"/>

<style scoped>
</style>
<script>
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    import header from './header.vue';
    export default {
        components: {
            header
        }
     }
</script>