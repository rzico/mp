<template>
    <div class="wrapper" >
        <navbar :title="title"   @goback="goback" ></navbar>
        <scroller   @loadmore="onloading" loadmoreoffset="50">
            <refresh :display="refreshing ? 'show' : 'hide'" @refresh="onrefresh"  class="refreshBox">
                <image :src="refreshImg" class="refreshImg"  ref="refreshImg" resize="cover" ></image>
            </refresh>
            <noData :noDataHint="noDataHint" v-if="ordersList.length == 0"></noData>
            <!--导航栏-->
            <div class="infoWhiteColor boder-bottom mt20">
                <div class="goodsBody">
                    <text class="fz32">配送信息</text>
                </div>
            </div>
            <div  v-for="(item,index) in ordersList"  >
                <div class="addressBox flex-row boder-bottom" >
                    <div style="width: 700px">
                        <div class="flex-row" style="position: relative">
                            <text class="title" style="max-width: 300px;lines:1;text-overflow: ellipsis;overflow: hidden;">{{item.receiver.consignee}}</text>
                            <text class="title" style="margin-left: 10px">{{item.receiver.phone}}</text>
                            <text @click="callPhone(item.receiver.phone)" class="sub_title copyBtn copyBorder ml20"  style="position: absolute;right: 20px">拨号</text>
                        </div>
                        <div class="mt10">
                            <text class="title" style="line-height: 42px">{{item.receiver.areaName}}{{item.receiver.address}}</text>
                        </div>
                    </div>
                </div>
                <div class="pt20 pb10 pl30 pr30 boder-bottom" style="background-color: #fff;">
                <div class=" pt0 pb10">
                    <text class="sub_title ">配送站点: {{item.shopName}}</text>
                </div>
                <div class="  pt0 pb10">
                    <text class="sub_title ">配送人员: {{item.track.name}}  {{item.track.mobile}}</text>
                </div>
                <div class=" pt0 pb10">
                    <text class="sub_title ">派单留言: {{item.memo}}</text>
                </div>
                </div>
                <div class="addressBox">
                <div>
                    <text class="sub_title ">买家留言: {{item.orderMemo}}</text>
                </div>
                </div>
                <div class="goodsLine mt20">
                    <div class="flex-row goodsBody " v-for="goods in item.shippingItems">
                        <image :src="goods.thumbnail" class="goodsImg"></image>
                        <div class="goodsInfo" >
                            <text class="title goodsName">{{goods.name}}</text>
                            <text class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                            <div class="goodsPriceNum">
                                <!--<text class="title ">¥ {{goods.price | currencyfmt}}</text>-->
                                <text class="sub_title">x{{goods.quantity}}</text>
                                <!--<text class="sub_title border shopCar" >加购物车</text>-->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="priceLine boder-bottom">
                    <div class="space-between">
                        <text class="sub_title">商品小计:</text>
                        <text class="sub_title">¥{{item.price | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10" v-if="item.freight != 0 && item.freight != '0'">
                        <text class="sub_title">运费(楼层费):</text>
                        <text class="sub_title">¥ {{item.freight | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10" v-if="item.pledgePayable != 0 && item.pledgePayable != '0'">
                        <text class="sub_title">空桶押金:</text>
                        <text class="sub_title">¥ {{item.pledgePayable | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10"v-if="item.couponDiscount != 0 && item.couponDiscount != '0'">
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
                        <text class="sub_title">-{{item.exchangeDiscount | currencyfmt}}（{{item.exchangeQuantity}}张）</text>
                    </div>
                    <div class="space-between mt10 pb10">
                        <text class="fz30 mr20">订单合计:</text>
                        <text class="fz30" style="color: red">¥{{item.amount | currencyfmt}}</text>
                    </div>
                </div>
                <div class="priceLine boder-bottom pb20" v-if="item.shippingFreight != 0 || item.cost != 0 || item.adminFreight !=0 || item.amountPayable !=0 || item.paperPayable != 0">
                    <div class=" space-between" v-if="item.shippingFreight != 0 && item.shippingFreight != '0'">
                        <text class="sub_title">配送运费</text>
                        <text class="sub_title">¥ {{item.shippingFreight | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10" v-if="item.cost != 0 && item.cost !='0'">
                        <text class="sub_title">货款结算</text>
                        <text class="sub_title">¥ {{item.cost | currencyfmt}}</text>
                    </div>
                    <div class=" space-between mt10 " v-if="item.adminFreight !=0 && item.adminFreight !='0'">
                        <text class="sub_title">送货工资</text>
                        <text class="sub_title">¥ {{item.adminFreight | currencyfmt}}</text>
                    </div>
                    <div class="space-between mt10" v-if="item.amountPayable !=0 && item.amountPayable != '0'">
                        <text class="sub_title ">应收金额:¥{{item.amountPayable | currencyfmt}}(上期欠款:¥{{item.arrears | currencyfmt}})</text>
                        <text class="sub_title ">实收金额:¥{{item.amountPaid | currencyfmt}}</text>
                    </div>
                    <div class="space-between mt10" v-if="item.paperPayable != 0 && item.paperPayable != '0'">
                        <text class="sub_title ">应收水票:{{item.paperPayable}}(上期欠票:{{item.ticket}})</text>
                        <text class="sub_title ">实收水票:{{item.paperPaid}}</text>
                    </div>
                    <div class="space-between mt10" v-if="item.borrow !=0"  @click="goBarrel(item.cardId,item.memberId)">
                        <text class="sub_title ">上期借桶:{{item.borrow}}</text>
                        <text  :style="{fontFamily:'iconfont'}" class="fz28 gray">&#xe630;</text>
                    </div>
                </div>
                <div class="infoWhiteColor boder-bottom mt20">
                    <div class="goodsBody">
                        <text class="fz32">订单信息</text>
                    </div>
                </div>
                <div class="infoWhiteColor ">
                    <div class="priceLine boder-bottom">
                        <div class="space-between">
                            <text class="sub_title">订单编号: {{item.orderSn}}</text>
                            <text @click="copyCode(item.orderSn)"  class="sub_title copyBtn copyBorder ml20">复制</text>
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
                </div>
                <div class="infoWhiteColor" >
                    <div class="infoWhiteColor" >
                        <div class="priceLine boder-bottom">
                    <div>
                        <text class="sub_title ">支付方式: {{item.paymentMethod}}</text>
                    </div>
                    <div class="mt10">
                        <text class="sub_title ">支付状态: {{item.paymentStatus | watchPaymentStatus}}</text>
                    </div>
                        </div>
                    </div>
                </div>
                <div style="height: 100px;"></div>
                <div class="flex-row space-between goodsFoot boder-top" >
                    <div class="footMore">
                        <!--<text class="title" style="color: #444">删除订单</text>-->
                    </div>
                    <div class="flex-row">
                        <text @click="print()" class="title footText ">打印</text>
                    </div>
                </div>
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
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 30px;
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
    const printer = weex.requireModule('print');
    var modal = weex.requireModule('modal');
    export default {
        data:function() {
            return{
                ordersList: [],
                refreshing: false,
                pageStart: 0,
                pageSize: 15,
//            refreshImg:utils.locate('resources/images/loading.png'),
                shippingSn:'',
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
                roles:''
            }
        },
        props: {
            noDataHint: {default: '暂无详情'},
            title: {default: '运单详情'}
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
            let _this = this;
            this.shippingSn = utils.getUrlParameter('sn');
            utils.getToken(function (mes) {
                _this.roles = mes.roles;
                _this.open();
            });//获取权限
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
                        GET('weex/member/shipping/print.jhtml?sn='+_this.shippingSn+"&seqno=1", function (data) {
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

                event.openURL(utils.locate('view/shop/card/view.js?id='+id),function () {

                })

            },
            open:function () {
                let _this = this;
                POST('weex/member/shipping/view.jhtml?sn=' + this.shippingSn).then(function (data) {
                    if(data.type == 'success'){
                        _this.ordersList = [];
                        _this.ordersList.push(data.data);
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
            copyCode(sn){
                clipboard.setString(sn);
                event.toast('单号复制成功');
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
            goBarrel(cardId,memberId){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/shop/card/barrel.js?cardId='+cardId+'&memberId='+memberId+"&lock=true"),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
        }
    }
</script>
