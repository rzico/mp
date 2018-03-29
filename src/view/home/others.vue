<template>
    <list class="wrapper" show-scrollbar="false" ref="listDom"  @loadmore="onloading" loadmoreoffset="300" >
        <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
            <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
        </refresh>
        <cell >
            <noData :noDataHint="noDataHint" v-if="articleList.length == 0"  :style="{minHeight:screenHeight + 'px'}" ></noData>
        </cell>
        <cell v-for="(item,index) in articleList" :key="index" @click="goArticle(item.id)"   >
            <div  class="articleBox">
                <div class="atricleHead">
                    <text class="articleTitle">{{item.title}}</text>
                </div>
                <div class="atricleHead mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                    <text class="articleContent">{{item.htmlTag}}</text>
                </div>
                <!--文章封面-->
                <div style="position: relative">
                    <!--配合图片懒加载，先显示一个本地图片-->
                    <!--<image  :src="loadingImg"  v-if="!item.loading"  resize="cover" class="articleCover coverAbsoTop" ></image>-->
                    <div  v-if="!item.loading"  class="articleCover coverAbsoTop "></div>
                    <!--&lt;!&ndash;不能用过滤器,在上啦加载push时 会渲染不出来&ndash;&gt;-->
                    <!--<image  :src="item.thumbnail"  resize="cover" class="articleCover"></image>-->

                    <!--使用组件加载完成事件与组件显示在屏幕上的事件实现图片懒加载,会先触发appear事件,再触发load事件,appear会重复触发(例如：1 2 3,先触发了1 2，在滑动到下方时触发了3，此时1被移动到屏幕外，再移动回顶部，1显示出来，会继续触发1的appear事件)-->
                    <image  :src="item.loadingImg" @appear="onImageAppear(item)"  @load="onImageLoad(item)" resize="cover" class="articleCover"></image>
                </div>
                <!--文章底部-->
                <div class="articleFoot">
                    <div class="flex-row" @click="goAuthor(item.authorId)">
                        <!--不能用过滤器,在上啦加载push时 会渲染不出来-->
                        <image :src="item.logo " resize="cover" class="authorImg"></image>
                        <text class="authorName">{{item.author | watchNickName}}</text>
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
    .coverAbsoTop{
        position: absolute;
        top:0;
        background-color: rgba(136,136,136,0.1);
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
    import utils from '../../assets/utils';
    import {dom,event,animation} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    import noData from '../../include/noData.vue';
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
                loadingImg:utils.locate('resources/images/loading1.gif'),
            }
        },
        components: {
            noData
        },
        props:{
//            whichCorpus:{default:0}
            noDataHint:{default:'暂无文章'},
            articleCategoryId:{default:'0'}
        },
        filters:{
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,750,375);
            },
            watchlogo:function (value) {
                return utils.thumbnail(value,60,60);
            },
            watchNickName:function (value) {
                if(utils.isNull(value)){
                    return 'author';
                }else{
                    return utils.changeStrLast(value);
                }
            }
        },
        created(){
            utils.initIconFont();
            var _this = this;
            this.getAllArticle();
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(316);
        },
        methods:{
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
//            获取文章列表
            getAllArticle(){
                let _this = this;
                GET('weex/article/list.jhtml?articleCategoryId=' + this.articleCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        data.data.data.forEach(function (item) {
//                             （配合懒加载）
                            item.loading = false;
//                             （配合懒加载）
                            item.loadingImg = '';
                            if(!utils.isNull(item.thumbnail)){
                                item.thumbnail = utils.thumbnail(item.thumbnail,750,375);
                            }
                            if(!utils.isNull(item.logo)){
                                item.logo = utils.thumbnail(item.logo,60,60);
                            }else{
                                item.logo = utils.locate('resources/images/background.png');
                            }
                            if(_this.pageStart != 0){
                                _this.articleList.push(item);
                            }
                        })
                        if (_this.pageStart == 0) {
//                            下拉刷新后文章的前2个组件无法触发appear事件，此时手动进行更新 （配合懒加载）
                            if(!utils.isNull(data.data.data[0])){
                                _this.onImageAppear(data.data.data[0]);
                            }
                            if(!utils.isNull(data.data.data[1])){
                                _this.onImageAppear(data.data.data[1]);
                            }
                            _this.articleList = data.data.data;
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
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
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {
                    }
                )
//                event.router(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true'));

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
                    _this.getAllArticle();
                }, 1000)
            },
        }
    }
</script>