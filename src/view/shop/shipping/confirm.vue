<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <list>
            <cell v-if="list.length == 0">
                <noData :noDataHint="noDataHint"></noData>
            </cell>
            <cell :style="{minHeight:screenHeight + 'px'}">
                <div  v-for="(c,index) in list">
                    <!--默认显示-->
                    <div class="setting" v-if="c.show == true">
                        <div class="titile">
                            <text class="fz32">{{c.name}}</text>
                        </div>
                        <div class="money">
                            <div class="flex-row">
                                <text class="fz32">送出</text>
                                <text class="number">{{c.give}}</text>
                                <text class="fz32">桶</text>
                            </div>
                            <div class="flex-row">
                                <text class="fz32">收回</text>
                                <input type="number" placeholder="输入桶数" class="input" v-model="c.take" />
                                <text class="fz32">桶</text>
                            </div>
                        </div>
                    </div>
                    <!--隐藏显示-->
                    <div class="setting" v-if="c.show == false && hasList">
                        <div class="titileTwo" @click="showContol(index)">
                            <text class="fz32">{{c.name}}</text>
                        </div>
                    </div>
                </div>
                <!--列表按钮控制-->
                <div class="iconBox" v-if="hasWater==true">
                    <div class="icon" @click="contorlList()">
                        <text class="bigIcon" :style="{fontFamily:'iconfont'}" v-if="!hasList">&#xe601;</text>
                        <text class="bigIcon" :style="{fontFamily:'iconfont'}" v-if="hasList">&#xe608;</text>
                    </div>
                </div>
                <!--详情-->
                <div class="info" >
                    <div class="flex-column" v-if="totalAmount>0">
                        <text class="herderText">应收现金</text>
                        <div class="flex-row">
                            <text style="font-size: 65px">¥</text>
                            <text class="herderAmount">{{totalAmount}}</text>
                        </div>
                        <div class="flex-center" style="width: 590px">
                            <div :class="[amountPaid=='1'?'checkboxAct':'checkbox']" @click="amountPay('1')"><text class="fz28">已收</text></div>
                            <div :class="[amountPaid=='0'?'checkboxAct':'checkbox']" @click="amountPay('0')"><text class="fz28">未收</text></div>
                        </div>
                    </div>
                    <div class="flex-column" v-if="totalPaper>0">
                        <text class="herderText">应收水票</text>
                        <div class="flex-row">
                            <text style="font-size: 65px"></text>
                            <text class="herderAmount">{{totalPaper}}张</text>
                        </div>
                        <div class="flex-center" style="width: 590px">
                            <div :class="[paperPaid=='1'?'checkboxAct':'checkbox']" @click="paperPay('1')"><text class="fz28">已收</text></div>
                            <div :class="[paperPaid=='0'?'checkboxAct':'checkbox']" @click="paperPay('0')"><text class="fz28">未收</text></div>
                        </div>
                    </div>

                    <div class="flex-row" style="width: 590px;margin-top: 20px;" v-if="totalAmount>0">
                        <text class="fz30" style="color: #999">应收现金: {{amountPayable}}元</text>
                        <text class="fz30" style="color: #999">（上期欠款  {{arrears}}元）</text>
                    </div>
                    <div class="flex-row mt10" style="width: 590px" v-if="totalPaper>0">
                        <text class="fz30" :class="[paperClass()]" >应收水票: {{paperPayable}}张</text>
                        <text class="fz30" style="color: #999">（上期欠票  {{ticket}}张）</text>
                    </div>
                    <div class="flex-row mt10" style="width: 590px" v-if="pledgePayable>0 || pledgeQuantity>0">
                        <text class="fz30" :class="[paperClass()]" >空桶押金: {{pledgePayable}}元</text>
                        <text class="fz30" style="color: #999">（押桶数量: {{pledgeQuantity}}元）</text>
                    </div>
                    <text class="herderSn mt10">付款方式: {{paymentPluginName}}</text>
                    <text class="herderSn mt10">收货地址: {{areaName}}{{address}}</text>
                    <text class="herderSn mt10">收货姓名: {{consignee}}</text>
                    <text class="herderSn mt10" @click="callPhone">收货电话: {{phone}}</text>
                    <div class="messageSetting" @click="chooseFloor">
                        <div class="flex-row">
                            <text class="fz32">楼层:</text>
                            <text class="fz32 ml20">{{floor | wacthFloor}}</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="messageSetting" @click="">
                        <div class="flex-row">
                            <text class="fz32">备注:</text>
                            <input class="messageInput" placeholder="请输入备注" v-model="noteInput"/>
                        </div>
                        <div class="flex-row flex-end" @click="linkTo">
                            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                            <div class="chooseBox"><text class="fz28 primary">快速话语</text> </div>
                        </div>
                    </div>
                    <div class="button mt30" style="width: 530px" @click="goComplete()" v-if="isButton">
                        <text class="fz40" style="color:#fff;">确认送达</text>
                    </div>
                </div>
            </cell>
            <cell>
                <div style="height:100px"></div>
            </cell>
        </list>
        <div class="codeMask" v-if="isMask" @click="maskChick">
            <div class="codeBox">
                <div class="downCode" @click="downCodeMask">
                    <text class="downCodeIcon" :style="{fontFamily:'iconfont'}">&#xe60a;</text>
                </div>
                <image class="codeImg" :src="qrcode"></image>
                <div class="codeTextBox">
                    <text class="codeText">扫码签收</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .codeMask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;
        background-color: rgba(000,000,000,0.4);
        align-items: center;
        justify-content: center;
    }
    .codeBox{
        background-color: white;
        width:550px;
        height:650px;
        border-radius: 15px;
        align-items: center;
        justify-content: center;
        /*position: absolute;*/
        /*left:75px;*/
        /*top:300px;*/
    }
    .downCode{
        position: absolute;
        top: 20px;
        right: 20px;
    }
    .downCodeIcon{
        font-size: 45px;
        color: #999999;
    }
    .codeImg{
        width: 450px;
        height: 450px;
    }
    .codeTextBox{
        width: 300px;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 50px;
        left: 125px;
    }
    .codeText{
        font-size: 28px;
        color: #888888;
    }
    .color999{
        color: #999;
    }
    .colorRed{
        color: red;
    }
    .iconBox{
        margin-top: 25px;
        width:750px;
        align-items: center;
        justify-content: center;
    }
    .icon{
        border-top-width: 1px;
        border-bottom-width: 1px;
        border-color: #cccccc;
        width: 150px;
        align-items: center;
        justify-content: center;
    }
    .bigIcon{
        font-size: 60px;
        color: #777;
    }
    .chooseBox{
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        border-color: #5eb0fd;
        border-width: 1px;
    }
    .info{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        margin-left: 25px;
        margin-right: 25px;
        padding: 30px;
        border-color:#ccc;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
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
    .checkbox {
        width:200px;
        height: 60px;
        border-width: 1px;
        border-color: #cccccc;
        border-radius:10px;
        align-items: center;
        justify-content: center;
        position: relative;
        margin: 10px;
    }

    .checkboxAct {
        width:200px;
        height: 60px;
        border-width: 1px;
        border-color: red;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: #ff4a6c;
        margin: 10px;
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
        height: 100px;
    }
    .titileTwo{
        /*border-top-left-radius: 15px;*/
        /*border-top-right-radius: 15px;*/
        border-radius: 15px;
        padding-left: 30px;
        padding-right: 30px;
        background-image: linear-gradient(to right, pink,#5eb0fd);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
    }
    .money{
        padding-left: 30px;
        padding-right: 30px;
        border-top-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
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
    .number{
        padding-left: 20px;
        width: 150px;
        font-size: 28px;
        color: red;
    }
    .input{
        padding-left: 20px;
        width: 150px;
        font-size: 28px;
        color: red;
        height: 100px;
    }
    .herderText{
        font-size: 32px;
        color: #999;
    }
    .herderAmount{
        font-size: 80px;
        color:red;
    }
    .herderSn{
        font-size: 30px;
        color: #999;
        width: 590px;
    }
    .messageSetting{
        margin-top: 20px;
        border-color:#ccc;
        height: 80px;
        width: 590px;
        /*border-top-width: 1px;*/
        border-bottom-width: 1px;
        border-style: dashed;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .messageInput{
        width: 340px;
        height: 80px;
        color: #999;
        font-size: 32px;
        padding-left: 20px;
    }
</style>
<script>
    var modal = weex.requireModule('modal');
    const phone = weex.requireModule('phone');
    const picker = weex.requireModule('picker');
    import {dom,event,stream,storage,animation} from '../../../weex.js'
    import navbar from '../../../include/navbar.vue';
    import noData from '../../../include/noData.vue';
    import utils from '../../../assets/utils';
    import filters from '../../../filters/filters.js';
    import { POST, GET, SCAN } from '../../../assets/fetch'
    export default {
        data: function () {
            return{
                clicked:false,
                screenHeight:0,
                give:0,
                take:0,
                noteInput:'',
                begin:0,
                beginTwo:0,
                pageStart:0,
                pageSize:20,
                refreshImg:utils.locate('resources/images/loading.png'),
                refreshing:false,
                list:[],
                shippingView:[],
                shippingSn:'',
                orderSn:'',
                shippingId:'',
                floor:0,
                adminFreight:'',
                areaName:'',
                address:'',
                consignee:'',
                phone:'',
                hasList:false,
                giveTotal:0,
                takeTotal:0,
                amountPayable:'',
                arrears:'',
                paperPayable:'',
                ticket:'',
                totalAmount:0,
                totalPaper:0,
                pledgePayable:'',
                paymentPluginName:'',
                amountPaid:'',
                paperPaid:'',
                isMask:false,
                isButton:true,
                qrcode:'',
                hasWater:false
            }
        },
        created: function () {
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(136)+500;
            this.orderSn = utils.getUrlParameter('orderSn');
            this.shippingSn = utils.getUrlParameter('sn');
            this.shippingId = utils.getUrlParameter('shippingId');
            this.open();
            this.load()
        },
        components: {
            navbar
        },
        props: {
            title: {default: "送达"},
        },
        filters: {
            wacthFloor(e){
                if(e == 0){
                    return '有电梯'
                }else{
                    return e
                }
            }
        },
        methods: {
            maskChick:function () {
                return
            },
            downCodeMask(){
                this.isMask = false;
                this.isButton = false
            },
            paperClass:function () {
                if (this.cashRecvable == '0' || this.cashRecvable == 0) {
                    return "colorRed";
                } else if (this.cashRecvable != '0' || this.cashRecvable != 0) {
                    return "color999";
                } else {
                    return "color999";
                }
            },
            contorlList(){
                this.hasList = !this.hasList
            },
            //            联系收货人
            callPhone:function () {
                phone.tel(this.phone,function(){
                    return;
                })
            },
            amountPay:function (w) {
                this.amountPaid = w;
            },
            paperPay:function (w) {
                this.paperPaid = w;
            },
            onloading:function () {
////            获取订单列表
                this.open();

            },
            onrefresh:function () {
                var _this = this;

                _this.pageStart = 0;
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
                    this.refreshing = false;
                    this.open();
////            获取关注列表
                }, 1000)
            },
            goback(){
                event.closeURL();
            },
            linkTo: function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('widget/list.js?type=xdict'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.noteInput = data.data.listName;
                    }
                })

            },
            showContol(index){
                if (this.list[index].show==false) {
                    this.list[index].show = true;
                    this.list[index].give = 0;
                    this.hasList = false
                }

            },
            open:function () {
                let _this = this
                GET('weex/member/barrel/list.jhtml?shippingId='+this.shippingId,
                    function (res) {
                        if (res.type=="success") {
                            res.data.forEach(function (item) {
                                item.give = '';
                                item.take = '';
                                item.noteInput = '';
                                if(item.show == true){
                                    item.give = item.quantity;
                                    item.take = item.returnQuantity;
                                }
                                _this.list.push(item);
                            });
                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
            },
            load:function () {
                let _this = this;
                GET('weex/member/shipping/view.jhtml?sn=' + this.shippingSn,function (data) {
                    if(data.type == 'success'){
                        _this.areaName = data.data.receiver.areaName;
                        _this.address = data.data.receiver.address;
                        _this.floor = data.data.receiver.level;
                        _this.consignee = data.data.receiver.consignee;
                        _this.phone = data.data.receiver.phone;
                        _this.amountPayable = data.data.amountPayable ;// 应付金额
                        _this.arrears = data.data.arrears ; //  上期欠款

                        _this.paperPayable = data.data.paperPayable;//   应收水票
                        _this.ticket = data.data.ticket;// 上期欠票
                        _this.pledgePayable = data.data.pledgePayable//  应收押金
                        if (data.data.paymentPluginId!='cashPayPlugin') {
                            _this.amountPayable = 0;
                            _this.arrears = 0;
                        }

                        _this.amountPaid = data.data.amountPaid;
                        _this.paperPaid = data.data.paperPaid;

                        _this.totalAmount = _this.amountPayable + _this.arrears;
                        _this.totalPaper = _this.paperPayable + _this.ticket;
                        _this.paymentPluginName = data.data.paymentMethod
                        _this.hasWater = data.data.hasWater;
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            pickNote:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:['楼主不在家','电话无人接听','邻居代收']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.noteInput = '楼主不在家';
                            _this.begin = e.data;
                        }else if(e.data == 1){
                            _this.noteInput = '电话无人接听';
                            _this.begin = e.data;
                        }else if(e.data == 2){
                            _this.noteInput = '邻居代收';
                            _this.begin = e.data;
                        }
                    }
                })
            },
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
            },
            goComplete:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                POST('weex/member/shipping/lock.jhtml?sn='+this.shippingSn,).then(function (data) {
                        if(data.type == 'success'){
                            if(data.data == true){
                                var body = [];
                                _this.list.forEach(function(item,index){
                                    if(utils.isNull(item.give)){
                                        item.give = 0
                                    }
                                    if(utils.isNull(item.take)){
                                        item.take = 0
                                    }

                                    body.push({
                                        id:item.id,
                                        quantity:item.give,
                                        returnQuantity:item.take,
                                        pledgeQuantity:item.pledgeQuantity,
                                        refundsQuantity:item.refundsQuantity
                                    });
                                });
                                body = JSON.stringify(body);


                                POST('weex/member/shipping/receive.jhtml?sn='+ _this.shippingSn +'&memo=' + encodeURIComponent(_this.noteInput) +'&level=' + _this.floor + "&amountPaid="+_this.amountPaid+ "&paperPaid="+_this.paperPaid+"&lng=0&lat=0",body).then(
                                    function (res) {
                                        _this.clicked = false;
                                        if(res.type == 'success'){
                                            let E = utils.message('success','送达成功','');
                                            event.closeURL(E);
                                        } else {
                                            event.toast(res.content);
                                        }
                                    },
                                    function (err) {
                                        _this.clicked = false;
                                        event.toast(err.content);
                                    })
//                                })

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
            }
        }
    }
</script>