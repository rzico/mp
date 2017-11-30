<template>
    <scroller class="wrapper">
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" ></navbar>
        <!--网页-->
        <web class="webView" ref="webView" :style="{height:screenHeight}" :src="webUrl"></web>
        <div class="bottomBtnBox">
            <div class="bottomBtn " v-if="!isFocus" @click="focus()">
                <text class="fz35" :style="{fontFamily:'iconfont'}">&#xe606;</text>
                <text class="fz35 ml10" >关注</text>
            </div>
            <div class="rightBorder"></div>
            <div class="bottomBtn" v-else  @click="goAddFriend()">
                <text class="fz35"  :style="{fontFamily:'iconfont'}">&#xe62a;</text>
                <text class="fz35 ml10" >添加好友</text>
            </div>
        </div>
    </scroller>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>

    .bottomBtn{
        flex:1;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        height: 100px;
    }
    .bottomBtn:active{
        background-color: #ccc;
    }
    .rightBorder{
        border-style: solid;
        border-color: #ccc;
        border-right-width: 1px;
        width:1px;
        height: 70px;
    }
    .bottomBtnBox{
        border-style: solid;
        border-color: #ccc;
        border-top-width: 1px;
        position: fixed;
        flex-direction: row;
        background-color: #fff;
        align-items: center;
        bottom: 0;
        left:0;
        right: 0;
        height: 100px;
    }
    .webView{
        width:750px;
        position: absolute;
        top:136px;
        /*bottom: 100px;*/
    }
</style>

<script>
    import navbar from '../../include/navbar.vue'
    import utils from '../../assets/utils';
    const webview = weex.requireModule('webview');
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch'
    export default {
        data:function () {
            return{
                webUrl:'',
                articleId:'',
                screenHeight:0,
            }
        },
        components: {
            navbar,share
        },
        props: {
            title: { default: "已删除"},
        },
        created(){
            var _this = this;
            utils.initIconFont();
            this.articleId = utils.getUrlParameter('articleId');
            this.screenHeight = utils.fullScreen(237);
//            获取该文章的模版
            POST('weex/article/template.jhtml?id=' + this.articleId).then(
                function (data) {
                    if(data.type == 'success'){
                        _this.webUrl = utils.articleUrl(_this.templateId,_this.articleId);
//                        _this.webUrl = 'http://weex.1xx.me/';
                    }else{
                        event.toast(data.content);
                    }
                },
                function (err) {
                    event.toast(err.content);
                }
            )



        },
        methods:{
//            点击返回
            goback(){
                event.closeURL();
            },
        }
    }
</script>