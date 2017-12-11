
<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false"> </navbar>
        <div class="cell-header total">
                <text class="balance">{{cashier.today | currencyfmt}}</text>
                <div class="wallet-title">
                    <text class="sub_title">今天收银（元）     </text>
                    <text class="sub_title">昨天收银:{{cashier.yesterday | currencyfmt}}</text>
                </div>
                <text class="day" :style="{fontFamily:'iconfont'}" @click="pickDate()">&#xe63c;</text>
        </div>
        <list class="list mt20">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新</text>
            </refresh>
            <cell v-if="noData()" >
                   <noData > </noData>
            </cell>
            <cell :style="{minHeight:screenHeight + 'px'}">
            <div v-for="(deposit,index) in depositList" >
                <!--如果月份重复就不渲染该区域-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)" @click="summary(deposit.createDate)">
                    <div class="flex-row flex-start">
                        <text class="title" >{{deposit.createDate | daydayfmt}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">查看统计</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row cell-clear" :style="rowBk(deposit.id)" @click="popup(deposit.id)">
                    <div class="cell-panel newHeight" :style="addBorder(index)">
                        <div class="flex1">
                            <image class="logo" resize="cover"
                                   :src="deposit.logo">
                            </image>
                        </div>
                        <div class="content flex5">
                            <div class="flex-row space-between align-bottom">
                                <text class="title lines-ellipsis">{{deposit.memo}}</text>
                                <text class="money" :style="moneyColor(deposit.amount)">{{deposit.amount | currencyfmt}}</text>
                            </div>
                            <div class="flex-row space-between align-bottom">
                                <text class="datetime">{{deposit.createDate | hitimefmt}} (流水号:{{deposit.id+10200}})</text>
                                <text class="status pr25">{{deposit.status | statusFilter}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </cell>
            <!--<cell v-if="noLoading">-->
                <!--<div class="noLoading"></div>-->
            <!--</cell>-->
            <loading class="loading" @loading="onloading" :display="loading ? 'show' : 'hide'">
                <text class="indicator">加载中..</text>
            </loading>

        </list>
        <div class="shareBox" v-if="isPopup">
            <div style="width: 750px;align-items: center">
                <text class="fz30 pt30 " style="color: #444">操作</text>
            </div>
            <div>
                <div class="bottomBorder shareLineBox" >
                    <div  class="singleBox" @click="doRefunds()">
                        <div class="imgBox"  @click="doRefunds()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe710;</text>
                        </div>
                        <text class="fz28 mt20 color444 " >退款</text>
                    </div>
                    <div class="singleBox" @click="doPrint()">
                        <div class="imgBox" @click="doPrint()">
                            <text class="primary popupImg" :style="{fontFamily:'iconfont'}">&#xe699;</text>
                        </div>
                        <text class="fz28 mt20 color444">补打</text>
                    </div>
                </div>
            </div>
            <div class="cancelBox" @click="doCancel()">
                <text class="fz32">取消</text>
            </div>
        </div>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .sub_title {
        color:#444;
        font-size: 30px;
    }
    .total {
        width:750px;
        height:150px;
        flex-direction: column;
    }
    .wallet-title {
        margin-top: 10px;
        flex-direction: row;
        padding-right: 30px;
        padding-left: 20px;
    }

    .balance {
        margin-top: 10px;
        font-size: 60px;
        color: red;
        margin-left:20px;
    }

    .newHeight{
        height: 130px;
    }
    .cell-row {
        min-height: 120px;
        flex-direction: column;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 20px;
    }

    .day {
        position: absolute;
        top:20px;
        right: 20px;
        width:60px;
        height:60px;
        font-size: 48px;
        line-height: 60px;
        color:#EB4E40;
    }

    .logo {
        height:80px;
        width:80px;
        border-radius:40px;
        overflow:hidden;
        margin: 10px;
    }

    .align-bottom {
        align-items: flex-end;
        width:615px;
    }

    .content {
        margin-left: 10px;
        flex-direction: column;
        align-items: flex-start;
    }
    .datetime {
        color:#ccc;
        font-size: 28px;
        margin-top: 8px;
    }
    .status {
        margin-top: 5px;
        color:#ccc;
        font-size: 24px;
        margin-top: 5px;
    }
    .money {
        font-weight: 700;
        margin-right: 20px;
    }
    .singleBox{
        align-items: center;margin-right: 15px;
    }
    .shareLineBox{
        width: 730px;margin-left: 20px;padding-right: 20px;flex-direction: row;padding-top: 30px;padding-bottom: 30px;
    }
    .bottomBorder{
        border-style: solid;border-color: gainsboro;border-bottom-width: 1px;
    }
    .cancelBox{
        width: 750px;align-items: center;height:100px;background-color: #fff;justify-content: center;
    }
    .cancelBox:active{
        background-color: #999;
    }
    .imgBox:active{
        background-color: #999;
    }
    .color444{
       color:#444;
    }
    .popupImg {
        font-size: 78px;
        width:80px;
        height:80px;
    }
    .imgBox{
        background-color: #fff;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-right: 20px;
        border-radius: 30px;
    }
    .shareBox{
        background-color:#F5F4F5;
        position: fixed;
        bottom:0px ;
        left: 0;
        right:0;
    }

</style>
<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    var event = weex.requireModule('event')
    const picker = weex.requireModule('picker')
    const printer = weex.requireModule('print');
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    export default {
        data:function(){
            return{
                cashier:{today:0,yesterday:0,shopId:""},
                currentId:0,
                isPopup:false,
                depositList:[],
                refreshing: false,
                loading: false,
                pageStart:0,
                pageSize:20,
                noLoading:true,
                billDate:'',
                screenHeight:0
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "消费记录" }
        },
        filters: {
            statusFilter:function (val) {
                if (val=='none') {
                    return '待处理'
                } else
                if (val=='success') {
                    return '已完成'
                } else
                if (val=='refund_waiting') {
                    return '退款中'
                } else
                if (val=='refund_success') {
                    return '已退款'
                } else {
                    return '失败'
                }
            }
        },
        methods: {
            rowBk:function (id) {
               if (id==this.currentId) {
                   return {backgroundColor:'#ddd'}
               } else {
                   return {backgroundColor:'#fff'}
               }
            },
            moneyColor:function (amount) {
               if (amount<0) {
                   return {color:'red'}
               }  else {
                   return {color:'#000'}
               }
            },
            pickDate () {
                var _this = this;
                picker.pickDate({
                    value: _this.billDate
                }, function (e) {
                    if (e.result == 'success') {
                        _this.billDate = e.data;
                        _this.onrefresh();
                    }
                })
            },
            doCancel:function () {
                this.isPopup = false;
            },
            noData:function () {
                return this.depositList.length==0;
            },
//            是否添加底部边框
            addBorder: function (index) {
                let listLength = this.depositList.length;
//                判断是否最后一个元素并且是否每月的结尾
                if(index != listLength - 1 ){
                    if(this.getDate(this.depositList[index].createDate) == this.getDate(this.depositList[index + 1].createDate)){
                        return {
                            borderBottomWidth:'1px'
                        }
                    }else{
                        return {
                            borderBottomWidth:'0px'
                        }
                    }
                }else{
                    return {
                        borderBottomWidth:'0px'
                    }
                }
            },
            //判断月份是否重复
            isRepeat(index){
                if(index != 0){
                    if(this.getDate(this.depositList[index].createDate) == this.getDate(this.depositList[index - 1].createDate)){
                        return false;
                    }
                }
                return true;
            },
            goback: function (e) {
                event.closeURL();
            },
            doPrint:function () {
                var _this = this;
                GET("weex/member/paybill/print.jhtml?id="+_this.currentId,function (mes) {
                    if (mes.type=='success') {
                        _this.depositList.forEach(function (item) {
                            if (item.id==_this.currentId) {
                                if (item.status=='none') {
                                    item.status = "success";
                                }
                            }
                         });
                        if (utils.device()=='V1') {
                            _this.isPopup = false;
                            printer.print(mes.data);
                        } else {
                            _this.isPopup = false;
                            modal.alert({
                                message: '请使用收款机',
                                okTitle: '知道了'
                            })
                        }
                        event.sendGlobalEvent('onCashierChange',res);
                    } else {
                        _this.isPopup = false;
                        modal.alert({
                            message: mes.content,
                            okTitle: '知道了'
                        })
                    }
                },function (err) {
                    _this.isPopup = false;
                    event.toast(err.content);
                })
            },
            refunds:function (sn) {
                var _this = this;
                POST("refunds/submit.jhtml?sn="+sn).then(function (mes) {
                    if (mes.type=='success') {
                        _this.depositList.forEach(function (item) {
                            if (item.id==_this.currentId) {
                                if (item.status=='none') {
                                    item.status = "refund_waiting";
                                }
                            }
                        });
                        modal.alert({
                            message: "退款已提交",
                            okTitle: '知道了'
                        })
                        _this.print();
                    } else {
                        _this.isPopup = false;
                        modal.alert({
                            message: mes.content,
                            okTitle: '知道了'
                        })
                    }
                },function (err) {
                    _this.isPopup = false;
                    event.toast(err.content);
                })
            },
            doRefunds:function () {
                var _this = this;
                POST("weex/member/paybill/refund.jhtml?id="+_this.currentId).then(function (mes) {
                    if (mes.type=='success') {
                        var finded = false;
                        _this.depositList.forEach(function (item) {
                            if (item.id==mes.data.data.id) {
                                item = mes.data.data;
                                finded = true
                            }
                        });
                        if (finded==false) {
                            _this.depositList.splice(0, 0, mes.data.data);``
                        }
                        _this.currentId = mes.data.data.id;
                        _this.refunds(mes.data.sn);
                    } else {
                        _this.isPopup = false;
                        modal.alert({
                            message: mes.content,
                            okTitle: '知道了'
                        })
                    }
                },function (err) {
                    _this.isPopup = false;
                    event.toast(err.content);
                })
            },
            open:function() {
                var _this = this;
                if (_this.pageStart==0) {
                    GET("weex/member/paybill/view.jhtml",function (res) {
                        if (res.type=="success") {
                            _this.cashier = res.data;
                        } else {
                            event.toast(res.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    });
                }
                GET('weex/member/paybill/list.jhtml?billDate='+this.billDate+'&pageStart=' + this.pageStart +'&pageSize='+this.pageSize,function (res) {
                   if (res.type=="success") {
                       if (res.data.start==0) {
                          _this.depositList = res.data.data;
                       } else {
                           res.data.data.forEach(function (item) {
                               _this.depositList.push(item);
                           })
                       }
                       _this.pageStart = res.data.start+res.data.data.length;
                       _this.noLoading = res.data.data.length<_this.pageSize;
                   } else {
                       event.toast(res.content);
                   }
                 }, function (err) {
                    event.toast(err.content);
                })
            },
//            上拉加载
            onloading (event) {
                var _this = this;
                _this.loading = true;
                setTimeout(
                    function () {
                       _this.open();
                       _this.loading = false;
                    }
                ,1000)
            },
//            下拉刷新
            onrefresh (event) {
                var _this = this;
                _this.pageStart = 0;
                _this.refreshing = true;
                setTimeout(
                    function () {
                        _this.open();
                        _this.refreshing = false;
                    }
                ,1000)
            },
            popup:function (id) {
                if (this.isPopup==false) {
                   this.currentId = id;
                   this.isPopup = true;
                }
            },
            summary:function (timestamp) {
                let v =  utils.ymdtimefmt(timestamp);
                event.openURL(utils.locate('view/shop/deposit/summary.js?billDate='+encodeURIComponent(v)),function () {

                })
            },
//            获取月份
            getDate: function(value) {
                let res = utils.resolvetimefmt(value);
                let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
                var w = tds.d - res.d;
                if (w<1) {
                    return "今天"
                } else
                if (w<2) {
                    return "昨天"
                } else
                if (w<3) {
                    return "前天"
                } else {
                    var    y = res.y;
                    var    d = res.d;
                    var    m = res.m;
                    if (m < 10) {
                        m = '0' + m;
                    }
                    if (d < 10) {
                        d = '0' + d;
                    }
                    return y + '年' + m + '月' + d+ '日';
                }

            }
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(0);
            this.open();
        }
    }
</script>