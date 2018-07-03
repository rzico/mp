<template>
    <div class="wrapper">
        <div class="header"  :class="[classHeader()]">
            <transition name="component-fade-top" mode="out-in">
                <div class="pageTop" v-if="!doSearch">
                    <div class="nav_back " @click="goback()">
                        <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
                    </div>
                    <div class="nav">
                        <text class="nav_title">{{title}}</text>
                        <div class="navRightBox"  @click="goSearch()">
                            <!--<text class="nav_Complete nav_title" v-if="complete != 'textIcon'">{{complete}}</text>-->
                            <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" >&#xe611;</text>
                        </div>
                    </div>
                </div>
                <div v-else  class="search">
                    <div class="search_box flex5">
                        <div class="flex-start">
                            <text class="ico_small gray" :style="{fontFamily:'iconfont'}">&#xe611;</text>
                            <input class="search_input" type="text" return-key-type="done" v-model="keyword" @input="oninput" @return = "search" autofocus="true" ref="searchBar" :placeholder="searchHint"/>
                        </div>
                        <text class="clearBuf ico_small gray" style="margin-top: 3px" :style="{fontFamily:'iconfont'}" @click="clearBuf">&#xe60a;</text>
                    </div>
                    <div class="flex-center flex1" @click="noSearch()">
                        <text class="fz32 searchCancelText" >{{searchOrCancel}}</text>
                    </div>
                </div>
            </transition>
        </div>
        <!--输入栏-->
        <!--<searchNav v-else :searchHint="searchHint" :searchOrCancel="searchOrCancel" :showCancel="false" :cancelSearch="true" @noSearch="noSearch" @oninput="oninput" @search="search"  ref="childFind"> </searchNav>-->
        <!--</div>-->
        <div  class="corpusBox">
            <scroller scroll-direction="horizontal"  class="corpusScroll">
                <div class="articleClass">
                    <text @click="corpusChange(index,item.id)" class="allArticle" v-for="(item,index) in catagoryList" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">{{item.name}}</text>
                </div>
            </scroller>
            <!--<div class="corpusIconBox" @click="goCatagory()">-->
                <!--<text  :style="{fontFamily:'iconfont'}" class="fz35">&#xe603;</text>-->
            <!--</div>-->
        </div>
        <list style="background-color: #fff;" ref="scrollerRef"  @loadmore="onloading" loadmoreoffset="50">
            <cell v-if="articleList.length == 0">
                <noData :noDataHint="noDataHint" ndBgColor="#fff"></noData>
            </cell>
            <!--导航栏-->
            <cell>
            <div class="articleBox"  v-for="(item,index) in articleList" :key="index" @click="chooseArticle(item,index)" >
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
                        <text class="articleDate" v-if="item.value.articleOption.articleCatalog.id != '99'">{{item.sort.substring(2) | timeDatefmt}}</text>
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
            </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .categoryBox{
        position: absolute;background-color: rgba(136,136,136,0.1);left: 670px;bottom: 120px;border-radius: 5px;padding-right: 3px;padding-left: 3px;padding-top: 3px;padding-bottom: 3px;
    }
    .categoryText{
        color: #fff;
        font-size: 28px;
    }
    /**/
    .pageTop{
        flex-direction: row;
    }
    /*<!--搜索栏-->*/
    .searchCancelText{
        color: #fff;
    }
    .search {
        position:sticky;
        background:#eee;
        /*height: 100px;*/
        flex-direction: row;
        flex:1;
    }
    .search_box {
        margin-top:20px;
        margin-left:20px;
        margin-right:20px;
        margin-bottom:20px;
        padding-left: 20px;
        height: 60px;
        border-width: 1px;
        border-color: #ccc;
        border-style: solid;
        border-radius:8px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: white;
    }
    .clearBuf {
        width:58px;
        height:58px;
        text-align: center;
        padding-top: 10px;
    }
    .search_input {
        margin-left: 20px;
        font-size:32px;
        line-height: 58px;
        height: 58px;
        width:400px;
    }
    /*<!--顶部导航栏-->*/
    .navRightBox{
        min-width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .nav_CompleteIcon{
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
    }
    .nav_Complete {
        padding-left: 27px;
        padding-right: 27px;
        /*ios识别不出该字体，warn警告。  推测可能隐藏到字体图标的渲染*/
        /*font-family: Verdana, Geneva, sans-serif;*/
    }
    /**/
    .articleClass{
        flex-direction: row;
        padding-left: 10px;
        height:80px;
        background-color: #fff;
    }
    .corpusIconBox{
        width: 100px;justify-content: center;align-items: center;background-color: white;
    }
    .allArticle{
        font-size: 29px;
        line-height: 80px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .corpusScroll{
        flex-direction: row;width: 750px;
        background-color: #fff;
    }
    .corpusBox{
        flex-direction: row;
        height:80px;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
        background-color: #fff;
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
    .articleSign {
        border-radius: 10px;
        padding: 5px;
        color: #888;
        font-size: 24px;
        border-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation,storage} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    const modal = weex.requireModule('modal');
    import searchNav from '../../../include/searchNav.vue';
    export default {
        data:{
            refreshing:false,
            reviewNum:0,
            catagoryList:[{
                name:'全部',
                id:''
            }],
            whichCorpus:0,
            doSearch:false,
            pageFrom:'',
            searchHint: "输入文章名",
            searchOrCancel:'取消',
            keyword:'',
            corpusList:[{
                name:'全部',
                id:''
            },{
                name:'回收站',
                id:'99'
            }],
            pageStart:0,
            pageSize:10,
//                文章==================
            articleList: [],
//                文集id
            corpusId:'',
            refreshImg:utils.locate('resources/images/loading.png'),
            clicked:false,
        },
        props:{
            noDataHint:{default:'暂无文章'},
            title:{default:'选择文章'},
//            searchHint: { default: "输入商品名" },
//            searchOrCancel:{default:'取消'},
        },
        components: {
            navbar,noData,searchNav
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
//            获取文集列表
            this.getCorpus();
//            获取商品列表
            if(!utils.isNull(utils.getUrlParameter('from'))){
                this.pageFrom = utils.getUrlParameter('from');
            }
            this.getAllArticle();
        },
        methods:{
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
            getAllArticle(){
                var middleList = [];
                this.pageStart = 0;
                var articleClass = '';
                if(!utils.isNull(this.corpusId)){
                    articleClass = '['+this.corpusId + ']';
                }
                let _this = this;
                let options = {
                    type:'article',
                    keyword:articleClass,
                    orderBy:'desc',
                    current:_this.pageStart,
                    pageSize:_this.pageSize,
                };
                event.findList(options,function (data) {
                    if( data.type == "success") {
                        if(!utils.isNull(data.data)){
                            data.data.forEach(function (item) {
                                //                            将value json化
                                item.value = JSON.parse(item.value);
                                //                            将封面转为缩略图
                                //                            item.value.thumbnail = utils.thumbnail(item.value.thumbnail,690,345);
                                //                          在全部文章里过滤掉已删除的文章
                                if(utils.isNull(_this.corpusId) && item.value.articleOption.articleCatalog.id == 99){
                                }else{
                                    //                              把读取到的文章push进去文章列表
                                    middleList.push(item);
                                }
                            })
                        }
                        _this.articleList = middleList;
                        _this.pageStart = _this.pageStart + _this.pageSize;
                    }
                })
            },
            onloading:function () {
//                判断是否正在搜索
                if(!this.doSearch){
////            获取商品列表
//                    this.getAllArticle();
                    var articleClass = '';
                    if(!utils.isNull(this.corpusId)){
                        articleClass = '['+this.corpusId + ']';
                    }
                    let _this = this;
                    let options = {
                        type:'article',
                        keyword:articleClass,
                        orderBy:'desc',
                        current:_this.pageStart,
                        pageSize:_this.pageSize,
                    };
                    event.findList(options,function (data) {
                        if( data.type == "success") {
                            if(!utils.isNull(data.data)){
                                data.data.forEach(function (item) {
                                    //                            将value json化
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
                            }
                            _this.pageStart = _this.pageStart + _this.pageSize;
                            _this.$refs.scrollerRef.resetLoadmore();
                        }
                    })
                }else{
//                        重新搜索商品
                    this.searchGoods();
                }
            },
//            分类切换
            corpusChange:function(index,id){
//                event.toast(id);
                var _this = this;
                if(_this.whichCorpus == index){
                    return;
                }
                _this.whichCorpus = index;
                _this.corpusId = id;
                _this.pageStart = 0;
//                如果在搜索状态下就不做数据加载
                if(!this.doSearch){
                    _this.getAllArticle();
                }else{
                    _this.articleList = [];
                    _this.searchGoods();
                }
            },
//            获取文集
            getCorpus:function () {
                var _this = this;
                GET('weex/member/article_catalog/list.jhtml',function (data) {
                    if (data.type == "success") {
                        if(data.data == ''){
                        }else{
                            _this.catagoryList = '';
                            _this.catagoryList =[{
                                name:'全部',
                                id:''
                            },{
                                name:'回收站',
                                id:'99'
                            }];
//                                将文集名循环插入数组中
                            for(let i = 0; i<data.data.length;i++){
                                _this.catagoryList.splice(1 + i,0,data.data[i]);
                            }
                        }
                    }else {
//                        event.toast('文集');
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            返回
            goback:function () {
                event.closeURL();
            },
//            前往搜索
            goSearch:function () {
                this.doSearch = true;
                this.searchOrCancel = '取消'
                let _this = this;
                this.articleList = [];
                this.noDataHint = "输入查找文章";
//                event.openURL(utils.locate('view/shop/goods/search.js'), function (res) {
//                    _this.doReset();
//                    if(res.type == 'success'){
//
//                    }
//                });
            },
            oninput:function (e) {
                this.isSearch = false;
                this.keyword = e.value;
                this.searchOrCancel = '搜索';
                this.articleList = [];
                this.noDataHint = "输入查找文章";
                if(e.value.length == 0){
                    this.searchOrCancel = '取消'
                }
            },
            search: function (e) {
                var _this = this;
                this.isSearch = true;
                this.pageStart = 0;
                this.searchOrCancel = '取消';
                this.corpusId = '';
                this.whichCorpus = 0;
                this.searchGoods();
            },
//            点击右上角取消或者搜索按钮
            noSearch:function () {
                this.inputBlur();
                if(this.searchOrCancel == '取消'){
                    this.pageStart = 0;
                    this.doSearch = false;
                    this.getAllArticle();
                }else{
                    this.search();
                }
            },
//          查找文章
            searchGoods:function () {
                var middleList = [];
                let _this = this;
                let options = {
                    type:'article',
                    keyword:_this.keyword,
                    orderBy:'desc',
                    current:_this.pageStart,
                    pageSize:_this.pageSize,
                };
                event.findList(options,function (data) {
                    if( data.type == "success") {
                        if(!utils.isNull(data.data)){
                            data.data.forEach(function (item) {
                                //                            将value json化
                                item.value = JSON.parse(item.value);
                                //                            将封面转为缩略图
                                //                            item.value.thumbnail = utils.thumbnail(item.value.thumbnail,690,345);
                                //                          在全部文章里过滤掉已删除的文章
                                if(utils.isNull(_this.corpusId) && item.value.articleOption.articleCatalog.id == 99){
                                }else{
                                    //                              把读取到的文章push进去文章列表
                                    middleList.push(item);
                                }
                            })
                        }
                        _this.articleList = middleList;
                        _this.pageStart = _this.pageStart + _this.pageSize;
                    }
                })
            },
//          清空关键字
            clearBuf:function () {
                this.keyword = '';
            },
            inputBlur(){
                this.$refs['searchBar'].blur();
            },
//            封面加载出来
            onImageLoad(item){
                item.loading = true;
            },
            chooseArticle(item){
                let E = utils.message('success','返回商品',item)
                event.closeURL(E);
            }
        }
    }
</script>