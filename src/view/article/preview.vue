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
            <div class="footBox bkg-white" :style="{height:bottomNum + 100,paddingBottom:bottomNum}" v-if="publish" >
                <div class="bottomBtnBox"  @click="goLaud()">
                    <text class="fz26fff fzz45 " :class="[isLaud ? 'primary' : '']" :style="{fontFamily:'iconfont'}">&#xe60c;</text>
                    <text class="fz26fff " :class="[isLaud ? 'primary' : '']">点赞 {{laudNum}}</text>
                </div>
                <div class="bottomBtnBox"  @click="goShare(0)">
                    <text class="fz26fff fzz45 " :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                    <text class="fz26fff ">分享 {{shareNum}}</text>
                </div>
                <div class="bottomBtnBox" @click="goReview()" v-if="isReview">
                    <text class="fz26fff fzz45 " :style="{fontFamily:'iconfont'}">&#xe65c;</text>
                    <text class="fz26fff ">评论 {{reviewNum}}</text>
                </div>
                <div class="bottomBtnBox"  @click="goReward()" v-if="isReward">
                    <text class="fz26fff fzz45 " :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    <text class="fz26fff ">赞赏 {{rewardNum}}</text>
                </div>
            </div>
            <!--模版-->
            <div  v-if="!templateChoose && isSelf == 1 && !showMoneyBox">
                <!--用text标签加上radius 在if重复渲染后不会出现渲染过程-->
                <text class="templateText templateIcon textTemplateIcon" :style="{bottom:bottomNum + 135}" @click="chooseTemplate()">模版</text>
            </div>
            <!--收藏-->
            <div class="templateIcon templateIconWH" :style="{bottom:bottomNum + 135}" @click="collectArticle()" key="collectIcon" v-if="isSelf == 0 && !isCollect && !showMoneyBox">
                <text class="templateText collectIcon" :style="{fontFamily:'iconfont'}">&#xe65d;</text>
                <text class="templateText collectText" >收藏</text>
            </div>


            <!--<div v-for="item in forAnimation">-->
            <div class="templateBtn" :style="{bottom:bottomNum + 300}" v-if="isSelf == 1 && templateChoose" >
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
            <transition name="tempAnima" tag="div">
                <!--模版内容-->
                <div class="templateBox" v-if="isSelf == 1 && templateChoose"  :style="{paddingBottom:bottomNum}">
                    <div>
                        <div>
                            <!--模版样图-->
                            <scroller  class="templateImgBox" scroll-direction="horizontal">
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
            <!--</div>-->

            <!--key="operationBox"-->
            <div v-if="isOperation && isSelf == 1">
                <div class="maskLayer" @touchstart="maskTouch"></div>
                <div v-for="item in forAnimation">
                    <transition-group name="operaAnima" tag="div">
                        <div class="showBox"  style="width: 230px;" key="operationBox" v-if="isOperation1">
                            <text class="showBg"></text>
                            <!--<div class="arrowUp">-->
                            <!--<text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>-->
                            <!--</div>-->
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
                    </transition-group>
                </div>
            </div>
            <div v-if="isOperation  && isSelf == 0">
                <div class="maskLayer" @touchstart="maskTouch"></div>
                <div v-for="item in forAnimation">
                    <transition-group name="operaAnima" tag="div" >
                        <div class="showBox" style="width: 230px;"  key="operationBox" v-if="isOperation1">
                            <text class="showBg"></text>
                            <!--<div class="arrowUp">-->
                            <!--<text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>-->
                            <!--</div>-->
                            <div class="flex-row pt25 pb25 pl35 pr35 textActive " @click="goAuthor">
                                <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe61d;</text>
                                <text class="fz28 pl10">作者主页</text>
                            </div>
                            <div class="flex-row pt25 pb25 pl35 pr35 textActive"  @click="goShare(1)">
                                <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe67d;</text>
                                <text class="fz28 pl10">分享</text>
                            </div>
                            <!--<div class="flex-row pt25 pb25 pl35 pr35 textActive"  @click="report">-->
                            <!--<text class="fz40" :style="{fontFamily:'iconfont'}">&#xe615;</text>-->
                            <!--<text class="fz28 pl10">举报</text>-->
                            <!--</div>-->
                        </div>
                    </transition-group>
                </div>
            </div>
            <div v-if="showShare"  key="share">
                <div class="maskLayer" @touchstart="maskTouch"></div>
            </div>
            <transition name="shareAnima" tag="div">
                <div v-if="showShare">
                    <share @doShare="doShare" :isSelf="isSelf" @doCancel="doCancel"></share>
                </div>
            </transition>

            <reward ref="reward" v-if="rewardShow" @close="close" @rewardNumber="sendReward" ></reward>
        </div>

        <!--红包窗口-->
        <div class="moneyBox" v-if="showMoneyBox1" @click="closeRedBag()">
            <div v-for="item in forAnimation">
                <!--添加动画-->
                <transition-group name="paraTransition" tag="div">
                    <div class="moneyInfoBox" key="redBagKey"v-if="showMoneyBox">
                        <div class="redBagHead"></div>
                        <image class="authorLogo" :src="redBagAuthorLogo"></image>
                        <div class="flex-row">
                            <text class="authorName">{{redBagAuthor | watchRedBagAuthor}}的红包</text>
                            <text class="pinIcon ml5" v-if="redPackageType == 'RAN'" :style="{fontFamily:'iconfont'}">&#xe769;</text>
                        </div>
                        <div>
                            <text class="hopeText">恭喜发财,大吉大利</text>
                        </div>
                        <div class="flex-row flex-end redPriceBox">
                            <text class="moneyNum">{{priceNum}}</text>
                            <text class="yuanText">元</text>
                        </div>
                        <div @click="goWallet()">
                            <text class="redEndText">已存入钱包,可前往钱包提现</text>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
        <!--<waitingBox  v-if="waitingShow"></waitingBox>-->
        <buyGoods ref="buy" v-if="buyShow" @goPay="goPay" @maskHide="maskHide" :goodId="goodId"></buyGoods>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style>

    /*分享选择动画*/
    .tempAnima-enter-active {
        transition: all 0.15s;
    }

    .tempAnima-enter{
        transform: translateY(150px);
        opacity: 0;
    }

    .tempAnima-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }


    /*模版选择动画*/
    .tempAnima-enter-active, .tempAnima-leave-active {
        transition: all 0.15s;
    }

    .tempAnima-leave-to{
        transform: translateY(150px);
        opacity: 0;
    }

    .tempAnima-leave{
        transform: translateY(0px);
        opacity: 1;
    }

    .tempAnima-enter{
        transform: translateY(150px);
        opacity: 0;
    }

    .tempAnima-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }

    /*!*操作动画*!*/
    .operaAnima-enter-active, .operaAnima-leave-active {
        /*transition: all 0.05s;*/
        transition: all 0.1s;
    }

    .operaAnima-leave-to{
        transform: translateY(0px);
        opacity: 0;
    }

    .operaAnima-leave{
        transform: translateY(0px);
        opacity: 1;
    }

    .operaAnima-enter{
        transform: translateY(0px);
        opacity: 0;
    }

    .operaAnima-enter-to{
        transform: translateY(0px);
        opacity: 1;
    }





    /* <!--红包动画-->*/
    .paraTransition-enter-active, .paraTransition-leave-active {
        /*transition: all 0.05s;*/
        transition: all 0.3s;
    }
    .paraTransition-leave-to{
        /*transform: translateY(-150px);*/
        transform: scale(0.1);
        opacity: 0;
    }
    .paraTransition-enter{
        /*transform: translateY(-150px);*/
        transform: scale(0.1);
        opacity: 0;
    }
    .paraTransition-enter-to{
        /*transform: translateY(0px);*/
        transform: scale(1);
        opacity: 1;
    }





    .pinIcon{
        color: coral;
        font-size: 32px;
    }

    .redBagHead{
        width:500px;
        height:200px;
        position: absolute;
        border-bottom-left-radius: 150px;
        border-bottom-right-radius: 150px;
        /*border-radius: 40% /  0 0 100% 100%;*/
        top: 0;
        background-color: #D34E38;
        z-index: -1;
    }

    .authorLogo{
        width: 100px;
        height: 100px;
        margin-top: 70px;
        border-radius: 5px;
        /*border: 1px solid coral;*/
        border-style: solid;
        border-width: 1px;
        border-color: coral;
    }

    .moneyBox{
        position: fixed;
        z-index: 1;
        right:0;
        bottom:0;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.8);
        color: #000;
    }

    .authorName{
        font-weight: 800;
        font-size: 32px;
        margin-top: 45px;
        margin-bottom: 45px;
    }

    .hopeText{
        font-size: 28px;
    }
    .redPriceBox{
        margin-top: 70px;
        margin-bottom: 40px;
    }
    .yuanText{
        font-size: 24px;
        padding-top: 20px;
    }
    .redEndText{
        font-size: 28px;
        color: #6f87b8;
        margin-top: 30px;
    }
    /*.moneyInfoBox :nth-child(4){*/
    /*font-size: 14px;*/
    /*}*/

    /*.moneyInfoBox :nth-child(5){*/
    /*margin-top: 20px;*/
    /*margin-bottom: 20px;*/
    /*}*/

    .moneyNum{
        font-size: 66px;
        font-weight: 600;
    }

    /*.moneyInfoBox :nth-child(6){*/
    /*font-size: 14px;*/
    /*color: #6F87B8;*/
    /*}*/

    .moneyInfoBox {
        position: fixed;
        z-index: 2000000000;
        width: 500px;
        min-height: 700px;
        top: 380px;
        left: 125px;
        background-color: #EFEFEF;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        /*padding:70px 0 25px  0;*/
        padding-top: 70px;
        padding-bottom: 25px;
    }
    /*       以上红包   =====*/


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
        font-size: 20px;line-height:20px;
    }
    .collectIcon{
        font-size: 42px;line-height: 42px;margin-bottom: 2px;
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
    const album = weex.requireModule('album');
    const animation = weex.requireModule('animation');
    const modal = weex.requireModule('modal');
    const dom = weex.requireModule('dom');
    const globalEvent = weex.requireModule('globalEvent');
    import navbar from './header.vue';
    import share from '../../include/share.vue';
    import utils from '../../assets/utils';
    import reward from '../../widget/rewardDialog.vue';
    import buyGoods from '../../widget/buyGoods.vue';
    //    import waitingBox from '../../widget/waiting.vue';
    const webview = weex.requireModule('webview');
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch'
    const storage = weex.requireModule('storage');
    export default {
        data:function () {
            return{
//                waitingShow:false,
                isOperation1:false,
                showMoneyBox1:false,
                forAnimation:[''],
                redPackageType:'RAN',
                isShareTime:false,
                priceNum:0,
                showMoneyBox:false,
                redBagAuthor:'',
                redBagAuthorLogo:utils.locate('resources/images/background.png'),
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
                rewardNum:0,
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
                isReview:false,
                isReward:false,
            }
        },
        components: {
            navbar,share,reward,buyGoods,
//            waitingBox
        },
        props: {
            title: { default: ""},
            complete:{ default : ''},
        },
        filters:{
            watchRedBagAuthor:function (value) {
                //              如果用户名称过长，便截取拼成名字
                if((utils.getLength(value) > 18)){
                    return utils.changeStr(value);
                }else{
                    return value;
                }
            }
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
                    let uId = event.getUId();
                    _this.memberId = data.data.memberId;

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
                        //判断已发布过的文章是否被作者修改过，删除或者未发布
                        if(!data.data.isPublish){
                            event.toast('该文章作者正在修改。')
                            //===!
                            if(utils.isNull(utils.getUrlParameter('isRouter'))){
                                event.closeURL();
                            }else{
                                event.closeRouter();
                            }
                            return;
                            //在这边直接调用goback方法 不起作用
//                            _this.goBack();
                        }
                    }

//                    07/25
                    _this.redBagAuthorLogo = data.data.logo;
                    _this.redBagAuthor = data.data.nickName;

                    _this.reviewNum = data.data.review;
                    _this.rewardNum = data.data.reward;
                    _this.laudNum = data.data.laud;
                    _this.isLaud = data.data.hasLaud;
                    _this.isCollect = data.data.hasFavorite;
                    _this.shareNum = data.data.share;
                    _this.authorInfo = data.data;
                    _this.isReward = data.data.isReward;
                    _this.isReview = data.data.isReview;
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
                globalEvent.removeEventListener("buyGood");
                globalEvent.removeEventListener("saveImage");
                globalEvent.removeEventListener("redBag");
            },
            pageShow:function(){
                let _this = this;
//            商品购买控制
                globalEvent.addEventListener("buyGood", function (e) {
//                utils.debug(e);
                    _this.goodId = e.goodId;
                    _this.buyShow = true;
                });

//            红包领取控制
                globalEvent.addEventListener("redBag", function (e) {
//                    _this.waitingShow = true;
//                    setTimeout(function () {
//                        _this.showMoneyBox1 = true;
//                        _this.waitingShow = false;
//                        setTimeout(function () {
//                            _this.showMoneyBox = true;
//                        },100)
//                    },100)
//                    return;

                    if(_this.isShareTime){
                        _this.redPackageType = e.type;
                        _this.takeRedBag();
                    }else{
                        event.toast('分享该文章到微信朋友圈后才可打开红包');
                    }
                });
//            图片保存控制
                globalEvent.addEventListener("saveImage", function (e) {
//                utils.debug(e);
                    album.saveImage(decodeURIComponent(e.url),function (mes) {
                        if(mes.type == 'success'){
                            event.toast('图片已保存到手机相册');
                        }else{
                            event.toast(mes.content);
                        }
                    })
                });
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
                this.templateChoose = !this.templateChoose;
                this.templateName = this.initTemplateName;
                if(this.initTemplateSn != this.templateSn){
//                    上传文章模版
                    POST('weex/member/article/update.jhtml?id='+this.articleId + '&templateId=' + this.templateSaveId).then(
                        function (data) {
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
                    setTimeout(function () {
                        _this.isOperation1 = true;
                    },100)
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
                    if(!utils.isNull(data.data.isDone) && data.data.isDone == 'complete') {

                        _this.isReward = data.data.isReward;
                        _this.isReview = data.data.isReview;
                    }
                });
            },
//            触碰遮罩层
            maskTouch(){
                let _this = this;
//                this.isOperation = false;
                this.isOperation1 = false;
                setTimeout(function () {
                    _this.isOperation = false;
                },150)
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
                        _this.isReward = data.data.isReward;
                        _this.isReview = data.data.isReview;
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
                    storage.getItem('reviewNum', e => {
                        if(e.result == 'success' && !utils.isNull(e.data)){
                            _this.reviewNum = e.data;
                            storage.removeItem('reviewNum');
                        }
                    })
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
//            report(){
//                event.toast('举报');
//            },
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
                                        if(shareType == 'timeline'){
                                            _this.isShareTime = true;
                                        }
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
                                                if(shareType == 'timeline'){
                                                    _this.isShareTime = true;
                                                }
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
//            举报
            report(){
                let _this = this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.toast("举报成功");
                _this.isOperation = false;
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
                var _this =this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                if(this.isSelf == 0){
                    this.rewardShow = true;
                }else{
                    event.openURL(utils.locate('view/member/editor/whoReward.js?articleId=' + this.articleId),function (data) {
                    })
                }
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
                        if(_this.buyShow){
                            setTimeout(function () {
                                _this.$refs.buy.waitHide();
                            },1000)
                        }
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
                    this.rewardNum ++;
                }else{
                    event.toast('网络不稳定');
                }
            },
            maskHide(){
                this.buyShow = false;
            },
            goPay(id){
                this.payment(id,"weixinAppPlugin");
            },
            closeRedBag:function () {
                let _this = this;
                this.showMoneyBox =  false;
                setTimeout(function () {
                    _this.showMoneyBox1 = false;
                },300)
            },
            goWallet:function () {
                var _this =this;
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.openURL(utils.locate('view/member/wallet/index.js'),
                    function (data) {
                    }
                );
            },
            takeRedBag:function () {
                let _this = this;
                POST("weex/member/article/getRedPackage.jhtml?articleId=" + this.articleId).then(
                    function (res) {
                        if (res.type=='success') {
                            _this.priceNum = res.data;
//                            _this.isShareTime = true;
                            _this.showMoneyBox1 = true;
                            setTimeout(function () {
                                _this.showMoneyBox = true;
                            },100)
                        }else{
                            event.toast(res.content);
                        }
                    },
                    function (err) {
                        event.toast(err.content);
                    }
                )
            },
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
