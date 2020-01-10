<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" border="false"> </navbar>
        <div class="bkg-primary"  style="position: relative">
            <text class="fz40 white ml20">{{vipData.name}}</text>
            <div style="height: 150px"></div> <!--增高dom-->
            <div class="transition transitionEEE"></div><!--过渡色-->
            <div class="payBillBox" >
                <div class="dayPayBox" @click="deposit">
                    <text class="dayPay">余额</text>
                    <div style="flex-direction: row;align-items: flex-end;margin-top: 10px">
                        <text class="dayPayIcon">¥</text>
                        <text class="dayPayAmount">{{wallet.balance | watchBalance}}</text>
                    </div>
                    <text class="dayMes">查看账单</text>
                </div>
                <div class="yesPayBox" @click="point()">
                    <text class="dayPay">金币(佣金)</text>
                    <div style="flex-direction: row;align-items: flex-end;margin-top: 10px">
                        <text class="dayPayAmount">{{vipData.point}}</text>
                    </div>
                    <text class="dayMes">查看明细</text>
                </div>
            </div>
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

                <div class="cell-panel space-between" @click="cashCard()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe626;</text>
                        <text class="title ml10">余额提现</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" @click="cashPoint()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe681;</text>
                        <text class="title ml10">金币提现</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" @click="filling()">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe63e;</text>
                        <text class="title ml10">钱包充值</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <!--<div class="cell-row boder-top">-->
                <!--<div class="cell-panel space-between" >-->
                    <!--<div class="flex-row flex-start" >-->
                        <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe61f;</text>-->
                        <!--<text class="title ml10">我的账单</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end">-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="cell-panel space-between" @click="reward()">-->
                    <!--<div class="flex-row flex-start">-->
                        <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe698;</text>-->
                        <!--<text class="title ml10">我的赏金</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end">-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="noBorderCell space-between " @click="rebate()">-->
                    <!--<div class="flex-row flex-start" >-->
                        <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>-->
                        <!--<text class="title ml10">我的奖励</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row flex-end">-->
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="boder-bottom"></div>-->
            <!--</div>-->
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .transition{
        width: 750px;
        height: 100px;
    }
    .payBillBox {
        width: 710px;
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: white;
        border-radius: 20px;
        flex-direction: row;
        align-items: center;
        position: absolute;
        left: 20px;
        bottom: 0px;
    }
    .dayPayBox{
        width: 355px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right-width: 1px;
        border-right-color: #eeeeee;
    }
    .yesPayBox {
        width: 355px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dayPay {
        font-size: 27px;
        color: #999;
    }

    .dayPayAmount {
        font-size: 63px;
        line-height: 63px;
    }

    .dayMes{
        font-size: 26px;
        color:  #398FEE;
        margin-top: 15px;
    }

    .dayPayIcon{
        font-size: 40px;
        margin-right: 15px;
        margin-bottom: 5px;
    }
    .moneyBox{
        width: 750px;
        height: 180px;
        /*border-radius: 11px;*/
        /*margin-left: 15px;*/
        /*margin-right: 15px;*/
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }
    .moneyBox_box{
        display: flex;
        height: 180px;
        width: 373px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
    }
    .moneyBox_box:active{
        background-color: #e6e6e6;
    }
    .moneyBox_box_title{
        font-size: 37px;
        font-weight: 500;
    }
    .moneyBox_box_img{
        width:30px;
        height:30px;
        margin-right: 10px;
    }
    .moneyBox_box_titleTwo{
        font-size: 37px;
        font-weight: 500;
        color:rgba(241,90,36,1);
    }
    .moneyBox_box_subTitle{
        font-size: 24px;
        color: #808080;
    }
    .noBorderCell{
        height: 98px;
        min-height: 98px;
        flex-direction: row;
        align-items: center;
    }
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
                bankinfo:'',
                clicked:false,
                vipData:{}
            }
        },
        components: {
            navbar
        },
         filters:{
             watchBalance(e){
                 e = parseFloat(e);
                 if(e==0||e=='0'){
                     return '0.00'
                 }else {
                     return e.toFixed(2)
                 }
             }
         },
        props: {
            title: { default: "钱包" }
        },
        created() {
            let _this = this;
            this.load();
            this.openPoint()
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            cashCard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (this.wallet.binded==false) {
                    _this.clicked = false
                    event.openURL(utils.locate('view/shop/bank/bind.js'), function (message) {
                        _this.clicked = false
                        if (message.type=='success') {
                            _this.wallet.binded = true;
                            _this.wallet.bankinfo = "已绑定";
                            event.openURL(utils.locate('view/member/wallet/transfer.js'), function () {
                                _this.clicked = false
                                        _this.load();
                                })
                        }
                    })
                }  else {
                    _this.clicked = false
                    event.openURL(utils.locate('view/member/wallet/transfer.js'), function (message) {
                                _this.load();
                        })
                }
            },
            cashPoint:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if (this.wallet.binded==false) {
                    _this.clicked = false
                    event.openURL(utils.locate('view/shop/bank/bind.js'), function (message) {
                        _this.clicked = false
                        if (message.type=='success') {
                            _this.wallet.binded = true;
                            _this.wallet.bankinfo = "已绑定";
                            event.openURL(utils.locate('view/member/wallet/pointTransfer.js'), function () {
                                _this.clicked = false
                                _this.openPoint();
                            })
                        }
                    })
                }  else {
                    _this.clicked = false
                    event.openURL(utils.locate('view/member/wallet/pointTransfer.js'), function (message) {
                        _this.openPoint();
                    })
                }
            },
            bindingCard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(_this.wallet.bankinfo!='未绑定'){
                    event.openURL(utils.locate("view/member/bank/unbingBank.js?banknum="+encodeURI(_this.bankinfo)), function (message) {
                        if (message.type=='success') {
                            _this.load();
                        }
                        _this.clicked = false
                    })
                }else {
                    event.openURL(utils.locate('view/shop/bank/bind.js'), function (message) {
                        if (message.type == 'success') {
                            _this.load();
                        }
                        _this.clicked =false
                    })
                }
            },
            filling(){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/filling.js'), function (message) {
                    _this.clicked = false
                    _this.load();
                })
            },
            reward:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/reward.js'),function (message) {
                    _this.clicked =false
                })
            },
            rebate:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/rebate.js'),function (message) {
                    _this.clicked =false
                })
            },
            deposit:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/deposit.js'),function (message) {
                    _this.clicked =false
                })
            },
            point:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/wallet/point.js?id='+this.vipData.id),function (message) {
                    _this.clicked =false
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

            },
            openPoint:function () {
                var _this = this;
                GET("weex/member/card/view.jhtml",function (res) {
                        if (res.type=='success') {
                        _this.vipData = res.data.card
                        } else {
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })

            },
        }

    }
</script>