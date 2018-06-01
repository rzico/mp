<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <list>
            <cell v-if="list.length == 0">
                <noData :noDataHint="noDataHint"></noData>
            </cell>
            <cell :style="{minHeight:screenHeight + 'px'}">
                <div  v-for="c in list">
                <div class="setting">
                    <div class="titile">
                        <text class="fz32">{{c.name}}</text>
                    </div>
                    <div class="money">
                        <text class="fz32">送出</text>
                        <input type="number" placeholder="输入桶数" class="input" v-model="c.give" />
                        <text class="monyeTextthree fz32">桶，收回</text>
                        <input type="number" placeholder="输入桶数" class="input" v-model="c.take" />
                        <text class="monyeTextthree fz32">桶</text>
                    </div>
                </div>
                </div>
                <div class="info" >
                    <text class="herderText">本单运费</text>
                    <div class="flex-row">
                        <text style="font-size: 65px">¥  </text>
                    <text class="herderAmount">{{freight | currencyfmt}}</text>
                    </div>
                    <text class="herderSn">收货地址: {{areaName}}{{address}}</text>
                    <text class="herderSn mt10">收货姓名: {{consignee}}</text>
                    <text class="herderSn mt10" @click="callPhone">收货电话: {{phone}}</text>
                    <div class="messageSetting" @click="chooseFloor">
                        <div class="flex-row">
                            <text class="fz32">楼层:</text>
                            <text class="fz32 ml20">{{floor}}</text>
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
                            <div class="chooseBox"><text class="fz28" style="color: #EB4E40">快速话语</text> </div>
                        </div>
                    </div>
                    <div class="button mt30" style="width: 530px" @click="goComplete()">
                        <text class="fz40" style="color:#fff;">确认送达</text>
                    </div>
                </div>
            </cell>
            <cell>
                <div style="height:400px"></div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .chooseBox{
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        border-color: #EB4E40;
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
    .titile{
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        /*border-radius: 15px;*/
        padding-left: 30px;
        padding-right: 30px;
        background-image: linear-gradient(to right, pink,#EB4E40);
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100px;
    }
    .money{
        padding-left: 30px;
        border-top-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
        height: 100px;
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
    const phone = weex.requireModule('phone');
    const picker = weex.requireModule('picker');
    import {dom,event,stream,storage,animation} from '../../../weex.js'
    import navbar from '../../../include/navbar.vue';
    import noData from '../../../include/noData.vue';
    import utils from '../../../assets/utils';
    import { POST, GET, SCAN } from '../../../assets/fetch'
    export default {
        data: function () {
            return{
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
                floor:0,
                freight:'',
                areaName:'',
                address:'',
                consignee:'',
                phone:''
            }
        },
        created: function () {
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(136)+500;
            this.orderSn = utils.getUrlParameter('orderSn');
            this.shippingSn = utils.getUrlParameter('sn');
            this.open();
            this.load()
        },
        components: {
            navbar
        },
        props: {
            title: {default: "送达"},
        },
        methods: {
            //            联系收货人
            callPhone:function () {
                phone.tel(this.phone,function(){
                    return;
                })
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
            open:function () {
                let _this = this
                GET('weex/member/barrel/list.jhtml',
                    function (res) {
                        if (res.type=="success") {
                            res.data.forEach(function (item) {
                                item.give = 0;
                                item.take = 0;
                                item.noteInput = '';
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
                        _this.freight = data.data.freight;
                        _this.areaName = data.data.receiver.areaName;
                        _this.address = data.data.receiver.address;
                        _this.floor = data.data.receiver.level;
                        _this.consignee = data.data.receiver.consignee;
                        _this.phone = data.data.receiver.phone;

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
                    items:[1,2,3,4,5,6,7]
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.floor = 1;
                            _this.beginTwo = e.data;
                        }else if(e.data == 1){
                            _this.floor = 2;
                            _this.beginTwo = e.data;
                        }else if(e.data == 2){
                            _this.floor = 3;
                            _this.beginTwo = e.data;
                        }else if(e.data == 3){
                            _this.floor = 4;
                            _this.beginTwo = e.data;
                        }else if(e.data == 4){
                            _this.floor = 5;
                            _this.beginTwo = e.data;
                        }else if(e.data == 5){
                            _this.floor = 6;
                            _this.beginTwo = e.data;
                        }else if(e.data == 6){
                            _this.floor = 7;
                            _this.beginTwo = e.data;
                        }
                    }
                })
            },
            goComplete:function () {
                let _this = this
                POST('weex/member/shipping/lock.jhtml?sn='+this.shippingSn,).then(function (data) {
                        if(data.type == 'success'){
                            if(data.data == true){
                                var body = [];
                                _this.list.forEach(function(item,index){
                                    body.push({
                                        id:item.id,
                                        quantity:item.give,
                                        returnQuantity:item.take,

                                    });
                                });
                                body = JSON.stringify(body);
                                POST('weex/member/shipping/receive.jhtml?sn='+ _this.shippingSn +'&memo=' + encodeURIComponent(_this.noteInput) +'&level=' + _this.floor,body).then(
                                    function (data) {
                                        if(data.type == 'success'){
                                            let E = utils.message('success','送达成功','');
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