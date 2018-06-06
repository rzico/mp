<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div  class="corpusBox">
            <scroller scroll-direction="horizontal"  class="corpusScroll">
                <div class="articleClass" v-for="(item,index) in catagoryList" >
                    <text @click="catagoryChange(index,item.id)" class="allArticle" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </scroller>
        </div>
        <list  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="ordersList.length == 0">
                <noData :noDataHint="noDataHint"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in ordersList">
                <div class="goodsLine mt20">
                    <div class="space-between goodsHead" >
                        <div class="flex-row" @click="goAuthor(item.memberId)">
                            <image :src="item.logo | watchLogo" class="shopImg"></image>
                            <text class="title ml20 mr20">{{item.name}}</text>
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                        <div >
                            <text class="title red">{{item.statusDescr}}</text>
                        </div>
                    </div>
                    <div class="flex-row goodsBody"  v-for="goods in item.orderItems" @click="goDetails(item.sn)">
                        <image :src="goods.thumbnail | watchThumbnail" class="goodsImg"></image>
                        <div class="goodsInfo"  >
                            <text class="title goodsName" >{{goods.name}}</text>
                            <text  class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                            <div class="goodsPriceNum" >
                                <text class="title coral">¥ {{goods.price | currencyfmt}}</text>
                                <text class="sub_title">x{{goods.quantity}}</text>
                            </div>
                        </div>
                    </div>
                    <div class="flex-row goodsTotalPrice boder-bottom">
                        <div>
                            <text class="sub_title">{{item.createDate | watchCreateDate}}</text>
                        </div>
                        <div class="flex-row">
                            <text class="title mr20">共{{item.quantity}}件商品</text>
                            <text class="title ">合计:¥ {{item.amount | currencyfmt}}</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-if="item.status == 'unpaid'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <!--<text class="title footText">查看物流</text>-->
                            <text class="title footText" @click="closeOrder(item,item.sn)">关闭订单</text>
                            <text class="title footText " @click="confirmOrder(item.sn)">确认订单</text>
                        </div>
                    </div>

                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'refunding'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <!--<text class="title footText">查看物流</text>-->
                            <!--<text class="title footText">评价晒单</text>-->
                            <text class="title footText red" @click="confirmRefund(item.sn)">确认退款</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'unshipped'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <!--<text class="title footText">查看物流</text>-->
                            <!--<text class="title footText" @click="closeOrder(item,item.sn)">关闭订单</text>-->
                            <text class="title footText " @click="confirmRefund(item.sn)">退款</text>
                            <text class="title footText " @click="sendGoods(item.sn)">发货</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'returning'">
                        <div class="footMore">

                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <!--<text class="title footText">查看物流</text>-->
                            <!--<text class="title footText" @click="closeOrder(item,item.sn)">关闭订单</text>-->
                            <text class="title footText " @click="returnGoods(item.sn)">确认退货</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'shipped'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <!--<text class="title footText">查看物流</text>-->
                            <!--<text class="title footText" @click="closeOrder(item,item.sn)">关闭订单</text>-->
                            <text class="title footText " @click="returnGoods(item.sn)">退货</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .footMore{
        width: 206px;align-items: center;
    }
    .red{
        color: red;
        border-color: red;
    }
    .coral{
        color: coral;
    }
    .footText{
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 5px;
        border-color: #ccc;
        border-width: 1px;
        border-style: solid;
        margin-right: 20px;
    }
    .goodsFoot{
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 15px;
    }
    .goodsTotalPrice{
        padding: 20px;
        justify-content: space-between;
    }
    .goodsName{
        line-height: 32px;
        lines:2;
        text-overflow: ellipsis;
    }
    .goodsPriceNum{
        /*height: 160px;*/
        align-items: flex-end;
        justify-content: space-between;
        /*width: 150px;*/
        width:530px;
        display: flex;flex-direction: row;justify-content: space-between;
    }
    .goodsInfo{
        display: flex;flex-direction: column;justify-content: space-between;
        height: 160px;
        /*width: 400px;*/
        width: 550px;
        padding-left: 20px;
    }
    .goodsBody{
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #eee;
    }
    .goodsLine{
        background-color: #fff;
    }
    .goodsImg{
        height: 160px;
        width: 160px;
    }
    .goodsHead{
        background-color: #fff;
        padding: 20px;
    }
    .shopImg{
        height: 40px;
        width: 40px;
    }
    /**/
    .articleClass{
        flex-direction: row;
        height:100px;
        background-color: #fff;
        align-items: center;
        justify-content: center;
        /*flex: 1;*/
        width: 125px;
    }
    .allArticle{
        font-size: 31px;
        flex: 1;
        text-align: center;
        line-height: 96px;
    }
    .corpusScroll{
        flex-direction: row;
        width: 750px;
        background-color: #fff;
    }
    .corpusBox{
        flex-direction: row;
        height:100px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;

    }

</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    var modal = weex.requireModule('modal');
    export default {
        data:function(){
            return{
                ordersList:[],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                catagoryList:[{
                    name:'待付款',
                    id:1
                },{
                    name:'待发货',
                    id:2
                },{
                    name:'已发货',
                    id:3
                },{
                    name:'待退款',
                    id:4
                },{
                    name:'已完成',
                    id:0
                },{
                    name:'已关闭',
                    id:5
                }],
                whichCorpus:0,
                productCategoryId:1,
                clicked:false,
            }
        },
        props:{
            noDataHint:{default:'暂无订单'},
            title:{default:'订单管理'}
        },
        filters:{
            watchSpec:function (value) {
                if(utils.isNull(value)){
                    return '无';
                }else{
                    return value;
                }
            },
            watchCreateDate:function (value) {
                return utils.ymdhistimefmt(value);
            },
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,160,160);
            },
            watchlogo:function (value) {
                return utils.thumbnail(value,40,40);
            },
        },
        components: {
            navbar,noData
        },
        created(){
            utils.initIconFont();
            if(!utils.isNull(utils.getUrlParameter('index'))){
                this.whichCorpus = utils.getUrlParameter('index')
            }
            if(!utils.isNull(utils.getUrlParameter('productCategoryId'))){
                this.productCategoryId = utils.getUrlParameter('productCategoryId')
//                把字符串转换成整型，否则switch识别不了
                this.productCategoryId = parseInt(this.productCategoryId)
                this.pageStart = 0;
            }
            this.open();
        },
        methods:{

            //分类切换
            catagoryChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
                _this.whichCorpus = index;
                _this.productCategoryId = id;
                this.pageStart = 0;
                _this.open();
            },
            open:function (type) {
                var _this = this;
                var status = '';
                switch(this.productCategoryId){
                    case 0:
                        status = 'completed';
                        break;
                    case 1:
                        status = 'unpaid';
                        break;
                    case 2:
                        status = 'unshipped';
                        break;
                    case 3:
                        status = 'shipped';
                        break;
                    case 4:
                        status = 'refunding';
                        break;
                    case 5:
                        status = 'cancelled';
                        break;
                    default:
                        status = '';
                        break;
                }
                GET('weex/member/order/list.jhtml?status=' + status + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,
                    function (res) {
                        if (res.type=="success") {
                            if (res.data.start == 0) {
                                _this.ordersList = res.data.data;
                            } else {
                                res.data.data.forEach(function (item) {
                                    _this.ordersList.push(item);
                                })
                            }
                            _this.pageStart = res.data.start+res.data.data.length;
                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
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

            goback:function () {
                event.closeURL();
            },
            goDetails:function (sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/details.js?sn=' + sn), function () {
                    _this.clicked = false;
                });
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
                    }else{

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
                    if(data.type == 'success'){
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('发货成功');
                    }else{

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
            goAuthor(id) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
            },
        }
    }
</script>