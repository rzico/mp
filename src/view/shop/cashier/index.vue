<template>
    <div class="wrapper">
        <div class="wallet-panel bkg-primary" :style="objHeader()">
            <div class="flex-column" @click="scan()">
                <text class="headerIcon" :style="{fontFamily:'iconfont'}" >&#xe607;</text>
                <text class="headerText mt20">扫一扫</text>
            </div>
            <div class="flex-column" @click="contolInput">
                <text class="headerIcon" :style="{fontFamily:'iconfont'}" >&#xe673;</text>
                <text class="headerText mt20">收银</text>
            </div>
            <div class="flex-column" @click="showQrcode">
                <text class="headerIcon" :style="{fontFamily:'iconfont'}" >&#xe675;</text>
                <text class="headerText mt20">推广码</text>
            </div>
        </div>
        <scroller class="scroller">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <div class="fontInput" v-if="hasShop()">
                <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                <input class="input" type="number" placeholder="请输入消费金额" maxlength="7" v-model="amount" />
                <text class="ico clear" :style="{fontFamily:'iconfont'}" @click="clearTimer()">&#xe60a;</text>
            </div>
            <div class="buttombox"  v-if="hasInput()">
                <div class="btn "  @click="payment('aliPayPlugin')">
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
            <!-- 我的订单 -->
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
                    <div class=" flexCol iconBox"  @click="goNoPay()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe6e2;</text>
                        <text class="iconfontText ">待付款</text>
                        <div class="shippingNumberBox"  v-if="conut.unpaid != 0">
                            <text class="shippingNumber">{{conut.unpaid}}</text>
                        </div>
                    </div>
                    <div class=" flexCol iconBox"  @click="goNoDelivery()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe718;</text>
                        <text class="iconfontText ">待发货</text>
                        <div class="shippingNumberBox" v-if="conut.unshipped != 0">
                            <text class="shippingNumber" >{{conut.unshipped}}</text>
                        </div>
                    </div>
                    <div class=" flexCol iconBox"  @click="goDelivery()">
                        <text :style="{fontFamily:'iconfont'}" class="iconfontSize primary">&#xe72c;</text>
                        <text class="iconfontText ">已发货</text>
                        <div class="shippingNumberBox" v-if="conut.shipped != 0">
                            <text class="shippingNumber" >{{conut.shipped}}</text>
                        </div>
                    </div>
                    <div class=" flexCol iconBox"  @click="goRefund()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xea20;</text>
                        <text class="iconfontText ">待退款</text>
                        <div class="shippingNumberBox" v-if="conut.refund != 0">
                            <text class="shippingNumber" >{{conut.refund}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 我的运单 -->
            <div class="contentBox" v-if="shippingConutTotal != 0 && filter('shipping')">
                <div class="boder-bottom pl20 pr20 space-between headTitle" @click="goShipping()">
                    <text class="fz30">我的运单</text>
                    <div class="flex-row">
                        <text class="iconfontText" style="padding-right: 10px;">查看所有</text>
                        <text :style="{fontFamily:'iconfont'}" class="iconfontText">&#xe630;</text>
                    </div>
                </div>
                <!-- 订单消息 -->
                <div class="comWrap">
                    <div class=" flexCol iconBox"  @click="goConfirm()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe6e2;</text>
                        <text class="iconfontText ">待确认</text>
                        <div class="shippingNumberBox"  v-if="shippingConut.unconfirmed != 0">
                            <text class="shippingNumber">{{shippingConut.unconfirmed}}</text>
                        </div>
                    </div>
                    <div class=" flexCol iconBox"  @click="goToMask()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe718;</text>
                        <text class="iconfontText ">预约单</text>
                        <div class="shippingNumberBox" v-if="shippingConut.hope != 0">
                            <text class="shippingNumber" >{{shippingConut.hope}}</text>
                        </div>
                    </div>
                    <div class=" flexCol iconBox"  @click="goOnTheWay()">
                        <text :style="{fontFamily:'iconfont'}" class="iconfontSize primary">&#xe72c;</text>
                        <text class="iconfontText ">配送中</text>
                        <div class="shippingNumberBox" v-if="shippingConut.confirmed != 0">
                            <text class="shippingNumber" >{{shippingConut.confirmed}}</text>
                        </div>
                    </div>
                    <div class=" flexCol iconBox"  @click="goaArive()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xea20;</text>
                        <text class="iconfontText ">已送达</text>
                        <div class="shippingNumberBox" v-if="shippingConut.completed != 0">
                            <text class="shippingNumber" >{{shippingConut.completed}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <div class="menubox">
                <div class="menu" @click="goods()" v-if="filter('manage')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe684;</text>
                    <text class="menuBtn">商品</text>
                </div>
                <div class="menu" @click="order()" v-if="filter('order')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe6b1;</text>
                    <text class="menuBtn">订单</text>
                </div>
                <div class="menu" @click="goShipping()" v-if="filter('shipping')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe63b;</text>
                    <text class="menuBtn">送货</text>
                </div>

                <div class="menu" @click="gocard()" v-if="filter('card')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                    <text class="menuBtn">会员卡</text>
                </div>
                <div class="menu" @click="gocoupon()" v-if="filter('coupon')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                    <text class="menuBtn">电子券</text>
                </div>
                <div class="menu" @click="godistribution()" v-if="filter('distribution')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe7c8;</text>
                    <text class="menuBtn">新营销</text>
                </div>
                <div class="menu" @click="deposit()" v-if="filter('money')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe63b;</text>
                    <text class="menuBtn">统计</text>
                </div>
                <div class="menu" @click="shop()" v-if="filter('shop')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe6ab;</text>
                    <text class="menuBtn">店铺</text>
                </div>
                <div class="menu" @click="employee()" v-if="filter('employee')">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe70e;</text>
                    <text class="menuBtn">员工</text>
                </div>
                <!--<div class="menu" @click="system()" >-->
                    <!--<text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe70e;</text>-->
                    <!--<text class="menuBtn">地图</text>-->
                <!--</div>-->
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
        <qrcode ref="qrcode" ></qrcode>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .headerIcon{
        font-size: 60px;
        color: white;
    }
    .headerText{
        font-size: 32px;
        color: white;
    }
    .contentBox{
        width: 690px;
        margin-top: 40px;
        margin-left: 30px;
        margin-right: 30px;
        background-color: white;
        border-radius: 20px;
    }
    .headTitle {
        height: 80px;
        line-height: 80px;
        position: relative;
    }
    .iconfontSize{
        font-size: 60px;
    }
    .iconfontText{
        font-size: 26px;
        line-height: 40px;
        color: #444;
    }
    .comWrap {
        width: 690px;
        padding: 20px;
        border-radius: 20px;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        background-color: rgba(255,255,255,0.5);
    }
    .flexCol {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 140px;
    }
    .iconBox{
        width: 162.5px;
    }
    .shippingNumberBox{
        padding-top: 3px;
        min-height: 35px;
        min-width: 35px;
        border-radius: 100%;
        border-color: #EB4E40;
        border-width:2px;
        color: #EB4E40;
        position: absolute;
        top:0;
        right: 40px;
        align-items: center;
        justify-content: center;
    }
    .shippingNumber{
        font-size: 26px;
        line-height: 26px;
        color: #EB4E40;
    }

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
        padding-left: 70px;
        padding-right: 70px;
        height:310px;
        flex-direction: row;
        align-items:center;
        justify-content: space-between;
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
        border-top-left-radius: 20px;
        border-top-right-radius:20px;
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
    import qrcode from '../../../include/qrcode.vue';
    import { POST, GET ,SCAN} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters.js'
    import {dom,event,animation} from '../../../weex.js';
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
                clicked:false,
                conut:[],
                shippingConut:[],
                conutTotal:0,
                shippingConutTotal:0,
                gpsTime:null,
                inputShow:false
            }
        },
        components: {
            qrcode
        },
        props: {
            title: { default: "收银台" }
        },
        beforeDestory() {
//            页面销毁时解除定时器
            if (!utils.isNull(this.gpsTime))  {
                clearInterval(this.gpsTime);
                this.gpsTime = null;
            }
        },
        created() {
            var _this = this;
            utils.initIconFont();
            this.isIndex = (utils.getUrlParameter("index")=='true');
            this.view();
//            globalEvent.addEventListener("onCashierChange", function (e) {
//                _this.view();
//            });
//            监听账单消息提醒.
            globalEvent.addEventListener("onMessage", function (e) {
                if(!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10212'){
                    _this.view();
                }
                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10200') {
//                   获取订单数量
                    _this.getCount();
                }
                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10213') {
//                   获取运单数量
                    _this.getShippingConut();
                }
            });
        },
        methods: {
//            显示收银
            contolInput(){
                var _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    return
                }else{
                    this.inputShow = !this.inputShow
                }

            },
//            调自身二维码
            showQrcode: function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (utils.isNull(_this.shopId)) {
                    _this.view()
                    if(utils.isNull(_this.shopId)) {
                        modal.alert({
                            message: '无店铺授权',
                            okTitle: 'OK'
                        })
                        _this.clicked = false
                        return

                    }
                }
                event.openURL(utils.locate('view/shop/card/add.js'), function(data) {
                        _this.clicked = false;
                    }
                );
            },

//            扫码搜索会员
            scanFindCard(code){
                GET('weex/member/card/infobycode.jhtml?code='+code,function (mes) {
                    if (mes.type == 'success') {
                        var id = mes.data.card.id;
                        event.openURL(utils.locate('view/shop/card/view.js?id='+id),function (message) {

                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            扫码核销优惠券
            scanCoupon(code,captcha){
                GET('weex/member/couponCode/use.jhtml?code='+code +'&captcha='+captcha,function (mes) {
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
            //            扫码送达
            scanSend(sn){
                let _this = this
                var uId = event.getUId();
                event.getLocation(function (data) {
                    if(data.type == 'success'){
                        GET('weex/member/shipping/receive.jhtml?sn='+sn+'&lat='+data.data.lat +'&lng='+data.data.lng + '&memo='+encodeURIComponent('扫码送达'),function (mes) {
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
                    }else {
                        GET('weex/member/shipping/receive.jhtml?sn='+sn+'&lat=0' +'&lng=0' + '&memo='+encodeURIComponent('扫码送达'),function (mes) {
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
                    }
                })

            },


//            触发二维码方法
            scan:function () {
                let _this=this
                event.scan(function (message) {
                    GET('/q/scan.jhtml?code='+ encodeURIComponent(message.data),function (res) {
                        if (res.type=="success") {
                            if(res.data.type =='818801'|| res.data.type =='818802'){
                                _this.scanFindCard(res.data.code)
                            }else if(res.data.type =='818803'){
                                _this.scanCoupon(res.data.code,res.data.captcha)
                            }else if(res.data.type =='818807'){
                                _this.scanSend(res.data.sn)
                            }

                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
                });
            },
            //            获取经纬度
            getGps:function(){

                let _this = this
                var uId = event.getUId();
                event.getLocation(function (data) {
                    if(data.type == 'success'){
                        POST("/lbs/location.jhtml?lng=" + data.data.lng + "&lat=" +data.data.lat +'&memberId=' + uId).then(function (mes) {
                            if (mes.type == 'success') {

                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                    }else {
                        event.toast('定位失败，请开启GPS')
                    }
                })
            },
            //            获取订单数量
            getCount(){
                var _this = this
                POST('weex/member/order/count.jhtml').then( function (res) {
                    if (res.type=="success") {
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
            getShippingConut(){
                var _this = this
                POST('weex/member/shipping/count.jhtml').then( function (res) {
                    if (res.type=="success") {
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
            goConfirm(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=0&productCategoryId=1'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            预约单
            goToMask(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=1&productCategoryId=2'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            配送中
            goOnTheWay(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=2&productCategoryId=3'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            已送达
            goaArive(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=3&productCategoryId=4'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
//            待付款
            goNoPay(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=0&productCategoryId=1'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            待发货
            goNoDelivery(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=1&productCategoryId=2'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            已发货
            goDelivery(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=2&productCategoryId=3'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            待退款
            goRefund(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=3&productCategoryId=4'), function(data) {
                        _this.clicked = false;
                        _this.getCount()
                        _this.getShippingConut();
                    }
                );
            },
            //            权限过滤器
            filter(e){
                var _this = this;
                if(e == 'order'){
//                    订单
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'shipping'){
//                    运单
                    if (utils.isRoles("123",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'card'){
//                    会员卡
                    if (!utils.isNull(_this.shopId)) {
                        return true
                    }else{
                        return false
                    }
                }else if(e == 'coupon'){
//                    优惠券
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'distribution'){
//                    新营销
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'manage'){
//                    商品
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'shop'){
//                    店铺
                    if (utils.isRoles("1",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'employee'){
//                    员工
                    if (utils.isRoles("1",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                }else if(e == 'money'){
//                    收银
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                }else {
                    return false
                }
            },
//            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
//                        开启定时器，每两钟定位一次经纬度
                        _this.gpsTime = setInterval(function () {
                            _this.getGps()
                        },120000);
                    } else {
                        event.toast(mes.content);
                    }
                 },function (err) {
                    event.toast(err.content);
                });
            },
            employee:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/admin/list.js"),function (e) {_this.clicked =false});
            },
            system(){
                event.openURL(utils.locate("view/shop/cashier/amap.js"),function (e) {});
            },
            shop:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/shop/storeList.js"),function (mes) {
                    if(mes.type =='success'&&mes.data==''){
                        event.closeURL(mes)
                    }
                    _this.clicked =false
                });
            },
            gocard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/card/list.js"),function (e) {_this.clicked = false});
            },
            gocoupon:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/coupon/list.js"),function (e) {_this.clicked = false});
            },
            godistribution:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("12",_this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/goods/distribution.js"),function (e) {_this.clicked = false});
            },
            goods:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("1",_this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/goods/manage.js"),function (e) {_this.clicked = false});
            },
            order:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("12",_this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/order/list.js"),function (e) {
                    _this.clicked = false
                    _this.getCount()
                    _this.getShippingConut();
                });
            },
            objHeader:function () {
                if (utils.device()=='V1') {
                    return {backgroundColor:'#000'}
                }
            },
            hasShop:function () {
                let _this = this
                if (utils.isRoles("12",_this.roles) && !utils.isNull(_this.shopId) && _this.shopId>0) {
                    return true
                }else {
                    return false
                }
            },
            hasInput:function () {
                if(!utils.isNull(this.amount) || this.inputShow == true){
                    return true
                }else {
                    return false
                }

            },
            classHeader:function () {
                return utils.device();
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
                    _this.view();
                }, 1000)
            },
            view:function () {
                var _this = this;
                GET("weex/member/cashier/view.jhtml",function (res) {
                   if (res.type=="success") {
                       _this.cashier = res.data;
                       _this.shopId = res.data.shopId;
                       if(res.data.status == 'success'){
//                           获取订单数量
                           _this.getCount();
//                           获取运单数量
                           _this.getShippingConut();
//                           获取权限
                           _this.permissions()
                       }
                   } else {
                       event.toast(res.content);
                   }
                },function (err) {
                   event.toast(err.content);
                });
            },
            goback: function (e) {
                event.closeURL();
            },
            goShipping:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("123",_this.roles) || utils.isNull(_this.shopId)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.view()
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/shipping/list.js"),function (e) {
                    _this.clicked =false
                    _this.getCount()
                    _this.getShippingConut();
                });
            },
            deposit:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("125",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/member/report/index.js"),function (e) {_this.clicked =false});
            },
            goIndex:function () {
                GET("weex/member/topic/owner.jhtml",function (res) {
                    if (res.type=='success') {
                    event.openURL(utils.locate("view/topic/index.js?id=" +res.data),
                        function (e) {}
                    );
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })

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
               this.inputShow = false;
               this.isScan = false;
               this.isSubmit = false;
            },
            print:function () {
                GET("weex/member/paybill/print.jhtml?id="+this.id,function (mes) {
                    if (mes.type=='success') {
                        if (utils.device()=='V1') {
                            printer.print(mes.data);
                        } else {
                            modal.alert({
                                message: "官方指定机器才能打印",
                                okTitle: '知道了'
                            })
                        }
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
                                _this.view();
                                if (utils.device()=='V1') {
                                    event.toast("付款成功");
                                    _this.print();
                                } else {
                                    modal.alert({
                                        message: '付款成功',
                                        okTitle: '知道了'
                                    })
                                }
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
                            POST("payment/submit.jhtml?sn="+_this.sn+"&paymentPluginId="+_this.plugId+"&safeKey="+encodeURIComponent(safeKey)).then(
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
                       let c = utils.qr2scan(message.data);
                        _this.submit(c);
                    } else {
                        _this.isScan = false;
                    }
                });
            }
        }

    }
</script>