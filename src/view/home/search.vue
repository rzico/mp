<template>
    <div class="wrapper">
        <!--输入栏-->
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search"  ref="childFind"> </searchNav><!--搜索栏-->
        <div style="position: fixed;top: 136px;" class="confm boder-bottom bt20" v-if="isInput() && !isSearch" @click="search()">
            <text class="ico " :style="{fontFamily:'iconfont'}">&#xe611;</text>
            <text class="title">搜索: {{keyword}} </text>
        </div>
        <!--搜索历史-->
        <div class="searchBox bt20"  v-if="historyList != '' && keyword == ''" >
            <div class="space-between searchHead" >
                <text class="gray fz28">搜索历史</text>
                <text class="ico gray cleanHistory" :style="{fontFamily:'iconfont'}" @click="cleanHistory">&#xe60a;</text>
            </div>
            <div class="searchContentBox flex-row " >
                <div v-for="(item,index) in historyList" class="flex-row">
                    <div class="boder-left" v-if="index % 2 != 0" style="height: 50px;width: 1px;"></div>
                    <div class="searchContent " :class="[ index % 2 == 0 ? 'pl25' :'']">
                        <text class=" searchContentText boder-bottom fz32" :class="[ index % 2 != 0 ? 'pl25' :'']">{{item.history}}</text>
                        <!--,index != historyList.history.length - 2 || index != historyList.history.length-1 ? 'boder-bottom' : ''-->
                    </div>
                </div>
            </div>
        </div>
        <!--搜索热点-->
        <div class="searchBox " v-if="keyword == ''" v-for="item in hotList">
            <div class="space-between searchHead" >
                <text class="gray fz28">搜索发现</text>
            </div>
            <div class="searchContentBox flex-row " >
                <div v-for="(history,index) in item" class="flex-row">
                    <div class="boder-left" v-if="index % 2 != 0" style="height: 50px;width: 1px;"></div>
                    <div class="searchContent  " :class="[ index % 2 == 0 ? 'pl25' :'']">
                        <text class="boder-bottom searchContentText fz32" :class="[ index % 2 != 0 ? 'pl25' :'']">{{history.content}}</text>
                    </div>
                </div>
            </div>
        </div>
        <div style="background-color: #fff;width: 750px;"v-if="isSearch">
            <div class="flex-row boder-bottom pl25 pr25 " style="height: 100px;background-color: #fff;width: 750px" >
                <div  class="flex1   centerStyle"   v-for="(item,index) in typeList" @click="typeChange(index,item.id)" :class = "[whichCorpus == index ? 'corpusActive' : 'noActive']">
                    <text class="fz32 titleColor " style="height: 100px;line-height: 100px" :class = "[whichCorpus == index ? 'primary' : '']">{{item.name}}</text>
                </div>
            </div>
        </div>

        <!--数据显示-->
        <scroller v-if="isSearch">
            <!--顶部标题分类栏-->
            <div class="mt20">
                <div  v-if="this.searchList.friend.length != 0" class="bt30">
                    <!--朋友-->
                    <div  v-for="(item,index) in searchList.friend" class="cell-line">
                        <!--类别-->
                        <div  v-if="isRepeat(index)" class="pl30 pr30  bgWhite">
                            <div class="typeTextBox  space-between">
                                <text class="title fz28 pb15" >相关专栏</text>
                                <text class="sub_title pb10 fz28" :style="{fontFamily:'iconfont'}" @click="goMoreSearch(item.type)" >更多&#xe630;</text>
                            </div>
                        </div>
                        <div class="contentBox pb15">
                            <!--好友-->
                            <div class="singleUserBox"  @click="goAuthor(item.id)">
                                <image class="logo" :src="item.logo"></image>
                                <div >
                                    <text class="title fz28 bt15">{{item.nickName}}</text>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!--文章-->
                <div  v-for="(item,index) in searchList.article" >
                    <!--类别-->
                    <div  v-if="isRepeat(index)" class="pl30 pr30 bgWhite">
                        <div class="typeTextBox boder-bottom" >
                            <text class="sub_title fz32 pb10" >相关文章</text>
                        </div>
                    </div>
                    <div class="contentBox">
                        <!--文章-->
                        <div class="collectBox " :class="[index != 0 ? 'borderTop' : '']" @click="goArticle(item.id)">
                            <!--名字与日期-->
                            <div class="nameDate">
                                <div class="nameImg" @click="goAuthor(item.authorId)">
                                    <image resize="cover" class="authorImg" :src="item.logo | watchLogo"></image>
                                    <text class="authorName ml10">{{item.author}}</text>
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
                        <div  v-if="isMoreRepeat(index)" class="borderTop " style="width: 690px" @click="goMoreSearch(item.type)">
                            <text class="fz35 pt30 pb30 nameColor" :style="{fontFamily:'iconfont'}" >&#xe611; 更多文章</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--无数据提示-->
            <noData :noDataHint="noDataHint" v-if="isEmpty() && keyword != '' && isSearch"></noData>
        </scroller>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .singleUserBox{
        width: 130px; align-items: center;justify-content: center;margin-right: 7px;
    }
    .noActive{
        border-bottom-width:0px;
    }
    .titleColor{
        color: #888;
    }
    .centerStyle{
        height:100px;justify-content: center;align-items: center;
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
        border-bottom-width: 1px;
        border-style: solid;
        border-color: gainsboro;
    }
    .searchContentText{
        height: 90px;
        line-height: 90px;
        width: 349.5px;
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
        width: 374.5px;
        height: 90px;
    }
    .confm {
        background-color: white;
        height:90px;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;
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
        background-color: #ffffff;
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
    const storage = weex.requireModule('storage')
    export default {
        components: {
            searchNav,noData
        },
        data() {
            return {
                moreNum:0,
                keyword:"",
                searchList:{
                    friend:[],
                    article:[]
                },

                currentNum:0,
                pageNum:20,
                friendsList:[],
                historyList:[],
                hotList:{
                    history:[{
                        content:'手机充值'
                    },{
                        content:'红包'
                    },{
                        content:'寻梦环游记'
                    },{
                        content:'小吃'
                    },{
                        content:'基金'
                    }]
                },
                isSearch:false,
                typeList:[{
                    id:'0',
                    name:'热门'
                },{
                    id:'1',
                    name:'文章'
                },{
                    id:'2',
                    name:'商家'
                }],
                whichCorpus:0
            }
        },
        filters:{
            watchThumbnail:function (value) {
                return utils.thumbnail(value,250,150);
            },
            watchLogo:function (value) {
                return utils.thumbnail(value,40,40);
            }


        },
        props: {
            searchHint: { default: "输入要搜索的内容"},
            noDataHint: { default: "没找到相关内容" }
        },
        created(){
            utils.initIconFont();
            event.changeWindowsBar('true');
//            storage.removeItem('searchHistory', e => {
//                event.toast(e)
//            })

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
                }
            },
            getHistory:function () {
                let _this = this;
                storage.getItem('searchHistory', e => {
                    event.toast(e);
                    if(e.result == 'success'){
                        var b = JSON.parse(e.data);
                        _this.historyList = [];
                        _this.historyList = b;
                        event.toast('List:');
                        event.toast(_this.historyList);
                    }
                })
            },
//            点击搜索时触发
            search: function (keyword) {
                let _this = this;
                if(this.keyword == ''){
                    return;
                }
                this.isSearch = true;
                this.articleSearch();
                this.userSearch();
//                设置搜索历史
                storage.getItem('searchHistory', e => {
                    event.toast(e);
                    if(e.result == 'success'){
                        var b = JSON.parse(e.data);
                        b.splice(0,0,{
                            history:_this.keyword
                        })
                        b = JSON.stringify(b);
                        storage.setItem('searchHistory', b , e => {
                            event.toast(e.result);
                        })
                    }else{
                        var searchHistory =  [{
                            history:_this.keyword
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
                GET('weex/topic/search.jhtml.jhtml?keyword=' + encodeURI(this.keyword),function (data) {
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
                GET('weex/article/search.jhtml?keyword=' + encodeURI(this.keyword),function (data) {

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
                if(index >= 19){
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

                event.openURL(utils.locate('widget/moreSearch.js?type=' + itemType + '&keyword=' + encodeURI(this.keyword)),
                    function () {}
                )
            },
//            清空搜索历史
            cleanHistory(){
                this.historyList = [];
            storage.removeItem('searchHistory', e => {
            })
            },
            typeChange(index,id){
                this.whichCorpus = index;
                this.searchList = {
                    friend:[],
                    article:[]
                };
                switch (index){
                    case 0 :
                        this.articleSearch();
                        this.userSearch();
                        break;
                    case 1:
                        this.articleSearch();
                        break;
                    case 2:
                        this.userSearch();
                        break;
                    default:
                        break;
                }

            }
        }

    }

</script>