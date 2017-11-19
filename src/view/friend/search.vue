<template>
    <div class="wrapper">
        <!--输入栏-->
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search"  ref="childFind"> </searchNav>
        <!--搜索栏-->
        <div class="confm" v-if="isInput()" @click="childSearch()">
            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe611;</text>
            <text class="title">搜索: {{keyword}} </text>
        </div>
        <!--无数据提示-->
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <!--数据显示-->
        <div class="cell-row cell-line" v-if="isNoEmpty()" >
            <div class="cell-panel h space-between"  v-for="(friend,index) in friendsList" @click="addFriend(friend.id)" >
                <div class="flex-row">
                    <image class="logo" :src="friend.logo"></image>
                    <div >
                        <text class="title ml20">{{friend.nickName}}</text>
                        <!--字体不居中-->
                        <!--<div class="flex-row ml10 mt10 fullChange " :class="[friend.tags == '' ? 'bgbr' : '']">-->
                        <!--字体居中-->
                        <div class="flex-row ml10 mt10 fullChange ">
                            <!--标签名称-->
                            <text class="sub_title mt10 ml10" :class="[friend.tags != '' ? 'isBg' : '']" v-for="item in friend.tags">{{item}}</text>
                        </div>
                    </div>
                </div>
                <div class="flex-row flex-end">
                    <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .fullChange{
        width: 520px;
        flex-wrap: wrap;
    }
    .bgbr{
        height: 54px;
    }
    .isBg{
        background-color: #D9141E;
        color: #fff;
        border-radius: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;

    }

    .confm {
        background-color: white;
        height:90px;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;

    }
    .h {
        height: 160px;
    }
    .logo {
        width:120px;
        height: 120px;
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

</style>
<script>
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import searchNav from '../../include/searchNav.vue';
    import noData from '../../include/noData.vue';
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch'
    export default {
        components: {
            searchNav,noData
        },
        data() {
            return {
                keyword:"",
                friendsList:[],
            }
        },
        props: {
            searchHint: { default: "输入手机号/账户号" },
            noDataHint: { default: "输入查找用户" }
        },
        created(){
            utils.initIconFont();
            event.changeWindowsBar('true');
        },
        methods: {
            isEmpty:function () {
               return this.friendsList.length==0;
            },
            isNoEmpty:function () {
                return this.friendsList.length!=0;
            },
            isInput:function () {
                return this.keyword!="";
            },
            oninput:function (val) {
              this.keyword = val;
              if(val.length == 0){
                  this.friendsList = [];
                  this.noDataHint = "输入查找用户";
              }
            },
            search: function (e) {
                var _this = this;
                GET('weex/member/friends/search.jhtml?keyword='+_this.keyword,function (data) {
                        if(data.type == 'success'){
                            _this.friendsList = [];
                            data.data.forEach(function (item) {
                                _this.friendsList.push(item);
                            })
//                            _this.friendsList = data.data;
                            _this.noDataHint = '该用户不存在';
                        }else{
                            event.toast(data.content);
                        }
                },function (err) {
                    event.toast(err.content);
                })
//                return stream.fetch({
//                    method: 'GET',
//                    type: 'json',
//                    url: 'weex/member/friends/search.jhtml?keyword='+_this.keyword
//                }, function (weex) {
//                    event.toast(weex.data.data);
//                    if (weex.ok) {
//                        if (weex.data.type == "success") {
//                            _this.friendsList = weex.data.data;
//                            _this.noDataHint = '该用户不存在';
//                         } else {
////                            判断是否数据有更新
//                            if(weex.data.content == 'cache.success'){
//                            }else{
//                                event.toast(weex.data.content);
//                            }
//                        }
//                    } else {
//                        event.toast("网络不稳定请重试");
//                    }
//                })
            },
//            通知自组件将input失去焦点
            childSearch(){
              this.$refs.childFind.search();
            },
//            添加好友
            addFriend: function (userId) {
                var _this = this;
//                return stream.fetch({
//                    method: 'POST',
//                    type: 'json',
//                    url: 'weex/member/friends/add.jhtml?friendId='+ userId
//                }, function (weex) {
//                    if (weex.ok) {
//                        if (weex.data.type == "success") {
//                            event.closeURL(weex.data.data);
//                        } else {
//                            event.toast(weex.data.content);
//                        }
//                    } else {
//                        event.toast("网络不稳定请重试");
//                    }
//                })
                POST('weex/member/friends/add.jhtml?friendId='+ userId).then(
                    function (weex) {
                        if (weex.type == "success") {
                            event.toast('请求已发送,请等待对方验证');
                            let backData = utils.message('success','成功','请求已发送,请等待对方验证');
                            event.closeURL(backData);
                        } else {
                            event.toast(weex.content);
                        }
                    }, function (err) {
                        event.toast("网络不稳定请重试");
                    }
                )
            }
        }

    }

</script>