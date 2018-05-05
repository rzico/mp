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
        <!--设置-->
        <div  class="rightTopBox flex-row"  :class="[classTop()]">
            <!--<text  :style="{fontFamily:'iconfont',color:settingColor}" style="font-size:50px;">&#xe62d;</text>-->
            <!--<div v-if="!isUser">-->
                <!--<text  :style="{fontFamily:'iconfont'}" @click="setManager()" v-if="hasManager" style="font-size:50px;color: #fff">&#xe697;</text>-->
                <!--<text  :style="{fontFamily:'iconfont'}" @click="setManager()" v-else style="font-size:50px;color: #fff">&#xe643;</text>-->
            <!--</div>-->
            <!--<text  :style="{fontFamily:'iconfont'}" @click="tickOut()" v-if="!isUser || isManager" class="ml20 topIcon">&#xe67b;</text>-->
            <text @click="focus()" v-if="!isFocus" class="ml20 topIcon" :style="{fontFamily:'iconfont'}">&#xe606;</text>
            <text @click="focus()" class="ml20 topIcon"  v-else  :style="{fontFamily:'iconfont'}">&#xe6b8;</text>
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
                        <div class=" flex4 ">
                            <text  class="title">{{item.occupation | watchOccupation}}</text>
                        </div>
                    </div>
                    <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                        <div class=" flex2">
                            <text class="sub_title fz30">登录名</text>
                        </div>
                        <div class=" flex4 ">
                            <text  class="title">{{item.userId}}</text>
                        </div>
                    </div>
                    <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                        <div class=" flex2">
                            <text class="sub_title fz30">年龄</text>
                        </div>
                        <div class=" flex4 ">
                            <text  class="title">{{item.birth | watchBirth}}</text>
                        </div>
                    </div>
                    <div class=" flex-row cell-height boder-bottom  bgWhite pl20 pr20">
                        <div class=" flex2">
                            <text class="sub_title fz30">个性签名</text>
                        </div>
                        <div class=" flex4 ">
                            <text  class="title" style="lines:1;text-overflow: ellipsis">{{item.autograph | watchAutograph}}</text>
                        </div>
                    </div>
                    <!--<div v-if="!isUser">-->
                    <!--<text  :style="{fontFamily:'iconfont'}" @click="setManager()" v-if="hasManager" style="font-size:50px;color: #fff">&#xe697;</text>-->
                    <!--<text  :style="{fontFamily:'iconfont'}" @click="setManager()" v-else style="font-size:50px;color: #fff">&#xe643;</text>-->
                    <!--</div>-->
                    <div v-if="!isUser" class=" flex-row cell-height   bgWhite pl20 pr20">
                        <div class=" flex2">
                            <text class="sub_title fz30">管理员</text>
                        </div>
                        <div class=" flex4 " @click="setManager()" v-if="hasManager">
                            <!--<switch class="switch" :checked="hasTopic" ></switch>-->
                            <text class=" fzz65 greenColor" :style="{fontFamily:'iconfont'}">&#xe7d9;</text>
                        </div>
                        <div class=" flex4 " @click="setManager()" v-else>
                            <text class=" fzz65 gray" :style="{fontFamily:'iconfont'}">&#xe7da;</text>
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

        <!--关注 私信 禁言-->
        <div class=" footBox"  :style="{height:bottomNum + 100,paddingBottom:bottomNum}"  >
            <!--主播用关注-->
            <!--<text  :style="{fontFamily:'iconfont'}" @click="tickOut()" v-if="!isUser || isManager" class="ml20 topIcon">&#xe67b;</text>-->
            <div class="bottomBtnBox" :style="{height:bottomNum + 100}"  @click="tickOut()" v-if="!isUser || isManager">
                <text class="fz26fff fz45"  :style="{fontFamily:'iconfont'}">&#xe67b;</text>
                <text class="fz26fff ml10" >踢出房间</text>
            </div>
            <!--<div class="bottomBtnBox" :style="{height:bottomNum + 100}"  v-else @click="focus()">-->
                <!--<text class="fz26fff fz45 gray"  :style="{fontFamily:'iconfont'}">&#xe6b8;</text>-->
                <!--<text class="fz26fff ml10 gray" >已关注</text>-->
            <!--</div>-->
            <div class="boder-right bottomBR"  v-if="!isUser || isManager"></div>
            <div class="bottomBtnBox"  :style="{height:bottomNum + 100}" @click="goChat()">
                <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe62f;</text>
                <text class="fz26fff ml10">私信</text>
            </div>
            <!--用户用禁言-->
            <div class="bottomBtnBox" v-if="!isUser || isManager">
                <div class="boder-right bottomBR" ></div>
                <div class="bottomBtnBox" :style="{height:bottomNum + 100}" v-if="isGag" @click="toGag()">
                    <text class="fz26fff fz45" :style="{fontFamily:'iconfont'}">&#xe67e;</text>
                    <text class="fz26fff ml10">禁言</text>
                </div>
                <div class="bottomBtnBox" :style="{height:bottomNum + 100}" v-else @click="toGag()">
                    <text class="fz26fff fz45 " :style="{fontFamily:'iconfont'}">&#xe74c;</text>
                    <text class="fz26fff ml10 ">已禁言</text>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>
    .greenColor{
        color:#1AA218;
    }
    .topIcon{
        font-size:50px;color: #fff;
    }

    .fzz65{
        font-size:65px;
    }
    .rightTopBox{
        position: fixed;
        top: 44px;
        right: 20px;
        /*width: 110px;*/
        /*width: 92px;*/
        height: 92px;
        align-items: center;
        justify-content: center;
    }


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
    const livePlayer = weex.requireModule('livePlayer');
    const modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {
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
//                是否关注
                isFocus:false,
                groupId:'',
                clicked:false,
//                是否用户
                isUser:true,
//                是否禁言
                isGag:false,
//                是否管理员
                isManager:false,
                userId:'',
                hasManager:false,
            }
        },
        created(){
            let _this = this;
            utils.initIconFont();
//            判断是iponex就动态获取底部上弹高度
            if(utils.previewBottom() != '' && utils.previewBottom() == 'IPhoneX'){
                this.bottomNum =parseInt(event.deviceInfo().bottomHeight) * 2;
            }
            this.isUser = utils.getUrlParameter('isUser');
            if(this.isUser == 'false'){
                this.isUser = false;
            }
            if(this.isUser == 'true'){
                this.isUser = true;
            }
            this.id = utils.getUrlParameter('id');
            this.userId = 'u' + (10200 + parseInt(this.id));
            this.groupId = utils.getUrlParameter('groupId');

//            获取相关管理员权限
            this.managerInfo();

            livePlayer.getGag(this.userId,this.groupId,function(data){
                _this.isGag = data.data ;
                if(_this.isGag == 'false'){
                    _this.isGag  = false;
                }
                if(_this.isGag == 'true'){
                    _this.isGag  = true;
                }
            })
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
            //            获取相关管理员权限
            managerInfo(){
              let _this = this;
                if(!this.isUser){
                    GET('weex/live/admin/view.jhtml?liveId=' + _this.groupId + '&memberId=' + this.id,function(mes){
                        if(mes.type == 'success' && (mes.data == true || mes.data == 'true')){
                            _this.hasManager = mes.data;
                        }
                    },function(err){
                        event.toast(err.content);
                    })
                }else{
                    GET('weex/live/admin/view.jhtml?liveId=' + _this.groupId ,function(mes){
                        if(mes.type == 'success' && (mes.data == true || mes.data == 'true')){
                            _this.isManager = mes.data;
                        }
                    },function(err){
                        event.toast(err.content);
                    })
                }
            },
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
                        _this.isFocus = data.data.isfollow;
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
//                let userId = 'u' + (10200 + parseInt(this.id));
                event.navToChat(this.userId);
            },
            toGag(){
                //防止重复点击按钮
                if(this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
//                let userId = 'u' + (10200 + parseInt(this.id));
                var gagTime = '1';
                if(!_this.isGag){
                    gagTime = '86400';
                }
                livePlayer.toGag(this.userId,this.infoData[0].nickName,this.groupId,gagTime,function (data) {
                    if(data.type == 'success'){
//                        livePlayer.getGag(userId,_this.groupId,function(mes){
//                            if(mes.data){
                        if(!_this.isGag){
                            event.toast('禁言成功');
                        }else{
                            event.toast('解除禁言成功');
                        }
                        _this.isGag = !_this.isGag;
//                            }else{
//                                event.toast('系统繁忙,请稍后重试');
//                            }
//                        })
                    }else {
                        event.toast(data.content);
                    }
                });
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
                    POST('weex/member/follow/delete.jhtml?authorId=' + this.id).then(
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
                    POST('weex/member/follow/add.jhtml?authorId=' + this.id).then(
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

//            监听设备型号,控制导航栏设置 返回按钮
            classTop:function () {
                let dc = utils.addTop();
                return dc;
            },
//            设置管理员
            setManager(){
                this.hasManager = !this.hasManager;
                return;
                //防止重复点击按钮
                if(this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                if(this.hasManager){
                    modal.confirm({
                        message: '是否收回该用户的管理员资格?',
                        duration: 0.3,
                        okTitle:'确定',
                        cancelTitle:'取消',
                    }, function (value) {
                        if(value == '确定'){
                            POST('weex/live/admin/delete.jhtml?id=' + _this.id + '&liveId=' + _this.groupId).then(
                                function (data) {
                                    if(data.type == 'success'){
                                        event.toast('收回资格成功');
                                        _this.hasManager = !_this.hasManager;
                                    }else{
                                        event.toast(data.content);
                                    }
                                },function (err) {
                                    event.toast(err.content);
                                }
                            )
                        }
                    })
                }else{
                    modal.confirm({
                        message: '是否将该用户升为管理员?',
                        duration: 0.3,
                        okTitle:'确定',
                        cancelTitle:'取消',
                    }, function (value) {
                        if(value == '确定'){
                            POST('weex/live/admin/add.jhtml?id=' + _this.id + '&liveId=' + _this.groupId).then(
                                function (data) {
                                    if(data.type == 'success'){
                                        event.toast('升为管理员成功');
                                        _this.hasManager = !_this.hasManager;
                                    }else{
                                        event.toast(data.content);
                                    }
                                },function (err) {
                                    event.toast(err.content);
                                }
                            )
                        }
                    })
                }
            },
//            踢人
            tickOut(){
                //防止重复点击按钮
                if(this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
                setTimeout(function () {
                    _this.clicked = false;
                },1500)
                modal.confirm({
                    message: '是否将该用户踢出直播间?',
                    duration: 0.3,
                    okTitle:'确定',
                    cancelTitle:'取消',
                }, function (value) {
                    if(value == '确定'){
//                        let userId = 'u' + (10200 + parseInt(_this.id));
                        livePlayer.toKick(_this.userId,_this.infoData[0].nickName,function (data) {
                            if(data.type == 'success'){
                                event.toast('踢出成功');
                                event.closeURL();
                            }else{
                                event.toast(data.content);
                            }
                        });
                    }
                })

            }
        }
    }
</script>