<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <!--输入栏-->
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search" :showCancel="showCancel"  :hNum="hNum" :ptNum="ptNum" ref="childFind"> </searchNav>
        <!--无数据提示-->
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list class="list" v-if="isNoEmpty()">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image class="gif" resize="cover"
                       src="file://resource/image/loading.gif"></image>
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <cell v-for="(friend,index) in friendsList" v-if="startList">
                <!--姓氏首字母-->
                <div class="letterBox" v-if="isRepeat(index)">
                    <text class="nameLetter">{{friend.nickName | watchLetter}}</text>
                </div>
                <!--姓氏里每个人的名子-->
                <div class="addFriendsBorder">
                    <div class="friendsLine" @click="jump()">
                        <image :src="friend.logo" class="friendsImage"></image>
                        <div class="friendsName">
                            <text class="lineTitle lines-ellipsis">手机通讯录名字 {{friend.name}}</text>
                            <text class="realName">魔篇:{{friend.nickName }}</text>
                        </div>
                    </div>
                    <div class="status_panel">
                        <text class="ask bkg-primary" v-if="isAsk(friend.status)" @click="adopt(friend.id)">添加</text>
                        <text class="adopt " v-if="isAdopt(friend.status)">已添加</text>
                    </div>
                </div>
            </cell>
            <cell v-for="(friend,index) in friendsList" v-else>
                <div v-if="findFriend(index)">
                    <!--姓氏首字母-->
                    <div class="letterBox" v-if="isRepeat(index)">
                        <text class="nameLetter">{{friend.nickName | watchLetter}}</text>
                    </div>
                    <!--姓氏里每个人的名子-->
                    <div class="addFriendsBorder">
                        <div class="friendsLine" @click="jump()">
                            <image :src="friend.logo" class="friendsImage"></image>
                            <div class="friendsName">
                                <text class="lineTitle lines-ellipsis">手机通讯录名字1 {{friend.name}}</text>
                                <text class="realName">魔篇:{{friend.nickName }}</text>
                            </div>
                        </div>
                        <div class="status_panel">
                            <text class="ask bkg-primary" v-if="isAsk(friend.status)" @click="adopt(friend.id)">添加</text>
                            <text class="adopt " v-if="isAdopt(friend.status)">已添加</text>
                        </div>
                    </div>
                </div>
            </cell>
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <image class="gif" resize="cover"
                       src="file://resource/image/loading.gif"></image>
                <text class="indicator">{{loadingState}}</text>
            </loading>
        </list>
        <div style="position: absolute;top: 300px;left: 0;right: 0;align-items: center" v-if="noFind">
            <text style="font-size: 35px;color: gray">无结果</text>
        </div>
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
        padding-left: 50px;
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
    const event = weex.requireModule('event');
    import navbar from '../../include/navbar.vue';
    import { POST, GET } from '../../assets/fetch';
    import searchNav from '../../include/searchNav.vue';
    import noData from '../../include/noData.vue';
    import utils from '../../assets/utils';
    import {getLetter,dictFirstLetter} from '../../assets/letter';

    export default {
        components: {
            searchNav,noData,navbar
        },
        data() {
            return {
                noFind:false,
                findNum:0,
                keyword:"",
                friendsList:[],
                startList:true,
            }
        },
        props: {
            title: { default: "手机联系人"},
            noDataHint: { default: "无手机联系人" },
            showCancel:{default:false},
            ptNum:{default:0},
            hNum:{default:96}
        },
        filters:{
            watchLetter:function (value) {
                return getLetter.getFirstLetter(value.substring(0,1));
            }
        },
        created() {
            utils.initIconFont();
            this.onrefresh();
        },
        methods:{
            findFriend:function (index) {

                let valLength = this.keyword.length;
                if(valLength > this.friendsList[index].nickName.length){
                    return false;
                }else if(this.keyword == this.friendsList[index].nickName.substring(0,valLength)){
                    this.findNum = 1;
                    this.noFind = false;
                    return true;
                }else{
                    return false;
                }
            },
            goback(){
                event.closeURL();
            },
            oninput:function (val) {
                this.findNum = 0;
                this.keyword = val;
                event.toast(val);
                if(val.length == 0){
                    this.startList = true;
                    this.noDataHint = "无手机联系人";
                    this.findNum = 0;
                    this.noFind = false;
                }else{
                    let _this = this;
                    this.startList = false;
                    setTimeout(function () {
                        if(_this.findNum == 0){
                            _this.noFind = true;
                        }
                    },10);
                }
            },
            search:function () {

            },
            isEmpty:function () {
                return this.friendsList.length==0;
            },
            isNoEmpty:function () {
                return this.friendsList.length!=0;
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
                GET('weex/member/friends/list.jhtml?pageSize=20&pageStart=0', function(data) {
                        if (data.type == "success") {
                            let page = data.data;
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
                            event.toast(data.content);
                        }
                    },function (err) {
                        _this.refreshing = false;
                        _this.refreshState = "松开刷新数据";
                        event.toast("网络不稳定");
                    }
                )
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
                _this.loadingState = "正在加载数据";
                GET('weex/member/friends/list.jhtml?pageSize=20&pageStart='+_this.start,
                    function (data) {
                        if (data.type == "success") {
                            let page = data.data;
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
                            event.toast(weex.data.content);
                        }
                    },function (err) {
                        _this.showLoading = false;
                        _this.loadingState = "松开加载更多";
                        event.toast("网络不稳定");
                    }
                )
            },
            //同意添加好友
            adopt:function (id) {
                POST('weex/member/friends/adopt.jhtml?friendId='+id).then(
                    function (data) {
                        if (data.type == "success") {
                            event.toast(data.content);
                            _this.onrefresh();
                        } else {
                            event.toast(data.content);
                        }
                    },function(err) {
                        event.showToast("网络不稳定");
                    }
                )
            },
            //判断名字是否重复
            isRepeat:function(index){
                var _this = this;
                if(index != 0){
                    if (getLetter.getFirstLetter(_this.friendsList[index].nickName.substring(0,1)) == getLetter.getFirstLetter(_this.friendsList[index - 1].nickName.substring(0,1))) {
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