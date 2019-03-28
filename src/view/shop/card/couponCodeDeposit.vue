<template>
    <div class="wrapper">
        <div class="header" :class="[classHeader(),border==true?'':'cb']" >
            <div class="nav_back" @click="goback()">
                <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
            </div>
            <div class="nav">
                <text class="nav_title">{{title}}</text>
                <div class="navRightBox"  @click="pickDate()">
                    <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}">&#xe63c;</text>
                </div>
            </div>
        </div>
        <list class="list "  @loadmore="onloading" loadmoreoffset="180">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="(deposit,index) in depositList" ref="adoptPull">
                <!--如果月份重复就不渲染该区域-->
                <div class="cellHeader cell-line" v-if="isRepeat(index)">
                    <div class="pl20">
                        <text class="fz32" >{{deposit.createDate | monthfmt}}</text>
                    </div>
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row cell-clear" >
                    <div class="cell-panel newHeight"  :style="addBorder(index)">
                        <div class="flex1">
                            <image class="logo" resize="cover"
                                   :src="deposit.logo">
                            </image>
                        </div>
                        <div class="content flex5">
                            <div class="flex-row space-between align-bottom">
                                <text class="title lines-ellipsis width400">{{deposit.memo}}</text>
                                <text class="money" :style="moneyColor(deposit.amount)">{{deposit.amount | currencyfmt}}</text>
                            </div>
                            <div class="flex-row space-between align-bottom">
                                <text class="datetime">{{deposit.createDate | datetimefmt}}</text>
                                <text class="bal pr25">余额:{{deposit.balance | currencyfmt}}</text>
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
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .cb {
        border-bottom-width: 0px;
    }
    .navRightBox{
        min-width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .nav_bg {
        width:750px;
        height: 156px;
        background-size: cover;
        position: absolute;
        top:0;
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
    .cellHeader{
        width: 750px;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #eeeeee;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .newHeight{
        height: 130px;
    }
    .sub_title {
        color:#444;
        font-size: 30px;
    }
    .width400{
        width: 400px;
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
    .bal {
        font-size: 24px;
        margin-top: 5px;
        color:#999;
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
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import {dom,event,animation} from '../../../weex.js';
    const picker = weex.requireModule('picker')
    import navbar from '../../../include/navbar.vue'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'

    export default {
        data:function(){
            return{
                sum:{credit:0,debit:0},
                depositList:[],
                refreshing: false,
                loading: 'hide',
                pageStart:0,
                pageSize:20,
                noLoading:true,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                id:0
            }
        },
        components: {
            navbar,noData
        },
        props: {
            title: { default: "电子票记录" }
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
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
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
            //判断月份是否重复
            isRepeat(index){
                if(index != 0){
                    if(this.getDate(this.depositList[index].createDate) == this.getDate(this.depositList[index - 1].createDate)){
                        return false;
                    }
                }
                return true;
            },
            pickDate () {
                var _this = this;
                picker.pickDate({
                    value: _this.billDate
                }, function (e) {
                    if (e.result == 'success') {
                        _this.billDate = e.data;
                        _this.title = "账单("+_this.billDate+")";
                        _this.pageStart=0;
                        _this.open();
                        setTimeout(() => {
                            _this.onrefresh()
                        }, 500)
                    }
                })
            },
            goback: function (e) {
                event.closeURL();
            },
            open:function () {
                var _this = this;
                GET('weex/member/couponCodeGlide/list.jhtml?billDate='+_this.billDate+'&pageStart=' + _this.pageStart +'&pageSize='+_this.pageSize +'&id=' + this.id,function (res) {
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
//            获取月份
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
            this.id= utils.getUrlParameter('id');
            this.open();
        }
    }
</script>