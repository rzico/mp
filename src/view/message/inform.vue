<template>
    <scroller class="wrapper">
        <navbar :title="title"@goback="goback"></navbar>
        <div>
            <div class="dateBox">
                <text class="dateText">昨天17:46</text>
            </div>
            <div class="contentBox">
                <text class="fz45">付款成功</text>
                <text class="sub_title mt10">10月21日</text>
                <div class="moneyBox">
                    <text class="fz65">128.00</text>
                    <text class="fz30 mt10">元</text>
                </div>
                <div class="contentLine">
                    <text class="fz30 black">付款方式:</text>
                    <text class="fz30 gray ml10">花呗支付</text>
                </div>
                <div class="contentLine">
                    <text class="fz30 black">交易对象:</text>
                    <text class="fz30 gray ml10">饿了么</text>
                </div>
                <div class="contentLine">
                    <text class="fz30 black">商品说明:</text>
                    <text class=" fz30 gray ml10">千尊比萨（莲花店）外卖订单</text>
                </div>
                <div class="bottomBtn">
                    <text class="title">查看详情</text>
                </div>
            </div>
        </div>
        <!--收藏-->
        <div class="lineBox">
            <div style="flex-direction: row;align-items: center">
                <image class="headImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                <div class="userInfo">
                    <text class="fz30 nameColor" >陈星星</text>
                    <text  class="infoText">收藏了你的文章《想念入会想念入会》</text>
                    <text class="sub_title">07-13</text>
                </div>
            </div>
            <image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
        </div>
        <!--评论-->
        <div class="lineBox">
            <div style="flex-direction: row;align-items: center">
                <image class="headImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                <div class="userInfo">
                    <text class="fz30 nameColor" >陈星星</text>
                    <text  class="infoText">很漂亮，写得很好</text>
                    <text class="sub_title">07-13</text>
                </div>
            </div>
            <image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
        </div>
        <!--点赞-->
        <div class="lineBox">
            <div style="flex-direction: row;align-items: center">
                <image class="headImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                <div class="userInfo">
                    <text class="fz30 nameColor" >陈星星</text>
                    <text   class="infoText" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                    <text class="sub_title">07-13</text>
                </div>
            </div>
            <image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
        </div>
        <!--关注-->
        <div class="lineBox">
            <div style="flex-direction: row;align-items: center">
                <image class="headImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                <div class="userInfo">
                    <text class="fz30 nameColor" >陈星星</text>
                    <text   class="infoText" >关注了你</text>
                    <text class="sub_title">07-13</text>
                </div>
            </div>
            <!--<image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>-->
        </div>
    </scroller>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .infoText{
        font-size: 32px;color: #444;
        width: 480px;
        lines:1;
        text-overflow: ellipsis;
    }
    .nameColor{
        color: steelblue;
    }
    .userInfo{
        margin-left: 20px;
        height: 120px;
        justify-content: space-between;
    }
    .coverImg{
        height: 110px;
        width: 110px;
        border-radius: 10px;
    }
    .headImg{
        height: 90px;
        width: 90px;
        border-radius: 45px;
    }
    .lineBox{
        flex-direction: row;
        align-items: center;
        height: 150px;
        padding-right: 20px;
        justify-content: space-between;
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;

    }
    .bottomBtn{
        width: 700px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 30px;
        align-items: center;
        border-color: gainsboro;
        border-style: solid;
        border-top-width:1px;
    }
    .contentLine{
        margin-top: 10px;
        margin-bottom: 10px;
        flex-direction: row;
    }
    .fz45{
        font-size: 38px;
    }
    .fz65{
        font-size: 65px;
        color: #444;
    }
    .fz28{

    }
    .fz30{
        font-size: 30px;
    }
    .moneyBox{
        padding-top: 50px;
        padding-bottom: 30px;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        border-color: #ccc;
        border-style: solid;
        border-bottom-width:1px;
        margin-bottom: 30px;
    }
    .contentBox{
        width:700px;
        margin-left: 25px;
        background-color: #fff;
        padding-top: 20px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 10px;
        border-color:gainsboro;
        border-width: 1px;
        border-style: solid;
        margin-bottom: 20px;
    }
    .dateBox{
        width: 750px;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .dateText{
        font-size: 24px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: #fff;
        background-color: #ccc;
        border-radius: 5px;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import {dom,event,storage,stream} from '../../weex.js';
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch'
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
        created(){
            utils.initIconFont();
            let messageType = utils.getUrlParameter('type');
            event.toast(messageType);
            switch(messageType){
                case 'order':
                    this.title = '订单提醒';
                    break;
                case 'account':
                    this.title =  '账单提醒'
                    break;
                case 'message':
                    this.title =  '系统消息';
                    break;
                case 'review':
                    this.title =  '评论回复'
                    break;
                case 'laud':
                    this.title =  '点赞提醒';
                    break;
                case 'follow':
                    this.title =  '关注提醒';
                    break;
                case 'favorite':
                    this.title =  '收藏提醒';
                    break;
                default:
                    this.title = '消息助手';
                    break;
            }
            GET('weex/member/message/list.jhtml?type=' + messageType ,function (weex) {
                event.toast(weex);
                if(weex.type == 'success'){

                }
            },function (err) {
                event.toast('网络不稳定');
            })
        },
        methods:{
            goback(){
                event.closeURL();
            }
        }

    }
</script>