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
                        <text class="sub_title">{{category | watchCategory}}</text>
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
                        <switch class="switch" checked="true" @change="rewardChange"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">开启后本文可接现金打赏，获取收入</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">允许评论</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" checked="true" @change="commentsChange"></switch>
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
                        <switch class="switch" checked="true" @change="contributeChange"></switch>
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
        <div  class="footer button-panel">
            <text class="button" @click="goDone()">完成</text>
        </div>
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
    import {dom,event,stream,storage} from '../../../weex.js';
    var navigator = weex.requireModule('navigator');
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    import navbar from '../../../include/navbar.vue';
    const modal = weex.requireModule('modal');
    export default {
        data(){
            return{
                scope:0,
                category:3,
                password:'',
                corpusName:'全部文章',
                corpusId:0,
                rewardSwitch:true,
                commentsSwitch:true,
                contributeSwitch:true,
            }

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
            watchCategory(value){
                switch (value){
                    case 0 :
                        return '摄影';
                        break;
                    case 1 :
                        return '美文';
                        break;
                    case 2 :
                        return '旅行';
                        break;
                    case 3 :
                        return '其他';
                        break;
                    default:
                        return '其他';
                }
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "选项" }
        },
        methods: {
            goback: function (e) {
//                navigator.pop({
//                    url: 'http://cdn.rzico.com/weex/app/member/setup.js',
//                    animated: "true"
//                })
                event.closeURL();
            },
            setup: function (e) {
            },
//            跳转至选择范围
            goScope:function () {
                var _this = this;
//                event.openURL(utils.locate('view/member/editor/scope.js?checkId=' + this.scope),
                event.openURL('http://192.168.2.157:8081/scope.weex.js?checkId=' + _this.scope,
                    function (data) {
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
                var _this = this;
//                event.openURL(utils.locate('view/member/editor/category.js?checkId=' + this.scope),
                event.openURL('http://192.168.2.157:8081/category.weex.js?categoryId=' + _this.category,
                    function (data) {
                        if(data.type == 'success' && data.data != '') {
                            _this.category = parseInt(data.data.categoryId);
                        }
                    }
                );
            },
//            跳转至选择文集
            goChooseCorpus:function () {
                var _this = this;
//                event.openURL(utils.locate('view/member/editor/corpus.js?corpusId=' + this.corpusId),
                event.openURL('http://192.168.2.157:8081/chooseCorpus.weex.js?corpusId=' + _this.corpusId,
                    function (data) {
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
//            点击完成，进行发布
            goDone:function () {
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
                let topData = false;
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
                POST('weex/member/article/publish.jhtml?id=' + this.articleId + '&isPublish=' + this.contributeSwitch + '&isReview=' + this.commentsSwitch + '&isReward='
                    + this.rewardSwitch + '&authority=' + authorityData + '&isTop=' + topData + '&password=' + this.password + '&articleCatalogId=' + this.corpusId
                    + '&articleCategoryId=' + this.category).then(function (data) {
                    if(data.type == 'success'){
                        event.toast(data);
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
        }

    }
</script>