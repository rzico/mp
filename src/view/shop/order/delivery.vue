<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="contentBox">
            <div class="info" >
                <!--<scroller style="max-height:400px">-->
                    <!--<div class="" v-for="(goods,index) in ordersList.orderItems">-->
                    <!--<div class="flex-row goodsBody ">-->
                        <!--<image :src="goods.thumbnail" class="goodsImg"></image>-->
                        <!--<div class="goodsInfo" >-->
                            <!--<text class="title goodsName">{{goods.name}}</text>-->
                            <!--<text class="sub_title ">规格:{{goods.spec | watchSpec}}</text>-->
                            <!--<div class="goodsPriceNum">-->
                                <!--&lt;!&ndash;<text class="title coral">¥ {{goods.price | currencyfmt}}</text>&ndash;&gt;-->
                                <!--<text class="title coral">x{{goods.quantity}}</text>-->
                                <!--&lt;!&ndash;<text class="sub_title border shopCar" >加购物车</text>&ndash;&gt;-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--</div>-->
                <!--</scroller>-->
                <!--<text class="totalText">共{{total}}件商品</text>-->
                <div class="setting" @click="pickPay">
                    <div class="flex-row">
                        <text class="fz32">发货方式:  {{isobject | watchType}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="" v-if="isobject == 'shipping'">
                    <div class="setting" @click="linkToLogistics" >
                        <div class="flex-row">
                            <text class="fz32">快递公司:  {{logistics}}</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="setting" >
                        <div class="flex-row">
                            <text class="fz32">货运单号:</text>
                            <input class="input" type="email" placeholder="请输入快递运单号"  v-model="trackingNo"/>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>
                <div class="setting" @click="pickPattern()">
                    <div class="flex-row">
                        <text class="fz32">发货仓库:  {{shopName}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="goMarki()">
                    <div class="flex-row">
                        <text class="fz32">送货人员:  {{markiName}}</text>
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
        <wxc-loading :show="clicked" type="default"></wxc-loading>
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
        /*box-shadow:0px 0px  10px 5px #aaa;*/
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
    import { WxcLoading, WxcPartLoading } from 'weex-ui';
    export default {
        data: function () {
            return {
                clicked:false,
                begin:0,
                isobject:'warehouse',
                trackingNo:'',
                ordersList:[],
                shopId:'',
                shopName:'',
                markiId:'',
                markiName:'',
                isSelf:false,
                total:0,
                shippingMethods:['同城配送','普通快递','到店自提'],
                logisticsId:'',
                logistics:'',
            }
        },
        components: {
            navbar,WxcLoading,WxcPartLoading
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
                    return'到店自提'
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
            //物流公司
            linkToLogistics(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('widget/list.js?listId=' + this.logisticsId + '&type=deliveryCorp'), function (data) {
                    _this.clicked = false;
                    if(data.type == 'success' && data.data != '') {
                        _this.logisticsId = parseInt(data.data.listId);
                        _this.logistics = data.data.listName;
                    }
                })
            },
            checkedShippingMethods(idx) {
                let n = this.shippingMethods[idx];
                if (n=='普通快递') {
                    return "shipping"
                }else if (n=='同城配送') {
                    return "warehouse"
                }else if (n=='到店自提') {
                    return "pickup"
                }
            },
            open:function () {
                let _this = this;
                GET('weex/member/order/view.jhtml?sn=' + this.orderSn,function (data) {
                    if(data.type == 'success'){
                        _this.ordersList = [];
                        _this.ordersList = data.data;
                        _this.isobject =  data.data.shippingMethodId;
                        if(!utils.isNull(data.data.shopId) && data.data.shopId > 0){
                            _this.shopId = data.data.shopId ;
                            _this.shopName = data.data.shopName ;
                        }
                        if(_this.isobject == 'shipping'){
                            _this.shippingMethods = ['普通快递','同城配送','到店自提'];
                            _this.begin = 0
                        }else if(_this.isobject == 'warehouse'){
                            _this.shippingMethods = ['同城配送','普通快递','到店自提'];
                            _this.begin = 0
                        }else if(_this.isobject == 'pickup'){
                            _this.shippingMethods = ['到店自提','普通快递','同城配送'];
                            _this.begin = 0
                        }
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
            goback(){
                event.closeURL();
            },
            //            选择付款方式
            pickPay:function () {
                let _this = this
                picker.pick({
                    index:_this.begin,
                    items:_this.shippingMethods
                }, e => {
                    if (e.result == 'success') {
                        _this.isobject = _this.checkedShippingMethods(e.data);
                        _this.begin = e.data;
                    }
                })
            },
            sendGoods:function () {
                let _this = this
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                if(utils.isNull(this.shopId)){
                        event.toast('请选择发货仓库');
                        _this.clicked = false;
                        return
                }else if(!utils.isNull(this.shopId)){
                    if(this.isSelf == true || this.isSelf == 'true'){
                        if(utils.isNull(this.markiId)){
                            event.toast('请选择配送人员');
                            _this.clicked = false;
                            return
                        }
                    }
                }else if(!utils.isNull(this.logisticsId)){
                    if(utils.isNull(this.trackingNo)){
                        event.toast('请输入单号');
                        _this.clicked = false;
                        return
                    }
                }
                POST('weex/member/order/shipping.jhtml?sn=' + this.orderSn +'&shopId='+this.shopId +'&adminId=' + this.markiId + '&shippingMethod='+ this.isobject +'&trackingNo=' + encodeURIComponent(this.trackingNo)+'&deliveryCorpId='+this.logisticsId).then(
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success'){
                            let E = utils.message('success','发货成功','')
                            event.closeURL(E);
                        }else{
                            modal.alert({
                                message: data.content,
                                okTitle: '确认'
                            }, function () {
                                event.closeURL();
                            })
                        }
                    },function (err) {
                        _this.clicked = false;
                        modal.alert({
                            message: err.content,
                            okTitle: '确认'
                        }, function () {
                            event.closeURL();
                        })
                    }
                )
            }
        }
    }
</script>
