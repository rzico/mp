<template>
    <div class="wrapper">
        <div class="header "  :class="[classHeader()]">
            <!--顶部导航-->
            <div class="nav nw">
                <div class="nav_back" @click="goback('/')">
                    <!--style="color: #E1776E"-->
                    <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe669;</text>
                </div>
                <!--页面名称-->
                <div class="userBox" >
                    <!--style="color: #999"-->
                    <text class="nav_title">送出</text>
                    <text class="nav_ico fz45" style="color:#FF9015"  :style="{fontFamily:'iconfont'}">&#xe6c2;</text>
                    <text class="nav_title" >{{pageName}}</text>
                </div>
                <div class="rightTop" >
                </div>
            </div>
        </div>
        <scroller class="scrollerStyle">
            <!--顶部个人信息栏-->
            <div class="topBox bt20"  >
                <div class="topHead" >
                    <!--用户头像-->
                    <image class="testImage" resize="cover" :src="imageUrl" ></image>
                    <!--个性签名 用户昵称-->
                    <div class="alignCenter"  >
                        <div class="flex-row pt20" >
                            <!--用户昵称-->
                            <text class="userName  ">{{userName}}</text>
                            <!--男性-->
                            <!--<text  :style="{fontFamily:'iconfont'}" class="pl10 pr10 fz45 manIcon"  >&#xe694;</text>-->
                            <!--女性-->
                            <text  :style="{fontFamily:'iconfont'}" class="pl5 pr5 fz45 womenIcon"  >&#xe654;</text>
                            <div  class="pl10 pr10 ptb3  flex-row starBox">
                                <text  :style="{fontFamily:'iconfont'}" class="starIcon">&#xe655;</text>
                                <text class="starNum"> 2</text>
                            </div>
                        </div>
                        <div class="flex-row pt20 pb20">
                            <div class="boder-right">
                                <text class="focusFans pr20">关注 0</text>
                            </div>
                            <text class="focusFans pl20">粉丝 148</text>
                        </div>
                        <!--用户签名-->
                        <text class="userSign">{{userSign}}</text>
                    </div>
                </div>
            </div>
            <!--<div class="flex-row cell-height-title   bgWhite boder-bottom">-->
                <!--<div class=" boder-right flex1 ptb5  flex-center">-->
                    <!--<text class="title activeColor fz32">主页</text>-->
                <!--</div>-->
                <!--<div class="flex1 flex-center ptb5">-->
                    <!--<text class="title fz32">直播</text>-->
                <!--</div>-->
            <!--</div>-->
            <div >
                <!--<div class="space-between  cell-height-title  bt20 bgWhite pl20 pr20">-->
                    <!--<div class="flex-center">-->
                        <!--<text class="sub_title  fz30">印票贡献榜</text>-->
                    <!--</div>-->
                    <!--<div class="flex-row">-->
                        <!--<image v-for="item in ticketImgList" class="ticketImg mr10" :src="item" resize="cover"></image>-->
                        <!--<text class="arrow fz35" :style="{fontFamily:'iconfont'}">&#xe630;</text>-->
                    <!--</div>-->
                <!--</div>-->
                <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">职业</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">主播</text>
                    </div>
                </div>
                <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">BabyShow号</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">37541</text>
                    </div>
                </div>
                <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">年龄</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">你猜</text>
                    </div>
                </div>
                <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">个性签名</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">TA好像忘记签名了</text>
                    </div>
                </div>
                <div class=" flex-row cell-height   bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">情感状态</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">保密</text>
                    </div>
                </div>
            </div>
        </scroller>

        <!--点赞 评论 分享-->
        <div class=" footBox"  :style="{height:bottomNum + 100,paddingBottom:bottomNum}"  >
            <!--主播用关注-->
            <div class="bottomBtnBox" :style="{height:bottomNum + 100}">
                <text class="fz26fff fz45" :class="[isLaud ? 'primary' : '']" :style="{fontFamily:'iconfont'}">&#xe606;</text>
                <text class="fz26fff ml10"  :class="[isLaud ? 'primary' : '']">关注</text>
            </div>
            <div class="boder-right bottomBR" ></div>
            <div class="bottomBtnBox"  :style="{height:bottomNum + 100}">
                <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe62f;</text>
                <text class="fz26fff ml10">私信</text>
            </div>
            <!--用户用禁言-->
            <div class="boder-right bottomBR" ></div>
            <div class="bottomBtnBox" :style="{height:bottomNum + 100}">
                <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe74c;</text>
                <text class="fz26fff ml10">禁言</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .scrollerStyle{
        position: relative;
        top:0;
        bottom: 100px;
    }
    /*底部按钮*/
    .bottomBR{
        border-right-color:#fff;width: 1px;height: 50px;
    }
    .fz45{
        font-size: 45px;
        line-height: 45px;
    }
    .bottomBtnBox{
        flex: 1;
        flex-direction: row;
        align-items: center;justify-content: center;
    }
    .fz26fff{
        font-size: 32px;
        line-height: 32px;
        color: #fff;
    }
    .footBox{
        align-items: center;
        justify-content: center;
        flex-direction: row;
        width:750px;
        /*height:100px;*/
        background-color: #8947FA;
        /*position: fixed;*/
        border-style:solid;
        border-top-width: 1px;
        border-color: #ccc;
        /*bottom:0;*/
    }
    .cb-top{
        border-top-width: 0px;
    }
    /*底部按钮*/

    /*主页 直播*/
    .ticketImg{
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }
    .cell-height{
        height: 100px;
    }
    .cell-height-title{
        height: 110px;
    }
    .activeColor{
        color:#8947FA;
        font-weight: 600;
    }
    .ptb35{
        padding-top: 35px;
        padding-bottom: 35px;
    }
    .ptb5{
        padding-top: 5px;
        padding-bottom: 5px;
    }
    /*主页 直播*/

    /*顶部导航栏*/
    .rightTop{
        height: 96px;width: 98px;align-items: center;justify-content: center;margin-top: 5px;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nw{
        width: 750px;
    }
    /*顶部导航栏*/

    /*个人信息栏*/
    .starNum{
        font-size: 30px;color: #fff;
    }
    .starIcon{
        font-size:36px;color:#fff;
    }
    .starBox{
        background-color: #8EC103;border-radius: 5px;
    }
    .womenIcon{
        color:pink;
    }
    .manIcon{
        color:#1296db;
    }
    .sexIcon{
        font-size:45px;color: pink;
    }
    .ptb3{
        padding-top: 3px;
        padding-bottom: 3px;
    }
    .alignCenter{
        align-items: center;
    }
    .topBox{
        position: relative;
        background-color: #fff;
    }
    .topHead{
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        padding-bottom: 20px;
        color: white;
    }
    .testImage{
        width: 200px;
        height:200px;
        border-width: 5px;
        border-style: solid;
        border-color: #ccc;
        border-radius: 100px;
    }
    .userSign{
        lines:1;
        text-overflow:ellipsis;
        width:500px;
        font-size: 28px;
        color: #999;
        text-align: center;
    }
    .focusFans{
        font-size: 30px;
        color: #777;
    }
    .userName{
        font-weight: 600;
        font-size: 32px;
        color: #666;
    }
    /*个人信息栏*/
</style>
<script>
    import {dom,event,stream} from '../../weex.js';
    import {getLetter,dictFirstLetter} from '../../assets/letter';
    import navbar from '../../include/navbar.vue'
    import { POST, GET,SCAN } from '../../assets/fetch';
    import utils from '../../assets/utils';
    const animation = weex.requireModule('animation');
    export default {
        data: function () {
            return {
                pageName:'0',
//                imageUrl:utils.locate('resources/images/background.png'),
                imageUrl:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1522811100&di=5570cc3ef01b85c21e54b7fb29a97756&src=http://img4q.duitang.com/uploads/item/201305/03/20130503034918_envh2.jpeg',
                userName:'珍珠火凤凰',
                userSign:'TA好像忘记签名了',
                ticketImgList:[utils.locate('resources/images/background.png'),
                                utils.locate('resources/images/background.png'),
                                utils.locate('resources/images/background.png'),],
                bottomNum:0,
                screenHeight:0
            }
        },
        created(){
            utils.initIconFont();

//            判断是iponex就动态获取底部上弹高度
            if(utils.previewBottom() != '' && utils.previewBottom() == 'IPhoneX'){
                this.bottomNum =parseInt(event.deviceInfo().bottomHeight) * 2;
            }

//            this.screenHeight = utils.fullScreen(305 );
            this.screenHeight = utils.fullScreen(237 + this.bottomNum);
        },
        methods:{
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
//            点击返回
            goback(){
                event.closeURL();
            },
        }
    }
</script>