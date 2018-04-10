<template>
    <!--<div  style="position: fixed;bottom: 0;background-color: rgba(0, 0, 0, 0.5);" v-if="isShow" >-->
    <div   style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(0, 0, 0, 0.5);"  @click="maskHide()">
        <div class="maskHide" @click="maskHide()"></div>
        <div class="bigBox"  v-for="item in goodsData" @click="returnFunc()">
            <div class="box" >
                <scroller class="specScrollBox">
                    <div class="flexRow buyNumberBox" >
                        <div>
                            <text class="fontSize16">购买数量</text>
                        </div>
                        <div class="flexRow addSubBox" >
                            <!--<span class="iconfont icon-jian iconAddSub"   @click="numSub()"></span>-->
                            <!--&#xe649;-->
                            <text class="addSub" :class="[buyNum <= 1 ? 'grayColor' : '']"  @click="numSub()"  :style="{fontFamily:'iconfont'}">&#xe649;</text>
                            <input type="number" class="buyNumber" v-model="buyNum" @input="numInput()" />
                            <text class="addSub"  @click="numAdd()" :style="{fontFamily:'iconfont'}">&#xe618;</text>
                            <!--<span >{{buyNum}}</span>-->
                            <!--<span class="iconfont icon-jia1 iconAddSub"   @click="numAdd()"></span>-->
                        </div>
                    </div>
                    <div class="specBox" v-if="hasSpecOne">
                        <div class="flexRow"  style="margin-top: 20px;align-items: flex-start" >
                            <div class="specName" >
                                <text class="fontSize16">规格1</text>
                            </div>
                            <div class="flexRow specAllWith">
                                <text v-for="(spec1,index) in item.products"  v-if="isSpec1Rrepeat(index,item.products)" :class="[spec1Name == spec1.spec1 ? 'specChoose' : '',spec1.isSpec1 != '1' ? '' : 'grayColor']" class="specStyle" @click="spec1Choose(spec1,item.products)">{{spec1.spec1}}</text>
                            </div>
                        </div>
                        <div class="flexRow"  v-if="hasSpecTwo" style="align-items: flex-start">
                            <div class="specName ">
                                <text class="fontSize16">规格2</text>
                            </div>
                            <div class="flexRow specAllWith">
                                <text v-for="(spec2,index) in item.products" v-if="isSpec2Rrepeat(index,item.products)" class="specStyle" :class="[spec2Name == spec2.spec2 ? 'specChoose' : '',spec2.isSpec2 != '1' ? '' : 'grayColor']"  @click="spec2Choose(spec2)">{{spec2.spec2}}</text>
                            </div>
                        </div>
                    </div>
                    <div class="address"  v-for="(item,index) in receiverList" v-if="hasReceiver()" @click="goAddress()">
                        <div>
                            <text class="fontSize18 pb10">{{item.consignee}} {{item.phone}}</text>
                            <text class="fontSize18 fz28 pt10">{{item.areaName}}{{item.address}}</text>
                        </div>
                        <text class="arrow"  :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="address noAddress" v-else @click="goAddress()">
                        <text class="fontSize18 fontSize14" >点击选择收货地址</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                    <div class="flexRow preferentialBox" v-if="couponName != '' && couponName != null && couponName != undefined">
                        <text class="preferential">{{couponName}}</text>
                    </div>
                </scroller>
                <div class="footer" v-bind:disabled="disabledButton" style="z-index: 1">
                    <div class="footerLeft">
                        <text class="footerLeftSize">实付金额 ¥ {{finallPrice | currencyfmt}}</text>
                        <text class="promtText">(含运费)</text>
                    </div>
                    <div class="footerRight" @click="completeBuy()">
                        <text class="footerRightSize">确认购买</text>
                    </div>
                </div>
            </div>
            <div class="headerBox">
                <div class="goodsImgBox">
                    <image class="goodsImg preview-img" :src="item.thumbnail | watchGoodsImg"  @click="imgPreview(item.thumbnail,previewList)"></image>
                </div>
                <div class="goodsInfo">
                    <text class="priceNow">¥ {{item.price | currencyfmt}}</text>
                    <!--<span class="priceBefore sub_title" style="font-size: 14px">原价160.00</span>-->
                    <text class="goodsName" >{{item.name}}</text>
                </div>
            </div>
        </div>

        <!--等待遮罩-->
        <waiting  v-if="waitShow"></waiting>

        <!--<AddressList ref="address" v-if="addressListShow"></AddressList>-->
        <!--<AddressAdd ref="addressAdd" @selectAddress="selectAddress" @toastShow="toastShow"></AddressAdd>-->
        <!--免密支付-->
        <!--<weui-dialog ref="dialog" type="confirm" title="免密支付" confirmButton="确认支付" cancelButton="取消"-->
        <!--@weui-dialog-confirm="activate()"-->
        <!--@weui-dialog-cancel="closeConfirm()" >-->
        <!--<div >-->
        <!--<p style="text-align: center;width: 100%;font-size: 13px;color: #444">{{payWay}}</p>-->
        <!--</div>-->
        <!--<div >-->
        <!--<p style="text-align: center;width: 100%;font-size: 25px;color: #000">¥{{finallPrice}}</p>-->
        <!--</div>-->
        <!--</weui-dialog>-->
        <!--<Toast ref="toast"></Toast>-->
    </div>
</template>
<style scoped>
    .pb10{
        padding-bottom: 10px;
    }
    .pt10{
        padding-top: 10px;
    }
    .arrow{
        font-size: 26px;
        color: #999;
        width: 40px;
    }
    .addSubBox{
        align-items: center;
        border-style: solid;
        border-width: 1px;
        border-color: #eee;
        height: 70px;
        border-radius: 5px;
    }
    .addSub{
        font-size: 28px;
        line-height: 70px;
        display: inline-block;
        height: 70px;
        font-weight: 700;
        width:76px;
        text-align: center;
    }
    .noAddress{
        text-align: center;
    }
    .top18{
        top: 18.5px !important;
    }
    .promtText{
        font-size: 24px;
        color: #999;
    }
    .fontSize16{
        font-size: 30px;
        line-height: 34px;
    }
    .buyNumberBox{
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        align-items: center;
        border-style: solid;
        border-bottom-width: 1px;
        border-color: #eee;
    }
    .buyNumber{
        height:70px;
        width: 100px;
        font-size: 32px;
        line-height: 35px;
        text-align: center;
        border-style: solid;
        border-color: #eee;
        border-width: 1px;
        /*outline:none;*/
        -webkit-appearance: none;
        border-radius: 0px;
    }
    .iconAddSub{
        font-size: 40px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .preferentialBox{
        position: relative;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        /*border-style: solid;*/
        /*border-color: #eee;*/
        /*border-width: 1px;*/
        width:750px;
        justify-content: flex-end;
    }
    .preferential{
        color:red;
        font-size: 30px;line-height: 30px;
    }
    .specScrollBox{
        position: absolute;
        top: 165px;bottom: 100px;overflow: scroll;
        width: 750px;
    }
    .grayColor{
        color: #999;
    }
    .specChoose{
        background-color: red;
        color: #fff;
    }
    .maskHide{
        height:400px;
    }
    .footerLeft{
        width: 450px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }
    .footerLeftSize{
        font-size: 34px;
        color: red;

    }
    .footerRightSize{
        font-size: 34px;
        color: #fff;
    }
    .footerRight{
        width: 300px;
        background-color: red;
        align-items: center;
        justify-content: center;
    }
    .specName{
        padding-top: 16px;
        width: 84px;
        min-width: 84px;
        font-size: 32px;
    }
    .specAllWith{
        width: 626px;
        flex-wrap: wrap;
    }
    .flexRow{
        flex-direction: row;
        display: flex;
    }
    .specStyle{
        font-size: 28px;
        margin-left: 20px;
        margin-bottom: 20px;
        display: inline-block;
        padding-top: 16px;
        padding-bottom: 16px;
        padding-left: 26px;
        padding-right: 26px;
        border-style: solid;
        border-color: #eee;
        border-width: 1px;
        border-radius: 10px;
    }
    .specBox{
        padding-top: 0px;
        padding-bottom: 0px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .fontSize14{
        font-size: 28px;
    }
    .fontSize18{
        font-size: 30px;
        line-height: 35px;
        color: #999;
    }
    .address{
        position: relative;
        border-style: solid;
        border-color: #eee;
        border-top-width: 1px;
        border-bottom-width: 1px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .goodsName{
        overflow:hidden;
        text-overflow:ellipsis;
        lines:1;
        font-size: 30px;
        line-height: 32px;
        color: #999;
    }
    .priceBefore{
        text-decoration:line-through;
    }
    /*.sub_title{*/
    /*font-size: 30px;*/
    /*line-height: 32px;*/
    /*color: #999;*/
    /*}*/
    .priceNow{
        font-size: 40px;
        line-height: 40px;
        color: red;
    }
    .headerBox{
        position: relative;
        display: flex;
        flex-direction: row;
        height: 180px;
    }
    .goodsInfo{
        position: absolute;
        top:30px;
        height: 135px;
        /*左右各空35*/
        width:465px;
        left: 250px;
        justify-content: space-around;
    }
    .goodsImgBox{
        position: relative;
        top: 0px;
        left: 35px;
        padding-top:10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        border-color: #d9d9d9;
        border-width: 1px;
        border-style: solid;
        background-color: #fff;
    }
    .goodsImg{
        width: 160px;
        height: 160px;
    }
    .footer {
        padding-top: 0px;
        display: flex;
        flex-direction: row;
        background-color: #eee;
        box-sizing: border-box;
        width:750px;
        height: 100px;
        justify-content: space-between;
        position: absolute;
        bottom: 0px;
        text-align: center;
    }
    .bigBox{
        width: 750px;
        height: 949px;
        position: absolute;
        bottom: 0px;
    }
    .box {
        width: 750px;
        height: 934px;
        position: absolute;
        bottom: 0px;
        background-color: #fff;
    }

</style>
<script>

    //    import AddressAdd from './addressAdd.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import waiting from './waiting.vue'
    //    import Dialog from './dialog.vue';
    export default {
        components: {
//            AddressAdd,
//            'weui-dialog':Dialog,
            waiting
        },
        data: function () {
            return {
                spec2Num:0,//判断是否有规格2
                finallPrice:999,
                productId:'',
                buyNum:1,
                hideData:"2",
                spec1Name:'',
                spec2Name:'',
                goodsData:[],
                sn: "",
                disabledButton:false,
                isShow: false,
                isPwd: false,
                couponName:'',
                articleId:'',
                receiverList:[],
                onecReceiver:false,
                payWay:'账户余额',
                paymentId:'',
                hasSpecTwo:false,
                hasSpecOne:true,
//        payPrice:'299',
                clicked:false,
                previewList:[],
                payMemo:'',
                addressListShow:false,
                waitShow:false,
            }
        },

        filters:{
            watchGoodsImg:function (value) {
                return utils.thumbnail(value,160,160);
            },
        },
        props: {
            goodId: {
                default: ''
                },
            articleId:{default:''}
        },
        created(){
//          this.show(goodId,articleId);
            this.show();
        },
        methods: {
            hasReceiver:function () {
                if(utils.isNull(this.receiverList)  || utils.isNull(this.receiverList[0].id)){
                    return false;
                }else{
                    return true;
                }
            },
//      确认购买
            completeBuy:function () {
                var _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)

                if(utils.isNull(this.buyNum) || this.buyNum <= 0){
                    event.toast('请添加数量');
                    return;
                }
                if(this.hasSpecOne && utils.isNull(this.spec1Name)){
                    event.toast('请选择规格1');
                    return ;
                }
                if(this.hasSpecTwo && utils.isNull(this.spec2Name)){
                    event.toast('请选择规格2');
                    return ;
                }
                if(utils.isNull(this.receiverList[0].id) || utils.isNull(this.receiverList[0].id)){
                    event.toast('请选择地址');
                    return ;
                }
//                this.waitShow = true;
//                return;
                POST("website/member/order/create.jhtml?id=" + this.productId + '&quantity=' + this.buyNum + '&receiverId=' + this.receiverList[0].id).then(
                    function (data) {
                        if (data.type=="success") {
                            _this.goPay(data.data.sn);
                        } else {
                            _this.close(data);
                            _this.waitHide();
                        }
                        _this.disabledButton = false;
                    },
                    function (err) {
                        _this.waitHide();
                        _this.disabledButton = false;
                        _this.close(err);
                    }
                )
            },
            waitHide(){
              this.waitShow = false;
            },
//      发起支付
            goPay(sn){
                let _this = this;
                POST('website/member/order/payment.jhtml?sn=' + sn).then(
                    function (data) {
                        if (data.type=="success") {
                            _this.$emit("goPay",data.data.sn);
                            return;

//              判断支付方式,为null值时就是微信支付或者支付宝支付
                            if(utils.isNull(data.data.paymentPluginId)){
                                if(utils.isweixin()){
                                    _this.$router.push({
                                        name: "payment",
                                        query: {psn: data.data.sn, amount:  _this.finallPrice,type:'weixin',memo:encodeURI(data.data.memo)}
                                    });
                                }else if(utils.isalipay()){
                                    _this.$router.push({
                                        name: "payment",
                                        query: {psn: data.data.sn, amount:  _this.finallPrice,type:'alipay',memo:encodeURI(data.data.memo)}
                                    });
                                }
                            }else if(data.data.paymentPluginId == 'cardPayPlugin'){//会员卡支付
//                var payInfo = {
//                  way:'会员卡支付',
//                  price:_this.finallPrice,
//                  sn:data.data.sn
//                };
//                payInfo = JSON.stringify(payInfo);
//                _this.$emit('payConfirm',payInfo);
                                _this.sn = data.data.sn;
                                _this.payWay = '会员卡支付';
                                _this.paymentId = 'cardPayPlugin';
                                _this.payMemo = data.data.memo;
                                _this.$refs.dialog.show();
                            }else if(data.data.paymentPluginId == 'balancePayPlugin'){//余额支付
//                var payInfo2 = {
//                  way:'余额支付',
//                  price:_this.finallPrice,
//                  sn:data.data.sn
//                };
//                payInfo2 = JSON.stringify(payInfo2);
//                _this.$emit('payConfirm',payInfo2);
//                _this.payPrice = _this.finallPrice;
                                _this.paymentId = 'balancePayPlugin';
                                _this.sn = data.data.sn;
                                _this.payWay = '余额支付';
                                _this.payMemo = data.data.memo;
                                _this.$refs.dialog.show();
                            }else{
                                _this.close(data);
                            }
                        } else {
                            _this.close(data);
                        }
                        _this.disabledButton = false;
                    },
                    function (err) {
//            err = JSON.stringify(err);
//            alert(err);
                        _this.disabledButton = false;
                        _this.close(err);
                    }
                )
            },

//       取消免密支付
            closeConfirm:function () {
                let _this = this;
                this.$refs.dialog.close();
                this.$router.push({
                    name: "payment",
                    query: {psn: _this.sn, amount: _this.finallPrice ,title:'支付取消',type:encodeURI(_this.payWay),memo:encodeURI(_this.payMemo)}
                });
            },
//      确定免密支付
            activate:function () {
                let _this = this;
                POST('payment/submit.jhtml?sn='+ this.sn + '&paymentPluginId='+ this.paymentId + '&safeKey=free').then(
                    function (data) {
                        if (data.type=="success") {
                            _this.$refs.toast.show('支付成功');
                            _this.$router.push({
                                name: "payment",
                                query: {psn: _this.sn, amount: _this.finallPrice , title:'支付成功',type:encodeURI(_this.payWay),memo:encodeURI(_this.payMemo)}
                            });
                            _this.hide();
                        } else {
                            _this.$refs.toast.show(data.content);
                        }
//            _this.disabledButton = false;
                        this.$refs.dialog.close();
                    },
                    function (err) {
                        _this.$refs.toast.show("网络不稳定");
                        this.$refs.dialog.close();
                    }
                )
            },
//      购买数量+1
            numAdd:function () {
                this.buyNum ++ ;
                if(!this.hasSpecOne){
                    this.calcPrice();
                }else if(!this.hasSpecTwo){
                    this.calcPrice();
                }else if(this.spec1Name != '' && this.spec2Name != ''){
                    this.calcPrice();
                }

            },
//      购买数量-1
            numSub:function () {
                if(this.buyNum == 1){
                    return;
                }
                this.buyNum -- ;
                if(!this.hasSpecOne){
                    this.calcPrice();
                }else if(!this.hasSpecTwo){
                    this.calcPrice();
                }else if(this.spec1Name != '' && this.spec2Name != ''){
                    this.calcPrice();
                }
            },
//      选择规格2时触发
            spec2Choose:function (spec2) {
                let _this = this;
                if(spec2.spec2 == this.spec2Name){
                    this.spec2Name = '';
                    this.goodsData[0].products.forEach(function (data) {
                        _this.$set(data,'isSpec1','2');
                    })
                    return;
                }
                //        判断规格1所属的规格2是否有该项
                if(spec2.isSpec2 == '1'){
                    return;
                }
                this.spec2Name = spec2.spec2;
//        调用赋值方法
                this.spec2Change(spec2.spec2);
                if(utils.isNull(this.spec1Name)){
                    return;
                }else {
                    let _this = this;
//          更改图片和价格
                    this.goodsData[0].products.forEach(function (item) {
                        if (item.spec1 == _this.spec1Name && item.spec2 == _this.spec2Name) {
//          更改商品规格
                            _this.productId = item.productId;
                            _this.goodsData[0].price = item.price;
                            _this.goodsData[0].thumbnail = item.thumbnail;
                        }
                    })
                    this.calcPrice();
                }
            },
            spec2Change(spec2){
                let _this = this;
                this.goodsData[0].products.forEach(function (item) {
                    if(item.spec2 == spec2){
                        _this.goodsData[0].products.forEach(function (data) {
                            if(!utils.isNull(item.spec1) && !utils.isNull(data.spec1) && item.spec1 == data.spec1){
                                _this.$set(data,'isSpec1','2');
                            }
                        })
                    }else{
                        _this.$set(item,'isSpec1','1');
                    }
                })
            },
//      选择规格1时触发
            spec1Choose:function (spec1,products) {
                let _this = this;
                if(spec1.spec1 == this.spec1Name){
                    this.spec1Name = '';
                    this.goodsData[0].products.forEach(function (data) {
                        _this.$set(data,'isSpec2','2');
                    })
                    return;
                }
//        判断规格2所属的规格1是否有该项
                if(spec1.isSpec1 == '1'){
                    return;
                }
                this.spec1Name = spec1.spec1;
//        调用赋值方法
                this.spec1Change(spec1.spec1);
                if(this.hasSpecTwo && utils.isNull(this.spec2Name)){//判断有没有规格2并且有没有选择规格2
                    return;
                }else{
                    let _this = this;
                    //          更改图片和价格
                    this.goodsData[0].products.forEach(function (item) {
                        if(item.spec1 == _this.spec1Name && item.spec2 == _this.spec2Name){
//          更改商品规格
                            _this.productId = item.productId;
                            _this.goodsData[0].price = item.price;
                            _this.goodsData[0].thumbnail = item.thumbnail;
                        }
                    })
                    this.calcPrice();
                }
            },
            spec1Change(spec1){
                let _this = this;
                this.goodsData[0].products.forEach(function (item) {
                    if(item.spec1 == spec1){
                        _this.goodsData[0].products.forEach(function (data) {
                            if(!utils.isNull(item.spec2) && !utils.isNull(data.spec2) && item.spec2 == data.spec2){
                                _this.$set(data,'isSpec2','2');
                            }
                        })
                    }else{
                        _this.$set(item,'isSpec2','1');
                    }
                })
            },
//      计算最终价格
            calcPrice(){
                let _this = this;
//          计算价格信息
                POST('website/member/order/calculate.jhtml?id=' + this.productId + '&quantity=' + this.buyNum).then(
                    function (data) {
                        if(data.type == 'success'){
                            if(data.type == 'success'){
                                _this.finallPrice = data.data.amount;
                                _this.couponName = data.data.couponName;
                                if(!_this.onecReceiver){
                                    _this.receiverList = [];
                                    _this.receiverList.push(data.data.receiver);
                                    _this.onecReceiver = true;
                                }
                            }
                        }else{
                            _this.close(data);
                        }
                    },function (err) {
                        _this.close(err);
                    }
                )
            },
//      判断是否有规格2
            hasSpec2(products){
                let spec2Num = 0;
                products.forEach(function (item,index) {
                    if(!utils.isNull(item.spec2)){
                        spec2Num ++ ;
                    }
                })
                if(spec2Num > 0){
//          return true;
                    this.hasSpecTwo = true;
                }else{
//          return false;
                    this.hasSpecTwo = false;
                }
            },
            //判断规格1重复
            isSpec1Rrepeat(index,item){
//        return true;
                var _this = this;
                if(index != 0){
                    for(var i = index;i > 0;i--){
                        if (item[index].spec1 == item[i - 1].spec1) {
                            return false
                        }
                    }
                    return true;
                } else {
                    return true;
                }
            },
            //判断规格2重复
            isSpec2Rrepeat(index,item){
//        return true;
                var _this = this;
                if(index != 0){
                    for(var i = index;i > 0;i--){
                        if (item[index].spec2 == item[i - 1].spec2) {
                            return false
                        }
                    }
                    return true;
                } else {
                    return true;
                }
            },

//      图片预览
            imgPreview(original,previewList){
                for(var i = 0;i < previewList.length;i ++){
                    if(original == previewList[i].src){
                        this.$preview.open(i,previewList);
                        return;
                    }
                }
            },

//      设置预览图片的列表
            setPreviewList(product){
                var _this = this;
                for(var index = 0;index < product.length;index ++){
//            过滤规格1重复的图
//            if(index != 0){
//              var num = 0;
//              for(var i = index;i > 0;i--){
//
//                if (product[index].spec1 == product[i - 1].spec1) {
//                  num ++ ;
//                }
//              }
//              if(num == 0){
//                _this.previewList.push({
//                  src:product[index].thumbnail,
//                  w:1200,
//                  h:900
//                })
//              }
//            } else {

                    _this.previewList.push({
                        src:utils.filterThumbnail(product[index].thumbnail),
                        w:900,
                        h:1000
                    })
//            }
                }
            },

//       开始时触发
            show:function (id,articleId) {
                id = this.goodId;
                let _this = this;
                GET('website/product/view.jhtml?id='+id,
                    function (data) {
                        if(data.type == 'success'){
                            _this.goodsData = [];
//              _this.finallPrice = data.data.products[0].price;
                            _this.productId = data.data.products[0].productId;
                            data.data.price = data.data.products[0].price;
                            data.data.thumbnail = data.data.products[0].thumbnail;
                            _this.buyNum = 1;
//              将页面list数据push进变量
                            _this.goodsData.push(data.data);
//              设置预览数组图
//                            _this.setPreviewList(data.data.products);



//              默认选中规格1并调用方法判断规格2是否可选
                            let sp1 = data.data.products[0].spec1;
                            if(!utils.isNull(sp1)){
                                _this.spec1Name = sp1;
                                _this.spec1Change(sp1);
                            }


//              调用计算接口
                            _this.calcPrice();

//              判断该商品是否有规格2
                            _this.hasSpec2(data.data.products);
//              判断该商品是否有规格1
                            if(utils.isNull(data.data.products[0].spec1)){
                                _this.hasSpecOne = false;
                            }else{
                                _this.hasSpecOne = true;
                            }

                        }else{
                            this.$emit("maskHide");
                            _this.close(data);
                        }
                    },function (err) {
                        this.$emit("maskHide");
                        _this.close(err);
                    })
            },
            goback:function () {
                this.close(utils.message("error","取消支付"));
            },
            close (e) {
                event.toast(e.content);
                this.$emit("maskHide");
            },
            hide(){
                this.$emit("maskHide");
            },
            maskHide:function () {
                this.$emit("maskHide");
            },
            numInput:function () {
                if(!utils.isNull(this.buyNum) && this.buyNum != 0){
                    this.calcPrice();
                }
            },
            goAddress:function () {
                let _this = this;
                event.openURL(utils.locate('widget/addressList.js?from=buyGoods&id=' + this.receiverList[0].id),function (data) {
                    if(data.type == 'success' && data.data != ''){
                        var a = [];
                        a.push(data.data);
                        _this.receiverList = a;
                    }else{
                        _this.onecReceiver = false;
                        _this.calcPrice();
                    }
                })

//        this.$router.push({
//          name: "receiverList",
//          query: {type:'buyGoods'}
//        });
            },
            addressAdd:function () {
                this.$refs.addressAdd.showAddressAdd();
            },
            selectAddress:function (address) {
                address = JSON.parse(address);
                this.receiverList = [];
                this.receiverList.push(address);
            },
            toastShow:function (msg) {
//                this.$refs.toast.show(msg);
                event.toast(msg);
            },
            returnFunc:function () {
                return;
            }
//methods 方法到此为止
        },
    }
</script>

