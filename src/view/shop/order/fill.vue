<template>
    <div class="wrapper">
        <div class="header  bkg-primary"  :class="[classHeader()]">
            <!--顶部导航-->
            <div class="nav nw">
                <div style="width: 50px;" @click="goback()">
                    <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
                </div>
                <!--导航栏名字头像-->
                <div class="userBox">
                    <text class="navText">{{title}}</text>
                </div>
                <div style="width: 50px;">
                </div>
            </div>
        </div>
        <div class="addressBox bkg-primary pb30" v-if="isShow" @click="jump(cardId)">
            <text class="address">{{member.areaName}}{{member.address}}</text>
        </div>
        <div class="memberCard" @click="gocard()">
            <text class="fz32" v-if="!isShow">点击选择会员</text>
            <div class="flex-row" v-if="isShow" >
            <!--<image class="memberLogo" :src="memberlogo"></image>-->
                <text class="fz28 ml20">{{member.consignee}}</text>
                <text class="fz28 ml20">{{member.phone}}</text>
            </div>
            <text  :style="{fontFamily:'iconfont'}" style="color: #888;font-size: 32px">&#xe630;</text>
        </div>
        <scroller>
        <div class="infoContent"  v-if="isShow">
            <div class="goodsListBox" ref="cardRef" v-for="(c,index) in cart">
                <div class="deleteBox bkg-delete" @click="del(c.id,index)">
                    <text class="deleteText">删除</text>
                </div>
                <div class="goodsCell"  @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
                    <text class="goodsTitle">{{c.name}}</text>
                    <div class="goodsNumberBox" >
                        <text class="fz24 mr10">数量</text>
                        <input class="numberInput" type="number" autofocus="true" v-model="c.quantity" @change="numberChange(c)"/>
                    </div>
                    <div class="goodsMoneyBox">
                        <text class="fz24 ml10 mr10" style="">单价</text>
                        <input class="moneyInput" type="number" v-model="c.price" @change="moneyChange(c)"/>
                    </div>
                </div>
            </div>
            <div class="addGoods" @click="goGoods">
                <text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 70px;margin-top: 7px">&#xe617;</text>
                <text class="fz32 ml20" style="color: #999">点击添加商品</text>
            </div>
            <div class="sendBox">
                <div class="typeBox" @click="pickPay()">
                    <text class="fz32">付款方式:</text>
                    <div class="flex-row">
                        <text class="typeBoxText">{{paymentPluginName}}</text>
                        <text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 32px">&#xe630;</text>
                    </div>
                </div>
                <!--<div class="typeBox" @click="pickSend()">-->
                    <!--<text class="fz32">发货方式:</text>-->
                    <!--<div class="flex-row">-->
                        <!--<text class="typeBoxText">{{sendObject | watchSendType}}</text>-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 32px">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="typeBox" v-if="hasWater">
                    <div class="flex-row">
                        <text class="fz32">收押金:</text>
                        <input type="number" class="mortgageInput"  placeholder="请输入押金" v-model="deposit" @change="getmoneyTotal"/>
                    </div>
                    <div class="flex-row">
                        <text class="fz32">押桶数:</text>
                        <input type="number" class="mortgageInput" placeholder="请输入押桶数" v-model="barrel" @change="getmoneyTotal"/>
                    </div>
                </div>
                <div class="typeBox" @click="pickPattern()">
                    <text class="fz32">配送站点:</text>
                    <div class="flex-row">
                        <text class="typeBoxText">{{shopName}}</text>
                        <text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 32px">&#xe630;</text>
                    </div>
                </div>
                <div class="typeBox" @click="goMarki()">
                    <text class="fz32">配送人员:</text>
                    <div class="flex-row">
                        <text class="typeBoxText">{{adminName}}</text>
                        <text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 32px">&#xe630;</text>
                    </div>
                </div>
                <div class="typeBox" @click="pickDate()">
                    <text class="fz32">预约时间:</text>
                    <div class="flex-row">
                        <text class="typeBoxText">{{dateTime}}</text>
                        <text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 32px">&#xe630;</text>
                    </div>
                </div>
                <!--<div class="floorBox" @click="chooseFloor()">-->
                    <!--<text class="fz32">楼层:</text>-->
                    <!--<div class="flex-row">-->
                        <!--<text class="floorBoxText">{{floor | wacthFloor}}</text>-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 32px">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="memoBox" >
                    <text class="fz32">备注:</text>
                    <div class="flex-row">
                        <input class="memoInput" placeholder="请输入备注" v-model="memoData"/>
                        <div class="flex-row flex-end ml10" @click="linkTo">
                            <div class="chooseBox"><text class="fz28 primary" >快速话语</text> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="moneyBox">
                <div class="flex-row space-between pb10" v-if="amountPayable>0 || arrears>0">
                    <text class="moneyBoxText" style="color:red;">应收金额: {{amountPayable}}元(上期欠款: {{arrears}}元)</text>
                </div>
                <div class="flex-row space-between pb10" v-if="paperPayable>0 || ticket>0">
                    <text class="moneyBoxText" style="color:red;">应收水票: {{paperPayable}}张(上期欠票: {{ticket}}张)</text>
                </div>
                <div class="flex-row space-between pb10" v-if="order!=null && order.freight>0">
                    <text class="moneyBoxText" >运费(楼层费): {{order.freight}}元</text>
                </div>
                <div class="flex-row space-between pb10" v-if="order!=null && order.exchangeDiscount>0">
                    <text class="moneyBoxText" >电子券支付: {{order.exchangeDiscount}}元</text>
                </div>
                <div class="flex-row space-between pb10" v-if="order!=null && order.couponDiscount>0">
                    <text class="moneyBoxText" >优惠折扣: {{order.couponDiscount}}元</text>
                </div>
                <div class="flex-row space-between pb10" v-if="order!=null && order.pointDiscount>0">
                    <text class="moneyBoxText" >积分支付: {{order.pointDiscount}}元</text>
                </div>
            </div>

        </div>
        <div class="button bkg-primary" v-if="isShow" @click="confirm()">
            <text class="buttonText">确认</text>
        </div>
            <div style="height: 400px"></div>
        </scroller>
        <date @confirm="confirmDate" @cancel="cancel" :isMask="isMask"></date>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .deleteText{
        font-size: 28px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 100px;align-items: center;width: 100px;justify-content: center;
    }
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#eeeeee;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .navText {
        font-size: 33px;
        color: #fff;
    }
    .userBox {
        flex-direction: row;
        align-items: center;
    }
    .nw {
        width: 750px;
        padding-right: 30px;
        padding-left: 30px;
    }
    .addressBox{
        width: 750px;
        flex-direction: column;
        align-items: center;
    }
    .address{
        padding-left: 60px;
        padding-right: 60px;
        text-align:center;
        font-size: 32px;
        line-height:32px;
        color: white;
        lines:2;
        text-overflow: ellipsis;
    }
    .memberName{
        font-size: 28px;
        color: #fff;
        max-width: 200px;
        lines:1;
        text-overflow: ellipsis;
    }
    .memberTel{
        margin-left: 20px;
        font-size: 28px;
        color: #fff;
        font-weight: 300;
    }
    .memberCard{
        width: 710px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        justify-content:space-between;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        padding-left: 30px;
        padding-right: 30px;
        background-color: white;
    }
    .infoContent{
        width: 710px;
        padding:30px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
        background-color: white;
    }
    .goodsListBox{
        overflow: hidden;
    }
    .goodsCell{
        background-color: white;
        flex-direction: row;
        align-items: center;
        height: 100px;
        border-bottom-width: 1px;
        border-style: dashed;
        border-color: #cccccc;
    }
    .goodsTitle{
        font-size: 32px;
        width: 350px;
        lines:1;
        text-overflow: ellipsis;
    }
    .goodsNumberBox{
        margin-left: 10px;
        flex-direction: row;
        align-items: center;
    }
    .goodsMoneyBox{
        flex-direction: row;
        align-items: center;
    }
    .numberInput{
        padding-left: 5px;
        width: 80px;
        height: 80px;
        line-height: 70px;
        font-size: 28px;
        border-width: 1px;
        border-color: #cccccc;
        /*text-align: center;*/
    }
    .moneyInput{
        padding-left: 5px;
        width: 80px;
        height: 80px;
        line-height: 70px;
        font-size: 28px;
        border-width: 1px;
        border-color: #cccccc;
        /*text-align: center;*/
    }
    .moneyBox{
        border-top-width: 5px;
        border-color:#eee;
        padding-top: 30px;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 20px;
    }
    .moneyBoxText{
        font-size: 32px;
    }
    .mortgageInput{
        width:200px;
        height: 100px;
        line-height: 99px;
        font-size: 32px;
        padding-top: 3px;
        padding-left:10px;
    }
    .moneyBoxMoney{
        font-size: 40px;
        font-weight:600;
    }
    .sendBox{
        margin-top: 20px;
        border-top-width: 5px;
        border-color:#eee;
    }
    .typeBox{
        background-color: white;
        height: 100px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .typeBoxText{
        font-size: 32px;
        color: #888888;
        margin-right: 10px;
    }
    .floorBox{
        background-color: white;
        height: 100px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .floorBoxText{
        font-size: 32px;
        color: #888888;
        margin-right: 10px;
        padding-top: 2px;
    }
    .memoBox{
        background-color: white;
        height: 100px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .memoInput{
        height: 80px;
        width: 400px;
        line-height: 75px;
        font-size: 32px;
        color: #888888;
        text-align: right;
        padding-right: 10px;
    }
    .button{
        height: 80px;
        width: 650px;
        margin-left: 50px;
        margin-right: 50px;
        margin-top: 30px;
        margin-bottom: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
    }
    .button:active {
        background-color:#ccc;
    }
    .buttonText{
        font-size: 40px;
        color: white;
    }
    .memberLogo{
        width: 60px;
        height: 60px;
        border-width: 5px;
        border-color: #eeeeee;
        border-radius: 100%;
    }
    .addGoods{
        height: 120px;
        margin-top: 20px;
        border-width: 1px;
        border-color: #ccc;
        border-radius: 10px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .chooseBox{
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        border-color: #5eb0fd;
        border-width: 1px;
    }
</style>
<script>
    import {dom,event,stream,storage,animation} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    import date from '../../../widget/date.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    var animationPara;//执行动画的消息
    export default {
        data: function () {
            return {
                clicked:false,
                choose:true,
                isShow:false,
                cart:[],
                product:[],
                effectivePrice:0,
                quantity:0,
                paymentPluginId:'cashPayPlugin',
                paymentPluginName:'现金支付',
                sendObject:'warehouse',
                floor:0,
                begin:0,
                beginTwo:0,
                beginThree:0,
                memoData:'',
                member:{},
                memberId:'',
                addressId:'',
                memberlogo:'',
                memberName:'',
                goodsName:'',
                dateTime:'',
                isMask:false,
                isSelf:false,
                shopName:'',
                shopId:'',
                adminName:'',
                adminId:'',
                payName:[],
                payId:[],
                barrel:'',
                deposit:'',
                amountPayable:'',
                arrears:'',
                paperPayable:'',
                ticket:'',
                version:0,
                orderSn:'',
                paySn:'',
                hasWater:false,
                order:null,
            }
        },
        components: {
            navbar,date
        },
        props: {
            title: {default: "人工报单"},
        },
        filters: {
            watchSendType:function (val) {
                if(val == 'shipping'){
                    return'普通快递'
                }else if(val == 'warehouse'){
                    return'同城配送'
                }else if(val == 'pickup'){
                    return'线下自提'
                }else if(val == 'cardbkg'){
                    return'虚拟商品'
                }
            },
            wacthFloor(e){
                if(e == 0){
                    return '有电梯'
                }else{
                    return e
                }
            }
        },
        created() {
            utils.initIconFont();
            var _this = this;
            this.version = utils.version;
            _this.payName =[];
            _this.payId = [];
            GET('payment/plugin.jhtml',function (mes) {
                if (mes.type == 'success') {
                    mes.data.forEach(function (item) {
                        _this.payName.push(item.name);
                        _this.payId.push(item.paymentPluginId)
                    })
                } else {
                    event.toast(mes.content);
                }
            }, function (err) {
                event.toast(err.content)
            });

//            清空购物车
            POST('weex/cart/clear.jhtml').then(function (res) {
                if (res.type == 'success') {

                } else {
                    event.toast(res.content);
                }
            }, function (err) {
                event.toast(err.content)
            })
        },
        methods: {
            //            监听设备型号,控制导航栏高度
            classHeader: function() {
                let dc = utils.device();
                return dc;
            },
            goback(){
                event.closeURL();
            },
            pickDate(){
              this.isMask = true
            },
            confirmDate(e){
                this.isMask = false;
                this.dateTime = e
            },
            cancel(){
                this.isMask = false;
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
                        _this.memoData = data.data.listName;
                    }
                })
            },
//            设置配送站
            pickPattern:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/shop/shipping/station.js'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.shopName = data.data.name;
                        _this.shopId = data.data.id;
                        _this.isSelf = data.data.isSelf;
                        _this.adminName = '';
                        _this.adminId = ''
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
                        _this.adminName = data.data.name;
                        _this.adminId = data.data.id
                    }
                });
            },
            //            获取member信息跟商品合计
            getInfo:function () {
                var _this = this;
                POST('weex/member/order/info.jhtml?memberId='+this.memberId +'&receiverId='+this.addressId+'&paymentPluginId='+_this.paymentPluginId).then(function (data) {
                    if (data.type == 'success') {
                        _this.member = data.data.receiver;
                        _this.shopName = data.data.receiver.shopName;
                        _this.shopId = data.data.receiver.shopId;
//                        _this.adminName = data.data.receiver.adminName;
//                        _this.adminId = data.data.receiver.adminId;
                        _this.floor = data.data.receiver.level;
                        _this.beginTwo = data.data.receiver.level;
                        _this.addressId = data.data.receiver.id;
                        _this.effectivePrice = data.data.price;//  商品合计
                        _this.amountPayable = data.data.amountPayable ;// 应付金额
                        _this.arrears = data.data.arrears ; //  上期欠款
                        _this.paperPayable = data.data.paperPayable;//   应收水票
                        _this.ticket = data.data.ticket;// 上期欠票
                        _this.hasWater = data.data.hasWater;
                        _this.cardId= data.data.cardId;
                        _this.cartList();
                    } else {
                        event.toast(data.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            jump:function (id) {
                let _this =this;

                event.openURL(utils.locate('view/shop/card/view.js?id='+id),function () {

                })

            },
//           获取商品合计
            getmoneyTotal:function () {
                var _this = this;
                POST('weex/member/order/calculate.jhtml?memberId='+this.memberId +'&receiverId='+this.addressId+'&paymentPluginId='+_this.paymentPluginId+'&pledge='+_this.deposit +'&pledgeQuantity='+_this.barrel).then(function (data) {
                    if (data.type == 'success') {
                        _this.amountPayable = data.data.amountPayable ;// 应付金额
                        _this.arrears = data.data.arrears ; //  上期欠款
                        _this.paperPayable = data.data.paperPayable;//   应收水票
                        _this.ticket = data.data.ticket;// 上期欠票
                        _this.hasWater = data.data.hasWater;
                        _this.order = data.data;
                    } else {
                        event.toast(data.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            选择付款方式
            pickPay:function () {
                let _this = this
//                获取支付方式
                        picker.pick({
                            index:_this.begin,
                            items: _this.payName
                        }, e => {
                            if (e.result == 'success') {
                                var dataIndex = e.data;
                                _this.begin = e.data;
                                _this.paymentPluginId = _this.payId[dataIndex];
                                _this.paymentPluginName = _this.payName[dataIndex];
                                _this.getmoneyTotal()
                            }
                        })


            },
//            选择楼层
            chooseFloor:function () {
                let _this = this
                picker.pick({
                    index:_this.beginTwo,
                    items:[0,1,2,3,4,5,6,7,8,9]
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.floor = 0;
                            _this.beginTwo = e.data;
                        }else if(e.data == 1){
                            _this.floor = 1;
                            _this.beginTwo = e.data;
                        }else if(e.data == 2){
                            _this.floor = 2;
                            _this.beginTwo = e.data;
                        }else if(e.data == 3){
                            _this.floor = 3;
                            _this.beginTwo = e.data;
                        }else if(e.data == 4){
                            _this.floor = 4;
                            _this.beginTwo = e.data;
                        }else if(e.data == 5){
                            _this.floor = 5;
                            _this.beginTwo = e.data;
                        }else if(e.data == 6){
                            _this.floor = 6;
                            _this.beginTwo = e.data;
                        }else if(e.data == 7){
                            _this.floor = 7;
                            _this.beginTwo = e.data;
                        }else if(e.data == 8){
                            _this.floor = 8;
                            _this.beginTwo = e.data;
                        }else if(e.data == 9){
                            _this.floor = 9;
                            _this.beginTwo = e.data;
                        }
                    }
                })
                _this.getmoneyTotal();
            },
            //            选择发货方式
            pickSend:function () {
                let _this = this
                picker.pick({
                    index:_this.beginThree,
                    items:['普通快递','同城配送','线下自提','虚拟商品']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.sendObject = 'shipping';
                            _this.beginThree = e.data;
                        }else if(e.data == 1){
                            _this.sendObject = 'warehouse';
                            _this.beginThree = e.data;
                        }else if(e.data == 2){
                            _this.sendObject = 'pickup';
                            _this.beginThree = e.data;
                        }else if(e.data == 3){
                            _this.sendObject = 'cardbkg';
                            _this.beginThree = e.data;
                        }
                    }
                })
            },
            //            跳转会员卡
            gocard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/card/addressList.js"),function (data) {
                    _this.clicked = false
                    if(data.type == 'success'){
//                        _this.memberlogo = data.data.memberlogo;
//                        _this.memberName = data.data.memberName;
//                        可能会出现会员id为0的情况，0为无效会员
                        if(data.data.memberId != 0){
                            _this.memberId = data.data.memberId;
                            _this.addressId = data.data.addressId;
                            _this.renew();
                        }else{
                            event.toast('无效会员')
                            return
                        }
                        _this.isShow = true
                    }
                });
            },
            //            跳转商品列表
            goGoods:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/goods/manage.js?from=fill&pageType=true"),function (data) {
                    _this.clicked = false
                    if(data.type == 'success'){
//                        把传回来的商品名字保存起来，用来对比购物车列表是否有改商品
                        _this.goodsName = data.data.name;
//                        先请求接口获取productId
                        GET('applet/product/view.jhtml?id='+ data.data.id,function (mes) {
                            if (mes.type == 'success') {
                                _this.product = mes.data.products;
                                _this.addCart()
                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                    }
                });
            },
//            购物车列表
            cartList:function () {
                var _this = this;
                GET('weex/cart/list.jhtml?',function (mes) {
                    if (mes.type == 'success') {
                        mes.data.cartItems.forEach(function (item) {
                            if(item.quantity == 0){
                                item.quantity = ''
                            }
                        })
                        _this.cart = mes.data.cartItems;
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            //            加入购物车
            addCart:function (id) {

                var _this = this;
                POST('weex/cart/add.jhtml?id='+_this.product[0].productId+'&quantity=0'+'&memberId=' +this.memberId).then(function (res) {
                    if (res.type == 'success') {
//                        当购物车列表大于3条数据时再做操作
                        if(_this.cart.length > 3){
                                if(!utils.isNull(_this.goodsName)){
//                                    先把this.cart转为字符串用于indexOf比较
                                    var jsonData = JSON.stringify(_this.cart)
//                                    如果该商品不在购物车列表，则滚动到最后一个cell
                                    if(jsonData.indexOf(_this.goodsName) < 0){
                                        var cartIndex = _this.cart.length -1;
                                        setTimeout(function () {
                                            const el = _this.$refs.cardRef[cartIndex]//跳转到相应的cell
                                            dom.scrollToElement(el, {
                                                offset: 100
                                            })
                                        }, 200)
                                    }
                                }

                        }
                        _this.cartList();
                        _this.getmoneyTotal();
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
//            监听数量input
            numberChange: function (c) {

                this.numberOnInput(c.id,c.quantity)
//                utils.debug(c)
            },
            //            监听金钱input
            moneyChange: function (c) {

                this.moneyOnInput(c.id,c.quantity,c.price)
//                utils.debug(c)
            },
//            数量输入框
            numberOnInput(id,num){
                var _this = this;
                if(num <1 || num < '1'){
                    event.toast('商品数量不能低于1件')
                    return
                }
                POST('weex/cart/edit.jhtml?id='+id+'&quantity='+num).then(function (res) {
                    if (res.type == 'success') {
                        _this.cartList();
                        _this.getmoneyTotal();
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
//            金钱输入框
            moneyOnInput(id,num,price){
                var _this = this;
                POST('weex/cart/edit.jhtml?id='+id+'&quantity='+num+'&price='+price).then(function (res) {
                    if (res.type == 'success') {
                        _this.cartList();
                        _this.getmoneyTotal();
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            onpanmove:function (e,index) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'right'){
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {

                    })
                }else if(e.direction == 'left'){
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-100)',
                        },
                        duration:350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                    })
                }
            },
            //            点击屏幕时
            onFriendtouchstart:function (e,index) {
                var _this = this;
                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                }else{
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    })
                }
//                获取当前点击的元素。
                animationPara =  e.currentTarget;
            },
//            删除购物车列表商品
            del:function (id,index) {
                let _this =this
                POST('weex/cart/delete.jhtml?id='+id).then(
                    function (mes) {
                        if (mes.type == "success") {
                            //                            把动画收回来。
                            if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                            }else{
                                animation.transition(animationPara, {
                                    styles: {
                                        transform: 'translateX(0)',
                                    },
                                    duration: 10, //ms
                                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                    needLayout:false,
                                    delay: 0 //ms
                                })
                            }
//                            _this.cart.splice(index,1);
                            _this.cartList();
                            _this.getmoneyTotal();
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                    }
                )
            },

            renew() {
                var _this = this;
                _this.shopName = '';
                _this.shopId = '';
                _this.memoData = '';
                _this.dateTime = '';
                _this.floor = '';
                _this.adminName = '';
                _this.adminId = '';
                _this.barrel  = '';
                _this.deposit = '';
                _this.begin =0;
                _this.paymentPluginId = 'cashPayPlugin';
                _this.paymentPluginName = '现金支付';
                if (_this.payId.length>0) {
                    _this.paymentPluginId = _this.payId[0];
                    _this.paymentPluginName = _this.payName[0];
                }
                _this.isShow = false;
                _this.clicked = false;
                _this.getInfo();
            },

            beginTimer:function () {
                var _this = this;
                modal.toast({
                    message: '付款中..',
                    duration: 0.5
                })
                POST("payment/query.jhtml?sn="+_this.paySn).then(
                    function (res) {
                        if (res.type=='success') {
                            if (res.data=='0000') {
                                modal.alert({
                                    message: '付款成功',
                                    okTitle: '知道了'
                                })
                                _this.renew();
                            } else
                            if (res.data=='0001') {
                                modal.alert({
                                    message: '付款失败',
                                    okTitle: '知道了'
                                })
                                _this.renew();
                            } else {
                                _this.timer = setTimeout(function () {_this.beginTimer()},500);
                            }
                        } else {
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    }
                )
            },
            paymentOrder(orderSn,safeKey) {
                var _this = this;
                _this.orderSn = orderSn;
                modal.toast({
                    message: '付款中..',
                    duration: 1
                })
                POST('weex/member/order/payment.jhtml?sn='+ orderSn).then( function(pay) {
                    if (pay.type == 'success') {
                        _this.paySn = pay.data.sn;
                        POST("payment/submit.jhtml?sn="+_this.paySn+"&paymentPluginId="+_this.paymentPluginId+"&safeKey="+encodeURIComponent(safeKey)).then(
                            function (data) {
                                if (data.type=='success') {
                                    _this.timer = setTimeout(function () {_this.beginTimer()},500);
                                } else {
                                    modal.alert({
                                        message: data.content,
                                        okTitle: '知道了'
                                    })
                                }
                            },function (err) {
                                event.toast(err.content);
                            }
                        )
                    } else {
                        event.toast(pay.content)
                    }
                }, function(fail) {
                    event.toast(fail.content)
                })

            },
            createOrder(safeKey) {
                var _this = this;
                POST('weex/member/order/create.jhtml?receiverId='+this.addressId+'&paymentPluginId='+_this.paymentPluginId+'&memo='+encodeURIComponent(this.memoData)+'&memberId='+this.memberId+'&hopeDate='+encodeURIComponent(this.dateTime)+'&shopId='+_this.shopId+'&adminId='+_this.adminId+'&shippigMethod='+ _this.sendObject +'&pledge='+_this.deposit +'&pledgeQuantity='+_this.barrel).then(function (res) {
                    if (res.type == 'success') {
                        if (res.data.status=='unpaid') {
                            _this.paymentOrder(res.data.sn,safeKey);
                            _this.clicked = false;
                        } else {
                            modal.alert({
                                message: '订单提交成功',
                                okTitle: '知道了'
                            })
                            _this.renew();
                        }

                    } else {
                        modal.alert({
                            message: res.content,
                            okTitle: '知道了'
                        })
                        _this.clicked = false;
                    }
                }, function (err) {
                    event.toast(err.content);
                    _this.clicked = false;
                })
            },
//            确认
            confirm(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
//                先提交订单获取sn
                if (utils.isNull(this.addressId)) {
                    event.toast('请先设置地址');
                    _this.clicked = false;
                    return
                } else if (utils.isNull(this.paymentPluginId)) {
                    event.toast('请选择支付方式');
                    _this.clicked = false;
                    return
                }
                if(utils.isNull(_this.deposit)){
                    _this.deposit = 0
                }
                if(utils.isNull(_this.barrel)){
                    _this.barrel = 0
                }
                if (this.version == 2){
                    if (utils.isNull(this.shopId)) {
                        event.toast('请选择配送站点');
                        _this.clicked = false;
                        return
                    }else if(this.isSelf == true || this.isSelf == 'true'){
                        if (utils.isNull(this.adminId)) {
                            event.toast('请选择配送员');
                            _this.clicked = false;
                            return
                        }
                    }
                }

                var mesTotal = 0;
                _this.cart.forEach(function (item) {
                    if(utils.isNull(item.quantity) || item.quantity == 0){
                        mesTotal = mesTotal + 1;
                    }
                })

                if(mesTotal>0){
                    modal.alert({
                        message: '商品数量不能为空或0',
                        okTitle: '知道了'
                    });
                    _this.clicked = false;
                    return
                }

                if (_this.paymentPluginId=="weixinQRPlugin") {
                    event.scan(function (sc) {
                        if (sc.type=='success') {
                            _this.createOrder(sc.data);
                        }
                    })
                } else {
                    _this.createOrder("");
                }


            }
        }
    }
</script>