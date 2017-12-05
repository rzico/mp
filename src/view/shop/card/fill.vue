<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback()"> </navbar>
        <div class="big">
            <div class="money">
                <text class="maxQuota">{{message}}</text>
                <div class="fontInput">
                    <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                    <input class="input" type="number" placeholder="" maxlength="7" :autofocus="true" v-model="quota" @input="onmoney"  />
                </div>
                <div class="maxQuotaServicefee">
                    <div class="servicefeeText" v-bind:style="{visibility:hide}">
                        <text class="servicefee"></text>
                    </div>
                    <div class="serviceArrival">
                        <text class="arrival">卡实际到账 {{creditedAmount}}元</text>
                    </div>
                </div>
            </div>
            <div class="buttombox">
                <div class="btn "  @click="payment('aliPayPlugIn')">
                    <text class="ico alipay" :style="{fontFamily:'iconfont'}">&#xe621;</text>
                    <text class="btn-text" value="支付宝">支付宝</text>
                </div>
                <div class="btn "  @click="payment('weixinPayPlugin')">
                    <text class="ico weixin" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信钱包">微信钱包</text>
                </div>
            </div>
            <div class="buttombox">
                <div class="btn "  @click="payment('cardPayPlugin')">
                    <text class="ico card" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    <text class="btn-text" value="会员卡">会员卡</text>
                </div>
                <div class="btn "  @click="payment('balancePayPlugin')">
                    <text class="ico wallet primary" :style="{fontFamily:'iconfont'}">&#xe698;</text>
                    <text class="btn-text" value="芸店钱包">芸店钱包</text>
                </div>
            </div>
            <div class="buttombox">
                <div class="btn " @click="offline('bankPayPlugin')">
                    <text class="ico bank" :style="{fontFamily:'iconfont'}">&#xe63a;</text>
                    <text class="btn-text" value="刷卡">刷卡(记账)</text>
                </div>
                <div class="btn " @click="offline('cashPayPlugin')">
                    <text class="ico cash" :style="{fontFamily:'iconfont'}">&#xe622;</text>
                    <text class="btn-text" value="现金">现金(记账)</text>
                </div>
            </div>
        </div>
        <div class="footer" @click="deposit()"><text class="sub_title">点击查看账单</text></div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .money{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:1px;
        border-top-width:1px;
        border-color:#CCC;
        margin-top:40px;
        flex-direction: column;
        margin-bottom: 10px;
    }
    .fontInput{
        border-style: solid;
        border-bottom-width:1px;
        border-color:#CCC;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        align-items:center;
        height: 160px;
    }
    .iconFont{
        font-size: 80px;
    }
    .input{
        width: 500px;
        height: 120px;
        font-size:60px;
    }
    .maxQuotaServicefee{
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
        height: 70px;
    }
    .maxQuota{
        font-size: 28px;
        margin-top: 20px;
        color:#cccccc;
        margin-left: 30px;
    }
    .serviceArrival{
        flex-direction: row;
        align-items:center;
        margin-right: 30px;
    }
    .servicefee{
        font-size: 28px;
        color:#cccccc;
        margin-left: 30px;
    }
    .arrival{
        font-size: 28px;
        color:#D9141E;
        margin-left: 10px;
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


    .footer {
        width:750px;
        height:120px;
        line-height: 120px;
        position: fixed;
        bottom:5px;
        align-items: center;
        justify-content: center;
    }

</style>

<script>
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    const printer = weex.requireModule('print');
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    export default {
        data() {
            return {
                id:"",
                cardId:"",
                quota:'',
                message:'请输入充值金额（元）',
                service:'0',
                hide:'hidden',
                timer:null,
                time:30,
                isScan:false,
                isSubmit:false,
                plugId:""
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "充值" },
        },
        computed:{
            creditedAmount:function() {
                if (utils.isNull(this.quota)) {
                    return 0;
                } else {
                    return Number(this.quota) - Number(this.service)
                }
            }
        },
        created() {
            utils.initIconFont();
            this.cardId = utils.getUrlParameter("id");
            this.load();
        },
        methods: {
            onmoney:function (e){
                if (e.value=='') {
                    this.quota = "";
                } else {
                    this.quota = e.value;
                }
                var _this=this;
                if (_this.timer!=null) {
                    clearTimeout(_this.timer);
                    _this.timer = null;
                }
                _this.timer = setTimeout(function () {
                    _this.serviceCharge()
                },1000)
                _this.hide= 'visible';
            },
            deposit:function () {
                event.openURL(utils.locate("view/shop/deposit/deposit.js"),function (e) {});
            },
            serviceCharge:function(){
                var _this = this;
                _this.service = 0;
            },
            goback: function () {
                event.closeURL()
            },
            load:function () {
                var _this = this;
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
                this.quota = "";
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
                                _this.print();
                                modal.alert({
                                    message: "充值成功",
                                    okTitle: '知道了'
                                })
                                event.closeURL(res);
                            } else
                            if (res.data=='0001') {
                                modal.alert({
                                    message: '充值失败',
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
                if (utils.isNull(_this.quota)) {
                    _this.isSubmit = false;
                    modal.alert({
                        message: "请输入充值金额",
                        okTitle: '知道了'
                    });
                    return;
                }
                POST("weex/member/card/fill.jhtml?id="+_this.cardId+"&amount="+_this.quota).then(
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

        }
    }
</script>