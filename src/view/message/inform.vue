<template>
    <div class="wrapper">
        <navbar :title="title"@goback="goback"></navbar>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>

</style>
<script>
    import navbar from '../../include/navbar.vue';
    import {dom,event,storage,stream} from '../../weex.js';
    export default {
        data(){
          return{

          }
        },
        components: {
            navbar
        },
        props:{
            title:{default:'支付助手'},
        },
        methods:{
            goback(){
                event.closeURL();
            }
        }

    }
</script>