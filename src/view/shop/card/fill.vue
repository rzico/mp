<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback()" > </navbar>
        <div class="big">
            <div class="money">
                <text class="maxQuota">{{message}}</text>
                <div class="fontInput">
                    <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                    <input class="input" type="number" placeholder="" maxlength="7" :autofocus="true" value="" @input="onmoney"  />
                </div>
                <div class="maxQuotaServicefee">
                    <div class="servicefeeText" v-bind:style="{visibility:hide}">
                        <text class="servicefee">手续费 {{service}}元</text>
                    </div>
                    <div class="serviceArrival">
                        <text class="arrival">实际到账 {{creditedAmount}}元</text>
                    </div>
                </div>
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
            <div class="buttombox">
                <div class="btn ">
                    <text class="ico bank" :style="{fontFamily:'iconfont'}">&#xe63a;</text>
                    <text class="btn-text" value="刷卡" @click="payment('balancePayPlugIn')">刷卡(记账)</text>
                </div>
                <div class="btn ">
                    <text class="ico cash" :style="{fontFamily:'iconfont'}">&#xe622;</text>
                    <text class="btn-text" value="现金" @click="payment('cardPayPlugIn')">现金(记账)</text>
                </div>
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
       font-size:100px;
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
        color: tomato;
    }

</style>

<script>
    var event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    export default {
        data() {
            return {
                id:"",
                quota:'0',
                message:'请输入充值金额（元）',
                service:'0',
                hide:'hidden',
                timer:null
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "会员卡充值" },
        },
        computed:{
            creditedAmount:function() {
                if (this.quota==0) {
                    return 0;
                } else {
                    return Number(this.quota) - Number(this.service)
                }
            }
        },
        created() {
            utils.initIconFont();
            this.id = utils.getUrlParameter("id");
            this.load();
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
                _this.hide= 'visible';
            },
            fill:function () {
                var _this = this;
                POST('weex/member/card/fill.jhtml?id='+ this.id +'&amount=' +this.quota).then(
                    function (data) {
                        if (data.type == "success") {
                            modal.alert({
                                message: '充值成功了',
                                okTitle: '知道了'
                            })
                            event.closeURL(data);
                        } else {
                            event.toast(data.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )
            },
            serviceCharge:function(){
                var _this = this;
                _this.service = 0;
//                if (this.quota==0) {
//                    _this.service = 0;
//                } else {
//                    POST('weex/member/transfer/calculate.jhtml?amount=' +this.quota ).then(
//                        function (data) {
//                            if (data.type == "success") {
//                                _this.service = data.data;
//                            } else {
//                                event.toast(data.content);
//                            }
//                        }, function (err) {
//                        }
//                    )
//                }
            },
            goback: function () {
                event.closeURL()
            },
            load:function () {
                var _this = this;
//                GET("weex/member/transfer/view.jhtml",function (res) {
//                    if (res.type=='success') {
//                        _this.wdata = res.data;
//                    } else {
//                        event.toast(res.content);
//                    }
//                },function (err) {
//                    event.toast(err.content);
//                })
            }
        }
    }
</script>