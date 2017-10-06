<template>
    <div class="wrapper">
        <navbar :title="title" :complete="complete" @goback="goback" @goComplete="goComplete" > </navbar>
        <search @gosearch="gosearch" > </search>
        <div class="addFriend" @click="gomail">
            <text class="ico_big gray" :style="{fontFamily:'iconfont'}">&#xe637;</text>
            <text class="title mt20 gray">添加手机联系人</text>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()" > </noData>
        <list class="list" v-if="isNoEmpty()">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image class="gif" resize="cover"
                       src="file://resource/image/loading.gif"></image>
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <cell v-for="(friend,index) in friendsList">
                <!--姓氏首字母-->
                <div class="letterBox" v-if="isRepeat(index)">
                    <text class="nameLetter">{{friend.createDate | dayfmt}}</text>
                </div>
                <!--姓氏里每个人的名子-->
                <div class="addFriendsBorder">
                    <div class="friendsLine" @click="jump('/')">
                        <image :src="friend.logo" class="friendsImage"></image>
                        <div class="friendsName">
                            <text class="lineTitle lines-ellipsis">{{friend.nickName}}</text>
                            <text class="realName">真实姓名:{{friend.name}}</text>
                        </div>
                    </div>
                    <div class="status_panel">
                        <text class="ask bkg-primary" v-if="isAsk(friend.status)" @click="adopt(friend.id)">添加</text>
                        <text class="adopt " v-if="isAdopt(friend.status)">已添加</text>
                    </div>
                </div>

            </cell>
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <image class="gif" resize="cover"
                       src="file://resource/image/loading.gif"></image>
                <text class="indicator">{{loadingState}}</text>
            </loading>

        </list>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style>
    .list {
        background-color: white;
    }
    .addFriend {
        flex-direction: column;
        align-items: center;
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
    const dom = weex.requireModule('dom');
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import {mixins} from '../../mixins/mixins.js';
    import {filters} from '../../filters/filters.js';
    import navbar from '../../include/navbar.vue';
    import search from '../../include/search.vue';
    import noData from '../../include/noData.vue';
    export default {
        mixins:[mixins],
        filters:[filters],
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
                friendsList:[]
            }
        },
        props: {
            title: { default: "新的朋友"},
            noDataHint: { default: "没有新朋友"},
            complete:{ default:"添加"}
        },
        created() {
            var _this = this;
            dom.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('"+_this.locateURL+"/resources/fonts/iconfont.ttf')"
            });
            setTimeout(() => {_this.onrefresh();
            }, 500);
         },
        methods: {
            goComplete:function () {
                event.openURL(this.locateURL+"/view/friends/add.js",function () {
                    event.closeURL();
                })
            },
            gosearch:function () {

            },
            isNoEmpty:function() {
                return this.friendsList.length!=0;
            },
            isEmpty:function() {
                return this.friendsList.length==0;
            },
            goback:function () {
              event.closeURL();
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
            onrefresh:function () {
                var _this = this;
                _this.refreshing = true;
                _this.refreshState = "正在刷新数据";
                return stream.fetch({
                        method: 'GET',
                        type: 'json',
                        url: '/weex/member/friends/list.jhtml?pageSize=20&pageStart=0'
                    }, function (weex) {
                        if (weex.ok) {
                            if (weex.data.type == "success") {
                                let page = weex.data.data;
                                _this.friendsList = page.data;
                                _this.start = page.start+page.data.length;
                                _this.refreshState = "数据刷新完成";
                                setTimeout(() => {
                                    _this.refreshing = false;
                                    _this.refreshState = "松开刷新数据";
                                }, 500);
                            } else {
                                _this.refreshing = false;
                                _this.refreshState = "松开刷新数据";
                                app.showToast(weex.data.content);
                            }
                        } else {
                            _this.refreshing = false;
                            _this.refreshState = "松开刷新数据";
                            app.showToast("网络不稳定请重试");
                        }

                })
            },
            onloading:function () {
                var _this = this;
               _this.showLoading = true;
                _this.loadingState = "正在加载数据";
                return stream.fetch({
                    method: 'GET',
                    type: 'json',
                    url: '/weex/member/friends/list.jhtml?pageSize=20&pageStart='+_this.start
                }, function (weex) {
                        if (weex.ok) {
                            if (weex.data.type == "success") {
                                let page = weex.data.data;
                                if (page.data.length>0) {
                                    _this.friendsList.push(page.data);
                                    _this.start = page.start+page.data.length;
                                    _this.loadingState = "加载"+page.data.length+"条数据";
                                } else {
                                    _this.loadingState = "亲，没有数据了";
                                }
                                setTimeout(() => {
                                    _this.showLoading = false;
                                    _this.loadingState = "松开加载更多";
                                }, 500);
                            } else {
                                _this.showLoading = false;
                                _this.loadingState = "松开加载更多";
                                event.showToast(weex.data.content);
                            }
                        } else {
                            _this.showLoading = false;
                            _this.loadingState = "松开加载更多";
                            event.showToast("网络不稳定请重试");
                        }
                })
            },
            jump:function (vueName) {
                app.showToast("网络不稳定请重试");
            },
            gomail:function() {
                event.openURL(this.locateURL+"/view/friends/mail.js",function () {
                    event.closeURL();
                })
            },
            //同意添加好友
            adopt:function (id) {
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/member/friends/adopt.jhtml?friendId='+id
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                            event.showToast(weex.data.content);
                        } else {
                            event.showToast(weex.data.content);
                        }
                    } else {
                        event.showToast("网络不稳定请重试");
                    }
                })
            },
            getTime: function(value) {
                let date = new Date(value);
                let td = new Date();
                let m = td.getDay() - date.getDay();
                if (m<3) {
                    return "近三天"
                } else
                if (m<7) {
                    return "近七天"
                } else {
                    return "七天前"
                }
            },
            //判断时间是否重复
            isRepeat:function(index){
                var _this = this;
                if(index != 0){
                    if (_this.getTime(_this.friendsList[index].createDate) == _this.getTime(_this.friendsList[index - 1].createDate)) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
    }
</script>
