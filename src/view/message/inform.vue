<template>
    <div>
        <navbar :title="title"@goback="goback"></navbar>
        <scroller  :class="[bgWhite ? 'whiteColor' : '']">
            <refresh class="refresh" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">{{refreshState}}</text>
            </refresh>
            <div :style="{minHeight:screenHeight + 'px'}">
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="dataList.length == 0"></noData>
                <div  v-if="messageType == 'gm_10201' || messageType == 'gm_10200'">
                    <div class="dateBox">
                        <text class="dateText">昨天17:46</text>
                    </div>
                    <div class="contentBox">
                        <text class="fz45">{{item.title}}</text>
                        <text class="sub_title mt10">10月21日</text>
                        <div class="moneyBox">
                            <text class="fz65">128.00</text>
                            <text class="fz30 mt10">元</text>
                        </div>
                        <div class="contentLine">
                            <text class="fz30 black">付款方式:</text>
                            <text class="fz30 gray ml10">{{item.memo}}</text>
                        </div>
                        <div class="contentLine">
                            <text class="fz30 black">交易对象:</text>
                            <text class="fz30 gray ml10">饿了么</text>
                        </div>
                        <div class="contentLine">
                            <text class="fz30 black">商品说明:</text>
                            <text class=" fz30 gray ml10">千尊比萨（莲花店）外卖订单</text>
                        </div>
                        <div class="bottomBtn">
                            <text class="title">查看详情</text>
                        </div>
                    </div>
                </div>
                <!--系统消息-->
                <div class="lineBox"  v-if="messageType == 'gm_10202'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg" :src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text  class="infoText">{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <!--<image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>-->
                </div>
                <!--评论-->
                <div class="lineBox"  v-if="messageType == 'gm_10203'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg" :src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text  class="infoText">{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                </div>
                <!--点赞-->
                <div class="lineBox"  v-if="messageType == 'gm_10204'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg" :src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                </div>
                <!--关注-->
                <div class="lineBox"  v-if="messageType == 'gm_10205'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg":src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" >关注了你</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                </div>
                <!--收藏-->
                <div class="lineBox" v-if="messageType == 'gm_10206'" v-for="item in dataList">
                    <div class="flex-row" >
                        <image class="headImg" :src="item.logo" @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text  class="infoText">收藏了你的文章《想念入会想念入会》</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>
                </div>
                <!--赞赏-->
                <div class="lineBox"  v-if="messageType == 'gm_10207'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg":src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" >{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                </div>
                <!--分享提醒-->
                <div class="lineBox"  v-if="messageType == 'gm_10208'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg":src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" >{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                </div>
                <!--添加好友-->
                <div class="lineBox"  v-if="messageType == 'gm_10209'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg":src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" >{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                </div>
                <!--同意好友-->
                <div class="lineBox"  v-if="messageType == 'gm_10210'" v-for="item in dataList">
                    <div class="flex-row">
                        <image class="headImg":src="item.logo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" >{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
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
<style lang="less" src="../../style/wx.less"/>
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
    .bottomBtn{
        width: 700px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 30px;
        align-items: center;
        border-color: gainsboro;
        border-style: solid;
        border-top-width:1px;
    }
    .contentLine{
        margin-top: 10px;
        margin-bottom: 10px;
        flex-direction: row;
    }
    .fz45{
        font-size: 38px;
    }
    .fz65{
        font-size: 65px;
        color: #444;
    }
    .fz28{

    }
    .fz30{
        font-size: 30px;
    }
    .moneyBox{
        padding-top: 50px;
        padding-bottom: 30px;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        border-color: #ccc;
        border-style: solid;
        border-bottom-width:1px;
        margin-bottom: 30px;
    }
    .contentBox{
        width:700px;
        margin-left: 25px;
        background-color: #fff;
        padding-top: 20px;
        padding-left: 15px;
        padding-right: 15px;
        border-radius: 10px;
        border-color:gainsboro;
        border-width: 1px;
        border-style: solid;
        margin-bottom: 20px;
    }
    .dateBox{
        width: 750px;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .dateText{
        font-size: 24px;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        color: #fff;
        background-color: #ccc;
        border-radius: 5px;
    }
</style>
<script>
    import navbar from '../../include/navbar.vue';
    import {dom,event,storage,stream} from '../../weex.js';
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch'
    import noData from '../../include/noData.vue'
    import filters from '../../filters/filters.js'
    export default {
        data(){
            return{
                messageType:'',
                bgWhite:false,
                dataList:[],
                refreshing:false,
                showLoading:false,
                listCurrent:0,
                pageSize:15,
                screenHeight:0
            }
        },
        components: {
            navbar
        },
        props:{
            title:{default:'支付助手'},
        },
        created(){
            let _this = this;
            utils.initIconFont();
//            获取屏幕的高度
            this.screenHeight = utils.fullScreen(136);
            this.messageType = utils.getUrlParameter('type');
            switch(this.messageType){
                case 'gm_10200':
                    this.title =  '订单提醒';
                    this.bgWhite = false;
                    break;
                case 'gm_10201':
                    this.title =  '账单提醒';
                    this.bgWhite = false;
                    break;
                case 'gm_10202':
                    this.title =  '系统消息';
                    this.bgWhite = false;
                    break;
                case 'gm_10203':
                    this.title =  '评论回复';
                    this.bgWhite = true;
                    break;
                case 'gm_10204':
                    this.title =  '点赞提醒';
                    this.bgWhite = true;
                    break;
                case 'gm_10205':
                    this.title =  '关注提醒';
                    this.bgWhite = true;
                    break;
                case 'gm_10206':
                    this.title =  '收藏提醒';
                    this.bgWhite = true;
                    break;
                case 'gm_10207':
                    this.title =  '赞赏提醒';
                    this.bgWhite = true;
                    break;
                case 'gm_10208':
                    this.title =  '分享提醒';
                    this.bgWhite = true;
                    break;
                case 'gm_10209':
                    this.title =  '添加好友提醒';
                    this.bgWhite = true;
                    break;
                case 'gm_10210':
                    this.title =  '同意好友提醒';
                    this.bgWhite = true;
                    break;
                default:
                    this.title = '消息助手';
                    this.bgWhite = false;
                    break;
            }
            GET('weex/member/message/list.jhtml?userId=' + this.messageType +'&pageStart=' + this.listCurrent + '&pageSize=' + this.pageSize,function (data) {
                event.toast(data);
                if(data.type == 'success' && data.data.data != ''){
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
                id = parseInt(id.substr(-5)) - 10200;
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
                    GET('weex/member/message/list.jhtml?userId=' + _this.messageType +'&pageStart=' + _this.listCurrent + '&pageSize=' + _this.pageSize,function (data) {
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