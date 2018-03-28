<template>
    <div  class="wrapper">
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller>
            <!--网页-->
            <web class="webView" ref="webView":style="{bottom:bottomNum + 100}"  :src="webUrl"></web>
            <div class="bottomBtnBox">
                <div class="bottomBtn " @click="jumpRestore()">
                    <text class="fz35" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                    <text class="fz35 ml10" >恢复</text>
                </div>
                <div class="rightBorder"></div>
                <div class="bottomBtn"   @click="jumpDelAll()">
                    <text class="fz35 redColor"  :style="{fontFamily:'iconfont'}">&#xe652;</text>
                    <text class="fz35 ml10 redColor" >彻底删除</text>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .redColor{
        color: #D9141E;
    }

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
        top:0px;
        /*bottom: 100px;*/
    }
</style>

<script>
    import navbar from '../../include/navbar.vue'
    import utils from '../../assets/utils';
    const webview = weex.requireModule('webview');
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch';
    const modal = weex.requireModule('modal');
    export default {
        data:function () {
            return{
                webUrl:'',
                articleId:'',
                screenHeight:0,
                bottomNum:0,
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "已删除"},
        },
        created(){
            var _this = this;
//            判断是iponex就动态获取底部上弹高度
            if(utils.previewBottom() != '' && utils.previewBottom() == 'IPhoneX'){
                this.bottomNum =parseInt(event.deviceInfo().bottomHeight) * 2;
            }
            utils.initIconFont();
            this.articleId = utils.getUrlParameter('articleId');
            this.screenHeight = utils.fullScreen(237);
//            获取该文章的模版
            POST('weex/article/template.jhtml?id=' + this.articleId).then(
                function (data) {
                    if(data.type == 'success'){
                        let templateId = 't' + data.data;
                        _this.webUrl = utils.articleUrl(templateId,_this.articleId);
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
            jumpRestore(){
                let E = utils.message('success','成功','restore');
                event.closeURL(E);
            },
            jumpDelAll(){
                modal.confirm({
                    message: '彻底删除后将无法恢复',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除') {
                        let E = utils.message('success','成功','delete');
                        event.closeURL(E);
                    }
                })
            }
        }
    }
</script>