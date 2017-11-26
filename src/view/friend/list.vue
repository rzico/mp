
<template>
    <div>
        <div class="header" :class="[classHeader()]">
            <!--顶部导航-->
            <div class="nav nw">
                <div style="width: 100px;" >
                </div>
                <!--页面名称-->
                <div class="userBox" >
                    <text class=" nav_title">{{pageName}}</text>
                </div>
                <div class="rightTop" @click="goAddFriend()" >
                    <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe62a;</text>
                </div>
            </div>
        </div>
        <search @gosearch="gosearch" :keyword="searchKeyword" @scan="scan"> </search>
        <!--<div style="height: 110px;background-color: #D9141E;justify-content: center;padding-left: 30px;padding-top: 30px" >-->
        <!--<text style="color: #fff;font-size: 35px">朋友</text>-->
        <!--</div>-->
        <list class="listBody">
            <cell ref="linkref" >
                <!--新的朋友-->
                <div class="addBorder">
                    <div class="topLine " @click="openPage(0)">
                        <!--<image :src="item.lineImage" class="lineImage"></image>-->
                        <text class="lineImage" style="color: #FF8C34" :style="{fontFamily:'iconfont'}">&#xe631;</text>
                        <!--有新消息-->
                        <div class="newMessage"  v-if="newFriendNum != '' && newFriendNum != 0 && newFriendNum != null && newFriendNum != undefined">
                            <text class="messageTotal">{{newFriendNum}}</text>
                        </div>
                        <text class="lineTitle">新的朋友</text>
                    </div>
                </div>
                <!--我关注的-->
                <div class="addBorder">
                    <div class="topLine " @click="openPage(1)">
                        <!--<image :src="item.lineImage" class="lineImage"></image>-->
                        <text class="lineImage" style="color:#FCB504;" :style="{fontFamily:'iconfont'}">&#xe65b;</text>
                        <text class="lineTitle">我关注的</text>
                    </div>
                </div>
                <!--顶部功能栏-->
                <div class="addBorder">
                    <div class="topLine " @click="openPage(2)">
                        <!--<image :src="item.lineImage" class="lineImage"></image>-->
                        <text class="lineImage" style="color: #8DC62D" :style="{fontFamily:'iconfont'}">&#xe68e;</text>
                        <text class="lineTitle">我的粉丝</text>
                    </div>
                </div>
                <!--我收藏的-->
                <div class="addBorder">
                    <div class="topLine " @click="openPage(3)">
                        <!--<image :src="item.lineImage" class="lineImage"></image>-->
                        <text class="lineImage" style="color:#D85C87" :style="{fontFamily:'iconfont'}">&#xe63d;</text>
                        <text class="lineTitle">我收藏的</text>
                    </div>
                </div>
            </cell>
            <cell v-for="friend in friendsList" ref="listref" >
                <!--姓氏首字母-->
                <div class="letterBox" v-if="friend.name != ''">
                    <text class="nameLetter">{{friend.letter}}</text>
                </div>
                <!--姓氏里每个人的名子-->
                <div v-for="item in friend.name"  >
                    <div class="addFriendsBorder">
                        <div class="friendsLine" @click="goChat(item.id)">
                            <image :src="item.logo" class="friendsImage" @click="goAuthor(item.id)"></image>
                            <div class="friendsName">
                                <text class="lineTitle">{{item.nickName}}</text>
                                <text class="realName">真实姓名:{{item.realName | watchName}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <!--总共多少个好友-->
                <div class="friendTotalBox">
                    <text class="friendTotalText" v-if="friendTotal != 0">{{friendTotal}}个朋友</text>
                    <text class="friendTotalText" v-else>暂无朋友</text>
                </div>
            </cell>
        </list>
        <!--右侧字母列表-->
        <div class="letterNavBox" :class = "[isPress ? 'letterOnPress' : '']">
            <div class="letterNav" v-for="(item,index) in allLetter"   @longpress="onlongpress(index)" @touchstart="ontouchstart(index)" @touchend="ontouchend()"  @touchmove="ontouchmove(index,$event)">
                <!--<text class="letterList" v-if="index == 0">up</text>-->
                <!--控制是否红色字体-->
                <text class="letterList" :class="[moveLetter == index ? 'primary' : 'noColor']">{{item}}</text>
            </div>
        </div>
        <!--top:613px-->
        <div class="selfToast" :class="[isShowToast ? 'isvisible' : 'novisible']">
            <text class="toastText">{{showText}}</text>
        </div>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style>
    .messageTotal{
        background-color: red;
        line-height: 38px;
        lines:1;
        color: #fff;
        width:38px;
        height:38px;
        text-align: center;
        border-radius: 19px;
        font-size: 20px;
        font-weight: 700;
    }
    .newMessage{
        position: absolute;
        left:75px;
        top:15px;
        width:60px;
        align-items: center;
    }
    .rightTop{
        height: 96px;width: 98px;align-items: center;justify-content: center;margin-top: 5px;
    }
    .nav_ico {
        font-size: 50px;
        color: #fff;
    }
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nw{
        width: 750px;
    }
    /*顶部导航栏*/
    /*.header {*/
        /*flex-direction: row;*/
        /*background-color: #D9141E;*/
        /*!*background-color: #fff;*!*/
        /*left: 0;*/
        /*right: 0;*/
        /*top:0;*/
        /*height: 136px;*/
    /*}*/
    .addColor{
        color: #D9141E;
    }
    .noColor{
        color: #000;
    }
    .isvisible{
        visibility: visible;
    }
    .novisible{
        visibility: hidden;
    }
    .toastText{
        color: #fff;
        font-size: 30px;
    }
    .selfToast{
        position: absolute;
        height: 70px;
        width: 180px;
        border-radius: 40px;
        background-color: #333;
        align-items:center;
        justify-content: center;
        opacity: 0.9;
        /*top: 613px;*/
        top: 632px;
        left: 285px;
    }

    .letterList{
        color: #494949;
        font-size: 29px;
    }
    .friendTotalBox{
        width:750px;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #F2F3F8;
    }
    .friendTotalText{
        font-size: 34px;
        color: #888;
    }
    .letterOnPress{
        background-color: #B3B2B3;
    }
    .letterNavBox{
        position: absolute;
        right: 0px;
        width:60px;
        top:236px;
        bottom: 0px;
        padding-bottom: 15px;
        padding-top: 20px;
        align-items: center;
    }
    .letterNav{
        flex:1;
        width:60px;
        align-items: center;
    }
    .friendsName{
        height:90px;
        margin-top: 15px;
        justify-content: space-between;
    }
    .letterBox{
        width:750px;
        padding-left: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #e8e8e8;
    }
    .addBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.5);
    }
    .nameLetter{
        color: #888;
        font-size: 24px;
    }
    .realName{
        color: #888;
        font-size: 30px;
        margin-left: 20px;
    }
    .friendsImage{
        margin-top: 20px ;
        height: 80px;
        width:80px;
    }
    .addFriendsBorder{
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
    }
    .friendsLine{
        padding-left: 30px;
        height:120px;
        width:660px;
        background-color: #fff;
        flex-direction: row;
    }
    .listBody{
        background-color: #fff;
    }
    .topLine{
        flex-direction: row;
        width:660px;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        align-items: center;
        background-color: #fff;
    }
    .lineImage{
        width:80px;
        height:80px;
        font-size: 80px;
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
    }
</style>

<script>
    import {dom,event,stream} from '../../weex.js';
    import {getLetter,dictFirstLetter} from '../../assets/letter';
    import navbar from '../../include/navbar.vue'
    import { POST, GET,SCAN } from '../../assets/fetch';
    import search from '../../include/search.vue';
    import utils from '../../assets/utils';
    const modal = weex.requireModule('modal');
    const storage = weex.requireModule('storage');
    var globalEvent = weex.requireModule('globalEvent');
    //    var pressPoint = -1;//手指按压
    //    var movePoint;//手机按压后移动
    //    var pointPoor;//手机按压时与移动后的字母数量
    //    var moveLetter;//移动后的字母
    //    var beforePointPoor = -1; //前一次手机按压时与移动后的字母数量

    export default {
        data:function () {
            return   {
                newFriendNum:0,
                searchKeyword:'搜索',
                pageName:'朋友',
                beforePointPoor:-1,//前一次手机按压时与移动后的字母数量
                pressPoint:-1,//手指按压
                pointPoor:0,//手机按压时与移动后的字母数量
                movePoint:0,//手机按压后移动
                moveLetter:0,//移动后的字母
//                    text:'Jum333132p',
                isShowToast:false,
                showText:'',
                isPress:false,
                friendTotal:0,
                UId:'',
//                topLineList:[{
//                    lineImage:'&#xe631;',
//                    lineTitle:'新的朋友'
//                },{
//                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    lineTitle:'我关注的'
//                },{
//                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    lineTitle:'我的粉丝'
//                },{
//                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    lineTitle:'我收藏的'
//                }],
                friendsList:[{
                    letter:'A',
                    name:[]
                },{
                    letter:'B',
                    name:[]
                },{
                    letter:'C',
                    name:[]
                },{
                    letter:'D',
                    name:[]
                },{
                    letter:'E',
                    name:[]
                },{
                    letter:'F',
                    name:[]
                },{
                    letter:'G',
                    name:[]
                },{
                    letter:'H',
                    name:[]
                },{
                    letter:'I',
                    name:[]
                },{
                    letter:'J',
                    name:[]
                },{
                    letter:'K',
                    name:[]
                },{
                    letter:'L',
                    name:[]
                },{
                    letter:'M',
                    name:[]
                },{
                    letter:'N',
                    name:[]
                },{
                    letter:'O',
                    name:[]
                },{
                    letter:'P',
                    name:[]
                },{
                    letter:'Q',
                    name:[]
                },{
                    letter:'R',
                    name:[]
                },{
                    letter:'S',
                    name:[]
                },{
                    letter:'T',
                    name:[]
                },{
                    letter:'U',
                    name:[]
                },{
                    letter:'V',
                    name:[]
                },{
                    letter:'W',
                    name:[]
                },{
                    letter:'X',
                    name:[]
                },{
                    letter:'Y',
                    name:[]
                },{
                    letter:'Z',
                    name:[]
                },{
                    letter:'#',
                    name:[]
                }],
                allLetter:['||','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
            }
        },
        props: {
            title: { default: "朋友"},
        },
        components:{
            navbar,search
        },
        filters:{
            watchName(value){
                if(value == null || value == ''){
                    return '暂无';
                }else{
                    return value;
                }
            }
        },
        created(){
            var _this = this;
            utils.initIconFont();
            let listoption = {
                type:'friend',//类型
                keyword:'',//关键址
                orderBy:'desc',//"desc"降序 ,"asc"升序
                current:0,
                pageSize:0,
            }
//            读取本地朋友缓存
            event.findList(listoption,function (data) {
                if(data.type == 'success' && data.data != ''){
                    data.data.forEach(function (friend) {
                        let jsonData = JSON.parse(friend.value);
//                          获取首字母
                        let firstLetter = getLetter.getFirstLetter(jsonData.nickName.substring(0,1));
                        _this.friendsList.forEach(function (item) {
                            if(item.letter == firstLetter){
                                item.name.push(jsonData);
                            }
                        })
                    })
                    _this.friendTotal = data.data.length;
                }else if(data.type == 'success'){
                }else{
                    event.toast(data.content);
                }
            })
//            读取本地朋友未读消息
            let newFriend = {
                type:'message',//类型
                key:'gm_10209',//关键址
            }
            event.find(newFriend,function (data) {
                if(data.type == 'success' && data.data != ''){
                    let jsonData = JSON.parse(data.data.value);
                    _this.newFriendNum = jsonData.unRead;
                }
            })
//            获取用户id
            this.UId = event.getUId();
            _this.hadFriend();
//            全局监听 消息
            globalEvent.addEventListener("onMessage", function (e) {
                if(!utils.isNull(e.data.data.id) && e.data.data.id == 'gm_10209'){
                        _this.newFriendNum = e.data.data.unRead;
                }else{

                }
            });
        },
        methods: {
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
//            有新朋友时，
            hadFriend(){
                var _this = this;
                let lastTimestamp;
//                获取本地缓存是否有时间戳数据
                storage.getItem('lastTimestamp' + _this.UId, e => {
//                    event.toast('lastTimestamp' + _this.UId);
//                     lastTimestamp = e.data == undefined ? '' : e.data;
                    if(e.result == 'success' && !utils.isNull(e.data)){
                        lastTimestamp = e.data;
                    }else{
                        lastTimestamp = '';
                    }
                    GET('weex/member/friends/list.jhtml?status=adopt' + '&timeStamp=' + '' ,function (data) {
                        //   获取当前时间戳 作为唯一标识符key
                        var timestamp = Math.round(new Date().getTime()/1000);
                        if(data.type == 'success' && data.data.data!=''){
                            data.data.data.forEach(function (friend) {
                                friend.name = utils.isNull(friend.name) ? '' : friend.name;
//                                判断该用户是否有手机号md5，有就存入缓存
                                friend.md5 = utils.isNull(friend.md5) ? '' : friend.md5;


                                _this.friendsList.forEach(function (item) {
                                    if(item.letter == getLetter.getFirstLetter(friend.nickName.substring(0,1))){
                                        let option = {
                                            type:'friend',
                                            key:'u' + (10200 + friend.id),//用于之后删除好友方便查找key
                                            value:friend,
                                            keyword:',' + friend.name + ',' +friend.nickName + ',' + friend.md5 + ',',
                                            sort:item.letter + ',' + timestamp
                                        }
                                        event.save(option,function (message) {
                                            if(message.type == 'success' && message.content =='保存成功'){
                                                item.name.push(friend);
                                                _this.friendTotal ++;
//                                            将本次时间戳缓存起来
                                                storage.setItem('lastTimestamp' + _this.UId, timestamp);
                                            }else if(message.type == 'success' && message.content =='更新成功'){
                                            }else{
                                                event.toast(message.content);
                                            }
                                        })
                                    }
                                })
                            })
                        }else if(data.type == 'success' && data.data.data ==''){
                        }else{
                            event.toast(data.content);
                        }
                    },function (data) {
                        event.toast(data.content);
                    })
                })
            },
            goAddFriend:function () {
                event.openURL(utils.locate("view/friend/add.js"),function (message) {
//                event.openURL('http://192.168.2.157:8081/add.weex.js',function (message) {
                });
            },
            goback:function () {
                event.closeURL();
            },
//            前往聊天
            goChat:function (id) {
                let userId = 'u' + parseInt(10200 + id);
                event.navToChat(userId);
            },
//            作者主页
            goAuthor:function (id) {
                event.openURL(utils.locate("view/member/author.js?id=" + id),function (message) {
                });
            },
            onlongpress :function(count) {
//                modal.toast({ message:this.allLetter[count] ,duration: 0.3});
                this.isPress = true;
            },
            ontouchstart:function(count){
                if(count == 0){//判断是否点击回到顶部
                    const el = this.$refs.linkref//跳转到相应的cell
//                    const el = this.$refs.linkref[count]//跳转到相应的cell
                    dom.scrollToElement(el, {
//                        animated:false
                    })
                }else{
                    for(var i = 0;i<this.friendsList.length ;i++){//循环判断是否有相应首字母的朋友
                        if(this.friendsList[i].letter == this.allLetter[count]){
                            if(this.friendsList[i].name == ''){
                                break;
                            }
                            const el = this.$refs.listref[i]//跳转到相应的cell
                            dom.scrollToElement(el, {
//                                animated:false
                            })
                        }
                    }
                }
//                红色字母
                this.moveLetter = count;
//                modal.toast({ message:this.allLetter[count] ,duration: 0.3});
                this.showText = this.allLetter[count];
                this.isPress = true;
                this.isShowToast = true;
            },
            ontouchend:function(){
                var _this = this;
                this.isPress = false;
                this.pressPoint = -1;//重置判断是否刚开始滑动的标志符（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
                this.beforePointPoor = -1;//（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
//                setTimeout(function () {
                _this.isShowToast = false;
//                },500);
            },
//        ==============================
            ontouchmove:function(count,e){//按住字母导航栏并拖动时触发
                if(this.pressPoint == - 1){//记录每次第一次滑动按压的点
                    this.pressPoint = e.changedTouches[0].pageY;
                }else{
                    this.movePoint = Math.abs(this.pressPoint - e.changedTouches[0].pageY);//求移动的距离(绝对值)
                    if(this.movePoint > 35){
                        this.pointPoor = Math.floor(this.movePoint/35);//通过偏移量获取上移的字母数量
                        if(!(this.beforePointPoor == -1 || this.beforePointPoor == this.pointPoor)){
                            if(this.pressPoint - e.changedTouches[0].pageY >= 0){
                                this.moveLetter = count - this.pointPoor;//获取目前手指停留的字母下标
                            }else{
                                this.moveLetter = count + this.pointPoor;//获取目前手指停留的字母
                            }
                            for(var i = 0;i<this.friendsList.length;i++){//循环判断是否有相应首字母的朋友
                                if(this.friendsList[i].letter == this.allLetter[this.moveLetter]){
                                    if(this.friendsList[i].name == ''){
                                        break;
                                    }
                                    const el = this.$refs.listref[i]//跳转到相应的cell
                                    dom.scrollToElement(el, {
//                                        animated:false
                                    })
                                }else if(this.moveLetter == 0){//判断是否滑到 顶部按钮
                                    const el = this.$refs.linkref//跳转到相应的cell
//                                    const el = this.$refs.linkref[this.moveLetter]//跳转到相应的cell
                                    dom.scrollToElement(el, {
//                                        animated:false
                                    })
                                }
                            }
//                            控制滑动范围 =》触发效果
                            if(this.moveLetter >= 0 && this.moveLetter < this.allLetter.length ){
                                this.showText = this.allLetter[this.moveLetter];
                            }
//                            modal.toast({ message:this.allLetter[this.moveLetter] ,duration: 0.001});//弹出提示框toast
                        }
                        this.beforePointPoor = this.pointPoor;//把这次的滑动的字母数量保存起来
                    }
                }
            },
            //功能页面点击跳转
            openPage(index){
                //            获取当前时间戳 作为唯一标识符key
                let timestamp = Math.round(new Date().getTime()/1000);
                let _this = this;
                switch(index){
                    case 0:
                        event.openURL(utils.locate('view/friend/new.js?id='+ this.UId),function (message) {
//                        event.openURL('http://192.168.2.157:8081/new.weex.js',function (message) {
//                            event.toast(message);
                            //            读取本地朋友未读消息
                            if(_this.newFriendNum != 0){
                                let newFriend = {
                                    type:'message',//类型
                                    key:'gm_10209',//关键址
                                }
                                event.find(newFriend,function (data) {
                                    if(data.type == 'success' && data.data != ''){

                                        _this.newFriendNum = 0;
                                        data.data.value = JSON.parse(data.data.value);
                                        data.data.value.unRead = 0;
                                        let saveFriend = {
                                            type:'message',
                                            key:data.data.key,
                                            keyword:data.keyword,
                                            value:JSON.stringify(data.data.value),
                                            sort:'0,' + timestamp
                                        }
                                        event.save(saveFriend,function (data) {})
                                    }
                                })
                            }

                        });
                        break;
                    case 1:
                        event.openURL(utils.locate('view/member/focus.js?id='+ this.UId),function (message) {
//                        event.openURL('http://192.168.2.157:8081/new.weex.js',function (message) {
//                            event.toast(message);
                        });
                        break;
                    case 2:
                        event.openURL(utils.locate('view/friend/fans.js?id='+ this.UId),function (message) {
//                        event.openURL('http://192.168.2.157:8081/new.weex.js',function (message) {
//                            event.toast(message);
                        });
                        break;
                    case 3:
                        event.openURL(utils.locate('view/member/collect.js?id='+ this.UId),function (message) {
//                        event.openURL('http://192.168.2.157:8081/new.weex.js',function (message) {
//                            event.toast(message);
                        });
                        break;
                    default:
                        break;
                }
            },
//            触发自组件的跳转方法
            gosearch:function () {
                event.openURL(utils.locate('widget/friMsgSearch.js'),function (message) {
//                event.openURL('http://192.168.2.157:8081/search.weex.js',function (message) {
                    if(message.data != ''){
                        event.closeURL(message);
                    }
                });
            },
//            触发自组件的二维码方法
            scan:function () {
                event.scan(function (message) {
                        SCAN(message,function (data) {
                        },function (err) {
                        })
                });
            },
        }
    }
</script>


