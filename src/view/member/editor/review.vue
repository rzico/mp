<template>
    <div>
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="inputBox">
            <input type="text" placeholder="写下你的评论..." v-model="reviewWord" autofocus="true" class="reviewInput"  />
            <div class="sendBox mianBgColor" @click="sendReview">
                <text class="sendText">发送</text>
            </div>
        </div>
        <scroller  style="background-color: #fff;">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="reviewList.length == 0"></noData>
                <!--导航栏-->
                <div class="lineBox" v-else v-for="item in reviewList">
                    <div class="flexRow" >
                        <image class="headImg" :src="item.logo" @click="goAuthor(item.memberId)"></image>
                        <div class="userInfo">
                            <text class="fz32 nameColor" >{{item.nickName}}</text>
                            <text class="infoText">{{item.content}}</text>
                            <text class="sub_title mt20">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div class="lineBox" >-->
            <!--<div class="flexRow">-->
            <!--<image class="headImg" src="https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg"></image>-->
            <!--<div class="userInfo">-->
            <!--<text class="fz32 nameColor" >小白分</text>-->
            <!--<text class="infoText">是啊</text>-->
            <!--<div class="reviewContent">-->
            <!--<text class="reviewUser">@飘窗:</text>-->
            <!--<text class="reviewText">很漂亮</text>-->
            <!--</div>-->
            <!--<text class="sub_title mt20">07-13</text>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <text class="indicator">加载中...</text>
            </loading>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .inputBox{
        background-color:#eee;
        width: 750px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        padding-left: 10px;
        padding-right: 10px;
    }
    .sendBox{
        height: 70px;
        width: 140px;
        margin-left: 10px;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
    }
    .sendText{
        color: #fff;
        font-size: 35px;
    }
    .reviewInput{
        background-color: #fff;
        font-size: 30px;
        height: 70px;
        width: 580px;
        border-radius: 5px;
        padding-left: 20px;
    }
    .reviewContent{
        border-color: #ccc;
        border-style: solid;
        border-left-width: 6px;
        margin-top: 20px;
        padding-left: 20px;
        width: 480px;
    }

    .flexRow{
        flex-direction: row;
    }
    .lineBox{
        flex-direction: row;
        padding-right: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 750px;
        padding-left: 25px;
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
    .reviewUser{
        font-size: 32px;
        color: steelblue;
    }
    .reviewText{
        font-size: 32px;
        color: #444;
    }
    .nameColor{
        color: steelblue;
        margin-bottom: 20px;
    }
    .userInfo{
        margin-left: 20px;
        min-height: 120px;
        justify-content: space-between;
    }
    .headImg{
        height: 110px;
        width: 110px;
        border-radius: 55px;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    export default {
        data:{

            reviewWord:'',
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
        },
        components: {
            navbar,noData
        },
        computed:{
            title:function () {
                return this.reviewNum + '人评论';
            }
        },
        created(){
            let _this = this;
            this.articleId = utils.getUrlParameter('articleId');
//            获取屏幕的高度
//            this.screenHeight = utils.fullScreen(236);

            GET('weex/review/list.jhtml?articleId=' + this.articleId +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                if(data.type == 'success' && data.data.data != '' ){
                        _this.reviewList = data.data.data;
                        _this.reviewNum = data.data.recordsTotal;
                }else if(data.type == 'success' && data.data.data == '' ){
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
            sendReview(){
                let _this = this;
//                判断是否输入内容为空
                if(utils.isAllEmpty(this.reviewWord)){
                    event.toast('请输入评论内容');
                }else{
                    POST('weex/member/review/submit.jhtml?articleId=' + this.articleId + '&content=' + encodeURI(this.reviewWord)).then(
                        function (data) {
                            if(data.type == 'success' && data.data != ''){
                                _this.reviewList.splice(0,0,data.data);
                                _this.reviewWord = '';
                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
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
                    GET('weex/review/list.jhtml?articleId=' + this.articleId +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
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
                event.openURL(utils.locate("view/member/author.js?id=" + id),function (message) {
                });
//                event.openURL(utils.locate('view/member/author.js?id=5'),function () {})
            },
        }
    }
</script>