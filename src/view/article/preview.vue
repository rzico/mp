<template>
    <div class="wrapper" @viewdisappear="pageDestroy()" @viewappear="pageShow()">
        <!--导航栏-->
        <navbar :title="title" :authorInfo="authorInfo" :isSelf="isSelf" @doFocus="doFocus" @goback="goback" :complete="complete" @goComplete="goComplete"></navbar>
        <!--<div  :style="{height:scrollHeight}" >-->
        <div class="articleOutBox" :class="[articleOutBoxTop()]" >
            <!--网页:style="{height:screenHeight}"-->
            <web class="webView" ref="webView" :style="{bottom:bottomNum + 100}"  :src="webUrl" ></web>
            <!--下一步-->
            <div class="footBox bkg-primary cb-top " v-if="!publish" :style="{height:bottomNum + 100}" @click="goOption()">
                <!--这边要兼容ipone7plus-->
                <div class="bkg-primary fullWidth flex-center" :style="{height:bottomNum + 100}"  @click="goOption()">
                    <text class="nextStep">下一步</text>
                </div>
            </div>
            <!--点赞 评论 分享-->
            <div class="footBox bkg-white"  :style="{height:bottomNum + 100,paddingBottom:bottomNum}" v-if="publish" >
                <div class="bottomBtnBox"  @click="goLaud()">
                    <text class="fz26fff fzz45 " :class="[isLaud ? 'primary' : '']" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                    <text class="fz26fff " :class="[isLaud ? 'primary' : '']">点赞 {{laudNum}}</text>
                </div>
                <div class="bottomBtnBox"  @click="goShare(0)">
                    <text class="fz26fff fzz45 " :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                    <text class="fz26fff ">分享 {{shareNum}}</text>
                </div>
                <div class="bottomBtnBox" @click="goReview()">
                    <text class="fz26fff fzz45 " :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                    <text class="fz26fff ">评论 {{reviewNum}}</text>
                </div>
                <div class="bottomBtnBox"  @click="goReward()">
                    <text class="fz26fff fzz45 " :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    <text class="fz26fff ">赞赏</text>
                </div>
            </div>
            <!--模版-->
            <div  v-if="!templateChoose && isSelf == 1">
                <!--用text标签加上radius 在if重复渲染后不会出现渲染过程-->
                <text class="templateText templateIcon textTemplateIcon" :style="{bottom:bottomNum + 135}" @click="chooseTemplate()">模版</text>
            </div>
            <!--收藏-->
            <div class="templateIcon templateIconWH"  :style="{bottom:bottomNum + 135}" @click="collectArticle()" key="collectIcon" v-if="isSelf == 0 && !isCollect">
                <text class="templateText collectIcon"  :style="{fontFamily:'iconfont'}">&#xe63d;</text>
                <text class="templateText collectText" >收藏</text>
            </div>
            <transition name="slide-fade" mode="out-in">
                <!--模版内容-->
                <div class="templateBox" v-if="isSelf == 1 && templateChoose"  key="templateContent" :style="{paddingBottom:bottomNum}">
                    <div class="templateBtn" :style="{bottom:bottomNum + 300}">
                        <!--<div class="btnTextBox">-->
                        <!--<text class="btnTextSize" :style="{fontFamily:'iconfont'}">&#xe608;</text>-->
                        <!--<text class="btnTextSize " style="padding-left: 10px">图上字下</text>-->
                        <!--</div>-->
                        <!--<div class="btnTextBox"  @click="chooseComplete()">-->
                        <!--用text标签加上radius 在if重复渲染后不会出现渲染过程-->
                        <text class=" btnTextBox btnTextSize btnTextColor"  @click="chooseComplete()" :style="{fontFamily:'iconfont'}">&#xe64d; 完成</text>
                        <!--<text class="btnTextSize btnTextColor" style="padding-left: 10px"></text>-->
                        <!--</div>-->
                    </div>
                    <div>
                        <div>
                               <!--模版样图-->
                                <scroller  class="templateImgBox"  scroll-direction="horizontal" >
                                    <div   v-for="(thumImg,index) in templateList" style="flex-direction: row"  :ref="thumImg.name">
                                        <image v-for="(item,index) in thumImg.templates" @appear="thumImgAppear(thumImg.name)" :src="item.thumbnial" resize="cover"  :class="[item.sn == templateSn ? 'imgActive': '','templateImg']" @click="tickImage(item.sn,item.id,thumImg.name)"></image>
                                    </div>
                                </scroller>
                        </div>
                        <div>
                            <!--模版标题-->
                            <scroller  class="templateTitleBox"  scroll-direction="horizontal">
                                <text v-for="(item,index) in templateList" v-if="isNoTemplates(item.templates)" :class="[item.name == templateName ? 'titleActive': '','templateTitle']" @click="tickTitle(item.name)">{{item.name}}</text>
                            </scroller>
                        </div>
                    </div>
                </div>
            </transition>
            <div v-if="isOperation && isSelf == 1">
                <div class="maskLayer" @touchstart="maskTouch"></div>
                <div class="showBox"  style="width: 230px;">
                    <text class="showBg"></text>
                    <div class="arrowUp" >
                        <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>
                    </div>
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive "  @click="operationEditor">
                        <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                        <text class="fz28 pl10">编辑</text>
                    </div>
                    <!--<div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="copyArticle()">-->
                    <!--<text class="fz40" :style="{fontFamily:'iconfont'}">&#xe62d;</text>-->
                    <!--<text class="fz28 pl10">复制</text>-->
                    <!--</div>-->
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="deleteArticle()">
                        <text class="fz40 primary" :style="{fontFamily:'iconfont'}">&#xe652;</text>
                        <text class="fz28 pl10 primary">删除</text>
                    </div>
                    <div class="boder-bottom " style="position: absolute;left: 25px;right: 25px;"></div>
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="longPic()">
                        <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61a;</text>
                        <text class="fz28 pl10">生成长图</text>
                    </div>
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="operationSet">
                        <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe62d;</text>
                        <text class="fz28 pl10">文章设置</text>
                    </div>
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive"  @click="goShare(1)">
                        <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                        <text class="fz28 pl10">分享</text>
                    </div>
                </div>
            </div>
            <div v-if="isOperation  && isSelf == 0">
                <div class="maskLayer" @touchstart="maskTouch"></div>
                <div class="showBox" style="width: 230px;">
                    <text class="showBg"></text>
                    <div class="arrowUp" >
                        <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>
                    </div>
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive " @click="goAuthor">
                        <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                        <text class="fz28 pl10">作者主页</text>
                    </div>
                    <div class="flex-row pt25 pb25 pl35 pr35 textActive"  @click="goShare(1)">
                        <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                        <text class="fz28 pl10">分享</text>
                    </div>
                </div>
            </div>
            <div v-if="showShare"  key="share" >
                <div class="maskLayer" @touchstart="maskTouch"></div>
                <share @doShare="doShare" :isSelf="isSelf" @doCancel="doCancel"></share>
            </div>

            <reward ref="reward" v-if="rewardShow" @close="close" @rewardNumber="sendReward" ></reward>
        </div>
        <buyGoods  ref="buy" v-if="buyShow" @goPay="goPay" @maskHide="maskHide" :goodId="goodId"  ></buyGoods>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .fullWidth{
        width: 750px;
    }
    .bottomBtnBox:active {
        background-color: #eee;
    }
    .articleOutBox{
        position:absolute;bottom: 0;width: 750px;  top: 136px;
    }
    .collectText{
        font-size: 24px;line-height:24px;
    }
    .collectIcon{
        font-size: 35px;line-height: 35px;margin-bottom: 2px;
    }
    .laudActive{
        color: #888;
    }
    .bottomBtnBox{
        height: 100px;
        flex: 1;align-items: center;justify-content: center;
        flex-direction: column;
        padding-top:5px;
        padding-bottom:5px;
    }
    .fz26fff{
        font-size: 26px;
        line-height: 26px;
        color: #444;
    }
    .fzz45{
        font-size: 38px;
        line-height:38px;
        padding-bottom:10px;
    }
    .btnTextColor{
        color:#F0AD3C;
    }
    .btnTextSize{
        font-size: 32px;
        color: #fff;
    }
    .btnTextBox{
        background-color: #171717;
        padding-bottom: 12px;
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 12px;
        border-radius: 30px;
        flex-direction: row;
        align-items: center;
    }
    .templateBtn{
        position: fixed;
        /*bottom: 300px;*/
        /*bottom: 368px;*/
        left: 10px;
        right: 10px;
        flex-direction: row;
        justify-content: flex-end;
    }
    .imgActive{
        border-style: solid;
        border-color: #99ccff;
        border-width: 5px;
        border-radius: 20px;
    }
    .titleActive{
        background-color: #888;
    }
    .templateTitle{
        color: #ccc;
        font-size: 28px;
        margin-left: 10px;
        margin-right: 10px;
        padding-left: 13px;
        padding-right: 13px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 15px;
    }
    .templateImgBox{
        flex-direction: row;
        padding-bottom: 10px;
        padding-top: 20px;
        height:220px;
        background-color: #171717;

    }
    .templateTitleBox{
        flex-direction: row;
        height: 70px;
        align-items: center;
        background-color: #0A1217;
        opacity: 0.8;
    }
    .templateImg{
        width: 130px;
        height:190px;
        margin-left: 5px;
        margin-right: 5px;
        box-sizing: content-box;
    }

    .templateBox{
        /*height: 290px;*/
        position: fixed;
        left:0;
        right: 0;
        bottom: 0;
        /*background-color: #333;*/
        background-color: #0A1217;
    }
    .templateText{
        color: #444;
        font-size: 28px;
        line-height:28px;
    }
    .templateIcon{
        position: fixed;
        /*bottom: 135px;*/
        /*bottom: 203px;*/
        align-items: center;
        justify-content: center;
        border-radius: 45px;
        right: 30px;
        background-color: #fff;
        border-style:solid;
        border-width: 1px;
        border-color: #ccc;
    }
    .templateIconWH{
        width:90px;
        height:90px;
    }
    .textTemplateIcon{
        padding-left: 18px;
        padding-right: 18px;
        padding-top:31px;
        padding-bottom:31px;
    }

    .nextStep{
        color: #fff;
        font-size: 38px;
    }
    .footBox{
        align-items: center;
        justify-content: center;
        flex-direction: row;
        width:750px;
        /*height:100px;*/
        background-color: #fff;
        position: absolute;
        border-style:solid;
        border-top-width: 1px;
        border-color: #ccc;
        bottom:0;
    }
    .cb-top{
        border-top-width: 0px;
    }
    .webView{
        width:750px;
        position: absolute;
        top:0;
    }
    .doOpacity{
        opacity: 0;
    }
    .noOpacity{
        opacity: 1;
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    const dom = weex.requireModule('dom');
    const globalEvent = weex.requireModule('globalEvent');
    import navbar from './header.vue';
    import share from '../../include/share.vue'
    import utils from '../../assets/utils';
    import reward from '../../widget/rewardDialog.vue';
    import buyGoods from '../../widget/buyGoods.vue';
    const webview = weex.requireModule('webview');
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch'
    export default {
        data:function () {
            return{
                templateName:'经典',
                initTemplateName:'经典',
                templateSn:'1001',
                initTemplateSn:'1001',
                templateSaveId:'1',
                templateSaveName:'经典',
                templateChoose:false,
                webUrl:'',
                lastImageItem:'',
                lastTitleItem:'',
                articleId:'',
                templateId:'',
                templateList:[],
                publish:false,
                isOperation:false,
                isSelf:0,
                isCollect:false,
                laudNum:0,
                shareNum:0,
                reviewNum:0,
                isLaud:false,
                memberId:'',
                showShare:false,
                screenHeight:0,
                clicked:false,
                authorInfo:{
                    nickName:'initNickDefault'
                },
                scrollHeight:0,
                bottomNum:0,
                rewardShow:false,
                buyShow:false,
                noAppear:false,
//                isReview:false,
//                isReward:false,
            }
        },
        components: {
            navbar,share,reward,buyGoods
        },
        props: {
            title: { default: ""},
            complete:{ default : ''},
        },
        created(){
            var _this = this;
            utils.initIconFont();

            this.articleId = utils.getUrlParameter('articleId');
//            判断是iponex就动态获取底部上弹高度
            if(utils.previewBottom() != '' && utils.previewBottom() == 'IPhoneX'){
                this.bottomNum =parseInt(event.deviceInfo().bottomHeight) * 2;
            }

//            this.screenHeight = utils.fullScreen(305 );
            this.screenHeight = utils.fullScreen(237 + this.bottomNum);
            this.scrollHeight = utils.fullScreen(137);
            var isPublish = utils.getUrlParameter('publish');
//            如果不传就是null
            if(!utils.isNull(isPublish)){
                this.publish = isPublish;
            }


//            获取该文章的模版
            POST('weex/article/template.jhtml?id=' + this.articleId).then(
                function (data) {
                    if(data.type == 'success'){
                        _this.templateId = 't' + data.data;
                        _this.initTemplateSn = data.data;
                        _this.templateSn = data.data;
                        _this.webUrl = utils.articleUrl(_this.templateId,_this.articleId);
//                        _this.webUrl = 'http://weex.1xx.me/';
                    }else{
                        event.toast(data.content);
                    }
                },
                function (err) {
                    event.toast(err.content);
                }
            )
            GET('weex/article/preview.jhtml?id=' + this.articleId,function (data) {
                if( data.type=='success' && data.data != ''){
                    _this.memberId = data.data.memberId;
                    _this.reviewNum = data.data.review;
                    _this.laudNum = data.data.laud;
                    _this.isLaud = data.data.hasLaud;
                    _this.isCollect = data.data.hasFavorite;
                    _this.shareNum = data.data.share;
                    _this.authorInfo = data.data;
//                    _this.isReward = data.data.isReward;
                    _this.isReview = data.data.isReview;
                    let uId = event.getUId();
//            判断是否作者本人
                    if(uId == _this.memberId){
                        _this.isSelf = 1;
//                        跳出分享。
                        _this.relaseShare();
                        //获取所有的文章模版
                        GET('weex/member/template/list.jhtml?type=template',function (data) {
                            if(data.type == 'success' && data.data != ''){
                                _this.templateList = data.data;
                                _this.templateList.forEach(function (item) {
                                    item.templates.forEach(function (mes) {
                                        if (mes.sn == _this.templateSn) {
                                            _this.templateName = item.name;
                                            _this.initTemplateName = item.name;
                                        }
                                    })

//                                    if(item.templates.sn == _this.templateSn){
//                                        _this.templateName = item.name;
//                                    }
                                })
                            }
                        },function (err) {
                            event.toast(err.content);
                        })
                    }else{
                        _this.isSelf = 0;
                    }
                    if(_this.publish == 'false'){
                        _this.publish = false;
                        _this.complete = '编辑';
                        _this.title = '预览';
                    }else if(_this.publish == 'true' && _this.isSelf == 1){
                        _this.publish = true;
                        _this.complete = '操作';
                        _this.title = '文章详情';
                    }else if(_this.publish == 'true' && _this.isSelf == 0){
                        _this.publish = true;
                        _this.complete = 'textIcon';
                        _this.title = '';
                    }
                }else{
                    event.toast(data.content);
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods:{
//            页面被关闭
            pageDestroy:function(){

//                globalEvent.removeEventListener("buyGood");
            },
            pageShow:function(){

//            商品购买控制
//            globalEvent.addEventListener("buyGood", function (e) {
//                    _this.goodId = e.goodId;
//                    _this.buyShow = true;
//            });

            },
            articleOutBoxTop:function () {
                let dc = utils.artOutTop();
                return dc
            },
//            发布后直接跳出分享
            relaseShare(){
                let doneEdit = utils.getUrlParameter('showShare');
                if(!utils.isNull(doneEdit)){
                    this.showShare = doneEdit;
                }
            },
//            点击 图片 更换模版的触发
            tickImage(itemSn,itemId,thumName){
                this.templateSn= itemSn;
                this.templateId ='t' + itemSn;
                this.templateSaveId = itemId;
                this.templateSaveName = thumName;
                this.webUrl  = utils.articleUrl(this.templateId,this.articleId);
            },
            thumImgAppear(name){
                if(this.noAppear){
                    return;
                }
                this.templateName= name;
            },
//            点击 标题 更换模版类型的触发
            tickTitle(name){
                let _this = this;
                this.noAppear = true;
                this.templateName = name;
                this.scrollerToTemp();
                setTimeout(function () {
                    _this.noAppear=false;
                },300)
            },
            scrollerToTemp(hasAnimation){
                switch(this.templateName){
                    case '热门':
                        if(utils.isNull(this.$refs.热门)){
                            break;
                        }
                        var el = this.$refs.热门[0];
                        break;
                    case '经典':
                        if(utils.isNull(this.$refs.经典)){
                            break;
                        }
                        var el = this.$refs.经典[0];
                        break;
                    case '节日':
                        if(utils.isNull(this.$refs.节日)){
                            break;
                        }
                        var el = this.$refs.节日[0];
                        break;
                    case '四季':
                        if(utils.isNull(this.$refs.四季)){
                            break;
                        }
                        var el = this.$refs.四季[0];
                        break;
                    case '摄影':
                        if(utils.isNull(this.$refs.摄影)){
                            break;
                        }
                        var el = this.$refs.摄影[0];
                        break;
                    case '朦胧':
                        if(utils.isNull(this.$refs.朦胧)){
                            break;
                        }
                        var el = this.$refs.朦胧[0];
                        break;
                    case '请柬':
                        if(utils.isNull(this.$refs.请柬)){
                            break;
                        }
                        var el = this.$refs.请柬[0];
                        break;
                    case '可爱':
                        if(utils.isNull(this.$refs.可爱)){
                            break;
                        }
                        var el = this.$refs.可爱[0];
                        break;
                    case '活动':
                        if(utils.isNull(this.$refs.活动)){
                            break;
                        }
                        var el = this.$refs.活动[0];
                        break;
                    case '购物':
                        if(utils.isNull(this.$refs.购物)){
                            break;
                        }
                        var el = this.$refs.购物[0];
                        break;
                    case '政企':
                        if(utils.isNull(this.$refs.政企)){
                            break;
                        }
                        var el = this.$refs.政企[0];
                        break;
                    case '赏花':
                        if(utils.isNull(this.$refs.赏花)){
                            break;
                        }
                        var el = this.$refs.赏花[0];
                        break;
                    case '动态':
                        if(utils.isNull(this.$refs.动态)){
                            break;
                        }
                        var el = this.$refs.动态[0];
                        break;
                    case '旅行':
                        if(utils.isNull(this.$refs.旅行)){
                            break;
                        }
                        var el = this.$refs.旅行[0];
                        break;
                    case '假期':
                        if(utils.isNull(this.$refs.假期)){
                            break;
                        }
                        var el = this.$refs.假期[0];
                        break;
                    case '拼接':
                        if(utils.isNull(this.$refs.拼接)){
                            break;
                        }
                        var el = this.$refs.拼接[0];
                        break;
                    case '新春':
                        if(utils.isNull(this.$refs.新春)){
                            break;
                        }
                        var el = this.$refs.新春[0];
                        break;
                    default:
                        if(utils.isNull(this.$refs.热门)){
                            break;
                        }
                        var el = this.$refs.热门[0];
                        break;

                }
                if(!utils.isNull(hasAnimation)){
                    this.noScrollAnimation(el);
                    return;
                }
                dom.scrollToElement(el, {})
            },

            noScrollAnimation(el){
                dom.scrollToElement(el, {
                    animated:false,
                })
            },

//            点击模版按钮时
            chooseTemplate(){
                this.noAppear = true;
                this.templateChoose = !this.templateChoose;
                let _this = this;
                this.templateName = this.initTemplateName;
                setTimeout(function () {
                    _this.scrollerToTemp('2');
                },100)
                setTimeout(function(){
                    _this.noAppear=false;
                },600)
            },
//            点击模版完成按钮时
            chooseComplete(){
                let _this = this;
                this.chooseTemplate();
                if(this.initTemplateSn != this.templateSn){
//                    上传文章模版
                    POST('weex/member/article/update.jhtml?id='+this.articleId + '&templateId=' + this.templateSaveId).then(
                        function (data) {
//                            utils.debug(data);
                            if(data.type == 'success'){
                                _this.initTemplateSn = _this.templateSn;
                                _this.initTemplateName = _this.templateSaveName;
                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            },
//            点击编辑
            goComplete(){
                let _this = this;
                if(!this.publish){
                    if (this.clicked) {
                        return;
                    }
                    this.clicked = true;
                    setTimeout(function () {
                        _this.clicked = false;
                    },1500)
//                    event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + this.articleId),function (data) {
//                        if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
//                            let E = {
//                                isDone : 'complete'
//                            }
//                            let backData = utils.message('success','成功',E);
//                            event.closeURL(backData);
//                        }
//                    })
                    event.router(utils.locate('view/member/editor/editor.js?articleId=' + this.articleId));

                }else{
                    this.isOperation = true;
                }
            },
//            点击操作里的编辑
            operationEditor(){
                this.isOperation = false;
//                event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + this.articleId),function (data) {
//                    if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
//                        event.closeURL();
//                    }
//                })
                event.router(utils.locate('view/member/editor/editor.js?articleId=' + this.articleId));
            },
//            点击操作里的设置
            operationSet(){
                var _this = this;
                this.isOperation = false;
//                event.openURL(utils.locate('view/member/editor/option.js),
                event.openURL(utils.locate('view/member/editor/option.js?articleId=' + this.articleId),function (data) {
//                event.openURL('http://192.168.2.157:8081/option.weex.js?articleId=' + this.articleId, function (data) {
                });
            },
//            触碰遮罩层
            maskTouch(){
                this.isOperation = false;
                this.showShare = false;
            },
//            取消分享
            doCancel(){
                this.showShare = false;
            },
//            点击返回
            goback(){
//                event.closeURL();
                if(utils.isNull(utils.getUrlParameter('isRouter'))){
                    event.closeURL();
                }else{
                    event.closeRouter();
                }
            },
//            点击下一步 跳转文章设置。
            goOption(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate('view/member/editor/option.js?articleId=' + this.articleId),function (data) {
                    if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
//                        let E = {
//                            isDone : 'complete'
//                        }
//                        let backData = utils.message('success','成功',E);
//                        event.closeURL(backData);
                        _this.publish = true;
                        _this.showShare = true;
                        _this.complete = '操作';
                        _this.title = '文章详情';
                    }
                });
//                event.router(utils.locate('view/member/editor/option.js?articleId=' + _this.articleId));

            },
//            判断是否有模版，控制是否显示模版标题
            isNoTemplates(value){
                if(utils.isNull(value)){
                    return false;
                }else{
                    return true;
                }
            },
//
            goLaud(){
                var _this =this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)


                if(this.isSelf == 0){
                    if(this.isLaud){
                        POST('weex/member/laud/delete.jhtml?articleId=' + this.articleId).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.isLaud = false;
                                    _this.laudNum --;
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            }
                        )
                    }else{
                        POST('weex/member/laud/add.jhtml?articleId=' + this.articleId).then(
                            function (data) {
                                if(data.type == 'success'){
                                    _this.laudNum ++;
                                    _this.isLaud = true;
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            }
                        )
                    }
                }else{
                    event.openURL(utils.locate('view/member/editor/whoLaud.js?articleId=' + this.articleId),function (data) {
                    })
                }
            },
//            分享
            goShare(type){
                if(this.isSelf == 0 || type == 1){
                    this.showShare = true;
                    if(type == 1){
                        this.isOperation = false;
                    }
                }else{
                    let _this = this;
                    if (this.clicked) {
                        return;
                    }
                    this.clicked = true;
                    setTimeout(function () {
                        _this.clicked = false;
                    },1500)
                    event.openURL(utils.locate('view/member/editor/whoShare.js?articleId=' + this.articleId),function (data) {
                    })
                }
            },
//            前往评论
            goReview(){
                let _this = this;
//                if(!this.isReview){
//                    event.toast('该文章未开通评论功能');
//                    return;
//                }
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate('view/member/editor/review.js?articleId=' + this.articleId + '&authorId=' + this.memberId),function (data) {
                })
            },
//            收藏文章
            collectArticle(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                POST('weex/member/favorite/add.jhtml?articleId=' + this.articleId).then(
                    function (data) {
                        if(data.type == 'success'){
                            event.toast('收藏成功');
                            _this.isCollect = true;
                            event.sendGlobalEvent('onUserInfoChange',data);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    }
                )
            },
//            作者主页
            goAuthor(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate("view/topic/index.js?id=" + this.memberId),function (message) {
                    _this.isOperation = false;
                });
            },
//            举报
            report(){
                event.toast('举报');
            },
//            分享
            doShare(id){
                let _this = this;
                var shareType;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                switch(id){
                    case 0 :
                        shareType = 'timeline';
                        break;
                    case 1 :
                        shareType = 'appMessage';
                        break;
                    case 2 :
                        shareType = 'copyHref';
                        break;
                    case 3 :
                        shareType = 'browser';
                        break;
                    default:
                        shareType = '';
                        break;
                }
//                分享到公众号
                if(id == 4){
                    POST('weex/member/share/platform.jhtml?articleId=' + this.articleId).then(
                        function (data) {
                            _this.showShare = false;
                            if(data.type == 'success'){
                                event.toast('已成功分享到公众号');
                            }else{
                                event.toast(data.content);
                            }
                        },
                        function (err) {
                            event.toast(err.content);
                        }
                    )
                    return;
                }
                GET('share/article.jhtml?articleId=' + this.articleId + '&shareType=' +  shareType ,function (data) {

                    if(data.type == 'success' && data.data != ''){
                        var option = {
                            title:data.data.title,
                            text:data.data.descr,
                            imageUrl:data.data.thumbnail,
                            url:data.data.url,
                            type:shareType
                        }
                        _this.showShare = false;
                        event.share(option,function (data) {
                            if(data.type == 'success'){
//                                如果是作者本人就不推送分享。
                                if(_this.isSelf == 1){
                                    if(shareType == 'copyHref'){
                                        event.toast('文章链接已复制到剪贴板');
                                    }else if(shareType == 'browser'){
                                    }else{
                                        event.toast('分享成功');
                                    }
                                    return;
                                }
                                POST('weex/member/share/add.jhtml?articleId='+ _this.articleId + '&shareType=' + shareType).then(
                                    function (data) {
                                        if(data.type == 'success'){
                                            if(shareType == 'copyHref'){
                                                event.toast('文章链接已复制到剪贴板');
                                            }else if(shareType == 'browser'){
                                            }else{
                                                event.toast('分享成功');
                                            }
                                            _this.shareNum ++ ;
                                        }else{
                                            event.toast(data.content);
                                        }
                                    },
                                    function (err) {
                                        event.toast(err.content);
                                    }
                                )
                            }
                        })
                    }
                },function (err) {
                    event.toast(err.content);
                })

            },
//            生成长图
            longPic(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                webview.getLongImage(this.$refs.webView,function(data){
                    if(data.type == 'success'){
                        event.toast('长图已保存到相册里');
                        _this.isOperation = false;
                    }else{
                        event.toast(data.content);
                    }
                });
            },
//            删除文章
            deleteArticle(){
                let _this = this;
                modal.confirm({
                    message: '删除后文章将放入回收站,确认删除?',
                    duration: 0.3,
                    okTitle:'删除',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '删除'){
                        let findData = {
                            type:'article',
                            key:_this.articleId
                        }
                        event.find(findData,function (item) {
                            if(item.type == 'success' && item.data!=''){
                                item.data.value = JSON.parse(item.data.value);
                                item.data.value.articleOption.articleCatalog.id = 99;
                                item.data.value.articleOption.articleCatalog.name = '回收站';
                                let saveData = {
                                    type:item.data.type,
                                    key:item.data.key,
                                    value:JSON.stringify(item.data.value),
                                    sort:'0,0000000000',
                                    keyword:',[99],' + item.data.value.title + ','
                                }
                                event.save(saveData,function(data){
                                    if(data.type == 'success'){
                                        event.toast('删除成功');
//                                    全局监听文章变动
                                        let listenData = utils.message('success','文章改变','')
                                        event.sendGlobalEvent('onArticleChange',listenData);
                                        event.closeURL();
                                    }else{
                                        event.toast(data.content);
                                    };
                                });
                            };
                        });
                    };
                });
            },
            //关注
            doFocus(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                POST('weex/member/follow/add.jhtml?authorId=' + this.memberId).then(
                    function(data){
                        if(data.type == 'success'){
                            _this.authorInfo.hasFollow = true;
                            event.toast('关注成功')
                        }else{
                            event.toast(err.content);
                        }
                        _this.clicked = false;
                    },
                    function(err){
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )
            },
//            赞赏
            goReward(){
//                this.$refs.buy.show(55,342);
                this.rewardShow = true;
            },
            sendReward(m,id){
                let _this = this;
                POST("website/member/reward/submit.jhtml?amount="+m+"&articleId="+_this.articleId).then(
                    function (data) {
                        if (data.type=="success") {
                            if (id == 0) {
                                _this.payment(data.data,"weixinAppPlugin");
                            }else if (id == 1) {
                                _this.payment(data.data,"alipayH5Plugin");
                            }
                        } else {
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    }
                )
            },

            payment (sn,plugId) {
                var _this = this;
                POST("payment/submit.jhtml?sn="+ sn +"&paymentPluginId="+plugId).then(
                    function (data) {
                        setTimeout(function () {
                            _this.$refs.buy.waitHide();
                        },1000)
                        if (data.type=="success") {
                            event.wxAppPay(data.data,function (e) {
                                if (e.type=='success') {
                                    POST("payment/query.jhtml?sn="+ sn).then(
                                        function (mes) {
                                            if (mes.type=="success") {
                                                if (mes.data=="0000") {
                                                    _this.close(utils.message("success","success"));
                                                } else
                                                if (mes.data=="0001") {
                                                    _this.close(utils.message("error","error"));
                                                }
                                                else {
                                                    _this.close(utils.message("error","error"));
                                                }
                                            } else {
                                                _this.close(utils.message("error","error"));
                                            }
                                        },
                                        function (err) {
                                            _this.close(utils.message("error","error"));
                                        }
                                    )
                                } else {
                                    _this.close();
                                }
                            })
                        } else {
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast("网络不稳定");
                    }
                )
            },
            close (e) {
                this.rewardShow = false;
                if(utils.isNull(e)){
                    return;
                }
                if(e.type == 'success'){
                    event.toast('赞赏成功');
                }else{
                    event.toast('网络不稳定');
                }
            },
            maskHide(){
                this.buyShow = false;
            },
            goPay(id){
                this.payment(id,"weixinAppPlugin");
            }
//            复制文章\
//            copyArticle(){
//                POST('weex/member/article/grabarticle.jhtml').then(
//                    function (data) {
//                        utils.debug(data);
//                    },function (err) {
//                        utils.debug(err);
//                    }
//                )
//
//            }
        }

    }
</script>
