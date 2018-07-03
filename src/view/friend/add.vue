<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
           <div class="cell-row cell-line">
                <div class="cell-panel h cell-clear">
                    <div class="flex-row flex-start" style="height: 120px;width: 750px;" @click="gosearch()">
                        <text class="ico" style="color:#ccc" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                        <text class="sub_title">手机号/昵称/登录名</text>
                    </div>
                 </div>
            </div>
             <div class="cell-row cell-line">
                 <div class="cell-panel h space-between" @click="scan()">
                     <div class="flex-row" >
                         <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe672;</text>
                         <div class="ml10">
                             <text class="title">扫一扫</text>
                             <text class="sub_title mt10">扫描二维码名片</text>
                         </div>
                     </div>
                     <div class="flex-row flex-end">
                         <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                     </div>
                 </div>
                 <div class="cell-panel h space-between cell-clear" @click="goMobile()">
                    <div class="flex-row">
                        <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe637;</text>
                        <div class="ml10">
                            <text class="title">手机联系人</text>
                            <text class="sub_title mt10">添加通讯录中的朋友</text>
                        </div>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="cell-row cell-line" @click="showQrcode()">
                 <div class="cell-panel h space-between cell-clear">
                    <div class="flex-row">
                        <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe62b;</text>
                        <div class="ml10">
                            <text class="title">二维码名片</text>
                            <text class="sub_title mt10">可通过名片发展好友</text>
                        </div>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="fill"></div>
        </scroller>
        <qrcode ref="qrcode" ></qrcode>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .h {
        height: 120px;
    }
</style>
<script>
    const stream = weex.requireModule('stream');
    import navbar from '../../include/navbar.vue';
    import {SCAN } from '../../assets/fetch';
    import qrcode from '../../include/qrcode.vue';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    export default {
        components: {
            navbar,qrcode
        },
        data() {
            return {
                showUserInfo:false,
                value:"",
                logo:"",
                nickName:"",
                id:"",
                clicked:false,
            }
        },
        props: {
            title: { default: "添加好友" }
        },
        created(){
            utils.initIconFont();
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            showQrcode: function (e) {
                this.$refs.qrcode.show();
            },
            gosearch: function () {
//                event.openURL(this.locateURL+"/view/friend/search.js",function () {
//                    event.closeURL();
//                });
//                event.openURL('http://192.168.2.157:8081/search.weex.js',function (message) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/friend/search.js"),function (message) {
                    _this.clicked = false;
                    if(message.data != ''){
                        event.closeURL(message);
                    }
                });
            },
            goMobile:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
//                event.openURL('http://192.168.2.157:8081/mobile.weex.js',function (message) {
                event.openURL(utils.locate("view/friend/mobile.js"),function (message) {
                    _this.clicked = false;
//                    event.closeURL();
                })
            },
            //            触发自组件的二维码方法
            scan:function () {
                event.scan(function (message) {
                    SCAN(message,function (data) {

                    },function (err) {

                    })
                });
            },
        }

    }

</script>