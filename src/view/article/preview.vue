<template>
    <scroller class="wrapper">
        <!--导航栏-->
        <navbar :title="title"  @goback="goback" :complete="complete" @goComplete="goComplete"></navbar>
        <!--网页-->
        <web class="webView" ref="webView" :style="{height:screenHeight}" :src="webUrl"></web>
        <!--下一步-->
        <div class="footBox bkg-primary" v-if="!publish"  @click="goOption()">
            <text class="nextStep">下一步</text>
        </div>
        <!--点赞 评论 分享-->
        <div class="footBox " v-if="publish" >
            <div class="bottomBtnBox" @click="goLaud()">
                <text class="fz26fff fz45" :class="[isLaud ? 'primary' : '']" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                <text class="fz26fff"  :class="[isLaud ? 'primary' : '']">点赞 {{laudNum}}</text>
            </div>
            <div class="bottomBtnBox"  @click="goShare(0)">
                <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                <text class="fz26fff">分享 {{shareNum}}</text>
            </div>
            <div class="bottomBtnBox" @click="goReview()">
                <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                <text class="fz26fff">评论 {{reviewNum}}</text>
            </div>
        </div>
        <!--模版-->
        <div class="templateIcon "  @click="chooseTemplate()" key="templateIcon" v-if="!templateChoose && isSelf == 1">
            <text class="templateText" >模版</text>
        </div>
        <!--收藏-->
        <div class="templateIcon "  @click="collectArticle()" key="collectIcon" v-if="isSelf == 0 && !isCollect">
            <text class="templateText collectIcon"  :style="{fontFamily:'iconfont'}">&#xe63d;</text>
            <text class="templateText collectText" >收藏</text>
        </div>
        <transition name="slide-fade" mode="out-in">
            <!--模版内容-->
            <div class="templateBox" v-if="isSelf == 1 && templateChoose"  key="templateContent">
                <div class="templateBtn">
                    <!--<div class="btnTextBox">-->
                    <!--<text class="btnTextSize" :style="{fontFamily:'iconfont'}">&#xe608;</text>-->
                    <!--<text class="btnTextSize " style="padding-left: 10px">图上字下</text>-->
                    <!--</div>-->
                    <div class="btnTextBox"  @click="chooseComplete()">
                        <text class="btnTextSize btnTextColor" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
                        <text class="btnTextSize btnTextColor" style="padding-left: 10px">完成</text>
                    </div>
                </div>
                <div>
                    <div>
                        <!--模版样图-->
                        <scroller  class="templateImgBox"  scroll-direction="horizontal" >
                            <div   v-for="(thumImg,index) in templateList" style="flex-direction: row">
                                <image v-for="(item,index) in thumImg.templates" :src="item.thumbnial" resize="cover"  :class="[item.sn == templateSn ? 'imgActive': '','templateImg']" @click="tickImage(item.sn)"></image>
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
            <div class="mask" @touchstart="maskTouch"></div>
            <div class="operationBox"  style="width: 230px;">
                <div class="arrow-up" >
                    <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive " style="width: 230px;" @click="operationEditor">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                    <text class="fz28 pl10">编辑</text>
                </div>
                <!--<div class="flex-row pt25 pb25 pl35 pr35 textActive">-->
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
            <div class="mask" @touchstart="maskTouch"></div>
            <div class="operationBox"  style="width: 230px;">
                <div class="arrow-up" >
                    <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive " style="width: 230px;" @click="goAuthor">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                    <text class="fz28 pl10">作者主页</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive"  @click="goShare(1)">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                    <text class="fz28 pl10">分享</text>
                </div>
            </div>
        </div>
        <!--动画无效-->
        <!--<transition name="slide-fade-share" mode="out-in">-->
        <div v-if="showShare"  key="share">
            <div class="mask" @touchstart="maskTouch"></div>
            <share @doShare="doShare" @doCancel="doCancel"></share>
        </div>
        <!--模版内容-->
        <!--</transition>-->
    </scroller>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>
    .collectText{
        font-size: 24px;line-height:24px;
    }
    .collectIcon{
        font-size: 35px;line-height: 35px;margin-bottom: 2px;
    }
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color: #000;opacity: 0.5;
    }
    .laudActive{
        color: #888;
    }
    .arrow-up {
        position: fixed;top: 146px;right:30px;
    }
    .operationBox{
        position: fixed;top: 150px;right: 15px;background-color:#fff;border-radius: 20px;padding-top: 20px;padding-bottom: 20px;
    }
    .bottomBtnBox{
        flex: 1;align-items: center;justify-content: center;
    }
    .fz26fff{
        font-size: 26px;
        line-height: 26px;
        color: #444;
    }
    .fz45{
        font-size: 50px;
        line-height:50px;
    }
    /*.slide-fade-share-enter-active {*/
    /*transition: all 2s ease;*/
    /*}*/
    /*.slide-fade-share-enter{*/
    /*transform: translateY(300px);*/
    /*opacity: 1;*/
    /*}*/

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .2s ease;
    }
    /*.slide-fade-leave-active {*/
    /*transition: all .2s ease;*/
    /*}*/
    /*.slide-fade-leave-to{*/
    /*transform: translateY(300px);*/
    /*opacity: 1;*/
    /*}*/
    .slide-fade-enter{
        transform: translateY(300px);
        opacity: 1;
    }
    .slide-fade-enter-to{
        transform: translateY(0px);
        opacity: 1;
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
        bottom: 300px;
        left: 10px;
        right: 10px;
        flex-direction: row;
        justify-content: flex-end;
    }
    .imgActive{
        border-style: solid;
        border-color: #D9141E;
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
        height: 290px;
        position: fixed;
        left:0;
        right: 0;
        bottom: 0;
        background-color: #333;
    }
    .templateText{
        color: #444;
        font-size: 28px;
    }
    .templateIcon{
        position: fixed;
        bottom: 135px;
        align-items: center;
        justify-content: center;
        border-radius: 45px;
        right: 30px;
        width:90px;
        height:90px;
        background-color: #fff;
        border-style:solid;
        border-width: 1px;
        border-color: #ccc;
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
        height:100px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-style:solid;
        border-top-width: 1px;
        border-color: #ccc;
    }
    .webView{
        width:750px;
        position: absolute;
        top:136px;
        /*bottom: 100px;*/
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    import navbar from '../../include/navbar.vue'
    import share from '../../include/share.vue'
    import utils from '../../assets/utils';
    const webview = weex.requireModule('webview');
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch'
    export default {
        data:function () {
            return{
                templateName:'热门',
                templateSn:'1001',
                initTemplateSn:'1001',
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
            }
        },
        components: {
            navbar,share
        },
        props: {
            title: { default: "预览"},
            complete:{ default : '编辑'}
        },
        created(){
            var _this = this;
            utils.initIconFont();
            this.articleId = utils.getUrlParameter('articleId');
            this.screenHeight = utils.fullScreen(237);
            var isPublish = utils.getUrlParameter('publish');
//            如果不传就是null
            if(isPublish == null){
            }else{
                this.publish = isPublish;
            }

//            获取该文章的模版
            POST('weex/article/template.jhtml?id=' + this.articleId).then(
                function (data) {
                    if(data.type == 'success'){
                        _this.templateId = 't' + data.data;
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
                    let uId = event.getUId();
//            判断是否作者本人
                    if(uId == _this.memberId){
                        _this.isSelf = 1;
                        //获取所有的文章模版
                        GET('weex/member/template/list.jhtml?type=template',function (data) {
                            if(data.type == 'success' && data.data != ''){
                                _this.templateList = data.data;
                                _this.templateList.forEach(function (item) {
                                    if(item.templates.sn == data.data){
                                        _this.templateName = item.name;
                                    }
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
                        _this.title = '文章详情';
                    }
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        methods:{
//            点击 图片 更换模版的触发
            tickImage(itemSn){
                this.templateSn= itemSn;
                this.templateId ='t' + itemSn;
                this.webUrl  = utils.articleUrl(this.templateId,this.articleId);
            },
//            点击 标题 更换模版类型的触发
            tickTitle(name){
                this.templateName= name;
            },
//            点击模版按钮时
            chooseTemplate(){
                this.templateChoose = !this.templateChoose;
            },
//            点击模版完成按钮时
            chooseComplete(){
                let _this = this;
                this.chooseTemplate();
                if(this.initTemplateSn != this.templateSn){
//                    上传文章模版
                    POST('weex/member/article/update.jhtml?id='+this.articleId + '&templateId=' + this.templateSn).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.initTemplateSn = _this.templateSn;

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
                if(!this.publish){
                    event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + this.articleId),function (data) {
                        if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
                            let E = {
                                isDone : 'complete'
                            }
                            let backData = utils.message('success','成功',E);
                            event.closeURL(backData);
                        }
                    })
                }else{
                    this.isOperation = true;
                }
            },
//            点击操作里的编辑
            operationEditor(){
                this.isOperation = false;
                event.openURL(utils.locate('view/member/editor/editor.js?articleId=' + this.articleId),function (data) {
//                event.openURL('http://192.168.2.157:8081/editor.weex.js?articleId=' + this.articleId,function () {
//                    _this.updateArticle();
                    if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
                        event.closeURL();
                    }
                })
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
                event.closeURL();
            },
//            点击下一步 跳转文章设置。
            goOption(){
                var _this = this;
//                event.openURL(utils.locate('view/member/editor/option.js),

                event.openURL(utils.locate('view/member/editor/option.js?articleId=' + this.articleId),function (data) {
//                event.openURL('http://192.168.2.157:8081/option.weex.js?articleId=' + this.articleId, function (data) {
                    if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete'){
                        let E = {
                            isDone : 'complete'
                        }
                        let backData = utils.message('success','成功',E);
                        event.closeURL(backData);
                    }
                });
            },
//            判断是否有模版，控制是否显示模版标题
            isNoTemplates(value){
                if(utils.isNull(value)){
                    return false;
                }else{
                    return true;
                }
            },
//            点赞
            goLaud(){
                if(this.isSelf == 0){
                    var _this =this;
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
                    event.openURL(utils.locate('view/member/editor/whoShare.js?articleId=' + this.articleId),function (data) {
                    })
                }
            },
//            前往评论
            goReview(){
                event.openURL(utils.locate('view/member/editor/review.js?articleId=' + this.articleId + '&authorId=' + this.memberId),function (data) {
                })
            },
//            收藏文章
            collectArticle(){
                let _this = this;
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
                var shareType;
                let _this = this;
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
                                POST('weex/member/share/add.jhtml?articleId='+ _this.articleId + '&shareType=' + shareType).then(
                                    function (data) {
                                        if(data.type == 'success'){
                                            if(shareType == 'copyHref'){
                                                event.toast('复制成功');
                                            }else{
                                                event.toast('分享成功');
                                            }

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
        }
    }
</script>