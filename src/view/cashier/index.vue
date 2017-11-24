<template>
    <div class="wrapper">
        <div class="header cb" @click="goback()">
            <div style="flex-direction: row;margin-top: 40px;height: 96px;align-items: center;flex: 1;">
                <div class="flex-center flex3" >
                    <image class="logo" :src="cashier.logo" ></image>
                    <text class="title">{{cashier.name}}</text>
                </div>
                <div class="flex-end flex2">
                    <text class="scan" :style="{fontFamily:'iconfont'}"  @click="scan()">&#xe607;</text>
                    <text class="add" :style="{fontFamily:'iconfont'}"  @click="scan()">&#xe62a;</text>
                </div>
            </div>
        </div>
        <scroller class="scroller">
            <div class="wallet-panel bkg-primary">
                <text class="balance">{{cashier.today | currencyfmt}}</text>
                <div class="wallet-title">
                    <text class="sub_title">今天收银（元）</text>
                    <text class="sub_title">昨天收银:{{cashier.yesterday | currencyfmt}}</text>
                </div>
            </div>
            <div class="fontInput">
                <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                <input class="input" type="number" placeholder="请输入消费金额" maxlength="7":autofocus="true" v-model="amount" />
            </div>
            <div class="buttombox">
                <div class="btn ">
                    <text class="ico alipay" :style="{fontFamily:'iconfont'}">&#xe621;</text>
                    <text class="btn-text" value="支付宝" @click="payment('alipayPlugIn')">支付宝</text>
                </div>
                <div class="btn ">
                    <text class="ico weixin" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信钱包" @click="payment('weixinPayPlugIn')">微信钱包</text>
                </div>
            </div>
            <div class="buttombox">
                <div class="btn ">
                    <text class="ico card" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    <text class="btn-text" value="会员卡" @click="payment('cardPayPlugIn')">会员卡</text>
                </div>
                <div class="btn ">
                    <text class="ico wallet primary" :style="{fontFamily:'iconfont'}">&#xe698;</text>
                    <text class="btn-text" value="芸店钱包" @click="payment('balancePayPlugIn')">芸店钱包</text>
                </div>
            </div>
            <div class="content">
                <text class="sub_title">1.支持微信钱包、支付宝、店内会员卡、芸店钱包</text>
                <text class="sub_title">2.单笔收钱金额不能超过5000元</text>
                <text class="sub_title">3.快速秒到,超过30秒没到账联系客服处理</text>
            </div>
        </scroller>
        <div class="waiting" v-if="isShow()">
            <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe710;</text>
            <text class="paymenting">支付中...</text>
            <div class="close"  @click="close()">
                <text class="close_button" :style="{fontFamily:'iconfont' }">&#xe60a;</text>
            </div>
        </div>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .title {
        font-size: 32px;
        line-height: 60px;
        color:white;
    }
    .logo {
        height:55px;
        width:55px;
        border-radius:6px;
    }
    .scan {
        font-size: 36px;
        line-height: 60px;
        height:60px;
        width:60px;
        color:white;
        margin-right: 30px;
    }
    .add {
        font-size: 40px;
        line-height: 60px;
        height:60px;
        width:60px;
        color:white;
        margin-right: 20px;
    }

    .cb {
        border-bottom-width: 0px!important;
    }

    .wallet-title {
        width: 620px;
        margin-top: 20px;
        font-size: 32px;
        color: #fff;
        margin-left:60px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }

    .wallet-panel {
        height:280px;
        flex-direction: column;
        align-items:flex-start;
    }

    .balance {
        margin-top: 30px;
        font-size: 120px;
        color: #fff;
        margin-left:40px;
    }

    .fontInput{
        border-style: solid;
        border-width:1px;
        border-color:#CCC;
        border-radius: 5px;
        padding-left: 20px;
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        align-items:center;
        height: 120px;
    }
    .iconFont{
        margin-top: 10px;
        font-size: 80px;
    }
    .input{
        margin-left:10px;
        width: 600px;
        height: 100px;
        font-size:50px;
    }

    .buttombox {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        width: 690px;
    }

    .btn {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
        padding-top: 0px;
        height: 80px;
        flex:1;
        padding-left: 40px;
        border-radius:12px;
        border-width: 1px;
        border-color:#ccc;
        background-color: #eee;
    }
    .btn-text {
        margin-left: 10px;
    }
    .btn:active {
        background-color:#ccc;
    }
    .weixin {
        color:limegreen;
        margin-top: 4px;
    }
    .alipay {
        color:#0088fb;
        margin-top: 4px;
    }
    .card {
        color:red;
        margin-top: 3px;
    }
    .wallet {
        margin-top: 4px;
    }

    .content {
        margin-left: 30px;
        margin-top: 50px;
    }
    .waiting {
        position: fixed;
        flex-direction: column;
        margin-left: 125px;
        margin-top: 200px;
        width: 500px;
        background-color: white;
        border: 1px;
        border-color: #eee;
        border-radius:10px;
        padding-bottom: 35px;
        padding-top: 20px;
        justify-content: center;
        align-items: center;
    }
    .paymenting {
        justify-content: center;
    }
    .close {
        position:absolute;
        width:60px;
        height: 60px;
        right: 0px;
        top : 10px;
        flex-direction: column;
        justify-content: center;
    }

    .close_button {
        font-size: 48px;
        color:#ccc
    }

</style>
<script>
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    import filters from '../../filters/filters.js'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    export default {
        data() {
            return {
                cashier:{today:0,yesterday:0,shopId:""},
                shopId:"",
                amount:"",
                timer:null,
                time:30
            }
        },
        components: {
        },
        props: {
            title: { default: "收银台" }
        },
        created() {
            this.view();
        },
        methods: {
            view:function () {
                var _this = this;
                GET("weex/member/cashier/view.jhtml",function (res) {
                   event.toast(res);
                   if (res.type=="success") {
                       _this.cashier = res.data;
                       _this.shopId = res.data.shopId;
                   } else {
                       event.toast(res.message);
                   }
                },function (err) {
                   event.toast(err.message);
                });
            },
            goback: function (e) {
                event.closeURL();
            },
            deposit:function () {
                event.openURL(utils.locate("view/cashier/deposit.js"),function (e) {});
            },
            isShow:function () {
                return this.time<15;
            },
            clearTimer:function () {
               if (this.timer!=null) {
                   clearTimeout(this.timer);
                   this.timer = null;
               }
               this.time = 15;
            },
            print:function () {

            },
            close:function () {
               this.clearTimer();
            },
            beginTimer:function (sn) {
                var _this = this;
                if (_this.time==0) {
                    this.clearTimer();
                    return;
                }
                _this.time =  _this.time - 1;
                POST("payment/query.jhtml?sn="+sn).then(
                    function (res) {
                        if (res.type=='success') {
                            if (res.data=='0000') {
                                _this.clearTimer();
                                event.toast("付款成功");
                                _this.print();
                            } else
                            if (res.data=='0001') {
                                modal.alert({
                                    message: '付款失败',
                                    okTitle: '知道了'
                                })
                                _this.clearTimer();
                            } else {
                                _this.timer = setTimeout(_this.beginTimer(sn),1000);
                            }
                        } else {
                            _this.clearTimer();
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        _this.clearTimer();
                        event.toast(err.content);
                    }
                )
            },
            payment:function (plugId) {
                var _this = this;
                event.scan(function (message) {
                    if (message.type=='success') {
                        POST("weex/member/cashier/submit.jhtml?shopId="+_this.shopId+"&amount="+_this.amount).then(
                            function (res) {
                                if (res.type=='success') {
                                    POST("payment/submit.jhtml?sn="+res.data+"&paymentPluginId="+plugId+"&safeKey="+message.data).then(
                                        function (data) {
                                            _this.beginTimer(res.data);
                                        },function (err) {
                                            event.toast(err.content);
                                        }
                                    )
                                } else {
                                    event.toast(res.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )
                    } else {
                        event.toast(message.content);
                    }
                });
            }
        }

    }
</script>