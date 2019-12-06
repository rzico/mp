<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller   @loadmore="onloading" loadmoreoffset="50">
            <refresh :display="refreshing ? 'show' : 'hide'" @refresh="onrefresh"  class="refreshBox">
                <image :src="refreshImg" class="refreshImg"  ref="refreshImg" resize="cover" ></image>
            </refresh>
            <noData :noDataHint="noDataHint" v-if="ordersList.length == 0"></noData>
            <!--导航栏-->
            <div :class="[item.status == 'unpaid' || item.status == 'refunding' || item.status ==  'unshipped' || item.status ==  'returning' ? 'hasPb100' : '']" v-else v-for="(item,index) in ordersList" >
                <div class="header mt20 flex-row">
<!--                    <div >-->
<!--                        <text  class="carIcon"  :style="{fontFamily:'iconfont'}">&#xe62e;</text>-->
<!--                    </div>-->
                    <div>
                        <div  :class="[index != 0 ? 'mt20' : '']"  class="logBox" v-for="(orderLog,index) in item.orderLogs">
                            <text class="title">{{orderLog.content}}: </text>
                            <text class="subDate"> {{orderLog.createDate | watchLogDate}}</text>
                        </div>
                    </div>
                </div>
                <div class="infoWhiteColor boder-bottom mt20 space-between" @click="jump(item.cardId)">
                    <div class="goodsBody">
                        <text class="fz32">配送信息</text>
                    </div>
                    <div class="goodsBody" >
                        <div class="flex-row">
                            <text class="fz28 gray">查看会员资料</text>
                            <text class="fz28 gray ml10" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>
                <div @click="jump(item.cardId)" class="addressBox flex-row">
                    <div style="width: 700px">
                        <div class="flex-row" style="position: relative">
                            <text class="title">{{item.receiver.consignee}}</text>
                            <text class="title" style="margin-left: 10px">{{item.receiver.phone}}</text>
                            <text @click="callPhone(item.receiver.phone)"  style="position: absolute;right: 20px"  class="sub_title copyBtn copyBorder ml20">拨号</text>
                        </div>
<!--                        <div class="space-between mt10">-->
<!--                            -->
<!--                        </div>-->
                        <div class="space-between mt10" >
                            <text class="title" style="line-height: 42px;max-width: 500px;">{{item.receiver.areaName}}{{item.receiver.address}}</text>
                            <text @click="copyCode(item.receiver.consignee+item.receiver.phone+item.receiver.areaName+item.receiver.address)"  class="sub_title copyBtn copyBorder ml20">复制</text>
                        </div>
                    </div>
                </div>
                <div class="infoWhiteColor" style="border-top-width: 1px;border-top-style:solid;border-top-color: #eee">
                    <div class="infoLines pb10">
                        <text class="sub_title ">配送方式: {{item.shippingMethod}}</text>
                    </div>
                    <div class="infoLines pt0 pb10" v-if="item.shippingMethodId == 'warehouse'">
                        <text class="sub_title ">配送站点: {{item.shopName}}</text>
                    </div>
                    <div class="infoLines pt0 pb10" v-if="item.shippingMethodId == 'warehouse'">
                        <text class="sub_title ">配送人员: {{item.adminName}}</text>
                    </div>
                    <div class="infoLines pt0 pb10" v-if="item.shippingMethodId == 'shipping'">
                        <text class="sub_title ">快递公司: {{item.deliveryCorpId}}</text>
                    </div>
                    <div class="infoLines pt0 pb10" v-if="item.shippingMethodId == 'shipping'">
                        <text class="sub_title ">快递单号: {{item.trackingNo}}</text>
                    </div>
                    <div class="infoLines pt10 boder-bottom">
                        <text class="sub_title ">派单留言: {{item.shippingMemo}}</text>
                    </div>
                    <div class="infoLines flex-row boder-bottom ">
                        <text class="sub_title ">买家留言: {{item.memo}}</text>
                        <text @click="copyCode(item.memo)"  class="sub_title copyBtn copyBorder ml20"   v-if="item.memo!=null && item.memo!=''">复制</text>
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

                <div class="infoWhiteColor boder-bottom">
                    <div class="goodsBody">
                    <div class="space-between">
                        <text class="sub_title">商品小计:</text>
                        <text class="sub_title">¥{{item.price | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10" v-if="item.freight !=0">
                        <text class="sub_title">运费(楼层费):</text>
                        <text class="sub_title">¥ {{item.freight | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10" v-if="item.pledgePayable !=0">
                        <text class="sub_title">空桶押金:</text>
                        <text class="sub_title">¥ {{item.pledgePayable | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10 "v-if="item.couponDiscount != 0 && item.couponDiscount != '0'">
                        <text class="sub_title">优惠折扣:</text>
                        <text class="sub_title">-{{item.couponDiscount | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10 " v-if="item.pointDiscount != 0 && item.pointDiscount != '0'">
                        <text class="sub_title">积分抵扣:</text>
                        <text class="sub_title">-{{item.pointDiscount | currencyfmt}}</text>
                    </div>
                        <div class=" space-between mt10 " v-if="item.vipDiscount != 0 && item.vipDiscount != '0'">
                            <text class="sub_title">会员卷抵扣:</text>
                            <text class="sub_title">-{{item.vipDiscount | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10 " v-if="item.offsetAmount != 0 && item.offsetAmount != '0'">
                            <text class="sub_title">客服调价:</text>
                            <text class="sub_title">{{item.offsetAmount | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10 " v-if="item.exchangeDiscount != 0 && item.exchangeDiscount != '0'">
                        <text class="sub_title">电子券支付:</text>
                        <text class="sub_title">-{{item.exchangeDiscount | currencyfmt}}（{{item.exchangeQuantity}}张</text>
                        </div>
                    <div class="space-between mt10">
                        <text class="fz30 mr20">订单合计:</text>
                        <text class="fz30" style="color: red">¥{{item.amount | currencyfmt}}</text>
                    </div>
                    </div>
                </div>
                <div class="infoWhiteColor" v-if="item.shippingFreight !=0 || item.cost !=0 || item.adminFreight !=0 ||item.amountPayable !=0 || item.paperPayable !=0">
                    <div class="priceLine">
                        <div class=" space-between" v-if="item.shippingFreight !=0">
                            <text class="sub_title">配送运费:</text>
                            <text class="sub_title">¥ {{item.shippingFreight | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10" v-if="item.cost !=0">
                            <text class="sub_title">货款结算:</text>
                            <text class="sub_title">¥ {{item.cost | currencyfmt}}</text>
                        </div>
                        <div class=" space-between mt10" v-if="item.adminFreight !=0">
                            <text class="sub_title">送货工资:</text>
                            <text class="sub_title">¥ {{item.adminFreight | currencyfmt}}</text>
                        </div>
                        <div class="space-between mt10" v-if="item.amountPayable !=0">
                            <text class="sub_title ">应收金额:¥{{item.amountPayable | currencyfmt}}(上期欠款:¥{{item.arrears | currencyfmt}})</text>
                            <text class="sub_title ">实收金额:¥{{item.amountPaid | currencyfmt}}</text>
                        </div>
                        <div class="space-between mt10" v-if="item.paperPayable !=0">
                            <text class="sub_title ">应收水票:{{item.paperPayable}}(上期欠票:{{item.ticket}})</text>
                            <text class="sub_title ">实收水票:{{item.paperPaid}}</text>
                        </div>
                        <div class="space-between mt10" v-if="item.borrow !=0"  @click="goBarrel(item.cardId,item.memberId)">
                            <text class="sub_title ">上期借桶:{{item.borrow}}</text>
                            <text  :style="{fontFamily:'iconfont'}" class="fz28 gray">&#xe630;</text>
                        </div>
                    </div>
                </div>

                <div class="infoWhiteColor boder-bottom mt20">
                    <div class="goodsBody">
                        <text class="fz32">订单信息</text>
                    </div>
                </div>
                <div class="infoWhiteColor">
                    <div class="infoLines boder-bottom">
                        <div class="space-between">
                            <text class="sub_title">订单编号: {{item.sn}}</text>
                            <text @click="copyCode(item.sn)"  class="sub_title copyBtn copyBorder ml20">复制</text>
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
                </div>

                <div class="flex-row space-between goodsFoot boder-top"  v-if="item.status == 'unpaid'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <text @click="closeOrder(item,item.sn)" class="title footText">关闭订单</text>
                        <text @click="confirmOrder(item.sn)" class="title footText ">确认订单</text>
                        <text @click="choose()" class="title footText ">修改地址</text>
                        <text @click="print()" class="title footText ">打印</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top" v-else-if="item.status == 'refunding'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <text @click="confirmRefund(item.sn)" class="title footText red">确认退款</text>
                        <text @click="print()" class="title footText ">打印</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top"v-else-if="item.status == 'unshipped'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <!--<text class="title footText">评价晒单</text>-->
                        <text @click="sendGoods(item.sn)" class="title footText ">发货</text>
                        <text @click="choose()" class="title footText ">修改地址</text>
                        <text @click="print()" class="title footText ">打印</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top" v-else-if="item.status == 'returning'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <!--<text class="title footText">查看物流</text>-->
                        <!--<text class="title footText">评价晒单</text>-->
                        <text @click="returnGoods(item.sn)" class="title footText ">确认退货</text>
                        <text @click="print()" class="title footText ">打印</text>
                    </div>
                </div>
                <div class="flex-row space-between goodsFoot boder-top" v-else-if="item.status == 'completed'">
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <text @click="print()" class="title footText ">打印</text>
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
        display:flex;
        flex-direction: row;
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
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
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
    import { POST, GET ,URIEncrypt} from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    const clipboard = weex.requireModule('clipboard');
    const printer = weex.requireModule('print');
    var modal = weex.requireModule('modal')
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
                roles:'',
                status:''
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
            navbar, noData, modal
        },
        created() {
            utils.initIconFont();
            this.orderSn = utils.getUrlParameter('sn');
            this.open();
            this.permissions()
        },
        methods: {
            //            打印
            print(){
                let _this = this;
                modal.confirm({
                    message: '确认打印？',
                    duration: 0.3,
                    okTitle:'确认',
                    cancelTitle:'取消'
                }, function (value) {
                    if(value == '确认'){
                        GET('weex/member/order/print.jhtml?sn='+_this.orderSn+"&seqno=1", function (data) {
                                if(data.type == 'success'){
                                    if(!utils.isNull(data.data)){
                                        printer.print(data.data);
                                    }
                                    event.toast('打印成功')
                                }else{
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            })
                    }
                })

            },
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
            jump:function (id) {
                let _this =this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/view.js?id='+id),function () {
                    _this.clicked = false;
                })
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
                POST('weex/member/order/view.jhtml?sn=' + this.orderSn).then(function (data) {
                    if(data.type == 'success'){
                        _this.ordersList = [];
                        _this.ordersList.push(data.data);
                        _this.status = _this.ordersList[0].status
                    }else{
                        modal.alert({
                            message: data.content,
                            okTitle: '确认'
                        }, function () {
                            event.closeURL();
                        })
                    }
                },function (err) {
                    modal.alert({
                        message: err.content,
                        okTitle: '确认'
                    }, function () {
                        event.closeURL();
                    })
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
            copyCode(value){
                clipboard.setString(value);
                event.toast('复制成功');
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
            },
            choose:function () {
                    var _this = this;
                    let e = {
                        sn:_this.ordersList[0].sn,
                        deliveryCorpId:_this.ordersList[0].deliveryCorp,
                        trackingNo:_this.ordersList[0].trackingNo,
                        method:_this.ordersList[0].track.method
                    }
                    event.openURL(utils.locate("view/shop/order/addressChoose.js?"+URIEncrypt(e)),function (res) {
                        _this.open();
                    });
            },
            goBarrel(cardId,memberId){
                let _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: '确定'
                    })
                    return
                }

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/barrel.js?cardId='+cardId+'&memberId='+memberId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
        }
    }
</script>
