<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <list style="background-color: #fff;" ref="scrollerRef" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="articleList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell v-for="(item,index) in articleList" :key="index">
                <div class="articleBox"   @click="chooseArticle(item,index)" >
                    <!--<text>{{item}}</text>-->
                    <div class="atricleHead" >
                        <text class="articleTitle">{{item.title}}</text>
                    </div>
                    <!--文章封面-->
                    <div style="position: relative">
                        <image :src="item.thumbnail" resize="cover" class="articleCover"></image>
                    </div>
                    <!--文章底部-->
                    <div class="articleFoot">
                        <div>
                            <text class="articleDate" >{{item.modifyDate | timeDatefmt}}</text>
                        </div>
                        <div class="relevantInfo" >
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
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
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
        margin-left: 30px;
    }
    .articleDate {
        font-size: 24px;
        color: #888;
    }
    .articleCover {
        /*height: 300px;*/
        /*height: 345px;*/
        height: 375px;
        /*width:690px;*/
        width: 750px;
        /*border-radius: 5px;*/
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .articleBox {
        background-color: #ffffff;
        /*padding-left: 30px;*/
        padding-top: 30px;
        padding-right: 30px;
        padding-bottom: 30px;
        /*margin-bottom: 10px;*/
        border-bottom-style: solid;
        border-bottom-width: 10px;
        border-color: #eeeeee;
        /*========= 9.27*/
        width:1080px;
        display: inline-block
    }

    .atricleHead {
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
    }
    .articleTitle {
        width:600px;
        font-size: 36px;
        margin-left: 10px;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import utils from '../../assets/utils';
    import {dom,event,animation,storage} from '../../weex.js';
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    import noData from '../../include/noData.vue';
    import searchNav from '../../include/searchNav.vue';
    export default {
        data:{
            refreshing:false,
            reviewNum:0,
            whichCorpus:0,
            doSearch:false,
            pageFrom:'',
            searchHint: "输入文章名",
            searchOrCancel:'取消',
            keyword:'',
            pageStart:0,
            pageSize:10,
//                文章==================
            articleList: [],
            refreshImg:utils.locate('resources/images/loading.png'),
            clicked:false,
        },
        props:{
            noDataHint:{default:'暂无文章'},
            title:{default:'表单文章列表'},
        },
        components: {
            navbar,
            noData,
            searchNav
        },
        filters:{
            watchCatetory:function (value) {
                if(utils.isNull(value)){
                    return '生活';
                }else{
                    return value;
                }
            },
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,750,375);
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
        created(){
            utils.initIconFont();
            this.getAllArticle();
        },
        methods:{
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            //            加载文章
            getAllArticle:function () {
                let _this = this;
                GET('weex/member/article/list.jhtml?isForm=true&isPublish=true&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success'){
                        if (data.data.start==0) {
//                            _this.articleList = [];
//                            利用一个变量来嫁接数组。
                            _this.middleList = [];
                        }
                        data.data.data.forEach(function (item) {
                            if(utils.isNull(item.thumbnail)){
                            }else{
                                item.thumbnail = utils.thumbnail(item.thumbnail,750,375);
                            }
                            _this.middleList.push(item);
                        });

                        _this.articleList = _this.middleList;
                        _this.pageStart = data.data.start + data.data.data.length;
                    }
                    else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
//                        重新搜索商品
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
//            返回
            goback:function () {
                event.closeURL();
            },
//            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },
            chooseArticle(item){
                let title = ''
                if(!utils.isNull(item.forms)){
                    title = item.forms[0].title;
                }
                event.openURL(utils.locate('view/member/tableList.js?articleId=' + item.id + '&title=' + encodeURIComponent(title)),
                    function (data) {
                        return ;
                    }
                );
            }
        }
    }
</script>