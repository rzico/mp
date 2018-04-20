<template>
    <list class="wrapper" show-scrollbar="false" ref="listDom"  @loadmore="onloading" loadmoreoffset="300"   @scroll="scrollHandler">
        <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
            <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
        </refresh>
        <cell v-if="hasImageList()">
            <!--判断是否到顶部，关闭那个顶部导航栏显示效果-->
            <div style="position:absolute;top: 0;width: 1px;height: 1px;opacity: 0;"  @appear="toponappear"></div>
            <!--多了热门直播 把bt10样式去掉了-->
            <div class="">
                <slider class="slider" interval="3000" auto-play="true">
                    <div class="frame" v-for="img in imageList">
                        <!--配合图片懒加载，先显示一个本地图片-->
                        <image  :src="loadingImg"  v-if="!img.loading"  resize="cover" class="slideImage coverAbsoTop" ></image>
                        <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                        <image class="slideImage" resize="cover"  @appear="onImageAppear(img)"  @load="onImageLoad(img)"  :src="img.thumbnail"  @click="goArticle(img.id)"></image>
                    </div>
                    <indicator class="indicatorSlider"></indicator>
                </slider>
            </div>
        </cell>
        <cell>
            <hotsLive :lives="lives" v-if="lives.length > 0"></hotsLive>
        </cell>
        <cell >
            <noData :noDataHint="noDataHint" v-if="articleList.length == 0"  :style="{minHeight:screenHeight + 'px'}" ></noData>
        </cell>
        <cell v-for="(item,index) in articleList" :key="index" @click="goArticle(item.id)">
            <!--    排版一 采取左右布局。封面较小-->
            <div v-if="item.templateIndex == 0" class="tempPdBox">
                <div class="flex-row">
                    <div class="bt20 flex-row" @click="goAuthor(item.authorId)">
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName">{{item.author }}</text>
                    </div>
                </div>
                <div class="flex-row" >
                    <div class="tempOneContent" >
                        <div class="flex-row">
                            <text class="articleTitle tempOneWidth">{{item.title}}</text>
                            <!--<text class="articleTitle tempOneWidth" >用折纸做出的北欧范花瓶-1</text>-->
                        </div>
                        <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
                        <!--<text class="articleContent">{{item.htmlTag}}</text>-->
                        <!--</div>-->
                        <div class="flex-row" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                            <text class="articleContent tempOneWidth" >{{item.htmlTag}}</text>
                        </div>
                        <div class="relevantInfo" v-if="item.articleSign != '样例'">
                            <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                            <text class="relevantText">{{item.hits}}</text>
                            <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="relevantText">{{item.laud}}</text>
                            <text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                            <text class="relevantText">{{item.review}}</text>
                        </div>
                    </div>
                    <!--文章封面-->
                    <div style="position: relative">
                        <!--配合图片懒加载，先显示一个本地图片-->
                        <image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="tempOneImg coverAbsoTop" ></image>
                        <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                        <image  :src="item.thumbnail"  @appear="onImageAppear(item)"  @load="onImageLoad(item)"  resize="cover" class="tempOneImg"></image>
                    </div>
                </div>
            </div>
            <!--    排版二  文章信息全在封面上-->
            <div v-else-if="item.templateIndex == 1" class="bt10 positionRelative">
                <!--文章封面-->
                <div class="positionRelative">
                    <!--配合图片懒加载，先显示一个本地图片-->
                    <image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="tempTwoCover coverAbsoTop" ></image>
                    <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                    <image  :src="item.thumbnail "  @appear="onImageAppear(item)"  @load="onImageLoad(item)"  resize="cover" class="tempTwoCover" ></image>
                    <div class="tempTwoMask"></div>
                    <div class="tempTwoAuthor" @click="goAuthor(item.authorId)">
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName white">{{item.author}}</text>
                    </div>
                    <div class="tempTwoContent" @click="goArticle(item.id)">
                        <!--只会显示出一个div,所以需要用个大div包住,-->
                        <div>
                            <div class="flex-row bt20">
                                <!--<text class="articleTitle">{{item.title}}</text>-->
                                <text class="articleTitle" style="color: #fff">{{item.title}}</text>
                            </div>
                            <!--<div class="flex-row bt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
                            <!--<text class="articleContent">{{item.htmlTag}}</text>-->
                            <!--</div>-->
                            <div class="flex-row bt20 "  v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                                <text class="articleContent white" >{{item.htmlTag}}</text>
                            </div>
                            <div class="space-between">
                                <div class="relevantInfo" v-if="item.articleSign != '样例'">
                                    <text class="relevantImage white" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                    <text class="relevantText white">{{item.hits}}</text>
                                    <text class="relevantImage  white" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                    <text class="relevantText white">{{item.laud}}</text>
                                    <text class="relevantImage  white" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                    <text class="relevantText white">{{item.review}}</text>
                                </div>
                                <div>
                                    <text class="relevantText white ml20">{{item.createDate | dateweektimefmt}}</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--    排版三  采取封面三分化-->
            <!--<div v-else-if="item.templateIndex == 2" class="tempPdBox">-->
                <!--<div class="flex-row">-->
                    <!--<div class="flex-row" @click="goAuthor(item.authorId)">-->
                        <!--<image :src="item.logo " resize="cover" class="authorImg"></image>-->
                        <!--<text class="authorName">{{item.author}}</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash;文章封面&ndash;&gt;-->
                <!--<div  class="tempThreeCover space-between ">-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempThreeCoverWH" ></image>-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempThreeCoverWH" ></image>-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempThreeCoverWH" ></image>-->
                <!--</div>-->
                <!--<div class="tempThreeContent" >-->
                    <!--<div class="flex-row bt20">-->
                        <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
                        <!--<text class="articleTitle" >用折纸做出的北欧范花瓶-3</text>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">&ndash;&gt;-->
                    <!--&lt;!&ndash;<text class="articleContent">{{item.htmlTag}}</text>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--<div class="flex-row  bt20" >-->
                        <!--<text class="articleContent " >家居界的仿妆鼻祖来了，这次惊艳你的居然是家居界最最最......</text>-->
                    <!--</div>-->
                    <!--<div class="space-between">-->
                        <!--<div>-->
                            <!--<text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>-->
                        <!--</div>-->
                        <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
                            <!--<text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
                            <!--<text class="relevantText ">{{item.hits}}</text>-->
                            <!--<text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
                            <!--<text class="relevantText ">{{item.laud}}</text>-->
                            <!--<text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
                            <!--<text class="relevantText ">{{item.review}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;    排版四  采取封面四分化&ndash;&gt;-->
            <!--<div v-else-if="item.templateIndex == 3" class="articleBox">-->
                <!--<div class="flex-row">-->
                    <!--<div  class="flex-row ml20" @click="goAuthor(item.authorId)">-->
                        <!--<image :src="item.logo " resize="cover" class="authorImg"></image>-->
                        <!--<text class="authorName">{{item.author}}</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash;文章封面&ndash;&gt;-->
                <!--<div  class="tempFourCover space-between mt20 bt20">-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH" ></image>-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH"></image>-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH mt6"></image>-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH mt6"></image>-->
                <!--</div>-->
                <!--<div  class="tempThreeContent ml20" >-->
                    <!--<div class="flex-row bt20">-->
                        <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
                        <!--<text class="articleTitle" >用折纸做出的北欧范花瓶-4</text>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">&ndash;&gt;-->
                    <!--&lt;!&ndash;<text class="articleContent">{{item.htmlTag}}</text>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--<div class="flex-row  bt20" >-->
                        <!--<text class="articleContent ">家居界的仿妆鼻祖来了，这次惊艳你的居然是家居界最最最......</text>-->
                    <!--</div>-->
                    <!--<div class="space-between">-->
                        <!--<div>-->
                            <!--<text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>-->
                        <!--</div>-->
                        <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
                            <!--<text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
                            <!--<text class="relevantText ">{{item.hits}}</text>-->
                            <!--<text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
                            <!--<text class="relevantText ">{{item.laud}}</text>-->
                            <!--<text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
                            <!--<text class="relevantText ">{{item.review}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--&lt;!&ndash;    排版五  采取封面两分化&ndash;&gt;-->
            <!--<div v-else-if="item.templateIndex == 4" class="articleBox">-->
                <!--<div class="flex-row">-->
                    <!--<div  class="flex-row ml20" @click="goAuthor(item.authorId)">-->
                        <!--<image :src="item.logo | watchlogo" resize="cover" class="authorImg"></image>-->
                        <!--<text class="authorName">{{item.author}}</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash;文章封面&ndash;&gt;-->
                <!--<div  class="tempFourCover space-between mt20 bt20">-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH" ></image>-->
                    <!--<image  :src="item.thumbnail "  resize="cover" class="tempFourCoverWH"></image>-->
                <!--</div>-->
                <!--<div  class="tempThreeContent ml20" >-->
                    <!--<div class="flex-row bt20">-->
                        <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
                        <!--<text class="articleTitle" >用折纸做出的北欧范花瓶-5</text>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">&ndash;&gt;-->
                    <!--&lt;!&ndash;<text class="articleContent">{{item.htmlTag}}</text>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--<div class="flex-row  bt20" >-->
                        <!--<text class="articleContent ">家居界的仿妆鼻祖来了，这次惊艳你的居然是家居界最最最......</text>-->
                    <!--</div>-->
                    <!--<div class="space-between">-->
                        <!--<div>-->
                            <!--<text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>-->
                        <!--</div>-->
                        <!--<div class="relevantInfo" v-if="item.articleSign != '样例'">-->
                            <!--<text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
                            <!--<text class="relevantText ">{{item.hits}}</text>-->
                            <!--<text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
                            <!--<text class="relevantText ">{{item.laud}}</text>-->
                            <!--<text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
                            <!--<text class="relevantText ">{{item.review}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--    排版六  采取封面新版化-->
            <div v-else-if="item.templateIndex == 5" class="articleBox">
                <div class="flex-row">
                    <div  class="flex-row ml20" @click="goAuthor(item.authorId)">
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName">{{item.author}}</text>
                    </div>
                </div>
                <!--文章封面-->
                <div style="position: relative">
                    <!--配合图片懒加载，先显示一个本地图片-->
                    <image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="articleCover coverAbsoTop" ></image>
                    <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                    <image  :src="item.thumbnail "  @appear="onImageAppear(item)"  @load="onImageLoad(item)" resize="cover" class="articleCover"></image>
                </div>
                <div  class="tempThreeContent ml20" >
                    <div class="flex-row bt20">
                        <!--<text class="articleTitle">{{item.title}}</text>-->
                        <text class="articleTitle" >{{item.title}}</text>
                    </div>
                    <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
                    <!--<text class="articleContent">{{item.htmlTag}}</text>-->
                    <!--</div>-->
                    <div class="flex-row  bt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined" >
                        <text class="articleContent ">{{item.htmlTag}}</text>
                    </div>
                    <div class="space-between">
                        <div>
                            <text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>
                        </div>
                        <div class="relevantInfo" v-if="item.articleSign != '样例'">
                            <text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                            <text class="relevantText ">{{item.hits}}</text>
                            <text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="relevantText ">{{item.laud}}</text>
                            <text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                            <text class="relevantText ">{{item.review}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--    排版七  采取新版 标题置顶化-->
            <div v-else-if="item.templateIndex == 6" class="articleBox">
                <div class="flex-row bt20">
                    <div  class="flex-row ml20" @click="goAuthor(item.authorId)">
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName">{{item.author}}</text>
                    </div>
                </div>
                <div class="flex-row bt20 ml20">
                    <!--<text class="articleTitle">{{item.title}}</text>-->
                    <text class="articleTitle" >{{item.title}}</text>
                </div>
                <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
                <!--<text class="articleContent">{{item.htmlTag}}</text>-->
                <!--</div>-->
                <div class="flex-row ml20 " v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                    <text class="articleContent ">{{item.htmlTag}}</text>
                </div>
                <!--文章封面-->
                <div style="position: relative">
                    <!--配合图片懒加载，先显示一个本地图片-->
                    <image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="articleCover coverAbsoTop" ></image>
                    <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                    <image  :src="item.thumbnail "  @appear="onImageAppear(item)"  @load="onImageLoad(item)" resize="cover" class="articleCover"></image>
                </div>
                <div  class="tempThreeContent ml20" >
                    <div class="space-between">
                        <div>
                            <text class="relevantText" >{{item.createDate | dateweektimefmt}}</text>
                        </div>
                        <div class="relevantInfo" v-if="item.articleSign != '样例'">
                            <text class="relevantImage " :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                            <text class="relevantText ">{{item.hits}}</text>
                            <text class="relevantImage  " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="relevantText ">{{item.laud}}</text>
                            <text class="relevantImage  " :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                            <text class="relevantText ">{{item.review}}</text>
                        </div>
                    </div>
                </div>
            </div>

            <!--    排版八  文章信息全在封面上-->
            <div v-else-if="item.templateIndex == 7" class="bt10">
                <!--文章封面-->
                <div class="positionRelative">
                    <!--配合图片懒加载，先显示一个本地图片-->
                    <image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="tempEightCover coverAbsoTop" ></image>
                    <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                    <image  :src="item.thumbnail"  @appear="onImageAppear(item)"  @load="onImageLoad(item)" resize="cover" class="tempEightCover" ></image>
                    <div class="tempTwoMask"></div>
                    <div class="tempTwoAuthor" @click="goAuthor(item.authorId)">
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName white">{{item.author}}</text>
                    </div>
                    <div class="tempTwoContent" @click="goArticle(item.id)">
                        <!--只会显示出一个div,所以需要用个大div包住,-->
                        <div>
                            <div class="flex-row bt20">
                                <!--<text class="articleTitle">{{item.title}}</text>-->
                                <text class="articleTitle" style="color: #fff">{{item.title}}</text>
                            </div>
                            <!--<div class="flex-row mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">-->
                            <!--<text class="articleContent">{{item.htmlTag}}</text>-->
                            <!--</div>-->
                            <div class="flex-row bt20 "  v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                                <text class="articleContent white" >{{item.htmlTag}}</text>
                            </div>

                            <div class="space-between">
                                <div class="relevantInfo" v-if="item.articleSign != '样例'">
                                    <text class="relevantImage white" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                    <text class="relevantText white">{{item.hits}}</text>
                                    <text class="relevantImage  white" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                    <text class="relevantText white">{{item.laud}}</text>
                                    <text class="relevantImage  white" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                    <text class="relevantText white">{{item.review}}</text>
                                </div>
                                <div>
                                    <text class="relevantText white ml20">{{item.createDate | dateweektimefmt}}</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--    排版九  传统模样的模版-->
            <div v-else class="articleBox">
                <div class="atricleHead">
                    <text class="articleTitle">{{item.title}}</text>
                </div>
                <div class="atricleHead mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                    <text class="articleContent">{{item.htmlTag}}</text>
                </div>
                <!--文章封面-->
                <div style="position: relative">
                    <!--配合图片懒加载，先显示一个本地图片-->
                    <image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="tempEightCover coverAbsoTop" ></image>
                    <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                    <image  :src="item.thumbnail"  resize="cover" @appear="onImageAppear(item)"  @load="onImageLoad(item)"  class="articleCover"></image>
                </div>
                <!--文章底部-->
                <div class="articleFoot">
                    <div class="flex-row" @click="goAuthor(item.authorId)">
                        <image :src="item.logo" resize="cover" class="authorImg"></image>
                        <text class="authorName">{{item.author}}</text>
                    </div>
                    <div class="relevantInfo" v-if="item.articleSign != '样例'">
                        <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                        <text class="relevantText">{{item.hits}}</text>
                        <text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                        <text class="relevantText">{{item.laud}}</text>
                        <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                        <text class="relevantText">{{item.review}}</text>
                    </div>
                </div>
            </div>
        </cell>
    </list>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .positionRelative{
        position:relative;
    }
    .tempEightCover{
        height: 375px;
        width: 750px;
    }

    .tempFourCover{
        position: relative;width: 750px;flex-wrap: wrap;
    }
    .mt6{
        margin-top: 6px;
    }
    .tempFourCoverWH{
        height: 372px;width: 372px;
    }

    .tempThreeSign{
        font-size:28px;line-height: 40px;
    }
    .tempThreeContent{
        width: 710px;justify-content: space-between;
    }
    .tempThreeCoverWH{
        width: 230px;
        height: 230px;
    }
    .tempThreeCover{
        position: relative;width: 710px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .tempTwoSign{
        color: #fff;font-size:28px;line-height: 40px;
    }
    .tempTwoContent{
        width: 710px;justify-content: space-between;position:absolute;bottom: 20px;left: 20px;
    }
    .tempTwoAuthor{
        position: absolute;top: 20px;left: 20px;flex-direction: row;align-items: center;
    }
    .tempTwoMask{
        position: absolute;top: 0;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.3;
    }
    .tempTwoCover{
        height: 500px;
        width: 750px;
    }

    .tempOneImg{
        width: 200px;height: 200px;
    }
    .tempOneWidth{
        width: 490px;
    }
    .tempOneContent{
        width: 510px;justify-content: space-between;height: 200px;
    }

    .tempPdBox{
        width: 750px;padding-left: 20px;padding-right: 20px;padding-top: 20px;padding-bottom: 20px;margin-bottom:10px;background-color:#fff;
    }

    .coverAbsoTop{
        position: absolute;
        top:0;
    }

    /*<!--轮播图-->*/
    .indicatorSlider{
        position: absolute;
        bottom: 10px;
        width:750px;
        /*height为10时 底下的点会变成椭圆，20会变成圆 */
        height: 10px;
        align-items: center;
        item-selected-color:#fff;
        item-size:15px;
    }
    .slideImage {
        width: 750px;
        /*height: 280px;*/
        height: 375px;
    }
    .slider {
        width: 750px;
        height: 375px;
        /*height: 280px;*/
    }
    .frame {
        width: 750px;
        /*height: 280px;*/
        height: 375px;
        position: relative;
    }
    /*轮播图*/

    .mt20{
        margin-top: 20px;
    }
    .articleContent{
        lines: 2;width: 710px;text-overflow: ellipsis;
        font-size: 32px;
        color: #888;
    }
    .activeClass{
        visibility: visible;
    }
    .noactive{
        visibility: hidden;
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
        width: 710px;
        margin-left: 20px;
        align-items: center;
    }
    .authorName {
        font-size: 30px;
        margin-left: 10px;
        color: #888;
    }
    .authorImg{
        width: 60px;height: 60px;border-radius: 30px;
    }
    .articleCover {
        height: 375px;
        /*width:690px;*/
        width:750px;
        /*border-radius: 5px;*/
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .articleBox {
        background-color: #ffffff;
        /*padding-left: 30px;*/
        padding-top: 20px;
        /*padding-right: 30px;*/
        padding-bottom: 20px;
        margin-bottom: 10px;
    }
    .atricleHead {
        flex-direction: row;
        align-items: center;
        margin-left: 20px;
    }
    .articleTitle {
        font-size: 38px;
        lines: 1;width: 710px;text-overflow: ellipsis;
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
</style>
<script>
    import hotsLive from './hotsLive.vue';
    import filters from '../../filters/filters';
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    import noData from '../../include/noData.vue';
    var scrollTop = 0;
    export default {
        data(){
            return{
                refreshing:false,
                showLoading: 'hide',
                pageStart:0,
                pageSize:10,
                articleList:[],
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
                screenHeight:0,
                clicked:false,
                imageList: [],
                templateIndexList:[0,1,5,6,7],
//                isInit:true,
                loadingImg:utils.locate('resources/images/loading1.gif'),
                lives:[],
                isHeader:false,//                控制导航栏
            }
        },
        components: {
            noData,hotsLive
        },
        props:{
//            whichCorpus:{default:0}
            noDataHint:{default:'暂无文章'},
            articleCategoryId:{default:'0'}
        },
        created(){
            utils.initIconFont();
            var _this = this;
            this.templateIndexList = this.shuffle(this.templateIndexList);
            this.getAllArticle();
            this.getHots();
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(316);
        },
        methods:{
//            监听页面滚动
            scrollHandler: function(e) {
                var _this = this;
                if(e.contentOffset.y >=0){
                    return;
                }
                scrollTop =Math.abs(e.contentOffset.y);
                let opacityDegree = Math.floor(scrollTop/14)/10;
                if(opacityDegree > 1){
                    opacityDegree = 1;
                }
                if(opacityDegree > 0.4){

                }else{

                }
                if(scrollTop >= 338){
                    this.isHeader = true;
                }if(scrollTop <= 216){
                    this.isHeader = false;

                }
                this.$emit('scrollHandler',this.isHeader);
            },
//            快速滑动页面到顶部时触发
            toponappear(){
                this.isHeader = false;
                this.$emit('toponappear',this.isHeader);
            },
//            获取热门直播
            getHots:function() {
                var _this = this;
                GET("weex/live/list.jhtml?pageStart=0&pageSize=3",function (res) {
                    if (res.type=="success") {
                        _this.lives = res.data.data
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
//            封面显示出来
            onImageAppear(item){
                if(utils.isNull(item.loadingImg)){
                    item.loadingImg = item.thumbnail;
                }
            },
//            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },

            hasImageList(){
              if(utils.isNull(this.imageList)){
                  return false;
              }else{
                  return true;
              }
            },

//            打乱数组
            shuffle(array) {
                var tmp, current, top =array.length;
                if(top) while(--top){
                    current =Math.floor(Math.random() * (top + 1));
                    tmp =array[current];
                    array[current] =array[top];
                    array[top] = tmp;
                }
                return array;
            },
//            获取文章列表
            getAllArticle(){
                let _this = this;
                GET('weex/article/hot.jhtml?pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        let dataLength = data.data.data.length;
//                      此处用了2个foreach 是由于在js中 使用变量来嫁接data.data.data 也是一样的内存地址。
                        data.data.data.forEach(function (item,index) {
//                             （配合懒加载）
                            item.loading = false;
//                             （配合懒加载）
                            item.loadingImg = '';

//                            模版id重新填充打乱
                            if(_this.templateIndexList.length == 0 ){
                                _this.templateIndexList = _this.shuffle([0,1,5,6,7]);
                            }
//                            获取当前元素的模版id
                            item.templateIndex = _this.templateIndexList[0];
                            _this.templateIndexList.splice(0,1);
                        })
//                        定义一个变量来接收轮播图数组。避免页面轮播图置空[]再次渲染。
                        var middleList = [];
                        data.data.data.forEach(function (item,index) {
                            if(!utils.isNull(item.logo)){
//                                <!--不能用过滤器,在上啦加载push时 会渲染不出来，具体原因还得分析-->
                                item.logo = utils.thumbnail(item.logo,60,60);
                            }else{
                                item.logo = utils.locate('resources/images/background.png');
                            }
                            if(utils.isNull(item.author)){
                                item.author = 'author';
                            }else{
                                item.author = utils.changeStrLast(item.author);
                            }
////                          填充轮播图
                            if(_this.pageStart == 0 && !utils.isNull(item.tags) && _this.imageList.length < 5){
                                for(var i = 0;i < item.tags.length; i ++){
                                    if(item.tags[i].id == 5){
                                        middleList.push(item);
                                        data.data.data.splice(index,1);
                                        break;
                                    }
                                }
                            }
//                                <!--不能用过滤器,在上啦加载push时 会渲染不出来，具体原因还得分析-->
                            if(!utils.isNull(item.thumbnail)) {
                                switch (item.templateIndex) {
                                    case 0:
                                        item.thumbnail = utils.thumbnail(item.thumbnail, 200, 200);
                                        break;
                                    case 1:
                                        item.thumbnail = utils.thumbnail(item.thumbnail, 750, 500);
                                        break;
                                    case 2:
                                        item.thumbnail = utils.thumbnail(item.thumbnail, 230, 230);
                                        break;
                                    case 3:case 4:
                                    item.thumbnail = utils.thumbnail(item.thumbnail, 372, 372);
                                    break;
                                    default:
                                        item.thumbnail = utils.thumbnail(item.thumbnail,750, 375);
                                        break;
                                }
                            }
                            if(_this.pageStart != 0){
                                _this.articleList.push(item);
                            }
                        })
//                        假如没有精选文章，就从获取到的所有文章里取出
                        if (_this.pageStart == 0) {
                            while(middleList.length < 5){
                                if(data.data.data.length == 0){
                                    break;
                                }
//                                获取原图
                                data.data.data[0].thumbnail = utils.filterThumbnail(data.data.data[0].thumbnail);
//                                获取需要的比例缩略图
                                data.data.data[0].thumbnail = utils.thumbnail(data.data.data[0].thumbnail,750, 375);
                                middleList.push(data.data.data[0]);
                                data.data.data.splice(0,1);
                            }

//                            下拉刷新后文章的前2个组件无法触发appear事件，此时手动进行更新 （配合懒加载）
                            if(!utils.isNull(data.data.data[0])){
                                _this.onImageAppear(data.data.data[0]);
                            }
                            if(!utils.isNull(data.data.data[1])){
                                _this.onImageAppear(data.data.data[1]);
                            }
                            _this.imageList = middleList;
                            _this.articleList = data.data.data;
                        }
                        _this.pageStart = data.data.start + dataLength;
                    }else  if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            //            前往作者专栏
            goAuthor(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
//                event.openURL(utils.locate('view/member/author.js?id=5'),function () {})
            },
            goArticle(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {
                        _this.clicked = false;
                    }
                )
            },

            onloading:function () {
////            获取文章列表
                this.getAllArticle();
//                强制触发上啦加载
                this.$refs.listDom.resetLoadmore();
            },
            onrefresh:function () {
                var _this = this;
                _this.pageStart = 0;
//                避免下拉刷新时触发 轮播图的v-if事件 避免销毁,页面跳动
//                if(!utils.isNull(this.imageList)){
//                    this.isInit = false;
//                }else{
//                    this.isInit = true;
//                }
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
                    _this.refreshing = false;
//                    _this.imageList = [];
                    _this.getAllArticle();
                }, 1000)
            },
        }
    }
</script>