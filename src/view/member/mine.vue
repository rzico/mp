<!-- 个人中心 -->
<template>
    <div class="wrapper">
        <!--此处div 不能注释...否则ios某些机型无法置顶-->
        <div>
            <!--顶部白色区域 classHeader(), -->
            <div class="header headerMore bkg-primary" :style="{opacity: opacityNum}" :class="[classHeader(),opacityNum == 0 ? 'novisible' : 'isvisible']">
                <!--顶部导航-->
                <div class="nav nw">
                    <div style="width: 50px;">
                    </div>
                    <!--导航栏名字头像-->
                    <div class="userBox"  v-if="settingColor == 'white'">
                        <image class="headImg" :src="imageUrl"></image>
                        <text class="navText">{{userName | watchNickName}}</text>
                    </div>
                    <div style="width: 50px;">
                    </div>
                </div>
                <!--导航栏设置-->
                <div class=" rightTop " :class="[classTop()]" @click="goOption()">
                    <text :style="{fontFamily:'iconfont'}" style="font-size:50px;color: #fff">&#xe62d;</text>
                </div>
            </div>

        </div>

        <scroller show-scrollbar="false" offset-accuracy="0" ref="scrollerRef" @loadmore="onloading" loadmoreoffset="2000" @scroll="scrollHandler" :scrollable="canScroll">
            <div class="" style="position: relative">
            <!--判断是否到顶部，关闭那个顶部导航栏显示效果-->
            <div style="position:absolute;top: 0;width: 1px;height: 1px;opacity: 0;" @appear="toponappear"></div>
                <topic_header :logo="imageUrl" :userName="userName" :userSign="userSign" :occupation="occupation" :imgBg="imgBg" :fans="fans" :focus="focusNum" :collect="collectNum" :showType="showType"  @setting="goAttribute" @goFans="goFans" @goCollect="goCollect" @goFocus="goFocus" @goWallet="goWallet" @goManage="goOption" @goShare="beginShare"></topic_header>
            <!--顶部个人信息栏-->
            <!--收藏，钱包，关注-->
                <div style=" margin-top: 410px;"></div>
            <!-- 我的订单 -->
            <!--<div class="contentBox" v-if="member.activated && member.hasShop && filter('order')">-->
                <!--<div class="boder-bottom pl20 pr20 space-between headTitle" @click="goOrderList()">-->
                    <!--<text class="fz30">我的订单</text>-->
                    <!--<div class="flex-row">-->
                    <!--<text class="iconfontText" style="padding-right: 10px;">查看所有</text>-->
                    <!--<text :style="{fontFamily:'iconfont'}" class="iconfontText">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash; 订单消息 &ndash;&gt;-->
                <!--<div class="comWrap">-->
                    <!--<div class=" flexCol iconBox"  @click="goNoPay()">-->
                        <!--<text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe6e2;</text>-->
                        <!--<text class="iconfontText ">待付款</text>-->
                        <!--<div class="shippingNumberBox"  v-if="conut.unpaid != 0">-->
                        <!--<text class="shippingNumber">{{conut.unpaid}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class=" flexCol iconBox"  @click="goNoDelivery()">-->
                        <!--<text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe718;</text>-->
                        <!--<text class="iconfontText ">待发货</text>-->
                        <!--<div class="shippingNumberBox" v-if="conut.unshipped != 0">-->
                        <!--<text class="shippingNumber" >{{conut.unshipped}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class=" flexCol iconBox"  @click="goDelivery()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" class="iconfontSize primary">&#xe72c;</text>-->
                        <!--<text class="iconfontText ">已发货</text>-->
                        <!--<div class="shippingNumberBox" v-if="conut.shipped != 0">-->
                        <!--<text class="shippingNumber" >{{conut.shipped}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class=" flexCol iconBox"  @click="goRefund()">-->
                        <!--<text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xea20;</text>-->
                        <!--<text class="iconfontText ">待退款</text>-->
                        <!--<div class="shippingNumberBox" v-if="conut.refund != 0">-->
                        <!--<text class="shippingNumber" >{{conut.refund}}</text>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
                <!--&lt;!&ndash; 我的运单 &ndash;&gt;-->
                <!--<div class="contentBox" v-if="member.activated && member.hasShop && filter('shipping')">-->
                    <!--<div class="boder-bottom pl20 pr20 space-between headTitle" @click="shippingManage()">-->
                        <!--<text class="fz30">我的运单</text>-->
                        <!--<div class="flex-row">-->
                            <!--<text class="iconfontText" style="padding-right: 10px;">查看所有</text>-->
                            <!--<text :style="{fontFamily:'iconfont'}" class="iconfontText">&#xe630;</text>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--&lt;!&ndash; 订单消息 &ndash;&gt;-->
                    <!--<div class="comWrap">-->
                        <!--<div class=" flexCol iconBox"  @click="goConfirm()">-->
                            <!--<text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe6e2;</text>-->
                            <!--<text class="iconfontText ">待确认</text>-->
                            <!--<div class="shippingNumberBox"  v-if="shippingConut.unconfirmed != 0">-->
                                <!--<text class="shippingNumber">{{shippingConut.unconfirmed}}</text>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class=" flexCol iconBox"  @click="goToMask()">-->
                            <!--<text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xe718;</text>-->
                            <!--<text class="iconfontText ">预约单</text>-->
                            <!--<div class="shippingNumberBox" v-if="shippingConut.hope != 0">-->
                                <!--<text class="shippingNumber" >{{shippingConut.hope}}</text>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class=" flexCol iconBox"  @click="goOnTheWay()">-->
                            <!--<text :style="{fontFamily:'iconfont'}" class="iconfontSize primary">&#xe72c;</text>-->
                            <!--<text class="iconfontText ">配送中</text>-->
                            <!--<div class="shippingNumberBox" v-if="shippingConut.confirmed != 0">-->
                                <!--<text class="shippingNumber" >{{shippingConut.confirmed}}</text>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class=" flexCol iconBox"  @click="goaArive()">-->
                            <!--<text :style="{fontFamily:'iconfont'}"  class="iconfontSize primary">&#xea20;</text>-->
                            <!--<text class="iconfontText ">已送达</text>-->
                            <!--<div class="shippingNumberBox" v-if="shippingConut.completed != 0">-->
                                <!--<text class="shippingNumber" >{{shippingConut.completed}}</text>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!-- 我的文章 -->
            <div class="contentBox" v-if="filter('topic')">
                <div class="boder-bottom pl20 pr20 space-between headTitle" @click="goMemberIndex()">
                    <text class="fz30">我的专栏</text>
                    <div class="flex-row">
                    <text class="iconfontText" style="padding-right: 10px;">查看所有</text>
                    <text :style="{fontFamily:'iconfont'}" class="iconfontText">&#xe630;</text>
                    </div>
                </div>
                <!-- 文章列表 -->
                <div class="comWrap" >
                    <!--<div class=" flexCol" @click="editor()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style=" color: #66ccff" class="iconfontSize">&#xe65f;</text>-->
                        <!--<text class="fz30 mt20">写文章</text>-->
                    <!--</div>-->
                    <div v-for="a in articleThree" v-if="articleThree.length != 0">
                    <div class=" articleBox" @click="goArticle(a.id)">
                        <image class="articleImg" :src="a.thumbnail"></image>
                        <text class="articleImgText">{{a.title}}</text>
                    </div>
                    </div>
                    <div class="unArticleBox" v-if="articleThree.length == 0" @click="jumpEditor()">
                        <text :style="{fontFamily:'iconfont'}"  style="color: #66ccff;font-size: 70px">&#xe65f;</text>
                        <text class="fz26 mt10" style="color: #cccccc">点击发表文章</text>
                    </div>
                </div>
            </div>
            <!-- 必备工具 -->
            <div class="contentBox" style="margin-bottom: 100px;">
                <div class="boder-bottom pl20 pr20 space-between headTitle">
                    <text class="fz30">必备工具</text>
                </div>
                <!-- 帖子列表 -->
                <div class="circleWrap">
                    <!--<div class="iconBox flexCol mt20"  @click="goOption()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #66ccff" class="iconfontSize">&#xe651;</text>-->
                        <!--<text class="iconfontText mt20">通用设置</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.hasTopic" @click="goTopic()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style=" color: #66ccff" class="iconfontSize">&#xe6a4;</text>-->
                        <!--<text class="iconfontText mt20">我的专栏</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.isShop && member.hasShop" @click="store()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #66ccff" class="iconfontSize">&#xe628;</text>-->
                        <!--<text class="iconfontText mt20">店铺管理</text>-->
                    <!--</div>-->
                    <div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('fill')" @click="fill()">
                        <text :style="{fontFamily:'iconfont'}"  class="iconfontSize" style="color: #5A427C">&#xe6e8;</text>
                        <text class="iconfontText mt20">人工报单</text>
                    </div>
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop" @click="gocard()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #cc3300" class="iconfontSize">&#xe66a;</text>-->
                        <!--<text class="iconfontText mt20">会员卡</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('coupon')" @click="gocoupon()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #33cc99" class="iconfontSize">&#xe7fc;</text>-->
                        <!--<text class="iconfontText mt20">优惠券</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('distribution')" @click="godistribution()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #cc9900" class="iconfontSize">&#xe668;</text>-->
                        <!--<text class="iconfontText mt20">新营销</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20"   v-if="member.activated && member.hasShop && filter('order')" @click="goOrderList()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style=" color: #66ccff" class="iconfontSize">&#xe665;</text>-->
                        <!--<text class="iconfontText mt20">订单管理</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20"  v-if="member.activated && member.hasShop && filter('shipping')" @click="shippingManage()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style=" color: #996600" class="iconfontSize">&#xe66e;</text>-->
                        <!--<text class="iconfontText mt20">送货管理</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('shop')" @click="shop()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #336666" class="iconfontSize">&#xe66d;</text>-->
                        <!--<text class="iconfontText mt20">店铺管理</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('manage')"  @click="goodsManage()" >-->
                        <!--<text :style="{fontFamily:'iconfont'}" style=" color: #cc66cc" class="iconfontSize">&#xe667;</text>-->
                        <!--<text class="iconfontText mt20">商品管理</text>-->
                    <!--</div>-->
                    <div class="iconBox flexCol mt20"  v-if="!member.hasShop && !member.activated" @click="goShop()">
                        <text :style="{fontFamily:'iconfont'}" style=" color: #66ccff" class="iconfontSize">&#xe662;</text>
                        <text class="iconfontText mt20">我要开店</text>
                    </div>
                    <div class="iconBox flexCol mt20"  v-if="member.hasShop && !member.activated" @click="activated()">
                        <text :style="{fontFamily:'iconfont'}" style=" color: #B72A65" class="iconfontSize">&#xe6ce;</text>
                        <text class="iconfontText mt20">激活店铺</text>
                    </div>
                    <div class="iconBox flexCol mt20"  v-if="member.hasShop && !member.activated" @click="modification()">
                        <text :style="{fontFamily:'iconfont'}" style=" color: #66ccff" class="iconfontSize">&#xe662;</text>
                        <text class="iconfontText mt20">修改资料</text>
                    </div>
                    <div class="iconBox flexCol mt20"  @click="dragon()">
                        <text :style="{fontFamily:'iconfont'}" style=" color: #66cccc" class="iconfontSize">&#xe664;</text>
                        <text class="iconfontText mt20">接龙管理</text>
                    </div>
                    <div class="iconBox flexCol mt20"  @click="goReviewManage()">
                        <text :style="{fontFamily:'iconfont'}" style="color: #ff9900" class="iconfontSize">&#xe666;</text>
                        <text class="iconfontText mt20">评价管理</text>
                    </div>
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('employee')" @click="employee()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #999933" class="iconfontSize">&#xe66c;</text>-->
                        <!--<text class="iconfontText mt20">员工管理</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" v-if="member.activated && member.hasShop && filter('fill')" @click="goreport()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #5A427C" class="iconfontSize">&#xe6e8;</text>-->
                        <!--<text class="iconfontText mt20">统计报表</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20"  @click="beginShare()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style=" color: #66ccff" class="iconfontSize">&#xe633;</text>-->
                        <!--<text class="iconfontText mt20">推荐好友</text>-->
                    <!--</div>-->
                    <!--<div class="iconBox flexCol mt20" @click="gmchat()">-->
                        <!--<text :style="{fontFamily:'iconfont'}" style="color: #66ccff" class="iconfontSize">&#xe65a;</text>-->
                        <!--<text class="iconfontText mt20">联系客服</text>-->
                    <!--</div>-->


                </div>
            </div>
            </div>
        </scroller>
        <payment ref="payment" @notify="notify"></payment>
        <div v-if="showShare"  key="share">
            <div class="mask" @touchstart="maskTouch"></div>
            <share @doShare="doShare" @doCancel="doCancel"></share>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    /*遮罩层*/
    .mask{
        position: fixed;top: 0px;left: 0px;right: 0px;bottom: 0px;background-color:rgba(000,000,000,0.4);
    }
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#f5f5f5;
    }
    .articleBox{
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;

    }
    .unArticleBox{
        height: 200px;
        width: 670px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .articleImgText{
        margin-top: 15px;
        font-size: 26px;
        color: #444;
        width: 150px;
        lines:2;
        text-overflow: ellipsis;
    }
    .contentBox{
        width: 710px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        border-radius: 20px;
    }
    .contentBoxTwo{
        width: 710px;

        margin-left: 20px;
        margin-right: 20px;
        background-color: white;
        border-radius: 20px;
    }
    .shippingNumberBox{
        padding-top: 3px;
        min-height: 35px;
        min-width: 35px;
        border-radius: 100%;
        border-color: #EB4E40;
        border-width:2px;
        color: #EB4E40;
        position: absolute;
        top:0;
        right: 40px;
        align-items: center;
        justify-content: center;
    }
    .shippingNumber{
        font-size: 26px;
        line-height: 26px;
        color: #EB4E40;
    }
    .topContentBox{
        background-color: rgba(255,255,255,0.6);
    }
    .articleImg{
        height: 150px;
        width: 150px;
        border-radius: 10px;
        border-width: 1px;
        border-color: #eeeeee;
    }
    .iconBox{
        width: 167.5px;
    }
    .iconfontSize{
        font-size: 60px;
    }
    .iconfontText{
        font-size: 26px;
        line-height: 40px;
        color: #444;
    }
    .rightTop {
        position: absolute;
        top: 44px;
        right: 0;
        /*width: 110px;*/
        width: 92px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .isvisible {
        opacity: 1;
        visibility: visible;
    }
    .novisible {
        opacity: 0;
        visibility: hidden;
    }
    .userBox {
        flex-direction: row;
        align-items: center;
    }
    .nw {
        width: 750px;
        padding-right: 30px;
        padding-left: 30px;
    }
    .headImg {
        height: 50px;
        width: 50px;
        border-radius: 25px;
    }
    .navText {
        padding-left: 10px;
        font-size: 33px;
        color: #fff;
    }


    /*顶部导航栏*/

    .headerMore {
        position: fixed;
        /*background-color: #fff;*/
        top: 0px;
        border-bottom-width: 0px;
    }
    .headTitle {
        height: 80px;
        line-height: 80px;
        position: relative;
    }



    /*订单列表*/

    .comWrap {
        width: 710px;
        padding: 20px;
        border-radius: 20px;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
        background-color: rgba(255,255,255,0.5);
    }
    .circleWrap {
        width: 710px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 20px;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
    }
    .flexCol {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 140px;
    }
    .flexColTwo {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        /*height: 100px;*/
    }
</style>
<script>
    import { dom, event, storage, stream, animation } from '../../weex.js';
    const modal = weex.requireModule('modal');
    var globalEvent = weex.requireModule('globalEvent');
    import utils from '../../assets/utils';
    import { POST, GET } from '../../assets/fetch';
    import filters from '../../filters/filters.js';
    import topic_header from '../../widget/header.vue';
    import share from '../../include/share.vue';
    import payment from '../../include/payment.vue'
    var animationPara; //执行动画的文章
    var scrollTop = 0;
    export default {
        data: function() {
            return {
                topMWidth: 166,
                settingColor: '',
                opacityNum: 0,
                twoTop: false,
                isDisappear: false,
                corpusScrollTop: 0,
                canScroll: true,
                userName: '',
                userSign: '',
                occupation:'',
                whichCorpus: 0,
                isNoArticle: false,
                fontName: '&#xe685;',
                collectNum: 0,
                moneyNum: 0,
                focusNum: 0,
                fans:0,
                couponNum: 0,
                orderNum: 999,
                orderNumS:0,
                imageUrl: utils.locate('resources/images/background.png'),
                bgImgUrl: 'http://cdn.ahxinying.cn/weex/placeholder/bg.jpg',
                circleImg: utils.locate('resources/images/liveHeader.png'),
                showLoading: 'hide',
                listCurrent: 0,
                listPageSize: 10,
                articleThree:[],
                roles:'',
                member:{nickName:"未登录",logo:utils.locate("logo.png"),autograph:"点击设置签名",topic:"未开通",hasTopic:false,activated:false,useCashier:false,isAgent:false,isShop:false,hasShop:false},
                showShare:false,
                clicked:false,
                imgBg:'http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/fengjing.jpeg',
                showType:true,
                conut:[],
                shippingConut:[],
                shopId:'#',
                hasHeaderInfo:true,
                time:null
            }
        },
        components: {
            topic_header,share,payment
        },
        filters: {
            watchWho: function(value) {
                if (value.sort.substring(0, 1) == '1') {
                    return '置顶';
                }
                if (value.value.isDraft) {
                    return '草稿';
                }
                if (value.value.articleOption.articleCatalog.id == '99') {
                    return '已删除';
                }
                if (value.value.articleOption.isPublish == 'false' || !value.value.articleOption.isPublish) {
                    return '私密';
                }
                switch (value.value.articleOption.authority) {
                    case 'isPublic': //公开
                        return '公开';
                        break;
                    case 'isShare': //不公开
                        return '不公开';
                        break;
                    case 'isEncrypt': //加密
                        return '加密';
                        break;
                    case 'isPrivate': //私密
                        return '私密';
                        break;
                    case 'draft': //草稿
                        return '草稿';
                        break;
                    default:
                        return '公开';
                        break;
                }
            },
            watchCatetory: function(value) {
                if (utils.isNull(value)) {
                    return '生活';
                } else {
                    return value;
                }
            },
            watchThumbnail: function(value) {
                //                    没过滤前是原图
                return utils.thumbnail(value, 690, 345);
            },
            watchNickName: function(value) {
                if (utils.isNull(value)) {
                    return 'author';
                } else {
                    //              如果用户名称过长，便截取拼成名字
                    return utils.changeStrLast(value, 5);
                }
            }
        },
//        beforeDestory() {
//            var _this = this;
////            页面销毁时解除定时器
//            if (!utils.isNull(this.time))  {
//                clearInterval(this.time);
//                this.time = null;
//            }
//        },
        created: function() {
            let _this = this;
            utils.initIconFont();
            //            获取屏幕的高度
            this.screenHeight = utils.fullScreen(216);
            this.UId = event.getUId();
            //           获取用户信息;
            this.updateUserInfo();
//            获取前三篇文章
            this.openArticle();
//            获取权限
            this.permissions();
//            获取店铺是否完善
            this.open();
//            获取订单数量
            this.getCount();
//            获取运单数量
            this.getShippingConut();
            //            监听用户信息的变化。
            globalEvent.addEventListener("onUserInfoChange", function(e) {
                _this.updateUserInfo();
            });
            //            监听账单消息提醒.
            globalEvent.addEventListener("onMessage", function(e) {
                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10201') {
                    _this.updateUserInfo();
                }
//                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10200') {
////                   获取订单数量
//                    _this.getCount();
//                }
//                if (!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10213') {
////                   获取运单数量
//                    _this.getShippingConut();
//                }
            });
        },
        ////        dom呈现完执行滚动一下
        //        updated(){
        ////            每次加载新的内容时 dom都会刷新 会执行该函数，利用变量来控制只执行一次
        //            if(this.hadUpdate){
        //                return;
        //            }
        //            this.hadUpdate = true;
        ////            判断是否不是ios系统  安卓系统下需要特殊处理，模拟滑动。让初始下拉刷新box上移回去
        //            if(!utils.isIosSystem()){
        //                const el = this.$refs.topBox//跳转到相应的cell
        //                dom.scrollToElement(el, {
        //                    offset: -119
        //                })
        //            }
        //        },
        methods: {

//            权限过滤器
            filter(e){
                var _this = this;
                if(e == 'order'){
//                    订单
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'shipping'){
//                    运单
                    if (utils.isRoles("123",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'dragon'){
//                    接龙
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'review'){
//                    评价
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'coupon'){
//                    优惠券
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'distribution'){
//                    新营销
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'manage'){
//                    商品
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'shop'){
//                    店铺
                    if (utils.isRoles("1",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'employee'){
//                    员工
                    if (utils.isRoles("1",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'fill'){
//                    补单
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'dragon'){
//                    接龙
                    if (utils.isRoles("12",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                } else if(e == 'topic'){
//                    专栏
                    if (utils.isRoles("1",_this.roles)) {
                        return true
                    }else{
                        return false
                    }
                }else {
                    return false
                }
            },

            //            监听设备型号,控制导航栏设置 返回按钮
            classTop: function() {
                let dc = utils.addTop();
                return dc;
            },
            //            监听设备型号,控制导航栏高度
            classHeader: function() {
                let dc = utils.device();
                return dc;
            },
//            获取店铺是否完善等信息
            open:function () {
                var _this = this;
                GET("weex/member/manager/view.jhtml",
                    function (data) {
                        if (data.type=="success") {
                            _this.member = data.data;
                        } else {
                            event.toast(data.content);
                        }
                    },
                    function (err) {
                        event.toast("网络不稳定")
                    }
                )
            },
            //            获取权限
            permissions:function () {
                var _this = this;
                POST("weex/member/roles.jhtml").then(function (mes) {
                    if (mes.type=="success") {
                        _this.roles = mes.data;
//                            开启定时器，每分钟定位一次经纬度
//                            _this.time = setInterval(function () {
//                                _this.getGps()
//                            },120000);
                    } else {
                        event.toast(mes.content);
                    }
                },function (err) {
                    event.toast(err.content);
                });
            },
//            //  关闭定时器.
//            clearDummyProcess(){
////              解除定时器
//                if (!utils.isNull(this.time))  {
//                    clearInterval(this.time);
//                    this.time = null;
//                }
//            },
//            获取经纬度
            getGps:function(){
                let _this = this
                var uId = event.getUId();
                event.getLocation(function (data) {
                    if(data.type == 'success'){
                        POST("/lbs/location.jhtml?lng=" + data.data.lng + "&lat=" +data.data.lat +'&memberId=' + uId).then(function (mes) {
                            if (mes.type == 'success') {

                            } else {
                                event.toast(mes.content);
                            }
                        }, function (err) {
                            event.toast(err.content)
                        })
                    }else {
                        event.toast('定位失败，请开启GPS')
                    }
                })
            },
            //            更新用户信息；
            updateUserInfo() {
                let _this = this;
                //            获取用户信息
                GET('weex/member/view.jhtml', function(data) {
                    if (data.type == 'success') {
                        if (!utils.isNull(data.data.nickName)) {
                            _this.userName = data.data.nickName;
                        }
                        if (!utils.isNull(data.data.logo)) {
                            _this.imageUrl = data.data.logo;
                        }
                        if (!utils.isNull(data.data.autograph)) {
                            _this.userSign = data.data.autograph;
                        }
                        if (!utils.isNull(data.data.backgroud)) {
                            _this.imgBg = data.data.backgroud;
                        }
                        if (!utils.isNull(data.data.occupation.name)) {
                            _this.occupation = data.data.occupation.name;
                        }
                        _this.fans = data.data.fans
                        _this.collectNum = data.data.favorite;
                        _this.focusNum = data.data.follow;
                        _this.moneyNum = data.data.balance;
                        //                        动态控制收藏与关注的宽度
                        let a = _this.moneyNum + '';
                        if (utils.getLength(a) > 5) {
                            _this.topMWidth = 119;
                        }
                    } else {
                        event.toast(data.content);
                    }
                }, function(err) {
                    event.toast(err.content);
                })
            },
            //            获取文章前四篇
            openArticle:function () {
                var _this = this;
                GET('weex/member/article/list.jhtml?authorId='+this.UId,function (data) {
                    if (data.type == "success") {
                        data.data.data.forEach(function (item,index) {
                            if(index <= 3){
                                item.thumbnail = utils.thumbnail(item.thumbnail,150,150);
                                _this.articleThree.push(item)
                            }
                        })
                    }else {
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
//            获取订单数量
            getCount(){
                var _this = this
                POST('weex/member/order/count.jhtml').then( function (res) {
                        if (res.type=="success") {
                            _this.conut = res.data
                        } else {
                            event.toast(res.content);
                        }

                    }, function (err) {
                        event.toast(err.content);
                    })
            },
            //            获取运单数量
            getShippingConut(){
                var _this = this
                POST('weex/member/shipping/count.jhtml').then( function (res) {
                    if (res.type=="success") {
                        _this.shippingConut = res.data
                    } else {
                        event.toast(res.content);
                    }

                }, function (err) {
                    event.toast(err.content);
                })
            },
            jumpEditor: function() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                event.openURL(utils.locate('view/member/editor/editor.js'), function(message) {
                    _this.clicked = false;
                    _this.openArticle();
                });
            },
            //            点击屏幕时
            ontouchstart: function(event, index) {
                var _this = this;
                if (animationPara == null || animationPara == '' || animationPara == 'undefinded') {} else {
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                        //                      timingFunction: 'ease-out',
                        needLayout: false,
                        delay: 0 //ms
                    })
                }
                //                获取当前点击的元素。
                animationPara = event.currentTarget;
            },
            //            移动时
            onpanmove: function(event, index) {
                var _this = this;
                if (event.direction == 'right') {
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                        //                      timingFunction: 'ease-out',
                        needLayout: false,
                        delay: 0 //ms
                    }, function() {
                        _this.canScroll = true;
                    })
                } else if (event.direction == 'left') {
                    _this.canScroll = false;
                    //                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-330)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out', //350 duration配合这个效果目前较好
                        //                      timingFunction: 'ease-out',
                        needLayout: false,
                        delay: 0 //ms
                    }, function() {
                        _this.canScroll = true;
                    })
                }
            },
            onpanend: function(event) {},

            scrollHandler: function(e) {
                var _this = this;
                if (e.contentOffset.y >= 0) {
                    return;
                }
                scrollTop = Math.abs(e.contentOffset.y);
                let opacityDegree = Math.floor(scrollTop / 14) / 10;
                if (opacityDegree > 1) {
                    opacityDegree = 1;
                }
                if (opacityDegree > 0.4) {
                    this.settingColor = 'white';
                } else {
                    this.settingColor = '';
                }
                this.opacityNum = opacityDegree;
                if (scrollTop >= 284) {
                    this.twoTop = true;
                } else {
                    this.twoTop = false;
                }
                if (scrollTop >= 750) {
                    this.hasHeaderInfo = false;
                } else {
                    this.hasHeaderInfo = true;
                }
            },
            // 个人信息
            goAttribute() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/attribute.js'), function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            if (!utils.isNull(data.data.logo)) {
                                _this.imageUrl = data.data.logo;
                            }
                            if (!utils.isNull(data.data.nickName)) {
                                _this.userName = data.data.nickName;
                            }
                            if (!utils.isNull(data.data.autograph)) {
                                _this.userSign = data.data.autograph;
                            }
                            if (!utils.isNull(data.data.occupation)) {
                                _this.occupation = data.data.occupation;
                            }
                        } else {
                            //                            return ;
                        }
                    }
                );
            },
            goFans(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/friend/fans.js?id='+this.UId), function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {

                        } else {
                            //                            return ;
                        }
                    }
                );
            },
            goreport(){
                event.openURL(utils.locate('view/member/report/index.js'), function(data) {

                    }
                );
            },
//            待确认
            goConfirm(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=0&productCategoryId=1'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
//            预约单
            goToMask(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=1&productCategoryId=2'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
//            配送中
            goOnTheWay(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=2&productCategoryId=3'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
//            已送达
            goaArive(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shipping/list.js?index=3&productCategoryId=4'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
//            待付款
            goNoPay(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=0&productCategoryId=1'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
            //            待发货
            goNoDelivery(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=1&productCategoryId=2'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
            //            已发货
            goDelivery(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=2&productCategoryId=3'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
            //            待退款
            goRefund(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/order/list.js?index=3&productCategoryId=4'), function(data) {
                    _this.clicked = false;
                    _this.getCount()
                    _this.getShippingConut();
                    }
                );
            },
//            写文章
            editor(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/editor/editor.js'), function(data) {
                        _this.clicked = false;
                    }
                );
            },
//            跳转文章
            goArticle(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/article/preview.js?articleId=' + id  + '&publish=true' ),
                    function () {
                        _this.clicked = false;
                    }
                )
            },
            //            设置中心
            goOption() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/option.js'), function(data) {
                        _this.clicked = false;
                    }
                );
            },
//            会员卡
            gocard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/card/list.js"),function (e) {_this.clicked = false});
            },
//            优惠券
            gocoupon:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/coupon/list.js"),function (e) {_this.clicked = false});
            },
//            新营销
            godistribution:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/goods/distribution.js"),function (e) {_this.clicked = false});
            },
//            管理店铺
            shop:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/shop/storeList.js"),function (mes) {
                    if(mes.type =='success'&&mes.data==''){
                        event.closeURL(mes)
                    }
                    _this.clicked =false
                });
            },
//            未激活店铺时修改
            modification:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate('view/shop/shop/newShop.js?shopId='+this.shopId),function (message) {
                    if(message.type == 'success'){
                        _this.open()
                        _this.permissions()
                    }
                    _this.clicked =false
                })
            },
//            激活店铺
            activated(){
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                POST('weex/member/topic/activate.jhtml').then(
                    function (mes) {
                        _this.clicked = false;
                        if (mes.type == "success") {
                            if (utils.isNull(mes.data)) {
                                _this.open();
                            } else {
                                _this.$refs.payment.show(mes.data);
                            }
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )

            },
//            员工管理
            employee:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("1",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/admin/list.js"),function (e) {_this.clicked =false});
            },
            //            补单
            fill:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate("view/shop/order/fill.js"),function (e) {
                    _this.clicked =false
                    _this.getCount()
                });
            },
//            我的专栏
            goTopic: function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate('view/member/topic/index.js'), function (mes) {
                        _this.open();
                        _this.clicked = false;
                        return ;
                    }
                );
            },
//            店铺管理
            store:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/cashier/index.js'),function (mes) {
                    _this.clicked = false;
                    if(mes.type == 'success') {
                        _this.member.useCashier = false;
                        _this.open();
                    }
                })
            },
//            我要开店
            goShop:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/shop/shop/newShop.js'),function (mes) {
                    _this.clicked = false;
                    _this.open()
                    _this.permissions()
                })
            },
            //            前往运单管理
            shippingManage:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("123",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/shop/shipping/list.js'),
                    function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                        _this.clicked = false;
                        return ;
                    }
                );
            },
            //            前往商品管理
            goodsManage:function () {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/shop/goods/manage.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            },
            //           接龙管理
            dragon:function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/member/dragon.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            },
            //            评论管理
            goReviewManage:function (e) {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/member/reviewManage.js'),
                    function (data) {
                        _this.clicked = false;
                        return ;
                    }
                );
            },
            doShare(id){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var shareType;
                let _this = this;
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
                    default:
                        shareType = 'browser';
                        break;
                }

                var option = {
                    title:"【"+_this.member.nickName+"】推荐给你一个好用的工具，快去看看",
                    text:"超强图文小视频分享社区,中国版Facebook.",
                    imageUrl:_this.member.logo,
                    url:utils.website("?xuid="+_this.member.id),
                    type:shareType
                }
                _this.showShare = false;
                event.share(option,function (data) {
                    if(data.type == 'success') {
                        if (shareType == 'copyHref') {
                            event.toast('链接已复制到剪贴板');
                        } else if (shareType == 'browser') {
                        } else {
                            event.toast('分享成功');
                        }
                        return;
                    }
                })
            },
//            开启分享
            beginShare:function () {
                this.showShare = true;
            },
            //            取消分享
            doCancel(){
                this.showShare = false;
            },
//            打开聊天
            gmchat:function () {
                event.navToChat("u10201");
            },
            //            我的关注
            goFocus() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/focus.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
//            我的收藏
            goCollect(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/collect.js?id=' + this.UId),
                    function (data) {
                        _this.clicked = false;
                        if(data.type == 'success' && data.data != ''){
                            _this.updateUserInfo();
                        }else{
                            return ;
                        }
                    }
                );
            },
            // 关注的店铺
            goFocusTenants() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/collectTenant/collectTenant.js?id=' + this.UId),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            // 我的订单
            goOrderList() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                if (!utils.isRoles("12",_this.roles)) {
                    modal.alert({
                        message: '暂无权限',
                        okTitle: 'OK'
                    })
                    _this.clicked = false
                    return
                }
                event.openURL(utils.locate('view/shop/order/list.js'),
                    function (data) {
                        _this.getCount()
                        _this.getShippingConut();
                        _this.clicked = false;
                        return ;
                    }
                );
            },
            // 跳转老版本我的
            goMemberIndex() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/index.js'),
                    function(data) {
                        _this.clicked = false;
                        _this.updateUserInfo();
                    }
                );
            },
            // 钱包
            goWallet() {
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('view/member/wallet/index.js'),
                    function(data) {
                        _this.clicked = false;
                        if (data.type == 'success' && data.data != '') {
                            _this.updateUserInfo();
                        } else {
                            return;
                        }
                    }
                );
            },
            //            快速滑动滚动条时， 控制顶部导航栏消失
            toponappear() {
                this.opacityNum = 0;
                //                this.settingColor = 'white';
                this.settingColor = '';
                //                event.changeWindowsBar("false");
            },
            //            onrefresh:function () {
            //                var _this = this;
            //                _this.refreshing = true;
            //                animation.transition(_this.$refs.refreshImg, {
            //                    styles: {
            //                        transform: 'rotate(360deg)',
            //                    },
            //                    duration: 1000, //ms
            //                    timingFunction: 'linear',//350 duration配合这个效果目前较好
            //                    needLayout:false,
            //                    delay: 0 //ms
            //                });
            //                setTimeout(() => {
            //                    animation.transition(_this.$refs.refreshImg, {
            //                        styles: {
            //                            transform: 'rotate(0)',
            //                        },
            //                        duration: 10, //ms
            //                        timingFunction: 'linear',//350 duration配合这个效果目前较好
            //                        needLayout:false,
            //                        delay: 0 //ms
            //                    })
            //                    _this.refreshing = false
            //                    _this.getAllArticle();
            //                }, 1000);
            //            },
            //            还原
            //            本地处理sort 置顶数据

            //            触碰遮罩层
            maskTouch() {
                this.showMenu = false;
            },
        }
    }

</script>
