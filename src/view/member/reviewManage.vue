<template>
    <div>
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller  style="background-color: #fff;">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="reviewList.length == 0"></noData>
                <!--导航栏-->
                <div class="lineBox" v-else v-for="(item,index) in reviewList">
                    <div class="flexRow" >
                        <image class="headImg" :src="item.logo" @click="goAuthor(item.memberId)"></image>
                        <div class="userInfo">
                            <text class="fz32 nameColor" >{{item.nickName}}</text>
                            <text class="infoText">{{item.content}}</text>
                            <div class="delDate" >
                                <text class="sub_date mt20 pb15">{{item.createDate | timefmtOther}}</text>
                                <text class="sub_date pt20 pr30 pl20 pb15" @click="delReview(item.id,index)" >删除</text>
                            </div>
                        </div>
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
    .delDate{
        flex-direction: row;justify-content: space-between;width: 615px;
    }

    .flexRow{
        flex-direction: row;
    }
    .lineBox{
        flex-direction: row;
        padding-right: 20px;
        padding-top:15px;
        /*padding-bottom: 15px;*/
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    .infoText{
        font-size: 32px;
        color: #444;
        width: 480px;
    }
    .nameColor{
        color: #2C447A;
        margin-bottom: 20px;
    }
    .userInfo{
        margin-left: 20px;
        min-height: 120px;
        justify-content: space-between;
    }
    .headImg{
        height: 90px;
        width: 90px;
        border-radius: 45px;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import utils from '../../assets/utils';
    const event = weex.requireModule('event');
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    import noData from '../../include/noData.vue';
    export default {
        data:{

            articleId:'',
            screenHeight:0,
            reviewList:[],
            refreshing:false,
            showLoading:false,
            listCurrent:0,
            pageSize:15,
            refreshState:'',
            reviewNum:0,
        },
        props:{
            noDataHint:{default:'暂无评论'},
            title:{default:'评论管理'}
        },
        components: {
            navbar,noData
        },
        created(){
            let _this = this;
            this.articleId = utils.getUrlParameter('articleId');
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(136);
            this.refresh();

        },
        methods:{
//            刷新和获取数据
            refresh(){
                let _this = this;
                GET('weex/member/review/list.jhtml?pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        _this.reviewList = data.data.data;
//                        _this.reviewNum = data.data.recordsTotal;
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
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refresh();
                    this.refreshing = false
                }, 500)
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
//                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    GET('weex/member/review/list.jhtml?pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                        if(data.type == 'success' && data.data.data != '' ){
                            data.data.data.foreach(function (item) {
                                _this.reviewList.push(item);
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
//            前往作者专栏
            goAuthor(id){
                event.openURL(utils.locate("view/member/topic/author.js?id=" + id),function (message) {
                });
//                event.openURL(utils.locate('view/member/author.js?id=5'),function () {})
            },
//            删除
            delReview(id,index){
                let _this = this;
                modal.confirm({
                    message: '确定要删除该条评论吗？',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        POST('weex/member/review/delete.jhtml?id=' + id).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.reviewList.splice(index,1);
                                }else{
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                event.toast(err.content);
                            }
                        )

                    }
                })
            }
        }
    }
</script>