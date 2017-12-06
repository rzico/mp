<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" @goComplete="setting" > </navbar>
        <div class="code" @click="scan">
            <text class="iconfont" :style="{fontFamily:'iconfont'}">&#xe607;</text>
            <text class="headText" style="font-size: 28px;color: #cccccc">核销优惠券</text>
        </div>
        <div class="addFriend" @click="add">
            <div class="flex-row " style="align-items:center">
                <text class="ico_big "  :style="{fontFamily:'iconfont'}">&#xe635;</text>
                <text class="title  " style="margin-left: 30px" >新增优惠券</text>
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
                <div v-for="(num,index) in lists" >
                    <div class="deleteBox bkg-delete" @click="del(num.id,index)">
                        <text class="deleteText">删除</text>
                    </div>
                    <div class="addFriendsBorder" @click="modification(num.id)" @swipe="onpanmove($event,index)" @touchstart="onFriendtouchstart($event,index)">
                        <div class="friendsLine" @click="jump()">
                            <div class="image">
                                <div class="markmoney">
                                <text  class="mark">¥</text>
                                <text style="font-size: 50px;color: red;font-weight: 800;margin-left: 10px">{{num.amount}}</text>
                                </div>
                                <div class="name">
                                    <text class="scope">{{num | judgment}}</text>
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
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 120px;align-items: center;width: 130px;justify-content: center;
    }
    .iconfont{
        color: #cccccc;
        margin-top: 5px;
        margin-right: 20px;
    }
    .code{
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: white;
        height: 60px;
        margin-right: 20px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-width: 1px;
        border-color: #cccccc;
        border-radius: 10px;
    }
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
        background-color: white;
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
    var modal = weex.requireModule('modal')
    var prompting =''
    import { POST, GET } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters'
    const event = weex.requireModule('event');
    const picker = weex.requireModule('picker')
    import navbar from '../../../include/navbar.vue';
    import search from '../../../include/search.vue';
    import noData from '../../../include/noData.vue';
    var he = require('he');
    var animationPara;//执行动画的消息
    const animation = weex.requireModule('animation');
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
                listCurrent:0,

                id:'',
            }
        },
        props: {
            title: { default: "优惠券"},
            noDataHint: { default: "尚未拥有优惠券"},
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
            judgment:function (data) {
                if(data.scope == 'all'){
                    return '全场'
                }if(data.scope == 'shop'){
                    return '店内'
                } else {
                    return '商城'
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
                let _this = this
                event.openURL(utils.locate("view/shop/coupon/add.js"),function (mes) {
                    if(mes.type == 'success')
                    _this.open()
                })
            },
            open:function () {
                var _this = this;
                GET('weex/member/coupon/list.jhtml?pageStart='+this.listCurrent +'&pageSize='+this.pageSize,function (mes) {
                    if (mes.type == 'success') {
                            _this.lists =mes.data.data
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
//            弹窗
            showAlert (event) {
                let _this =this
                console.log('will show alert')
                modal.alert({
                    message:prompting,
                    duration: 0.3
                }, function (value) {
                    console.log('alert callback', value)
                })
            },
//            触发自组件的二维码方法
            scan:function () {
                let _this=this
                event.scan(function (message) {
                    utils.readScan(message.data,function (data) {
                        if(data.data.type == '818803'){
                            _this.code =data.data.code
                            GET('weex/member/couponCode/use.jhtml?code='+_this.code,function (mes) {
                                utils.debug(mes)
                                if (mes.type == 'success') {
                                    prompting = mes.content
                                    _this.showAlert()
                                } else {
                                    prompting = mes.content
                                    _this.showAlert()
                                }
                            }, function (err) {
                                event.toast(err.content)
                            })
                        }
                    })

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
                        GET('weex/member/coupon/list.jhtml?pageStart='+_this.listCurrent +'&pageSize='+_this.pageSize,function (mes) {
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
            onpanmove:function (e,index) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'right'){
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }else if(e.direction == 'left'){
                    _this.canScroll = false;
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-190)',
                        },
                        duration:350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }
            },
            //            点击屏幕时
            onFriendtouchstart:function (e,index) {
                var _this = this;
                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                }else{
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    })
                }
//                获取当前点击的元素。
                animationPara =  e.currentTarget;
            },
            del:function (id,index) {
                let _this =this
                POST('weex/member/coupon/delete.jhtml?id='+id).then(
                    function (mes) {
                        if (mes.type == "success") {
                            //                            把动画收回来。
                            if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                            }else{
                                animation.transition(animationPara, {
                                    styles: {
                                        transform: 'translateX(0)',
                                    },
                                    duration: 10, //ms
                                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                    needLayout:false,
                                    delay: 0 //ms
                                })
                            }
                            _this.lists.splice(index,1);
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定");
                    }
                )
            },
            modification:function (id) {
                let _this =this;
                event.openURL(utils.locate('view/shop/coupon/add.js?id='+id),function (message) {
                    utils.debug(message)
                    if(message.type == 'success'){
                        _this.open()
                    }
                })
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
