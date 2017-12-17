<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" border="false"> </navbar>
        <scroller class="scroller">
            <div class="wallet-panel bkg-primary">
                <text class="wallet-title">钱包余额（元）</text>
                <text class="balance">{{wallet.balance | currencyfmt}}</text>
            </div>
            <div class="cashierBox" v-if="hasCashier">
                <div class="cashier bkg-primary">收银台</div>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between" @click="bindingCard()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe64f;</text>
                        <text class="title ml10">银行卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{wallet.bankinfo}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>

                <div class="cell-panel space-between cell-clear" @click="cashCard()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe626;</text>
                        <text class="title ml10">提现到银行卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between" @click="deposit()">
                    <div class="flex-row flex-start" >
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe61f;</text>
                        <text class="title ml10">我的账单</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="reward()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe698;</text>
                        <text class="title ml10">我的赏金</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="rebate()">
                    <div class="flex-row flex-start" >
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                        <text class="title ml10">我的奖励</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .wallet-title {
        margin-top: 70px;
        flex:1;
        font-size: 32px;
        color: #fff;
        margin-left:50px;
        justify-content: center;
    }

    .wallet-panel {
        height:400px;
        flex-direction: column;
        align-items:flex-start;

    }

    .balance {
        flex:3;
        font-size: 120px;
        color: #fff;
        margin-left:40px;
    }

    .cashierBox {
        height:100px;
        width:150px;
        border-radius: 15px;
        background-color: #fff;
        font-size: 32px;
    }
    .cashier {
        height:100px;
        width:150px;
        border-width: 1px;
        border-radius: 15px;
        font-size: 32px;
        color:#fff
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    var event = weex.requireModule('event')
    var modal = weex.requireModule('modal')
    import filters from '../../../filters/filters.js'
    import navbar from '../../../include/navbar.vue'
     export default {
        data() {
            return {
                wallet:{balance:0,bankinfo:"未绑定",binded:true},
                bankinfo:''
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "钱包" }
        },
        created() {
            let _this = this;
            this.load();

        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            cashCard:function () {
                var _this = this;
                if (this.wallet.binded==false) {
                    event.openURL(utils.locate('view/member/bank/bindFirstStep.js'), function (message) {
                        if (message.type=='success') {
                            _this.wallet.binded = true;
                            _this.wallet.bankinfo = "已绑定";
                            event.openURL(utils.locate('view/member/wallet/transfer.js', function () {
                                    if (message.type=='success') {
                                        _this.load();
                                    }
                                })
                            )
                        }
                    })
                }  else {
                    event.openURL(utils.locate('view/member/wallet/transfer.js', function (message) {
                            if (message.type=='success') {
                                _this.load();
                            }
                        })
                    )
                }
            },
            bindingCard:function () {
                var _this = this;
                if(_this.wallet.bankinfo!='未绑定'){
                    event.openURL(utils.locate("view/member/bank/unbingBank.js?banknum="+encodeURI(_this.bankinfo)), function (message) {
                        if (message.type=='success') {
                            _this.load();
                        }
                    })
                }else {
                    event.openURL(utils.locate('view/member/bank/bindFirstStep.js'), function (message) {
                        if (message.type == 'success') {
                            _this.load();
                        }
                    })
                }
            },
            reward:function () {
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/reward.js'),function (message) {

                })
            },
            rebate:function () {
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/rebate.js'),function (message) {

                })
            },
            deposit:function () {
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/deposit.js'),function (message) {

                })
            },
            load:function () {
                var _this = this;
                GET("weex/member/wallet/view.jhtml",function (res) {
                    if (res.type=='success') {
                        _this.wallet = res.data;
                        _this.bankinfo = res.data.bankinfo
                    } else {
                        event.toast(res.content);
                    }
                },
                function (err) {
                    event.toast(err.content);
                })

            }
        }

    }
</script>