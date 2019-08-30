<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title" @goback="goback" > </navbar>
        <div class="big">
            <div class="money">
                <text class="maxQuota">{{message}}</text>
                <div class="fontInput">
                    <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                    <input class="input" type="number" placeholder="" maxlength="7":autofocus="true" value="" @input="onmoney"  />
                </div>
                <div class="maxQuotaServicefee">
                    <div class="servicefeeText" v-bind:style="{visibility:hide}">
                        <text class="servicefee">手续费 {{service | currencyfmt}}元</text>
                    </div>
                    <div class="serviceArrival">
                        <text class="arrival">实际到账 {{creditedAmount | currencyfmt}}元</text>
                    </div>
                </div>
            </div>
            <div class="botton bkg-primary" @click="withdrawals">
                <text class="bottontext">确认充值</text>
            </div>
        </div>
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
        height: 110px;
        line-height: 80px;
        font-size:80px;
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
    .botton{
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 70px;
        height: 82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
    }
    .bottontext{
        font-size: 40px;
        color:#ffffff;
    }
</style>

<script>
    var event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch'
    import filters from '../../../filters/filters.js'
    import utils from '../../../assets/utils';
    export default {
        data() {
            return {
                quota:'0',
                message:'单笔最大额度 5万元',
                bankstyle:2,
                bankcolor:'#D9141E',
                wechatstyle:1,
                wechatcolor:'#ccc',
                bankWithdrawals:'bankcard',
                service:'0',
                hide:'hidden',
                timer:null,
                clicked:false
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "充值" },
        },
        computed:{
            creditedAmount:function(){
                if (this.quota==0) {
                    return 0;
                } else {
                    return parseFloat(this.quota) - parseFloat(this.service)
                }
            }
        },
        created() {

        },
        methods: {
            onmoney:function (e){
                if (e.value=='') {
                    this.quota = 0;
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
                _this.hide= 'visible'
            },
            withdrawals:function () {
                var _this = this;
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                POST('weex/member/recharge/submit.jhtml?amount='+this.quota).then(
                    function (data) {
                        if (data.type == "success") {
                            POST("payment/submit.jhtml?sn="+data.data+"&paymentPluginId=weixinPayPlugin").then(
                                function (res) {
//                        utils.debug(data);
                                    if (res.type=="success") {
                                        event.wxAppPay(res.data,function (e) {
                                            if (e.type=='success') {
                                                POST("payment/query.jhtml?sn="+data.data).then(
                                                    function (data) {
                                                        event.closeURL();
                                                    },
                                                    function (err) {
                                                        event.closeURL();
                                                    }

                                                )
                                            } else {
                                                event.toast('支付失败');
                                            }
                                        })
                                    } else {
                                        event.toast(res.content);
                                    }
                                },
                                function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        } else {
                            event.toast(data.content);
                        }
                        _this.clicked = false;
                    }, function (err) {
                        event.toast(err.content);
                        _this.clicked = false;
                    }
                )
            },
            serviceCharge:function(){
                var _this = this;
                if (this.quota==0) {
                    _this.service = 0;
                } else {
                    POST('weex/member/recharge/calculate.jhtml?amount=' +this.quota ).then(
                        function (data) {
                            if (data.type == "success") {
                                if(!utils.isNull(data.data)){
                                    _this.service = data.data;
                                }
                            } else {
                                event.toast(data.content);
                            }
                        }, function (err) {
                        }
                    )
                }
            },
            goback: function () {
                event.closeURL();
            },
        }
    }
</script>