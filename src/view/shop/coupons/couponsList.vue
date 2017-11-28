<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="setting" > </navbar>
        <search @gosearch="gosearch" @scan="scan"> </search>
        <div class="addFriend" @click="add">
            <div class="flex-row " style="align-items:center">
                <text class="ico_big "  :style="{fontFamily:'iconfont'}">&#xe635;</text>
                <text class="title  " style="margin-left: 30px" >领取优惠券</text>
            </div>
            <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list  class="list" v-if="isNoEmpty()">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <!--<image class="gif" resize="cover"-->
                <!--src="file://resources/images/loading.gif"></image>-->
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <cell :style="{minHeight:screenHeight + 'px'}">
                <div v-for="num in lists" >
                    <div class="addFriendsBorder">
                        <div class="friendsLine" @click="jump()">
                            <div class="image">
                                <div class="markmoney">
                                <text  class="mark">¥</text>
                                <text style="font-size: 50px;color: red;font-weight: 800;margin-left: 10px">{{num.amount}}</text>
                                </div>
                                <div class="name">
                                    <text class="scope">{{num.scope}}</text>
                                </div>
                            </div>
                        </div>
                        <div class="friendsName">
                            <div class="time">
                                <text class="lineTitle">{{num.name}}</text>
                                <text class="realName">{{num.beginDate | timeDatefmt}}至{{num.endDate | timeDatefmt}}</text>
                            </div>
                            <div class="use">
                                <text class="usetext">立即使用</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>

            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <!--<image class="gif" resize="cover"-->
                <!--src="file://resources/images/loading.gif"></image>-->
                <text class="indicator">{{loadingState}}</text>
            </loading>
        </list>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    .time{
        width: 550px;
    }
    .usetext{
        font-size: 25px;
        color: red;

    }
    .use{
        align-items: center;
        justify-content: center;
        width: 120px;
        border-color: red;
        border-width: 1px;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        position: absolute;
        right: 40px;
        bottom: 35px;
    }
    .mark{
        font-size: 32px;
        color: red;
        margin-top: 20px;
    }
    .markmoney{
        flex-direction: row;
    }
    .addFriend {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 30px;
        padding-bottom: 30px;
        background-color: white;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #ccc;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #ccc;
    }
    .list {
        background-color: white;
    }

    .friendsName {
        height: 90px;
        margin-top: 10px;
    }
    .realName{
        margin-top: 10px;
        font-size: 25px;
        color: #888888;
    }
    .image{
        padding-top: 15px;
        height: 120px;
        width: 120px;
    }
    .addFriendsBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }
    .friendsLine{
        padding-left: 30px;
        height:120px;
    }
    .scope{
        font-size: 20px;
        color: #888;
    }
    .lineTitle{
        font-size: 32px;
    }
    .vip1 {
        /*margin-top: 50px;*/
        /*margin-left: 10px;*/
        position: absolute;
        top: 20px;
        left: 60px;
        color:#FFDD1F;
    }
    .vip2 {
        /*margin-top: 50px;*/
        /*margin-left: 10px;*/
        position: absolute;
        top: 20px;
        left: 60px;
        color:#FF8800;
    }
    .vip3 {
        /*margin-top: 50px;*/
        /*margin-left: 10px;*/
        position: absolute;
        top: 20px;
        left: 60px;
        color:#DC0000;
    }
</style>

<script>
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters'
    const event = weex.requireModule('event');
    const picker = weex.requireModule('picker')
    import navbar from '../../../include/navbar.vue';
    import search from '../../../include/search.vue';
    import noData from '../../../include/noData.vue';
    var he = require('he');
    export default {
        components: {
            navbar,search,noData
        },
        data() {
            return   {
                start:0,
                refreshing:false,
                refreshState:"松开刷新数据",
                showLoading:false,
                loadingState:"松开加载更多",
                friendsList:[],
                lists:[],
                screenHeight:0,

                pageSize:10,
                listCurrent:0

            }
        },
        props: {
            title: { default: "优惠券"},
            noDataHint: { default: "尚未拥有优惠券"},
            complete:{ default:"设置"}
        },
        created() {
            utils.initIconFont();

//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(404);
            var _this = this;
            this.open(function () {

            });
        },
        filters:{

            watchCode:function (value) {
                return value.substr(-6)
            },
            watchStatus:function (data) {
                if(data.status == 'loss'){
                    return '挂失中'
                }else {
                    return ''
                }

            }
        },
        methods: {
            vipClass:function (v) {
                if (v=='vip3') {
                    return "vip3";
                } else
                if (v=='vip2') {
                    return "vip2";
                } else {
                    return "vip1";
                }
            },
            vip:function (v) {
                if (v=='vip3') {
                    return he.decode('&#xe639;');
                } else
                if (v=='vip2') {
                    return he.decode('&#xe638;');
                } else {
                    return he.decode('&#xe636;');
                }
            },
            add:function() {
//                event.openURL(utils.locate("view/shop/card/add.js"),function (message) {
//
//                })
            },
            open:function () {
                var _this = this;
                GET('weex/member/coupon/list.jhtml?pageStart='+this.listCurrent +'&pageSize='+this.pageSize,function (mes) {
                    utils.debug(mes)
                    if (mes.type == 'success') {
                        mes.data.data.forEach(function(item){
                            _this.lists.push(item);
                        })

                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
//            触发自组件的跳转方法
            gosearch:function () {
                event.openURL(utils.locate('view/friend/search.js'),function (message) {
//                event.openURL('http://192.168.2.157:8081/search.weex.js',function (message) {
                    if(message.data != ''){
                        event.closeURL(message);
                    }
                });
            },
//            触发自组件的二维码方法
            scan:function () {
                event.scan(function (message) {
                    event.toast(message);
                });
            },
            isNoEmpty:function() {
                return this.lists.length!=0;
            },
            isEmpty:function() {
                return this.lists.length==0;
            },
            onloading (event) {
                var _this = this;
                _this.loading = true;
                setTimeout(function () {
                        _this.lists = []
                        this.listCurrent = this.listCurrent + this.pageSize;
                        _this.open()
                        _this.loading = false
                    }
                    ,1000)
            },
//            下拉刷新
            onrefresh (event) {
                var _this = this;
                _this.refreshing = true;
                setTimeout(function () {
                        _this.lists =[]
                        _this.open()
                        _this.refreshing = false;
                    }
                    ,1000)
            },
            goback:function () {
                event.closeURL();
            },

            jump:function () {
//                event.openURL(utils.locate('view/shop/card/view.js'),function () {
//
//                })
            },

        }
    }
</script>
