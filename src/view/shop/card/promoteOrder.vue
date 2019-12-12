<template>
    <div class="wrapper" >
        <report_header :pageName="pageName" :type="type" :pageTime="pageTime" @iconTime="iconTime" @deductTime="deductTime" @addTime="addTime" @reportDayClick="reportDayClick" @reportMonthClick="reportMonthClick" @allClick="allClick" @reportYearsClick="reportYearsClick"></report_header>
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

                </div>
            </cell>
        </list>
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
    import report_header from '../../../widget/report_header.vue';
    export default {
        data:function(){
            return{
                ordersList:[],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                whichCorpus:0,
                productCategoryId:1,
                clicked:false,
                doSearch:false,
                keyword:'',
                searchOrCancel:'取消',
                isMask:false,
                orderAmout:0,
                orderNowAmout:'',
                nowSn:'',
                nowIndex:0,
                showMore:false,
                summary:{},
                pageName:'推广记录',
                type:'all',
                pageTime:'',
                beginTime:'',
                endTime:'',
                promoteId:''
            }
        },
        props:{
            noDataHint:{default:'暂无推广记录'},
            title:{default:'推广记录'}
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
            navbar,noData,WxcLoading,WxcPartLoading,report_header
        },
        created(){
            utils.initIconFont();
            this.promoteId = utils.getUrlParameter('promoteId');
            this.timeDate = utils.ymdtimefmt(Date.parse(new Date()));
            this.beginTime = this.timeDate+ ' ' +'00:00:00';
            this.endTime = this.timeDate+ ' ' +'23:59:59';
            if(!utils.isNull(utils.getUrlParameter('beginTime')) && !utils.isNull(utils.getUrlParameter('endTime'))){
                this.beginTime = utils.getUrlParameter('beginTime');
                this.endTime = utils.getUrlParameter('endTime');
                this.pageTime = utils.getUrlParameter('beginTime');
            }
            this.allClick();
        },
        methods:{

            open:function () {
                var _this = this;
                GET('weex/member/order/plist.jhtml?beginDate='+encodeURIComponent(_this.beginTime)+'&endDate='+encodeURIComponent(_this.endTime)+'&pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize+'&promoterId='+_this.promoteId,function (res) {
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
            //            时间选择器
            iconTime (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            //            点击减少时间
            deductTime:function (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            //            点击增加时间
            addTime:function (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            //            点击全部
            allClick(data){
                this.beginTime = '';
                this.endTime = '';
                this.pageStart = 0 ;
                this.open()
            },
            //            点击日报
            reportDayClick(data){
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            //            点击月报
            reportMonthClick(data){
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
            //            点击年报
            reportYearsClick(data){
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
                this.pageStart = 0 ;
                this.open()
            },
        }
    }
</script>
