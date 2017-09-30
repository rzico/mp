<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
           <div class="cell-row cell-line">
                <div class="cell-panel h cell-clear">
                    <div class="flex-row flex-start" style="height: 120px;width: 750px;">
                        <text class="ico" style="color:#ccc" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                        <input class="input" type="tel" v-model="value" return-key-type="search" @return = "search"  placeholder="输入手机号/登录名"/>
                    </div>
                 </div>
            </div>

            <div class="sub_header">
                <div class="userinfo" v-if="showUserInfo" @click="addFriend">
                    <image class="logo"
                           :src="logo">
                    </image>
                    <text class="name">{{nickName}}</text>
                </div>
            </div>

             <div class="cell-row cell-line">
                 <div class="cell-panel h space-between">
                     <div class="flex-row">
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
                 <div class="cell-panel h space-between cell-clear">
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
        <qrcode ref="qrcode"> </qrcode>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>

    .h {
        height: 120px;
    }

    .input {
        margin-left: 10px;
        font-size: 34px;
        line-height: 80px;
        height:80px;
        width:600px;
    }

    .sub_header {
        margin-bottom: 20px;
    }

    .userinfo {
        flex-direction:column;
        align-items:center;
        margin-top: 30px;
        width:750px;
        height: 200px;
    }
    .logo {
        width:120px;
        height:120px;
        border-radius:60px;
        overflow:hidden;
    }
    .name {
        margin-top: 20px;
    }

</style>
<script>
    const native = weex.requireModule('app')
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import navbar from '../../include/navbar.vue'
    import qrcode from '../../include/qrcode.vue'
    import {jsMixins} from '../../mixins/wx.js'
    export default {
        mixins:[jsMixins],
        components: {
            navbar,qrcode
        },
        data() {
            return {
                showUserInfo:false,
                value:"",
                logo:"",
                nickName:"",
                id:""
            }
        },
        props: {
            title: { default: "添加好友" }
        },
        created(){
            var _this = this;
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('"+_this.locateURL+"/resources/fonts/iconfont.ttf')"
            });
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            showQrcode: function (e) {
                this.$refs.qrcode.show();
            },
            search: function (e) {
                var _this = this;
                return stream.fetch({
                    method: 'GET',
                    type: 'json',
                    url: '/weex/member/friends/search.jhtml?keyword='+_this.value+","
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                            var member = weex.data.data;
                            if (member.length != 1) {
                                native.showToast(member);
                                _this.nickName = member.nickName;
                                _this.logo = member.logo;
                                _this.id = member.id;
                                _this.showUserInfo = true;
                            } else {
                                native.showToast("没有找到好友");
                            }
                        } else {
                            native.showToast(weex.data.content);
                        }
                    } else {
                        native.showToast("网络不稳定请重试");
                    }
                })
            },
            addFriend: function (e) {
                var _this = this;
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/member/friends/add.jhtml?friendId='+_this.id
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                            event.closeURL(weex.data.data);
                        } else {
                            native.showToast(weex.data.content);
                        }
                    } else {
                        native.showToast("网络不稳定请重试");
                    }
                })
            }
        }

    }

</script>