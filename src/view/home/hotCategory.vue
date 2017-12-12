<template>
    <scroller show-scrollbar="false"  @loadmore="onloading" loadmoreoffset="50" >
        <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
            <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
        </refresh>
        <div :style="{minHeight:screenHeight + 'px'}" @swipe="onpanmove($event)"  ref="adoptPull">

            <noData :noDataHint="noDataHint" v-if="articleList.length == 0"></noData>
            <div class="articleBox" v-for="(item,index) in articleList" v-else :key="index" @click="goArticle(item.id)"  @swipe="onpanmove($event)" >
                <div class="atricleHead">
                    <text class="articleTitle">{{item.title}}</text>
                </div>


                <div class="atricleHead mt20" v-if="item.htmlTag != '' && item.htmlTag != null && item.htmlTag != undefined">
                    <text class="articleContent">{{item.htmlTag}}</text>
                </div>
                <!--文章封面-->
                <div style="position: relative">
                    <image  :src="item.thumbnail "  resize="cover" class="articleCover"></image>
                </div>
                <!--文章底部-->
                <div class="articleFoot">
                    <div style="flex-direction: row;align-items: center" @click="goAuthor(item.authorId)">
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
        </div>
    </scroller>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .mt20{
        margin-top: 20px;
    }
    .articleContent{
        lines: 2;width: 690px;text-overflow: ellipsis;
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
        width: 690px;
        margin-left: 30px;
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
        margin-left: 30px;
    }
    .articleTitle {
        font-size: 38px;
        lines: 1;width: 690px;text-overflow: ellipsis;
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
                screenHeight:0,
                articleList:[],
                refreshImg:utils.locate('resources/images/loading.png'),
                hadUpdate:false,
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
        },
        created(){
            utils.initIconFont();
            var _this = this;
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(216);
            this.getAllArticle();
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

//            获取文章列表
            getAllArticle(){
                let _this = this;
                GET('weex/article/list.jhtml?articleCategoryId=' + this.articleCategoryId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.thumbnail)){
                                    item.thumbnail = utils.thumbnail(item.thumbnail,750,375);
                                }
                            })
                            _this.articleList = data.data.data;
                        }else{
                            data.data.data.forEach(function (item) {
                                if(!utils.isNull(item.thumbnail)){
                                    item.thumbnail = utils.thumbnail(item.thumbnail,750,375);
                                }
                                _this.articleList.push(item);
                            })
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
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
//                event.openURL(utils.locate('view/member/author.js?id=5'),function () {})
            },
            goArticle(id){
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {}
                    )
            },
            onpanmove(e){
                this.$emit('onpanmove',e.direction);
            },

            onloading:function () {
////            获取文章列表
                this.getAllArticle();
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