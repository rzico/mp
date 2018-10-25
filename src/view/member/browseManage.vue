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
            <cell v-for="(item,index) in articleList" :key="index" class="contentBox">
                <!--&lt;!&ndash;<div class="articleBox"   @click="chooseArticle(item,index)" >&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;<text>{{item}}</text>&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="atricleHead" >&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="articleTitle">{{item.title}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;文章封面&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<div style="position: relative">&ndash;&gt;-->
                <!--&lt;!&ndash;<image :src="item.thumbnail" resize="cover" class="articleCover"></image>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;&lt;!&ndash;文章底部&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="articleFoot">&ndash;&gt;-->
                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="articleDate" >{{item.mod ifyDate | timeDatefmt}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="relevantInfo" >&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="relevantText">{{item.hits}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="relevantText">{{item.laud}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>&ndash;&gt;-->
                <!--&lt;!&ndash;<text class="relevantText">{{item.review}}</text>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>-->
                <div class="collectBox " :class="[index != 0 ? 'borderTop' : '']" @click="chooseArticle(item.id)">
                    <!--名字与日期-->
                    <!--<div class="nameDate">-->
                        <!--<div class="nameImg" @click="goAuthor(item.authorId)">-->
                            <!--<image resize="cover" class="authorImg" :src="item.logo | watchLogo"></image>-->
                            <!--<text class="authorName ml10">{{item.author | watchNickName}}</text>-->
                        <!--</div>-->
                        <!--<text class="authorName">{{item.createDate | timeDatefmt}}</text>-->
                    <!--</div>-->
                    <div class="flex-row">
                        <div  v-if="!item.loading" class="articleImg coverAbsoTop"></div>
                        <!--文章封面-->
                        <image resize="cover" class="articleImg" :src="item.thumbnail " @load="onImageLoad(item)"></image>
                        <!--文章相关信息。标题点赞...-->
                        <div class="articleInfo">
                            <text class="fz30 articleTitle">{{item.title}} </text>
                            <div class="relevantInfo">
                                <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                <text class="relevantText">{{item.hits}}</text>
                                <text class="relevantImage ml20" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                <text class="relevantText">{{item.laud}}</text>
                                <text class="relevantImage ml20" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                <text class="relevantText">{{item.review}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    /*.relevantImage {*/
    /*flex-direction: row;*/
    /*font-size: 32px;*/
    /*color: #888;*/
    /*margin-right: 5px;*/
    /*margin-left: 5px;*/
    /*align-items: center;*/
    /*}*/
    /*.relevantText {*/
    /*color: #888;*/
    /*font-size: 26px;*/
    /*}*/
    /*.relevantInfo {*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*}*/
    /*.articleFoot {*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    /*width: 690px;*/
    /*align-items: center;*/
    /*margin-left: 30px;*/
    /*}*/
    /*.articleDate {*/
    /*font-size: 24px;*/
    /*color: #888;*/
    /*}*/
    /*.articleCover {*/
    /*!*height: 300px;*!*/
    /*!*height: 345px;*!*/
    /*height: 375px;*/
    /*!*width:690px;*!*/
    /*width: 750px;*/
    /*!*border-radius: 5px;*!*/
    /*margin-top: 30px;*/
    /*margin-bottom: 30px;*/
    /*}*/
    /*.articleBox {*/
    /*background-color: #ffffff;*/
    /*!*padding-left: 30px;*!*/
    /*padding-top: 30px;*/
    /*padding-right: 30px;*/
    /*padding-bottom: 30px;*/
    /*!*margin-bottom: 10px;*!*/
    /*border-bottom-style: solid;*/
    /*border-bottom-width: 10px;*/
    /*border-color: #eeeeee;*/
    /*!*========= 9.27*!*/
    /*width:1080px;*/
    /*display: inline-block*/
    /*}*/

    /*.atricleHead {*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*margin-left: 30px;*/
    /*}*/
    /*.articleTitle {*/
    /*width:600px;*/
    /*font-size: 36px;*/
    /*margin-left: 10px;*/
    /*}*/

    /*<!--收藏-->*/
    .nameImg{
        flex-direction: row;
        align-items: center;
        height: 80px;
        padding-right: 20px;
    }
    .articleTitle{
        color: #444;
        lines:2;
        text-overflow: ellipsis;
    }
    .authorName {
        font-size: 28px;
        color: #888;
    }
    .authorImg{
        width: 40px;height: 40px;
        border-radius: 20px;
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
    .articleInfo{
        padding-top: 5px;
        padding-bottom: 5px;
        height: 150px;
        width: 400px;
        margin-left: 20px;
        margin-right: 20px;
        justify-content: space-between;
    }
    .articleImg{
        width: 250px;
        height: 150px;
        border-radius: 5px;
    }
    .nameDate{
        flex-direction: row;
        justify-content: space-between;
        height: 80px;
        align-items: center;
        width: 690px;
    }
    .collectBox{
        padding-top: 45px;
        padding-bottom: 15px;
    }
    .nameColor{
        color: steelblue;
    }
    .contentBox{
        flex-direction: row;
        padding-left: 30px;
        padding-right: 30px;
        background-color: #fff;
        flex-wrap: wrap;
    }
    .typeTextBox{
        background-color: #ffffff;
        padding-top: 30px;
    }
    .h {
        height: 160px;
    }
    .logo {
        width:100px;
        height: 100px;
        border-radius: 5px;
        margin-top: 15px;
        margin-bottom: 15px;
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
            title:{default:'文章浏览记录'},
        },
        components: {
            navbar,
            noData,
            searchNav
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
                                item.thumbnail = utils.thumbnail(item.thumbnail,250,150);
                            }
                            item.loading = false;
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
//                        重新搜索文章
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
            chooseArticle(id){
                event.openURL(utils.locate('view/member/whoBrowse.js?articleId=' + id),
                    function (data) {
                        return ;
                    }
                );
            }
        }
    }
</script>