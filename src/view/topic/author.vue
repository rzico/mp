<template>
    <scroller class="wrapper" show-scrollbar="false"  offset-accuracy="0" @scroll="scrollHandler" :scrollable="canScroll">
        <!--<refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
        <!--<image class="gif" resize="cover"-->
        <!--src="file://resources/image/loading.gif"></image>-->
        <!--<text class="indicator">{{refreshState}}</text>-->
        <!--<loading-indicator>...</loading-indicator>-->
        <!--</refresh>-->
        <!--<refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">-->
        <!--<text class="indicator">Refreshing ...</text>-->
        <!--</refresh>-->
        <!--判断是否到顶部，关闭那个顶部导航栏显示效果-->
        <div style="position: absolute;top: 0px;left: 0;width: 1px;height: 1px;opacity: 0" @appear="toponappear"></div>
        <div>
            <!--顶部白色区域-->
            <div class="header headerMore" :style="{opacity: opacityNum}" :class="[classHeader(),opacityNum == 0 ? 'novisible' : 'isvisible']" >
                <!--顶部导航-->
                <div class="nav nw">
                    <div style="width: 50px;">
                    </div>
                    <!--导航栏名字头像-->
                    <div class="userBox"  @click="goAttribute()" v-if="settingColor == 'black'" >
                        <image class="headImg" :src="imageUrl"></image>
                        <text class="navText" >{{userName}}</text>
                    </div>
                    <div style="width: 50px;">
                    </div>
                </div>
            </div>
            <!--导航栏返回-->
            <div class="backMenu"  :class="[classTop()]" style="left: 0px;" @click="goback()">
                <text  :style="{fontFamily:'iconfont',color:settingColor}" style="font-size:38px;">&#xe669;</text>
            </div>
            <!--导航栏菜单栏-->
            <div class="backMenu"  :class="[classTop()]" style="right: 0px;" @click="goManage()">
                <text  :style="{fontFamily:'iconfont',color:settingColor}" style="font-size:50px;">&#xe72b;</text>
            </div>
            <!--绑定动画-->
            <!--<transition-group name="navTransition" tag="div">-->
            <!--只能多写一个顶部栏。否则无法适应-->
            <div  class="corpusBox "   style="top: 136px;position: fixed"  :class="[twoTop ? 'isvisible' : 'novisible']">
                <scroller scroll-direction="horizontal" class="corpusScroll">
                    <div class="articleClass">
                        <text @click="corpusChange(index,item.id)" class="allArticle"  v-for="(item,index) in corpusList" v-if="item.count != 0" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                    </div>
                </scroller>
                <!--<div class="corpusIconBox"  @click="goCorpus()">-->
                <!--<text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe60e;</text>-->
                <!--</div>-->
                <!--文集前后白色遮罩层-->
                <!--<div class="blur leftBlur"></div>-->
                <!--<div class="blur rightBlur"></div>-->
            </div>
        </div>
        <!--</transition-group>-->
        <!--顶部个人信息栏-->
        <div class="topBox" :class="[classHeader()]" ref='topBox'>
            <!--背景图片-->
            <image   class="backgroundImage" :src="bgImgUrl"></image>
            <!--遮罩层-->
            <!--<image class="backgroundMask" :src="maskUrl"></image>-->
            <div  class="topHead">
                <!--用户头像-->
                <image class="testImage" :src="imageUrl" ></image>
                <!--个性签名 用户昵称-->
                <div style="align-items: center;padding-bottom:20px" @click="goAttribute()">
                    <!--用户昵称-->
                    <text class="userName">{{userName}}</text>
                    <!--用户签名-->
                    <text class="userSign">{{userSign}}</text>
                </div>
            </div>
            <!--功能按钮-->
            <div class="topBtnBox">
                <div class="topBtnSmallBox " style="min-width: 120px" @click="goFocus()">
                    <text class="topBtn topBtnBigFont">{{focusNum}}</text>
                    <text class=" topBtn " >关注</text>
                </div>
                <div class="topBtnSmallBox "  @click="goCollect()">
                    <!--钱包两边的白色边框-->
                    <div  class="leftBtnBorder topBtnBorder" ></div>
                    <div  class="rightBtnBorder topBtnBorder" ></div>
                    <text class="topBtn topBtnBigFont">{{collectNum}}</text>
                    <text class="topBtn">收藏</text>
                </div>
                <div class="topBtnSmallBox"  style=";min-width: 120px" @click="goFans()">
                    <text class="topBtn topBtnBigFont">{{fansNum}}</text>
                    <text class="topBtn">粉丝</text>
                </div>
            </div>
        </div>
        <div >
            <div  class="corpusBox"  >
                <scroller scroll-direction="horizontal"  class="corpusScroll">
                    <div class="articleClass">
                            <text @click="corpusChange(index,item.id)" class="allArticle"  v-for="(item,index) in corpusList" v-if="item.count != 0" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                    </div>
                </scroller>
            </div>
            <!--<noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>-->
            <!--文章模块-->
            <!--<div :style="{minHeight:screenHeight + 'px'}" v-else style="padding-bottom: 100px">-->
            <div :style="{minHeight:screenHeight + 'px'}" style="padding-bottom: 100px">
                <!--绑定动画-->
                <!--<transition-group name="paraTransition" tag="div">-->
                    <!--<div class="articleBox" v-for="(item,index) in articleList" :key="index" v-if="switchArticle(item.corpus)" @click="goArticle(item.id)" @touchstart="ontouchstart($event,index)" @swipe="onpanmove($event,index)">-->
                    <div class="articleBox" v-for="(item,index) in articleList" :key="index" @click="goArticle(item.id)" @swipe="onpanmove()">
                        <!--<div class="articleBox" v-for="item in articleList" @click="goArticle(item.id)" @swipe="swipeHappen($event)"> @panmove="onpanmove($event,index)"-->
                        <div class="atricleHead">
                            <!--<text class="articleSign">{{item.articleSign}}</text>-->
                            <!--<text class="articleSign">{{item.value.articleOption.authority | watchWho}}</text>-->
                            <text class="articleTitle">{{item.title}}</text>
                        </div>
                        <!--文章封面-->
                        <div style="position: relative">
                            <image :src="item.thumbnail" resize="cover" class="articleCover"></image>
                        </div>
                        <!--文章底部-->
                        <div class="articleFoot">
                            <div>
                                <text class="articleDate">2017-09-01</text>
                                <!--<text class="articleDate">{{item.createDate}}</text>-->
                            </div>
                            <div class="relevantInfo">
                                <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                <text class="relevantText">{{item.hits}}</text>
                                <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                <text class="relevantText">{{item.laud}}</text>
                                <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                <text class="relevantText">{{item.review}}</text>
                            </div>
                        </div>
                    </div>
                <!--<div style="height: 1300px;">-->
                <!--</div>-->
                <!--</transition-group>-->
            </div>
        </div>
        <div class="bottomBtnBox">
            <div class="bottomBtn " v-if="!isFocus" @click="focus()">
                <text class="fz35" :style="{fontFamily:'iconfont'}">&#xe606;</text>
                <text class="fz35 ml10" >关注</text>
            </div>
            <div class="bottomBtn " v-else @click="focus()">
                <text class="fz35 gray"  :style="{fontFamily:'iconfont'}">&#xe6b8;</text>
                <text class="fz35 ml10 gray" >已关注</text>
            </div>
            <div class="rightBorder"></div>
            <div class="bottomBtn">
                <text class="fz35"  :style="{fontFamily:'iconfont'}">&#xe62f;</text>
                <text class="fz35 ml10" >私信</text>
            </div>
        </div>
        <div v-if="isOperation ">
            <div class="mask" @touchstart="maskTouch"></div>
            <div class="operationBox"  style="width: 230px;">
                <div class="arrow-up" >
                    <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe608;</text>
                </div>
                <div class="flex-row pt25 pb25  textActive " style="width: 230px;padding-left: 21px;padding-right: 21px" v-if="isBlack=='black'" @click="doBlack()">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                    <text class="fz28 pl10">解除黑名单</text>
                </div>
                <div class="flex-row pt25 pb25  textActive " style="width: 230px;;padding-left: 21px;padding-right: 21px" v-else @click="doBlack()">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                    <text class="fz28 pl10">加入黑名单</text>
                </div>
                <!--<div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="report">-->
                <!--<text class="fz40" :style="{fontFamily:'iconfont'}">&#xe62d;</text>-->
                <!--<text class="fz28 pl10">举报</text>-->
                <!--</div>-->

            </div>
        </div>
        <!--</div>-->
        <loading class="loading" @loading="onloading" :display="showLoading">
            <text class="indicator">Loading ...</text>
        </loading>
    </scroller>
</template>

<style lang="less" src="../../style/wx.less"/>
<style scoped >
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.5;
    }
    .laudActive{
        color: #888;
    }
    .arrow-up {
        position: fixed;top: 145px;right:30px;
    }
    .operationBox{
        position: fixed;top: 150px;right: 15px;background-color:#fff;border-radius: 20px;padding-top: 20px;padding-bottom: 20px;
    }


    .backMenu{
        position: fixed;
        top: 44px;
        height: 92px;
        width: 92px;
        align-items: center;
        justify-content: center;
    }
    .bottomBtn{
        flex:1;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        height: 100px;
    }
    .bottomBtn:active{
        background-color: #ccc;
    }
    .rightBorder{
        border-style: solid;
        border-color: #ccc;
        border-right-width: 1px;
        width:1px;
        height: 70px;
    }
    .bottomBtnBox{
        border-style: solid;
        border-color: #ccc;
        border-top-width: 1px;
        position: fixed;
        flex-direction: row;
        background-color: #fff;
        align-items: center;
        bottom: 0;
        left:0;
        right: 0;
        height: 100px;
    }
    .categoryBox{
        position: absolute;background-color: #888;left: 650px;bottom: 100px;opacity: 0.4;border-radius: 5px;padding-right: 3px;padding-left: 3px;padding-top: 3px;padding-bottom: 3px;
    }
    .categoryText{
        color: #fff;
        font-size: 28px;
    }
    .moneyFormat{
        flex-direction: row;justify-content: center;
    }
    .corpusScroll{
        flex-direction: row;width: 750px;
        background-color: #fff;
    }
    .fz35{
        font-size: 35px;
    }
    .corpusIconBox{
        width: 100px;justify-content: center;align-items: center;background-color: white;
    }
    .isvisible{
        opacity: 1;
        visibility: visible;
    }
    .novisible{
        opacity: 0;
        visibility: hidden;
    }
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nw{
        width: 750px;
        padding-right: 30px;
        padding-left: 30px;
    }
    .headImg{
        height:50px;
        width: 50px;
        border-radius: 25px;
    }
    .navText{
        padding-left: 10px;
        font-size: 33px;

    }
    .setTop{
        top:136px;
    }
    .posFixed{
        position: fixed;
        background-color: red;
        top: 136px;
    }
    .posRelative{
    }
    /*顶部导航栏*/
    .headerMore {
        position:fixed;
        background-color: #fff;
        left: 0;
        right: 0;
        top: 0px;
        height: 136px;
        border-bottom-width: 0px;
    }
    /*文集导航栏动画*/
    .navTransition-enter-active{
        transition: all 0.00001s;
    }
    .navTransition-leave-active {
        transition: all 0.00001s;
    }
    .navTransition-leave-to{
        transform: translateX(0px);
        opacity: 0;
    }
    .navTransition-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }
    .navTransition-enter{
        transform: translateX(0px);
        opacity: 0;
    }

    /*文章段落动画*/
    .paraTransition-enter-active{
        transition: all 0.2s;
    }
    .paraTransition-leave-active {
        transition: all 0.2s;
    }
    .paraTransition-leave-to{
        transform: translateX(0px);
        opacity: 0;
    }
    .paraTransition-enter-to{
        transform: translateX(0px);
        opacity: 1;
    }
    .paraTransition-enter{
        transform: translateX(0px);
        opacity: 0;
    }
    .rightBlur{
        right: 100px;
        width:20px;
    }
    .leftBlur{
        left:0;
    }
    .blur{
        position: absolute;
        height: 79px;
        width:20px;
        /*background-color: #F8F9FC;*/
        top:0;
        opacity: 0.7;
    }
    .corpusBox{
        flex-direction: row;
        /*background-color:#F8F9FC;*/
        height:80px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;

    }
    .redColor{
        color: #D9141E;
    }
    .relevantImage {
        flex-direction: row;
        font-size: 32px;
        color: #888;
        margin-right: 5px;
        margin-left: 5px;
        align-items: center;
    }

    .relevantText {
        color: #888;
        font-size: 26px;
    }

    .relevantInfo {
        flex-direction: row;
        align-items: center;
    }

    .articleFoot {
        flex-direction: row;
        justify-content: space-between;
        width: 690px;
        align-items: center;
    }

    .articleDate {
        font-size: 24px;
        color: #888;
    }

    .articleCover {
        height: 300px;
        width:690px;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .articleBox {
        background-color: #ffffff;
        padding-left: 30px;
        padding-top: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        margin-bottom: 10px;
    }

    .atricleHead {
        flex-direction: row;
        align-items: center;
    }

    .articleTitle {
        font-size: 32px;
        margin-left: 10px;
    }

    .articleSign {
        border-radius: 10px;
        padding: 5px;
        color: #888;
        font-size: 26px;
        border-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }

    .indicator{
        width:750px;
        height: 80px;
        text-align: center;
        line-height: 80px;
    }
    .wrapper{
        background-color: #eee;
    }
    [v-cloak] {
        display: none;
    }
    .tipsText{
        color: grey;
        font-size: 26px;
        margin-top: 240px;
        padding-bottom: 200px;
    }

    .noActive{
        border-bottom-width:0px;
    }
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        height:80px;
        background-color: #fff;
    }
    .allArticle{
        font-size: 29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .leftBtnBorder{
        left: 0;
    }
    .rightBtnBorder{
        right: 0;
    }
    .topBtnBorder{
        position:absolute;
        height: 40px;
        top: 20px;
        background-color: black;
        border-style:solid;
        border-color: #fff;
        border-right-width: 1px
    }
    .backgroundImage{
        position: absolute;
        width:750px;
        top:0;
        height:420px;
        filter: blur(4px);
        opacity: 1;
    }
    .topBox{
        position: relative;
        padding-top:40px;
        height: 420px;
        background-color: black;
    }
    .topBtnBox{
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        width:500px;
        margin-left: 125px;
        justify-content: space-around;
    }
    .topBtnSmallBox{
        flex: 1;
        height:80px;
        justify-content: center;
        align-items: center;
    }
    .walletLayout{
        flex-shrink:0;
        width: 1px;
    }
    .topBtn{
        color:white;
        font-size: 24px;
        text-align: center;
        height:40px;
        line-height: 40px;
    }
    .topMoneySize{
        font-weight: 400;
        font-size: 32px;
    }
    .topBtnBigFont{
        font-weight: 400;
        font-size: 38px;
    }
    .topHead{
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        color: white;
    }
    .testImage{
        width: 120px;
        height:120px;
        border-radius: 60px;
    }
    .userSign{
        lines:1;
        text-overflow:ellipsis;
        width:500px;
        font-size: 26px;
        color: white;
        text-align: center;
    }
    .userName{
        font-weight: 600;
        font-size: 32px;
        margin-top: 15px;
        margin-bottom: 15px;
        color: white;
    }
</style>

<script>
    import {dom,event,storage,stream} from '../../weex.js';
    const modal = weex.requireModule('modal');
    const animation = weex.requireModule('animation');
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch'
    import filters from '../../filters/filters.js'
    import noData from '../../include/noData.vue';
    var animationPara;//执行动画的文章
    var scrollTop = 0;
    var recycleScroll = 0;
    var allArticleScroll = 0;
    export default {
        data:function() {
            return{
                settingColor:'white',
                opacityNum:0,
                twoTop:false,
                isDisappear:false,
                corpusScrollTop:0,
                canScroll:true,
                userName:'未填写',
                userSign:'未填写',
                whichCorpus:0,
                isNoArticle:false,
//                refreshing:false,
//                refreshState:'',
                collectNum:0,
                fansNum:0,
                focusNum:0,
                imageUrl:utils.locate('resources/images/background.jpg'),
                bgImgUrl:utils.locate('resources/images/background.jpg'),
//                maskUrl:utils.('resources/images/frosted.png'),
                showLoading: 'hide',
                corpusList:[{
                    name:'全部',
                    id:'0'
                }],
                listCurrent:0,
                listPageSize:10,
//                文章
                articleList: [],
                isFocus:false,
                UId:'',
                screenHeight:'',
                corpusId:0,
                isOperation:false,
                isBlack:''
            }
        },
        components: {
            noData
        },
        filters:{
            watchCatetory:function (value) {
                if(utils.isNull(value)){
                    return '生活';
                }else{
                    return value;
                }
            }
        },
        created:function () {
            utils.initIconFont();
            var _this = this;
            this.UId = utils.getUrlParameter('id');
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(216)  ;
            GET('weex/topic/view.jhtml?id=' + this.UId,function (data) {
                if(data.type == 'success' && data.data != ''){
                    if(!utils.isNull(data.data.name)){
                        _this.userName = data.data.name;
                    };
                    if(!utils.isNull(data.data.logo)){
                        _this.imageUrl = data.data.logo;
                    };
                    _this.collectNum = data.data.favorite;
                    _this.focusNum = data.data.follow;
                    _this.isFocus = data.data.followed;
                    _this.fansNum = data.data.fans;
                    if(utils.isNull(data.data.friendStatus)){
                    }else if(data.data.friendStatus == 'black'){
                        _this.isBlack = 'black';
                    }
//                                将文集名循环插入数组中
                    for(let i = 0; i < data.data.catalogs.length;i++){
                        _this.corpusList.splice(1 + i,0,data.data.catalogs[i]);
                    }
                    _this.addArticle();
                }else{
                    event.toast(data.content);
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        props:{
            noDataHint:{default:'暂无文章'}
        },
        methods: {
//            监听设备型号,控制导航栏设置 返回按钮
            classTop:function () {
                let dc = utils.addTop();
                return dc
            },
//            监听设备型号,控制导航栏高度
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
//            判断是否有消息
            isEmpty(){
                return this.articleList.length == 0;
            },
//            加载文章
            addArticle:function () {
                let _this = this;
//                this.listCurrent = this.listPageSize + this.listCurrent;
                GET('weex/article/list.jhtml?authorId='+ this.UId + '&articleCatalogId=' + this.corpusId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.listPageSize,function (data) {
                    if(data.type == 'success' && data.data.data != ''){
                        data.data.data.forEach(function (item) {
                            if(utils.isNull(item.thumbnail)){
                            }else{
                                item.thumbnail = utils.thumbnail(item.thumbnail,690,300);
                            }
                            _this.articleList.push(item);
                        });
                    } else if(data.type == 'success' && data.data.data == ''){
                    }
                    else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            前往文章
            goArticle(id){
                var _this = this;
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id + '&publish=true'),
                    function () {
                    })
            },
            jump:function (vueName) {
                event.toast('will jump');
            },
            corpusChange:function(index,id){

//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
//                _this.canScroll = false;
//                _this.twoTop = false;
//                _this.canScroll = true;
                _this.articleList = [];
                _this.corpusId = id;
                _this.whichCorpus = index;
                _this.listCurrent = 0;
                _this.listPageSize = 10;
                _this.addArticle();
            },
            onloading(e) {
                var _this = this;
                this.showLoading = 'show'
                setTimeout(() => {
                    _this.listCurrent = _this.listCurrent + 10;
                    _this.addArticle();
                    this.showLoading = 'hide'
                }, 10)
            },
            scrollHandler: function(e) {
                var _this = this;
//                this.offsetX = e.contentOffset.x;
//                this.offsetY = e.contentOffset.y;
                if(e.contentOffset.y >=0){
                    return;
                }
                scrollTop =Math.abs(e.contentOffset.y);
//                modal.toast({message:scrollTop});8

                let opacityDegree = Math.floor(scrollTop/14)/10;
//                modal.toast({message:opacityDegree,duration:0.1});
                if(opacityDegree > 1){
                    opacityDegree = 1;
                }
                if(opacityDegree > 0.4){
                    event.changeWindowsBar("true");
                    this.settingColor = 'black';
                }else{
                    this.settingColor = 'white';
                    event.changeWindowsBar("false");
                }
                this.opacityNum = opacityDegree;

//                if(scrollTop >=284){
                if(scrollTop >=284){
                    this.twoTop = true;
//                    this.corpusScrollTop = 136;

//                    this.corpusPosition = 'fixed';
//                    modal.toast({message:this.corpusPosition,duration:1})
                }else{
                    this.twoTop = false;
//                     _this.corpusScrollTop = 420 -  scrollTop
//                    this.corpusPosition = 'relative';
//                    modal.toast({message:this.corpusScrollTop,duration:1})
                }
                if(scrollTop < 424){
                    recycleScroll = 0;
                    allArticleScroll = 0;
                }
            },
//            个人信息
            goAttribute(){
//                event.openURL(utils.locate('view/member/attribute.js'),
//                    function (data) {
//                        return ;
//                    }
//                );
            },
//            设置中心
            goManage(){
//                event.openURL(utils.locate('view/member/manage.js'),
//                    function (data) {
//                        return ;
//                    }
//                );
                this.isOperation = true;
            },
//            我的关注
            goFocus(){
                event.openURL(utils.locate('view/member/focus.js?id=' + this.UId + '&name=' + encodeURI(this.userName)),
                    function (data) {
                        return ;
                    }
                );
            },
//            我的收藏
            goCollect(){
                event.openURL(utils.locate('view/member/collect.js?id=' + this.UId + '&name=' + encodeURI(this.userName)),
                    function (data) {
                        return ;
                    }
                );
            },
//            粉丝
            goFans(){
                event.openURL(utils.locate('view/friend/fans.js?id=' + this.UId + '&name=' + encodeURI(this.userName)),
                    function (data) {
                        return ;
                    }
                );
            },
//            快速滑动滚动条时， 控制顶部导航栏消失
            toponappear(){
                this.opacityNum = 0 ;
                this.settingColor = 'white';
                event.changeWindowsBar("false");
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
            onpanmove:function () {
                return;
            },
            goback(){
                event.closeURL();
            },
//            关注
            focus:function () {
                var _this = this;
                if(this.isFocus){
                    POST('weex/member/follow/delete.jhtml?authorId=' + this.UId).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.isFocus = !_this.isFocus;
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        }
                    )
                }else{
                    POST('weex/member/follow/add.jhtml?authorId=' + this.UId).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.isFocus = !_this.isFocus;
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            },
            //            触碰遮罩层
            maskTouch(){
                this.isOperation = false;
            },
//            拉黑
            doBlack(){
                let _this = this;
//                解除
                if(this.isBlack == 'black'){
                    POST('weex/member/friends/delete.jhtml?friendId=' + id).then(
                        function(data){
                            if(data.type == 'success'){
                                _this.isBlack = '';
                                event.toast('已解除黑名单');
                            }else{
                                event.toast(err.content);
                            }
                        },
                        function(err){
                            event.toast(err.content);
                        }
                    )
                }else{
                    POST('weex/member/friends/black.jhtml?friendId='+this.UId).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.isBlack = 'black';
                                event.toast('已加入黑名单');
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            }
        }
    }
</script>







