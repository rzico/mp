<template>
    <div class="wrapper">
        <!--此处div 不能注释...否则ios某些机型无法置顶-->
        <div >
            <!--顶部白色区域 classHeader(), -->
            <div class="header headerMore bkg-primary" :style="{opacity: opacityNum}" :class="[classHeader(),opacityNum == 0 ? 'novisible' : 'isvisible']" >
                <!--顶部导航-->
                <div class="nav nw" >
                    <div style="width: 50px;">
                    </div>
                    <!--导航栏名字头像-->
                    <div class="userBox"  @click="goAttribute()" v-if="settingColor == 'white'" >
                        <image class="headImg" :src="imageUrl"></image>
                        <text class="navText" >{{userName | watchNickName}}</text>
                    </div>
                    <div style="width: 50px;">
                    </div>
                </div>
            </div>
            <!--导航栏设置-->
            <div  class=" rightTop " :class="[classTop()]" @click="goManage()">
                <!--<text  :style="{fontFamily:'iconfont',color:settingColor}" style="font-size:50px;">&#xe62d;</text>-->
                <text  :style="{fontFamily:'iconfont'}" style="font-size:50px;color: #fff">&#xe62d;</text>
            </div>
            <!--绑定动画-->
            <!--只能多写一个顶部栏。否则无法适应-->
            <div  class="corpusBox hideCorpus" :class="[hideCorpus(),twoTop ? 'isvisible' : 'novisible']">
                <scroller scroll-direction="horizontal" class="corpusScroll ">
                    <div class="articleClass">
                        <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
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
        <scroller  show-scrollbar="false"  offset-accuracy="0"  ref="scrollerRef"  @loadmore="onloading" loadmoreoffset="2000" @scroll="scrollHandler" :scrollable="canScroll">
            <!--判断是否到顶部，关闭那个顶部导航栏显示效果-->
            <div style="position:absolute;top: 0;width: 1px;height: 1px;opacity: 0;"  @appear="toponappear"></div>
            <!--顶部个人信息栏-->
            <div class="topBox bkg-primary"  :class="[headerInfo()]" ref='topBox'>
                <!--背景图片-->
                <image class="backgroundImage" :class="[headerBgImg()]"  :src="bgImgUrl"></image>
                <!--遮罩层-->
                <!--<image class="backgroundMask" :src="maskUrl"></image>-->
                <div class="topHead" >
                    <!--用户头像-->
                    <image class="testImage" :src="imageUrl" ></image>
                    <!--个性签名 用户昵称-->
                    <div style="align-items: center;padding-bottom:20px" @click="goAttribute()" >
                        <!--用户昵称-->
                        <text class="userName">{{userName}}</text>
                        <!--用户签名-->
                        <text class="userSign">{{userSign}}</text>
                    </div>
                </div>
                <!--功能按钮-->
                <div class="topBtnBox">
                    <div class="topBtnSmallBox " :style="{minWidth:topMWidth + 'px'}" @click="goCollect()">
                        <text class="topBtn topBtnBigFont">{{collectNum}}</text>
                        <text class=" topBtn " >收藏</text>
                    </div>
                    <div class="topBtnSmallBox walletLayout"  @click="goWallet()">
                        <!--钱包两边的白色边框-->
                        <div  class="leftBtnBorder topBtnBorder" ></div>
                        <div  class="rightBtnBorder topBtnBorder" ></div>
                        <div class="moneyFormat">
                            <text class="topBtn topMoneySize" v-if="moneyNum != 0">¥</text>
                            <text class="topBtn topBtnBigFont">{{moneyNum | currencyfmt}}</text>
                        </div>
                        <text class="topBtn" >钱包</text>
                    </div>
                    <div class="topBtnSmallBox"  :style="{minWidth:topMWidth + 'px'}"   @click="goFocus()">
                        <text class="topBtn topBtnBigFont">{{focusNum}}</text>
                        <text class="topBtn">关注</text>
                    </div>
                </div>

            </div>
            <div>
                <div  class="corpusBox" >
                    <scroller scroll-direction="horizontal"  class="corpusScroll">
                        <div class="articleClass">
                            <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>

                        </div>
                    </scroller>
                    <div class="corpusIconBox" @click="goCorpus()"  >
                        <text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>
                    </div>
                </div>
                <!--文章模块-->
                <div :style="{minHeight:screenHeight + 'px'}" >
                    <!--绑定动画-->
                    <div class="articleBox"  v-for="(item,index) in articleList" :key="index" @click="goArticle(item,index)" @touchstart="ontouchstart($event,index)" @swipe="onpanmove($event,index)">
                        <!--<div class="articleBox" v-for="item in articleList" @click="goArticle(item.id)" @swipe="swipeHappen($event)"> @panmove="onpanmove($event,index)"-->
                        <div class="atricleHead" >
                            <!--<text class="articleSign">{{item.articleSign}}</text>-->
                            <text class="articleSign" :class="[item.sort.substring(0,1) == '1' ? 'bd-primary' : ' ',item.sort.substring(0,1) == '1' ? 'primary' : ' ']">{{item | watchWho}}</text>
                            <text class="articleTitle">{{item.value.title}}</text>
                        </div>
                        <!--文章封面-->
                        <div style="position: relative">
                            <image :src="item.value.thumbnail | watchThumbnail" resize="cover" class="articleCover"></image>
                        </div>
                        <div class="categoryBox">
                            <text class="categoryText">{{item.value.articleOption.articleCategory.name | watchCatetory}}</text>
                        </div>
                        <!--文章底部-->
                        <div class="articleFoot">
                            <div>
                                <!--<text class="articleDate">{{item.articleDate}}</text>-->
                                <text class="articleDate"v-if="item.value.articleOption.articleCatalog.id != '99'">{{item.sort.substring(2) | timeDatefmt}}</text>
                                <text class="articleDate" v-else>{{item.value.modifyDate | timeDatefmt}}</text>
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
                        <div class="rightHidden" v-if="item.value.articleOption.articleCatalog.id != '99'">
                            <div class="rightHiddenSmallBox">
                                <div class="rightHiddenIconBox" @click="jumpEditor(item.key)">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                                    <text class="rightHiddenText">编辑</text>
                                </div>
                                <div class="rightHiddenIconBox" @click="jumpDelete(item,index)">
                                    <text class="rightHiddenIcon redColor" :style="{fontFamily:'iconfont'}" >&#xe652;</text>
                                    <text class="rightHiddenText redColor" >删除</text>
                                </div>
                            </div>
                            <div class="rightHiddenSmallBox">
                                <div class="rightHiddenIconBox"  @click="jumpTop(item,index)">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe61c;</text>
                                    <text class="rightHiddenText" v-if="item.sort.substring(0,1) != '1'">置顶</text>
                                    <text class="rightHiddenText" v-else>取消置顶</text>
                                </div>
                                <div class="rightHiddenIconBox" @click="jumpCorpus(item)">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                                    <text class="rightHiddenText">文集</text>
                                </div>
                            </div>
                        </div>
                        <!--右侧隐藏栏-->
                        <div class="rightHidden" v-else>
                            <div class="rightHiddenSmallBox">
                                <div class="rightHiddenIconBox" @click="jumpDelAll(item,index)">
                                    <text class="rightHiddenIcon redColor" :style="{fontFamily:'iconfont'}" >&#xe652;</text>
                                    <text class="rightHiddenText redColor" >彻底删除</text>
                                </div>
                            </div>
                            <div class="rightHiddenSmallBox">
                                <div class="rightHiddenIconBox" @click="jumpRestore(item,index)">
                                    <text class="rightHiddenIcon" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                                    <text class="rightHiddenText">恢复</text>
                                </div>
                            </div>
                        </div>
                    </div>

                    <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
                    <!--帮助使用文章-->
                    <div class="articleBox" v-for="item in helpList" v-if="corpusId == '' && articleList.length < 10" @click="goHelpArticle(item.key)">
                        <div class="atricleHead">
                            <text class="articleSign">{{item.articleSign}}</text>
                            <text class="articleTitle">{{item.articleTitle}}</text>
                        </div>
                        <!--文章封面-->
                        <div>
                            <image :src="item.articleCoverUrl | watchCatetory" class="articleCover"></image>
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
        </scroller>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style scoped >
    .hideCorpus{
        top: 136px;position: fixed;
    }
    .rightTop{
        position: fixed;
        top: 44px;
        right: 0;
        /*width: 110px;*/
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .categoryBox{
        position: absolute;background-color: rgba(136,136,136,0.1);left: 650px;bottom: 100px;border-radius: 5px;padding-right: 3px;padding-left: 3px;padding-top: 3px;padding-bottom: 3px;
    }
    .categoryText{
        color: #fff;
        font-size: 28px;
    }
    .moneyFormat{
        flex-direction: row;justify-content: center;
    }
    .corpusScroll{
        flex-direction: row;width: 650px;
        background-color: #fff;
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
        color:#fff;
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
        /*background-color: #fff;*/
        top: 0px;
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
    /*.rightHiddenIcon:active{*/
    /*background-color: #ccc;*/
    /*}*/
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
        height:533px ;
        /*height:457px ;*/
        /*height:502px ;*/
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
        /*height: 300px;*/
        height: 345px;
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
        width:600px;
        font-size: 36px;
        margin-left: 10px;
    }
    .articleSign {
        border-radius: 10px;
        padding: 5px;
        color: #888;
        font-size: 24px;
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
    .pageBgColor{
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
        /*border-bottom-width: 1px;*/
        /*border-style: solid;*/
        /*border-color: gainsboro;*/
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
        /*filter: blur(4px);*/
        /*opacity: 1;*/
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
        margin-top: 10px;
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
        min-width: 166px;
        max-width: 260px;
        flex-shrink:0;
        padding-left:30px;
        padding-right: 30px;
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
    import {dom,event,storage,stream,animation} from '../../weex.js';
    const modal = weex.requireModule('modal');
    var globalEvent = weex.requireModule('globalEvent');
    import noData from '../../include/noData.vue';
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    var animationPara;//执行动画的文章
    var scrollTop = 0;
    export default {
        data:function() {
            return{
                topMWidth:166,
                settingColor:'',
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
                fontName: '&#xe685;',
                collectNum:0,
                moneyNum:0,
                focusNum:0,
                imageUrl:utils.locate('resources/images/background.png'),
                bgImgUrl:utils.locate('resources/images/background.png'),
//                maskUrl:utils.locate('resources/images/frosted.png'),
//                id:'334',
                showLoading: 'hide',
//                imageUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                corpusList:[{
                    name:'全部',
                    id:''
                },{
                    name:'回收站',
                    id:'99'
                }],
                listCurrent:0,
                listPageSize:10,
//                文章==================
                articleList: [],

                helpList:[],
                UId:'',
                screenHeight:0,
//                文集id
                corpusId:'',
                showMenu:false,
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                clicked:false,
            }
        },
        components: {
            noData
        },
        props:{
            noDataHint:{default:'暂无文章'}
        },
        filters:{
            watchWho:function (value) {
                if(value.sort.substring(0,1) == '1'){
                    return '置顶';
                }
                if(value.value.isDraft){
                    return '草稿';
                }
                if(value.value.articleOption.articleCatalog.id == '99'){
                    return '已删除';
                }
                if(value.value.articleOption.isPublish == 'false' || !value.value.articleOption.isPublish){
                    return '私密';
                }
                switch (value.value.articleOption.authority){
                    case 'isPublic' ://公开
                        return '公开';
                        break;
                    case 'isShare' ://不公开
                        return '不公开';
                        break;
                    case 'isEncrypt' ://加密
                        return '加密';
                        break;
                    case 'isPrivate' ://私密
                        return '私密';
                        break;
                    case 'draft'://草稿
                        return '草稿';
                        break;
                    default:
                        return '公开';
                        break;
                }
            },
            watchCatetory:function (value) {
                if(utils.isNull(value)){
                    return '生活';
                }else{
                    return value;
                }
            },
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,690,345);
            },
            watchNickName:function (value) {
                if(utils.isNull(value)){
                    return 'author';
                }else{
                    //              如果用户名称过长，便截取拼成名字
                    return utils.changeStrLast(value,5);
                }
            }
        },
        created:function () {
            let _this = this;
            utils.initIconFont();
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(316);
            this.UId = event.getUId();
//           获取用户信息;
            this.updateUserInfo();
//            获取文集列表
            this.getCorpus();


            this.getAllArticle();
//            监听文章的变化。
            globalEvent.addEventListener("onArticleChange", function (e) {
                _this.listCurrent = 0;
                _this.getAllArticle();
            });
//            监听用户信息的变化。
            globalEvent.addEventListener("onUserInfoChange", function (e) {
                _this.updateUserInfo();
            });
//            监听账单消息提醒.
            globalEvent.addEventListener("onMessage", function (e) {
                if(!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10201'){
                    _this.updateUserInfo();
                }
            });

        },

////        dom呈现完执行滚动一下
//        updated(){
////            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
//            if(this.hadUpdate){
//                return;
//            }
//            this.hadUpdate = true;
////            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
//            if(!utils.isIosSystem()){
//                const el = this.$refs.topBox//跳转到相应的cell
//                dom.scrollToElement(el, {
//                    offset: -119
//                })
//            }
//        },
        methods: {

            isEmpty:function () {
                return this.articleList.length==0 && this.corpusId != '';
//                return this.articleList.length==0 ;
            },
            //            监听设备型号,控制隐藏的文集高度
            hideCorpus:function () {
                let dc = utils.hideCorpus();
                return dc;
            },
//            监听设备型号,控制顶部人物信息栏背景图大小
            headerBgImg:function () {
                let dc = utils.addBgImg();
                return dc;
            },
//            监听设备型号,控制顶部人物信息栏
            headerInfo:function () {
                let dc = utils.addInfo();
                return dc;
            },
//            监听设备型号,控制导航栏设置 返回按钮
            classTop:function () {
                let dc = utils.addTop();
                return dc;
            },
//            监听设备型号,控制导航栏高度
            classHeader:function () {
                let dc = utils.device();
                return dc;
            },


            getAllArticle(){
                this.articleList = [];
                var articleClass = '';
                if(!utils.isNull(this.corpusId)){
                    articleClass = '['+this.corpusId + ']';
                }
                let _this = this;
                let options = {
                    type:'article',
                    keyword:articleClass,
                    orderBy:'desc',
                    current:_this.listCurrent,
                    pageSize:_this.listPageSize,
                };
                event.findList(options,function (data) {
                    if( data.type == "success" && data.data != '' ) {
                        data.data.forEach(function (item) {
//                    将value json化

                            item.value = JSON.parse(item.value);
//                            将封面转为缩略图
//                            item.value.thumbnail = utils.thumbnail(item.value.thumbnail,690,345);


//                          在全部文章里过滤掉已删除的文章
                            if(utils.isNull(_this.corpusId) && item.value.articleOption.articleCatalog.id == 99){
                            }else{
                                //                              把读取到的文章push进去文章列表
                                _this.articleList.push(item);
                            }

                        })
//                        当选择全部文章并且全部文章低于10篇时 显示帮助文档。写在这边可以避免渲染小闪屏问题。写死在data里每次切换会先闪一下帮助List再变成文章List
                        if(utils.isNull(_this.corpusId) && data.data.length < 10){
                            _this.helpList = [];//在push前要清空list
                            _this.helpList.push(
                                {
                                key:2,
                                articleSign:'样例',
                                articleTitle:'如何开通专栏',
                                articleCoverUrl:utils.locate('resources/images/column.jpg'),
                                articleDate:'2017-10-19'
                            },
                                {
                                key:1,
                                articleSign:'样例',
                                articleTitle:'新手使用帮助！',
                                articleCoverUrl:utils.locate('resources/images/help.jpg'),
                                articleDate:'2017-10-19'
                            })
                        }
                        _this.listCurrent = _this.listCurrent + _this.listPageSize;
                    }else{
                        if(utils.isNull(_this.corpusId)){
                            _this.helpList = [];
                            _this.helpList.push(
                                {
                                key:2,
                                articleSign:'样例',
                                articleTitle:'如何开通专栏',
                                articleCoverUrl:utils.locate('resources/images/column.jpg'),
                                articleDate:'2017-10-19'
                            },
                          {
                                key:1,
                                articleSign:'样例',
                                articleTitle:'新手使用帮助！',
                                articleCoverUrl:utils.locate('resources/images/help.jpg'),
                                articleDate:'2017-10-19'
                            })
                        }
                        return;
                    }
                })
            },
//            更新用户信息；
            updateUserInfo(){
                let _this = this;
//            获取用户信息
                GET('weex/member/view.jhtml',function (data) {
                    if(data.type == 'success'){
                        if(!utils.isNull(data.data.nickName)){
                            _this.userName = data.data.nickName;
                        }
                        if(!utils.isNull(data.data.logo)){
                            _this.imageUrl = data.data.logo;
                        }
                        if(!utils.isNull(data.data.autograph)){
                            _this.userSign = data.data.autograph;
                        }
                        _this.collectNum = data.data.favorite;
                        _this.focusNum = data.data.follow;
                        _this.moneyNum = data.data.balance;
//                        动态控制收藏与关注的宽度
                        let a = _this.moneyNum + '';
                        if(utils.getLength(a) > 5){
                            _this.topMWidth = 119;
                        }
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            获取文集
            getCorpus:function () {
                var _this = this;
                GET('weex/member/article_catalog/list.jhtml',function (data) {
                    if (data.type == "success") {
                        if(data.data == ''){
                        }else{
//                            event.toast(data.data);
                            _this.corpusList = '';
                            _this.corpusList =[{
                                name:'全部',
                                id:''
                            },{
                                name:'回收站',
                                id:'99'
                            }];
//                                将文集名循环插入数组中
                            for(let i = 0; i<data.data.length;i++){
                                _this.corpusList.splice(1 + i,0,data.data[i]);
                            }
                            data.data = JSON.stringify(data.data);
                            storage.setItem('corpusList',data.data);
                        }
                    }else {
//                        event.toast('文集');
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            jumpEditor:function (id) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + id),function (message) {
                    _this.clicked = false;
//                    _this.updateArticle();
                });

//                event.openURL('http://192.168.2.157:8081/editor.weex.js?articleId=' + id,function () {
////                    _this.updateArticle();
//                })
            },
//            右侧隐藏栏里跳转文集
            jumpCorpus:function (item) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/editor/chooseCorpus.js?corpusId=' + item.value.articleOption.articleCatalog.id + '&articleId=' + item.key),
//                event.openURL('http://192.168.2.157:8081/chooseCorpus.weex.js?corpusId=' + item.value.articleOption.articleCatalog.id,
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            item.value.articleOption.articleCatalog.id = data.data.corpusId;
                            item.value.articleOption.articleCatalog.name = data.data.corpusName;1
                            item.value.articleOption.articleCatalog.count = data.data.count;
                            let resDataStr = JSON.stringify(item.value);
                            let saveData = {
                                type:item.type,
                                key:item.key,
                                value:resDataStr,
                                sort:item.sort,
                                keyword:',['+ data.data.corpusId + '],' + item.title + ','
                            }
//                            event.toast(saveData);
//                1是置顶（默认倒序）  keyword ",[1],文章title,"
                            event.save(saveData,function(data) {
                                if (data.type == 'success') {
                                    event.toast('设置成功');
                                } else {
                                    event.toast(data.content);
                                }
                            })

                        }
                    }
                );
            },

//            前往文章
            goArticle(item,index){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
//                utils.debug(item);
                var _this = this;
                if(item.value.articleOption.articleCatalog.id == '99'){
                    event.openURL(utils.locate('view/article/delete.js?articleId=' + item.key),
                        function (data) {
                            _this.clicked = false;
                            if(data.type == 'success'){
                                if(data.data == 'restore'){
                                    _this.jumpRestore(item,index);
                                }else if(data.data == 'delete'){
                                    _this.deleteAfter(item,index);
                                }
                            }
                        })
                }else if(item.value.isDraft){
                    event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + item.key),
//                    event.openURL('http://192.168.2.157:8081/editor.weex.js?articleId=' + id,
                        function () {
                            _this.clicked = false;
//                    _this.updateArticle();
                        })
                }else{
//                    utils.debug('view/article/preview.js?articleId=' + item.key  + '&publish=' + item.value.articleOption.isPublish);
                    event.openURL(utils.locate('view/article/preview.js?articleId=' + item.key  + '&publish=' + item.value.articleOption.isPublish ),
//                    event.openURL('http://192.168.2.157:8081/preview.weex.js?articleId=' + id + '&publish=' + publish,
                        function () {
                            _this.clicked = false;
//                    _this.updateArticle();
                        })
                }
            },
//            跳转帮助文章
            goHelpArticle(key){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if(key == 2){
                    event.openURL(utils.locate('view/member/guide/index.js'),
                        function () {
                            _this.clicked = false;
                        })
                }else {
                    event.openURL(utils.locate('view/article/preview.js?articleId=' + key + '&publish=true'),
//                    event.openURL('http://192.168.2.157:8081/preview.weex.js?articleId=' + id + '&publish=' + publish,
                        function () {
                            _this.clicked = false;
//                    _this.updateArticle();
                        })
                }
            },
            corpusChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
                _this.whichCorpus = index;
                _this.corpusId = id;
                _this.listCurrent = 0;
                _this.getAllArticle();
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
                var articleClass = '';
                if(!utils.isNull(this.corpusId)){
                    articleClass = '['+this.corpusId + ']';
                }
                this.showLoading = 'show'
                setTimeout(() => {
                    let options = {
                        type:'article',
                        keyword:articleClass,
                        orderBy:'desc',
                        current:_this.listCurrent ,
                        pageSize:_this.listPageSize,
                    }
                    event.findList(options,function (data) {
//                        utils.debug(data);
//                        utils.debug(_this.listCurrent);
                        if( data.type == "success" && data.data != '') {
                            data.data.forEach(function (item) {
//                        event.toast(item);
//                    将value json化
                                item.value = JSON.parse(item.value);
                                //                          在全部文章里过滤掉已删除的文章
                                if(utils.isNull(_this.corpusId) && item.value.articleOption.articleCatalog.id == 99){
                                }else{
                                    //                              把读取到的文章push进去文章列表
                                    _this.articleList.push(item);
                                }
                            })
                            _this.listCurrent = _this.listCurrent + _this.listPageSize;
//                            utils.debug('当前行:' + _this.listCurrent);
                        }else if( data.type == "success" && data.data == '' ){
//                            utils.debug('触发强制加载');
//                            _this.$refs.scrollerRef.resetLoadmore();
                        }else{
                            event.toast(data.content);
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
//                    event.changeWindowsBar("true");
                    this.settingColor = 'white';
                }else{
                    this.settingColor = '';
//                    event.changeWindowsBar("false");
                }
                this.opacityNum = opacityDegree;
//                if(opacityDegree > 0.4){
//                    event.changeWindowsBar("true");
//                    this.settingColor = 'black';
//                }else{
//                    this.settingColor = 'white';
//                    event.changeWindowsBar("false");
//                }

//                if(scrollTop >=284){
                if(scrollTop >= 284){
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
            },
//            文集
            goCorpus(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/editor/corpus.js?name=corpusList'), function (data) {
                    _this.getCorpus();
                    _this.clicked = false;
                });
            },
//            个人信息
            goAttribute(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/attribute.js'),
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            if(!utils.isNull(data.data.logo)){
                                _this.imageUrl = data.data.logo;
                            }
                            if(!utils.isNull(data.data.nickName)){
                                _this.userName = data.data.nickName;
                            }
                            if(!utils.isNull(data.data.autograph)){
                                _this.userSign = data.data.autograph;
                            }
                        }else{
//                            return ;
                        }
                    }
                );
            },
//            设置中心
            goManage(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/manage.js'),
                    function (data) {
                        _this.clicked = false;
//                    utils.debug(data)
                        if(data.type == 'success' && data.data != ''){
                            if(!utils.isNull(data.data.occupation)){
                                _this.imageUrl = data.data.occupation;
                            }
                            if(!utils.isNull(data.data.nickName)){
                                _this.userName = data.data.nickName;
                            }
                            if(!utils.isNull(data.data.autograph)){
                                _this.userSign = data.data.autograph;
                            }
                        }else{
//                            return ;
                        }
                    }
                );
            },
//            我的关注
            goFocus(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/focus.js?id=' + this.UId),
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            _this.updateUserInfo();
                        }else {
                            return ;
                        }
                    }
                );
            },
//            我的收藏
            goCollect(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/collect.js?id=' + this.UId),
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            _this.updateUserInfo();
                        }else{
                            return ;
                        }
                    }
                );
            },
//            钱包
            goWallet(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/wallet/index.js'),
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            _this.updateUserInfo();
                        }else{
                            return ;
                        }
                    }
                );
            },
//            快速滑动滚动条时， 控制顶部导航栏消失
            toponappear(){
                this.opacityNum = 0 ;
//                this.settingColor = 'white';
                this.settingColor = '';
//                event.changeWindowsBar("false");
            },
//            onrefresh:function () {
//                var _this = this;
//                _this.refreshing = true;
//                animation.transition(_this.$refs.refreshImg, {
//                    styles: {
//                        transform: 'rotate(360deg)',
//                    },
//                    duration: 1000, //ms
//                    timingFunction: 'linear',//350 duration配合这个效果目前较好
//                    needLayout:false,
//                    delay: 0 //ms
//                });
//                setTimeout(() => {
//                    animation.transition(_this.$refs.refreshImg, {
//                        styles: {
//                            transform: 'rotate(0)',
//                        },
//                        duration: 10, //ms
//                        timingFunction: 'linear',//350 duration配合这个效果目前较好
//                        needLayout:false,
//                        delay: 0 //ms
//                    })
//                    _this.refreshing = false
//                    _this.getAllArticle();
//                }, 1000);
//            },
//            还原
            jumpRestore(item,index){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                POST('weex/member/article/revert.jhtml?articleId=' + item.value.id).then(
                    function(e){
                        if(e.type == 'success'){
                            //            获取当前时间戳 作为唯一标识符key
                            let timestamp = Math.round(new Date().getTime()/1000);
                            item.value.articleOption.articleCatalog.id = null;
                            item.value.articleOption.articleCatalog.name = null;
                            let saveData = {
                                type:item.type,
                                key:item.key,
                                value:JSON.stringify(item.value),
                                sort:'0,' + timestamp,
                                keyword:',[],' + item.value.title + ','
                            }
                            event.save(saveData,function(data){
                                if(data.type == 'success'){
                                    if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                                    }else{
                                        animation.transition(animationPara, {
                                            styles: {
                                                transform: 'translateX(0)',
                                            },
                                            duration: 10, //ms
                                            timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                            needLayout:false,
                                            delay: 0 //ms
                                        })
                                    }
                                    _this.articleList.splice(index,1);
//                                    如果是在全部的文章里，就要立即把文章重新显示；(直接将数据插入而不是重新读取的 会少一个缓存的id字段。不过在该页面没有关系)
                                    if(_this.whichCorpus == 0){
                                        _this.articleList.splice(0,0,saveData);
                                    }
                                }else{
                                    event.toast(data.content);
                                }
                            })
                        }else{
                            event.toast(e.content);
                        }
                        _this.clicked = false;
                    },
                    function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )
            },
//            删除文章
            jumpDelete:function (item,index) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if(item.value.isDraft){
                    _this.deleteAfter(item,index);
                    _this.clicked = false;
                    return;
                }
                POST('weex/member/article/delete.jhtml?articleId=' + item.value.id).then(
                    function(e){
                        if(e.type == 'success'){
                            item.value.articleOption.articleCatalog.id = 99;
                            item.value.articleOption.articleCatalog.name = '回收站';
                            let saveData = {
                                type:item.type,
                                key:item.key,
                                value:item.value,
                                sort:'0,0000000000',
                                keyword:',[99],' + item.value.title + ','
                            }
                            event.save(saveData,function(data){
                                if(data.type == 'success'){
                                    if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                                    }else{
                                        animation.transition(animationPara, {
                                            styles: {
                                                transform: 'translateX(0)',
                                            },
                                            duration: 10, //ms
                                            timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                            needLayout:false,
                                            delay: 0 //ms
                                        })
                                    }
                                    event.toast('删除成功');
                                    _this.articleList.splice(index,1);

                                }else{
                                    event.toast(data.content);
                                }
                            })
                        }else{
                            event.toast(e.content);
                        }
                        _this.clicked = false;
                    },
                    function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )
            },
//            彻底删除
            jumpDelAll:function(item,index){
                let _this = this;
                modal.confirm({
                    message: '彻底删除后将无法恢复',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        _this.deleteAfter(item,index);
                    }
                })
            },
//            彻底删除的删除逻辑
            deleteAfter(item,index){
                let _this =this;
                let option ={
                    type :item.type,
                    key:item.key
                }
                //            清除缓存
                event.delete(option,function(data){
                    if(data.type == 'success'){
                        //                            把动画收回来。
                        if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                        }else{
                            animation.transition(animationPara, {
                                styles: {
                                    transform: 'translateX(0)',
                                },
                                duration: 10, //ms
                                timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                needLayout:false,
                                delay: 0 //ms
                            })
                        }
                        _this.articleList.splice(index,1);
                    }else{
                        event.toast(data.content);
                    }
                })
            },
//            置顶
            jumpTop:function (item,index) {
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var saveSort;
                if(item.sort.substring(0,1) == '0'){
                    saveSort = '1,'+ item.sort.substring(2);
                    POST('weex/member/article/update.jhtml?id=' + item.key + '&isTop=true').then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.topLocal(saveSort,item,index);
                            }else{
                                _this.clicked = false;
                                event.toast(data.content);
                            }
                        },function (err) {
                            _this.clicked = false;
                            event.toast(err.content);
                            return;
                        }
                    )
                }else{
                    saveSort = '0,'+ item.sort.substring(2);
                    POST('weex/member/article/update.jhtml?id=' + item.key + '&isTop=false').then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.topLocal(saveSort,item,index);
                            }else{
                                _this.clicked = false;
                                event.toast(data.content);
                            }
                        },function (err) {
                            _this.clicked = false;
                            event.toast(err.content);
                            return;
                        }
                    )
                }
//                event.toast('文章置顶');
            },
//            本地处理sort 置顶数据
            topLocal(saveSort,item,index){
                let _this = this;
                let saveData = {
                    type:item.type,
                    key:item.key,
                    value:JSON.stringify(item.value),
                    sort:saveSort,
                    keyword:',['+ item.value.articleOption.articleCatalog.id +'],' + item.value.title + ','
                }
                event.save(saveData,function(data){
                    if(data.type == 'success'){
                        let option = {
                            type:item.type,
                            key:item.key
                        }
                        event.find(option,function (e) {
                            if(e.type == 'success'){
//                                    把动画收回来
                                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                                }else{
                                    animation.transition(animationPara, {
                                        styles: {
                                            transform: 'translateX(0)',
                                        },
                                        duration: 10, //ms
                                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                        needLayout:false,
                                        delay: 0 //ms
                                    })
                                }
                                e.data.value = JSON.parse(e.data.value);
                                if(item.sort.substring(0,1) == '0'){
                                    _this.articleList.splice(index,1);
                                    _this.articleList.splice(0,0,e.data);
                                    event.toast('置顶成功');
                                }else{
//                                        _this.articleList.splice(index,1);
//                                        _this.articleList.splice(index,0,e.data);
                                    _this.getAllArticle();
                                    event.toast('取消成功');
                                }
                            }
                        })
                        _this.clicked = false;
                    }else{
                        _this.clicked = false;
                        event.toast(data.content);
                    }
                })
            },

//            触碰遮罩层
            maskTouch(){
                this.showMenu = false;
            },
        }
    }
</script>








