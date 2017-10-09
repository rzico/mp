<template>
    <div class="wrapper">
        <div class="header">

        </div>
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search"> </searchNav>
        <div class="confm" v-if="isInput()">
            <text class="ico" :style="{fontFamily:'iconfont'}">&#xe611;</text>
            <text class="title"> {{keyword}} </text>
        </div>
        <noData :noDataHint="noDataHint" v-if="isEmpty()" > </noData>
        <div class="cell-row cell-line" v-if="isNoEmpty()" >
            <div class="cell-panel h space-between"  v-for="(friend,index) in friendsList">
                <div class="flex-row">
                    <image class="logo" :src="friend.logo"></image>
                    <div class="ml10">
                        <text class="title">{{friend.nickName}}</text>
                        <text class="sub_title mt20">真实姓名:{{friend.name}}</text>
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
        margin-top: 10px;
        margin-bottom: 10px;
    }

</style>
<script>
    const native = weex.requireModule('app')
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import searchNav from '../../include/searchNav.vue'
    import noData from '../../include/noData.vue'
    export default {
        components: {
            searchNav,noData
        },
        data() {
            return {
                keyword:"",
                friendsList:[{nickName:"kdjfdk",logo:"dkjfd",name:"dkjfdk"}]
            }
        },
        props: {
            searchHint: { default: "输入手机号/账户号" },
            noDataHint: { default: "输入查找好友" }
        },
        created(){
            var _this = this;
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('"+_this.locateURL+"/resources/fonts/iconfont.ttf')"
            });
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
            },
            search: function (e) {
                var _this = this;
                return stream.fetch({
                    method: 'GET',
                    type: 'json',
                    url: '/weex/member/friends/search.jhtml?keyword='+_this.value+","
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                            this.friendsList = weex.data.data;
                         } else {
                            native.showToast(weex.data.content);
                        }
                    } else {
                        native.showToast("网络不稳定请重试");
                    }
                })
            },
            addFriend: function (e) {
                var _this = this;
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/member/friends/add.jhtml?friendId='+_this.id
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {
                            event.closeURL(weex.data.data);
                        } else {
                            native.showToast(weex.data.content);
                        }
                    } else {
                        native.showToast("网络不稳定请重试");
                    }
                })
            }
        }

    }

</script>