<template>
    <div class="wrapper"  >
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete" > </navbar>
        <search @gosearch="gosearch" @scan="scan"> </search>
        <div class="addFriend" @click="goMobile()">
            <div class="flex-row">
                <text class="ico_big "  :style="{fontFamily:'iconfont'}">&#xe637;</text>
                <text class="title ml20 " >添加手机联系人</text>
            </div>
            <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list  class="list" v-if="isNoEmpty()" @loadmore="onloading" loadmoreoffset="50" >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-for="(friend,index) in friendsList" >
                <!--姓氏首字母-->
                <div class="letterBox" v-if="isRepeat(index)">
                    <text class="nameLetter">{{friend.createDate | dayfmt}}</text>
                </div>
                <!--姓氏里每个人的名子-->
                <div class="addFriendsBorder">
                    <div class="friendsLine" @click="goAuthor(friend.id)">
                        <image :src="friend.logo" class="friendsImage"></image>
                        <div class="friendsName">
                            <text class="lineTitle ">{{friend.nickName}}</text>
                            <text class="realName">真实姓名:{{friend.name | watchName}}</text>
                        </div>
                    </div>
                    <div class="status_panel">
                        <text class="ask bkg-primary" v-if="isAsk(friend.status)" @click="adopt(friend.id)">添加</text>
                        <text class="adopt " v-if="isAdopt(friend.status)">已添加</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style>
    .list {
        background-color: white;
    }
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
    .friendsName{
        height:90px;
        margin-top: 15px;
        justify-content: space-between;
    }
    .letterBox{
        width:750px;
        padding-left: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #e8e8e8;
    }
    .nameLetter{
        color: #888;
        font-size: 24px;
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
    .status_panel {
        flex-direction: column;
        align-items: center;
        flex:1;
        padding-right: 20px;
    }
    .adopt {
        font-size: 32px;
        text-align: center;
        color:#ccc;
        padding-top: 10px;
        padding-bottom: 10px;
        background-color:white;
        border-radius:6px;
    }

    .ask {
        font-size: 32px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:6px;
        width: 100px;
        color:white;
    }

</style>

<script>
    import { POST, GET ,SCAN} from '../../assets/fetch'
    import utils from '../../assets/utils'
    import filters from '../../filters/filters'
    import navbar from '../../include/navbar.vue';
    import search from '../../include/search.vue';
    import {dom,event,animation,storage} from '../../weex.js';
    import noData from '../../include/noData.vue';
    export default {
        components: {
            navbar,search,noData
        },
        data() {
            return   {
                pageStart:0,
                refreshing:false,
                showLoading:false,
                friendsList:[],
                refreshImg:utils.locate('resources/images/loading.png'),
                pageSize:20,
            }
        },
        props: {
            title: { default: "新的朋友"},
            noDataHint: { default: "没有新朋友"},
            complete:{ default:"添加"}
        },
        created() {
            utils.initIconFont();

            var _this = this;
            _this.getNewFriends();
        },
        filters:{
            watchName(value){
                if(value == null || value == ''){
                    return '暂无';
                }else{
                    return value;
                }
            }
        },
        methods: {
//            作者主页
            goAuthor:function (id) {
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
            },
            goComplete:function () {
                event.openURL(utils.locate("view/friend/add.js"),function (message) {
//                event.openURL('http://192.168.2.157:8081/add.weex.js',function (message) {
                    if(message.data != ''){
                        event.closeURL(message);
                    }
                });


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
                    SCAN(message,function (data) {
                    },function (err) {
                    })
                });
            },
            isNoEmpty:function() {
                return this.friendsList.length!=0;
            },
            isEmpty:function() {
                return this.friendsList.length==0;
            },
//            在页面销毁时触发，可用来捕捉安卓的回退 @viewdisappear="viewdisappear()"
//            viewdisappear(){
//                if(!utils.isIosSystem()){
//                    this.goback();
//                }
//            },
            goback:function () {
                let E = utils.message('success','有新朋友',this.hadNew);
                event.closeURL(E);
            },
            isAsk:function (value) {
                if (value=="ask") {
                    return true;
                } else {
                    return false;
                }
            },
            isAdopt:function (value) {
                if (value=="adopt") {
                    return true;
                } else {
                    return false;
                }
            },
//            获取所以新朋友列表
            getNewFriends(){
                let _this = this;
                GET('weex/member/friends/list.jhtml?pageSize='+ _this.pageSize + '&pageStart='+_this.pageStart, function(data) {
                    if (data.type == 'success' && data.data.data != '') {
                        if (_this.pageStart == 0) {
                            _this.friendsList = data.data.data;
                        } else {
                            data.data.data.forEach(function (item) {
                                _this.friendsList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    } else if (data.type == 'success' && data.data.data == '') {
                    } else {
                        event.toast(data.content);
                    };
                });
            },
            onrefresh:function () {
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
                    _this.getNewFriends();
                }, 1000)
            },
            onloading:function () {
                this.getNewFriends();
            },
            jump:function () {
                event.toast("网络不稳定");
            },
            goMobile:function() {
                event.openURL(utils.locate("view/friend/mobile.js"),function (message) {
//                event.openURL('http://192.168.2.157:8081/mobile.weex.js',function (message) {
//                    event.closeURL();
                })
            },
            //同意添加好友
            adopt:function (id) {
                let _this = this;
                POST('weex/member/friends/adopt.jhtml?friendId='+id).then(
                    function (data) {
                        if (data.type == "success") {
                            event.toast(data.content);
                            storage.setItem('hadNew','1');
                            _this.onrefresh();
                        } else {
                            event.toast(data.content);
                        }
                    },function(err) {
                        event.showToast("网络不稳定");
                    }
                )
            },
            dayfmt:function () {
                let res = utils.resolvetimefmt(value);
                let tds = utils.resolvetimefmt(Math.round(new Date().getTime()));
                let daySub = tds.d - res.d;
                if (daySub<1) {
                    return "今天"
                }
                if (daySub<3) {
                    return "近三天"
                }
                if (daySub<7) {
                    return "近七天"
                }
                return "七天前"
            },
            //判断时间是否重复
            isRepeat:function(index){
                var _this = this;
                if(index != 0){
                    if (_this.dayfmt(_this.friendsList[index].createDate) == _this.dayfmt(_this.friendsList[index - 1].createDate)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },
        }
    }
</script>
