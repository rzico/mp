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
            <!--<cell v-for="(item,index) in articleList" :key="index">-->
                <!--<div class="articleBox"   @click="chooseArticle(item,index)" >-->
                    <!--&lt;!&ndash;<text>{{item}}</text>&ndash;&gt;-->
                    <!--<div class="atricleHead" >-->
                        <!--<text class="articleTitle">{{item.title}}</text>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;文章封面&ndash;&gt;-->
                    <!--<div style="position: relative">-->
                        <!--<image :src="item.thumbnail" resize="cover" class="articleCover"></image>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;文章底部&ndash;&gt;-->
                    <!--<div class="articleFoot">-->
                        <!--<div>-->
                            <!--<text class="articleDate" >{{item.modifyDate | timeDatefmt}}</text>-->
                        <!--</div>-->
                        <!--<div class="relevantInfo" >-->
                            <!--<text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>-->
                            <!--<text class="relevantText">{{item.hits}}</text>-->
                            <!--<text class="relevantImage " style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>-->
                            <!--<text class="relevantText">{{item.laud}}</text>-->
                            <!--<text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe65c;</text>-->
                            <!--<text class="relevantText">{{item.review}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</cell>-->
            <cell v-for="(item,index) in articleList" :key="index" class="contentBox">
                <div class="collectBox " :class="[index != 0 ? 'borderTop' : '']" @click="chooseArticle(item,index)">
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
            title:{default:'表单文章列表'},
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