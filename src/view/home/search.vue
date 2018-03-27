<template>
    <div class="wrapper">
        <!--输入栏-->
        <searchNav  :searchHint="searchHint" @oninput="oninput" :keyword="keyword" @search="search"  ref="childFind"> </searchNav><!--搜索栏-->
        <div  class="confm  bt20" v-if="isInput() && !isSearch" @click="search(keyword)">
            <text class="ico " :style="{fontFamily:'iconfont'}">&#xe611;</text>
            <text class="title">搜索: {{keyword}} </text>
        </div>
        <div v-else>
            <div v-if="keyword == ''">
                <!--搜索历史-->
                <div class="searchBox bt20"  v-if="historyList != ''">
                    <div class="space-between searchHead" >
                        <text class="gray fz26">搜索历史</text>
                        <text class="ico gray cleanHistory fz28" :style="{fontFamily:'iconfont'}" @click="cleanHistory">&#xe60a;</text>
                    </div>
                    <div class="borderBottom searchBorder"></div>
                    <div class="searchContentBox flex-row " >
                        <div v-for="(item,index) in historyList" class="flex-row">
                            <div class="boder-left" v-if="index % 2 != 0" style="height: 50px;width: 1px;"></div>
                            <div class="searchContent" :class="[ index % 2 == 0 ? 'pl25' :'']"  @click="helpSearch(item.history)">
                                <text class=" searchContentText boder-bottom fz28" :class="[ index % 2 != 0 ? 'pl25' :'']">{{item.history}}</text>
                                <!--,index != historyList.history.length - 2 || index != historyList.history.length-1 ? 'boder-bottom' : ''-->
                            </div>
                        </div>
                    </div>
                </div>
                <!--搜索热点-->
                <div class="searchBox " v-if="hotList != ''">
                    <div class="space-between searchHead" >
                        <text class="gray fz26">搜索发现</text>
                    </div>
                    <div class="borderBottom searchBorder"></div>
                    <div class="searchContentBox flex-row " >
                        <div v-for="(item,index) in hotList" class="flex-row">
                            <div class="boder-left" v-if="index % 2 != 0" style="height: 50px;width: 1px;"></div>
                            <div class="searchContent  " :class="[ index % 2 == 0 ? 'pl25' :'']"  @click="helpSearch(item.history)">
                                <text class="boder-bottom searchContentText fz28" :class="[ index % 2 != 0 ? 'pl25' :'']">{{item.history}}</text>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!--顶部分类标题-->
            <div style="background-color: #fff;width: 750px;"v-if="isSearch">
                <div class="flex-row boder-bottom pl25 pr25 " style="height: 80px;background-color: #fff;width: 750px" >
                    <div  class="flex1   centerStyle"   v-for="(item,index) in typeList" @click="typeChange(index,item.id)" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">
                        <text class="fz32 titleColor " style="height: 80px;line-height: 80px" :class = "[whichCorpus == index ? 'primary' : '']">{{item.name}}</text>
                    </div>
                </div>
            </div>
        </div>
        <!--数据显示-->
        <scroller v-if="isSearch"  @loadmore="onloading" loadmoreoffset="50" >
            <!--<refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">-->
            <!--<text class="indicator">{{refreshState}}</text>-->
            <!--</refresh>-->
            <!--顶部标题分类栏-->
            <div class="mt20" :style="{minHeight:screenHeight + 'px'}">
                <!--无数据提示-->
                <noData :noDataHint="noDataHint" v-if="isEmpty() && keyword != '' && isSearch"></noData>
                <div  v-if="this.searchList.friend.length != 0 && this.whichCorpus == 0" class="bt30 ">
                    <!--类别-->
                    <div   class="pl30 pr30  bgWhite">
                        <div class="typeTextBox  space-between">
                            <text class="title fz28 pb15" >相关专栏</text>
                            <text class="sub_title pb10 fz28" :style="{fontFamily:'iconfont'}" @click="goMoreSearch(2)" v-if="searchList.length > 10">更多&#xe630;</text>
                        </div>
                    </div>
                        <!--朋友-->
                        <div  class="cell-line">
                            <div class="contentBox pb15">
                                <!--好友-->
                                <div class="singleUserBox"  v-for="(item,index) in searchList.friend" v-if="index <= 9" @click="goAuthor(item.id)">
                                    <image class="logo" :src="item.logo | watchFriendLogo"></image>
                                    <div >
                                        <text class="title fz28 bt15">{{item.name | watchNickName}}</text>
                                    </div>
                                </div>

                            </div>

                        </div>
                </div>
                <!--更多专栏搜索-->
                <div  v-if="this.searchList.friend.length != 0 && this.whichCorpus == 2" class="bt30">
                    <!--朋友-->
                    <div  v-for="(item,index) in searchList.friend" >
                        <!--类别-->
                        <div  v-if="isRepeat(index)" class="pl30 pr30  bgWhite">
                            <div class="typeTextBox borderBottom" >
                                <text class="sub_title fz32 pb10" >相关专栏</text>
                            </div>
                        </div>
                        <div class="contentBox">
                            <!--好友-->
                            <div class="flex-row "  @click="goAuthor(item.id)">
                                <image class="logo" :src="item.logo | watchFriendLogo"></image>
                                <div style="width: 460px;">
                                    <text class="title ml20">{{item.nickName | watchNickName}}</text>
                                    <text class="sub_title ml20 mt20 autoLimit">{{item.autograph}}</text>
                                </div>
                                <div style="width: 130px;">
                                    <!--关注与否-->
                                    <div class="status_panel" v-if="!item.follow" @click="doFocus(item)">
                                        <text class="focus bkg-primary bd-primary" >关注</text>
                                    </div>
                                    <div class="status_panel" v-if="item.follow && !item.followed"  @click="doFocus(item)">
                                        <text class="ask ">已关注</text>
                                    </div>
                                    <div class="status_panel" v-if="item.follow && item.followed"  @click="doFocus(item)">
                                        <text class="ask ">互相关注</text>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!--文章-->
                <div  v-for="(item,index) in searchList.article" >
                    <!--类别-->
                    <div  v-if="isRepeat(index)" class="pl30 pr30 bgWhite">
                        <div class="typeTextBox " >
                            <text class="sub_title fz32 pb10" >相关文章</text>
                        </div>
                        <div class="borderBottom"></div>
                    </div>
                    <div class="contentBox">
                        <!--文章-->
                        <div class="collectBox " :class="[index != 0 ? 'borderTop' : '']" @click="goArticle(item.id)">
                            <!--名字与日期-->
                            <div class="nameDate">
                                <div class="nameImg" @click="goAuthor(item.authorId)">
                                    <image resize="cover" class="authorImg" :src="item.logo | watchLogo"></image>
                                    <text class="authorName ml10">{{item.author | watchNickName}}</text>
                                </div>
                                <text class="authorName">{{item.createDate | timeDatefmt}}</text>
                            </div>
                            <div class="flex-row">
                                <!--文章封面-->
                                <image resize="cover" class="articleImg" :src="item.thumbnail | watchThumbnail" ></image>
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
                        <div  v-if="isMoreRepeat(index) && whichCorpus == 0" class="borderTop moreArticle"  @click="goMoreSearch(1)">
                            <text class="fz35 pt30 pb30 nameColor" :style="{fontFamily:'iconfont'}" >&#xe611; 更多文章</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--<loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">-->
            <!--<text class="indicator">加载中...</text>-->
            <!--</loading>-->
        </scroller>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .fz26{
        font-size: 26px;
    }
    .moreArticle{
        width: 690px;
    }
    .moreArticle:active{
        background-color: #ccc;
    }
    .autoLimit{
        lines:1;
        width: 440px;
        text-overflow: ellipsis;
    }
    .focus{
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 125px;
        color:#fff;
        border-style: solid;
        border-width: 1px;
    }
    .ask {
        font-size: 26px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius:10px;
        width: 125px;
        color:#ccc;
        border-color: #ccc;
        border-style: solid;
        border-width: 1px;
    }
    .singleUserBox{
        width: 130px; align-items: center;justify-content: center;margin-right: 7px;
    }
    .noActive{
        border-bottom-width:1px;
        border-color: #fff;
    }
    .titleColor{
        color: #888;
    }
    .centerStyle{
        height:80px;justify-content: center;align-items: center;
    }
    .centerStyle:active{
        background-color: #ccc;
    }
    .searchBox{
        background-color: #fff;
    }
    .cleanHistory{
        height: 90px;line-height: 90px;width: 60px;text-align: right;
    }
    .searchHead{
        width: 700px;
        height: 80px;
        margin-left: 25px;
        background-color: #fff;
    }
    .searchBorder{
        width: 700px;
        margin-left: 25px;
    }
    .searchContentText{
        height: 90px;
        line-height: 90px;
        /*width: 349.5px;*/
        width:349px;
        lines:1;
        text-overflow: ellipsis;
    }
    .searchContentBox{
        width: 750px;
        background-color: #fff;
        flex-wrap:wrap;
    }
    .searchContent:active{
        background-color: #ccc;
    }
    .searchContent{
        justify-content: center;
        /*width: 374.5px;*/
        width: 374px;
        height: 90px;
    }
    .confm {
        background-color: white;
        height:90px;
        flex-direction: row;
        align-items: center;
        padding-left: 40px;
    }
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
        padding-top: 15px;
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
    const event = weex.requireModule('event');
    const stream = weex.requireModule('stream');
    import searchNav from '../../include/searchNav.vue';
    import noData from '../../include/noData.vue';
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch'
    import filters from '../../filters/filters.js';
    const storage = weex.requireModule('storage');
    const modal = weex.requireModule('modal');
    export default {
        components: {
            searchNav,noData
        },
        data() {
            return {
                refreshing:false,
                showLoading:false,
                moreNum:0,
                keyword:"",
                searchList:{
                    friend:[],
                    article:[]
                },
                pageStart:0,
                pageSize:15,
                friendsList:[],
                historyList:[],
                hotList:[
                    {
                        history:'儿童安全座椅'
                    },{
                        history:'北航校花'
                    },{
                        history:'太姥山游记'
                    },{
                        history:'聚会'
                    },{
                        history:'女神'
                    },{
                        history:'工笔画'
                    },{
                        history:'长城'
                    }],
                isSearch:false,
                typeList:[{
                    id:'0',
                    name:'热门'
                },{
                    id:'1',
                    name:'文章'
                },{
                    id:'2',
                    name:'用户'
                }],
                whichCorpus:0,
                screenHeight:0,
            }
        },
        filters:{
            watchThumbnail:function (value) {
                return utils.thumbnail(value,250,150);
            },
            watchLogo:function (value) {
                if(utils.isNull(value)){
                    return utils.locate('resources/images/background.png');
                }
                return utils.thumbnail(value,40,40);
            },
            watchNickName:function (value) {
                if(utils.isNull(value)){
                    return 'author';
                }else{
                    return value;
                }
            },
            watchFriendLogo:function (value) {
                return utils.thumbnail(value,100,100);
            }
        },
        props: {
            searchHint: { default: "输入要搜索的内容"},
            noDataHint: { default: "没找到相关内容" }
        },
        created(){
            utils.initIconFont();
//            event.changeWindowsBar('true');
//            storage.removeItem('searchHistory', e => {
//                event.toast(e)
//            })

//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(236);
            this.getHistory();

        },
        methods: {
            watchTypeFunc:function (value) {
                switch(value){
                    case 'friend':
                        return '联系人';
                        break;
                    case 'article':
                        return '文章';
                        break;
                    default:
                        return '联系人';
                        break;
                }
            },
            isEmpty:function () {
                return this.searchList.friend.length == 0   && this.searchList.article.length == 0 ;
            },
            isNoEmpty:function () {
                return this.searchList.friend.length!=0   && this.searchList.article.length != 0;
            },
            isInput:function () {
                return this.keyword!="";
            },
//            输入时
            oninput:function (val) {
                let _this = this;
                this.keyword = val;
                _this.searchList = {
                    friend:[],
                    article:[]
                };
                this.isSearch = false;
                this.whichCorpus = 0;
                if(this.keyword.length == 0 ){
                    this.getHistory();
                };
                this.pageStart=0;
            },
//            读取缓存的搜索历史
            getHistory:function () {
                let _this = this;
                storage.getItem('searchHistory', e => {
                    if(e.result == 'success'){
                        var b = JSON.parse(e.data);
                        _this.historyList = [];
                        _this.historyList = b;
                    }
                })
            },
//            点击搜索时触发
            search: function (keyword) {
//                this.keyword = keyword;
                let _this = this;
                if(keyword == ''){
                    return;
                }
                _this.isSearch = true;
//                进行文章搜索
                this.articleSearch();
//                进行用户专栏搜索
                this.userSearch();
//                设置搜索历史
                storage.getItem('searchHistory', e => {
                    if(e.result == 'success'){
                        var b = JSON.parse(e.data);
//                        判断此次搜索有没有跟历史搜索重复,有就将原来的历史删除
                        b.forEach(function (item,index) {
                            if(item.history == keyword){
                                b.splice(index,1);
                            }
                        })
//                        将新的搜索添加到历史里
                        b.splice(0,0,{
                            history:keyword
                        })
//                        判断历史的长度是否超过4个， 控制只留下4个记录
                        if(b.length == 5){
                            b.splice(4,1);
                        }
//                        存入缓存钱要将json转为字符串
                        b = JSON.stringify(b);
                        storage.setItem('searchHistory', b , e => {
                        })
                    }else{
//                        如果没有历史记录就新添加一个缓存
                        var searchHistory =  [{
                            history:keyword
                        }];
                        searchHistory = JSON.stringify(searchHistory)
                        storage.setItem('searchHistory', searchHistory , e => {
                        })
                    }
                })

            },
//            用户专栏搜索
            userSearch(){
                let _this = this;
                GET('weex/topic/search.jhtml.jhtml?keyword=' + encodeURI(this.keyword) + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != ''){
                        _this.searchList.friend = data.data.data;
                    }else if(data.type == 'success' && data.data.data == ''){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
//            文章搜索
            articleSearch(){
                let _this = this;
                GET('weex/article/search.jhtml?keyword=' + encodeURI(this.keyword) + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,function (data) {
                    if(data.type == 'success' && data.data.data != ''){
                        _this.searchList.article = data.data.data;
                    }else if(data.type == 'success' && data.data.data == ''){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
////            通知自组件将input失去焦点
//            childSearch(){
//                this.$refs.childFind.search();
//            },

            //判断type是否重复
            isRepeat:function(index){
                var _this = this;
                if(index != 0){
//                    if (_this.watchTypeFunc(_this.searchList[index].type) == _this.watchTypeFunc(_this.searchList[index - 1].type)) {
//                        return false;
//                    } else {
//                        return true;
//                    }
                    return false;
                } else {
                    return true;
                }
            },
//            判断更多时是否渲染
            isMoreRepeat:function (index) {
                var _this = this;
                if(index >= 14){
                    return true;
                }else{
                    return false;
                }
//                if(index != _this.searchList.length - 1){
//                    if (_this.watchTypeFunc(_this.searchList[index].type) == _this.watchTypeFunc(_this.searchList[index + 1].type)) {
////                        _this.moreNum++;
////                        if(_this.moreNum >= 2){
////                            _this.moreNum = 0;
////                            return false;
////                        }
//                        return false;
//                    } else {
//                        return true;
//                    }
//                } else {
//                    return true;
//                }
            },
//            作者主页
            goAuthor:function (id) {
                event.openURL(utils.locate("view/member/author.js?id=" + id),function (message) {
                });
            },
            //            前往聊天
            goChat:function (userId) {
                event.navToChat(userId);
            },
//                      前往文章
            goArticle(id){
                event.openURL(utils.locate('view/member/editor/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {}
                )
            },
//            更多记录
            goMoreSearch(itemType){
                this.whichCorpus = itemType;
                this.searchList = {
                    friend:[],
                    article:[]
                };
                this.pageStart=0;
                switch (itemType){
                    case 1:
                        this.articleSearch();
                        break;
                    case 2:
                        this.userSearch();
                        break;
                    default:
                        break;
                }

            },
//            清空搜索历史
            cleanHistory(){
                this.historyList = [];
                storage.removeItem('searchHistory', e => {
                })
            },
//            修改搜索分类时触发
            typeChange(index,id){
                if(this.whichCorpus == index){
                    return;
                }
                this.whichCorpus = index;
                switch (index){
                    case 0 :
                        this.pageStart=0;
                        this.articleSearch();
                        this.userSearch();
                        break;
                    case 1:
//                        避免数据闪屏 刷新
                        if(utils.isNull(this.searchList.article)){
                            this.pageStart=0;
                            this.articleSearch();
                        }else{
                            this.pageStart = this.searchList.article.length;
                        }
                        this.searchList.friend = [];
                        break;
                    case 2:
                        if(utils.isNull(this.searchList.friend)){
                            this.pageStart=0;
                            this.userSearch();
                        }else{
                            this.pageStart = this.searchList.article.length;
                        }
                        this.searchList.article = [];
                        break;
                    default:
                        break;
                }
            },
//            点击搜索历史或者热点时触发
            helpSearch(val){
                let _this = this;
                this.keyword = val;
                setTimeout(function () {
                    _this.search(val);
                },100)
            },
            //            关注
            doFocus(item){
                if(item.follow){
                    modal.confirm({
                        message: '确定要取消关注?',
                        okTitle:'确定',
                        cancelTitle:'取消',
                        duration: 0.3
                    }, function (value) {
                        if(value == '确定'){
                            POST('weex/member/follow/delete.jhtml?authorId=' + item.id).then(
                                function(data){
                                    if(data.type == 'success'){
                                        item.follow = false;
                                    }else{
                                        event.toast(err.content);
                                    }
                                },
                                function(err){
                                    event.toast(err.content);
                                }
                            )
                        }
                    })
                }else{
                    POST('weex/member/follow/add.jhtml?authorId=' + item.id).then(
                        function(data){
                            if(data.type == 'success'){
                                item.follow = true;
                            }else{
                                event.toast(err.content);
                            }
                        },
                        function(err){
                            event.toast(err.content);
                        }
                    )
                }
            },
//            下拉刷新
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)
            },
//            上拉加载
            onloading:function () {
                var _this = this;
                setTimeout(() => {
                    if(_this.whichCorpus == 0){

                    }else if(_this.whichCorpus == 1){//文章的上啦加载
                        GET('weex/article/search.jhtml?keyword=' + encodeURI(this.keyword) + '&pageStart=' + _this.pageStart + '&pageSize=' + _this.pageSize,function (data) {
                            if(data.type == 'success' && data.data.data != ''){
                                data.data.data.forEach(function (item) {
                                    _this.searchList.article.push(item);
                                });

                                _this.pageStart = data.data.start + data.data.data.length;

                            }else if(data.type == 'success' && data.data.data == ''){
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        });
                    }else if(_this.whichCorpus == 2){//专栏的上啦加载
                        GET('weex/topic/search.jhtml.jhtml?keyword=' + encodeURI(this.keyword) + '&pageStart=' + _this.pageStart + '&pageSize=' + _this.pageSize,function (data) {
                            if(data.type == 'success' && data.data.data != ''){
                                data.data.data.forEach(function (item) {
                                    _this.searchList.friend.push(item);
                                });
                                _this.pageStart = data.data.start + data.data.data.length;
                            }else if(data.type == 'success' && data.data.data == ''){
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        });
                    }
                }, 1500)
            },
//            跳转文章
            goArticle(id){
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true'),
                    function () {
                    })
            },

//            作者主页
            goAuthor:function (id) {
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
            },

        }

    }

</script>