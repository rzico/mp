
<template>
    <scroller class="wrapper" show-scrollbar="false"  offset-accuracy="0" @scroll="scrollHandler" :scrollable="canScroll">
        <!--<refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
            <!--<image class="gif" resize="cover"-->
                   <!--src="file://resource/image/loading.gif"></image>-->
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
            <div class="header" :style="{opacity: opacityNum}" :class="[opacityNum == 0 ? 'novisible' : 'isvisible']" >
                <!--顶部导航-->
                <div class="nav">
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
            <!--导航栏设置-->
            <div style="position: fixed;top: 63px;right: 30px;" @click="goManage()">
                <text  :style="{fontFamily:'iconfont',color:settingColor}" style="font-size:50px;">&#xe62d;</text>
            </div>
            <!--绑定动画-->
            <!--<transition-group name="navTransition" tag="div">-->
            <!--只能多写一个顶部栏。否则无法适应-->
            <div  class="corpusBox "   style="top: 136px;position: fixed"  :class="[twoTop ? 'isvisible' : 'novisible']">
                <scroller scroll-direction="horizontal" class="corpusScroll">
                    <div class="articleClass">
                        <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class = "[whichCorpus == index ? 'active' : 'noActive']">{{item.name}}</text>
                    </div>
                </scroller>
                <div class="corpusIconBox"  @click="goCorpus()">
                    <text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>
                </div>
                <!--文集前后白色遮罩层-->
                <!--<div class="blur leftBlur"></div>-->
                <!--<div class="blur rightBlur"></div>-->
            </div>
        </div>
        <!--</transition-group>-->
        <!--顶部个人信息栏-->
        <div class="topBox" ref='topBox'>
            <!--背景图片-->
            <image   class="backgroundImage" :src="bgImgUrl"></image>
            <!--遮罩层-->
            <!--<image class="backgroundMask" :src="maskUrl"></image>-->
            <div  class="topHead">
                <!--用户头像-->
                <image class="testImage" :src="imageUrl" ></image>
                <!--个性签名 用户昵称-->
                <div style="align-items: center;" @click="goAttribute()">
                    <!--用户昵称-->
                    <text class="userName">{{userName}}</text>
                    <!--用户签名-->
                    <text class="userSign">{{userSign}}</text>
                </div>
            </div>
            <!--功能按钮-->
            <div class="topBtnBox">
                <div class="topBtnSmallBox " style="min-width: 120px" @click="jump()">
                    <text class="topBtn topBtnBigFont">{{collectNum}}</text>
                    <text class=" topBtn " >收藏</text>
                </div>
                <div class="topBtnSmallBox walletLayout"  @click="jump()">
                    <!--钱包两边的白色边框-->
                    <div  class="leftBtnBorder topBtnBorder" ></div>
                    <div  class="rightBtnBorder topBtnBorder" ></div>
                    <div class="moneyFormat">
                        <text class="topBtn topMoneySize" v-if="moneyNum != 0">¥</text>
                        <text class="topBtn topBtnBigFont">{{moneyNum | currencyfmt}}</text>
                    </div>
                    <text class="topBtn" >钱包</text>
                </div>
                <div class="topBtnSmallBox"  style=";min-width: 120px">
                    <text class="topBtn topBtnBigFont">{{focusNum}}</text>
                    <text class="topBtn">关注</text>
                </div>
            </div>
        </div>
        <div >

            <!--<div v-if="isAllArticle" v-cloak >-->
            <!--<div>-->
            <!--<text v-if="isNoArticle" class="tipsText">您还没有文章</text>-->
            <!--</div>-->

            <!--全部文章、回收站栏-->
            <!--<div class="articleClass">-->
            <!--<text @click="allArticle()" class="allArticle" :class = "[isAllArticle ? 'active' : 'noActive']">全部文章</text>-->
            <!--<text @click="recycleSite()" class="recycleSite" :class = "[!isAllArticle ? 'active' : 'noActive']">回收站</text>-->
            <!--</div>-->
            <!--<div  class="corpusBox"  :class = "[isTop  ? 'posFixed' : 'posRelative']">-->
            <div  class="corpusBox"  >
                <scroller scroll-direction="horizontal"  class="corpusScroll">
                    <div class="articleClass">
                        <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class = "[whichCorpus == index ? 'active' : 'noActive']">{{item.name}}</text>

                    </div>
                </scroller>
                <div class="corpusIconBox" @click="goCorpus()"  >
                    <text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>
                </div>
                <!--文集前后白色遮罩层-->
                <!--<div class="blur leftBlur" >-->
                <!--<image src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg" style="width: 20px;height:79px;"></image>-->
                <!--</div>-->
                <!--<div class="blur rightBlur"  >-->
                <!--<image :src="testaaa" style="width: 20px;height:79px;"></image>-->
                <!--</div>-->
            </div>
            <!--文章模块-->
            <div >
                <!--绑定动画-->
                <transition-group name="paraTransition" tag="div">
                    <!--<div class="articleBox" v-for="(item,index) in articleList" :key="index" v-if="switchArticle(item.corpus)" @click="goArticle(item.id)" @touchstart="ontouchstart($event,index)" @swipe="onpanmove($event,index)">-->
                    <div class="articleBox" v-for="(item,index) in articleList" :key="index" @click="goArticle(item.key)" @touchstart="ontouchstart($event,index)" @swipe="onpanmove($event,index)">
                        <!--<div class="articleBox" v-for="item in articleList" @click="goArticle(item.id)" @swipe="swipeHappen($event)"> @panmove="onpanmove($event,index)"-->
                        <div class="atricleHead">
                            <!--<text class="articleSign">{{item.articleSign}}</text>-->
                            <text class="articleSign">公开</text>
                            <text class="articleTitle">{{item.value.title}}</text>
                        </div>
                        <!--文章封面-->
                        <div>
                            <image :src="item.value.thumbnail" resize="cover" class="articleCover"></image>
                        </div>
                        <!--文章底部-->
                        <div class="articleFoot">
                            <div>
                                <!--<text class="articleDate">{{item.articleDate}}</text>-->
                                <text class="articleDate">2017-09-01</text>
                            </div>
                            <div class="relevantInfo" v-if="item.articleSign != '样例'">
                                <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                <text class="relevantText">{{item.value.hits}}</text>
                                <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                <text class="relevantText">{{item.value.laud}}</text>
                                <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                <text class="relevantText">{{item.value.review}}</text>
                            </div>
                        </div>
                        <!--右侧隐藏栏-->
                        <div class="rightHidden">
                            <div class="rightHiddenSmallBox">
                                <div class="rightHiddenIconBox" @click="jumpEditor(item.key)">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe61f;</text>
                                    <text class="rightHiddenText">编辑</text>
                                </div>
                                <div class="rightHiddenIconBox" @click="jumpDelete()">
                                    <text class="rightHiddenIcon redColor" :style="{fontFamily:'iconfont'}" >&#xe6a7;</text>
                                    <text class="rightHiddenText redColor" >删除</text>
                                </div>
                            </div>
                            <div class="rightHiddenSmallBox">
                                <div class="rightHiddenIconBox" @click="jumpTop()">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                                    <text class="rightHiddenText">置顶</text>
                                </div>
                                <div class="rightHiddenIconBox" @click="jumpCorpus()">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                                    <text class="rightHiddenText">文集</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
                <!--帮助使用文章-->
                <div class="articleBox" v-for="item in helpList"  >
                    <div class="atricleHead">
                        <text class="articleSign">{{item.articleSign}}</text>
                        <text class="articleTitle">{{item.articleTitle}}</text>
                    </div>
                    <!--文章封面-->
                    <div>
                        <image :src="item.articleCoverUrl" class="articleCover"></image>
                    </div>
                    <!--文章底部-->
                    <div class="articleFoot">
                        <div>
                            <text class="articleDate">{{item.articleDate}}</text>
                        </div>
                    </div>
                </div>
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
    .moneyFormat{
        flex-direction: row;justify-content: center;
    }
    .corpusScroll{
        flex-direction: row;width: 650px;
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
    .nav{
        margin-top: 40px;
        flex-direction: row;
        height: 96px;
        width: 750px;
        align-items: center;
        justify-content: space-between;
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
    .header {
        flex-direction: row;
        position:fixed;
        /*background-color: #D9141E;*/
        background-color: #fff;
        left: 0;
        right: 0;
        top: 0px;
        height: 136px;
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
        /*background-image: linear-gradient(to left, #F8F9FC,#fff);*/
    }
    .leftBlur{
        left:0;
        /*background-image: linear-gradient(to right, #F8F9FC,#fff);*/
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
    .rightHiddenIconBox{
        justify-content: center;
        align-items: center;
    }
    .rightHiddenSmallBox{
        flex-direction: row;
        flex: 1;
        justify-content: space-around;
        align-items: center;
    }
    .rightHiddenText{
        font-size: 24px;
        color: #999;
    }
    .rightHiddenIcon{
        text-align: center;
        line-height: 90px;
        font-size: 40px;
        width:90px;
        height:90px;
        border-radius: 45px;
        color: black;
        background-color: #fff;
        margin-bottom: 15px;
    }
    .rightHidden{
        position: absolute;
        right: 0px;
        top: 0;
        background-color: #f4f4f4;
        width: 330px;
        height:457px ;
        /*align-items: center;*/
        /*justify-content:space-around;*/
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
        /*========= 9.27*/
        width:1080px;
        display: inline-block
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
        background-color: #f4f4f4;
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
    .active{
        color: #F0AD3C;
        border-color: #F0AD3C;
        border-style: solid;
        border-bottom-width:4px;
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
    /*.backgroundMask{*/
    /*position: absolute;*/
    /*width:750px;*/
    /*top:0;*/
    /*height:420px;*/
    /*}*/
    .backgroundImage{
        position: absolute;
        width:750px;
        top:0;
        height:420px;
        filter: blur(4px);
        opacity: 1;
        /*-moz-filter: blur(4px);*/
        /*-webkit-filter: blur(4px);*/
        /*-o-filter: blur(4px);*/
        /*-ms-filter: blur(4px);*/
        /*-webkit-backdrop-filter: blur(4px);*/
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

        margin-top: 30px;
        width:500px;
        margin-left: 125px;
        justify-content: space-around;
    }
    .topBtnSmallBox{
        height:80px;
        justify-content: center;
        align-items: center;
    }
    .walletLayout{
        min-width: 166px;flex-shrink:0;padding-left: 30px;padding-right: 30px;
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
    var animationPara;//执行动画的文章
    var scrollTop = 0;
    var recycleScroll = 0;
    var allArticleScroll = 0;
    export default {
        data:function() {
            return{
                testaaa:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                settingColor:'white',
                opacityNum:0,
                twoTop:false,
                isDisappear:false,
                corpusScrollTop:0,
                canScroll:true,
                userName:'刮风下雨打雷台风天',
                userSign:'刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。',
                whichCorpus:0,
                isNoArticle:false,
//                refreshing:false,
//                refreshState:'',
                fontName: '&#xe685;',
                collectNum:0,
                moneyNum:888888.88,
                focusNum:0,
                imageUrl:utils.locate('resources/images/background.jpg'),
                bgImgUrl:utils.locate('resources/images/background.jpg'),
//                maskUrl:utils.locate('resources/images/frosted.png'),
                id:'334',
                showLoading: 'hide',
//                imageUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',

                corpusList:[{
                    name:'全部文章',
                    id:''
                },{
                    name:'回收站',
                    id:'99'
                }],
                listCurrent:0,
                listPageSize:10,
//                全部文章==================
                articleList: [],

                helpList:[{
                    articleSign:'样例',
                    articleTitle:'我在魔篇有了自己的专栏！',
                    articleCoverUrl:utils.locate('resources/images/column.jpg'),
                    articleDate:'2017-10-19'
                },{
                    articleSign:'样例',
                    articleTitle:'魔篇使用帮助！',
                    articleCoverUrl:utils.locate('resources/images/help.jpg'),
                    articleDate:'2017-10-19'
                },{
                    articleSign:'样例',
                    articleTitle:'魔篇使用帮助！',
                    articleCoverUrl:utils.locate('resources/images/column.jpg'),
                    articleDate:'2017-10-19'
                },{
                    articleSign:'样例',
                    articleTitle:'魔篇使用帮助！',
                    articleCoverUrl:utils.locate('resources/images/help.jpg'),
                    articleDate:'2017-10-19'
                }],
            }
        },

        created:function () {
            utils.initIconFont();
            var _this = this;
//            获取用户信息
            GET('weex/member/attribute.jhtml',function (weex) {
                if(weex.type == 'success'){
                    if(!utils.isNull(weex.data.nickName)){
                        _this.userName = weex.data.nickName;
                    }
                    if(!utils.isNull(weex.data.logo)){
                        _this.imageUrl = weex.data.logo;
                    }
                }else{
                    event.toast(weex.content);
                }
            },function (err) {
                event.toast(err.content);
            })

//            获取文集列表
            this.getCorpus();


            let options = {
                type:'article',
                keyword:'',
                orderBy:'desc',
                current:_this.listCurrent,
                pageSize:_this.listPageSize,
            }
            event.findList(options,function (data) {
                if( data.type == "success" && data.data != '' ) {
                    data.data.forEach(function (item) {
//                        event.toast(item);
//                    将value json化
                        item.value = JSON.parse(item.value);
//                        把读取到的文章push进去文章列表
                        _this.articleList.push(item);
                    })
                }else{
                    return;
                }
            })
//            let option = {
//                type:'arcticle',//类型
//                keyword:'N',//关键址
//                orderBy:'desc',//"desc"降序 ,"asc"升序
//                current:'0', //当前有几页
//                pageSize:'10' //一页显示几行
//            }
//            event.findList(option,function (message) {
//                event.toast(message);
//                if(message.type == 'success' && message.data != ''){
//
//                }
//            })
        },
        methods: {
            getCorpus:function () {
                var _this = this;
                GET('weex/member/article_catalog/list.jhtml',function (data) {
                    if (data.type == "success") {
                        if(data.data == ''){
                        }else{
//                            event.toast(data.data);
                            _this.corpusList = '';
                            _this.corpusList =[{
                                name:'全部文章',
                                id:''
                            },{
                                name:'回收站',
                                id:'99'
                            }];
//                                将文集名循环插入数组中
                            for(let i = 0; i<data.data.length;i++){
                                _this.corpusList.splice(1 + i,0,data.data[i]);
                            }
                            storage.setItem('corpusList',data.data);
                        }
                    } else {
                        event.toast('文集');
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })

//                return stream.fetch({
//                    method: 'GET',
//                    type: 'json',
//                    url: 'weex/member/article_catalog/list.jhtml'
//                }, function (data) {
//                    if (data.data.type == "success") {
//                        if(data.data == ''){
//                        }else{
////                            event.toast(data.data);
//                            _this.corpusList = '';
//                            _this.corpusList =[{
//                                name:'全部文章',
//                                id:''
//                            },{
//                                name:'回收站',
//                                id:'99'
//                            }];
////                                将文集名循环插入数组中
//                            for(let i = 0; i<data.data.data.length;i++){
//                                _this.corpusList.splice(1 + i,0,data.data.data[i]);
//                            }
//                            storage.setItem('corpusList',data.data.data);
//                        }
//                    } else {
//                        event.toast(data);
//                    }
////                    event.toast(data);
//                },)




//                GET('weex/member/article_catalog/list.jhtml','',
//                    function (data) {
//                        if (data.type == "success") {
//                            if(data.data == ''){
//                            }else{
//                                _this.corpusList = '';
//                                _this.corpusList =[{
//                                    name:'全部文章',
//                                    id:''
//                                },{
//                                    name:'回收站',
//                                    id:'99'
//                                }];
////                                将文集名循环插入数组中
//                                for(let i = 0; i<data.data.length;i++){
//                                    _this.corpusList.splice(1 + i,0,data.data[i]);
//                                }
//                                storage.setItem('corpusList',data.data);
//                            }
//                        } else {
//                            event.toast(data);
//                        }
//                    },function(err) {
//                        event.toast("网络不稳定")
//                    })



            },
            jumpEditor:function (id) {
                event.toast('跳转编辑');
                var _this = this;
                event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + id),function (message) {
//                    _this.updateArticle();
                });

//                event.openURL('http://192.168.2.157:8081/editor.weex.js?articleId=' + id,function () {
////                    _this.updateArticle();
//                })
            },
            jumpDelete:function () {
                event.toast('文章删除');
            },
            jumpTop:function () {
                event.toast('文章置顶');
            },
            jumpCorpus:function () {
                event.toast('跳转文集');
            },
//            open (callback) {
//                return stream.fetch({
//                    method: 'GET',
//                    type: 'json',
//                    url: 'weex/member/article/list.jhtml'
//                }, callback)
//            },
//            switchArticle:function (item) {
//                if(this.whichCorpus == item || this.whichCorpus == '全部文章'){
//                    return true;
//                }else{
//                    return false;
//                }
//                if(this.isAllArticle == false){
//                    if(item.articleSign == '已删除'){
//                        return true;
//                    }else{
//                        return false;
//                    }
//                }else{
//                    return true;
//                }
//            },
//            前往文章
            goArticle(id){
                var _this = this;
//                event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + id),function (message) {
////                    _this.updateArticle();
//                });
                event.openURL('http://192.168.2.157:8081/editor.weex.js?articleId=' + id,function () {
//                    _this.updateArticle();
                })
            },
//            updateArticle(){
//                var _this = this;
////            获取文章缓存。
//                event.findList(1,'articleListTest1','desc',function (data) {
////                    modal.toast({message:data.data});
//                    if(data.type == 'success'){
//                        for(let i = 0;i < data.data.length;i++){
//                            let articleData = JSON.parse(data.data[i].value);
//                            _this.articleList.splice(0,0,{
//                                articleSign: '草稿',
//                                articleTitle:   articleData[0].title,
//                                articleCoverUrl:  articleData[0].thumbnail,
//                                articleDate: '2017-09-23',
//                                browse: 0,
//                                praise: 0,
//                                comments: 0,
//                                id:articleData[0].id,
//                            })
//                        }
//                    }else{
//                        modal.alert({
//                            message: data.content,
//                            duration: 0.3
//                        })
//                    }
//                })
//            },
//            toPage: function(url){
////                event.pageTo(url, false);
//                event.wxConfig(function (data) {
//                    event.showToast(data.color);
//                });
//            },
            jump:function (vueName) {
                event.toast('will jump');
            },
            corpusChange:function(index,id){
//                event.toast(id);
                var _this = this;
                _this.whichCorpus = index;
//                if(this.isAllArticle == true){
//
//                }else{
//                    this.isAllArticle = true;
//                    recycleScroll = scrollTop;
//                    setTimeout(function () {
//
//                        if(allArticleScroll > 424){
//                            let listHeight = allArticleScroll - 424;
//                            let positionIndex =parseInt( listHeight / 457);
//                            let offsetLength = - listHeight % 457;
//                            modal.toast({message:"positionIndex" + positionIndex + "offsetLength" + offsetLength})
//                            const el = _this.$refs.animationRef[positionIndex]//跳转到相应的cell
//                            dom.scrollToElement(el, {
//                                animated:false,
//                                offset:  -80 - offsetLength
//
//                            })
//                        }
//                    },50)
//                }

            },
            //废弃
//            recycleSite:function(){
//                var _this = this;
//                if(this.isAllArticle == false){
//                    modal.toast({message:"相等"})
//                }else{
//                    this.isAllArticle = false;
//                    allArticleScroll = scrollTop;
//                    setTimeout(function () {
//
//                        if(recycleScroll > 424){
//                            let listHeight = recycleScroll - 424;
//                            let positionIndex =parseInt( listHeight / 457);
//                            let offsetLength = - listHeight % 457;
//                            modal.toast({message:"positionIndex" + positionIndex + "offsetLength" + offsetLength})
//                            const el = _this.$refs.animationRef[positionIndex]//跳转到相应的cell
//                            dom.scrollToElement(el, {
//                                animated:false,
//                                offset:  -80 - offsetLength
//                            })
//                        }
//                    },50)
//                }
//
//            },
            swipeHappen:function(event){
                console.log(event);
//                console.log(event.direction);
//                if(event.direction == 'left'){
//                    this.isAllArticle = false;
//                }else if(event.direction == 'right'){
//                    this.isAllArticle = true;
//                }
            },
//            点击屏幕时
            ontouchstart:function (event,index) {
                var _this = this;
                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                }else{
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    })
                }
//                获取当前点击的元素。
                animationPara =  event.currentTarget;
            },
//            移动时
            onpanmove:function (event,index) {
                var _this = this;
                if(event.direction == 'right'){
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }else if(event.direction == 'left'){
                    _this.canScroll = false;
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-330)',
                        },
                        duration:350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }
            },
            onpanend:function (event) {
            },
            onloading(e) {
                var _this = this;
                modal.toast({message: '加载中...', duration: 1})
                this.showLoading = 'show'
                setTimeout(() => {
                    _this.listCurrent = _this.listCurrent + 10;
                    _this.listPageSize = _this.listPageSize + 10;
                    let options = {
                        type:'article',
                        keyword:'',
                        orderBy:'desc',
                        current:_this.listCurrent ,
                        pageSize:_this.listPageSize,
                    }
                    event.findList(options,function (data) {
                        if( data.type == "success" && data.data != '' ) {
                            data.data.forEach(function (item) {
//                        event.toast(item);
//                    将value json化
                                item.value = JSON.parse(item.value);
//                        把读取到的文章push进去文章列表
                                _this.articleList.push(item);
                            })
                        }else{
                            event.toast('缓存' + data.content);
                        }
                    })

                    this.showLoading = 'hide'
                }, 1500)
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
//            ondisappear(){
//              modal.toast({message:'消失',duration:1});
////                    this.corpusScrollTop = 0;
//                    this.corpusPosition = 'fixed';
//                    this.isDisappear = true;
//            },
//            onappear(){
//                modal.toast({message:'显示',duration:1});
//                this.isDisappear = false;
//                this.corpusPosition = 'relative';
//            },
//            文集
            goCorpus(){
                var _this = this;
//                event.openURL('http://192.168.2.157:8081/corpus.weex.js?name=corpusList',function (message) {
                event.openURL(utils.locate('view/member/editor/corpus.js?name=corpusList'), function (data) {
                    _this.getCorpus();
                });
            },
//            个人信息
            goAttribute(){
                event.openURL(utils.locate('view/member/attribute.js'),
                    function (data) {
                        return ;
                    }
                );
            },
//            设置中心
            goManage(){
                event.openURL(utils.locate('view/member/manage.js'),
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
        }
    }
</script>





