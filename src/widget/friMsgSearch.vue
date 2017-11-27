<template>
    <div class="wrapper">
        <!--输入栏-->
        <searchNav :searchHint="searchHint" @oninput="oninput" @search="search"  ref="childFind"> </searchNav>
        <!--搜索栏-->
        <!--<div class="confm" v-if="isInput()" @click="childSearch()">-->
        <!--<text class="ico" :style="{fontFamily:'iconfont'}">&#xe611;</text>-->
        <!--<text class="title">搜索: {{keyword}} </text>-->
        <!--</div>-->
        <!--无数据提示-->
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <!--数据显示-->
        <scroller v-else >
            <div  v-if="this.searchList.friend.length != 0" class="bt30">
                    <!--朋友-->
                    <div  v-for="(item,index) in searchList.friend" >
                        <!--类别-->
                        <div  v-if="isRepeat(index)" class="pl30 pr30  bgWhite">
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
                            <div  v-if="isMoreRepeat(index)" class="borderTop " @click="goMoreSearch(item.type)">
                                <text class="fz35 pt30 pb30 nameColor" :style="{fontFamily:'iconfont'}" >&#xe611; 更多{{item.type | watchType}}</text>
                            </div>
                        </div>
                    </div>
            </div>
            <div  class="bt30" v-if="this.searchList.message.length != 0" >
                <!--消息-->
                <div  v-for="(item,index) in searchList.message">
                    <!--类别-->
                    <div  v-if="isRepeat(index)" class="pl30 pr30  bgWhite">
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
                        <div  v-if="isMoreRepeat(index)" class="borderTop " @click="goMoreSearch(item.type)">
                            <text class="fz35 pt30 pb30 nameColor" :style="{fontFamily:'iconfont'}" >&#xe611; 更多{{item.type | watchType}}</text>
                        </div>
                    </div>
                </div>
            </div>
            <!--文章-->
            <div  v-for="(item,index) in searchList.article">
                <!--类别-->
                <div  v-if="isRepeat(index)" class="pl30 pr30 bgWhite">
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
                    <div  v-if="isMoreRepeat(index)" class="borderTop " @click="goMoreSearch(item.type)">
                        <text class="fz35 pt30 pb30 nameColor" :style="{fontFamily:'iconfont'}" >&#xe611; 更多{{item.type | watchType}}</text>
                    </div>
                </div>
            </div>
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

                currentNum:0,
                pageNum:20,
                friendsList:[],
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
            searchHint: { default: "输入好友名/消息内容/文章"},
            noDataHint: { default: "输入后查找" }
        },
        created(){
            utils.initIconFont();
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
                    this.noDataHint = "输入查找相关内容";
                    _this.searchList = {
                        friend:[],
                        message:[],
                        article:[]
                    };
                }else{
                    let option = {
                        type:'',//类型
                        keyword:val,//关键址
                        orderBy:'asc',//"desc"降序 ,"asc"升序
                        current:0, //当前有几页
                        pageSize:this.currentNum //一页显示几行
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
                                        if(_this.searchList.friend.length >= 5){
                                        }else{
                                            _this.searchList.friend.push(item);
                                        }
                                        break;
                                    case 'message':
                                        if(_this.searchList.message.length >= 5){
                                        }else{
                                            _this.searchList.message.push(item);
                                        }
                                        break;
                                    case 'article':
                                        if(_this.searchList.article.length >= 5){
                                        }else{
                                            _this.searchList.article.push(item);
                                        }
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

                            _this.noDataHint = "没有相关内容";
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
//            判断更多时是否渲染
            isMoreRepeat:function (index) {
                var _this = this;
                if(index >= 4){
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
                event.openURL(utils.locate("view/topic/author.js?id=" + id),function (message) {
                });
            },
            //            前往聊天
            goChat:function (userId) {
                event.navToChat(userId);
            },
//                      前往文章
            goArticle(id){
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {}
                )
            },
//            更多记录
            goMoreSearch(itemType){

                event.openURL(utils.locate('widget/moreSearch.js?type=' + itemType + '&keyword=' + encodeURI(this.keyword)),
                    function () {}
                )
            }
        }

    }

</script>