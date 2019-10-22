<template>
    <div class="wrapper" >
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <list  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell>
                <div class="summaryBox">
                    <div class="summaryHeader">
                        <div class="headerOne">
                            <text class="headerTitle">品名</text>
                        </div>
                        <div class="headerTwo">
                            <text class="headerTitle">数量</text>
                        </div>
                        <div class="headerThree">
                            <text class="headerTitle">金额</text>
                        </div>
                    </div>
                    <div class="shopList" v-if="reportList.length != 0" v-for="item in reportList">
                        <div class="shopName">
                            <text class="shopNameTitle">{{item.name}}</text>
                        </div>
                        <div class="shopNumber">
                            <text class="shopNumberTitle">{{item.quantity}}</text>
                        </div>
                        <div class="shopNumber">
                            <text class="shopNumberTitleOne">¥{{item.amount}}</text>
                        </div>
                    </div>
                    <noData  v-if="reportList.length == 0" :noDataHint="noDataHint"></noData>
                </div>
                <div style="width: 750px;height: 500px"></div>
                <div class="summaryBottomBox">
                    <div class="shopSummary">
                        <div>
                            <text style="font-weight: 700">合计:</text>
                        </div>
                        <div>
                            <text style="font-weight: 700;color: red;">¥{{summaryPrice}}</text>
                        </div>
                    </div>
                    <div class="summaryBottom">
                        <div class="summary" @click="linkToDetail('card')" v-if="status.card != '0'">
                            <text>套餐</text>
                            <div class="summaryNumber">
                                <text>{{status.card}}次</text>
                                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                        <div class="summary" @click="linkToDetail('water')" v-if="status.water != '0'">
                            <text>水票</text>
                            <div class="summaryNumber">
                                <text>{{status.water}}张</text>
                                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                        <div class="summary" @click="linkToDetail('point')" v-if="status.point != '0'">
                            <text>金币</text>
                            <div class="summaryNumber">
                                <text>{{status.point}}个</text>
                                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                        <div class="summary" @click="linkToDetail('balance')" v-if="status.balance != '0'">
                            <text>余额</text>
                            <div class="summaryNumber">
                                <text>{{status.balance}}元</text>
                                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'"></loading>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .wrapper,body{
        background-color: #f2f2f2;
    }
    .summaryBox{
        width: 750px;
        background-color: white;
        border-radius: 12px;
    }
    .summaryBottomBox{
        position: fixed;
        bottom: 0;
        background-color: white;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #e6e6e6;
    }
    .summaryHeader{
       display: flex;
       flex-direction: row;
       padding-top: 20px;
       padding-bottom: 20px;
       border-bottom-style: solid;
       border-bottom-color: #e6e6e6;
       border-bottom-width: 1px;
    }
    .headerOne{
       width: 350px;
       border-right-color: #e6e6e6;
       border-right-width: 1px;
       border-right-style: solid;
    }
    .headerTwo{
        width: 200px;
        border-right-color: #e6e6e6;
        border-right-width: 1px;
        border-right-style: solid;
    }
    .headerThree{
        width: 200px;
    }
    .headerTitle{
        text-align: center;
    }
    .shopList{
        display: flex;
        flex-direction: row;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top-style: solid;
        border-top-color: #e6e6e6;
        border-top-width: 1px;
    }
    .shopName{
        width: 350px;
    }
    .shopNumber{
        width: 200px;
    }
    .shopNameTitle{
        text-align: left;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
    }
    .shopNumberTitle{
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .shopNumberTitleOne{
        text-align: right;
        margin-right: 20px;
        lines:1;
        text-overflow: ellipsis;
    }
    .shopSummary{
        width: 750px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
    }
    .summaryBottom{
        padding-left: 20px;
        padding-right: 20px;
        /*box-sizing: border-box;*/
        border-top-width: 8px;
        border-top-style: solid;
        border-top-color: #e6e6e6;
    }
    .summary{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
        border-top-color: #e6e6e6;
        border-top-style: solid;
        border-top-width: 1px;
    }
    .summaryNumber{
        display: flex;
        flex-direction: row;
        align-items: center;
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
                reportList:[],
                summaryPrice:0,
                pageStart:0,
                pageSize:20,
                beginTime:'2019-1-1 32:59:59',
                endTime:'2019-12-31 32:59:59',
                status:{},
                memberId:'',
                id:'',
                refreshing:false,
                loadinging:false,
                refreshImg:utils.locate('resources/images/loading.png'),
            }
        },
        props:{
            noDataHint:{default:'暂无订单'},
            title:{default:'订单汇总'}
        },
        filters:{

        },
        components: {
            navbar,noData,WxcLoading,WxcPartLoading,report_header
        },
        created(){
            utils.initIconFont();
            this.memberId = utils.getUrlParameter('memberId');
            this.id = utils.getUrlParameter("id");
            this.open();
            this.openSummary()
        },
        methods:{

            open:function () {
                var _this = this;
                _this.summaryPrice = 0
                GET('weex/member/report/order_member_summary.jhtml?memberId='+this.memberId,function (res) {
                    if (res.type=="success") {
                        // if (_this.pageStart==0) {
                            _this.reportList = res.data;
                            _this.reportList.forEach(function (item) {
                                _this.summaryPrice += item.amount
                            })
                            _this.summaryPrice = _this.summaryPrice.toFixed(2)
                        // } else {
                        //     res.data.forEach(function (item) {
                        //         _this.reportList.push(item);
                        //     })
                        // }
                        // _this.pageStart = _this.pageStart+res.data.length;
                        // setTimeout(() => {
                        //     _this.loadinging = false;
                        //     _this.refreshing = false
                        // }, 1000)
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
            openSummary: function () {
                var _this = this;
                GET('weex/member/report/business_status.jhtml?memberId='+_this.memberId, function (res) {
                    if (res.type == "success") {
                        _this.status = res.data
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
//             onloading:function () {
// ////            获取订单列表
//                 this.open();
//             },
            //            上拉加载
            // onloading (event) {
            //     this.loadinging = true
            //     this.open();
            // },
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
                    this.loadinging = false
                    this.open();
////            获取关注列表
                }, 1000)
            },

            goback:function () {
                event.closeURL();
            },

            linkToDetail(type) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(type == 'balance'){
                    event.openURL(utils.locate("view/shop/card/deposit.js?id="+_this.id),function (data) {
                        _this.clicked =false
                    })
                }else if(type =='point'){
                    event.openURL(utils.locate("view/shop/card/integral.js?id="+_this.id),function (data) {
                        _this.clicked =false
                    })
                } else {
                    event.openURL(utils.locate('view/shop/report/business_info.js?type='+type+'&memberId='+_this.memberId), function (data) {
                        _this.clicked = false;
                    })
                }

            }
        }
    }
</script>
