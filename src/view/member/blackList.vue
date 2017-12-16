<template>
    <div @viewdisappear="viewdisappear()" class="wrapper" >
        <navbar :title="title" @goback="goback" > </navbar>
        <list style="background-color: #fff" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="userList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" ></noData>
            </cell>
            <cell class="addFriendsBorder" v-else v-for="item in userList" @click="goAuthor(item.id)">
                <!--用户头像与昵称签名-->
                <div class="friendsLine" >
                    <image :src="item.logo" class="friendsImage"></image>
                    <div class="friendsName">
                        <text class="lineTitle ">{{item.nickName}}</text>
                        <text class="realName">{{item.autograph}}</text>
                    </div>
                </div>
                <!--关注与否-->
                <div class="status_panel" @click="doCancel(item.id,index)">
                    <text class="focus" >解除黑名单</text>
                </div>
                <!--<div class="status_panel" v-if="item.follow && !item.followed"  @click="doFocus(item)">-->
                <!--<text class="ask ">已关注</text>-->
                <!--</div>-->
                <!--<div class="status_panel" v-if="item.follow && item.followed"  @click="doFocus(item)">-->
                <!--<text class="ask ">互相关注</text>-->
                <!--</div>-->
            </cell>
        </list>
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
        max-width: 370px;
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
        max-width: 370px;
    }
    .status_panel {
        flex-direction: column;
        align-items: center;
        flex:1.5;
        padding-right: 20px;
    }
    .focus{
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 155px;
        color:red;
        border-style: solid;
        border-width: 1px;
        border-color: red;
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
    import {dom,event,animation} from '../../weex.js';
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import noData from '../../include/noData.vue';
    export default {
        data(){
            return{
                userList:[],
                refreshState:'',
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
            }
        },
        components: {
            navbar,noData
        },
        props:{
            noDataHint:{default:'暂无黑名单'},
            title:{default:'黑名单'}
        },
        created(){
            utils.initIconFont();
            let _this = this;
            this.getAllBlack();
        },
        methods:{
//            获取黑名单列表
            getAllBlack(){
                let _this = this;
                GET('weex/member/friends/list.jhtml?status=black'+ '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            _this.userList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.userList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
////            获取黑名单列表
                this.getAllBlack();
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
                    _this.getAllBlack();
                }, 1000)
            },


//            在页面销毁时触发，可用来捕捉安卓的回退
            viewdisappear(){
                this.goback();
            },
            goback(){
                let E = utils.message('success','成功',this.userList.length);
                event.closeURL(E);
            },
//            前往作者主页
            goAuthor(id){
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
            },
//            解除黑名单
            doCancel(id,index){
                let _this = this;
                modal.confirm({
                    message: '确定要解除黑名单吗?',
                    okTitle:'确定',
                    cancelTitle:'取消',
                    duration: 0.3
                }, function (value) {
                    if(value == '确定'){
                        POST('weex/member/friends/delete.jhtml?friendId=' + id).then(
                            function(data){
                                if(data.type == 'success'){
                                    _this.userList.splice(index,1);
                                }else{
                                    event.toast(err.content);
                                }
                            },
                            function(err){
                                event.toast(err.content);
                            }
                        )
                    }
                })
            },

        }
    }
</script>