<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" > </navbar>
        <list show-scrollbar="false" style="background-color: #ffffff"  @loadmore="onloading" loadmoreoffset="50" >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
                <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="userList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" ></noData>
            </cell>
            <cell v-else v-for="item in userList" @click="goAuthor(item.id)">
                <div class="addFriendsBorder" >
                    <!--用户头像与昵称签名-->
                    <div class="friendsLine" >
                        <image :src="item.logo" class="friendsImage"></image>
                        <div class="friendsName">
                            <text class="lineTitle ">{{item.nickName}}</text>
                            <text class="realName">{{item.autograph}}</text>
                        </div>
                    </div>
                    <!--关注与否-->
                    <div class="status_panel" v-if="!item.follow" @click="doFocus(item)">
                        <text class="focus bkg-primary bd-primary" >关注</text>
                    </div>
                    <div class="status_panel" v-if="item.follow && !item.followed"  @click="doFocus(item)">
                        <text class="ask ">已关注</text>
                    </div>
                    <div class="status_panel" v-if="item.follow && item.followed"  @click="doFocus(item)">
                        <text class="ask ">互相关注</text>
                    </div>
                </div>
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
    .focus{
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 125px;
        color:#fff;
        border-style: solid;
        border-width: 1px;
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
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import noData from '../../include/noData.vue';
    import {dom,event,animation} from '../../weex.js';
    export default {
        data(){
            return{
                userList:[],
                refreshing:false,
                showLoading:false,
                pageStart:0,
                pageSize:15,
                UId:'',
                isSelf:false,
                userName:'我',
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
            }
        },
        components: {
            navbar,noData
        },
        props:{
            noDataHint:{default:'暂无粉丝'},
        },
        computed:{
            title:function () {
//              如果用户名称过长，便截取拼成名字
                if((utils.getLength(this.userName) > 20)){
                    this.userName = utils.changeStr(this.userName);
                }
                return this.userName + '的粉丝';
            }
        },
        created(){
            let _this = this;
            this.UId = utils.getUrlParameter('id');
            let selfId = event.getUId();
            if(this.UId == selfId){
                this.isSelf = true;
            }else{
                let name = decodeURI(utils.getUrlParameter('name'));
                this.userName = utils.isNull(name) ? '我' : name;
            }
            this.getAllFans();
        },
        methods:{
//            获取所有粉丝列表
            getAllFans(){
                let _this = this;
//            获取粉丝列表
                GET('weex/fans/list.jhtml?id=' + this.UId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.logo)){
                                    item.logo = utils.thumbnail(item.logo,250,150);
                                }
                            })
                            _this.userList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.logo)){
                                    item.logo = utils.thumbnail(item.logo,250,150);
                                }
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
            goback(){
                event.closeURL();
            },
//            前往作者主页
            goAuthor(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
            },
//            关注
            doFocus(item){
                if(item.follow){
                    modal.confirm({
                        message: '确定要取消关注?',
                        okTitle:'确定',
                        cancelTitle:'取消',
                        duration: 0.3
                    }, function (value) {
                        if(value == '确定'){
                            POST('weex/member/follow/delete.jhtml?authorId=' + item.id).then(
                                function(data){
                                    if(data.type == 'success'){
                                        item.follow = false;
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
                }else{
                    if (this.clicked) {
                        return;
                    }
                    this.clicked = true;
                    let _this = this;
                    POST('weex/member/follow/add.jhtml?authorId=' + item.id).then(
                        function(data){
                            if(data.type == 'success'){
                                item.follow = true;
                            }else{
                                event.toast(err.content);
                            }
                            _this.clicked = false;
                        },
                        function(err){
                            _this.clicked = false;
                            event.toast(err.content);
                        }
                    )
                }
            },
            onloading:function () {
////            获取粉丝列表
                this.getAllFans();
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
                    this.refreshing = false;
////            获取粉丝列表
                    _this.getAllFans();
                }, 1000)
            },

        }
    }
</script>