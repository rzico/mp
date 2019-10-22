<template>
    <div class="wrapper">
        <report_header :pageName="pageName" :pageTime="pageTime" @iconTime="iconTime" @deductTime="deductTime" @addTime="addTime" @reportDayClick="reportDayClick" @reportMonthClick="reportMonthClick" @reportYearsClick="reportYearsClick"></report_header>
        <list   loadmoreoffset="180" v-if="reportList != null">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell  v-for="(item,index) in reportList">
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
                        <div class="flex-row goodsBody"  v-for="(goods,index) in item.shippingItems" v-if="index<2" @click="linkToInfo(item.orderSn,item.sn)">
                            <image :src="goods.thumbnail | watchThumbnail" class="goodsImg"></image>
                            <div class="goodsInfo"  >
                                <text class="title goodsName" >{{goods.name}}</text>
                                <text  class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                                <div class="goodsPriceNum" >
                                    <text class="sub_title">x{{goods.quantity}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="flex-row goodsBody"  v-for="(goods,index) in item.shippingItems" v-if="index >= 2 && showMore" @click="linkToInfo(item.orderSn,item.sn)">
                            <image :src="goods.thumbnail | watchThumbnail" class="goodsImg"></image>
                            <div class="goodsInfo"  >
                                <text class="title goodsName" >{{goods.name}}</text>
                                <text  class="sub_title ">规格:{{goods.spec | watchSpec}}</text>
                                <div class="goodsPriceNum" >
                                    <text class="sub_title">x{{goods.quantity}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="moreGoods" @click="controlMore" v-if="item.shippingItems.length>2">
                            <text class="moreIcon"  :style="{fontFamily:'iconfont'}" v-if="showMore">&#xe608;</text>
                            <text class="moreIcon"  :style="{fontFamily:'iconfont'}" v-else>&#xe601;</text>
                        </div>
                    </div>
                    <div class="flex-row goodsTotalPrice boder-bottom">
                        <div>
                            <text class="sub_title">NO.{{index+1}} 订单号:{{item.orderSn}}</text>
                        </div>
                        <div class="flex-row">
                            <text class="sub_title mr20">共{{item.quantity}}件商品</text>
                        </div>
                    </div>
                </div>
            </cell>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'"></loading>
            <cell v-if="reportList.length == 0" >
                <noData > </noData>
            </cell>
        </list>
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
    .red{
        color: red;
        border-color: red;
    }
    .coral{
        color: coral;
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
        display: flex;
        flex-direction: row;
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
</style>
<script>
    var modal = weex.requireModule('modal')
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    import navbar from '../../../include/navbar.vue'
    import report_header from '../../../widget/report_header.vue';
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    var animationPara;//执行动画的消息
    export default {
        data:function(){
            return{
                clicked:false,
                reportList:null,
                summarylist:[],
                refreshing: false,
                loadinging:false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                isIcon:true,
                timeDate:'',
                pageName:'配送明细',
                beginTime:'',
                endTime:'',
                sellerId:'',
                pageTime:'',
                showMore:false
            }
        },
        components: {
            report_header,noData
        },
        props: {

        },
        filters: {
            watchDate:function (val) {
                return utils.ymdtimefmt(val);
            },
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
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.sellerId = utils.getUrlParameter('sellerId');
            this.timeDate = utils.ymdtimefmt(Date.parse(new Date()));
            this.beginTime = this.timeDate+ ' ' +'00:00:00';
            this.endTime = this.timeDate+ ' ' +'23:59:59';
            if(!utils.isNull(utils.getUrlParameter('beginTime')) && !utils.isNull(utils.getUrlParameter('endTime'))){
                this.beginTime = utils.getUrlParameter('beginTime');
                this.endTime = utils.getUrlParameter('endTime');
                this.pageTime = utils.getUrlParameter('beginTime');
            }
            this.open();
        },
        methods: {
            controlMore(){
                this.showMore = !this.showMore
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
//            时间选择器
            iconTime (data) {
                this.beginTime = data.beginTime;
                this.endTime = data.endTime;
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
            onpanmove:function (e,index) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'up'){
                    _this.isIcon = false;// 当向上滑动时把变量置为false，达到再次点击div时触发的是收回动画
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateY(-200)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {

                    })
                }else if(e.direction == 'down'){
                    _this.isIcon = true;// 当向下滑动时把变量置为true，达到再次点击div时触发动画
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateY(0)',
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
            //            点击上箭头时
            onToptouchstart:function (e) {
                var _this = this;
                if(this.isIcon == true){
//                    根据isIcon这个变量判断当前是否是触发动画，为true时触发动画，false时收回动画
                    if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                    }else{
                        animation.transition(animationPara, {
                            styles: {
                                transform: 'translateY(-200)',
                            },
                            duration: 350, //ms
                            timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                            needLayout:false,
                            delay: 0 //ms
                        });
//                    触发动画后把变量置为false
                        _this.isIcon = false;
                    }
                }else{
                    if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                    }else{
                        animation.transition(animationPara, {
                            styles: {
                                transform: 'translateY(0)',
                            },
                            duration: 350, //ms
                            timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                            needLayout:false,
                            delay: 0 //ms
                        });
//                        触发动画后把变量置为true
                        _this.isIcon = true;
                    }
                }
//                获取当前点击的元素。
                animationPara =  e.currentTarget;
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;

                GET('weex/member/report/shipping_list_report.jhtml?type=shipping&beginDate='+encodeURIComponent(_this.beginTime)+'&endDate='+encodeURIComponent(_this.endTime)+'&pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize+'&sellerId='+_this.sellerId,function (res) {
                    if (res.type=="success") {
                        if (_this.pageStart==0) {
                            _this.reportList = res.data.data
                        } else {
                            res.data.data.forEach(function (item) {
                                _this.reportList.push(item);
                            })
                        }
                        _this.pageStart = _this.pageStart+res.data.data.length;
                        setTimeout(() => {
                            _this.loadinging = false;
                        }, 1000)
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
//            上拉加载
            onloading (event) {
                this.loadinging = true
                this.open();
            },
//            下拉刷新
            onrefresh:function (event) {
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
                    this.refreshing = false
                    _this.open();
                }, 1000)
            },
            //            跳转详情
            linkToInfo:function (orderSn,sn) {
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
        },

    }
</script>
