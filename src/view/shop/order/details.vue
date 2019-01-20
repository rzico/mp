<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller   @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <noData :noDataHint="noDataHint" v-if="ordersList.length == 0"></noData>
            <!--导航栏-->
            <div v-else v-for="(item,index) in ordersList" :class="[item.status == 'unpaid' || item.status == 'refunding' || item.status ==  'unshipped' || item.status ==  'returning' ? 'hasPb100' : '']" >
                <!--<div class="flex-row infoLines mt20 infoWhiteColor" >-->
                <!--<text class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe604;</text>-->
                <!--<text class="title">感谢您在xxx购物,欢迎您再次光临!</text>-->
                <!--</div>-->
                <div class="header mt20 flex-row">
                    <div >
                        <text  class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe62e;</text>
                    </div>
                    <div>
                        <div  class="logBox"  v-for="(orderLog,index) in item.orderLogs" :class="[index != 0 ? 'mt20' : '']">
                            <text class="title">{{orderLog.content}} </text>
                            <text class="subDate"> {{orderLog.createDate | watchLogDate}}</text>
                        </div>
                    </div>
                    <!--<p class=" marginTop5 titleColor">国内承运人: 京东快递</p>-->
                    <!--<p class=" marginTop5 titleColor">预计送达: 11月13日</p>-->
                </div>
                <div class="addressBox flex-row mt20">
                    <div style="width: 70px;">
                        <text class="addressIcon" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                    </div>
                    <div style="width: 630px">
                        <div class="flex-row">
                            <text class="title">{{item.receiver.consignee}}</text>
                        </div>
                        <div class="flex-row mt10">
                            <text class="title">{{item.receiver.phone}}</text>
                            <text class="sub_title copyBtn copyBorder ml20"  @click="callPhone(item.receiver.phone)">拨号</text>
                        </div>
                        <div class="mt10">
                            <text class="sub_title" style="line-height: 42px">地址: {{item.receiver.areaName}}{{item.receiver.address}}</text>
                        </div>
                    </div>
                </div>
                <div class="goodsLine mt20">
                    <!--<div class="space-between goodsHead boder-bottom" @click="goAuthor(item.memberId)">-->
                        <!--<div class="flex-row">-->
                            <!--<image :src="item.logo" class="shopImg"></image>-->
                            <!--<text class="title ml20 mr20">{{item.name}}</text>-->
                            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                        <!--</div>-->
                        <!--&lt;!&ndash;<div class="flex-row">&ndash;&gt;-->
                        <!--&lt;!&ndash;<text class="sub_title" style="color: #666" :style="{fontFamily:'iconfont'}">联系卖家 </text>&ndash;&gt;-->
                        <!--&lt;!&ndash;<text class="sub_title primary"  :style="{fontFamily:'iconfont'}">&#xe628;</text>&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--</div>-->
                    <div class="flex-row goodsBody " v-for="goods in item.orderItems">
                        <image :src="goods.thumbnail" class="goodsImg"></image>
                        <div class="goodsInfo" >
                            <text class="title goodsName">{{goods.name}}</text>
                            <text class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                            <div class="goodsPriceNum">
                                <text class="title ">¥ {{goods.price | currencyfmt}}</text>
                                <text class="sub_title">x{{goods.quantity}}</text>
                                <!--<text class="sub_title border shopCar" >加购物车</text>-->
                            </div>
                        </div>
                    </div>



                    <!--<div class="flex-row goodsBody">-->
                    <!--<image :src="refreshImg" class="goodsImg"></image>-->
                    <!--<div class="goodsInfo " >-->
                    <!--<text class="title goodsName">Adima 太阳伞防紫外线这样小清新纯色简约三折两用晴雨伞软面</text>-->
                    <!--<text class="sub_title mt10">颜色分类:深蓝直伞</text>-->
                    <!--</div>-->
                    <!--<div class="goodsPriceNum">-->
                    <!--<text class="title ">¥ 148.00</text>-->
                    <!--<text class="sub_title">x1</text>-->
                    <!--<text class="sub_title border shopCar" >加购物车</text>-->
                    <!--</div>-->
                    <!--</div>-->
                </div>
                <div class="mt20 infoWhiteColor">
                    <div class="infoLines boder-bottom">
                        <div class="flex-row">
                            <text class="sub_title">订单编号: {{item.sn}}</text>
                            <text class="sub_title copyBtn copyBorder ml20"  @click="copyCode(item.sn)">复制</text>
                        </div>
                        <div class="mt10 ">
                            <text class="sub_title">下单时间: {{item.createDate | watchCreateDate}}</text>
                        </div>
                        <div class="mt10 " v-if="item.deliveryDate != '' && item.deliveryDate != null">
                            <text class="sub_title">送达时间: {{item.deliveryDate | watchCreateDate}}</text>
                        </div>
                        <div class="mt10 " v-if="item.hopeDate != '' && item.hopeDate != null">
                            <text class="sub_title">预约时间: {{item.hopeDate | watchCreateDate}}</text>
                        </div>
                        <div class="mt10 ">
                            <text class="sub_title">销售站点: {{item.sellerName}}</text>
                        </div>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">支付方式: {{item.paymentMethod}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt0">
                        <text class="sub_title ">支付状态: {{item.paymentStatus | watchPaymentStatus}}</text>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">配送方式: {{item.shippingMethod}}</text>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">配送状态: {{item.shippingStatus | watchShippingStatus}}</text>
                    </div>
                    <div class="infoLines pt0 pb10">
                        <text class="sub_title ">配送站点: {{item.shopName}}</text>
                    </div>
                    <div class="infoLines pt0 pb10">
                        <text class="sub_title ">配送人员: {{item.adminName}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt10">
                        <text class="sub_title ">派单留言: {{item.shippingMemo}}</text>
                    </div>
                    <div class="infoLines boder-bottom ">
                        <text class="sub_title ">买家留言: {{item.memo}}</text>
                    </div>
                </div>
                <div class="mt20  infoWhiteColor" >
                    <div class="priceLine boder-bottom">
                        <div class="space-between">
                            <text class="sub_title">商品总额</text>
                            <text class="sub_title">¥{{item.price | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10" v-if="filter('cost')">
                            <text class="sub_title">+ 运费(楼层费)</text>
                            <text class="sub_title">¥ {{item.freight | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10">
                            <text class="sub_title">+ 空桶押金</text>
                            <text class="sub_title">¥ {{item.pledgePayable | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10 "v-if="item.couponDiscount != 0 && item.couponDiscount != '0'">
                            <text class="sub_title">优惠折扣</text>
                            <text class="sub_title">-{{item.couponDiscount | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10 " v-if="item.pointDiscount != 0 && item.pointDiscount != '0'">
                            <text class="sub_title">积分抵扣</text>
                            <text class="sub_title">-{{item.pointDiscount | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10 " v-if="item.exchangeDiscount != 0 && item.exchangeDiscount != '0'">
                            <text class="sub_title">电子券支付</text>
                            <text class="sub_title">-{{item.exchangeDiscount | currencyfmt}}（{{item.exchangeQuantity}}张）</text>
                        </div>
                        <div class="flex-row pb10">
                            <text class="fz28 mr20">订单合计:</text>
                            <text class="fz28" style="color: red">¥{{item.amount | currencyfmt}}</text>
                        </div>
                        <div class="space-between pb10">
                            <text class="fz28 ">应收金额:¥{{item.amountPayable | currencyfmt}}(上期欠款:¥{{item.arrears | currencyfmt}})</text>
                            <text class="fz28 ">实收金额:¥{{item.amountPaid | currencyfmt}}</text>
                        </div>
                        <div class="space-between pb10">
                            <text class="fz28 ">应收水票:{{item.paperPayable}}(上期欠票:{{item.ticket}})</text>
                            <text class="fz28 ">实收水票:{{item.paperPaid}}</text>
                        </div>

                    </div>
                    <div class="priceLine">

                        <div class=" space-between mt10" v-if="filter('shippingFreight')">
                            <text class="sub_title">配送运费</text>
                            <text class="sub_title">¥ {{item.shippingFreight | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10" v-if="filter('cost')">
                            <text class="sub_title">货款结算</text>
                            <text class="sub_title">¥ {{item.cost | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10">
                            <text class="sub_title">送货工资</text>
                            <text class="sub_title">¥ {{item.adminFreight | currencyfmt}}</text>
                        </div>

                    </div>
                </div>

                <div class="flex-row space-between goodsFoot boder-top"  v-if="item.status == 'unpaid'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <text class="title footText" @click="closeOrder(item,item.sn)">关闭订单</text>
                        <text class="title footText " @click="confirmOrder(item.sn)">确认订单</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top" v-else-if="item.status == 'refunding'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <text class="title footText red" @click="confirmRefund(item.sn)">确认退款</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top"v-else-if="item.status == 'unshipped'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <!--<text class="title footText">评价晒单</text>-->
                        <text class="title footText " @click="sendGoods(item.sn)">发货</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top" v-else-if="item.status == 'returning'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <!--<text class="title footText">评价晒单</text>-->
                        <text class="title footText " @click="returnGoods(item.sn)">确认退货</text>
                    </div>
                </div>
                <!--<div class="flex-row flex-center goodsFoot boder-top" v-else>-->
                    <!--<div>-->
                        <!--<text class="title  " @click="returnGoods(item.sn)">该订单已关闭</text>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </scroller>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .hasPb100{
        padding-bottom: 100px;
    }
    .copyBorder{
        border-color: #ccc;
        border-width: 1px;
        border-style: solid;
    }
    .logBox{
        width: 630px;
        overflow: hidden;
        display:flex;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
    }
    .subDate{
        font-size: 24px;
        color: #999;
    }
    .header{
        background-color: #fff;
        padding: 30px;
    }
    .carIcon{
        width: 60px;color: #444;font-size: 35px;
    }
    /*<!--底部金额-->*/
    .priceLine{
        background-color: #fff;
        padding-right: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-left: 30px;
    }
    /**/
    /*<!--订单 支付方式 信息行-->*/
    .infoWhiteColor{
        background-color: #fff;
    }
    .copyBtn{
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 6px;
        padding-bottom: 6px;
        border-radius: 5px;
        font-size: 26px;
    }
    .infoLines{
        padding: 30px;

    }
    /**/

    /*<!--收货地址-->*/
    .addressIcon{
        width: 70px;
        font-size: 50px;
        color: #666;
    }
    .addressBox{
        padding: 20px;
        background-color: #fff;
    }

    /**/
    .footMore{
        width: 158px;align-items: center;
    }
    .red{
        color: red;
        border-color: red;
    }
    .coral{
        color: coral;
    }
    .footText{
        padding: 18px;
        border-radius: 5px;
        color: #444;
        border-color: #ccc;
        border-width: 1px;
        border-style: solid;
        margin-right: 20px;
    }
    .goodsFoot{
        /*padding-top: 20px;*/
        /*padding-bottom: 20px;*/
        height:100px;
        lin-height:100px;
        padding-left: 15px;
        left:0;
        right:0;
        position: fixed;
        bottom: 0px;
        background-color:#fff;
    }
    .goodsTotalPrice{
        padding: 20px;
        justify-content: flex-end;
    }
    .goodsName{
        line-height: 32px;
        lines:2;
        text-overflow: ellipsis;
    }
    .goodsPriceNum{
        /*height: 160px;*/
        align-items: center;
        justify-content: space-between;
        /*width: 150px;*/
        flex-direction: row;
        width: 510px;
    }
    .goodsInfo{

        display: flex;flex-direction: column;justify-content: space-between;
        height: 160px;
        /*width: 380px;*/
        width: 530px;
        padding-left: 20px;

    }
    .goodsBody{
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 30px;
        padding-right: 30px;
    }
    .goodsLine{
        background-color: #fff;
    }
    .goodsImg{
        height: 160px;
        width: 160px;
        border-radius: 5px;
    }
    .goodsHead{
        background-color: #fff;
        padding: 20px;
        padding-left: 30px;
        padding-right: 30px;
    }
    .shopImg{
        height: 40px;
        width: 40px;
    }
    .shopCar{
        font-size: 20px;color: #444;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-right: 20px;
        padding-left: 20px;
        border-radius: 5px;
    }

</style>
<script>
    const phone = weex.requireModule('phone');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    const clipboard = weex.requireModule('clipboard');
    var modal = weex.requireModule('modal');
    export default {
        data:function() {
            return{
                ordersList: [],
                refreshing: false,
                pageStart: 0,
                pageSize: 15,
//            refreshImg:utils.locate('resources/images/loading.png'),
                orderSN:'',
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
                roles:''
            }
        },
        props: {
            noDataHint: {default: '暂无订单'},
            title: {default: '订单详情'}
        },
        filters:{
            watchCreateDate:function (value) {
                return utils.ymdhistimefmt(value);
            },
            watchPayMethod:function (value) {
                switch (value){
                    case "online":
                        return '在线支付';
                        break;
                    case 'offline':
                        return '线下支付';
                        break;
                    case 'deposit':
                        return '余额支付';
                        break;
                    case 'card':
                        return '会员卡支付';
                        break;
                    default:
                        return '在线支付';
                        break;
                }
            },
            watchShippingMethod:function (value) {
                switch (value){
                    case "shipping":
                        return '普通快递 ';
                        break;
                    case 'pickup':
                        return '线下提货';
                        break;
                    case 'warehouse':
                        return '统仓统配';
                        break;
                    case 'ecard':
                        return '存入卡包';
                        break;
                    case 'virtual':
                        return '虚拟货品';
                        break;
                    default:
                        return '普通快递';
                        break;
                }
            },
            watchStatus:function (value) {
                switch (value){
                    case 'unpaid':
                        return '需付款';
                        break;
                    case 'complete':
                        return '实付款';
                        break;
                    default:
                        return '实付款';
                        break;
                }
            },
            watchPaymentStatus:function (value) {
                switch (value){
                    case 'unpaid':
                        return '未支付';
                        break;
                    case 'paid':
                        return '已支付';
                        break;
                    case 'refunding':
                        return '退款中';
                        break;
                    case 'refunded':
                        return '已退款';
                        break;
                    default:
                        return '暂无状态';
                        break;
                }
            },
            watchShippingStatus:function (value) {
                switch (value){
                    case 'unshipped':
                        return '未发货';
                        break;
                    case 'shipped':
                        return '已发货';
                        break;
                    case 'returning':
                        return '退货中';
                        break;
                    case 'returned':
                        return '已退货';
                        break;
                    default:
                        return '暂无状态';
                        break;
                }
            },
            watchLogDate:function (value) {
                return utils.ymdhisdayfmt(value);
            }
        },
        components: {
            navbar, noData
        },
        created() {
            utils.initIconFont();
            this.orderSn = utils.getUrlParameter('sn');
            this.open();
            this.permissions()
        },
        methods: {
            //            权限过滤器
            filter(e) {
                var _this = this;
                if (e == 'shippingFreight') {
//                    派单等
                    if (utils.isRoles("12", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                } else if (e == 'cost') {
//                    送达
                    if (utils.isRoles("12", _this.roles)) {
                        return true
                    } else {
                        return false
                    }
                }else{
                    return false
                }
            },
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
            open:function () {
                let _this = this;
                GET('website/member/order/view.jhtml?sn=' + this.orderSn,function (data) {
                    if(data.type == 'success'){
                        _this.ordersList = [];
                        _this.ordersList.push(data.data);
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading: function () {
////            获取关注列表
            },
            onrefresh: function () {
                var _this = this;
                _this.pageStart = 0;
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
                    this.refreshing = false;
////            获取关注列表
                }, 1000)
            },
//            点击复制
            copyCode(sn){
                clipboard.setString(sn);
                event.toast('单号复制成功');
            },

//            确认退款
            confirmRefund:function (sn) {
                let _this = this;
                modal.confirm({
                    message: '是否确定退款?',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/order/refunds.jhtml?sn=' + sn).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.pageStart = 0;
                                    _this.open();
                                    event.toast('退款成功');
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                })

            },
//            关闭订单
            closeOrder:function (item,sn) {
                let _this = this;
                modal.confirm({
                    message: '确定关闭该订单?',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/order/cancel.jhtml?sn=' + sn).then(function (data) {
                            if(data.type == 'success'){
//            _this.ordersList.splice(_this.selectIndex,1);
//                                        _this.ordersList[_this.selectIndex].status = 'completed',
//                                        _this.ordersList[_this.selectIndex].statusDescr = '已取消',
                                item.status = 'completed';
                                item.statusDescr = '已取消';
//                                    _this.pageStart = 0;
//                                    _this.open();
                                event.toast('关闭订单成功');
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        })
                    }
                })
            },
//            确认订单
            confirmOrder:function (sn) {
                let _this = this;
//                modal.confirm({
//                    message: '是否确认该订单?',
//                    duration: 0.3,
//                    okTitle:'确认',
//                    cancelTitle:'取消',
//                }, function (value) {
//                    if(value == '确认'){
//                        POST('weex/member/order/confirm.jhtml?sn=' + sn).then(
//                            function (data) {
//                                if(data.type == 'success'){
//                                    _this.pageStart = 0;
//                                    _this.open();
//                                    event.toast('确认成功');
//                                }else{
//                                    event.toast(data.content);
//                                }
//                            },function (err) {
//                                event.toast(err.content);
//                            }
//                        )
//                    }
//                })
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/order/confirmOrder.js?sn=" + sn),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success'){
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('确认成功');
                    }
                });
            },
//            发货
            sendGoods:function(sn){
                let _this = this;
//                modal.confirm({
//                    message: '确认发货?',
//                    duration: 0.3,
//                    okTitle:'确认',
//                    cancelTitle:'取消',
//                }, function (value) {
//                    if(value == '确认'){
//                        POST('weex/member/order/shipping.jhtml?sn=' + sn).then(
//                            function (data) {
//                                if(data.type == 'success'){
//                                    _this.pageStart = 0;
//                                    _this.open();
//                                    event.toast('发货成功');
//                                }else{
//                                    event.toast(data.content);
//                                }
//                            },function (err) {
//                                event.toast(err.content);
//                            }
//                        )
//                    }
//                })
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/order/delivery.js?sn=" + sn),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success') {
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('发货成功');
                    }
                });
            },
//            退货
            returnGoods:function (sn) {
                let _this = this;
                modal.confirm({
                    message: '确定退货?',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/order/returns.jhtml?sn=' + sn).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.pageStart = 0;
                                    _this.open();
                                    event.toast('退货成功');
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(data.content);
                            }
                        )
                    }
                })
            },
//            前往作者主页
            goAuthor(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
            },
            goback:function () {
                event.closeURL();
            },
//            联系收货人
            callPhone:function (telPhone) {
                phone.tel(telPhone,function(){
                    return;
                })
            }
        }
    }
</script>