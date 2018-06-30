<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div  class="corpusBox">
            <div  class="corpusScroll">
                <div class="articleClass" v-for="(item,index) in catagoryList" >
                    <text @click="catagoryChange(index,item.id)" class="allArticle" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </div>
        </div>
        <list  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="shippingList.length == 0">
                <noData :noDataHint="noDataHint"></noData>
            </cell>
            <!--导航栏-->
            <cell v-else v-for="(item,index) in shippingList">
                <div class="goodsLine mt20">
                    <div class="space-between goodsHead" >
                        <div class="flex-row">
                            <image :src="item.logo | watchLogo" class="shopImg"></image>
                            <text class="title ml20 mr20">{{item.name}}</text>
                            <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                        </div>
                        <div >
                            <text class="title red">{{item.statusDescr}}</text>
                        </div>
                    </div>
                    <div class="flex-row goodsBody"  v-for="goods in item.shippingItems"  @click="info(item.orderSn,item.sn)">
                        <image :src="goods.thumbnail | watchThumbnail" class="goodsImg"></image>
                        <div class="goodsInfo"  >
                            <text class="title goodsName" >{{goods.name}}</text>
                            <text  class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                            <div class="goodsPriceNum" >
                                <!--<text class="title coral">¥ {{goods.price | currencyfmt}}</text>-->
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
                            <!--<text class="title">合计:¥ {{item.amount | currencyfmt}}</text>-->
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-if="item.status == 'unconfirmed'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <text class="title footText " @click="sendSingle(item.orderSn,item.sn)">派单</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'dispatch'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <text class="title footText " @click="delivery(item.orderSn,item.sn,item.shippingItems[index].id)">送达</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'receive'">
                        <div class="footMore">
                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <text class="title footText " @click="confirm(item.orderSn,item.sn)">核销</text>
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
        padding-left: 30px;
        padding-right: 30px;
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
        height:98px;
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
        width: 500px;
        height:98px;
        background-color:#fff;
    }
    .corpusBox{
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 750px;
        height:100px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color:#fff;

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
                shippingList:[],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                catagoryList:[{
                    name:'待确认',
                    id:1
                },{
                    name:'预约单',
                    id:2
                },{
                    name:'配送中',
                    id:3
                },{
                    name:'已送达',
                    id:4
                }],
                whichCorpus:0,
                productCategoryId:1,
                clicked:false,
                time:''
            }
        },
        props:{
            noDataHint:{default:'暂无运单'},
            title:{default:'送货管理'}
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
            this.permissions()

        },
        methods:{
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
//            //  关闭定时器.
//            clearDummyProcess(){
////              解除定时器
//                if (!utils.isNull(this.time))  {
//                    clearInterval(this.time);
//                    this.time = null;
//                }
//            },
////            获取经纬度
//            getGps:function(){
//                let _this = this
//                var uId = event.getUId();
//                event.getLocation(function (data) {
//                    if(data.type == 'success'){
//                        POST("/lbs/location.jhtml?lng=" + data.data.lng + "&lat=" +data.data.lat +'&memberId=' + uId).then(function (mes) {
//                            if (mes.type == 'success') {
//
//                            } else {
//                                event.toast(mes.content);
//                            }
//                        }, function (err) {
//                            event.toast(err.content)
//                        })
//                    }else {
//                        event.toast('定位失败，请开启GPS')
//                    }
//                })
//            },
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
                    case 1:
                        status = 'unconfirmed';
                        break;
                    case 2:
                        status = 'hope';
                        break;
                    case 3:
                        status = 'confirmed';
                        break;
                    case 4:
                        status = 'completed';
                        break;
                    default:
                        status = '';
                        break;
                }
                GET('weex/member/shipping/list.jhtml?status=' + status + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,
                    function (res) {
                        if (res.type=="success") {

                            if (res.data.start == 0) {
                                _this.shippingList = res.data.data;
                            } else {
                                res.data.data.forEach(function (item) {
                                    _this.shippingList.push(item);
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
//                this.clearDummyProcess()
                event.closeURL();
            },
            goDetails:function (sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/details.js?sn=' + sn), function () {
                    _this.clicked = false;
                });
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
            //            跳转详情
            info:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/info.js?orderSn=' + orderSn +'&sn=' + sn ),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            },
            //            跳转派单
            sendSingle:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (utils.isRoles("3",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.clicked = false;
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/sendSingle.js?orderSn=' + orderSn + '&sn='+sn),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success'){
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('派单成功');
                    }else{

                    }
                });
            },
            //            跳转送达
            delivery:function (orderSn,sn,shippingId) {

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/delivery.js?orderSn=' + orderSn + '&sn='+sn +'&shippingId=' + shippingId),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('送达成功');
                    }
                });
            },
            //            跳转核销
            confirm:function (orderSn,sn) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (utils.isRoles("3",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    });
                    _this.clicked = false;
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/confirm.js?orderSn=' + orderSn + '&sn='+sn),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('核销成功');
                    }
                });
            },
        }
    }
</script>