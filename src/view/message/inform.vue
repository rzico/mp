<template>
    <div class="wrapper" >
        <navbar :title="title"@goback="goback"></navbar>
        <list  :class="[bgWhite ? 'whiteColor' : 'bkg-gray']" @loadmore="onloading" loadmoreoffset="50" >
            <refresh class="refreshBox" @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'"  >
                <image resize="cover" class="refreshImg" ref="refreshImg" :src="refreshImg" ></image>
            </refresh>
            <cell>
                <noData :noDataHint="noDataHint" ndBgColor="#fff" v-if="dataList.length == 0"></noData>
            </cell>
            <cell  v-if="messageType == 'gm_10200'"  v-for="item in dataList"  @click="goLink(item.id)">
                <div class="dateBox">
                    <text class="dateText">{{item.createDate | timefmtMore}}</text>
                </div>
                <div class="contentBox">
                    <text class="fz45 black">{{item.ext.orderItems[0].name}}</text>
                    <text class="sub_title mt10">{{item.createDate | ymdtimefmt}}</text>
                    <div class="moneyBox">
                        <text class="fz65">{{item.ext.amount | currencyfmt}}</text>
                        <text class="fz30" >元</text>

                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">订单号:</text>
                        <text class="fz30 gray ml10">{{item.ext.sn}}</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">订单状态:</text>
                        <text class="fz30 gray ml10">{{item.ext.statusDescr}}</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">商品说明:</text>
                        <text class=" fz30 gray ml10">{{item.ext.orderItems[0].name}}{{item.ext.orderItems[0].spec}}</text>
                    </div>
                    <div class="bottomBtn">
                        <text class="title">查看详情</text>
                    </div>
                </div>
            </cell>
            <cell  v-if="messageType == 'gm_10201'"   v-for="item in dataList"  @click="goLink(item.id)">
                <div class="dateBox">
                    <text class="dateText">{{item.createDate | timefmtMore}}</text>
                </div>
                <div class="contentBox">
                    <text class="fz45 black">{{item.title}}</text>
                    <text class="sub_title mt10">{{item.createDate | ymdtimefmt}}</text>
                    <div class="moneyBox">
                        <text class="fz65">{{item.ext.amount | currencyfmt}}</text>
                        <text class="fz30" >元</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">付款方式:</text>
                        <text class="fz30 gray ml10">{{item.ext.method}}</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">交易对象:</text>
                        <text class="fz30 gray ml10">{{item.ext.nickName}}</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">商品说明:</text>
                        <text class=" fz30 gray ml10">{{item.ext.memo}}</text>
                    </div>
                    <div class="bottomBtn">
                        <text class="title">查看详情</text>
                    </div>
                </div>
            </cell>
            <cell  v-if="messageType == 'gm_10212'"  v-for="item in dataList"  @click="goLink(item.id)">
                <div class="dateBox">
                    <text class="dateText">{{item.createDate | timefmtMore}}</text>
                </div>
                <div class="contentBox">
                    <text class="fz45 black">{{item.title}}</text>
                    <text class="sub_title mt10">{{item.createDate | ymdtimefmt}}</text>
                    <div class="moneyBox">
                        <text class="fz65">{{item.ext.amount | currencyfmt}}</text>
                        <text class="fz30">元</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">付款方式:</text>
                        <text class="fz30 gray ml10">{{item.ext.method}}</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">交易对象:</text>
                        <text class="fz30 gray ml10">{{item.ext.name}}</text>
                    </div>
                    <div class="contentLine">
                        <text class="fz30 black">交易说明:</text>
                        <text class=" fz30 gray ml10">{{item.ext.memo}}</text>
                    </div>
                    <div class="bottomBtn">
                        <text class="title">查看详情</text>
                    </div>
                </div>
            </cell>
            <cell v-if="messageType == 'gm_10202' || messageType == 'gm_10209' || messageType == 'gm_10210'" v-for="item in dataList" @click="goLink(item.id)">
                <!--系统消息-->
                <div class="lineBox pt20 pb20"  >
                    <div style="flex-direction: row">
                        <image class="headImg" :src="item.logo | watchLogo"  @click="goAuthor(item.userId)"></image>
                        <div class="commentsInfo">
                            <text class="fz30 nameColor" >{{item.nickName }}</text>
                            <text  class="commentsText">{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <!--<image class="coverImg" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg"></image>-->
                </div>
            </cell>
            <cell v-if="messageType == 'gm_10203'" v-for="item in dataList" @click="goLink(item.id)">
                <!--评论-->
                <div class="lineBox pt20 pb20">
                    <div style="flex-direction: row">
                        <image class="headImg" :src="item.logo | watchLogo"  @click="goAuthor(item.userId)"></image>
                        <div class="commentsInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text  class="commentsText">{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <image class="coverImg" :src="item.ext.thumbnail | watchThumbnail" ></image>
                </div>
            </cell>
            <cell v-if="messageType == 'gm_10204'" v-for="item in dataList"  @click="goLink(item.id)">
                <!--点赞-->
                <div class="lineBox lineBoxHeight" >
                    <div class="flex-row">
                        <image class="headImg" :src="item.logo | watchLogo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <image class="coverImg"  :src="item.ext.thumbnail | watchThumbnail"></image>
                </div>
            </cell>
            <cell  v-if="messageType == 'gm_10205'" v-for="item in dataList"  @click="goLink(item.id)">
                <!--关注-->
                <div class="lineBox lineBoxHeight" >
                    <div class="flex-row">
                        <image class="headImg":src="item.logo | watchLogo"  @click="goAuthor(item.userId)"></image>
                        <div class="userInfo">
                            <text class="fz30 nameColor" >{{item.nickName}}</text>
                            <text   class="infoText">关注了你</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                </div>
            </cell>
            <cell v-if="messageType == 'gm_10206' || messageType == 'gm_10207' || messageType == 'gm_10208'" v-for="item in dataList"  @click="goLink(item.id)">

                <!--收藏--> <!--分享提醒--><!--赞赏-->
                <div class="lineBox pt20 pb20">
                    <div style="flex-direction: row">
                        <image class="headImg" :src="item.logo | watchLogo" @click="goAuthor(item.userId)"></image>
                        <div class="commentsInfo">
                            <text class="fz30 nameColor" >{{item.nickName }}</text>
                            <text  class="commentsText">{{item.content}}</text>
                            <text class="sub_title">{{item.createDate | timefmtOther}}</text>
                        </div>
                    </div>
                    <image class="coverImg" :src="item.ext.thumbnail | watchThumbnail"></image>
                </div>
            </cell>
        </list>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .black{
        color: #444;
    }
    .whiteColor{
        background-color: #fff;
    }
    .infoText{
        font-size: 32px;color: #444;
        width: 480px;
        lines:1;
        text-overflow: ellipsis;
    }
    .commentsText{
        font-size: 32px;color: #444;
        width: 480px;
        text-overflow: ellipsis;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .nameColor{
        color: steelblue;
    }
    .userInfo{
        margin-left: 20px;
        height: 120px;
        justify-content: space-between;
    }
    .commentsInfo{
        margin-left: 20px;
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
        padding-right: 20px;
        justify-content: space-between;
        width: 725px;
        margin-left: 25px;
        background-color: #fff;
        border-color: gainsboro;
        border-style: solid;
        border-bottom-width:1px;
    }
    .lineBoxHeight{
        height: 150px;
        align-items: center;
    }
    .bottomBtn{
        width: 650px;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-top: 10px;
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
        padding-top: 0px;
        padding-bottom: 25px;
        align-items: center;
        flex-direction: row;
        justify-content: center;
        border-color: #ccc;
        border-style: solid;
        border-bottom-width:1px;
        margin-bottom: 10px;
    }
    .contentBox{
        width:700px;
        margin-left: 25px;
        background-color: #fff;
        padding-top: 25px;
        padding-left: 25px;
        padding-right: 25px;
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
    import {dom,event,storage,stream,animation} from '../../weex.js';
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch'
    import noData from '../../include/noData.vue'
    import filters from '../../filters/filters.js'
    export default {
        data(){
            return{
                messageType:'',
                bgWhite:true,
                dataList:[],
                refreshing:false,
                pageStart:0,
                pageSize:15,
                refreshImg:utils.locate('resources/images/loading.png'),
                clicked:false,
            }
        },
        components: {
            navbar
        },
        props:{
            title:{default:'支付助手'},
        },
        filters:{
//            logo
            watchLogo:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,90,90);
            },
//            文章封面
            watchThumbnail:function (value) {
//                    没过滤前是原图
                return utils.thumbnail(value,110,110);
            },
        },
        created(){
            let _this = this;
            utils.initIconFont();
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
                    this.bgWhite = true;
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
                    this.title =  '添加好友';
                    this.bgWhite = true;
                    break;
                case 'gm_10210':
                    this.title =  '同意好友';
                    this.bgWhite = true;
                    break;
                case 'gm_10211':
                    this.title =  '客服消息';
                    this.bgWhite = true;
                    break;
                case 'gm_10212':
                    this.title =  '线下收单';
                    this.bgWhite = false;
                    break;
                default:
                    this.title = '消息助手';
                    this.bgWhite = true;
                    break;
            }
            this.getAllInform();
        },
        methods:{
//            获取所以消息
            getAllInform(){
                let _this = this;
                GET('weex/member/message/list.jhtml?userId=' + this.messageType +'&pageStart=' + this.pageStart + '&pageSize=' + this.pageSize,
                    function (data) {
                        if(data.type == 'success' && data.data.data != ''){
                            if (_this.pageStart == 0) {
                                data.data.data.forEach(function(item) {
                                    if (!utils.isNull(item.ext)) {
                                        item.ext = JSON.parse(item.ext);
                                    }
//                                    手机用户登录可能未设置logo和nickName
                                    if(utils.isNull(item.nickName)){
                                        item.nickName = '未填写';
                                    }
                                    //                                    手机用户登录可能未设置logo和nickName
                                    if(utils.isNull(item.logo)){
                                        item.logo = utils.locate('resources/images/background.png');
                                    }
                                })

                                _this.dataList = data.data.data;
                            }else{
                                data.data.data.forEach(function(item){
                                    if(!utils.isNull(item.ext)){
                                        item.ext = JSON.parse(item.ext);
                                    }
                                    _this.dataList.push(item);
                                })
                            }
                            _this.pageStart = data.data.start + data.data.data.length;
                        }else if(data.type == 'success' && data.data.data == '' ){
                        }else{
                            event.toast(data.content);
                        }
                    },function (err) {
                        event.toast('网络不稳定');
                    })
            },
            goback(){
                event.closeURL();
            },
            //            作者主页
            goAuthor:function (id) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                id = parseInt(id.substr(-5)) - 10200;
                event.openURL(utils.locate("view/topic/index.js?id=" + id),function (message) {
                    _this.clicked = false;
                });
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
                    _this.getAllInform();
                }, 1000)
            },
            onloading:function () {
                this.getAllInform();
            },
//            前往链接
            goLink(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                POST('weex/member/message/go.jhtml?id='+ id).then(function(data){
                    if(data.type == 'success'){
                        event.openURL(data.data,function(){

                        })
                    }else{
                        event.toast(data.content);
                    }
                    _this.clicked = false;
                },function(err){
                    _this.clicked = false;
                    event.toast(err.content);
                })
            }
        }

    }
</script>