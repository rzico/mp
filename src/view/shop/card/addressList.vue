<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback"> </navbar>
        <div class="searchBOX" @click="">
            <div class="search_box flex5">
                <div class="flex-start">
                    <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                    <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput" @return = "search" autofocus="true" ref="searchBar" :placeholder="searchHint"/>
                </div>
                <text class="clearBuf ico_small gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
            </div>
            <div class="flex-center flex1"  @click="noSearch()" >
                <text class="fz32 primary" >{{searchOrCancel}}</text>
            </div>
        </div>
        <div style="background-color: white;border-top-width: 1px;border-color: #ccc">
            <div class="addCard" @click="addCard()" >
                <div class="flex-row ">
                    <text class="ico_big "  :style="{fontFamily:'iconfont'}">&#xe62a;</text>
                    <text class="title ml20 " >新增会员</text>
                </div>
                <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list  class="list" v-if="isNoEmpty()"  @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="c in lists" >
                <div class="addressLine" @click="jump(c)">
                    <text class="addressName">{{c.address}}</text>
                    <div class="flex-row mt20">
                        <text class="name mr30">{{c.consignee}}</text>
                        <text class="mobile">{{c.phone}}</text>
                    </div>
                    <div class="flex-row mt20">
                        <!--<text class="name mr30"></text>-->
                        <text class="mobile">NO.{{c.cardNo}}(卡主:{{c.cardName}})</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<style lang="less" src="../../../style/wx.less"/>
<style>
    .addCard{
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 36px;
        padding-right: 30px;
        padding-top: 20px;
        padding-bottom: 20px;
        background-color: white;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #ccc;
    }
    /*<!--搜索栏-->*/

    .searchCancelText{
        color: #EB4E40;
    }
    .searchBOX {
        /*position:sticky;*/
        background:#eee;
        flex-direction: row;
        /*flex:1;*/
        height: 100px;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }
    .clearBuf {
        width:58px;
        height:58px;
        text-align: center;
        padding-top: 10px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 58px;
        height: 58px;
        width:450px;
    }

    /*======================*/

    .list {
        background-color: white;
    }
    .addressLine{
        padding: 30px;
        background-color: white;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
        justify-content: center;
        flex-direction: column;
    }
    .addressName{
        font-size: 32px;
        lines:2;
        text-overflow: ellipsis;
    }
    .name{
        font-size: 28px;
        color: #888888;
    }
    .mobile{
        font-size: 28px;
        color: #888888;
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    import { POST, GET, URIEncrypt } from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    import filters from '../../../filters/filters'
    import {dom,event,animation} from '../../../weex.js';
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
                roles:'',
                start:0,
                refreshing:false,
                showLoading:false,
                friendsList:[],
                lists:[],
                pageSize:10,
                pageStart:0,
                code:'',
                id:'',
                refreshImg:utils.locate('resources/images/loading.png'),
                choose:false,
                keyword:'',
                searchHint: "输入手机、卡号、收货地址搜索",
                searchOrCancel:'取消',
                doSearch:false,//    是否处于搜索状态
            }
        },
        props: {
            title: { default: "收货地址"},
            noDataHint: { default: "暂无收货地址"},
        },
        created() {
            utils.initIconFont();
            this.open();
            this.permissions()
        },
        filters:{
            watchCode:function (value) {
                return value.substr(-6)
            },
            watchType:function (data) {
                if(data == 'partner'){
                    return '股东'
                }else if(data == 'team'){
                    return 'VIP'
                }else{
                    return '普通'
                }
            },
            watchVip:function (data) {
                if(data == 'vip3'){
                    return '钻石'
                }else if(data == 'vip2'){
                    return '金卡'
                }else{
                    return '银卡'
                }
            },
        },
        methods: {
            //          清空关键字
            clearBuf:function () {
                this.keyword = '';
//                this.keyword.length = 0;
            },
            inputBlur(){
                this.$refs['searchBar'].blur();
            },
            //            前往搜索
            goSearch:function () {
                this.doSearch = true;
                this.searchOrCancel = '取消'
                let _this = this;
                this.lists = [];
                this.noDataHint = "输入查找卡号、手机号、收货地址";
//                event.openURL(utils.locate('view/shop/goods/search.js'), function (res) {
//                    _this.doReset();
//                    if(res.type == 'success'){
//
//                    }
//                });
            },
            oninput:function (e) {
                this.isSearch = false;
                this.keyword = e.value;
                this.searchOrCancel = '搜索';
                this.noDataHint = "输入查找卡号、手机号、收货地址";
                if(e.value.length == 0){
                    this.searchOrCancel = '取消'
                }
            },
            search: function (e) {
                var _this = this;
                this.isSearch = true;
                this.pageStart = 0;
                this.searchOrCancel = '取消';
                this.searchCard();
            },
//            点击右上角取消或者搜索按钮
            noSearch:function () {
                var _this = this;
                this.inputBlur();
                if(this.searchOrCancel == '取消'){
                    this.pageStart = 0;
                    this.doSearch = false;
                    this.open();
                }else{
                    _this.pageStart = 0;
                    _this.searchCard()
                }
            },
            //            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
                    } else {
                        event.toast(mes.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
            isPos:function () {
                let dc = utils.device();
                return dc=='V1';

            },
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
                GET('weex/member/receiver/list.jhtml?pageStart='+this.pageStart +'&pageSize='+this.pageSize,function (mes) {
                    if (mes.type == 'success') {
                        if (_this.pageStart==0) {
                            _this.lists = mes.data.data;
                        } else {
                            mes.data.data.forEach(function(item){
                                _this.lists.push(item);
                            })
                        }
                        _this.pageStart = mes.data.start+mes.data.data.length;

                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
            searchCard:function () {
                var _this = this;
                GET('weex/member/receiver/list.jhtml?type=query&pageStart='+this.pageStart +'&pageSize='+this.pageSize+'&keyword='+ encodeURI(_this.keyword),function (mes) {
                    if (mes.type == 'success') {
                        if (_this.pageStart==0) {
                            _this.lists = mes.data.data;
                        } else {
                            mes.data.data.forEach(function(item){
                                _this.lists.push(item);
                            })
                        }
                        _this.noDataHint = '暂无该地址';
                        _this.pageStart = mes.data.start+mes.data.data.length;

                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                })
            },
//            触发自组件的二维码方法
            scan:function () {
                let _this=this
                event.scan(function (message) {
                    utils.readScan(message.data,function (data) {
                        if(data.data.type == '818801'){
                            _this.code =data.data.code
                            GET('weex/member/card/infobycode.jhtml?code='+_this.code,function (mes) {
                                if (mes.type == 'success') {
                                    _this.id = mes.data.card.id;
                                    event.openURL(utils.locate('view/shop/card/view.js?id='+_this.id),function (message) {

                                    })
                                } else {
                                    event.toast(res.content);
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
                if(!this.doSearch){
////            获取会员卡列表
                    this.open();
                }else{
//                        重新搜索会员卡
                    this.searchCard();
                }

            },
//            下拉刷新
            onrefresh (event) {
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
                    if(!this.doSearch){
////            获取会员卡列表
                        _this.open();
                    }else{
//                        重新搜索会员卡
                        _this.searchCard();
                    }
                }, 1000)
            },
            goback:function () {
                event.closeURL();
            },

            jump:function (c) {
                let _this =this;
                    var E = {
                        memberId:c.memberId,
                        addressId:c.id,
                    }
                    let backData = utils.message('success','选择成功',E);
                    event.closeURL(backData);
            },
            add:function() {
                event.openURL(utils.locate("view/shop/card/add.js"),function (message) {
                })
            },
            addCard:function() {
                var _this = this
                event.openURL(utils.locate("view/shop/card/receiver/amap-picker/amap-picker.js"),function (e) {
                    if (e.type=='success') {
                        let ev = {
                            areaName: e.data.areaName,
                            address: e.data.building,
                            areaId:e.data.areaId,
                            latitude:e.data.latitude,
                            longitude:e.data.longitude,
                            memberId: 0
                        }
                        event.openURL(utils.locate("view/shop/card/receiver/add/index.js?"+URIEncrypt(ev)),function (res) {
                            _this.pageStart = 0;
                            _this.open();
                        });

                    }

                })
            },
            setting:function () {
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    return
                }
                event.openURL(utils.locate('view/shop/card/setting.js'),function () {

                })
            }

        }
    }
</script>
