<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="setting" > </navbar>
        <search @gosearch="gosearch" @scan="scan"> </search>
        <div class="addFriend" @click="add">
            <div class="flex-row " style="align-items:center">
                <text class="ico_big "  :style="{fontFamily:'iconfont'}">&#xe70f;</text>
                <text class="title ml20 " >领取会员卡</text>
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
                            <image :src="num.logo" class="friendsImage"></image>
                                <text :class="[vipClass(lists.vip)]" :style="{fontFamily:'iconfont'}">{{vip(lists.vip)}}</text>
                            </div>
                            <div class="friendsName">

                                <text class="lineTitle ">手机号:{{num.mobile}}</text>
                                <div style="flex-direction: row;justify-content: space-between;align-items: center;width: 550px">
                                <text class="realName">{{num.name}}(卡号:{{num.code | watchCode}})</text>
                                    <text style="font-size: 28px;color: #888">{{num | watchStatus}}</text>
                                </div>

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
    .addFriend {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 36px;
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

    .friendsName{
        height:90px;
        margin-top: 15px;
        justify-content: space-between;
    }
    .realName{
        color: #888;
        font-size: 30px;
        margin-left: 20px;
    }
    .friendsImage{
        margin-top: 20px ;
        height: 80px;
        width:80px;
    }
    .image{
        height: 80px;
        width: 80px;
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
        background-color: #fff;
        flex-direction: row;
        flex:5;
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        max-width: 450px;
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
            title: { default: "会员卡"},
            noDataHint: { default: "尚未添加会员卡"},
            complete:{ default:"设置"}
        },
        created() {
            utils.initIconFont();

//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(404);
            var _this = this;
//            setTimeout(() => {
//            _this.onrefresh();
//            }, 500);
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

            open:function () {
                var _this = this;
                GET('weex/member/card/list.jhtml?pageStart='+this.listCurrent +'&pageSize='+this.pageSize,function (mes) {
//                    utils.debug(mes)
                    if (mes.type == 'success') {
                        mes.data.data.forEach(function(item){
                            _this.lists.push(item);
                        })
//                        utils.debug(_this.code)
//                        if(_this.code.length>6){
//                           _this.code = _this.code.substring(_this.code.length-6, _this.code.length)
//                        }

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
                        _this.listCurrent = _this.listCurrent + _this.pageSize;
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

                        _this.refreshing = false;
                    }
                    ,1000)
            },
            goback:function () {
                event.closeURL();
            },

            jump:function () {
                event.openURL(utils.locate('view/shop/card/view.js'),function () {

                })
            },
            add:function() {
                event.openURL(utils.locate("view/shop/card/add.js"),function (message) {
//
                })
            },
            setting:function () {
                event.openURL(utils.locate('view/shop/card/setting.js'),function () {

                })
    }

        }
    }
</script>
