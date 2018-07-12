<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="contentBox">
            <div class="info"  v-for="(item,index) in ordersList" >
                <div class="flex-row goodsBody " v-for="goods in item.orderItems">
                    <image :src="goods.thumbnail" class="goodsImg"></image>
                    <div class="goodsInfo" >
                        <text class="title goodsName">{{goods.name}}</text>
                        <text class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                        <div class="goodsPriceNum">
                            <!--<text class="title coral">¥ {{goods.price | currencyfmt}}</text>-->
                            <text class="title coral">x{{goods.quantity}}</text>
                            <!--<text class="sub_title border shopCar" >加购物车</text>-->
                        </div>
                    </div>
                </div>
                <div class="setting" @click="pickPay">
                    <div class="flex-row">
                        <text class="fz32">发货方式:  {{isobject | watchType}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="pickPattern()">
                    <div class="flex-row">
                        <text class="fz32">配送站点:  {{shopName}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="goMarki()">
                    <div class="flex-row">
                        <text class="fz32">配送人员:  {{markiName}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="">
                    <div class="flex-row">
                        <text class="fz32">货运单号:</text>
                        <input class="input" type="email" placeholder="请输入快递运单号"  v-model="trackingNo"/>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="button ml30 mr30 mt30" @click="sendGoods">
                    <text class="fz40" style="color:#fff;">确认发货</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#eeeeee;

    }
    .contentBox{
        width: 650px;
        background-color: white;
        border-radius: 15px;
        box-shadow:0px 0px  10px 5px #aaa;
        position: absolute;
        left: 50px;
        top: 200px;
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
    .setting{
        margin-top: 20px;
        border-color:#ccc;
        height: 80px;
        width: 590px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .input{
        width: 400px;
        height: 80px;
        color: #999;
        font-size: 32px;
        padding-left: 20px;
    }
    .goodsBody{
        background-color: #eee;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .goodsInfo{

        display: flex;flex-direction: column;justify-content: space-between;
        height: 160px;
        /*width: 380px;*/
        width: 390px;
        padding-left: 20px;
        padding-right: 20px;

    }
    .goodsImg{
        height: 160px;
        width: 160px;
        border-radius: 5px;
    }
    .goodsName{
        line-height: 32px;

        lines:2;
        text-overflow: ellipsis;
    }
    .coral{
        color: coral;
    }
    .goodsPriceNum{
        /*height: 160px;*/
        align-items: center;
        justify-content: space-between;
        /*width: 150px;*/
        flex-direction: row;
        width: 390px;
        padding-right: 20px;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {
                clicked:false,
                begin:0,
                isobject:'shipping',
                trackingNo:'',
                ordersList:[],
                shopId:'',
                shopName:'',
                markiId:'',
                markiName:'',
                isSelf:false
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "确认发货"},
        },
        created() {
            utils.initIconFont();
            this.orderSn = utils.getUrlParameter('sn');
            this.open();
        },
        filters: {
            watchCreateDate: function (value) {
                return utils.ymdhistimefmt(value);
            },
            watchType:function (val) {
                if(val == 'shipping'){
                    return'普通快递'
                }else if(val == 'warehouse'){
                    return'同城配送'
                }else if(val == 'pickup'){
                    return'线下自提'
                }else if(val == 'cardbkg'){
                    return'虚拟商品'
                }
            }
        },
        methods: {
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
                        _this.markiName = '';
                        _this.markiId = ''
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
                        _this.markiName = data.data.name;
                        _this.markiId = data.data.id
                    }
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
            goback(){
                event.closeURL();
            },
            //            选择付款方式
            pickPay:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:['普通快递','同城配送','线下自提','虚拟商品']
                }, e => {
                    if (e.result == 'success') {
                        if (e.data == 0){
                            _this.isobject = 'shipping';
                            _this.begin = e.data;
                        }else if(e.data == 1){
                            _this.isobject = 'warehouse';
                            _this.begin = e.data;
                        }else if(e.data == 2){
                            _this.isobject = 'pickup';
                            _this.begin = e.data;
                        }else if(e.data == 3){
                            _this.isobject = 'cardbkg';
                            _this.begin = e.data;
                        }
                    }
                })
            },
            sendGoods:function () {
                let _this = this
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(this.isobject == 'warehouse' && !utils.isNull(this.shopId)){
//                    if(utils.isNull(this.shopId)){
//                        event.toast('请选择配送站点');
//                        _this.clicked = false;
//                        return
//                    }
                    if(this.isSelf == true || this.isSelf == 'true'){
                        if(utils.isNull(this.markiId)){
                            event.toast('请选择配送人员');
                            _this.clicked = false;
                            return
                        }
                    }
                }

                POST('weex/member/order/shipping.jhtml?sn=' + this.orderSn +'&shopId='+this.shopId +'&adminId=' + this.markiId + '&shippingMethod='+ this.isobject +'&trackingNo=' + encodeURIComponent(this.trackingNo)).then(
                    function (data) {
                        if(data.type == 'success'){
                            let E = utils.message('success','发货成功','')
                            event.closeURL(E);
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    }
                )
            }
        }
    }
</script>