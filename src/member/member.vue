<template>
    <scroller class="wrapper" show-scrollbar="false">
        <!--顶部个人信息栏-->
        <div class="topBox" ref='topBox'>
            <!--背景图片-->
            <image  class="backgroundImage" :src="imageUrl"></image>
            <div class="topHead">
                <!--用户头像-->
                <image class="testImage" :src="imageUrl"></image>
                <!--用户昵称-->
                <text class="userName" >{{userName}}</text>
                <!--用户签名-->
                <text class="userSign" >{{userSign}}</text>
            </div>
            <!--功能按钮-->
            <div class="topBtnBox">
                <div class="topBtnSmallBox topBtnOne" @click="jump('sss')">
                    <text class="topBtn topBtnBigFont">{{collectNum}}</text>
                    <text class=" topBtn " >收藏</text>
                </div>
                <div class="topBtnSmallBox topBtnTwo" @click="jump('sss')">
                    <text class="topBtn topBtnBigFont">¥ {{moneyNum}}</text>
                    <text class="topBtn  " >钱包</text>
                </div>
                <div class="topBtnSmallBox">
                    <text class="topBtn topBtnBigFont">{{focusNum}}</text>
                    <text class="topBtn">关注</text>
                </div>
            </div>
        </div>

        <div>
            <!--全部文章、回收站栏-->
            <div class="articleClass">
                <text @click="allArticle()" class="allArticle" :class = "[isAllArticle ? 'active' : '']">全部文章</text>
                <text @click="recycleSite()" class="recycleSite" :class = "[!isAllArticle ? 'active' : '']">回收站</text>
            </div>
            <div v-if="isAllArticle" v-cloak   transition="slide-edit-box">
                <transition name="fade">
                    <div>
                        <text v-if="isNoArticle" class="tipsText">您还没有文章</text>
                    </div>
                </transition>
                <!--文章模块-->
                <div>
                    <div class="articleBox" v-for="item in articleList" @click="jump('sss')" @swipe="swipeHappen($event)">
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
                            <div class="relevantInfo">
                                <image :src="imageUrl" class="relevantImage"></image>
                                <text class="relevantText">{{item.browse}}</text>
                                <image :src="imageUrl" class="relevantImage"></image>
                                <text class="relevantText">{{item.praise}}</text>
                                <image :src="imageUrl" class="relevantImage"></image>
                                <text class="relevantText">{{item.comments}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--回收站栏目-->
            <div v-if="!isAllArticle" v-cloak class="recycleSiteContent"  transition="slide-edit-box">
                <div>
                    <text v-if="isNoArticle" class="tipsText">您没有文章在回收站中</text>
                </div>
                <!--文章模块-->
                <div>
                    <div class="articleBox" v-for="item in articleListDelete" @swipe="swipeHappen($event)">
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
                            <div class="relevantInfo">
                                <text class="testClass" :style="{fontFamily:'iconfont'}">&#xe643;</text>
                                <text class="relevantText">{{item.browse}}</text>
                                <image :src="imageUrl" class="relevantImage"></image>
                                <text class="relevantText">{{item.praise}}</text>
                                <image :src="imageUrl" class="relevantImage"></image>
                                <text class="relevantText">{{item.comments}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <loading class="loading" @loading="onloading" :display="showLoading">
            <text class="indicator">Loading ...</text>
        </loading>
    </scroller>
</template>
<style scoped>

    .relevantImage {
        flex-direction: row;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        margin-left: 5px;
    }

    .relevantText {
        color: #888;
    }

    .relevantInfo {
        flex-direction: row;
        align-items: center;
    }

    .articleFoot {
        flex-direction: row;
        justify-content: space-between;
        width: 710px;
        align-items: center;
    }

    .articleDate {
        font-size: 24px;
        color: #888;
    }

    .articleCover {
        height: 300px;
        width: 710px;
        border-radius: 5px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .articleBox {
        background-color: #ffffff;
        padding-left: 20px;
        padding-top: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
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
        background-color: #f4f4f4;
    }
    [v-cloak] {
        display: none;
    }
    .recycleSiteContent{
        align-items: center;
        width:750px;
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
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #888;
        height:80px;
        position: sticky;
        background-color: #fff;
    }
    .allArticle{
        font-size: 29px;
        margin-right: 20px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .recycleSite{
        font-size:29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .topBtnOne{
        border-color:white;
        border-right-width: 1px;
        border-style: solid;
    }
    .topBtnTwo{
        border-color:white;
        border-right-width: 1px;
        border-style: solid;
    }
    .backgroundImage{
        position: absolute;
        width:750px;
        top:0;
        height:400px;
        filter: blur(4px);
        opacity: 0.8;
        /*-moz-filter: blur(4px);*/
        /*-webkit-filter: blur(4px);*/
        /*-o-filter: blur(4px);*/
        /*-ms-filter: blur(4px);*/
        /*-webkit-backdrop-filter: blur(4px);*/
    }
    .topBox{
        position: relative;
        padding-top:20px;
        height: 400px;
    }
    .topBtnBox{
        flex-direction: row;
        align-items: center;
        margin-top: 40px;
        width:500px;
        margin-left: 125px;
    }
    .topBtnSmallBox{
        height:80px;
        flex:1;
    }
    .topBtn{
        color:white;
        font-size: 24px;
        text-align: center;
        height:40px;
        line-height: 40px;
    }
    .topBtnBigFont{
        font-weight: 600;
        font-size: 32px;
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
        border-radius: 50%;
    }
    .userSign{
        lines:1;
        text-overflow:ellipsis;
        width:500px;
        font-size: 26px;
        color: white;
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
    const modal = weex.requireModule('modal');
    var he = require('he');


        const navigator = weex.requireModule('navigator');
    export default {
        data:function() {
            return{
                userName:'柯志杰',
                userSign:'刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。刮风下雨打雷台风天。',
                isAllArticle:true,
                isNoArticle:false,
                refreshing:'hide',
                fontName: '&#xe685;',
                collectNum:3,
                moneyNum:44.5,
                focusNum:68,
                imageUrl:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                id:'334',
                showLoading: 'hide',
                imageUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                articleList: [{
                    articleSign: '公开',
                    articleTitle: '金钻厦门',
                    articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    articleDate: '2017-8-31',
                    browse: 55,
                    praise: 48,
                    comments: 32,
                }, {
                    articleSign: '私密',
                    articleTitle: '美丽厦门',
                    articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    articleDate: '2017-09-01',
                    browse: 626,
                    praise: 47,
                    comments: 39,
                }, {
                    articleSign: '私密',
                    articleTitle: '美丽厦门',
                    articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    articleDate: '2017-09-01',
                    browse: 626,
                    praise: 47,
                    comments: 39,
                }],
                articleListDelete: [{
                    articleSign: '已删除',
                    articleTitle: '金钻厦门',
                    articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    articleDate: '2017-8-31',
                    browse: 55,
                    praise: 48,
                    comments: 32,
                }, {
                    articleSign: '已删除',
                    articleTitle: '美丽厦门',
                    articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    articleDate: '2017-09-01',
                    browse: 626,
                    praise: 47,
                    comments: 39,
                }, {
                    articleSign: '已删除',
                    articleTitle: '美丽厦门',
                    articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    articleDate: '2017-09-01',
                    browse: 626,
                    praise: 47,
                    comments: 39,
                }]
            }
        },
        computed: {
            getFontName: function() {
                return he.decode(this.fontName)
            }
        },
        created:function(){
            if(JSON.stringify(this.articleList) == "[]"){//从对象解析出字符串
                isNoArticle = true;
            };
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url(\'http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf\')"
            })
        },
        methods: {
            jump:function (vueName) {
//                this.$router.push(vueName);

                    var url = this.$getConfig().bundleUrl;  //獲取當前a.we頁面的路徑(xxx/a.js)
                    url = url.split('/').slice(0,-2).join('/') + 'index.js';  //獲取sss.vue編譯後的b.js的相對路徑
                    navigator.push({
                        url: url,
                        animated: true
                    })

            },
            allArticle:function(){
                this.isAllArticle = true;
            },
            recycleSite:function(){
                this.isAllArticle = false;
            },
            swipeHappen:function(event){
                console.log(event);
                console.log(event.direction);
                if(event.direction == 'left'){
                    this.isAllArticle = false;
                }else if(event.direction == 'right'){
                    this.isAllArticle = true;
                }
            },
            onloading:function(event) {
                modal.toast({message: '加载中...', duration: 1});
                this.showLoading = 'show';
                setTimeout(function () {
                    const length = this.articleList.length
                    for (var i = length; i < length + 2; ++i) {
                        this.articleList.push({
                            articleSign: '公开',
                            articleTitle: '美丽厦门' + i,
                            articleCoverUrl: 'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                            articleDate: '2017-09-01',
                            browse: 626 + i,
                            praise: 47 + i,
                            comments: 39 + i
                        })
                    }
                    this.showLoading = 'hide'
                },1500)
            },
        }
    }
</script>
