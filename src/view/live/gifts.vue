<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <!--<div class="cell-header total">-->
            <!--&lt;!&ndash;<div class="wallet-title" ><text class="sub_title" style="margin-top: 35px">本月:</text> &ndash;&gt;-->
            <!--<text class="balance" v-if="!isTime">{{billDate | timeDatefmt}}</text>-->
            <!--<text class="balance" v-if="isTime">{{billDate}}</text>-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="wallet-title">&ndash;&gt;-->
            <!--&lt;!&ndash;<text class="sub_title"></text>&ndash;&gt;-->
            <!--&lt;!&ndash;<text class="sub_title"></text>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--<text class="day" :style="{fontFamily:'iconfont'}" @click="pickDate()">&#xe63c;</text>-->
        <!--</div>-->
        <list class="list "  @loadmore="onloading" loadmoreoffset="180">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="(deposit,index) in depositList" ref="adoptPull">
                <!--如果月份重复就不渲染该区域 :class="[index == 0 ? 'mt20' : '']" @click="summary(deposit.createDate)"-->
                <div class="cell-header cell-line space-between" v-if="isRepeat(index)" >
                    <div class="flex-row flex-start">
                        <text class="title" >{{deposit.createDate | timeDatefmt}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <!--<text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    </div>
                </div>
                <div class="cell-row cell-clear" >
                    <div class="cell-panel newHeight"  :style="addBorder(index)">
                        <div class="flex1">
                            <image class="logo" resize="cover"
                                   :src="deposit.headpic">
                            </image>
                        </div>
                        <div class="content flex5">
                            <div class="flex-row space-between align-bottom">
                                <text class="title lines-ellipsis">{{deposit.nickname | watchNickName}}送给了你{{deposit.giftName}}</text>
                                <text class="money" :style="moneyColor(deposit.amount)">{{deposit.price | currencyfmt}}</text>
                            </div>
                            <div class="flex-row space-between align-bottom">
                                <text class="datetime">{{deposit.createDate | datetimefmt}}</text>
                                <!--<text class="bal pr25">结余:{{deposit.balance | currencyfmt}}</text>-->
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell v-if="noData()" >
                <noData > </noData>
            </cell>
        </list>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .newHeight{
        height: 130px;
    }
    .sub_title {
        color:#444;
        font-size: 30px;
    }
    .total {
        width:750px;
        height:80px;
        flex-direction: column;
    }
    .wallet-title {
        margin-top: 10px;
        flex-direction: row;
        padding-right: 30px;
        padding-left: 20px;
    }

    .balance {
        font-size: 60px;
        color: red;
        margin-left:20px;
    }
    .bal {
        font-size: 24px;
        margin-top: 5px;
        color:#999;
    }

    .day {
        position: absolute;
        top:10px;
        right: 20px;
        width:60px;
        height:60px;
        font-size: 48px;
        line-height: 60px;
        color:#5eb0fd;
    }
    .cell-row {
        min-height: 120px;
        flex-direction: column;
        background-color: #ffffff;
        padding-left: 20px;
        margin-top: 20px;
    }

    .logo {
        height:80px;
        width:80px;
        border-radius:40px;
        overflow:hidden;
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
        color:#999;
        font-size: 28px;
        margin-top: 5px;
    }
    .money {
        font-weight: 700;
        margin-right: 20px;
        font-size: 32px;
    }

</style>
<script>
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    import {dom,event,animation} from '../../weex.js';
    const picker = weex.requireModule('picker')
    import navbar from '../../include/navbar.vue'
    import noData from '../../include/noData.vue'
    import filters from '../../filters/filters.js'

    export default {
        data:function(){
            return{
                cashier:{today:0,yesterday:0,shopId:""},
                depositList:[],
                refreshing: false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                liveId:'',
                isTime:false
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "收到的礼物" }
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
        filters:{
          watchNickName(value){
              if(value.length > 6){
                 return value.substr(0,2) + '...' + value.substr(-3);
              }else{
                  return value;
              }
          }
        },
        methods: {
            noData:function () {
                return this.depositList.length==0;
            },
            moneyColor:function (amount) {
                if (amount<0) {
                    return {color:'red'}
                }  else {
                    return {color:'#000'}
                }
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
            //判断时间是否重复
            isRepeat(index){
                if(index != 0){
                    if(utils.ymdtimefmt(this.depositList[index].createDate) == utils.ymdtimefmt(this.depositList[index - 1].createDate)){
                        return false;
                    }
                }
                return true;
            },
//            pickDate () {
//                var _this = this;
//                picker.pickDate({
//                    value: _this.billDate
//                }, function (e) {
//                    if (e.result == 'success') {
//                        _this.isTime = true;
//                        _this.billDate = e.data;
//                        _this.onrefresh();
//                    }
//                })
//            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                GET('weex/live/gift/data.jhtml?liveId=' +_this.liveId + '&liveTapeId=' + '&pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize,function (res) {
                    if (res.type=="success") {
                        if (res.data.start==0) {
                            _this.depositList = res.data.data;
                        } else {
                            res.data.data.forEach(function (item) {
                                _this.depositList.push(item);
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
//            summary:function (m) {
//                let v =  utils.ymdtimefmt(m);
//                event.openURL(utils.locate('view/member/wallet/goldSummary.js?billDate='+encodeURIComponent(v)+'&id='+this.id),function () {
//
//                })
//            },
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
//            获取时间
            getDate: function(value) {
                let res = utils.resolvetimefmt(value);
                let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
                // 返回处理后的值
                let m = tds.m - res.m;
                let y = tds.y - res.y;
                if (y<1 && m<1) {
                    return "本月"
                }
                if (y<1 && m<2) {
                    return "上月"
                }
                if (y<1) {
                    return res.m +"月"
                }
                return res.y+"年"+ res.m +"月";
            }
        },
        created () {
//              页面创建时请求数据
            utils.initIconFont();
            this.liveId = utils.getUrlParameter("liveId");
            if(this.liveId == null){
                this.liveId = ''
            }
            this.open();
//            this.billDate = Date.parse(new Date());
        }
    }
</script>