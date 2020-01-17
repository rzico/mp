<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" > </navbar>
        <div class="bkg-primary" style="position: relative">
            <text class="shopName">{{today.shortName}}</text>
            <div style="height: 200px"></div> <!--增高dom-->
            <div class="transition transitionEEE"></div><!--过渡色-->
            <div class="todayBox" @click="day_report()">
                <div class="todayHeaderBox">
                    <div class="flex-row">
                        <text class="fz40 primary" :style="{fontFamily:'iconfont'}">&#xe66d;</text>
                        <text class="ml10 fz35">营业日报</text>
                    </div>
                    <div class="flex-row">
                        <text class="fz28 gray">详情</text>
                        <text class="fz28 gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="todayContentBox">
                    <div class="todayContent">
                        <text class="fz32">今日销售</text>
                        <div class="flex-end mt10">
                            <text class="fz28" style="margin-top: 5px">¥</text>
                            <text class="fz40">{{today.saleAmount | currencyfmt}}</text>
                        </div>
                    </div>
                    <div class="todayContent">
                        <text class="fz32">今日订单</text>
                        <div class="flex-end mt10">
                            <text class="fz40">{{today.count}}</text>
                            <text class="fz28"  style="margin-top: 3px">笔</text>
                        </div>
                    </div>
                    <div class="todayContent">
                        <text class="fz32">今日收款</text>
                        <div class="flex-end mt10">
                            <text class="fz28"  style="margin-top: 5px">¥</text>
                            <text class="fz40">{{today.amount | currencyfmt}}</text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="menubox">
                <div class="menu" @click="order_report()" >
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe695;</text>
                    <text class="menuBtn">订单统计</text>
                </div>
                <div class="menu" @click="payment_report()" >
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe6d6;</text>
                    <text class="menuBtn">收款统计</text>
                </div>
                <div class="menu" @click="contacts_report()">
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe690;</text>
                    <text class="menuBtn">配送结算</text>
                </div>
                <div class="menu" @click="sendSingle_report()">
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe68f;</text>
                    <text class="menuBtn">派单结算</text>
                </div>
                <div class="menu" @click="barrel_report()">
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe691;</text>
                    <text class="menuBtn">空桶结算</text>
                </div>
                <!--<div class="menu" @click="money_report()">-->
                    <!--<text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe67a;</text>-->
                    <!--<text class="menuBtn">收银统计</text>-->
                <!--</div>-->
                <div class="menu" @click="arrears_report()">
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe693;</text>
                    <text class="menuBtn">欠款统计</text>
                </div>
                <div class="menu" @click="refund_report()">
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe69a;</text>
                    <text class="menuBtn">退货统计</text>
                </div>
                <div class="menu" @click="shipping_report()">
                    <text class="menuIco" :style="{fontFamily:'iconfont'}">&#xe69b;</text>
                    <text class="menuBtn">送货统计</text>
                </div>
            </div>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .shopName{
        font-size: 40px;
        color: #fff;
        margin-left: 20px;
        line-height: 60px;
        min-height: 60px;
    }
    .transition{
        width: 750px;
        height: 100px;
    }
    .todayBox{
        width: 690px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 15px;
        background-color: #ffffff;
        position: absolute;
        bottom: 0;
        left: 30px;
    }
    .todayHeaderBox{
        width: 650px;
        height: 90px;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .todayContentBox{
        width: 650px;
        margin-top: 40px;
        flex-direction: row;
        align-items: center;
    }
    .todayContent{
        width: 216px;
        height: 150px;
        flex-direction: column;
        align-items: center;
    }

    .menuIco {
        font-size: 52px;
        color: #333;
    }

    .menuBtn {
        margin-top: 10px;
        font-size: 32px;
        color:#666;
    }

    .menubox {
        margin-top: 40px;
        flex-direction: row;
        flex-wrap: wrap;
        width:690px;
        margin-left: 30px;
        border:1px;
        border-radius: 10px;
        background-color: #fff;
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
                shopId:"",
                amount:"",
                timer:null,
                time:30,
                isScan:false,
                isSubmit:false,
                plugId:"",
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
                today:{}
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
            this.getToday()
            utils.getToken(function (mes) {
                _this.roles = mes.roles;
            });//获取权限
        },
        methods: {
            getToday(){
                let _this = this;
                GET("weex/member/report/summary_view.jhtml?beginDate="+utils.ymdtimefmt(Date.parse(new Date()))+"&endDate="+utils.ymdtimefmt(Date.parse(new Date())),function (res) {
                    if (res.type == 'success') {
                        _this.today =  res.data;
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
            order_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/order_report.js"),function (e) {_this.clicked =false});
            },
            payment_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/payment_report.js"),function (mes) {
                    _this.clicked =false
                });
            },
            contacts_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/contacts_report.js"),function (e) {_this.clicked = false});
            },
            sendSingle_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/sendSingle_report.js"),function (e) {_this.clicked = false});
            },
            barrel_report:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/barrel_report.js"),function (e) {_this.clicked = false});
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
                event.openURL(utils.locate("view/shop/report/arrears_report.js"),function (e) {_this.clicked = false});
            },
            refund_report(){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/refund_report.js"),function (e) {_this.clicked = false});
            },
            shipping_report(){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/shipping_report.js"),function (e) {_this.clicked = false});
            },
            business_report(){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/business_report.js"),function (e) {_this.clicked = false});
            },
            day_report(){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/report/day_report.js"),function (e) {_this.clicked = false});
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
                }, 1000)
            },
            goback: function (e) {
                event.closeURL();
            },
        }

    }
</script>