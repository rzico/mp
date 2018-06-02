<!-- 个人中心 -->
<template>
    <div class="wrapper" style="background-color: #f5f5f5">
        <!--此处div 不能注释...否则ios某些机型无法置顶-->
        <div>
            <!--顶部白色区域 classHeader(), -->
            <div class="header headerMore bkg-primary" :style="{opacity: opacityNum}" :class="[classHeader(),opacityNum == 0 ? 'novisible' : 'isvisible']">
                <!--顶部导航-->
                <div class="nav nw">
                    <div style="width: 50px;">
                    </div>
                    <!--导航栏名字头像-->
                    <div class="userBox" @click="goAttribute()" v-if="settingColor == 'white'">
                        <image class="headImg" :src="imageUrl"></image>
                        <text class="navText">{{userName | watchNickName}}</text>
                    </div>
                    <div style="width: 50px;">
                    </div>
                </div>
            </div>
            <!--导航栏设置-->
            <!--<div class=" rightTop " :class="[classTop()]" @click="goManage()">-->
            <!--<text :style="{fontFamily:'iconfont'}" style="font-size:50px;color: #fff">&#xe62d;</text>-->
            <!--</div>-->
            <!--绑定动画-->
            <!--只能多写一个顶部栏。否则无法适应-->
            <!--<div class="corpusBox hideCorpus" :class="[hideCorpus(),twoTop ? 'isvisible' : 'novisible']">-->
            <!--<scroller scroll-direction="horizontal" show-scrollbar="false" class="corpusScroll ">-->
            <!--<div class="articleClass">-->
            <!--<text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in corpusList" :class="[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>-->
            <!--</div>-->
            <!--</scroller>-->
            <!--<div class="corpusIconBox" @click="goCorpus()">-->
            <!--<text :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>-->
            <!--</div>-->
            <!--</div>-->
        </div>
        <scroller show-scrollbar="false" offset-accuracy="0" ref="scrollerRef" @loadmore="onloading" loadmoreoffset="2000" @scroll="scrollHandler" :scrollable="canScroll">
            <!--判断是否到顶部，关闭那个顶部导航栏显示效果-->
            <div style="position:absolute;top: 0;width: 1px;height: 1px;opacity: 0;" @appear="toponappear"></div>
            <!--顶部个人信息栏-->
            <div class="topBox bkg-primary" :class="[headerInfo()]" ref='topBox'>
                <!--背景图片-->
                <image class="backgroundImage" :class="[headerBgImg()]" :src="bgImgUrl"></image>
                <!--遮罩层-->
                <!--<image class="backgroundMask" :src="maskUrl"></image>-->
                <div class="topHead">
                    <!--用户头像-->
                    <image class="testImage" :src="imageUrl"></image>
                    <!--个性签名 用户昵称-->
                    <div style="align-items: flex-start;padding-left:20px" @click="goAttribute()">
                        <!--用户昵称-->
                        <text class="userName">{{userName}}</text>
                        <!--用户签名-->
                        <text class="userSign">{{userSign}}</text>
                    </div>
                </div>
                <!--功能按钮-->
                <div class="topBtnBox">
                    <div class="topBtnSmallBox " :style="{minWidth:topMWidth + 'px'}" @click="goCoupon()">
                        <text class="topBtn topBtnBigFont">{{couponNum}}</text>
                        <text class=" topBtn ">优惠券</text>
                    </div>
                    <div class="topBtnSmallBox walletLayout" @click="goWallet()">
                        <div class="moneyFormat">
                            <text class="topBtn topMoneySize" v-if="moneyNum != 0">¥</text>
                            <text class="topBtn topBtnBigFont">{{moneyNum | currencyfmt}}</text>
                        </div>
                        <text class="topBtn">钱包</text>
                    </div>
                    <div class="topBtnSmallBox" :style="{minWidth:topMWidth + 'px'}" @click="goFocusTenants()">
                        <text class="topBtn topBtnBigFont">{{focusNum}}</text>
                        <text class="topBtn">店铺</text>
                    </div>
                    <div class="topBtnSmallBox" :style="{minWidth:topMWidth + 'px'}" @click="goCollectShops()">
                        <text class="topBtn topBtnBigFont">{{focusNum}}</text>
                        <text class="topBtn">商品</text>
                    </div>
                </div>
                <!--设置-->
                <div class="rightTop " :class="[classTop()]" @click="goManage()">
                    <text :style="{fontFamily:'iconfont'}" style="font-size:50px;color: #fff">&#xe62d;</text>
                </div>
                <!--购物车-->
                <div class="cartList" :class="[classTop()]" @click="goCartList()">
                    <text :style="{fontFamily:'iconfont'}" style="font-size:50px;color: #fff">&#xe62d;</text>
                </div>
            </div>
            <!-- 我的订单 -->
            <div style="background-color: #FFF">
                <div class="boder-bottom pl20 pr20 space-between headTitle" @click="goOrderList()">
                    <text class="title">我的订单</text>
                    <text class="sub_title" style="padding-right: 30px;">查看所有</text>
                    <text :style="{fontFamily:'iconfont'}" class="iconRight" style="font-size: 25px; color: #999">></text>
                </div>
                <!-- 订单消息 -->
                <div class="comWrap">
                    <div class="review flexCol" @click="goReview()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #cc0000">&#xe613;</text>
                        <text class="title mt20">待审核</text>
                        <text class="num" v-if="orderNum!==0">{{orderNum}}</text>
                    </div>
                    <div class="delivery flexCol" @click="goDelivery()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #cc0000">&#xe612;</text>
                        <text class="title mt20">待发货</text>
                        <text class="num">{{orderNum}}</text>
                    </div>
                    <div class="receive flexCol" @click="goReceive()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #cc0000">&#xe611;</text>
                        <text class="title mt20">待收货</text>
                        <text class="num">{{orderNum}}</text>
                    </div>
                    <div class="evaluation flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #cc0000">&#xe60c;</text>
                        <text class="title mt20">待评价</text>
                        <text class="num" v-if="orderNumS!==0">{{orderNumS}}</text>
                    </div>
                </div>
            </div>
            <!-- 我的文章 -->
            <div class="mt20" style="background-color: #FFF">
                <div class="boder-bottom pl20 pr20 space-between headTitle" @click="goOrderList()">
                    <text class="title">我的帖子</text>
                    <text class="sub_title" style="padding-right: 30px;">查看所有</text>
                    <text :style="{fontFamily:'iconfont'}" class="iconRight" style="font-size: 25px; color: #999">></text>
                </div>
                <!-- 文章列表 -->
                <div class="comWrap">
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #66ccff">&#xe60e;</text>
                        <text class="title mt20">写文章</text>
                    </div>
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #ff9999">&#xe60f;</text>
                        <text class="title mt20">我的帖子</text>
                    </div>
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #cc66cc">&#xe610;</text>
                        <text class="title mt20">收藏的帖子</text>
                    </div>
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #ff6666">&#xe60d;</text>
                        <text class="title mt20">点赞的帖子</text>
                    </div>
                </div>
            </div>
            <!-- 我的圈子 -->
            <!--<div class="mt20" style="background-color: #FFF">-->
            <!--<div class="boder-bottom pl20 pr20 space-between headTitle" @click="goCircleList()">-->
            <!--<text class="title">我的圈子</text>-->
            <!--<text class="sub_title" style="padding-right: 30px;">查看所有</text>-->
            <!--<text :style="{fontFamily:'iconfont'}" class="iconRight" style="font-size: 25px; color: #999">></text>-->
            <!--</div>-->
            <!--<div class="circleWrap">-->
            <!--<div class="cirlceList flexCol" @click="goEvaluation()">-->
            <!--<text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #e4e4e4">&#xe608;</text>-->
            <!--<text class="title mt20">创建圈子</text>-->
            <!--</div>-->
            <!--<div class="cirlceList flexCol" @click="goEvaluation()">-->
            <!--<image :src="circleImg" class="circleImg"></image>-->
            <!--<text class="title mt20">搞笑圈</text>-->
            <!--</div>-->
            <!--<div class="cirlceList flexCol" @click="goEvaluation()">-->
            <!--<image :src="circleImg" class="circleImg"></image>-->
            <!--<text class="title mt20">骑士圈</text>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!-- 必备工具 -->
            <div class="mt20" style="background-color: #FFF">
                <div class="boder-bottom pl20 pr20 space-between headTitle" @click="goOrderList()">
                    <text class="title">必备工具</text>
                </div>
                <!-- 帖子列表 -->
                <div class="comWrap">
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #66ccff">&#xe60a;</text>
                        <text class="title mt20">我要开店</text>
                    </div>
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #66ccff">&#xe609;</text>
                        <text class="title mt20">商品管理</text>
                    </div>
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #66ccff">&#xe60b;</text>
                        <text class="title mt20">订单管理</text>
                    </div>
                    <div class="post flexCol" @click="goEvaluation()">
                        <text :style="{fontFamily:'iconfont'}" style="font-size: 55px; color: #66ccff">...</text>
                        <text class="title mt20">更多功能</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .rightTop {
        position: absolute;
        top: 44px;
        right: 80px;
        /*width: 110px;*/
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .cartList {
        position: absolute;
        top: 44px;
        right: 20px;
        /*width: 110px;*/
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .categoryBox {
        position: absolute;
        background-color: rgba(136, 136, 136, 0.1);
        left: 650px;
        bottom: 100px;
        border-radius: 5px;
        padding-right: 3px;
        padding-left: 3px;
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .categoryText {
        color: #fff;
        font-size: 28px;
    }
    .moneyFormat {
        flex-direction: row;
        justify-content: center;
    }
    .corpusScroll {
        flex-direction: row;
        width: 650px;
        background-color: #fff;
    }
    .backgroundImage {
        position: absolute;
        width: 750px;
        top: 0;
        height: 420px;
        /*filter: blur(4px);*/
        /*opacity: 1;*/
        /*-moz-filter: blur(4px);*/
        /*-webkit-filter: blur(4px);*/
        /*-o-filter: blur(4px);*/
        /*-ms-filter: blur(4px);*/
        /*-webkit-backdrop-filter: blur(4px);*/
    }
    .corpusIconBox {
        width: 100px;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    .isvisible {
        opacity: 1;
        visibility: visible;
    }
    .novisible {
        opacity: 0;
        visibility: hidden;
    }
    .userBox {
        flex-direction: row;
        align-items: center;
    }
    .nw {
        width: 750px;
        padding-right: 30px;
        padding-left: 30px;
    }
    .headImg {
        height: 50px;
        width: 50px;
        border-radius: 25px;
    }
    .navText {
        padding-left: 10px;
        font-size: 33px;
        color: #fff;
    }
    .setTop {
        top: 136px;
    }
    .posFixed {
        position: fixed;
        background-color: red;
        top: 136px;
    }
    .posRelative {
        position: relative;
    }
    .posAbsolute {
        position: absolute;
        top: 50px;
        left: 20px;
    }
    .posAbsoluteBtn {
        position: absolute;
        top: 200px;
    }


    /*顶部导航栏*/

    .headerMore {
        position: fixed;
        /*background-color: #fff;*/
        top: 0px;
        border-bottom-width: 0px;
    }
    .topBox {
        position: relative;
        padding-top: 40px;
        height: 380px;
        background-color: black;
    }
    .topBtnBox {
        flex-direction: row;
        align-items: center;
        margin-top: 40px;
        width: 750px;
        justify-content: space-around;
    }
    .topBtnSmallBox {
        height: 80px;
        justify-content: center;
        align-items: center;
    }
    .walletLayout {
        min-width: 166px;
        max-width: 260px;
        flex-shrink: 0;
        padding-left: 30px;
        padding-right: 30px;
    }
    .topBtn {
        color: white;
        font-size: 24px;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .topMoneySize {
        font-weight: 400;
        font-size: 32px;
    }
    .topBtnBigFont {
        font-weight: 400;
        font-size: 38px;
    }
    .topHead {
        flex-direction: row;
        align-items: left;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        color: white;
    }
    .testImage {
        width: 120px;
        height: 120px;
        border-radius: 60px;
    }
    .userSign {
        lines: 1;
        text-overflow: ellipsis;
        width: 500px;
        font-size: 26px;
        color: white;
    }
    .userName {
        font-weight: 600;
        font-size: 32px;
        margin-top: 15px;
        margin-bottom: 15px;
        color: white;
    }
    .headTitle {
        height: 100px;
        line-height: 100px;
        position: relative;
    }
    .iconRight {
        position: absolute;
        right: 18px;
        top: 34px;
    }



    /*订单列表*/

    .comWrap {
        width: 750px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        flex-direction: row;
        justify-content: space-between;
    }
    .circleWrap {
        width: 750px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        flex-direction: row;
        justify-content: flex-start;
    }
    .cirlceList {
        margin-right: 40px;
    }
    .flexCol {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 140px;
    }
    .num {
        position: absolute;
        top: 0px;
        right: 0px;
        color: #ff0000;
        background-color: #fff;
        font-size: 24px;
        font-weight: bold;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 40px;
        border-color: #ff0000;
        border-left-style: solid;
        border-right-style: solid;
        border-top-style: solid;
        border-bottom-style: solid;
        border-left-width: 2px;
        border-right-width: 2px;
        border-top-width: 2px;
        border-bottom-width: 2px;
    }
    .circleImg {
        width: 58px;
        height: 58px;
        border-radius: 29px;
    }

</style>
<script>
    import { dom, event, storage, stream, animation } from '../../weex.js';
    const modal = weex.requireModule('modal');
    var globalEvent = weex.requireModule('globalEvent');
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    var animationPara; //执行动画的文章
    var scrollTop = 0;
    export default {
        data: function() {
            return {
                topMWidth: 166,
                settingColor: '',
                opacityNum: 0,
                twoTop: false,
                isDisappear: false,
                corpusScrollTop: 0,
                canScroll: true,
                userName: '余小笙',
                userSign: '东邪西毒--南帝北丐--中神通',
                whichCorpus: 0,
                isNoArticle: false,
                fontName: '&#xe685;',
                collectNum: 0,
                moneyNum: 0,
                focusNum: 0,
                couponNum: 0,
                orderNum: 999,
                orderNumS:0,
//                imageUrl: utils.locate('resources/images/background.png'),
                bgImgUrl: 'http://cdn.ahxinying.cn/weex/placeholder/bg.jpg',
                circleImg: utils.locate('resources/images/liveHeader.png'),
                showLoading: 'hide',
                imageUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                listCurrent: 0,
                listPageSize: 10,
            }
        },
        filters: {
            watchWho: function(value) {
                if (value.sort.substring(0, 1) == '1') {
                    return '置顶';
                }
                if (value.value.isDraft) {
                    return '草稿';
                }
                if (value.value.articleOption.articleCatalog.id == '99') {
                    return '已删除';
                }
                if (value.value.articleOption.isPublish == 'false' || !value.value.articleOption.isPublish) {
                    return '私密';
                }
                switch (value.value.articleOption.authority) {
                    case 'isPublic': //公开
                        return '公开';
                        break;
                    case 'isShare': //不公开
                        return '不公开';
                        break;
                    case 'isEncrypt': //加密
                        return '加密';
                        break;
                    case 'isPrivate': //私密
                        return '私密';
                        break;
                    case 'draft': //草稿
                        return '草稿';
                        break;
                    default:
                        return '公开';
                        break;
                }
            },
            watchCatetory: function(value) {
                if (utils.isNull(value)) {
                    return '生活';
                } else {
                    return value;
                }
            },
            watchThumbnail: function(value) {
                //                    没过滤前是原图
                return utils.thumbnail(value, 690, 345);
            },
            watchNickName: function(value) {
                if (utils.isNull(value)) {
                    return 'author';
                } else {
                    //              如果用户名称过长，便截取拼成名字
                    return utils.changeStrLast(value, 5);
                }
            }
        },
        created: function() {
            let _this = this;
            utils.initIconFont();
            //            获取屏幕的高度
            this.screenHeight = utils.fullScreen(216);
            this.UId = event.getUId();
            //           获取用户信息;
            this.updateUserInfo();
            //            监听用户信息的变化。
            globalEvent.addEventListener("onUserInfoChange", function(e) {
                _this.updateUserInfo();
            });
            //            监听账单消息提醒.
            globalEvent.addEventListener("onMessage", function(e) {
                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10201') {
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
            //            监听设备型号,控制隐藏的文集高度
            hideCorpus: function() {
                let dc = utils.hideCorpus();
                return dc;
            },
            //            监听设备型号,控制顶部人物信息栏背景图大小
            headerBgImg: function() {
                let dc = utils.addBgImg();
                return dc;
            },
            //            监听设备型号,控制顶部人物信息栏
            headerInfo: function() {
                let dc = utils.addInfo();
                return dc;
            },
            //            监听设备型号,控制导航栏设置 返回按钮
            classTop: function() {
                let dc = utils.addTop();
                return dc;
            },
            //            监听设备型号,控制导航栏高度
            classHeader: function() {
                let dc = utils.device();
                return dc;
            },
            //            更新用户信息；
            updateUserInfo() {
                let _this = this;
                //            获取用户信息
                GET('weex/member/view.jhtml', function(data) {
                    if (data.type == 'success') {
                        if (!utils.isNull(data.data.nickName)) {
                            _this.userName = data.data.nickName;
                        }
                        if (!utils.isNull(data.data.logo)) {
                            _this.imageUrl = data.data.logo;
                        }
                        if (!utils.isNull(data.data.autograph)) {
                            _this.userSign = data.data.autograph;
                        }
                        _this.collectNum = data.data.favorite;
                        _this.focusNum = data.data.follow;
                        _this.moneyNum = data.data.balance;
                        //                        动态控制收藏与关注的宽度
                        let a = _this.moneyNum + '';
                        if (utils.getLength(a) > 5) {
                            _this.topMWidth = 119;
                        }
                    } else {
                        event.toast(data.content);
                    }
                }, function(err) {
                    event.toast(err.content);
                })
            },
            jumpEditor: function(id) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + id), function(message) {
                    _this.clicked = false;
                    //                    _this.updateArticle();
                });
                //                event.openURL('http://192.168.2.157:8081/editor.weex.js?articleId=' + id,function () {
                ////                    _this.updateArticle();
                //                })
            },
            //            点击屏幕时
            ontouchstart: function(event, index) {
                var _this = this;
                if (animationPara == null || animationPara == '' || animationPara == 'undefinded') {} else {
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                        //                      timingFunction: 'ease-out',
                        needLayout: false,
                        delay: 0 //ms
                    })
                }
                //                获取当前点击的元素。
                animationPara = event.currentTarget;
            },
            //            移动时
            onpanmove: function(event, index) {
                var _this = this;
                if (event.direction == 'right') {
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                        //                      timingFunction: 'ease-out',
                        needLayout: false,
                        delay: 0 //ms
                    }, function() {
                        _this.canScroll = true;
                    })
                } else if (event.direction == 'left') {
                    _this.canScroll = false;
                    //                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-330)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                        //                      timingFunction: 'ease-out',
                        needLayout: false,
                        delay: 0 //ms
                    }, function() {
                        _this.canScroll = true;
                    })
                }
            },
            onpanend: function(event) {},
            onloading(e) {
                var _this = this;
                var articleClass = '';
                if (!utils.isNull(this.corpusId)) {
                    articleClass = '[' + this.corpusId + ']';
                }
                this.showLoading = 'show'
                setTimeout(() => {
                    let options = {
                        type: 'article',
                        keyword: articleClass,
                        orderBy: 'desc',
                        current: _this.listCurrent,
                        pageSize: _this.listPageSize,
                    }
                    event.findList(options, function(data) {
                        //                        utils.debug(data);
                        //                        utils.debug(_this.listCurrent);
                        if (data.type == "success" && data.data != '') {
                            data.data.forEach(function(item) {
                                //                        event.toast(item);
                                //                    将value json化
                                item.value = JSON.parse(item.value);
                                //                          在全部文章里过滤掉已删除的文章
                                if (utils.isNull(_this.corpusId) && item.value.articleOption.articleCatalog.id == 99) {} else {
                                    //                              把读取到的文章push进去文章列表
                                    _this.articleList.push(item);
                                }
                            })
                            _this.listCurrent = _this.listCurrent + _this.listPageSize;
                            //                            utils.debug('当前行:' + _this.listCurrent);
                        } else if (data.type == "success" && data.data == '') {
                            //                            utils.debug('触发强制加载');
                        } else {
                            event.toast(data.content);
                        }
                    })
                    _this.$refs.scrollerRef.resetLoadmore();
                    this.showLoading = 'hide'
                }, 1500)
            },
            scrollHandler: function(e) {
                var _this = this;
                //                this.offsetX = e.contentOffset.x;
                //                this.offsetY = e.contentOffset.y;
                if (e.contentOffset.y >= 0) {
                    return;
                }
                scrollTop = Math.abs(e.contentOffset.y);
                //                modal.toast({message:scrollTop});8
                let opacityDegree = Math.floor(scrollTop / 14) / 10;
                //                modal.toast({message:opacityDegree,duration:0.1});
                if (opacityDegree > 1) {
                    opacityDegree = 1;
                }
                if (opacityDegree > 0.4) {
                    //                    event.changeWindowsBar("true");
                    this.settingColor = 'white';
                } else {
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
                if (scrollTop >= 284) {
                    this.twoTop = true;
                    //                    this.corpusScrollTop = 136;
                    //                    this.corpusPosition = 'fixed';
                    //                    modal.toast({message:this.corpusPosition,duration:1})
                } else {
                    this.twoTop = false;
                    //                     _this.corpusScrollTop = 420 -  scrollTop
                    //                    this.corpusPosition = 'relative';
                    //                    modal.toast({message:this.corpusScrollTop,duration:1})
                }
            },
            // 个人信息
            goAttribute() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/persetting/persetting.js'),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            if (!utils.isNull(data.data.logo)) {
                                _this.imageUrl = data.data.logo;
                            }
                            if (!utils.isNull(data.data.nickName)) {
                                _this.userName = data.data.nickName;
                            }
                            if (!utils.isNull(data.data.autograph)) {
                                _this.userSign = data.data.autograph;
                            }
                        } else {
                            //                            return ;
                        }
                    }
                );
            },
            //            设置中心
            goManage() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/systemSetting/systemSetting.js'),
                    function(data) {
                        _this.clicked = false;
                        //                    utils.debug(data)
                        if (data.type == 'success' && data.data != '') {
                            if (!utils.isNull(data.data.occupation)) {
                                _this.imageUrl = data.data.occupation;
                            }
                            if (!utils.isNull(data.data.nickName)) {
                                _this.userName = data.data.nickName;
                            }
                            if (!utils.isNull(data.data.autograph)) {
                                _this.userSign = data.data.autograph;
                            }
                        } else {
                            //                            return ;
                        }
                    }
                );
            },
            //            我的关注
            goFocus() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/focus.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            // 收藏的商品
            goCollectShops() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/collectPdt/collectPdt.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            // 关注的店铺
            goFocusTenants() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/collectTenant/collectTenant.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            // 我的优惠券
            goCoupon() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/mycoupons/mycoupons.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            goCircleList() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/mycirclelist/mycirclelist.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            // 钱包
            goWallet() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/wallet/index.js'),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            //            快速滑动滚动条时， 控制顶部导航栏消失
            toponappear() {
                this.opacityNum = 0;
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
            jumpRestore(item, index) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                POST('weex/member/article/revert.jhtml?articleId=' + item.value.id).then(
                    function(e) {
                        if (e.type == 'success') {
                            //            获取当前时间戳 作为唯一标识符key
                            let timestamp = Math.round(new Date().getTime() / 1000);
                            item.value.articleOption.articleCatalog.id = null;
                            item.value.articleOption.articleCatalog.name = null;
                            let saveData = {
                                type: item.type,
                                key: item.key,
                                value: JSON.stringify(item.value),
                                sort: '0,' + timestamp,
                                keyword: ',[],' + item.value.title + ','
                            }
                            event.save(saveData, function(data) {
                                if (data.type == 'success') {
                                    if (animationPara == null || animationPara == '' || animationPara == 'undefinded') {} else {
                                        animation.transition(animationPara, {
                                            styles: {
                                                transform: 'translateX(0)',
                                            },
                                            duration: 10, //ms
                                            timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                                            //                      timingFunction: 'ease-out',
                                            needLayout: false,
                                            delay: 0 //ms
                                        })
                                    }
                                    _this.articleList.splice(index, 1);
                                    //                                    如果是在全部的文章里，就要立即把文章重新显示；(直接将数据插入而不是重新读取的 会少一个缓存的id字段。不过在该页面没有关系)
                                    if (_this.whichCorpus == 0) {
                                        _this.articleList.splice(0, 0, saveData);
                                    }
                                } else {
                                    event.toast(data.content);
                                }
                            })
                        } else {
                            event.toast(e.content);
                        }
                        _this.clicked = false;
                    },
                    function(err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )
            },
            //            本地处理sort 置顶数据
            topLocal(saveSort, item, index) {
                let _this = this;
                let saveData = {
                    type: item.type,
                    key: item.key,
                    value: JSON.stringify(item.value),
                    sort: saveSort,
                    keyword: ',[' + item.value.articleOption.articleCatalog.id + '],' + item.value.title + ','
                }
                event.save(saveData, function(data) {
                    if (data.type == 'success') {
                        let option = {
                            type: item.type,
                            key: item.key
                        }
                        event.find(option, function(e) {
                            if (e.type == 'success') {
                                //                                    把动画收回来
                                if (animationPara == null || animationPara == '' || animationPara == 'undefinded') {} else {
                                    animation.transition(animationPara, {
                                        styles: {
                                            transform: 'translateX(0)',
                                        },
                                        duration: 10, //ms
                                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                                        //                      timingFunction: 'ease-out',
                                        needLayout: false,
                                        delay: 0 //ms
                                    })
                                }
                                e.data.value = JSON.parse(e.data.value);
                                if (item.sort.substring(0, 1) == '0') {
                                    _this.articleList.splice(index, 1);
                                    _this.articleList.splice(0, 0, e.data);
                                    event.toast('置顶成功');
                                } else {
                                    //                                        _this.articleList.splice(index,1);
                                    //                                        _this.articleList.splice(index,0,e.data);
                                    _this.getAllArticle();
                                    event.toast('取消成功');
                                }
                            }
                        })
                        _this.clicked = false;
                    } else {
                        _this.clicked = false;
                        event.toast(data.content);
                    }
                })
            },
            //            触碰遮罩层
            maskTouch() {
                this.showMenu = false;
            },
        }
    }

</script>
