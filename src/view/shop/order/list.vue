<template>
    <div class="wrapper" >
        <!--<navbar :title="title"  @goback="goback" ></navbar>-->
        <div class="header"  :class="[classHeader()]">
            <transition name="component-fade-top" mode="out-in">
                <div class="pageTop" v-if="!doSearch">
                    <div class="nav_back " @click="goback()">
                        <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
                    </div>
                    <div class="nav">
                        <text class="nav_title">{{title}}</text>
                        <div class="navRightBox"  @click="goSearch()">
                            <!--<text class="nav_Complete nav_title" v-if="complete != 'textIcon'">{{complete}}</text>-->
                            <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" >&#xe611;</text>
                        </div>
                    </div>
                </div>
                <div v-else  class="search">
                    <div class="search_box flex5">
                        <div class="flex-start">
                            <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                            <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput" @return = "search" autofocus="true" ref="searchBar" :placeholder="searchHint"/>
                        </div>
                        <text class="clearBuf ico_small gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
                    </div>
                    <div class="flex-center flex1" @click="noSearch()">
                        <text class="fz32 searchCancelText" >{{searchOrCancel}}</text>
                    </div>
                </div>
            </transition>
        </div>
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
                        <div class="flex-row">
                            <image :src="item.logo | watchLogo" class="shopImg"></image>
                            <div class="">
                                <text class="consignee ml20 mr20">{{item.consignee}}</text>
                                <text class="address">{{item.address}}</text>
                            </div>
                        </div>
                        <div >
                            <text class="title red" style="max-width: 230px;lines:1;text-overflow: ellipsis;">{{item.statusDescr}}</text>
                        </div>
                    </div>
                    <div>
                        <div class="flex-row goodsBody"  v-for="(goods,index) in item.orderItems" v-if="index<2" @click="goDetails(item.sn)">
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
                        <div class="flex-row goodsBody"  v-for="(goods,index) in item.orderItems" v-if="index >= 2 && showMore" @click="goDetails(item.sn)">
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
                        <div class="moreGoods" @click="controlMore" v-if="item.orderItems.length>2">
                            <text class="moreIcon"  :style="{fontFamily:'iconfont'}" v-if="showMore">&#xe608;</text>
                            <text class="moreIcon"  :style="{fontFamily:'iconfont'}" v-else>&#xe601;</text>
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
                            <text class="title footText" @click="showMask(item,index)">改价</text>
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
                            <text class="title footText " @click="canRefund(item.sn,'撤销退款')">撤销退款</text>
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
                            <text class="title footText " @click="sendGoods(item.sn)">认领</text>
                        </div>
                    </div>
                    <div class="flex-row space-between goodsFoot" v-else-if="item.status == 'returning'">
                        <div class="footMore">

                            <!--<text class="sub_title">删除</text>-->
                        </div>
                        <div class="flex-row">
                            <!--<text class="title footText">查看物流</text>-->
                            <!--<text class="title footText" @click="closeOrder(item,item.sn)">关闭订单</text>-->
                            <text class="title footText " @click="canRefund(item.sn,'撤销退货')">撤销退货</text>
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
                            <text class="title footText " @click="checkLogistics(item.sn)" v-if="item.shippingMethod !='warehouse'">查看物流</text>
                            <text class="title footText " @click="shippingConfirm(item.sn)" v-if="item.isShipping==true">核销</text>
                            <text class="title footText " @click="returnGoods(item.sn)" v-if="item.isShipping==false">退货</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <div style="height: 80px;"></div>
            </cell>
        </list>
        <div class="bottomBox">
            <text class="fz32">今日订单:{{summary.shipped}}/{{summary.all}}单,合计:{{summary.amount}}元</text>
        </div>
        <!--改价-->
        <div class="changeMask" v-if="isMask">
            <div class="maskContent">
                <text class="maskTitle primary">修改价格</text>
                <div class="maskCell">
                    <text class="fz32">订单原价:</text>
                    <text class="fz32 ml30" style="color: red">¥{{orderAmout}}</text>
                </div>
                <div class="maskCellTwo">
                    <text class="fz32">订单现价:</text>
                    <input type="number" class="nowAmout" placeholder="请输入该订单现价" v-model="orderNowAmout"/>
                </div>
                <div class="maskButtonBox bd-primary">
                    <div class="maskLeftButton bd-primary" @click="downMask">
                        <text class="fz35 primary">取消修改</text>
                    </div>
                    <div class="maskRightButton" @click="changeAmount">
                        <text class="fz35 primary">确认修改</text>
                    </div>
                </div>
            </div>
        </div>
        <wxc-loading :show="clicked" type="default"></wxc-loading>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .moreGoods{
        width: 710px;
        height: 50px;
        align-items: center;
        justify-content: center;
    }
    .moreIcon{
        font-size:34px;
    }
    .consignee{
        font-size: 32px;
        width: 400px;
        lines:1;
        text-overflow: ellipsis;
    }
    .address{
        font-size: 26px;
        margin-left: 20px;
        width: 400px;
        lines:1;
        text-overflow: ellipsis;
    }
    /*<!---->*/
    /*动画*/
    .component-fade-top-enter-active{
        transition: all 0.2s;
    }
    .component-fade-top-leave-active {
        transition: all 0.2s;
    }
    .component-fade-top-leave-to{
        transform: translateX(0px);
        opacity: 0;
    }
    .component-fade-top-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }
    .component-fade-top-enter{
        transform: translateX(0px);
        opacity: 0;
    }
    /**/
    .pageTop{
        flex-direction: row;
    }
    /*<!--搜索栏-->*/

    .searchCancelText{
        color: #fff;
    }
    .search {
        position:sticky;
        background:#eee;
        /*height: 100px;*/
        flex-direction: row;
        flex:1;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }
    .clearBuf {
        width:58px;
        height:58px;
        text-align: center;
        padding-top: 10px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 58px;
        height: 58px;
        width:400px;
    }
    /*<!--顶部导航栏-->*/
    .navRightBox{
        min-width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .nav_CompleteIcon{
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
    }


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
        width: 187px;
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

    .changeMask{
        position: fixed;
        top:0;
        bottom: 0;
        left: 0;
        right:0;
        background-color: rgba(0,0,0,0.7);
        align-items: center;
    }
    .maskContent{
        width: 650px;
        background-color: #ffffff;
        border-radius: 10px;
        flex-direction: column;
        align-items: center;
        margin-top: 150px;
        overflow: hidden;
    }
    .maskTitle{
        font-size: 36px;
        margin-top: 60px;
    }
    .maskCell{
        width: 600px;
        flex-direction: row;
        align-items: center;
        margin-top: 50px;
    }
    .maskCellTwo{
        width: 600px;
        height: 100px;
        flex-direction: row;
        align-items: center;
    }
    .nowAmout{
        margin-left: 30px;
        width: 400px;
        height: 98px;
        font-size: 32px;
    }
    .maskButtonBox{
        width: 650px;
        border-top-width: 2px;
        flex-direction: row;
        align-items: center;
        margin-top: 50px;
    }
    .maskLeftButton{
        width: 325px;
        height: 100px;
        align-items: center;
        justify-content: center;
        border-right-width: 2px;
    }
    .maskLeftButton:active{
        background-color: #ccc;
    }
    .maskRightButton{
        width: 325px;
        height: 100px;
        align-items: center;
        justify-content: center;
    }
    .maskRightButton:active{
        background-color: #ccc;
    }
    .bottomBox{
        position: fixed;
        bottom: 0;
        width: 750px;
        height: 80px;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 30px;
        padding-right: 30px;
        border-top-width:1px;
        border-top-color: #cccccc;
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
    import { WxcLoading, WxcPartLoading } from 'weex-ui';
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
                    name:'待认领',
                    id:2
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
                doSearch:false,
                keyword:'',
                searchHint: "输入收货人、电话、地址",
                searchOrCancel:'取消',
                isMask:false,
                orderAmout:0,
                orderNowAmout:'',
                nowSn:'',
                nowIndex:0,
                showMore:false,
                summary:{}
            }
        },
        props:{
            noDataHint:{default:'暂无订单'},
            title:{default:'我的订单'}
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
            navbar,noData,WxcLoading,WxcPartLoading
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
            this.getSum()
        },
        methods:{
            getSum(){
                let _this =this;
                GET('weex/member/order/summary.jhtml', function (data) {
                        if(data.type == 'success'){
                            _this.summary = data.data;
                        }else{
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    })
            },
            //            前往搜索
            goSearch:function () {
                this.doSearch = true;
                this.searchOrCancel = '取消'
                let _this = this;
                this.ordersList = [];
                this.noDataHint = "输入收货人、电话、地址";
//                event.openURL(utils.locate('view/shop/goods/search.js'), function (res) {
//                    _this.doReset();
//                    if(res.type == 'success'){
//
//                    }
//                });
            },
            oninput:function (e) {
                this.isSearch = false;
                this.keyword = e.value;
                this.searchOrCancel = '搜索';
                this.ordersList = [];
                this.noDataHint = "输入收货人、电话、地址";
                if(e.value.length == 0){
                    this.searchOrCancel = '取消'
                }
            },
            search: function (e) {
                var _this = this;
                this.isSearch = true;
                this.pageStart = 0;
                this.searchOrCancel = '取消';
                this.open();
            },
//            点击右上角取消或者搜索按钮
            noSearch:function () {
                this.inputBlur();
                if(this.searchOrCancel == '取消'){
                    this.pageStart = 0;
                    this.doSearch = false;
                    this.noDataHint = "暂无订单";
                    this.open();
                }else{
                    this.search();
                }
            },
            inputBlur(){
                this.$refs['searchBar'].blur();
            },
            //          清空关键字
            clearBuf:function () {
                this.keyword = '';
            },
            classHeader:function () {
                let dc = utils.device();
                return dc
            },

            //分类切换
            catagoryChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus === index){
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
                    case 5:
                        status = 'cancelled';
                        break;
                    default:
                        status = '';
                        break;
                }
                GET('weex/member/order/list.jhtml?status=' + status + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize +'&keyword=' + encodeURIComponent(this.keyword),
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
            controlMore(){
              this.showMore = !this.showMore
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
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
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
                                    _this.clicked = false
                                    _this.pageStart = 0;
                                    _this.open();
                                    event.toast('退款成功');
                                }else{
                                    _this.clicked = false
                                    modal.alert({
                                        message: data.content,
                                        okTitle: '确认'
                                    }, function () {
                                        event.closeURL();
                                    })
                                }
                            },function (err) {
                                _this.clicked = false
                                modal.alert({
                                    message: err.content,
                                    okTitle: '确认'
                                }, function () {
                                    event.closeURL();
                                })
                            }
                        )
                    }else {
                        _this.clicked = false
                    }
                })

            },
//            关闭订单
            closeOrder:function (item,sn) {
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
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
                                _this.clicked = false
                            }else{
                                _this.clicked = false
                                modal.alert({
                                    message: data.content,
                                    okTitle: '确认'
                                }, function () {
                                    event.closeURL();
                                })
                            }
                        },function (err) {
                            _this.clicked = false
                            modal.alert({
                                message: err.content,
                                okTitle: '确认'
                            }, function () {
                                event.closeURL();
                            })
                        })
                    }else {
                        _this.clicked = false
                    }
                })
            },
            //更改订单价格
            showMask(item,index){
                this.isMask = true;
                this.orderAmout = item.amountPayable;
                this.nowSn = item.sn;
                this.nowIndex = index;
            },
            downMask(){
                this.isMask = false;
            },
            changeAmount(){
                let _this = this;
                if(utils.isNull(this.orderNowAmout)){
                    event.toast('请输入订单现价')
                    return
                }
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                this.isMask = false;
                POST('weex/member/order/updatePrice.jhtml?sn='+this.nowSn + '&price=' +this.orderNowAmout).then(function (data) {
                    _this.clicked = false;
                    _this.orderNowAmout = '';
                    if(data.type == 'success'){
                        _this.ordersList[_this.nowIndex].amount = data.data.amount;
                        event.toast('修改价格成功');
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    _this.clicked = false;
                    _this.orderNowAmout = '';
                    event.toast(err.content);
                })
            },
//            确认订单
            confirmOrder:function (sn) {
                let _this = this;

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
                        modal.alert({
                            message: data.content,
                            okTitle: '确认'
                        }, function () {
                            event.closeURL();
                        })
                    }
                });
            },
            //            确认订单
            shippingConfirm:function (sn) {
                let _this = this;

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/order/shippingConfirm.js?orderSn=" + sn),function (data) {
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
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate("view/shop/order/delivery.js?sn=" + sn),function (data) {
                    _this.clicked = false;
                    if(data.type == 'success'){
                        _this.pageStart = 0;
                        _this.open();
                        event.toast('认领成功');
                    }else{

                    }

                });
            },
            //查看物流
            checkLogistics(sn){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                GET('deliveryCorp/query.jhtml?sn=' + sn,function (data) {
                    _this.clicked = false;
                    if(data.type == 'success'){
                        event.openURL(utils.locate("view/webView/index.js?url=" + encodeURIComponent(data.data)),function (message) {
                            _this.clicked = false;
                        })
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
                })
            },
//            退货
            returnGoods:function (sn) {
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
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
                                    _this.clicked = false
                                    _this.pageStart = 0;
                                    _this.open();
                                    event.toast('退货成功');
                                }else{
                                    _this.clicked = false
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
                    }else {
                        _this.clicked = false
                    }
                })
            },
            //取消退货,退款
            canRefund(sn,title){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                modal.confirm({
                    message: title,
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/order/unReturns.jhtml?sn=' + sn).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.pageStart = 0;
                                    _this.open();
                                    event.toast(title+'成功');
                                    _this.clicked = false
                                }else{
                                    _this.clicked = false
                                    modal.alert({
                                        message: data.content,
                                        okTitle: '确认'
                                    }, function () {
                                        event.closeURL();
                                    })
                                }
                            },function (err) {
                                _this.clicked = false
                                modal.alert({
                                    message: err.content,
                                    okTitle: '确认'
                                }, function () {
                                    event.closeURL();
                                })
                            }
                        )
                    }else {
                        _this.clicked = false
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
