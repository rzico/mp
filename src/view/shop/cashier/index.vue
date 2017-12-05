<template>
    <div class="wrapper">
        <scroller class="scroller">
            <refresh class="refresh" @refresh="onrefresh" @pullingdown="onpullingdown" :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">刷新数据</text>
            </refresh>
            <div class="wallet-panel" :style="objHeader()">
                <text class="balance">{{cashier.today | currencyfmt}}</text>
                <text class="ico exit" :style="{fontFamily:'iconfont'}" @click="goback()">&#xe60a;</text>
                <div class="wallet-title">
                    <text class="sub_title">今天收银（元）</text>
                    <text class="sub_title">昨天收银:{{cashier.yesterday | currencyfmt}}</text>
                </div>
            </div>
            <div class="fontInput">
                <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                <input class="input" type="number" placeholder="请输入消费金额" maxlength="7":autofocus="true" v-model="amount" />
                <text class="ico clear" :style="{fontFamily:'iconfont'}" @click="clearTimer()">&#xe60a;</text>
            </div>
            <div class="buttombox"  v-if="hasInput()">
                <div class="btn "  @click="payment('aliPayPlugIn')">
                    <text class="ico alipay" :style="{fontFamily:'iconfont'}">&#xe621;</text>
                    <text class="btn-text" value="支付宝">支付宝</text>
                </div>
                <div class="btn "  @click="payment('weixinPayPlugin')">
                    <text class="ico weixin" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信钱包">微信钱包</text>
                </div>
            </div>
            <div class="buttombox"  v-if="hasInput()">
                <div class="btn "  @click="payment('cardPayPlugin')">
                    <text class="ico card" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    <text class="btn-text" value="会员卡">会员卡</text>
                </div>
                <div class="btn "  @click="payment('balancePayPlugin')">
                    <text class="ico wallet primary" :style="{fontFamily:'iconfont'}">&#xe698;</text>
                    <text class="btn-text" value="芸店钱包">芸店钱包</text>
                </div>
            </div>
            <div class="buttombox"  v-if="hasInput()">
                <div class="btn " @click="offline('bankPayPlugin')">
                    <text class="ico bank" :style="{fontFamily:'iconfont'}">&#xe63a;</text>
                    <text class="btn-text" value="刷卡">刷卡(记账)</text>
                </div>
                <div class="btn " @click="offline('cashPayPlugin')">
                    <text class="ico cash" :style="{fontFamily:'iconfont'}">&#xe622;</text>
                    <text class="btn-text" value="现金">现金(记账)</text>
                </div>
            </div>
            <div class="menubox">
                <div class="menu" @click="shop()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe6ab;</text>
                    <text class="btn-text" value="刷卡">店铺</text>
                </div>
                <div class="menu" @click="employee()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe70e;</text>
                    <text class="btn-text" value="刷卡">员工</text>
                </div>
                <div class="menu" @click="deposit()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe63b;</text>
                    <text class="btn-text" value="刷卡">账单</text>
                </div>
                <div class="menu" @click="gocard()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                    <text class="btn-text" value="刷卡">会员卡</text>
                </div>
                <div class="menu" @click="gocoupon()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                    <text class="btn-text" value="刷卡">优惠券</text>
                </div>
                <div class="content">
                    <text class="sub_title mt10">1.支持微信钱包、支付宝、店内会员卡、钱包</text>
                    <text class="sub_title mt10">2.单笔收钱金额不能超过5000元</text>
                    <text class="sub_title mt10">3.快速秒到,超过30秒没到账联系客服处理</text>
                </div>
            </div>
        </scroller>
        <div class="waiting" v-if="isShow()">
            <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe710;</text>
            <text class="paymenting">支付中</text>
            <text class="paymenting">{{step}}</text>
            <div class="close"  @click="close()">
                <text class="close_button" :style="{fontFamily:'iconfont' }">&#xe60a;</text>
            </div>
        </div>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .sub_title {
        color:#ccc;
        font-size: 30px;
    }

    .wallet-title {
        width: 620px;
        margin-top: 10px;
        font-size: 32px;
        color: #fff;
        margin-left:60px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }

    .wallet-panel {
        padding-top: 44px;
        height:310px;
        flex-direction: column;
        align-items:flex-start;
    }

    .balance {
        margin-top: 30px;
        font-size: 120px;
        color: #fff;
        margin-left:40px;
    }
    .exit {
        position: absolute;
        right:0px;
        top:44px;
        color: #fff;
        font-size:48px;
        width: 80px;
        height: 80px;
        line-height: 80px;
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
        margin-bottom: 10px;
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
        width: 500px;
        height: 100px;
        font-size:50px;
    }

    .clear {

    }
    .buttombox {
        margin-top: 10px;
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
        font-size: 32px;
        color:#666;
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
    .cash {
        color:#F0AD3C;
        margin-top: 3px;
    }
    .bank {
        margin-top: 4px;
        color:tomato;
    }

    .content {
        margin-left: 30px;
        margin-top: 50px;
    }
    .waiting {
        position:fixed;
        flex-direction: column;
        left: 125px;
        top: 420px;
        width: 500px;
        background-color: navajowhite;
        border: 1px;
        border-color: #eee;
        border-radius:10px;
        padding-bottom: 35px;
        padding-top: 20px;
        justify-content: center;
        align-items: center;
        height:300px;
    }
    .paymenting {
        justify-content: center;
        font-size: 32px;
        margin-top: 10px;
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

    .menubox {
        margin-top: 40px;
        flex-direction: row;
        flex-wrap: wrap;
        width:690px;
        margin-left: 30px;
        border:1px;
        border-top-left-radius: 10px;
        border-top-right-radius:10px;
        background-color: #fff;
        min-height: 900px;
    }

    .menu {
        flex-direction: column;
        align-items: center;
        width:230px;
        padding:40px;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters.js'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    const printer = weex.requireModule('print');
    export default {
        data() {
            return {
                refreshing:false,
                id:0,
                sn:"",
                step:"",
                cashier:{today:0,yesterday:0,shopId:""},
                shopId:"",
                amount:"",
                timer:null,
                time:30,
                isScan:false,
                isSubmit:false,
                plugId:""
            }
        },
        components: {
        },
        props: {
            title: { default: "收银台" }
        },
        created() {
            utils.initIconFont();
            this.view();
        },
        methods: {
            shop:function () {
                event.openURL(utils.locate("view/shop/shop/storeList.js"),function (e) {});
            },
            gocard:function () {
                event.openURL(utils.locate("view/shop/card/cardList.js"),function (e) {});
            },
            gocoupon:function () {
                event.openURL(utils.locate("view/shop/coupon/list.js"),function (e) {});
            },
            objHeader:function () {
                if (utils.device()=='V1') {
                    return {backgroundColor:'#fff'}
                } else {
                    return {backgroundColor:'#EB4E40'}
                }
            },
            hasInput:function () {
                return utils.isNull(this.amount)==false;

            },
            classHeader:function () {
                return utils.device();
            },
            onrefresh (event) {
                var _this = this;
                _this.refreshing = true
                setTimeout(() => {
                    _this.view();
                    _this.refreshing = false
                }, 2000)
            },
            onpullingdown (event) {
            },
            view:function () {
                var _this = this;
                GET("weex/member/cashier/view.jhtml",function (res) {
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
                event.openURL(utils.locate("view/shop/deposit/deposit.js"),function (e) {});
            },
            isShow:function () {
                return this.time<30;
            },
            clearTimer:function () {
               if (this.timer!=null) {
                   clearTimeout(this.timer);
                   this.timer = null;
               }
               this.time = 30;
               this.step = "";
               this.amount = "";
               this.isScan = false;
               this.isSubmit = false;
            },
            print:function () {
                GET("weex/member/paybill/print.jhtml?id="+this.id,function (mes) {
                    if (mes.type=='success') {
                        printer.print(mes.data);
                    } else {
                        modal.alert({
                            message: mes.content,
                            okTitle: '知道了'
                        })
                    }
                },function (err) {
                    event.toast(err.content);
                })

            },
            close:function () {
               this.clearTimer();
            },
            beginTimer:function () {
                var _this = this;
                if (_this.time==0) {
                    _this.clearTimer();
                    return;
                }
                _this.step = _this.step +'..';
                POST("payment/query.jhtml?sn="+_this.sn).then(
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
                                _this.timer = setTimeout(function () {_this.beginTimer()},1000);
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
            offline:function (pid) {
              this.plugId = pid;
              this.submit("");
            },
            submit:function (safeKey) {
                var _this = this;
                if (_this.isSubmit==true) {
                    return;
                }
                _this.isSubmit = true;
                if (utils.isNull(_this.amount)) {
                    _this.isSubmit = false;
                    modal.alert({
                        message: "请输入消费金额",
                        okTitle: '知道了'
                    });
                    return;
                }
                POST("weex/member/cashier/submit.jhtml?shopId="+_this.shopId+"&amount="+_this.amount).then(
                    function (res) {
                        if (res.type=='success') {
                            _this.id = res.data.id;
                            _this.sn = res.data.sn;
                            POST("payment/submit.jhtml?sn="+_this.sn+"&paymentPluginId="+_this.plugId+"&safeKey="+safeKey).then(
                                function (data) {
                                    if (data.type=='success') {
                                        _this.time = 29;
                                        _this.timer = setTimeout(function () {_this.beginTimer()},500);
                                    } else {
                                        _this.isSubmit = false;
                                        modal.alert({
                                            message: data.content,
                                            okTitle: '知道了'
                                        })
                                    }
                                },function (err) {
                                    _this.isSubmit = false;
                                    event.toast(err.content);
                                }
                            )
                        } else {
                            _this.isSubmit = false;
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        _this.isSubmit = false;
                        event.toast(err.content);
                    }
                )
            },
            payment:function (plugId) {
                var _this = this;
                if (_this.isScan==true) {
                    return;
                }
                _this.isScan = true;
                _this.plugId = plugId;
                event.scan(function (message) {
                    if (message.type=='success') {
                        _this.isScan = false;
                        _this.submit(message.data);
                    } else {
                        _this.isScan = false;
                    }
                });
            }
        }

    }
</script>