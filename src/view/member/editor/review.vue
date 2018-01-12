<template>
    <div class="wrapper" >
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="inputBox">
            <input type="text" placeholder="写下你的评论..." v-model="reviewWord" autofocus="true" class="reviewInput"  />
            <div class="sendBox bkg-primary" @click="sendReview">
                <text class="sendText">发送</text>
            </div>
        </div>
        <list  style="background-color: #fff;"  @loadmore="onloading" loadmoreoffset="50" >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="reviewList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" ></noData>
            </cell>
            <!--导航栏-->
            <cell  v-else v-for="(item,index) in reviewList">
                <div class="lineBox">
                    <div class="flexRow" >
                        <image class="headImg" :src="item.logo" @click="goAuthor(item.memberId)"></image>
                        <div class="userInfo">
                            <text class="fz32 nameColor" >{{item.nickName}}</text>
                            <text class="infoText">{{item.content}}</text>
                            <div class="delDate" >
                                <text class="sub_date mt20 pb15">{{item.createDate | timefmtOther}}</text>
                                <text class="sub_date pt20 pr30 pl20 pb15" @click="delReview(item.id,index)" v-if="selfId == item.memberId || selfId == authorId">删除</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .delDate{
        flex-direction: row;justify-content: space-between;width: 615px;
    }
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
    .sendBox:active{
        background-color: #999;
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
    .reviewUser{
        font-size: 32px;
        color: steelblue;
    }
    .reviewText{
        font-size: 32px;
        color: #444;
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
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation} from '../../../weex.js';
    const modal = weex.requireModule('modal');
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    export default {
        data:{

            reviewWord:'',
            articleId:'',
            reviewList:[],
            refreshing:false,
            showLoading:false,
            pageStart:0,
            pageSize:15,
            reviewNum:0,
            selfId:'',
            refreshImg:utils.locate('resources/images/loading.png'),
            hadUpdate:false,
            authorId:'',
            clicked:false
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
            this.selfId = event.getUId();
            this.articleId = utils.getUrlParameter('articleId');
            this.authorId = utils.getUrlParameter('authorId');
            this.getAllReview();

        },
//        dom呈现完执行滚动一下
        updated(){
//            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
            if(this.hadUpdate){
                return;
            }
            this.hadUpdate = true;
//            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
            if(!utils.isIosSystem()){
                const el = this.$refs.adoptPull//跳转到相应的cell
                dom.scrollToElement(el, {
                    offset: -119
                })
            }
        },
        methods:{
//            刷新和获取数据
            getAllReview(){
                let _this = this;
                GET('weex/review/list.jhtml?articleId=' + this.articleId +'&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            _this.reviewList = data.data.data;
                            _this.reviewNum = data.data.recordsTotal;
                        } else {
                            data.data.data.forEach(function (item) {
                                _this.reviewList.push(item);
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
            sendReview(){
                let _this = this;
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
//                判断是否输入内容为空
                if(utils.isAllEmpty(this.reviewWord)){
                    _this.clicked = false;
                    event.toast('请输入评论内容');
                }else{
                    POST('weex/member/review/submit.jhtml?articleId=' + this.articleId + '&content=' + encodeURI(this.reviewWord)).then(
                        function (data) {
                            if(data.type == 'success' && data.data != ''){
                                _this.reviewList.splice(0,0,data.data);
                                _this.reviewWord = '';
                                _this.reviewNum ++;
                            }else{
                                event.toast(data.content);
                            }
                            _this.clicked = false;
                        },
                        function (err) {
                            event.toast(err.content);
                            _this.clicked = false;
                        }
                    )
                }
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
                    _this.getAllReview();
                }, 1000)
            },
            onloading:function () {
                this.getAllReview();
            },
//            前往作者专栏
            goAuthor(id){
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
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
                                    _this.reviewNum --;
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