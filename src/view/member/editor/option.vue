<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row cell-line" @click="goScope()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">谁可以看</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{scope | watchScope}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">可自行控制文章展示范围</text>
            </div>
            <div class="cell-row cell-line" @click="goCategory()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">文章分类</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{categoryName}}</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">正确设置分类的文章将展示在“身边”栏目</text>
            </div>
            <div class="cell-row cell-line" @click="goChooseCorpus()">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">加入文集</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">{{corpusName}} </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">通过文集有效管理不同类型的文章</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">启用打赏</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :checked="rewardSwitch" @change="rewardChange"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">开启后本文可接现金赞赏，获取收入</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">允许评论</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :checked="commentsSwitch" @change="commentsChange"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">开启后读者可以对文章进行评论</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">投稿</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" :checked="contributeSwitch" @change="contributeChange"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">投稿后，被选用文章将获得大量展示机会</text>
            </div>
            <div class="fill">

            </div>

        </scroller>
        <!--<div class="footer button-panel" @click="goDone()">-->
        <!--<text class="button">完成</text>-->
        <!--</div>-->
        <div  class="footer button-panel" style="position: absolute">
            <text class="button" @click="goDone()">完成</text>
        </div>
        <!--遮罩-->
        <process  v-if="toSendArticle" :processWidth="processWidth" :currentPro="currentPro" :proTotal="proTotal" ></process>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>

<style scoped>
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .button-panel {
        padding-left: 60px;
        padding-right: 60px;
    }
    .switch {
        margin-right: 20px;
    }
</style>
<script>
    import process from '../../../widget/process.vue';
    import {dom,event,stream,storage} from '../../../weex.js';
    var navigator = weex.requireModule('navigator');
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    import navbar from '../../../include/navbar.vue';
    const modal = weex.requireModule('modal');
    export default {
        data(){
            return{
                toSendArticle:false,//控制进度条 遮罩显示
                currentPro:0,//当前进度
                proTotal:0,//总的进度
                processWidth:0,//进度条宽度
                scope:0,
                password:'',
                corpusName:'全部文章',
                corpusId:0,
                rewardSwitch:false,
                commentsSwitch:true,
                contributeSwitch:false,
                articleId:'',
                topData:false,
                isPublish:false,
                categoryName:'生活',
                category:7,
                clicked:false,
            }

        },
        created(){
            var _this = this;
            this.articleId = utils.getUrlParameter('articleId');
            GET('weex/member/article/option.jhtml?id=' + this.articleId,function (data) {
                if(data.type == 'success' && data.data != ''){
//                    event.toast(data);
//                    文集
                    if(!utils.isNull(data.data.articleCatalog)){
                        if(!utils.isNull(data.data.articleCatalog.name)){
                            _this.corpusName = data.data.articleCatalog.name;
                        } if(!utils.isNull(data.data.articleCatalog.id)){
                            _this.corpusId = data.data.articleCatalog.id;
                        }
                    }
                    //                    分类
                    if(!utils.isNull(data.data.articleCategory)){
                        if(!utils.isNull(data.data.articleCategory.name)){
                            _this.categoryName = data.data.articleCategory.name;
                        } if(!utils.isNull(data.data.articleCategory.id)){
                            _this.category = data.data.articleCategory.id;
                        }
                    }
//                    投稿
                    if(data.data.isPitch  != null){
                        _this.contributeSwitch = data.data.isPitch;
                    }
                    //                    置顶
                    if(data.data.isTop != null){
                        _this.topData = data.data.isTop;
                    }

                    //                    打赏
                    if(data.data.isReward != null){
                        _this.rewardSwitch = data.data.isReward;
                    }
                    //                    评论
                    if(data.data.isReview != null){
                        _this.commentsSwitch = data.data.isReview;
                    }
//                    谁可以看
                    if(!utils.isNull(data.data.authority)){
                        switch (data.data.authority){
                            case 'isPublic' ://公开
                                _this.scope = 0;
                                break;
                            case 'isShare' ://不公开
                                _this.scope = 1;
                                break;
                            case 'isEncrypt'://加密
                                _this.scope = 2;
                                break;
                            case 'isPrivate' ://私密
                                _this.scope = 3;
                                break;
                            default:
                                _this.scope = 0;
                                break;
                        }
                    }
                    //                    是否发布
                    if(data.data.isPublish != null){
                        _this.isPublish = data.data.isPublish;
                    }
                }
            },function (err) {
                event.toast(err.content);
            })
        },
        filters:{
            watchScope(value){
                switch (value){
                    case 0 :
                        return '公开';
                        break;
                    case 1 :
                        return '不公开';
                        break;
                    case 2 :
                        return '加密';
                        break;
                    case 3 :
                        return '私密';
                        break;
                    default:
                        return '公开';
                }
            },
        },
        components: {
            navbar,process
        },
        props: {
            title: { default: "选项" }
        },
        methods: {
            goback: function (e) {
                event.closeURL();
//                event.closeRouter();
            },
            setup: function (e) {
            },
//            跳转至选择范围
            goScope:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/editor/scope.js?checkId=' + this.scope),
//                event.openURL('http://192.168.2.157:8081/scope.weex.js?checkId=' + _this.scope,
                    function (data) {
                    _this.clicked = false;
                        if(data.type == 'success' && data.data != '') {
                            _this.scope = parseInt(data.data.checkId);
                            if (data.data.checkId == 2 && !utils.isNull(data.data.password)) {
                                _this.password = data.data.password;
                            }
                        }
                    }
                );
            },
//            跳转至选择类别
            goCategory:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('widget/list.js?listId=' + this.category + '&type=article_category'),
//                event.openURL('http://192.168.2.157:8081/category.weex.js?categoryId=' + _this.category + '&type=article_category',
                    function (data) {
                    _this.clicked = false;
                        if(data.type == 'success' && data.data != '') {
                            _this.category = parseInt(data.data.listId);
                            _this.categoryName = data.data.listName;
                        }
                    }
                );
            },
//            跳转至选择文集
            goChooseCorpus:function () {
                var _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                event.openURL(utils.locate('view/member/editor/chooseCorpus.js?corpusId=' + this.corpusId  + '&articleId=' +  this.articleId),
//                event.openURL('http://192.168.2.157:8081/chooseCorpus.weex.js?corpusId=' + _this.corpusId,
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            _this.corpusId = parseInt(data.data.corpusId);
                            _this.corpusName = data.data.corpusName;
                        }
                    }
                );
            },
//            打赏开关
            rewardChange:function (e) {
                this.rewardSwitch = e.value;
            },
//            评论开关
            commentsChange:function (e) {
                this.commentsSwitch = e.value;
            },
//            投稿开关
            contributeChange:function (e) {
                this.contributeSwitch = e.value;
            },
//            清楚掉假的进度条。清空假进度条，关闭定时器.
            clearDummyProcess(timer){
//                                        解除定时器
                if (!utils.isNull(timer))  {
                    clearInterval(timer);
//                  此处的timer虽然是参数传过来，在js里还是有把整个变量地址传过来.所以可以更改为null;
                    timer = null;
                }
                this.currentPro = 0;//当前进度
                this.proTotal = 0;//总的进度
                this.processWidth = 0;//进度条宽度
                this.toSendArticle = false;
            },
//            点击完成，进行发布
            goDone:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;

                _this.toSendArticle = true;
                _this.currentPro = 0;//当前进度
                _this.proTotal = 1;//总的进度
                _this.processWidth = 0;//进度条宽度
                _this.processWidth = _this.processWidth  + (70 * Math.random());
//                                  利用定时器 模拟进度条效果
                var timer = setInterval(function () {
                    if(_this.processWidth < 500){
                        let middle = _this.processWidth  + (70 * Math.random()) ;
                        if(middle > 500){
                            _this.processWidth = 500;
                        }else{
                            _this.processWidth = middle;
                        }
                    }
                },200);


                var authorityData ='';
                switch (this.scope){
                    case 0 ://公开
                        authorityData = 'isPublic';
                        break;
                    case 1 ://不公开
                        authorityData = 'isShare';
                        break;
                    case 2 ://加密
                        authorityData = 'isEncrypt';
                        break;
                    case 3 ://私密
                        authorityData = 'isPrivate';
                        break;
                    default:
                        authorityData = 'isPublic';
                        break;
                }
//                传给服务器的数据
//                var publishData = {
//                    id:this.articleId,
//                    isPublish:this.contributeSwitch,
//                    isReview:this.commentsSwitch,
//                    isReward:this.rewardSwitch,
//                    authority:authorityData,
//                    isTop:topData,
//                    password:this.password,
//                    articleCatalogId:this.corpusId,
//                    articleCategoryId:this.category
//                }
//                publishData = JSON.stringify(publishData);
                let urlData = 'weex/member/article/publish.jhtml?id=' + this.articleId + '&isPublish=' + this.contributeSwitch + '&isReview=' + this.commentsSwitch + '&isReward='
                    + this.rewardSwitch + '&authority=' + authorityData + '&isTop=' + this.topData + '&password=' + this.password + '&articleCatalogId=' + this.corpusId
                    + '&articleCategoryId=' + this.category;
//                event.toast(urlData);
                POST(urlData).then(function (data) {
//                    event.toast(data);
//                    将服务器返回回来的最新文章信息 存入缓存。
                    if(data.type == 'success'){
                        //            获取当前时间戳 作为唯一标识符key
                        var timestamp = Math.round(new Date().getTime()/1000);
                        let resDataStr = JSON.stringify(data.data);
                        var sortStatus = data.data.articleOption.isTop  == true ? '1,' : '0,';
                        let saveData = {
                            type:'article',
                            key:_this.articleId,
                            value:resDataStr,
                            sort:sortStatus + timestamp +'',
                            keyword:',['+ _this.corpusId + '],' + data.data.title + ','
                        }
//                        event.toast(saveData);
//                1是置顶（默认倒序）  keyword ",[1],文章title,"
                        event.save(saveData,function(data) {
                            if (data.type == 'success') {
                                _this.processWidth = 500;//进度条宽度
//                                event.toast('设置成功');
//                                全局监听 文章变动
                                let listenData = utils.message('success','文章改变','')
                                event.sendGlobalEvent('onArticleChange',listenData);
//                                let E = {
//                                    isDone : 'complete'
//                                }
//                                let backData = utils.message('success','成功',E);
//                                event.closeURL(backData);

                                if (!utils.isNull(timer))  {
                                    clearInterval(timer);
//                  此处的timer虽然是参数传过来，在js里还是有把整个变量地址传过来.所以可以更改为null;
                                    timer = null;
                                }

                                let E = {
                                    isDone : 'complete'
                                }
                                let backData = utils.message('success','成功',E);
                                event.closeURL(backData);

//                              event.router(utils.locate('view/article/preview.js?articleId=' + _this.articleId  + '&publish=true' + '&showShare=true'));
                            } else {
                                event.toast(data.content);
                                _this.clearDummyProcess(timer);
                            }
                        })
                    }else{
                        event.toast(data.content);
                        _this.clearDummyProcess(timer);
                    }
                    _this.clicked = false;
                },function (err) {
                    _this.clicked = false;
                    event.toast(err.content);
                    _this.clearDummyProcess(timer);
                })
            },
        }

    }
</script>