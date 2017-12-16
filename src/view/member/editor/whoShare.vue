<template>
    <div class="wrapper" >
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" ></navbar>
        <list style="background-color: #fff" @loadmore="onloading" loadmoreoffset="50">
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <image resize="cover" class="refreshImg"  ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell v-if="shareList.length == 0">
             <noData :noDataHint="noDataHint" ndBgColor="#fff"  v-if="shareList.length == 0"></noData>
            </cell>
            <!--分享-->
            <cell class="lineBox" v-for="item in shareList">
                <div class="flex-row" >
                    <!--人物头像-->
                    <image class="headImg" :src="item.logo" ></image>
                    <div class="userInfo">
                        <!--人物信息跟分享信息-->
                        <div class="flex-row" >
                            <text class="fz32 " >{{item.nickName}}</text>
                            <text class="fz32  " style="color: #bbb;">({{item.shareType | watchType}})</text>
                        </div>
                        <!--分享的图标跟日期-->
                        <div class="flex-row" >
                            <image style="width: 26px;height: 26px;" :src="item.shareType | watchImg" ></image>
                            <text class="sub_date" >{{item.createDate | datemoretimefmt}}</text>
                        </div>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .lineBox{
        flex-direction: row;
        align-items: center;
        height: 140px;
        padding-right: 20px;
        justify-content: space-between;
        width: 750px;
        padding-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    /*.infoText{*/
    /*font-size: 32px;color: #444;*/
    /*width: 480px;*/
    /*lines:1;*/
    /*text-overflow: ellipsis;*/
    /*}*/
    .nameColor{
        margin-bottom: 10px;
    }
    .userInfo{
        margin-left: 20px;
        height: 120px;
        justify-content: space-around;
    }
    .headImg{
        height: 100px;
        width: 100px;
        border-radius: 50px;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import {dom,event,animation} from '../../../weex.js';
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    import search from '../../../include/search.vue';
    export default {
        data: {
            articleId:'',
            shareList:[],
            refreshing: false,
            pageStart: 0,
            pageSize: 15,
            title:'0人分享',
            refreshImg:utils.locate('resources/images/loading.png'),
        },
        components: {
            navbar, noData
        },
        props: {
            noDataHint: {default: '暂无人分享'}
        },

        filters: {
//            分享的类型
            watchType: function (value) {
                switch (value) {
                    case 'timeline':
                        return '分享至朋友圈';
                        break;
                    case 'appMessage':
                        return '分享给微信好友';
                        break;
                    case 'shareQQ':
                        return '分享给QQ好友';
                        break;
                    case 'shareQZone':
                        return '分享至QQ空间';
                        break;
                    case 'appWeex':
                        return '分享给芸店好友';
                        break;
                    case 'herf':
                        return '复制链接';
                        break;
                    default:
                        return '分享至朋友圈';
                        break;
                }
            },
//            分享的图标
            watchImg: function (value) {
                switch (value) {
                    case 'timeline':
                        return utils.locate('resources/images/timeLine.png');
                        break;
                    case 'appMessage':
                        return utils.locate('resources/images/weChat.png');
                        break;
                    case 'shareQQ':
                        return utils.locate('resources/images/qq.png');
                        break;
                    case 'shareQZone':
                        return utils.locate('resources/images/qqSpace.png');
                        break;
                    case 'appWeex':
                        return utils.locate('resources/images/shareFriend.png');
                        break;
                    case 'herf':
                        return utils.locate('resources/images/copyLink.png');
                        break;
                    case 'browser':
                        return utils.locate('resources/images/browser.png');
                        break;
                    default:
                        return utils.locate('resources/images/timeLine.png');
                        break;
                }
            }
        },
        created() {
            let _this = this;
            this.articleId = utils.getUrlParameter('articleId');
            this.getAllShare();

        },
        methods: {
//            获取黑名单列表
            getAllShare(){
                let _this = this;
                GET('weex/share/list.jhtml?articleId=' + this.articleId + '&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize, function (data) {
                    if(data.type == 'success' && data.data.data != '' ){
                        if (_this.pageStart == 0) {
                            _this.shareList = data.data.data;
                            _this.title = data.data.recordsTotal + '人分享';
                        }else{
                            data.data.data.forEach(function (item) {
                                _this.shareList.push(item);
                            })
                        }
                        _this.pageStart = data.data.start + data.data.data.length;
                    }else if(data.type == 'success' && data.data.data == '' ){
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            onloading:function () {
////            获取黑名单列表
                this.getAllShare();
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
                    _this.getAllShare();
                }, 1000)
            },
            goback() {
                event.closeURL();
            },
            goAuthor(id) {
                event.openURL(utils.locate("view/topic/index.js?id=" + id), function (message) {
                });
            },
        }
    }
</script>