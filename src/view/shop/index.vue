<template>
    <div class="wrapper">
        <div class="navbar bkg-primary" :class="[classHeader()]">
            <!--<div class="navBack" @click="goback()">-->
                <!--<text class="navIco" :style="{fontFamily:'iconfont'}">&#xe669;</text>-->
            <!--</div>-->
            <text class="nav_title">{{today.shortName}}</text>
            <div class="navRightBox" @click="showPop()">
                <text class="nav_CompleteIcon" :style="{fontFamily:'iconfont'}">&#xe72b;</text>
            </div>
        </div>
        <scroller show-scrollbar="false" class="scroller" v-if="status == 1">
            <refresh class="refreshBox" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg"></image>
            </refresh>
            <div class="bkg-primary" style="position: relative">
                <div class="mainCell">
                    <div class="mainBox" @click="goWallet">
                        <text class="headerBoxIcon" :style="{fontFamily:'iconfont'}">&#xe683;</text>
                        <text class="headerBoxText">钱包</text>
                    </div>
                    <div class="mainBox" @click="showQrcode">
                        <text class="headerBoxIcon" :style="{fontFamily:'iconfont'}">&#xe675;</text>
                        <text class="headerBoxText">推广码</text>
                    </div>
                    <div class="mainBox" @click="linkToPayment">
                        <text class="headerBoxIcon" :style="{fontFamily:'iconfont'}">&#xe673;</text>
                        <text class="headerBoxText">收款码</text>
                    </div>
                    <div class="mainBox" @click="linkToFill" v-if="version == 1 ">
                        <text class="headerBoxIcon" :style="{fontFamily:'iconfont'}">&#xe6e8;</text>
                        <text class="headerBoxText">报单</text>
                    </div>
                    <div class="mainBox" @click="scan" v-if="version != 1 ">
                        <text class="headerBoxIcon" :style="{fontFamily:'iconfont'}">&#xe607;</text>
                        <text class="headerBoxText">扫一扫</text>
                    </div>
                </div>
                <div style="height: 130px"></div> <!--增高dom-->
                <div class="transition transitionEEE"></div><!--过渡色-->
                <div class="payBillBox" >
                    <div class="dayPayBox" @click="linkPaymentBill">
                        <text class="dayPay">今日收款(元)</text>
                        <div style="flex-direction: row;align-items: flex-end;margin-top: 10px">
                            <text class="dayPayIcon">¥</text>
                            <text class="dayPayAmount">{{today.amount | currencyfmt}}</text>
                        </div>
                        <text class="dayMes">查看账单</text>
                    </div>
                    <div class="yesPayBox" @click="order()">
                        <text class="dayPay">今日收单(笔)</text>
                        <div style="flex-direction: row;align-items: flex-end;margin-top: 10px">
                            <text class="dayPayAmount">{{today.count}}</text>
                        </div>
                        <text class="dayMes">查看订单</text>
                    </div>
                </div>
            </div>
                <div class="menuCell">
                    <div class="menu" @click="order()" v-if="filter('order')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe665;</text>
                        <text class="menuName">订单</text>
                    </div>
                    <div class="menu" @click="goShipping()" v-if="filter('shipping') && version == 1">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe66e;</text>
                        <text class="menuName">运单</text>
                    </div>
                    <div class="menu" @click="goods()" v-if="filter('manage')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe667;</text>
                        <text class="menuName">商品</text>
                    </div>
                    <div class="menu" @click="gocard()" v-if="filter('card')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe66a;</text>
                        <text class="menuName">会员</text>
                    </div>
                    <div class="menu" @click="gocoupon()" v-if="filter('coupon')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe7fc;</text>
                        <text class="menuName">优惠券</text>
                    </div>
                    <div class="menu" @click="linkShop()" v-if="filter('shop')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe66d;</text>
                        <text class="menuName">店铺</text>
                    </div>
                    <div class="menu" @click="employee()" v-if="filter('employee')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe66c;</text>
                        <text class="menuName">员工</text>
                    </div>
                    <div class="menu" @click="deposit()" v-if="filter('money')">
                        <text class="menuIco"  :style="{fontFamily:'iconfont'}">&#xe6e8;</text>
                        <text class="menuName">统计</text>
                    </div>
                </div>

            <!-- 我的订单 -->
            <div><!-- dom预留节点 -->
                <div class="contentBox" v-if="conutTotal != 0 && filter('order')">
                    <div class="boder-bottom pl20 pr20 space-between headTitle" @click="order()">
                        <text class="fz30">我的订单</text>
                        <div class="flex-row">
                            <text class="iconfontText" style="padding-right: 10px;">查看所有</text>
                            <text :style="{fontFamily:'iconfont'}" class="iconfontText">&#xe630;</text>
                        </div>
                    </div>
                    <!-- 订单消息 -->
                    <div class="comWrap">
                        <div class=" flexCol iconBox" @click="goNoPay()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe683;</text>
                            <text class="iconfontText ">待付款</text>
                            <div class="shippingNumberBox" v-if="conut.unpaid != 0">
                                <text class="shippingNumber">{{conut.unpaid}}</text>
                            </div>
                        </div>
                        <div class=" flexCol iconBox" @click="goNoDelivery()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe685;</text>
                            <text class="iconfontText ">待发货</text>
                            <div class="shippingNumberBox" v-if="conut.unshipped != 0">
                                <text class="shippingNumber">{{conut.unshipped}}</text>
                            </div>
                        </div>
                        <div class=" flexCol iconBox" @click="goDelivery()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe688;</text>
                            <text class="iconfontText ">已发货</text>
                            <div class="shippingNumberBox" v-if="conut.shipped != 0">
                                <text class="shippingNumber">{{conut.shipped}}</text>
                            </div>
                        </div>
                        <div class=" flexCol iconBox" @click="goRefund()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe68d;</text>
                            <text class="iconfontText ">待退款</text>
                            <div class="shippingNumberBox" v-if="conut.refund != 0">
                                <text class="shippingNumber">{{conut.refund}}</text>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 我的运单 -->
                <div class="contentBox" v-if="shippingConutTotal != 0 && filter('shipping') && version == 1 ">
                    <div class="boder-bottom pl20 pr20 space-between headTitle" @click="goShipping()">
                        <text class="fz30">我的运单</text>
                        <div class="flex-row">
                            <text class="iconfontText" style="padding-right: 10px;">查看所有</text>
                            <text :style="{fontFamily:'iconfont'}" class="iconfontText">&#xe630;</text>
                        </div>
                    </div>
                    <!-- 订单消息 -->
                    <div class="comWrap">
                        <div class=" flexCol iconBox" @click="goConfirm()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe68b;</text>
                            <text class="iconfontText ">待确认</text>
                            <div class="shippingNumberBox" v-if="shippingConut.unconfirmed != 0">
                                <text class="shippingNumber">{{shippingConut.unconfirmed}}</text>
                            </div>
                        </div>
                        <div class=" flexCol iconBox" @click="goOnTheWay()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe690;</text>
                            <text class="iconfontText ">配送中</text>
                            <div class="shippingNumberBox" v-if="shippingConut.confirmed != 0">
                                <text class="shippingNumber">{{shippingConut.confirmed}}</text>
                            </div>
                        </div>
                        <div class=" flexCol iconBox" @click="goaArive()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe682;</text>
                            <text class="iconfontText ">已送达</text>
                            <div class="shippingNumberBox" v-if="shippingConut.completed != 0">
                                <text class="shippingNumber">{{shippingConut.completed}}</text>
                            </div>
                        </div>
                        <div class=" flexCol iconBox" @click="goToCompleted()">
                            <text :style="{fontFamily:'iconfont'}" class="iconfontSize ">&#xe686;</text>
                            <text class="iconfontText ">已核销</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mesBox">
                <div class="menu" v-if="filter('paused')">
                    <switch :checked="hasPaused" @change="paused"></switch>
                    <text class="menuName">{{hasPaused ? '正常营业' : '暂停营业'}}</text>
                </div>
                <div class="flex-row">
                    <text class="mes">———</text>
                    <text class="mes ml20 mr20">芸店提供技术支持</text>
                    <text class="mes">———</text>
                </div>
            </div>
        </scroller>

        <div class="popupBox" v-if="status == 2">
            <div class="menuTwo" @click="goShop()" v-if="filter('openShop')">
                <text :style="{fontFamily:'iconfont'}" class="shopCssOne">&#xe662;</text>
                <text class="menuBtn">我要开店</text>
            </div>
            <div class="menuTwo" @click="activated()" v-if="filter('activedShop') && shopData.fee >0">
                <text :style="{fontFamily:'iconfont'}" class="shopCssTwo">&#xe6ce;</text>
                <text class="menuBtn">激活店铺</text>
            </div>
            <div class="menuTwo" @click="activated()" v-if="filter('activedShop') && shopData.fee ==0">
                <text :style="{fontFamily:'iconfont'}" class="shopCssTwo">&#xe6ce;</text>
                <text class="menuBtn">审核中...</text>
            </div>
            <div class="content">
                <text class="mesToast">1.点击我要开店,填写店铺资料并上传相关证件,请在店内操作确保位置准确。</text>
                <div class="flex-row" style="flex-wrap:wrap">
                    <text class="mesToast">2.点击缴活店铺，并支付技术服务费</text>
                </div>
                <text class="mesToast">3.下载专属二维码，开启新零售服务体验。</text>
            </div>
        </div>
        <payment ref="payment" @notify="notify"></payment>
        <qrcode ref="qrcode"></qrcode>
        <wxc-popover ref="wxc-popover"
                     :buttons="btns"
                     :position="popoverPosition"
                     :arrowPosition="popoverArrowPosition"
                     @wxcPopoverButtonClicked="popoverButtonClicked"></wxc-popover>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .header {
        flex-direction: column;
        position: sticky;
    }

    .navbar {
        width: 750px;
        height: 136px;
        padding-top: 44px;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .navIco {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }

    .navBack {
        flex-direction: row;
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
    }

    .shopLogo {
        width: 60px;
        height: 60px;
        border-width: 3px;
        border-color: #ffffff;
        border-radius: 100%;
        background-color: #eeeeee;
    }

    .shopName {
        font-size: 38px;
        color: #ffffff;
        margin-left: 25px;
    }

    .navRightBox {
        flex-direction: row;
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
    }

    .nav_CompleteIcon {
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
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
        color: #333;
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
    .dayPayQuantity {
        font-size: 32px;
        color: #ffffff;
        margin-left: 15px;
        margin-bottom: 5px;
    }

    .yesterday {
        font-size: 27px;
        color: #fff;
        margin-top: 20px;
        font-weight: 300;
    }

    .menuCell {
        width: 750px;
        /*background-color: #fff;*/
        /*min-height: 180px;*/
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
    }

    .menu {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 187px;
        height: 155px;
    }

    .menuIco {
        font-size: 52px;
        color: #333;
    }

    .menuName {
        font-size: 26px;
        color: #444;
        margin-top: 10px;
    }

    .popupBox{
        width: 710px;
        height: 800px;
        margin-left: 20px;
        margin-top: 150px;
        border-radius: 20px;
        background-color: #ffffff;
        flex-direction: column;
        align-items: center;
    }
    .menuTwo{
        margin-top: 100px;
        flex-direction: column;
        align-items: center;
    }

    .shopCssOne {
        color: #66ccff;
        font-size: 120px;
    }

    .shopCssTwo {
        color: #B72A65;
        font-size: 120px;
    }

    .headerBoxIcon {
        font-size: 52px;
        color: #fff;
    }

    .headerBoxText {
        font-size: 28px;
        color: #fff;
        margin-top: 10px;
    }

    .contentBox {
        width: 710px;
        margin-top: 20px;
        margin-left: 20px;
        background-color: white;
        border-radius: 20px;
    }

    .headTitle {
        height: 80px;
        line-height: 80px;
        position: relative;
    }

    .iconfontSize {
        font-size: 60px;
        color: #333;
    }

    .iconfontText {
        font-size: 26px;
        line-height: 40px;
        color: #444;
    }

    .comWrap {
        width: 710px;
        padding: 20px;
        border-radius: 20px;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .flexCol {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 140px;
    }

    .iconBox {
        width: 162.5px;
    }

    .shippingNumberBox {
        padding-top: 3px;
        min-height: 35px;
        min-width: 35px;
        border-radius: 100%;
        background-color: red;
        position: absolute;
        top: 0;
        right: 40px;
        align-items: center;
        justify-content: center;
    }

    .shippingNumber {
        font-size: 26px;
        line-height: 26px;
        color: #fff;
    }

    .mesToast {
        color: #999;
        font-size: 30px;
        line-height: 42px;
        margin-top: 10px;
    }

    .wallet-title {
        width: 620px;
        margin-top: 10px;
        font-size: 32px;
        color: #fff;
        margin-left: 40px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }

    .mainCell {
        width: 750px;
        padding-top: 20px;
        padding-bottom: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .mainBox {
        width: 187px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .transition{
        width: 750px;
        height: 100px;
    }

    .balance {
        margin-top: 30px;
        font-size: 120px;
        color: #fff;
        margin-left: 40px;
    }

    .exit {
        position: absolute;
        right: 0px;
        top: 44px;
        color: #fff;
        font-size: 48px;
        width: 80px;
        height: 80px;
        line-height: 80px;
    }

    .fontInput {
        border-style: solid;
        border-width: 1px;
        border-color: #CCC;
        border-radius: 5px;
        padding-left: 20px;
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 10px;
        flex-direction: row;
        align-items: center;
        height: 120px;
    }

    .iconFont {
        margin-top: 10px;
        font-size: 80px;
    }

    .input {
        margin-left: 10px;
        width: 500px;
        height: 100px;
        font-size: 50px;
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
        flex: 1;
        padding-left: 40px;
        border-radius: 12px;
        border-width: 1px;
        border-color: #ccc;
        background-color: #eee;
    }

    .btn-text {
        margin-left: 10px;
        font-size: 32px;
        color: #666;
    }

    .menuBtn {
        margin-top: 10px;
        font-size: 32px;
        color: #666;
    }

    .btn:active {
        background-color: #ccc;
    }

    .weixin {
        color: limegreen;
        margin-top: 4px;
    }

    .alipay {
        color: #0088fb;
        margin-top: 4px;
    }

    .card {
        color: red;
        margin-top: 3px;
    }

    .wallet {
        margin-top: 4px;
    }

    .cash {
        color: #F0AD3C;
        margin-top: 3px;
    }

    .bank {
        margin-top: 4px;
        color: tomato;
    }

    .content {
        width: 690px;
        padding-left: 30px;
        margin-top: 100px;
    }

    .waiting {
        position: fixed;
        flex-direction: column;
        left: 125px;
        top: 420px;
        width: 500px;
        background-color: navajowhite;
        border: 1px;
        border-color: #eee;
        border-radius: 10px;
        padding-bottom: 35px;
        padding-top: 20px;
        justify-content: center;
        align-items: center;
        height: 300px;
    }

    .paymenting {
        justify-content: center;
        font-size: 32px;
        margin-top: 10px;
    }

    .close {
        position: absolute;
        width: 60px;
        height: 60px;
        right: 0px;
        top: 10px;
        flex-direction: column;
        justify-content: center;
    }

    .close_button {
        font-size: 48px;
        color: #ccc
    }

    .mesBox {
        width: 750px;
        flex-direction: column;
        align-items: center;
        margin-top: 250px;
        margin-bottom: 30px;
    }

    .mes {
        font-size: 26px;
        color: #999;
    }
</style>
<script>
    const storage = weex.requireModule('storage');
    import qrcode from '../../include/qrcode.vue';
    import {POST, GET, SCAN} from '../../assets/fetch'
    import utils from '../../assets/utils'
    import filters from '../../filters/filters.js'
    import {dom, event, animation} from '../../weex.js';
    import { WxcPopover} from 'weex-ui';
    const modal = weex.requireModule('modal');
    const printer = weex.requireModule('print');
    var globalEvent = weex.requireModule('globalEvent');
    var amap = weex.requireModule('map');
    import payment from '../../include/payment.vue'

    export default {
        data() {
            return {
                roles: "",
                refreshing: false,
                id: 0,
                sn: "",
                step: "",
                shopData:{},
                shopId: "",
                amount: "",
                timer: null,
                time: 30,
                isScan: false,
                isSubmit: false,
                plugId: "",
                refreshImg: utils.locate('resources/images/loading.png'),
                clicked: false,
                conut: [],
                shippingConut: [],
                conutTotal: 0,
                shippingConutTotal: 0,
                inputShow: false,
                hasPaused: false,
                status:0,
                today:{},
                version:1,
                btns:[
                    {
                        icon: 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/scan.png',
                        text:'扫一扫',
                        key:'scan'
                    },
                    {
                        icon: 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/gonggao.png',
                        text:'发公告',
                        key:'ad'
                    },
                    {
                        icon: 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/setting.png',
                        text:'设置',
                        key:'setting'
                    },
                ],
                popoverPosition:{x:-13,y:136},
                popoverArrowPosition:{pos:'top',x:-17},
            }
        },
        components: {
            qrcode, payment,WxcPopover
        },
        props: {
            title: {default: "收银台"}
        },
        beforeDestory() {

        },
        created() {
            var _this = this;
            utils.initIconFont();
            this.popoverPosition.y = utils.getHeaderHeight();
            this.view();
            this.getToday();
            this.permissions();//获取权限存入缓存
//            监听账单消息提醒.
            globalEvent.addEventListener("onMessage", function (e) {
                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10200') {
//                   获取订单数量
                    _this.getCount();
                }
                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10213') {
//                   获取运单数量
                    _this.getShippingConut();
                }
                if (e.data.data.id == 'gm_10212' || e.data.data.id == 'gm_10200') {
                    _this.getToday();
                }
            });
            //            监听登陆成功.
            globalEvent.addEventListener("login", function (e) {
                _this.permissions();//获取权限存入缓存
                _this.conut = [];
                _this.shippingConut = [];
                _this.conutTotal = 0;
                _this.shippingConutTotal = 0;
                _this.shopData = {};
                _this.shopId = "";
                _this.view();
                _this.getToday();
            });
            //            监听注销.
            globalEvent.addEventListener("logout", function (e) {
                _this.conut = [];
                _this.shippingConut = [];
                _this.conutTotal = 0;
                _this.shippingConutTotal = 0;
                _this.shopData = {};
                _this.shopId = "";
            });
            //监听最小化app后打开app
            globalEvent.addEventListener("WXApplicationDidBecomeActiveEvent", function (e) {
                _this.getToday();
            });
        },
        methods: {
            showPop(){
                this.$refs['wxc-popover'].wxcPopoverShow();
            },
            popoverButtonClicked (obj) {
                var _this = this;
                if (obj.key == 'scan') {
                    this.scan()
                } else if (obj.key == 'ad') {
                    this.linkToAd()
                }else if (obj.key == 'setting') {
                    this.godistribution()
                }
            },
            //今日收款
            getToday(){
              let _this = this;
              GET("weex/member/payment/summary_count.jhtml?beginDate="+utils.ymdtimefmt(Date.parse(new Date()))+"&endDate="+utils.ymdtimefmt(Date.parse(new Date())),function (res) {
                  if (res.type == 'success') {
                     _this.today =  res.data;
                  } else {
                      event.toast(res.content);
                  }
              }, function (err) {
                  event.toast(err.content);
              })
            },
            //            获取权限
            permissions: function () {
                var _this = this;
                POST("weex/member/access_token.jhtml").then(function (mes) {
                    if (mes.type == "success") {
                        var roles = JSON.stringify(mes.data);
                        storage.setItem('token', roles, e => {
                        })
                        _this.roles = mes.data.roles;
                        _this.version = mes.data.version;
                        if(_this.version != 1){
                            _this.btns = [
                                {
                                    icon: 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/gonggao.png',
                                    text:'发公告',
                                    key:'ad'
                                },
                                {
                                    icon: 'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/setting.png',
                                    text:'设置',
                                    key:'setting'
                                },
                            ]
                        }
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                });
            },
            openWebView(data) {
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate("view/webView/index.js?url=" + encodeURIComponent(data)), function () {

                });
            },
            // 钱包
            goWallet() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/member/wallet/index.js'), function(data) {});
            },
            linkToPayment(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)

                if(this.shopData.scanPay && this.shopData.isUpload){
                    event.openURL(utils.locate("view/shop/payment/code.js"), function (e) {

                    });
                }else if(!this.shopData.scanPay && this.shopData.isUpload){
                    event.openURL(utils.locate("view/shop/payment/status.js?status=1"), function (e) {

                    });
                }else if(this.shopData.scanPay && !this.shopData.isUpload){
                    event.openURL(utils.locate("view/shop/payment/status.js"), function (e) {

                    });
                }else if(!this.shopData.scanPay && !this.shopData.isUpload){
                    event.openURL(utils.locate("view/shop/payment/status.js"), function (e) {

                    });
                }

            },
            linkPaymentBill(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate("view/shop/payment/bill.js"), function (e) {

                });
            },
            linkToFill() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("12", _this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/order/fill.js"), function (e) {
                    _this.getCount()
                });
            },
//            调自身二维码
            showQrcode: function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (utils.isNull(_this.shopId)) {
                    _this.view()
                    if (utils.isNull(_this.shopId)) {
                        modal.alert({
                            message: '无店铺授权',
                            okTitle: 'OK'
                        })
                        return

                    }
                }
                event.openURL(utils.locate('view/shop/card/add.js'), function (data) {

                    }
                );
            },
//            扫会员提货
            scanMember(id) {
                event.openURL(utils.locate('view/shipping/list/view.js?productCategoryId=3&index=2&memberId=' + id), function (message) {

                })
            },

//            扫码搜索会员
            scanFindCard(code) {
                GET('weex/member/card/infobycode.jhtml?code=' + code, function (mes) {
                    if (mes.type == 'success') {
                        var id = mes.data.card.id;
                        event.openURL(utils.locate('view/shop/card/view.js?id=' + id), function (message) {

                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            扫码核销优惠券
            scanCoupon(code, captcha) {
                GET('weex/member/couponCode/use.jhtml?code=' + code + '&captcha=' + captcha, function (mes) {
                    if (mes.type == 'success') {
                        modal.alert({
                            message: mes.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            扫码抢单
            scanRob(sn) {
                let _this = this
                POST('weex/member/order/scanDispatch.jhtml?sn=' + sn).then(function (mes) {
                    if (mes.type == 'success') {
                        modal.alert({
                            message: mes.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            扫码接单
            scanSend(sn) {
                let _this = this
                POST('weex/member/shipping/scanDispatch.jhtml?sn=' + sn).then(function (mes) {
                    if (mes.type == 'success') {
                        modal.alert({
                            message: mes.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })

            },

            //            订水二维码
            bindQrcode(code) {
                let _this = this
                POST('weex/member/shop/bindQrcode.jhtml?code=' + code).then(function (mes) {
                    if (mes.type == 'success') {
                        modal.alert({
                            message: mes.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })

            },
            bindCode(code) {
                POST('weex/member/scan_order/bindScan.jhtml?code=' + encodeURIComponent(code)).then(function (res) {
                    if (res.type == 'success') {
                        modal.alert({
                            message: res.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //绑定通联二维码
            bindPayCode(code) {
                POST('weex/member/payment/bindAllin.jhtml?q=' + encodeURIComponent(code)).then(function (res) {
                    if (res.type == 'success') {
                        modal.alert({
                            message: res.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //绑定收款二维码
            bindPay(code) {
                POST('weex/member/payment/bindIPay.jhtml?q=' + encodeURIComponent(code)).then(function (res) {
                    if (res.type == 'success') {
                        modal.alert({
                            message: res.content,
                            okTitle: 'OK'
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },


//            触发二维码方法
            scan: function () {
                let _this = this
                event.scan(function (message) {
                    if (!utils.isNull(message.data)) {
                        // message.data = JSON.stringify(message.data);
                        if (message.data == '{}') {
                            return
                        }
                        if(message.data.indexOf('syb.allinpay.com') > -1){
                            _this.bindPayCode(message.data);
                            return
                        }
                        utils.readScan(message.data, function (data) {
                            if (data.type == 'error') {
                                event.toast(data.content);
                                return;
                            }
                            if (data.data.type == '818820') {
                                _this.bindCode(message.data)
                            }else if (data.data.type == '818804') {
                                _this.bindPay(message.data)
                            }else {
                                GET('/q/scan.jhtml?code=' + encodeURIComponent(message.data), function (res) {
                                    if (res.type == "success") {
                                        if (res.data.type == '818801' || res.data.type == '818802') {
                                            _this.scanFindCard(res.data.code)
                                        } else if (res.data.type == '818803') {
                                            _this.scanCoupon(res.data.code, res.data.captcha)
                                        } else if (res.data.type == '818806') {
                                            _this.scanRob(res.data.sn)
                                        } else if (res.data.type == '818807') {
                                            _this.scanSend(res.data.sn)
                                        } else if (res.data.type == '818810') {
                                            _this.bindQrcode(res.data.code)
                                        } else if (res.data.type == '865380') {
                                            _this.scanMember(res.data.id)
                                        }
                                    } else {
                                        event.toast(res.content);
                                    }

                                }, function (err) {
                                    event.toast(err.content);
                                })
                            }
                        });

                    }
                });
            },
//            //            获取经纬度
//            getGps:function(){
//
//                let _this = this
//                var uId = event.getUId();
//                event.getLocation(function (data) {
//                    if(data.type == 'success'){
//                        POST("/lbs/location.jhtml?lng=" + data.data.lng + "&lat=" +data.data.lat +'&memberId=' + uId).then(function (mes) {
//                            if (mes.type == 'success') {
//
//                            } else {
//                                event.toast(mes.content);
//                            }
//                        }, function (err) {
//                            event.toast(err.content)
//                        })
//                    }else {
//                        event.toast('定位失败，请开启GPS')
//                    }
//                })
//            },
            //            获取订单数量
            getCount() {
                var _this = this
                POST('weex/member/order/count.jhtml').then(function (res) {
                    if (res.type == "success") {
                        _this.conut = res.data;
                        _this.conutTotal = res.data.unpaid + res.data.unshipped + res.data.shipped + res.data.refund
                    } else {
                        event.toast(res.content);
                    }

                }, function (err) {
                    event.toast(err.content);
                })
            },
            //            获取运单数量
            getShippingConut() {
                var _this = this
                POST('weex/member/shipping/count.jhtml').then(function (res) {
                    if (res.type == "success") {
                        _this.shippingConut = res.data;
                        _this.shippingConutTotal = res.data.unconfirmed + res.data.hope + res.data.confirmed + res.data.completed
                    } else {
                        event.toast(res.content);
                    }

                }, function (err) {
                    event.toast(err.content);
                })
            },
            //            待确认
            goConfirm() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/shipping/list.js?index=0&productCategoryId=1'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            已核销
            goToCompleted() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/shipping/list.js?index=3&productCategoryId=4'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            配送中
            goOnTheWay() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/shipping/list.js?index=1&productCategoryId=2'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            已送达
            goaArive() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/shipping/list.js?index=2&productCategoryId=3'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            待付款
            goNoPay() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/order/list.js?index=0&productCategoryId=1'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            待发货
            goNoDelivery() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/order/list.js?index=1&productCategoryId=2'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            已发货
            goDelivery() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/order/list.js?index=2&productCategoryId=3'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            待退款
            goRefund() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate('view/shop/order/list.js?index=3&productCategoryId=4'), function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            我要开店
            goShop: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                    event.openURL(utils.locate('view/shop/bank/bind.js'), function (mes) {
                        if (mes.type == "success") {
                            event.openURL(utils.locate('view/shop/shop/newShop.js'), function (res) {
                                _this.view()
                            })
                        }
                    })
            },
            //            激活店铺
            activated() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                POST('weex/member/topic/activate.jhtml').then(
                    function (mes) {
                        if (mes.type == "success") {
                            if (utils.isNull(mes.data)) {
                                _this.view();
                            } else {
                                _this.$refs.payment.show(mes.data);
                            }
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    }
                )

            },
            //            权限过滤器
            filter(e) {
                var _this = this;
                if (e == 'openShop') {
//                    开店
                    if (utils.isNull(_this.shopId) || _this.shopId == 0) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'activedShop') {
//                    激活
                    if (!utils.isNull(_this.shopId) && _this.shopId != 0 && _this.shopData.status != 'success') {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'order') {
//                    订单
                    if (utils.isRoles("12", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'shipping') {
//                    运单
                    if (utils.isRoles("123", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'card') {
//                    会员卡
                    if (!utils.isNull(_this.shopId)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'coupon') {
//                    优惠券
                    if (utils.isRoles("1", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'manage') {
//                    商品
                    if (utils.isRoles("1", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'shop') {
//                    店铺
                    if (utils.isRoles("1", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'employee') {
//                    员工
                    if (utils.isRoles("1", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'money') {
//                    报表
                    if (utils.isRoles("1", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'paused') {
//                    暂停营业
                    if (utils.isRoles("1", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            },

            employee: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("1", _this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/admin/list.js"), function (e) {
                    _this.clicked = false
                });
            },
            linkShop: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("1", _this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/shop/storeList.js"), function (mes) {
                    if (mes.type == 'success' && mes.data == '') {
                        event.closeURL(mes)
                    }
                    _this.clicked = false
                });
            },
            gocard: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/card/list.js"), function (e) {
                });
            },
            gocoupon: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/coupon/list.js"), function (e) {
                });
            },
            paused() {
                let _this = this;
                if (!utils.isRoles("1", _this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                } else {
                    POST("weex/member/enterprise/paused.jhtml").then(
                        function (data) {
                            if (data.type == 'success') {
                                _this.view()
                            } else {
                                modal.alert({
                                    message: data.content,
                                    okTitle: '知道了'
                                })
                                _this.view()
                            }
                        }, function (err) {
                            event.toast(err.content);
                            _this.view()
                        }
                    )
                }
            },
            linkToAd:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                if (!utils.isRoles("12", _this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/ad/index.js"),function (e) {});
            },
            godistribution:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                if (!utils.isRoles("1", _this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/goods/distribution.js"),function (e) {});
            },
            goods: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("1", _this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/goods/manage.js"), function (e) {
                });
            },
            order: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("12", _this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/order/list.js"), function (e) {
                    _this.getCount()
                    _this.getShippingConut();
                });
            },
            hasShop: function () {
                let _this = this
                if (utils.isRoles("1", _this.roles) && !utils.isNull(_this.shopId) && _this.shopId > 0) {
                    return true
                } else {
                    return false
                }
            },
            classHeader: function () {
                return utils.device();
            },
//            下拉刷新
            onrefresh(event) {
                var _this = this;
                this.refreshing = true;
                animation.transition(_this.$refs.refreshImg, {
                    styles: {
                        transform: 'rotate(360deg)',
                    },
                    duration: 1000, //ms
                    timingFunction: 'linear',//350 duration配合这个效果目前较好
                    needLayout: false,
                    delay: 0 //ms
                })
                setTimeout(() => {
                    animation.transition(_this.$refs.refreshImg, {
                        styles: {
                            transform: 'rotate(0)',
                        },
                        duration: 10, //ms
                        timingFunction: 'linear',//350 duration配合这个效果目前较好
                        needLayout: false,
                        delay: 0 //ms
                    })
                    this.refreshing = false
                    _this.view();
                }, 1000)
            },
            view: function () {
                var _this = this;
                GET("weex/member/shop/status.jhtml", function (res) {
                    if (res.type == "success") {
                        _this.shopData = res.data;
                        _this.shopId = res.data.shopId;
                        _this.hasPaused = !res.data.paused;
                        if (res.data.status == 'success') {
                            _this.status = 1;
//                           获取订单数量
                            _this.getCount();
//                           获取运单数量
                            _this.getShippingConut();
                            if (res.data.expire < 7 && res.data.expire > 0) {
                                modal.confirm({
                                    message: '您的店铺将于' + res.data.expire + '天后到期',
                                    duration: 0.3,
                                    okTitle: '立即缴费',
                                    cancelTitle: '暂不缴费'
                                }, function (value) {
                                    if (value == '立即缴费') {
                                        _this.activated()
                                    }
                                })
                            }
                        }else {
                            _this.status = 2;
                        }
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                });
            },
            goback: function (e) {
                event.closeURL();
            },
            goShipping: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("123", _this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }
                event.openURL(utils.locate("view/shop/shipping/list.js"), function (e) {
                    _this.getCount()
                    _this.getShippingConut();
                });
            },
            deposit: function () {
                if (this.clicked == true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                if (!utils.isRoles("1", _this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    return
                }
                event.openURL(utils.locate("view/shop/report/index.js"), function (e) {
                    _this.clicked = false
                });
            },
        }

    }
</script>
