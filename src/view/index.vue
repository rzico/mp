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
                <div class="flex1 btn"  v-if="isNoPos()" @click="weixin()">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信快捷登录">微信快捷登录</text>
                </div>
                <div class="flex1 btn mt30" v-else  @click="scan()">
                    <text class="ico_small" :style="{fontFamily:'iconfont'}">&#xe607;</text>
                    <text class="btn-text" value="收钱码登录">收钱码登录</text>
                </div>
            </div>
            <div class="space-between" style="margin-top: 40px;" v-if="isNoPos()">
                <text class="title gray bw" @click="login()">其他方式登录</text>
                <text class="title gray bw" @click="goback()">关闭随便看看</text>
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
    .bw {
        height:60px;
        line-height: 60px;
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
            isNoPos:function () {
                return utils.device()!="V1";
            },
            weixin: function (e) {
                event.wxAuth(
                    function (message) {
                        if (message.type=="success") {
                            POST('weex/login/weixin.jhtml?code=' + message.data)
                                .then(
                                    function(data) {
                                        if (data.type == "success") {
                                            event.closeURL(data);
                                        } else {
                                            event.toast(data.content);
                                        }
                                    },
                                    function(err) {
                                        event.toast(err.content);
                                    }
                                )
                        } else {
                            event.toast(message.content);
                        }

                    }
                );
            },
            login: function (e) {
                event.openURL(utils.locate('view/login/index.js'),function (data) {
                    if(data.type=='success') {
                        event.closeURL();
                    }
                });
            },
            goback: function (e) {
                event.closeURL();
            },
            scan:function () {
                event.scan(function (message) {
                    if (message.type == 'success') {
                        utils.readScan(message.data,function (res) {
                            if (res.type=='success') {
                                if (res.data.type!='818804') {
                                    event.toast("请扫收钱码");
                                    return;
                                }
                                POST('weex/login/code_captcha.jhtml?code=' +res.data.code)
                                    .then(
                                        function (data) {
                                            if (data.type == "success") {
                                                event.closeURL(data);
                                            } else {
                                                event.toast(data.content);
                                            }
                                        },
                                        function (err) {
                                            event.toast(err.content);
                                        }
                                    )
                            } else {
                                event.toast(res.content);
                            }
                        }
                        )
                    } else {
                        event.toast(message.content);
                    }
                 }
                )
            }
        }
    }
</script>