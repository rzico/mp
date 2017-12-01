<template>
    <div>
        <navbar :title="title" @goback="goback" > </navbar>
        <scroller style="background-color: #fff">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="userList.length == 0"></noData>
                <div class="addFriendsBorder" v-else v-for="(item,index) in userList" @click="goAuthor(item.id)">
                    <!--用户头像与昵称签名-->
                    <div class="friendsLine" >
                        <image :src="item.logo" class="friendsImage"></image>
                        <div class="friendsName">
                            <text class="lineTitle ">{{item.nickName}}</text>
                            <text class="realName">{{item.autograph}}</text>
                        </div>
                    </div>
                    <!--关注与否-->
                    <div class="status_panel" @click="doCancel(item,index)" v-if="isSelf">
                        <text class="ask " v-if="item.follow && !item.followed" >已关注</text>
                        <text class="ask  "v-else>互相关注</text>
                    </div>
                    <div class="status_panel" @click="doCancel(item,index)" v-else="">
                        <text class="ask " v-if="item.follow" >已关注</text>
                        <text class="focus bkg-primary"  v-else>关注</text>
                    </div>
                </div>
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
    .focus{
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 125px;
        color:#fff;
        border-color: #fff;
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
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import utils from '../../assets/utils';
    import filters from '../../filters/filters.js';
    import noData from '../../include/noData.vue';
    export default {
        components: {
            navbar,noData
        },
        data(){
            return{
                screenHeight:0,
                userList:[],
                refreshing:false,
                showLoading:false,
                listCurrent:0,
                pageSize:15,
                refreshState:'',
                UId:'',
                isSelf:false,
                userName:'我'
            }
        },
        props:{
            noDataHint:{default:'暂无关注'},
        },
        computed:{
            title:function () {
//              如果用户名称过长，便截取拼成名字
                if((utils.getLength(this.userName) > 20)){
                    this.userName = utils.changeStr(this.userName);
                }
                return this.userName + '的关注';
            }
        },
        created(){
            utils.initIconFont();
            this.UId = utils.getUrlParameter('id');
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(136);
            let selfId = event.getUId();
            if(this.UId == selfId){
                this.isSelf = true;
            }else{
                let name = decodeURI(utils.getUrlParameter('name'));
                this.userName = utils.isNull(name) ? '我' : name;
            }
            let _this = this;
            GET('weex/follow/list.jhtml?id=' + this.UId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                if(data.type == 'success' && data.data.data != '' ){
                    _this.userList = data.data.data;
                }else if(data.type == 'success'){

                }else{
                    event.toast(data.content);
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods:{
            goback(){
//                let E = {
//                    isChange:true,
//                }
//                let backData = utils.message('success','成功',E);
                event.closeURL();
            },
//            前往作者主页
            goAuthor(id){
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
            },
//            取消关注
            doCancel(item,index){
                let _this = this;
//                判断是我的关注还是作者的关注
                if(this.isSelf){
                    modal.confirm({
                        message: '确定要取消关注?',
                        okTitle:'确定',
                        cancelTitle:'取消',
                        duration: 0.3
                    }, function (value) {
                        if(value == '确定'){
                            //    将内容删掉
                            POST('weex/member/follow/delete.jhtml?authorId=' + item.id).then(
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
                }else{
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
                        POST('weex/member/follow/add.jhtml?authorId=' + item.id).then(
                            function(data){
                                if(data.type == 'success'){
                                    item.follow = true;
                                }else{
                                    event.toast(err.content);
                                }
                            },
                            function(err){
                                event.toast(err.content);
                            }
                        )
                    }
                }

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
                            data.data.data.forEach(function (item) {
                                _this.userList.push(item);
                            })
                        }else if(data.type == 'success' && data.data.data == '' ){
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