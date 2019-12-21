<template>
    <div class="wrapper">
        <report_header :pageName="pageName"  @iconTime="iconTime" @deductTime="deductTime" @addTime="addTime" @reportDayClick="reportDayClick" @reportMonthClick="reportMonthClick" @reportYearsClick="reportYearsClick"></report_header>
        <div class="classBox">
            <div class="tableOne">
                <text class="tableText">摘要</text>
            </div>
            <div class="tableTwo">
                <text class="tableText">笔数</text>
            </div>
            <div class="tableFour">
                <text class="tableText">金额</text>
            </div>
        </div>
        <list  loadmoreoffset="180" v-if="reportList != null">
            <!--<refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
            <!--<image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>-->
            <!--</refresh>-->
            <cell v-for="(c,index) in reportList" ref="adoptPull" >
                <div class="contentCell" >
                    <text class="shopName">{{c.adminName}}</text>
                    <text class="number">{{c.count}}</text>
                    <text class="money">¥{{c.amount}}</text>
                </div>
            </cell>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'"></loading>
            <cell v-if="reportList.length == 0" >
                <noData > </noData>
            </cell>
            <cell>
                <div style="height: 130px"></div>
            </cell>

        </list>

        <div class="bottomTotal" >
            <text class="shopName">合计</text>
            <text class="number">{{total}}</text>
            <text class="money">{{money}}</text>
        </div>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .list{
        padding-bottom: 140px;
        background-color: white;

    }
    .fontStrong{
        font-weight: bold;
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
        width:300px;
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
        width:187.5px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-right-width: 1px;
        border-right-color: #777;
    }
    .tableFour{
        width:225px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .tableText{
        font-size: 28px;
        color: #444;
    }
    .bottomTotal{
        width: 750px;
        height: 100px;
        background-color: white;
        position: fixed;
        bottom:0px;
        left: 0;
        border-top-width: 1px;
        border-color: #ccc;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
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
        height: 100px;
        width: 750px;
        background-color: #f5f5f5;
        flex-direction: row;
        align-items: center;
        border-bottom-width:1px;
        border-color:#cccccc;
    }
    .bottomCellTwo{
        height: 100px;
        width: 750px;
        padding-left: 30px;
        padding-right: 30px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom-width:1px;
        border-color:#cccccc;
    }
    .totalIcon{
        font-size: 80px;
    }
    .contentCell{
        height: 100px;
        width: 750px;
        background-color: white;
        border-bottom-width: 1px;
        border-color: #cccccc;
        flex-direction: row;
        align-items: center;
    }
    .shopName{
        font-size: 30px;
        width: 300px;
        padding-left: 30px;
        text-align: left;
        lines:1;
        text-overflow: ellipsis;
    }
    .number{
        font-size: 30px;
        width: 225px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .cost{
        font-size: 30px;
        width: 187.5px;
        text-align: right;
        lines:1;
        text-overflow: ellipsis;
    }
    .money{
        font-size: 30px;
        width: 225px;
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
                reportList:null,
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
                pageName:'收款统计',
                beginTime:'',
                endTime:'',
                total:0,
                money:0
            }
        },
        components: {
            report_header,noData
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
//        dom呈现完执行滚动一下
        updated(){
//            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
            if(this.hadUpdate){
                return;
            }
            this.hadUpdate = true;
//            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
            if(!utils.isIosSystem()){
                const el = this.$refs.adoptPull//跳转到相应的cell
                dom.scrollToElement(el, {
                    offset: -119
                })
            }
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
                            transform: 'translateY(-500)',
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
                                transform: 'translateY(-500)',
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
                GET('weex/member/payment/summary_admin.jhtml?beginDate='+encodeURIComponent(_this.beginTime)+'&endDate='+encodeURIComponent(_this.endTime),function (res) {
                    if (res.type=="success") {
                        var total = 0;
                        var money = 0;
                        res.data.forEach(function (item) {
                            total = total+item.quantity;
                            money = money + item.amount
                        })
                        _this.total = total;
                        _this.money = money;
                        _this.reportList = res.data;
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
        },

    }
</script>
