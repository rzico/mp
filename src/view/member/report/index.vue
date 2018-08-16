<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" > </navbar>
        <scroller class="scroller">
            <div class="menubox">
                <div class="menu" @click="order_report()" >
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe684;</text>
                    <text class="menuBtn">订单统计</text>
                </div>
                <div class="menu" @click="payment_report()" >
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe6b1;</text>
                    <text class="menuBtn">收款统计</text>
                </div>
                <div class="menu" @click="contacts_report()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe63b;</text>
                    <text class="menuBtn">配送结算</text>
                </div>
                <div class="menu" @click="sendSingle_report()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe63b;</text>
                    <text class="menuBtn">派单结算</text>
                </div>
                <div class="menu" @click="barrel_report()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                    <text class="menuBtn">空桶结算</text>
                </div>
                <div class="menu" @click="money_report()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                    <text class="menuBtn">收银统计</text>
                </div>
                <div class="menu" @click="arrears_report()">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                    <text class="menuBtn">欠款统计</text>
                </div>
            </div>
        </scroller>
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
        margin-left:40px;
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

    .menuBtn {
        margin-top: 10px;
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
        width:229px;
        padding:40px;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters.js'
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue'
    const modal = weex.requireModule('modal');
    const printer = weex.requireModule('print');
    var globalEvent = weex.requireModule('globalEvent');
    export default {
        data() {
            return {
                roles:"",
                isIndex:false,
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
                plugId:"",
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "统计" }
        },
        created() {
            var _this = this;
            utils.initIconFont();
            this.permissions()
        },
        methods: {
//            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
            order_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/member/report/order_report.js"),function (e) {_this.clicked =false});
            },
            payment_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/member/report/payment_report.js"),function (mes) {
                    _this.clicked =false
                });
            },
            contacts_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/member/report/contacts_report.js"),function (e) {_this.clicked = false});
            },
            sendSingle_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/member/report/sendSingle_report.js"),function (e) {_this.clicked = false});
            },
            barrel_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/member/report/barrel_report.js"),function (e) {_this.clicked = false});
            },
            money_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/deposit/deposit.js"),function (e) {_this.clicked = false});
            },
            arrears_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/member/report/arrears_report.js"),function (e) {_this.clicked = false});
            },
//            下拉刷新
            onrefresh (event) {
                var _this = this;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout:false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout:false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.permissions()
                }, 1000)
            },
            goback: function (e) {
                event.closeURL();
            },
        }

    }
</script>