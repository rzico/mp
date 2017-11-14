<template>
    <div>
        <navbar :title="title" @goback="goback" > </navbar>
        <scroller style="background-color: #fff">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div class="addFriendsBorder" v-for="item in userList" @click="goAuthor()">
                <div class="friendsLine" >
                    <image :src="item.logo" class="friendsImage"></image>
                    <div class="friendsName">
                        <text class="lineTitle ">{{item.nickName}}</text>
                        <text class="realName">{{item.sign}}</text>
                    </div>
                </div>
                <div class="status_panel" @click="doCancel()" v-if="isSelf">
                    <text class="ask " v-if="item.status == 'adopt'" >已关注</text>
                    <text class="ask  "v-else>互相关注</text>
                </div>
                <!--<div class="status_panel" @click="doFocus()" v-else="">-->
                    <!--<text class="ask " v-if="item.status == 'adopt'" >已关注</text>-->
                    <!--<text class="ask  "v-else>互相关注</text>-->
                <!--</div>-->
            </div>

            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <text class="indicator">加载中...</text>
            </loading>
        </scroller>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .friendsImage{
        margin-top: 20px ;
        height: 100px;
        width:100px;
        border-radius: 50px;
    }
    .realName{
        color: #888;
        font-size: 26px;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        max-width: 400px;
    }
    .friendsName{
        height:110px;
        margin-top: 15px;
        justify-content: space-around;
    }
    .addFriendsBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
    }
    .friendsLine{
        height:140px;
        background-color: #fff;
        flex-direction: row;
        flex:5;
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
        lines:1;
        text-overflow: ellipsis;
        max-width: 400px;
    }
    .status_panel {
        flex-direction: column;
        align-items: center;
        flex:1.5;
        padding-right: 20px;
    }

    .ask {
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 125px;
        color:#ccc;
        border-color: #ccc;
        border-style: solid;
        border-width: 1px;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import filters from '../../filters/filters.js';
    export default {
        components: {
            navbar
        },
        props:{
            title:{default:'我的关注'}
        },
        data(){
            return{
                userList:[],
                refreshing:false,
                showLoading:false,
                listCurrent:0,
                pageSize:15,
                UId:'',
                refreshState:'',
                isSelf:false
            }
        },
        created(){
            this.UId = utils.getUrlParameter('id');
            let selfId = event.getUId();
            if(this.UId == selfId){
                this.isSelf = true;
            }
            let _this = this;
            event.toast('weex/follow/list.jhtml?id=' + this.UId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize);
            GET('weex/follow/list.jhtml?id=' + this.UId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                if(data.type == 'success' && data.data.data != '' ){
                    _this.userList = data.data.data;
                }else{
                    event.toast(data.content);
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods:{
            goback(){
                event.closeURL();
            },
//            前往作者主页
            goAuthor(){
                event.toast('作者主页');
            },
//            取消关注
            doCancel(){
                modal.confirm({
                    message: '确定要取消关注?',
                    okTitle:'确定',
                    cancelTitle:'取消',
                    duration: 0.3
                }, function (value) {
                    if(value == '确定'){
                        //    将内容删掉
                        event.toast('取消成功');
                    }
                })
            },
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
//                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    GET('weex/follow/list.jhtml?id=' + this.UId +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success' && data.data.data != '' ){
                            data.data.data.foreach(function (item) {
                                _this.userList.push(item);
                            })
                        }else if(data.type == 'success' && data.data.data == '' ){
                            event.toast('已经到底了');
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })


                    _this.showLoading = false;
                }, 1500)
            },

        }
    }
</script>