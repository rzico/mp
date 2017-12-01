<template>
    <div>
        <navbar :title="title"@goback="goback"></navbar>
        <scroller  :class="[bgWhite ? 'whiteColor' : '']">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="dataList.length == 0"></noData>
                <!--点赞-->
                <div class="lineBox"  v-else v-for="item in dataList"  @click="goAuthor(item.memberId)">
                    <div class="flex-row">
                        <image class="headImg" :src="item.logo" ></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <!--<image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>-->
                </div>
            </div>
            <loading class="loading" @loading="onloading" :display="showLoading ? 'show' : 'hide'">
                <text class="indicator">加载中...</text>
            </loading>
        </scroller>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .whiteColor{
        background-color: #fff;
    }
    .infoText{
        font-size: 32px;color: #444;
        width: 480px;
        lines:1;
        text-overflow: ellipsis;
    }
    .nameColor{
        color: steelblue;
    }
    .userInfo{
        margin-left: 20px;
        height: 120px;
        justify-content: space-between;
    }
    .coverImg{
        height: 110px;
        width: 110px;
        border-radius: 10px;
    }
    .headImg{
        height: 90px;
        width: 90px;
        border-radius: 45px;
    }
    .lineBox{
        flex-direction: row;
        align-items: center;
        height: 150px;
        padding-right: 20px;
        justify-content: space-between;
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    .fz30{
        font-size: 30px;
    }

</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import {dom,event,storage,stream} from '../../../weex.js';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'
    import noData from '../../../include/noData.vue'
    import filters from '../../../filters/filters.js'
    export default {
        data(){
            return{
                bgWhite:false,
                dataList:[],
                refreshing:false,
                showLoading:false,
                listCurrent:0,
                pageSize:15,
                articleId:'',
                title:'0人点赞',
                screenHeight:0
            }
        },
        components: {
            navbar
        },
        created(){
            let _this = this;
            utils.initIconFont();
            this.screenHeight = utils.fullScreen(136);
            this.articleId = utils.getUrlParameter('articleId');
            utils.debug('weex/laud/list.jhtml?articleId=' + this.articleId +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize);
            GET('weex/laud/list.jhtml?articleId=' + this.articleId +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                if(data.type == 'success' && data.data.data != ''){
                    _this.title = data.data.recordsTotal + '人点赞';
                    _this.dataList =  data.data.data;
                }else if(data.type == 'success' && data.data.data == '' ){
                }else{
                    event.toast(data.content);
                }
            },function (err) {
                event.toast('网络不稳定');
            })
        },
        methods:{
            goback(){
                event.closeURL();
            },
            //            作者主页
            goAuthor:function (id) {
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                });
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
                    _this.listCurrent = _this.listCurrent + _this.pageSize;
                    GET('weex/laud/list.jhtml?articleId=' + this.articleId +'&pageStart=' + _this.listCurrent + '&pageSize=' + _this.pageSize,function (data) {
                        if(data.type == 'success' && data.data.data != '' ){
                            data.data.data.forEach(function (item) {
                                _this.dataList.push(item);
                            })
                        }else if(data.type == 'success' && data.data.data == '' ){
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast(err.content);
                    })
                    _this.showLoading = false;
                }, 1500)
            },
        }

    }
</script>