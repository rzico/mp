<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller   @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <noData :noDataHint="noDataHint" v-if="ordersList.length == 0"></noData>
            <!--导航栏-->
            <div v-else v-for="(item,index) in ordersList" class="" >
                <div class="header mt20 flex-row">
                    <div class="info">
                        <div class="setting" @click="pickPattern()">
                            <div class="flex-row">
                                <text class="fz32">配送站:  {{isPattern}}</text>
                            </div>
                            <div class="flex-row flex-end">
                                <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                        <div class="setting" @click="goMarki()">
                            <div class="flex-row">
                                <text class="fz32">配送员:  {{isMarki}}</text>
                            </div>
                            <div class="flex-row flex-end">
                                <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                        <div class="setting" >
                            <div class="flex-row">
                                <text class="fz32">备注    :</text>
                                <input class="input" placeholder="请输入备注" v-model="message"/>
                            </div>
                            <div class="flex-row flex-end" @click="linkTo()">
                                <div class="chooseBox"><text class="fz28 primary">快速话语</text> </div>
                            </div>
                        </div>
                        <div class="button" @click="complete()">
                            <text class="fz40 primary">{{buttonText}}</text>
                        </div>
                    </div>
                </div>
                <div class="addressBox flex-row mt20">
                    <div style="width: 70px;">
                        <text class="addressIcon" :style="{fontFamily:'iconfont'}">&#xe792;</text>
                    </div>
                    <div style="width: 630px">
                        <div class="flex-row">
                            <text class="title">{{item.receiver.consignee}}</text>
                            <text class="title ml20">{{item.receiver.phone}}</text>
                            <text class="sub_title copyBtn copyBorder ml20"  @click="callPhone(item.receiver.phone)">拨号</text>
                        </div>
                        <div class="mt10">
                            <text class="sub_title" style="line-height: 42px">地址: {{item.receiver.areaName}}{{item.receiver.address}}</text>
                        </div>
                    </div>
                </div>
                <div class="goodsLine mt20">
                    <div class="space-between goodsHead boder-bottom">
                        <div class="flex-row">
                            <image :src="item.logo" class="shopImg"></image>
                            <text class="title ml20 mr20">{{item.name}}</text>
                            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                        </div>
                    </div>
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
                <div class="mt20 infoWhiteColor">
                    <div class="infoLines boder-bottom">
                        <div class="flex-row">
                            <text class="sub_title">订单编号: {{item.orderSn}}</text>
                            <text class="sub_title copyBtn copyBorder ml20"  @click="copyCode(item.orderSn)">复制</text>
                        </div>
                        <div class="mt10 ">
                            <text class="sub_title">下单时间: {{item.createDate | watchCreateDate}}</text>
                        </div>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">支付方式: {{item.paymentMethod | watchPayMethod}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt0">
                        <text class="sub_title ">支付状态: {{item.paymentStatus | watchPaymentStatus}}</text>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">配送方式: {{item.shippingMethod | watchShippingMethod}}</text>
                    </div>
                    <div class="infoLines pt0 pb0">
                        <text class="sub_title ">配送状态: {{item.shippingStatus | watchShippingStatus}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt10" v-if="item.hopeDate!=''">
                        <text class="sub_title ">预约时间: {{item.hopeDate | watchCreateDate}}</text>
                    </div>
                    <div class="infoLines pb10 " v-if="item.memo != ''">
                        <text class="sub_title ">留言: {{item.memo}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt0" v-if="item.orderMemo != ''">
                        <text class="sub_title ">买家留言: {{item.orderMemo}}</text>
                    </div>
                </div>
                <!--<div class="mt20  infoWhiteColor" >-->
                    <!--<div class="priceLine boder-bottom">-->
                        <!--<div class="space-between">-->
                            <!--<text class="sub_title">商品总额</text>-->
                            <!--<text class="sub_title">¥{{item.orderItems[0].price | currencyfmt}}</text>-->
                        <!--</div>-->
                        <!--<div class=" space-between mt10 bt10">-->
                            <!--<text class="sub_title">优惠折扣</text>-->
                            <!--<text class="sub_title">-{{item.couponDiscount | currencyfmt}}</text>-->
                        <!--</div>-->
                        <!--<div class=" space-between">-->
                            <!--<text class="sub_title">+ 运费</text>-->
                            <!--<text class="sub_title">¥0.00</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="flex-row space-between goodsFoot boder-top" >-->
                    <!--<div class="footMore">-->

                    <!--</div>-->
                    <!--<div class="flex-row">-->
                        <!--<text class="title footText" @click="">派单</text>-->
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
    .chooseBox{
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        border-color: #5eb0fd;
        border-width: 1px;
    }
    .input{
        width: 360px;
        height: 80px;
        line-height: 40px;
        font-size: 32px;
        padding-left:20px;
        padding-top: 3px;
    }
    .info{
        flex-direction: column;
        justify-content: center;
        padding: 30px;
        border-color:#ccc;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
    }
    .button{
        height:80px;
        width: 568px;
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 10px;
        border-width: 1px;
        border-color: #5eb0fd;
        border-radius: 15px;
        align-items: center;
        justify-content: center;
    }
    .button:active{
        background-color: #cccccc;
    }
    .setting{
        margin-top: 20px;
        border-color:#ccc;
        height: 80px;
        width: 630px;
        border-bottom-width: 1px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
        width: 750px;
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
    const picker = weex.requireModule('picker');
    var modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {
                isMarki:'',
                beginPattern:0,
                isPattern:'',
                ordersList: [],
                refreshing: false,
                pageStart: 0,
                pageSize: 15,
//            refreshImg:utils.locate('resources/images/loading.png'),
                orderSN:'',
                shippingSn:'',
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
                markiId:'',
                shopId:'',
                message:'',
                roles:'',
                isPageType:false,
                isSelf:false,
                buttonText:'派单'
            }
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
            navbar,noData
        },
        props: {
            title: {default: "派单"},
        },
        created() {
            utils.initIconFont();
            this.orderSn = utils.getUrlParameter('orderSn');
            this.shippingSn = utils.getUrlParameter('sn');
            this.isPageType = utils.getUrlParameter('isPageType');
            this.isSelf = utils.getUrlParameter('isSelf');
            if(this.isPageType == false || this.isPageType == 'false'){
                this.title = '转派';
                this.buttonText = '转派'
            }
            this.open();
            this.permissions()
        },
        methods: {
            open:function () {
                let _this = this;
                GET('weex/member/shipping/view.jhtml?sn=' + this.shippingSn,function (data) {
                    if(data.type == 'success'){
                        _this.ordersList = [];
                        _this.ordersList.push(data.data);
                        if(!utils.isNull(data.data.shopId)){
                            _this.isPattern = data.data.shopName;
                            _this.shopId = data.data.shopId
                        }
                        if(!utils.isNull(data.data.adminId)){
                            _this.markiId = data.data.adminId;
                            _this.isMarki = data.data.adminName
                        }
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
            //            联系收货人
            callPhone:function (telPhone) {
                phone.tel(telPhone,function(){
                    return;
                })
            },
            goback(){
                event.closeURL();
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
            //            设置配送站
            pickPattern:function () {

                    if (this.clicked) {
                        return;
                    }
                    this.clicked = true;
                    var _this = this;
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.permissions();
                    _this.clicked = false;
                    return
                }
//                本水站的单允许选择站点
                if(this.isSelf == true || this.isSelf == 'true'){
                    event.openURL(utils.locate('view/shop/shipping/station.js'), function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != '') {
                            _this.isPattern = data.data.name;
                            _this.shopId = data.data.id;
                            _this.isMarki = '';
                            _this.markiId = ''
                        }
                    })
                }else {
                    _this.clicked = false;
                }

            },
            //            跳转备注快速话语
            linkTo: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('widget/list.js?type=xdict'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.message = data.data.listName;
                    }
                })

            },

//            跳转配送员
            goMarki:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(utils.isNull(this.shopId)){
                    event.toast('请先选择配送站');
                    _this.clicked = false;
                    return
                }
                    event.openURL(utils.locate('view/shop/shipping/marki.js?shopId='+ this.shopId),function (data) {
                        _this.clicked = false;
                        if(data.type=='success') {
                            _this.isMarki = data.data.name;
                            _this.markiId = data.data.id
                        }
                    });
                },
//            完成
            complete:function () {
                let _this =this
                if(utils.isNull(this.shopId)){
                    event.toast('请选择配送站');
                    return
                }
                //                派单必须选择送水工
                if(this.isPageType == true || this.isPageType == 'true'){
                    if(utils.isNull(this.markiId)){
                        event.toast('请选择配送人员');
                        return
                    }
                }
                POST('weex/member/shipping/lock.jhtml?sn='+this.shippingSn,).then(function (data) {
                        if(data.type == 'success'){
                        if(data.data == true){
                            POST('weex/member/shipping/dispatch.jhtml?sn='+_this.shippingSn+'&shopId='+_this.shopId+'&adminId='+_this.markiId +'&memo=' +encodeURIComponent(_this.message)).then(
                                function (data) {
                                    if(data.type == 'success'){
                                        let E = utils.message('success','派单成功','')
                                        event.closeURL(E);
                                    }else{
                                        event.toast(data.content);
                                    }
                                },
                                function (err) {
                                    event.toast(err.content);
                                })
                        }else {
                            event.toast('该订单他人正在操作，请稍后...')
                        }

                        }else{
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })
            }
        }
    }
</script>