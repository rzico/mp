<template>
    <div>
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" ></navbar>
        <scroller style="background-color: #fff">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
             <noData :noDataHint="noDataHint" ndBgColor="#fff"  v-if="shareList.length == 0"></noData>
            <!--分享-->
            <div class="lineBox" v-for="item in shareList">
                <div class="flex-row" >
                    <!--人物头像-->
                    <image class="headImg" :src="item.logo" ></image>
                    <div class="userInfo">
                        <!--人物信息跟分享信息-->
                        <div class="flex-row">
                            <text class="fz32 nameColor" >{{item.nickName}}</text>
                            <text class="fz32 nameColor " style="color: #bbb;">({{item.shareType | watchType}})</text>
                        </div>
                        <!--分享的图标跟日期-->
                        <div class="flex-row">
                            <image style="width: 50px;height: 50px;" :src="item.shareType | watchImg" ></image>
                            <text class="sub_title">{{item.createDate | datemoretimefmt}}</text>
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
        justify-content: center;
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
    const event = weex.requireModule('event');
    import { POST, GET } from '../../../assets/fetch';
    import filters from '../../../filters/filters.js';
    import noData from '../../../include/noData.vue';
    export default {
        data: {
            shareNum:0,
            articleId:'',
            shareList:[],
            refreshing: false,
            showLoading: false,
            listCurrent: 0,
            pageSize: 15,
            screenHeight: 0,
            title:'',
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
                        return 'http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center';
                        break;
                    case 'appMessage':
                        return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510221848070&di=be3e54d3a819bddbf6fc309643a3fa2b&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F00%2F17%2F16pic_17711_b.jpg';
                        break;
                    case 'shareQQ':
                        return 'http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center';
                        break;
                    case 'shareQZone':
                        return 'http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center';
                        break;
                    case 'appWeex':
                        return 'http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center';
                        break;
                    case 'herf':
                        return 'http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center';
                        break;
                    default:
                        return 'http://pic.qiantucdn.com/58pic/27/25/01/31n58PICz4s_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center';
                        break;
                }
            }
        },
        created() {
            let _this = this;
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(136);
            this.articleId = utils.getUrlParameter('articleId');
            GET('weex/share/list.jhtml?articleId=' + this.articleId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize, function (data) {
                if(data.type == 'success' && data.data.data != '' ){
                    _this.title = data.data.recordsTotal + '人分享';
                    _this.shareList = data.data.data;
                    event.toast(_this.shareList);
                }else  if(data.type == 'success' && data.data.data == '' ){
                    _this.shareNum = data.data.recordsTotal;
                }else{
                    event.toast(data.content);
                }
            }, function (err) {
                event.toast(err.content);
            })


        },
        methods: {
            goback() {
                event.closeURL();
            },

            onrefresh: function () {
                var _this = this;
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 50)
            },
            goAuthor(id) {
                event.openURL(utils.locate("view/member/author.js?id=" + id), function (message) {
                });
            },
            onloading: function () {
                var _this = this;
                _this.showLoading = true;
//                _this.loadingState = "正在加载数据";
                setTimeout(() => {
                    this.listCurrent = this.listCurrent + this.pageSize;
                    GET('weex/share/list.jhtml?articleId=' + this.articleId + '&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize, function (data) {
                        if(data.type == 'success' && data.data.data != '' ){
                            data.data.data.foreach(function (item) {
                                _this.shareList.push(item);
                            })
                        }else if(data.type == 'success' && data.data.data == '' ){
                        }else{
                            event.toast(data.content);
                        }
                    }, function (err) {
                        event.toast(err.content);
                    })
                    _this.showLoading = false;
                }, 1500)
            }
        }
    }
</script>