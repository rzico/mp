<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller >
            <noData :noDataHint="noDataHint" v-if="ordersList.length == 0"></noData>
            <!--导航栏-->
            <div v-else v-for="(item,index) in ordersList" >
                <div  v-for="c in item.shippingBarrels">
                    <div class="setting">
                        <div class="titile">
                            <text class="fz28">{{c.name}}</text>
                        </div>
                        <div class="money">
                            <text class="fz28">送{{c.quantity}}桶，回{{c.quantity}}桶，押{{c.pledgeQuantity}}桶，退{{c.refundsQuantity}}桶</text>
                        </div>
                    </div>
                </div>
                <div class="header mt20 flex-row">
                    <div class="priceLine">
                        <div class="flex-column" v-if="item.amountPaid>0">
                            <text class="herderText">实收现金</text>
                            <div class="flex-row">
                                <text style="font-size: 65px">¥</text>
                                <text class="herderAmount">{{item.amountPaid}}</text>
                            </div>
                        </div>
                        <div class="flex-column" v-if="item.paperPaid>0">
                            <text class="herderText">实收水票</text>
                            <div class="flex-row">
                                <text style="font-size: 65px"></text>
                                <text class="herderAmount">{{item.paperPaid}}张</text>
                            </div>
                        </div>

                        <div class="space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title ">支付方式: {{item.paymentMethod}}</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height" @click="chooseFloor">
                            <text class="sub_title">应收金额:</text>
                            <text class="sub_title">{{item.amountPayable}}元(上期欠款:{{item.arrears}}元)</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height" @click="chooseFloor">
                            <text class="sub_title">应收水票:</text>
                            <text class="sub_title">{{item.paperPayable}}张(上期欠票:{{item.ticket}}张)</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">运费:</text>
                            <text class="sub_title">{{item.freight}}</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">空桶押金:</text>
                            <text class="sub_title">{{item.pledgePayable}}</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">所在楼层:</text>
                            <text class="sub_title">{{item.receiver.level}}</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">结算货款:</text>
                            <text class="sub_title">{{item.cost}}</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">配送费用:</text>
                            <text class="sub_title">{{item.shippingFreight}}</text>
                        </div>
                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">送货工资:</text>
                            <text class="sub_title">{{item.adminFreight}}(楼层费:{{item.levelFreight}})</text>
                        </div>

                        <div class=" space-between  bt10 headerCellBg cell_height">
                            <text class="sub_title">备注:</text>
                            <input class="max_input" placeholder="请输入备注" v-model="message"/>
                        </div>
                        <div class="button" @click="confirm()">
                            <text class="fz40 primary">核销</text>
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
                            <text class="sub_title copyBtn copyBorder ml20"  @click="copyCode(item.sn)">复制</text>
                        </div>
                        <div class="mt10 ">
                            <text class="sub_title">下单时间: {{item.createDate | watchCreateDate}}</text>
                        </div>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">支付方式: {{item.paymentMethod}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt0">
                        <text class="sub_title ">支付状态: {{item.paymentStatus | watchPaymentStatus}}</text>
                    </div>
                    <div class="infoLines pb10">
                        <text class="sub_title ">配送方式: {{item.shippingMethod | watchShippingMethod}}</text>
                    </div>
                    <div class="infoLines pt0 pb10">
                        <text class="sub_title ">配送状态: {{item.shippingStatus | watchShippingStatus}}</text>
                    </div>
                    <div class="infoLines pt0 pb10">
                        <text class="sub_title ">配送站点: {{item.shopName}}</text>
                    </div>
                    <div class="infoLines pt0 pb0">
                        <text class="sub_title ">配送人员: {{item.track.name}}  {{item.track.mobile}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt10">
                        <text class="sub_title ">预约时间: {{item.hopeDate | watchCreateDate}}</text>
                    </div>
                    <div class="infoLines pb10 ">
                        <text class="sub_title ">留言: {{item.memo}}</text>
                    </div>
                    <div class="infoLines boder-bottom pt0">
                        <text class="sub_title ">买家留言: {{item.orderMemo}}</text>
                    </div>
                </div>

            </div>
        </scroller>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .herderText{
        font-size: 32px;
        color: #999;
    }
    .amountInput{
        font-size: 28px;
        color: red;
        width: 150px;
        height: 50px;
        line-height: 48px;
    }
    .herderAmount{
        font-size: 80px;
        color:red;
    }
    .setting{
        background-color: white;
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 25px;
        border-width: 1px;
        border-color: #cccccc;
        border-radius: 15px;
        overflow: hidden;
    }
    .titile{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        /*border-radius: 15px;*/
        padding-left: 30px;
        padding-right: 30px;
        background-image: linear-gradient(to right, pink,#5eb0fd);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 80px;
    }
    .money{
        padding-left: 30px;
        border-top-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 80px;
    }
    .note{
        padding-left: 30px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
    }
    .monyeTextthree{
        padding-left: 20px;
    }

    .input{
        padding-left: 20px;
        width: 120px;
        font-size: 28px;
        color: red;
        height: 100px;
    }
    /*.input{*/
        /*font-size: 28px;*/
        /*color: #999;*/
        /*width: 500px;*/
        /*text-align: right;*/
    /*}*/
    .min_input{
        font-size: 28px;
        color: #999;
        width: 100px;
        height: 50px;
        line-height: 40px;
        text-align: right;
    }
    .max_input{
        font-size: 30px;
        color: #999;
        width: 410px;
        height: 50px;
        line-height: 40px;
        text-align: right;
    }
    .cell_height{
        height: 50px;
    }
    .headerCellBg{
        background-color: white;
    }
    .headerCellBg:active{
        background-color: #ccc;
    }
    .button{
        height:80px;
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
    .hasPb100{
        padding-bottom: 100px;
    }
    .copyBorder{
        border-color: #ccc;
        border-width: 1px;
        border-style: solid;
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
        width: 690px;
    }
    /**/
    .paymentMethodBox{
        width: 690px;
        align-items: center;
        justify-content: center;
        padding-bottom: 20px;
    }
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
        data:function() {
            return{
                ordersList: [],
                refreshing: false,
                pageStart: 0,
                pageSize: 15,
                begin:0,
                beginTwo:0,
                orderSn:'',
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
                isobject:'线下月结',
                shopMoney:0,
                message:''
            }
        },
        props: {
            noDataHint: {default: '暂无运单'},
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
            },
            wacthFloor(e){
                if(e == 0){
                    return '有电梯'
                }else{
                    return e
                }
            }
        },
        components: {
            navbar, noData
        },
        created() {
            utils.initIconFont();
            this.orderSn = utils.getUrlParameter('orderSn');
            this.shippingSn = utils.getUrlParameter('sn');
            this.open();
            this.permissions()
        },
        methods: {
            chooseFloor:function () {
                let _this = this
                picker.pick({
                    index:_this.beginTwo,
                    items:[0,1,2,3,4,5,6,7,8,9]
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.ordersList[0].receiver.level = 0;
                            _this.beginTwo = e.data;
                        }else if(e.data == 1){
                            _this.ordersList[0].receiver.level = 1;
                            _this.beginTwo = e.data;
                        }else if(e.data == 2){
                            _this.ordersList[0].receiver.level = 2;
                            _this.beginTwo = e.data;
                        }else if(e.data == 3){
                            _this.ordersList[0].receiver.level = 3;
                            _this.beginTwo = e.data;
                        }else if(e.data == 4){
                            _this.ordersList[0].receiver.level = 4;
                            _this.beginTwo = e.data;
                        }else if(e.data == 5){
                            _this.ordersList[0].receiver.level = 5;
                            _this.beginTwo = e.data;
                        }else if(e.data == 6){
                            _this.ordersList[0].receiver.level = 6;
                            _this.beginTwo = e.data;
                        }else if(e.data == 7){
                            _this.ordersList[0].receiver.level = 7;
                            _this.beginTwo = e.data;
                        }else if(e.data == 8){
                            _this.ordersList[0].receiver.level = 8;
                            _this.beginTwo = e.data;
                        }else if(e.data == 9){
                            _this.ordersList[0].receiver.level = 9;
                            _this.beginTwo = e.data;
                        }
                    }
                })
            },
            open:function () {
                let _this = this;
                GET('weex/member/shipping/calcView.jhtml?orderSn=' + this.orderSn,function (data) {
                    if(data.type == 'success'){
                        _this.shippingSn = data.data.sn;
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
//            点击核销
            confirm:function () {
                let _this = this
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.permissions();
                    _this.clicked = false;
                    return
                }

                POST('weex/member/shipping/lock.jhtml?sn='+this.shippingSn,).then(function (data) {

                        if(data.type == 'success'){
                            if(data.data == true){
//                                var body = [];
//                                _this.ordersList[0].shippingBarrels.forEach(function(item,index){
//                                    if(utils.isNull(item.quantity)){
//                                        item.quantity = 0;
//                                    }if(utils.isNull(item.returnQuantity)){
//                                        item.returnQuantity = 0;
//                                    }if(utils.isNull(item.pledgeQuantity)){
//                                        item.pledgeQuantity = 0;
//                                    }
//                                    body.push({
//                                        id:item.barrelId,
//                                        quantity:item.quantity,
//                                        returnQuantity:item.returnQuantity,
//                                        pledgeQuantity:item.pledgeQuantity
//                                    });
//                                });
//                                body = JSON.stringify(body);

                                POST('weex/member/shipping/completed.jhtml?sn='+_this.shippingSn+'&memo=' + encodeURIComponent(_this.message) +'&level=' + _this.ordersList[0].receiver.level+'&amountPaid='+amountData + '&paperPaid='+paperData,body).then(
                                    function (data) {
                                        _this.clicked = false;
                                        if(data.type == 'success'){
                                            let E = utils.message('success','核销成功','')
                                            event.closeURL(E);
                                        }else{
                                            event.toast(data.content);
                                        }
                                    },
                                    function (err) {
                                        _this.clicked = false;
                                        event.toast(err.content);
                                    })
                            }else {
                                _this.clicked = false;
                                event.toast('该订单他人正在操作，请稍后...')
                            }

                        }else{
                            _this.clicked = false;
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    })
            },

        }
    }
</script>