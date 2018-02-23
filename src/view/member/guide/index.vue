<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"  > </navbar>
        <div class="cell-row cell-line">
            <div class="cell-panel space-between cell-clear" @click="topic()" >
                <div class="flex-row flex-start">
                    <image class="number" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/number1.jpeg"></image>
                    <text class="icoPitch" :style="{fontFamily:'iconfont'}" v-if="steped1">&#xe64d;</text>
                    <text class="title ml10" v-if="!steped1">开通专栏</text>
                    <text class="complete ml10" v-if="steped1">已开通专栏</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="sub_title"></text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
        <div class="sub-panel">
            <text class="sub_title">免费开通专栏，即可拥有自已的微信、小程序专栏</text>
        </div>
        <div class="cell-row cell-line">
            <div class="cell-panel space-between cell-clear" @click="bindingCard()">
                <div class="flex-row flex-start pl20"  >
                    <image class="number" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/number2.jpeg"></image>
                    <text class="icoPitch pl20" :style="{fontFamily:'iconfont'}" v-if="steped2">&#xe64d;</text>
                    <text class="title ml10" v-if="!steped2">绑定银行卡</text>
                    <text class="complete ml10" v-if="steped2">已绑定银行卡</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="sub_title"></text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
        <div class="sub-panel ">
            <text class="sub_title ">绑定银行卡完成实名认证</text>
        </div>
        <div class="cell-row cell-line">
            <div class="cell-panel space-between cell-clear" @click="shop()">
                <div class="flex-row flex-start">
                    <image class="number" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/number3.jpeg"></image>
                    <text class="icoPitch" :style="{fontFamily:'iconfont'}" v-if="steped3">&#xe64d;</text>
                    <text class="title ml10" v-if="!steped3">完善资料</text>
                    <text class="complete ml10" v-if="steped3">已完善资料</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="sub_title"></text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
        <div class="sub-panel">
            <text class="sub_title">完善您店铺相关资料</text>
        </div>
        <div class="cell-row cell-line">
            <div class="cell-panel space-between  cell-clear" @click="pay()">
                <div class="flex-row flex-start pl20">
                    <image class="number" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/number4.jpeg"></image>
                    <text class="icoPitch pl20" :style="{fontFamily:'iconfont'}" v-if="steped4">&#xe64d;</text>
                    <text class="title ml10" v-if="!steped4">支付费用</text>
                    <text class="complete ml10" v-if="steped4">已支付费用</text>
                </div>
                <div class="flex-row flex-end">
                    <text class="sub_title"></text>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
        <div class="sub-panel ">
            <text class="sub_title">付费尊享商家专有特权，福利</text>
        </div>
        <payment ref="payment" @notify="notify"></payment>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .number{
        height: 48px;
        width: 48px;
        background-color: #cccccc;
    }
    .icoPitch{
        position: absolute;
        top:20px;
        left:15px;
        font-size: 20px;
        color:#EB4E40;
    }
    .complete{
        font-size: 32px;
        color:#999;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch';
    import payment from '../../../include/payment.vue'
    var event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    import utils from '../../../assets/utils';
    export default {
        components: {
            navbar,payment
        },
        data() {
            return {
                clicked:false,
                steped1:false,
                steped2:false,
                steped3:false,
                steped4:false,
            }
        },
        props: {
            title: {default: "开通向导"},
        },
        created() {
            this.open()
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },

//            获取状态
            open:function () {
                var _this = this;
                GET("weex/member/guide/view.jhtml",function (res) {
                        if (res.type=='success') {
                            _this.steped1 = res.data.steped1;
                            _this.steped2 = res.data.steped2;
                            _this.steped3 = res.data.steped3;
                            _this.steped4 = res.data.steped4;
                        } else {
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })

            },
            //            判断是否开通专栏，没开通跳转开通页面，否则不能点击
            topic:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(_this.steped1 == false){
                    event.openURL(utils.locate('view/member/option.js'), function (message) {
                        _this.clicked = false
                            _this.open();
                    })
                }else {
                    return;
                }
            },
//            判断是否已绑卡，未绑卡跳转绑卡界面，已绑卡不跳转
            bindingCard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                if(this.steped1 == true) {
                    var _this = this;
                    if (_this.steped2 == false) {
                        event.openURL(utils.locate('view/member/bank/bindFirstStep.js'), function (message) {
                            _this.clicked = false
                            _this.open();
                        })
                    } else {
                        return;
                    }
                }else{
                    var _this = this;
                    modal.alert({
                        message: '请先完成第一步',
                        okTitle: '知道了'
                    })
                    _this.clicked = false
                }
            },
            //            判断是否开通店铺
            shop:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(this.steped1 !== true) {
                    modal.alert({
                        message: '请先完成第一步',
                        okTitle: '知道了'
                    })
                    _this.clicked = false;
                    return
                } if(this.steped2 !== true) {
                    modal.alert({
                        message: '请先完成第二步',
                        okTitle: '知道了'
                    })
                    _this.clicked = false;
                    return
                }else{
                    var _this = this;
                    if (_this.steped3 == false) {
                        event.openURL(utils.locate('view/shop/shop/newShop.js'), function (message) {
                            _this.clicked = false
                            _this.open();
                        })
                    } else {
                        return;
                    }
                }
            },
            //            判断是否付费
            pay:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(this.steped1 !== true) {
                    modal.alert({
                        message: '请先完成第一步',
                        okTitle: '知道了'
                    })
                    _this.clicked = false;
                    return
                } if(this.steped2 !== true) {
                    modal.alert({
                        message: '请先完成第二步',
                        okTitle: '知道了'
                    })
                    _this.clicked = false;
                    return
                }if(this.steped3 !== true) {
                    modal.alert({
                        message: '请先完成第三步',
                        okTitle: '知道了'
                    })
                    _this.clicked = false;
                    return
                }else {
                    var _this = this;
                    if (_this.steped4 == false) {
                        POST('weex/member/topic/activate.jhtml').then(
                            function (mes) {
                                _this.clicked = false;
                                if (mes.type == "success") {
                                    if (utils.isNull(mes.data)) {
                                        _this.open();
                                    } else {
                                        _this.$refs.payment.show(mes.data);
                                        _this.open();
                                    }
                                } else {
                                    event.toast(mes.content);
                                }
                            }, function (err) {
                                _this.clicked = false;
                                event.toast(err.content);
                            }
                        )
                    } else {
                        return;
                    }
                }
            },
            //支付完成通成
            notify:function (e) {
                if (e.type=="success") {
                    modal.alert({
                        message: '点亮专栏成功',
                        okTitle: '知道了'
                    })
                    this.open();
                }
            },
        }
    }
</script>