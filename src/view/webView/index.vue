<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <web class="webView"  @pagefinish="pagefinish" @receivedtitle="receivedtitle" :src="webUrl" ></web>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>

<style scoped>
    .webView{
        width:750px;
        position: absolute;
        top:136px;
        bottom: 0;
    }
</style>
<script>
    const event = weex.requireModule('event');
    const storage = weex.requireModule('storage');
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    import navbar from '../../include/navbar.vue';

    export default {
        data(){
            return{
                title:'',
                webUrl:'https://www.baidu.com/'
            }
        },
        components: {
            navbar
        },
        props: {

        },
        created () {
            this.webUrl = utils.getUrlParameter('url')
        },
        methods: {
            //ios
            pagefinish(e){
                //判断系统，否则会冲突
                if(utils.isIosSystem()){
                    this.title = e.title
                }
            },
            //安卓
            receivedtitle(e){
                //判断系统，否则会冲突
                if(!utils.isIosSystem()){
                    this.title = e.title
                }
            },
            goback:function(e) {
                event.closeURL();
            },
        }
    }
</script>