<template>
    <div class="wrapper">
        <!--输入栏-->
        <searchNav :searchHint="searchHint" :keyword="keyword" @oninput="oninput" @search="search"  ref="childFind"> </searchNav>
        <!--搜索栏-->
        <!--<div class="confm" v-if="isInput()" @click="childSearch()">-->
        <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe611;</text>-->
        <!--<text class="title">搜索: {{keyword}} </text>-->
        <!--</div>-->
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <scroller v-else>
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
            <!--朋友-->
            <div  v-for="(item,index) in searchList.friend" >
                <!--类别-->
                <div  v-if="isRepeat(index)" class="pl30 pr30 bgWhite">
                    <div class="typeTextBox borderBottom" >
                        <text class="sub_title fz32 pb10" >{{item.type | watchType}}</text>
                    </div>
                </div>
                <div class="contentBox">
                    <!--好友-->
                    <div class="flex-row "  @click="goAuthor(item.value.id)">
                        <image class="logo" :src="item.value.logo"></image>
                        <div >
                            <text class="title ml20">{{item.value.nickName}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--消息-->
            <div v-for="(item,index) in searchList.message">
                <!--类别-->
                <div v-if="isRepeat(index)" class="pl30 pr30 bgWhite">
                    <div class="typeTextBox borderBottom" >
                        <text class="sub_title fz32 pb10" >{{item.type | watchType}}</text>
                    </div>
                </div>
                <div class="contentBox">


                    <!--消息-->
                    <div class="friendsLine borderTop"  @click="goChat(item.value.userId)">
                        <!--头像-->
                        <div class="friendsImageBox">
                            <image :src="item.value.logo" class="friendsImage"></image>
                        </div>
                        <div style="flex: 5;">
                            <div style="flex-direction: row;flex: 1;" >
                                <!--名字与内容-->
                                <div class="messageText">
                                    <text class="friendName">{{item.value | watchName}}</text>
                                </div>
                                <!--消息时间-->
                                <div class="messageTimeBox">
                                    <text class="messageTime">{{item.value.createDate | timefmt}}</text>
                                </div>
                            </div>
                            <div style="flex: 2;height: 50px;justify-content: center;">
                                <text class="friendMessage">{{item.value.content}}</text>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!--文章-->
            <div  v-for="(item,index) in searchList.article">
                <!--类别-->
                <div v-if="isRepeat(index)" class="pl30 pr30 bgWhite">
                    <div class="typeTextBox borderBottom" >
                        <text class="sub_title fz32 pb10" >{{item.type | watchType}}</text>
                    </div>
                </div>
                <div class="contentBox">

                    <!--文章-->
                    <div class="collectBox borderTop"  @click="goArticle(item.value.id)">
                        <div class="flex-row">
                            <!--文章封面-->
                            <image resize="cover" class="articleImg" :src="item.value.thumbnail" ></image>
                            <!--文章相关信息。标题点赞...-->
                            <div class="articleInfo">
                                <text class="fz30 articleTitle">{{item.value.title}} </text>
                                <div class="relevantInfo">
                                    <text class="relevantImage" :style="{fontFamily:'iconfont'}">&#xe6df;</text>
                                    <text class="relevantText">{{item.value.hits}}</text>
                                    <text class="relevantImage ml20" style="padding-bottom: 2px" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                                    <text class="relevantText">{{item.value.laud}}</text>
                                    <text class="relevantImage ml20" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                                    <text class="relevantText">{{item.value.review}}</text>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
            <text class="indicator">加载中...</text>
            </loading>
        </scroller>

    </div>
</template>
<style lang="less" src="../style/wx.less"/>
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
    }
    .collectBox{
        padding-top: 15px;
        padding-bottom: 15px;
    }
    /*<!--消息-->*/
    .messageTimeBox{
        height: 50px;
        justify-content: center;
        flex: 2;
        align-items: flex-end;
        padding-right: 10px;
    }
    .messageTime{
        color: #999;
        font-size: 24px;
        lines:1;
    }
    .friendName{
        lines:1;
        text-overflow: ellipsis;
        font-size: 34px;
    }
    .messageText{
        flex:4;
        height: 50px;
        justify-content: center;
    }
    .friendMessage{
        lines:1;
        text-overflow:ellipsis;
        color: #999;
        font-size: 28px;
        padding-right: 20px;
    }
    .friendsImageBox{
        flex: 1;
    }
    .friendsImage{
        height: 100px;
        width:100px;
    }
    .friendsLine{
        padding-top: 15px;
        padding-bottom: 15px;
        width:690px;
        background-color: #fff;
        flex-direction: row;
    }


    .nameColor{
        color: steelblue;
    }
    .contentBox{
        padding-left: 30px;
        padding-right: 30px;
        background-color: #ffffff;
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
    import searchNav from '../include/searchNav.vue';
    import noData from '../include/noData.vue';
    import utils from '../assets/utils';
    import { POST, GET } from '../assets/fetch'
    import filters from '../filters/filters.js';
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
                    message:[],
                    article:[]
                },
                screenHeight:0,
                listCurrent:0,
                pageSize:20,
                friendsList:[],
                singeType:'',
                refreshState:'',
                refreshing:false,
                showLoading:false,
            }
        },
        filters:{
            watchType:function (value) {
                switch(value){
                    case 'friend':
                        return '联系人';
                        break;
                    case 'message':
                        return '聊天内容';
                        break;
                    case 'article':
                        return '文章';
                        break;
                    default:
                        return '联系人';
                        break;
                }
            },
            watchName:function (value) {
                switch(value.userId){
                    case 'gm_10200':
                        return '订单提醒';
                        break;
                    case 'gm_10201':
                        return '账单提醒'
                        break;
                    case 'gm_10202':
                        return '系统消息';
                        break;
                    case 'gm_10203':
                        return '评论回复'
                        break;
                    case 'gm_1024':
                        return '点赞提醒';
                        break;
                    case 'gm_10205':
                        return '关注提醒'
                        break;
                    case 'gm_10206':
                        return '收藏提醒'
                        break;
                    default:
                        return value.nickName;
                        break;
                }
            },

        },
        props: {
            searchHint: { default: "输入要查找的内容"},
            noDataHint: { default: "输入后查找" }
        },
        created(){
            utils.initIconFont();
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(136);
            this.singeType = utils.getUrlParameter('type');
            this.keyword =decodeURI(utils.getUrlParameter('keyword'));
            switch(this.singeType){
                case 'friend':
                    this.searchHint = '联系人';
                    break;
                case 'message':
                    this.searchHint = '聊天内容';
                    break;
                case 'article':
                    this.searchHint = '文章';
                    break;
                default:
                    break;
            }

            event.changeWindowsBar('true');
        },
        methods: {
            watchTypeFunc:function (value) {
                switch(value){
                    case 'friend':
                        return '联系人';
                        break;
                    case 'message':
                        return '聊天内容';
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
                return this.searchList.friend.length == 0 && this.searchList.message.length == 0  && this.searchList.article.length == 0 ;
            },
            isNoEmpty:function () {
                return this.searchList.length!=0;
            },
            isInput:function () {
                return this.keyword!="";
            },
//            输入时
            oninput:function (val) {
                let _this = this;
                this.keyword = val;
                if(val.length == 0){
                    this.noDataHint = "输入查找" + this.searchHint;
                    _this.searchList = {
                        friend:[],
                        message:[],
                        article:[]
                    };
                }else{
                    let option = {
                        type:this.singeType,//类型
                        keyword:val,//关键址
                        orderBy:'desc',//"desc"降序 ,"asc"升序
                        current:0, //当前有几页
                        pageSize:this.pageSize //一页显示几行
                    }
                    event.findList(option,function (message) {
                        if (message.type == 'success' && message.data != '') {
                            _this.searchList = {
                                friend:[],
                                message:[],
                                article:[]
                            };
                            message.data.forEach(function (item) {
                                item.value = JSON.parse(item.value);
                                switch (item.type){
                                    case 'friend':
                                            _this.searchList.friend.push(item);
                                        break;
                                    case 'message':
                                            _this.searchList.message.push(item);
                                        break;
                                    case 'article':
                                            _this.searchList.article.push(item);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        } else {
                            _this.searchList = {
                                friend:[],
                                message:[],
                                article:[]
                            };
                            this.noDataHint = "没有相关"  + this.searchHint;
                        };
                    });
                }
            },
            search: function (e) {

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
            onrefresh:function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)
            },
            onloading:function () {
                var _this = this;
                _this.showLoading = true;
//                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    let option = {
                        type:this.singeType,//类型
                        keyword:this.keyword,//关键址
                        orderBy:'desc',//"desc"降序 ,"asc"升序
                        current:this.listCurrent, //当前有几页
                        pageSize:this.pageSize //一页显示几行
                    }
                    event.findList(option,function (message) {
                        if (message.type == 'success' && message.data != '') {
                            message.data.forEach(function (item) {
                                item.value = JSON.parse(item.value);
                                switch (item.type){
                                    case 'friend':
                                        _this.searchList.friend.push(item);
                                        break;
                                    case 'message':
                                        _this.searchList.message.push(item);
                                        break;
                                    case 'article':
                                        _this.searchList.article.push(item);
                                        break;
                                    default:
                                        break;
                                }
                            });
                        } else if (message.type == 'success' && message.data == '') {

                        }else{
                            event.toast(message.content);
                        };
                    });


                    _this.showLoading = false;
                }, 1500)
            },
        }

    }

</script>