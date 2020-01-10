<template>
    <div class="wrapper">
        <report_header :pageName="pageName" complete="统计" @goComplete="linkToSummary" @iconTime="iconTime" @deductTime="deductTime" @addTime="addTime" @reportDayClick="reportDayClick" @reportMonthClick="reportMonthClick" @reportYearsClick="reportYearsClick"></report_header>
        <list  loadmoreoffset="180" v-if="billList.length >0">
            <!--<refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
            <!--<image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>-->
            <!--</refresh>-->
            <cell v-for="(b,index) in billList" ref="adoptPull" >
                <div class="contentCell">
                    <div class="leftBox"  @click="linkView(b.id)">
                        <div class="flex-row">
                            <div class="typeNameBox" :class="[b.typeName =='订单'?'bkg_one':b.typeName =='收款'?'bkg_three':b.typeName =='充值'?'bkg_two':'bkg_four']">
                                <text class="typeName">{{b.typeName}}</text>
                            </div>
                            <text class="createDate ml20">{{b.createDate | ymdhistimefmt}}</text>
                        </div>
                        <text class="memo">{{b.memo}}</text>
                        <text class="money">¥{{b.amount}}</text>
                    </div>
                    <div class="rightBox">
                        <text class="typeStatus">{{b.status | filterStatus}}</text>
                        <div class="refundButton" v-if="(b.status == 'success' || b.status == 'refund_waiting') && b.canRefund" @click="linkToReturn(b.sn,b.status,index)">
                            <text class="fz24 white">退款</text>
                        </div>
                        <div class="refundButton" v-if="b.status != 'success' && b.status != 'refund_success'&& b.status != 'refund_waiting'" @click="query(b.sn,b.status,index)">
                            <text class="fz24 white">查询</text>
                        </div>
                    </div>
                </div>
            </cell>
            <loading @loading="onloading" :display="loadinging ? 'show' : 'hide'"></loading>
        </list>
        <noData noDataHint="暂无收款记录" v-if="billList.length == 0" ></noData>
        <wxc-loading :show="isLoading"  :loading-text="loadingText"></wxc-loading>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .contentCell{
        width: 720px;
        background-color: white;
        margin-top: 15px;
        margin-left: 15px;
        padding: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
    }
    .contentCell:active{
        background-color: #eee;
    }
    .leftBox{
        width: 500px;
        height: 170px;
        flex-direction: column;
        justify-content: space-between;
    }
    .rightBox{
        width: 180px;
        height: 170px;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
    }
    .memo{
        font-size: 32px;
    }
    .money{
        font-size: 32px;
        font-weight: 700;
    }
    .createDate{
        font-size: 28px;
        color: #999;
    }
    .typeStatus{
        font-size: 28px;
        color: #EB4E40;
    }
    .typeNameBox{
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 3px;
        padding-bottom: 3px;
        border-radius: 3px;
        align-items: center;
        justify-content: center;
    }
    .bkg_one{
        background-color:  #EB4E40;
    }
    .bkg_two{
        background-color:  #5eb0fd;
    }
    .bkg_three{
        background-color: #62b900;
    }
    .bkg_four{
        background-color: #2A2A2C;
    }
    .typeName{
        font-size: 26px;
        color: #fff;
    }
    .refundBox{
        width: 200px;
    }
    .refundButton{
        width: 160px;
        height: 50px;
        border-radius: 25px;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(to right, #f02711, #f4ae19);
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
    import { WxcLoading, WxcPartLoading } from 'weex-ui';
    var animationPara;//执行动画的消息
    export default {
        data:function(){
            return{
                clicked:false,
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
                pageName:'收款记录',
                beginTime:'',
                endTime:'',
                billList:[],
                isLoading:false,
                loadingText:'退款中...'

            }
        },
        components: {
            report_header,noData,WxcLoading,WxcPartLoading
        },
        props: {

        },
        filters:{
            filterStatus(val){
                if(val == 'waiting'){
                    return'等待支付'
                }else if(val == 'success'){
                    return'支付成功'
                }else if(val == 'failure'){
                    return'支付失败'
                }else if(val == 'refund_waiting'){
                    return'等待退款'
                }else if(val == 'refund_success'){
                    return'退款完成'
                }else if(val == 'refund_failure'){
                    return'退款失败'
                }
            },
            ymdhistimefmt(val){
                return utils.ymdhistimefmt(val)
            }
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            var timeDate = utils.ymdtimefmt(Date.parse(new Date()));
            this.beginTime = timeDate+ ' ' +'00:00:00';
            this.endTime = timeDate+ ' ' +'23:59:59';
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
                GET('weex/member/payment/list.jhtml?beginDate='+encodeURIComponent(_this.beginTime)+'&endDate='+encodeURIComponent(_this.endTime)+'&pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize,function (res) {
                    if (res.type=="success") {
                        if (_this.pageStart==0) {
                            _this.billList = res.data.data;
                        } else {
                            res.data.data.forEach(function (item) {
                                _this.billList.push(item);
                            })
                        }
                        _this.pageStart = _this.billList.length;
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
            linkToReturn(sn,status,index){
                let _this = this;
                modal.confirm({
                    message: '确认发起退款？',
                    duration: 0.3,
                    okTitle: '确认',
                    cancelTitle: '取消'
                }, function (value) {
                    if (value == '确认') {
                        _this.loadingText='退款中...';
                        _this.isLoading = true;
                        POST("weex/member/payment/refunds.jhtml?sn="+sn).then(function (mes) {
                            if (mes.type == "success") {
                                POST("refunds/submit.jhtml?sn="+mes.data).then(function (res) {
                                    if (res.type == "success") {
                                        _this.isLoading = false;
                                        _this.billList[index].status = 'refund_success';

                                    } else {
                                        _this.isLoading = false;
                                        _this.billList[index].status = 'refund_waiting';
                                        event.toast(res.content);
                                    }
                                }, function (error) {
                                    _this.isLoading = false;
                                    event.toast(error.content);
                                });
                            } else {
                                _this.isLoading = false;
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            _this.isLoading = false;
                            event.toast(err.content);
                        });
                    }
                })
            },
            query(sn,status,index){
                let _this = this;
                _this.loadingText = '查询中...';
                _this.isLoading = true;
                POST("payment/query.jhtml?sn="+sn).then(function (mes) {
                    if (mes.type == "success") {
                        if(mes.data  == '0000'){
                            _this.isLoading = false;
                            if(status == 'waiting'){
                                _this.billList[index].status = 'success';
                            }else if(status == 'failure'){
                                _this.billList[index].status = 'success';
                            }else if(status == 'refund_waiting'){
                                _this.billList[index].status = 'refund_success';
                            }else if(status == 'refund_failure'){
                                _this.billList[index].status = 'refund_success';
                            }
                        }else if(mes.data  == '0001'){
                            _this.isLoading = false;
                            if(status == 'waiting'){
                                _this.billList[index].status = 'failure';
                            }else if(status == 'failure'){
                                _this.billList[index].status = 'failure';
                            }else if(status == 'refund_waiting'){
                                _this.billList[index].status = 'refund_failure';
                            }else if(status == 'refund_failure'){
                                _this.billList[index].status = 'refund_failure';
                            }
                        }else {
                            _this.isLoading = false;
                            if(status == 'waiting'){
                                _this.billList[index].status = 'waiting';
                            }else if(status == 'failure'){
                                _this.billList[index].status = 'waiting';
                            }else if(status == 'refund_waiting'){
                                _this.billList[index].status = 'refund_waiting';
                            }else if(status == 'refund_failure'){
                                _this.billList[index].status = 'refund_waiting';
                            }
                        }
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                });
            },
            linkView(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate("view/shop/payment/view.js?id="+id), function (e) {

                });
            },
            linkToSummary(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate("view/shop/payment/summary.js"), function (e) {

                });
            },
//            上拉加载
            onloading (event) {
                this.loadinging = true
                this.open()
            },
//            下拉刷新
            onrefresh:function (event) {
                var _this = this;

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
                    _this.pageStart = 0;
                    _this.open();
                }, 1000)
            },
        },

    }
</script>