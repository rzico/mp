<template>
    <div class="wrapper">
        <!--<div class="header "  :class="[classHeader()]">-->
        <!--&lt;!&ndash;顶部导航&ndash;&gt;-->
        <!--<div class="nav nw">-->
        <!--<div class="nav_back" @click="goback('/')">-->
        <!--&lt;!&ndash;style="color: #E1776E"&ndash;&gt;-->
        <!--<text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe669;</text>-->
        <!--</div>-->
        <!--&lt;!&ndash;页面名称&ndash;&gt;-->
        <!--<div class="userBox" >-->
        <!--&lt;!&ndash;style="color: #999"&ndash;&gt;-->
        <!--<text class="nav_title">送出</text>-->
        <!--<text class="nav_ico fz45" style="color:#FF9015"  :style="{fontFamily:'iconfont'}">&#xe6c2;</text>-->
        <!--<text class="nav_title" >{{pageName}}</text>-->
        <!--</div>-->
        <!--<div class="rightTop" >-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="header  "  :class="[classHeader()]">
            <!--顶部导航-->
            <div class="nav nw">
                <div class="nav_back" @click="goback('/')">
                    <text class="nav_ico"   :style="{fontFamily:'iconfont'}">&#xe669;</text>
                </div>
                <!--页面名称-->
                <div class="userBox" >
                    <text class="nav_title">{{pageName}}</text>
                </div>
                <div class="rightTop">
                </div>
            </div>
        </div>
        <scroller class="scrollerStyle" >
            <div v-for="item in infoData">
            <!--顶部个人信息栏-->
            <div class="topBox bt30"  >
                <div class="topHead" >
                    <!--用户头像-->
                    <image class="headImage" resize="cover" :src="item.logo | watchHeadImage" ></image>
                    <!--个性签名 用户昵称-->
                    <div class="alignCenter"  >
                        <div class="flex-row pt20" >
                            <!--用户昵称-->
                            <text class="userName  ">{{item.nickName}}</text>
                            <!--男性-->
                            <text  :style="{fontFamily:'iconfont'}" v-if="item.gender == 'male'" class="pl10 pr10 fz45 manIcon"  >&#xe694;</text>
                            <!--女性-->
                            <text  :style="{fontFamily:'iconfont'}" v-if="item.gender == 'female'" class="pl5 pr5 fz45 womenIcon"  >&#xe654;</text>
                            <div v-if="hasVip(item.vip)" class="pl10 pr10 ptb3  flex-row starBox">
                                <text  :style="{fontFamily:'iconfont'}" class="starIcon">&#xe655;</text>
                                <text class="starNum"> {{item.vip}}</text>
                            </div>
                        </div>
                        <div class="flex-row pt20 pb20">
                            <div class="boder-right">
                                <text class="focusFans pr20">关注 {{item.follow}}</text>
                            </div>
                            <text class="focusFans pl20">粉丝 {{item.fans}}</text>
                        </div>
                        <!--用户签名-->
                        <text class="userSign">{{item.autograph | watchAutograph}}</text>
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
                        <text  class="title">{{item.occupation | watchOccupation}}</text>
                    </div>
                </div>
                <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">登录名</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">{{item.userId}}</text>
                    </div>
                </div>
                <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">年龄</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title">{{item.birth | watchBirth}}</text>
                    </div>
                </div>
                <div class=" flex-row cell-height   bgWhite pl20 pr20">
                    <div class=" flex2">
                        <text class="sub_title fz30">个性签名</text>
                    </div>
                    <div class=" flex4">
                        <text  class="title" style="lines:1;text-overflow: ellipsis">{{item.autograph | watchAutograph}}</text>
                    </div>
                </div>
                <!--<div class=" flex-row cell-height   bgWhite pl20 pr20">-->
                <!--<div class=" flex2">-->
                <!--<text class="sub_title fz30">情感状态</text>-->
                <!--</div>-->
                <!--<div class=" flex4">-->
                <!--<text  class="title">保密</text>-->
                <!--</div>-->
                <!--</div>-->
            </div></div>
        </scroller>

        <!--点赞 评论 分享-->
        <div class=" footBox"  :style="{height:bottomNum + 100,paddingBottom:bottomNum}"  >
            <!--主播用关注-->
            <div class="bottomBtnBox" :style="{height:bottomNum + 100}" v-if="!isFocus" @click="focus()">
                <text class="fz26fff fz45"  :style="{fontFamily:'iconfont'}">&#xe606;</text>
                <text class="fz26fff ml10" >关注</text>
            </div>
            <div class="bottomBtnBox" :style="{height:bottomNum + 100}"  v-else @click="focus()">
                <text class="fz26fff fz45 gray"  :style="{fontFamily:'iconfont'}">&#xe6b8;</text>
                <text class="fz26fff ml10 gray" >已关注</text>
            </div>
            <div class="boder-right bottomBR" ></div>
            <div class="bottomBtnBox"  :style="{height:bottomNum + 100}" @click="goChat()">
                <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe62f;</text>
                <text class="fz26fff ml10">私信</text>
            </div>
            <!--用户用禁言-->
            <div class="boder-right bottomBR" v-if="showJinYan"></div>
            <div class="bottomBtnBox" :style="{height:bottomNum + 100}" v-if="showJinYan" @click="toGap()">
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
    .headImage{
        width: 200px;
        height:200px;
        border-width: 5px;
        border-style: solid;
        border-color: #ccc;
        border-radius: 100px;
    }
    .userSign{
        lines:2;
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
                isUser:false,
                infoData:[
//                    {
//                    autograph:'输入的日期格式错误输入的日期格式错误输入的日期格式错误输入的日期格式错误输入的日期格式错误',
//                    birth:'1500048000000',
//                    logo:utils.locate('resources/images/background.png'),
//                    nickName:'程序',
//                    gender:'male',
//                    vip:2,
//                    follow:5,
//                    fans:2,
//                    userId:'u10100'
//                }
                ],
//                headImage:utils.locate('resources/images/background.png'),
//                headImage:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1522811100&di=5570cc3ef01b85c21e54b7fb29a97756&src=http://img4q.duitang.com/uploads/item/201305/03/20130503034918_envh2.jpeg',
//                nickName:'珍珠火凤凰',
//                userSign:'TA好像忘记签名了',
//                印票
//                ticketImgList:[utils.locate('resources/images/background.png'),
//                    utils.locate('resources/images/background.png'),
//                    utils.locate('resources/images/background.png'),],
                bottomNum:0,
                screenHeight:0,
                pageName:'个人信息',
                id:'',
                isFocus:false,
                groupId:false,
                clicked:false

            }
        },
        created(){
            utils.initIconFont();

//            判断是iponex就动态获取底部上弹高度
            if(utils.previewBottom() != '' && utils.previewBottom() == 'IPhoneX'){
                this.bottomNum =parseInt(event.deviceInfo().bottomHeight) * 2;
            }
            this.showJinYan = utils.getUrlParameter('showJinYan');
            this.id = utils.getUrlParameter('id');

            this.groupId = utils.getUrlParameter('groupId');
//            this.screenHeight = utils.fullScreen(305 );
            this.screenHeight = utils.fullScreen(237 + this.bottomNum);
            this.getInfo();
        },
        filters:{
            watchHeadImage:function (value) {
                if(value != utils.locate('resources/images/background.png')){
                    return utils.thumbnail(value,200,200);
                }else{
                    return value;
                }
            },
            watchOccupation:function (value) {
                return  ("你猜");
            },
            watchNickName:function (value) {
              if(utils.isNull(value)){
                  return 'host';
              }else{
                  return value;
              }
            },
            watchLogo:function (value) {
                if(utils.isNull(value)){
                    return utils.locate('resources/images/background.png');
                }else{
                    return value;
                }
            },
            watchBirth:function (value) {
                if(utils.isNull(value)){
                    return  ("你猜");
                }
//            日期计算年龄
               var str = utils.ymdtimefmt(value);
                var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if(r==null)return   ("你猜");
                var   d=   new   Date(r[1],r[3]-1,r[4]);
                if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])
                {
                    var   Y   =   new   Date().getFullYear();
                    return((Y-r[1])+" 岁");
                }
                return("你猜");
            },
            watchAutograph:function (value) {
                if(utils.isNull(value)){
                    return 'TA好像忘记签名了';
                }else{
                    return value;
                }
            }
        },
        methods:{
            hasVip:function (vip) {
                 if(utils.isNull(vip)){
                     return false;
                 }else{
                     return true;
                 }
            },
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
//            点击返回
            goback(){
                event.closeURL();
            },
            getInfo(){
                let _this = this;
                GET('weex/user/view.jhtml?id=' + this.id,function (data) {
                    if(data.type == 'success'){
//                        if(!utils.isNull(data.data.logo)){
//                            _this.headImage = data.data.logo;
//                        }
//                        if(!utils.isNull(data.data.nickName)){
//                            _this.nickName = data.data.nickName;
//                        }
                        _this.infoData.push(data.data);
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            //            前往聊天
            goChat(){
                let userId = 'u' + (10200 + parseInt(this.id));
                event.navToChat(userId);
            },
            toGap(){
                //防止重复点击按钮
                if(this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                event.livePlayer(this.id,this.groupId);
            },
//            关注
            focus:function () {
                //防止重复点击按钮
                if(this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                if(this.isFocus){
                    POST('weex/member/follow/delete.jhtml?authorId=' + this.UId).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.isFocus = !_this.isFocus;
//                                event.sendGlobalEvent('onUserInfoChange',data);
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        }
                    )
                }else{
                    POST('weex/member/follow/add.jhtml?authorId=' + this.UId).then(
                        function (data) {
                            if(data.type == 'success'){
                                _this.isFocus = !_this.isFocus;
//                                event.sendGlobalEvent('onUserInfoChange',data);
                            }else{
                                event.toast(data.content);
                            }
                        },function (err) {
                            event.toast(err.content);
                        }
                    )
                }
            },

        }
    }
</script>