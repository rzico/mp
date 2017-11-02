<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row cell-line">
                 <div class="cell-logo">
                    <div class="flex-row flex-start">
                        <text class="title ml10">通用设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <image class="logo" resize="cover"
                               :src="logo">
                        </image>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">昵称</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{nickName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                         <text class="title ml10">性别</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{gender}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">生日</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{birthday}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">职业</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{occupation}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">所在地</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{areaName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">个性签名</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{autograph}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between"  @click="updatePassword()">
                    <div class="flex-row flex-start">
                        <text class="title ml10">密码</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{hasPassword}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between"  @click="doBindWeiXin()">
                    <div class="flex-row flex-start">
                        <text class="title ml10">绑定微信号</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{bindMobile}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="doBindMobile()" >
                    <div class="flex-row flex-start">
                        <text class="title ml10">绑定手机号</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{bindWeiXin}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
         </scroller>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .cell-logo {
        height: 160px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width: 1px;
        border-bottom-color: #bbb;
        border-bottom-style: solid;
    }
    .logo {
        width:120px;
        height:120px;
        margin:10px;
        border-radius:60px;
        overflow:hidden;
    }
</style>
<script>
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    import navbar from '../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        data() {
            return {
                attribute:{},
                bindWeiXin:"未绑定",
                bindMobile:"未绑定",
                hasPassword:"未设置",
                autograph:"未设置",
                gender:"保密",
                birthday:"未设置",
                logo: utils.locate("logo.png"),
                nickName:"未登录",
                areaName:"未设置",
                occupation:"未设置"
            }
        },
        props: {
            title: { default: "账号设置" }
        },
        created() {
            utils.initIconFont();
            this.open();
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            updateStatus: function (attr) {
                var _this = this;
                _this.logo = attr.logo;
                _this.nickName = attr.nickName;
                if (attr.autograph!=null && attr.autograph!="") {
                    _this.autograph = attr.autograph;
                } else {
                    _this.autograph = "未填写";
                }
                if (attr.birthday!=null && attr.birthday!="") {
                    _this.birthday = "已设置";
                } else {
                    _this.birthday = "未设置";
                }
                if (attr.hasPassword!=null && attr.hasPassword==true) {
                    _this.hasPassword = "已设置";
                } else {
                    _this.hasPassword = "未设置";
                }
                if (attr.bindMobile!=null && attr.bindMobile==true) {
                    _this.bindMobile = "已绑定";
                } else {
                    _this.bindMobile = "未绑定";
                }
                event.toast(_this.attribute);
                if (attr.bindWeiXin!=null && attr.bindWeiXin==true) {
                    _this.bindWeiXin = "已绑定";
                } else {
                    _this.bindWeiXin = "未绑定";
                }
                if (attr.occupation!=null) {
                    _this.occupation = attr.occupation.name;
                } else {
                    _this.occupation = "未设置";
                }
                if (attr.area!=null) {
                    _this.areaName = attr.area.name;
                } else {
                    _this.areaName = "未设置";
                }
                if (attr.gender!=null && attr.gender!="") {
                    if (attr.gender=="male") {
                        _this.gender = "男";
                    }
                    if (attr.gender=="female") {
                        _this.gender = "女";
                    }
                    if (attr.gender=="secrecy") {
                        _this.gender = "保密";
                    }


                } else {
                    _this.autograph = "未设置";
                }
            },
            open:function () {
                var _this = this;
                GET("weex/member/attribute.jhtml",
                    function (data) {
                        if (data.type=="success") {
                            _this.attribute = data.data;
                            _this.updateStatus(_this.attribute);
                        } else {
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast("网络不稳定")
                    }
                )
            },
            updatePassword: function (e) {
                var _this = this;
                if (_this.attribute.bindMobile==false) {
                    event.openURL(utils.locate("view/member/password/index.js"),
                        function (updated) {
                            if (updated!=null) {
                                _this.attribute.bindMobile = updated;
                                _this.attribute.hasPassword = updated;
                            } else {
                                _this.attribute.hasPassword = false;
                            }
                            _this.updateStatus(_this.attribute);
                        }
                    )
                } else {
                    event.openURL(utils.locate("view/member/password/captcha.js"),
                        function (updated) {
                            if (updated!=null) {
                                _this.attribute.hasPassword = updated;
                            } else {
                                _this.attribute.hasPassword = false;
                            }
                            _this.updateStatus(_this.attribute);
                        }
                    )
                }
            },
            doBindMobile: function (e) {
                var _this = this;
                if (_this.attribute.bindMobile==true) {
                    return;
                }
                event.openURL(utils.locate("view/member/mobile/index.js"),
                    function (binded) {
                        if (binded!=null) {
                            _this.attribute.bindMobile = binded;
                        } else {
                            _this.attribute.bindMobile = false;
                        }
                        _this.updateStatus(_this.attribute);
                    }
                )

            },
            doBindWeiXin: function (e) {
                var _this = this;
                if (_this.attribute.bindWeiXin==true) {
                    return;
                }
                event.wxAuth(function (msg) {
                   if (msg.type=="success") {
                       POST("weex/member/weixin.jhtml?code="+msg.content).then(
                           function (data) {
                               if (data.type="success") {
                                   _this.attribute.bindWeiXin = true;
                                   _this.updateStatus(_this.attribute);
                               } else {
                                   event.toast(data.content);
                               }
                           },
                           function (err) {
                               event.toast("网络不稳定");
                           }
                       )
                   } else {
                       event.toast(msg.content);
                   }
                })

            }
        }

    }
</script>