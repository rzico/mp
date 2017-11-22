<template>
    <div>
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="inputBox">
            <input type="text" placeholder="写下你的评论..." autofocus="true" class="reviewInput" placeholder-color="red" />
            <div class="sendBox">
                <text class="sendText">发送</text>
            </div>
        </div>
        <scroller class="wrapper" style="background-color: #fff;top: 236px;">
            <!--导航栏-->
            <div class="lineBox" >
                <div class="flexRow">
                    <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                    <div class="userInfo">
                        <text class="fz32 nameColor" >小白分</text>
                        <text class="infoText">太好啦</text>
                        <text class="sub_title mt20">07-13</text>
                    </div>
                </div>
            </div>
            <div class="lineBox" >
                <div class="flexRow">
                    <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                    <div class="userInfo">
                        <text class="fz32 nameColor" >小白分</text>
                        <text class="infoText">是啊</text>
                        <div class="reviewContent">
                            <text class="reviewUser">@飘窗:</text>
                            <text class="reviewText">很漂亮</text>
                        </div>
                        <text class="sub_title mt20">07-13</text>
                    </div>
                </div>
            </div>
            <div class="lineBox" >
                <div class="flexRow">
                    <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                    <div class="userInfo">
                        <text class="fz32 nameColor" >小白分</text>
                        <text class="infoText">是啊</text>
                        <div class="reviewContent">
                            <text class="reviewUser">@飘窗:</text>
                            <text class="reviewText">很漂亮</text>
                        </div>
                        <text class="sub_title mt20">07-13</text>
                    </div>
                </div>
            </div>
            <div class="lineBox" >
                <div class="flexRow">
                    <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                    <div class="userInfo">
                        <text class="fz32 nameColor" >小白分</text>
                        <text class="infoText">是啊</text>
                        <div class="reviewContent">
                            <text class="reviewUser">@飘窗:</text>
                            <text class="reviewText">很漂亮</text>
                        </div>
                        <text class="sub_title mt20">07-13</text>
                    </div>
                </div>
            </div>
            <div class="lineBox" >
                <div class="flexRow">
                    <image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>
                    <div class="userInfo">
                        <text class="fz32 nameColor" >小白分</text>
                        <text class="infoText">是啊</text>
                        <div class="reviewContent">
                            <text class="reviewUser">@飘窗:</text>
                            <text class="reviewText">很漂亮</text>
                        </div>
                        <text class="sub_title mt20">07-13</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .inputBox{
         background-color:#eee;
        width: 750px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }
    .sendBox{
        height: 70px;
        width: 140px;
        margin-left: 10px;
        background-color: #D9141E;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
    }
    .sendText{
        color: #fff;
        font-size: 35px;
    }
    .reviewInput{
        background-color: #fff;
        font-size: 30px;
        height: 70px;
        width: 580px;
        border-radius: 5px;
        padding-left: 20px;
    }
    .reviewContent{
        border-color: #ccc;
        border-style: solid;
        border-left-width: 6px;
        margin-top: 20px;
        padding-left: 20px;
        width: 480px;
    }

    .flexRow{
        flex-direction: row;
    }
    .lineBox{
        flex-direction: row;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 750px;
        padding-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    .infoText{
        font-size: 32px;
        color: #444;
        width: 480px;
    }
    .reviewUser{
        font-size: 32px;
        color: steelblue;
    }
    .reviewText{
        font-size: 32px;
        color: #444;
    }
    .nameColor{
        color: steelblue;
        margin-bottom: 20px;
    }
    .userInfo{
        margin-left: 20px;
        min-height: 120px;
        justify-content: space-between;
    }
    .headImg{
        height: 110px;
        width: 110px;
        border-radius: 55px;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    import { POST, GET } from '../../../assets/fetch';
    export default {
        data:{
            title:'3人评论'
        },
        components: {
            navbar
        },
        created(){
            let name = utils.getUrlParameter('name');
        },
        methods:{
            goback(){
                event.closeURL();
            },
        }
    }
</script>