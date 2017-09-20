<template>
    <scroller class="wrapper">
        <!--导航栏-->
        <navbar :title="title"></navbar>
        <!--网页-->
        <web class="webView" :src="webUrl"></web>
        <!--模版-->
        <div class="templateBox">
            <text class="templateText">模版</text>
        </div>
         <!--下一步-->
        <div class="footBox">
            <text class="nextStep">下一步</text>
        </div>
    </scroller>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    .templateText{
        color: #fff;
        font-size: 28px;
    }
    .templateBox{
        position: absolute;
        bottom: 135px;
        align-items: center;
        justify-content: center;
        border-radius: 45px;
        right: 30px;
        width:90px;
        height:90px;
        background-color: red;
    }
    .nextStep{
        color: #fff;
        font-size: 38px;
    }
    .footBox{
        align-items: center;
        justify-content: center;
        width:750px;
        height:100px;
        background-color: #D9141E;
        position: fixed;
        bottom: 0;
    }
    .webView{
        width:750px;
        position: absolute;
        top:118px;
        bottom: 100px;
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    import navbar from '../../../include/navbar.vue'
    export default {
        data:function () {
         return{
             webUrl:'http://www.baidu.com'
         }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "预览"},
        },
    }
</script>