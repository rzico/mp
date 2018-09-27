<template>
    <div class="wrapper">
        <report_header :pageName="pageName"  :pageTime="pageTime" @iconTime="iconTime" @deductTime="deductTime" @addTime="addTime" @reportDayClick="reportDayClick" @reportMonthClick="reportMonthClick" @reportYearsClick="reportYearsClick"></report_header>
        <div class="classBox">
            <div class="tableTwo">
                <text class="tableText">时间</text>
            </div>
            <div class="tableOne">
                <text class="tableText">月结</text>
            </div>
            <div class="tableOne">
                <text class="tableText">欠款</text>
            </div>
            <div class="tableOne">
                <text class="tableText">欠票</text>
            </div>
        </div>
        <list   @loadmore="onloading" loadmoreoffset="180" v-if="reportList != null">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="(c,index) in reportList" ref="adoptPull" >
                <div class="contentCell" @click="linkToView(c.sn)" >
                    <div class="contentSmallCell">
                        <text class="contentCellTypeTwo">{{c.completeDate | watchDate}}</text>
                        <text class="contentCellType">{{c.monthPay}}</text>
                        <text class="contentCellType">{{c.arrears}}</text>
                        <text class="contentCellType">{{c.paper}}</text>
                    </div>
                </div>
            </cell>
            <cell v-if="reportList.length == 0" >
                <noData > </noData>
            </cell>
            <!--<cell>-->
            <!--<div style="height: 130px"></div>-->
            <!--</cell>-->

        </list>

        <!--<div class="bottomTotal" @swipe="onpanmove($event,index)" @touchstart="onToptouchstart($event)" v-if="summarylist != null ">-->
        <!--&lt;!&ndash;点击上箭头或向上滑动展开&ndash;&gt;-->
        <!--<div class="iconBox">-->
        <!--<text class="bigIcon" :style="{fontFamily:'iconfont'}"  v-if="isIcon">&#xe608;</text>-->
        <!--<text class="bigIcon" :style="{fontFamily:'iconfont'}"  v-if="!isIcon">&#xe601;</text>-->
        <!--</div>-->
        <!--<div class="bottomCell">-->
        <!--<div class="contentSmallCell">-->
        <!--<text class="number">合计</text>-->
        <!--<text class="contentCellType">派单</text>-->
        <!--<text class="returnMoney">{{sQuantityTotal}}</text>-->
        <!--<text class="returnMoney">{{sReturnQuantityTotal}}</text>-->
        <!--<text class="returnMoney">{{sPledgeQuantityTotal}}</text>-->
        <!--<text class="money">{{sQuantityTotal - sReturnQuantityTotal - sPledgeQuantityTotal}}</text>-->
        <!--</div>-->
        <!--<div class="contentSmallCell">-->
        <!--<text class="number"></text>-->
        <!--<text class="contentCellType">送货</text>-->
        <!--<text class="returnMoney">{{quantityTotal}}</text>-->
        <!--<text class="returnMoney">{{returnQuantityTotal}}</text>-->
        <!--<text class="returnMoney">{{pledgeQuantityTotal}}</text>-->
        <!--<text class="money">{{quantityTotal - returnQuantityTotal - pledgeQuantityTotal}}</text>-->
        <!--</div>-->
        <!--</div>-->
        <!--<list style="max-height: 500px">-->
        <!--<cell class="" v-for="t in summarylist">-->
        <!--<div class="bottomCellTwo">-->
        <!--<div class="contentSmallCell">-->
        <!--<text class="number">{{t.barrelName}}</text>-->
        <!--<text class="contentCellType">派单</text>-->
        <!--<text class="returnMoney">{{t.sQuantity}}</text>-->
        <!--<text class="returnMoney">{{t.sReturnQuantity}}</text>-->
        <!--<text class="returnMoney">{{t.sPledgeQuantity}}</text>-->
        <!--<text class="money">{{t.sQuantity - t.sReturnQuantity - t.sPledgeQuantity}}</text>-->
        <!--</div>-->
        <!--<div class="contentSmallCell">-->
        <!--<text class="number"></text>-->
        <!--<text class="contentCellType">送货</text>-->
        <!--<text class="returnMoney">{{t.quantity}}</text>-->
        <!--<text class="returnMoney">{{t.returnQuantity}}</text>-->
        <!--<text class="returnMoney">{{t.pledgeQuantity}}</text>-->
        <!--<text class="money">{{t.quantity - t.returnQuantity -t.pledgeQuantity}}</text>-->
        <!--</div>-->
        <!--</div>-->
        <!--</cell>-->
        <!--</list>-->
        <!--</div>-->
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .list{
        padding-bottom: 140px;
        background-color: white;

    }
    .classBox{
        height: 80px;
        width: 750px;
        flex-direction: row;
        align-items: center;
        background-color: white;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
    }
    .tableOne{
        width:175px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableTwo{
        width:225px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableThree{
        width:160px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .tableText{
        font-size: 28px;
        color: #444;
    }
    .bottomTotal{
        align-items: center;
        width: 750px;
        height: 630px;
        background-color: white;
        position: fixed;
        bottom:-440px;
        left: 0;
        border-top-width: 1px;
        border-color: #ccc;
    }
    .bigIcon{
        font-size: 30px;
        color: #777;
    }
    .iconBox{
        width: 150px;
        align-items: center;
        justify-content: center;
    }
    .bottomCell{
        height: 160px;
        width: 750px;
        background-color: #f5f5f5;
        flex-direction: column;
        border-bottom-width:1px;
        border-color:#cccccc;
    }
    .bottomCellTwo{
        height: 160px;
        width: 750px;
        flex-direction: column;
        border-bottom-width:1px;
        border-color:#cccccc;
    }
    .totalIcon{
        font-size: 80px;
    }
    .titleCell{
        height: 80px;
        width: 750px;
        background-color: #ccc;
        flex-direction: row;
        align-items: center;
    }
    .contentCell{
        width: 750px;
        background-color: white;
        flex-direction: column;
        align-items: center;
    }
    .contentSmallCell{
        height: 80px;
        width: 750px;
        flex-direction: row;
        align-items: center;
        border-bottom-width: 1px;
        border-color: #cccccc;
    }
    .address{
        width: 750px;
        padding-left: 30px;
        padding-right: 30px;
        lines:1;
        text-overflow: ellipsis;
    }
    .shopName{
        font-size: 32px;
        margin-left: 30px;
        lines:1;
        text-overflow: ellipsis;
    }
    .number{
        font-size: 30px;
        width: 150px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .money{
        font-size: 30px;
        width: 112.5px;
        padding-right: 30px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .returnMoney{
        font-size: 30px;
        width: 160px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .contentCellType{
        font-size: 30px;
        width: 175px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .contentCellTypeTwo{
        font-size: 30px;
        width: 225px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .typeName{
        font-size: 28px;
        padding-left: 30px;
        text-align: left;
        lines:1;
        text-overflow: ellipsis;
    }
    .refund{
        font-size: 28px;
        width: 200px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .amount{
        font-size: 28px;
        width: 200px;
        padding-right: 30px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
</style>
<script>
    var modal = weex.requireModule('modal')
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    const picker = weex.requireModule('picker')
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
                summarylist:null,
                refreshing: false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                isIcon:true,
                timeDate:'',
                pageName:'欠款明细',
                beginTime:'',
                endTime:'',
                quantityTotal:0,
                returnQuantityTotal:0,
                pledgeQuantityTotal:0,
                sQuantityTotal:0,
                sReturnQuantityTotal:0,
                sPledgeQuantityTotal:0,
                pageTime:''
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
            }
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.memberId = utils.getUrlParameter('memberId')
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
//        dom呈现完执行滚动一下
        updated(){
////            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
//            if(this.hadUpdate){
//                return;
//            }
//            this.hadUpdate = true;
////            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
//            if(!utils.isIosSystem()){
//                const el = this.$refs.adoptPull//跳转到相应的cell
//                dom.scrollToElement(el, {
//                    offset: -119
//                })
//            }
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
            onpanmove:function (e,index) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'up'){
                    _this.isIcon = false;// 当向上滑动时把变量置为false，达到再次点击div时触发的是收回动画
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateY(-440)',
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
                                transform: 'translateY(-440)',
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
            //判断水站是否重复
            isSellerName(index){
                if(index != 0){
                    if(this.reportList[index].sellerName == this.reportList[index - 1].sellerName){
                        return false;
                    }
                }
                return true;
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                GET('weex/member/report/arrears_detail_report.jhtml?beginDate='+encodeURIComponent(_this.beginTime)+'&endDate='+encodeURIComponent(_this.endTime)+'&pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize+'&memberId='+_this.memberId,function (res) {
                    if (res.type=="success") {
                        if (_this.pageStart==0) {
                            _this.reportList = res.data.data;
                        } else {
                            res.data.data.forEach(function (item) {
                                _this.reportList.push(item);
                            })
                        }
                        _this.pageStart = _this.pageStart+res.data.data.length;

                    } else {
                        event.toast(res.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                })
            },
//            上拉加载
            onloading (event) {
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

            linkToView(sn){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/info.js?sn=' + sn ),function (data) {
                    _this.clicked = false;
                    if(data.type=='success') {

                    }
                });
            }
        },

    }
</script>