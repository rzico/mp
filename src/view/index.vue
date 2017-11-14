<template>
    <div class="wrapper bkg-white">
        <slider class="slider" interval="3000" auto-play="true">
            <div class="frame" v-for="img in imageList">
                <image class="image" resize="cover" :src="img.src"></image>
            </div>
            <indicator class="indicator"></indicator>
        </slider>
        <div class="footer footer-panel ">
            <div class="flex-row">
                <div class="flex1 btn">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信快捷登录" @click="weixin()">微信快捷登录</text>
                </div>
            </div>
            <div class="space-between" style="margin-top: 40px;">
                <text class="title gray" @click="login()">其他方式登录</text>
                <text class="title gray" @click="goback()">关闭随便看看</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .image {
        width:750px;
        height: 1334px;
    }
    .slider {
        flex:1;
    }
    .frame {
        flex:1;
        position: relative;
    }
    .indicator {
        item-color: #ddd;
        item-selected-color:#888;
        item-size: 15px;
        position: fixed;
        height:20px;
        width:750px;
        bottom:300px;
    }
    .footer-panel {
        width:750px;
        height: 230px;
        padding-left:60px ;
        padding-right:60px ;
        background-color: white;
    }
    .btn {
        background-color:limegreen;
        border-color:limegreen;
        flex-direction: row;
        justify-content: center;
        padding-top: 0px;
        padding-top: 0px;
        height: 80px;
        align-items: center;
        border-radius:12px;
    }
    .btn:active {
        background-color:#ccc;
    }
    .ico {
        font-size: 58px;
        color: white;
    }
    .btn-text {
        margin-left: 20px;
        color : white;
        font-size: 34px;
    }
</style>
<script>
    import { POST, GET } from '../assets/fetch'
    import utils from '../assets/utils'
    const event = weex.requireModule('event');
    export default {
        data () {
            return {
                imageList: [
                    { src: utils.remote('resources/images/flash1.jpg')},
                    { src: utils.remote('resources/images/flash2.jpg')},
                    { src: utils.remote('resources/images/flash3.jpg')},
                    { src: utils.remote('resources/images/flash4.jpg')}
                ]
            }
        },
        created(){
            utils.initIconFont();
            event.changeWindowsBar(true);
        },
        methods: {
            weixin: function (e) {
                event.wxAuth(
                    function (message) {
                        if (message.type=="success") {
                            POST('weex/login/weixin.jhtml?code=' + message.data)
                                .then(
                                    function(data) {
                                        if (data.type == "success") {
//                                            event.closeURL();
                                            event.activityResult();
                                        } else {
                                            event.toast(data.content);
                                        }
                                    },
                                    function(err) {
                                        event.toast("网络不稳定");
                                    }
                                )
                        } else {
                            event.toast(message.content);
                        }

                    }
                );
            },
            login: function (e) {
                event.openURL(utils.locate('view/login/index.js'),
                    function (data) {
                        if (data!=null && data.type=='success') {
//                            event.closeURL();
                            event.activityResult();
                        }
                    })
            },
            goback: function (e) {
//                event.closeURL();
                event.activityCancel();
            }
        }
    }
</script>