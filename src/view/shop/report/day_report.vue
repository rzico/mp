<template>
    <div class="wrapper">
        <report_header pageName="营业日报"  @iconTime="iconTime" @deductTime="deductTime" @addTime="addTime" @reportDayClick="reportDayClick" @reportMonthClick="reportMonthClick" @reportYearsClick="reportYearsClick"></report_header>
        <div class="classBox">
            <div class="tableOne">
                <text class="tableText">摘要</text>
            </div>
            <div class="tableTwo">
                <text class="tableText">数量</text>
            </div>
            <div class="tableThree">
                <text class="tableText">金额</text>
            </div>
        </div>
        <list>
            <cell>
                <div class="contentCell">
                    <text class="name pl20 titleWeight">本期订单</text>
                    <text class="quantity">{{day.todayOrder}}单</text>
                    <text class="amount"></text>
                </div>
            </cell>
            <cell>
                <div class="contentCell">
                    <text class="name pl20 titleWeight">本期销售</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.todayAmount}}元</text>
                </div>
            </cell>
            <cell>
                <div class="contentCell">
                    <text class="name pl20 titleWeight">本期收款</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.amount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">微信</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.wxAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">现金</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.cashAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">转账</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.bankAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">纸质水票</text>
                    <text class="quantity">{{day.couponAmount}}张</text>
                    <text class="amount"></text>
                </div>
            </cell>
            <cell>
                <div class="contentCell">
                    <text class="name pl20 titleWeight">本期退款</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.returnAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">微信</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.returnWxAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">现金</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.returnCashAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">转账</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.returnBankAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">纸质水票</text>
                    <text class="quantity">{{day.returnCouponAmount}}张</text>
                    <text class="amount"></text>
                </div>
            </cell>
            <cell>
                <div class="contentCell" @click="linkToDetail('point')">
                    <text class="name pl20 titleWeight">当前金币余额</text>
                    <text class="quantity"></text>
                    <div class="flex-row">
                        <text class="amount red">{{day.point}}元</text>
                        <text class="fz28 gray" style="width: 40px;text-align: center;align-items: center" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>

                </div>
                <div class="contentCell">
                    <text class="name pl50">本期发放</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.creditPoint}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期兑换</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.debitPoint}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期提现</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.transferPoint}}元</text>
                </div>
            </cell>
            <cell>
                <div class="contentCell" @click="linkToDetail('balance')">
                    <text class="name pl20 titleWeight">当前会员卡余额</text>
                    <text class="quantity"></text>
                    <div class="flex-row">
                        <text class="amount red">{{day.balance}}元</text>
                        <text class="fz28 gray" style="width: 40px;text-align: center;align-items: center" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期充值</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.creditBalance}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期消费</text>
                    <text class="quantity"></text>
                    <text class="amount">{{day.debitBalance}}元</text>
                </div>
            </cell>
            <cell>
                <div class="contentCell" @click="linkToDetail('water')">
                    <text class="name pl20 titleWeight">当前水票</text>
                    <text class="quantity red">{{day.waterCoupon}}张</text>
                    <div class="flex-row">
                        <text class="amount"></text>
                        <text class="fz28 gray" style="width: 40px;text-align: center;align-items: center" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期购买</text>
                    <text class="quantity">{{day.waterCouponBuyQuantity}}张</text>
                    <text class="amount">{{day.waterCouponBuyAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期使用</text>
                    <text class="quantity">{{day.waterCouponUseQuantity}}张</text>
                    <text class="amount">{{day.waterCouponUseAmount}}元</text>
                </div>
            </cell>
            <cell>
                <div class="contentCell" @click="linkToDetail('card')">
                    <text class="name pl20 titleWeight">当前套餐</text>
                    <text class="quantity red">{{day.cardCoupon}}张</text>
                    <div class="flex-row">
                        <text class="amount"></text>
                        <text class="fz28 gray" style="width: 40px;text-align: center;align-items: center" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期购买</text>
                    <text class="quantity">{{day.cardCouponBuyQuantity}}张</text>
                    <text class="amount">{{day.cardCouponBuyAmount}}元</text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期使用</text>
                    <text class="quantity">{{day.cardCouponUseQuantity}}张</text>
                    <text class="amount">{{day.cardCouponUseAmount}}元</text>
                </div>
            </cell>
            <cell>
                <div class="contentCell" @click="linkToDetail('gift')">
                    <text class="name pl20 titleWeight">当前礼卡</text>
                    <text class="quantity red">{{day.giftCoupon}}张</text>
                    <div class="flex-row">
                        <text class="amount"></text>
                        <text class="fz28 gray" style="width: 40px;text-align: center;align-items: center" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期购买</text>
                    <text class="quantity">{{day.giftCouponBuyQuantity}}张</text>
                    <text class="amount"></text>
                </div>
                <div class="contentCell">
                    <text class="name pl50">本期使用</text>
                    <text class="quantity">{{day.giftCouponUseQuantity}}张</text>
                    <text class="amount"></text>
                </div>
            </cell>
        </list>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .red{
        color: red;
    }
    .titleWeight{
        font-size:32px;
        font-weight: bold;
    }
    .pl50{
        padding-left: 50px;
    }
    .classBox{
        height: 90px;
        width: 750px;
        flex-direction: row;
        align-items: center;
        background-color: white;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
    }
    .tableOne{
        width:290px;
        flex-direction: row;
        align-items: center;
        padding-left:20px;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableTwo{
        width:210px;
        flex-direction: row;
        align-items: center;
        padding-left:20px;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableThree{
        width:250px;
        flex-direction: row;
        align-items: center;
        padding-left:20px;
    }
    .tableText{
        font-size: 28px;
        color: #444;
    }
    .contentCell{
        height: 90px;
        width: 750px;
        background-color: white;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
    }
    .name{
        font-size: 28px;
        width: 290px;
        lines:1;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .quantity{
        font-size: 28px;
        width: 210px;
        padding-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .amount{
        font-size: 28px;
        width: 210px;
        padding-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    const picker = weex.requireModule('picker')
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    import report_header from '../../../widget/report_header.vue';
    export default {
        data:function(){
            return{
                clicked:false,
                beginTime:"",
                endTime:'',
                timeDate:"",
                pageStart:0,
                day:{}
            }
        },
        components: {
            noData,report_header
        },
        props: {

        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.timeDate = utils.ymdtimefmt(Date.parse(new Date()));
            this.beginTime = this.timeDate+ ' ' +'00:00:00';
            this.endTime = this.timeDate+ ' ' +'23:59:59';
            this.open();
        },
        methods: {
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
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                GET('weex/member/report/day_summary.jhtml?beginDate='+encodeURIComponent(this.beginTime)+'&endDate='+encodeURIComponent(this.endTime),function (res) {
                    if (res.type=="success") {
                        _this.day = res.data;
                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },

            linkToDetail(type) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                if(type == 'balance' || type =='point' || type =='gift'){
                    event.openURL(utils.locate('view/shop/report/business_detail.js?type='+type), function (data) {
                        _this.clicked = false;
                    })
                }else {
                    event.openURL(utils.locate('view/shop/report/business_info.js?type='+type), function (data) {
                        _this.clicked = false;
                    })
                }

            },

        },

    }
</script>