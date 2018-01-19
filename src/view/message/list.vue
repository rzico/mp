<template>
    <div class="wrapper">
        <div class="header"  :class="[classHeader()]">
            <!--顶部导航-->
            <div class="nav nw">
                <div style="width: 100px;" >
                </div>
                <!--页面名称-->
                <div class="userBox" >
                    <text class=" nav_title">{{pageName}}</text>
                </div>
                <div class="rightTop" @click="menu()" >
                    <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe72b;</text>
                </div>
            </div>
        </div>
        <search @gosearch="gosearch" :keyword="searchKeyword" @scan="scan"> </search>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list v-else  class="list" :scrollable="canScroll">
            <!--朋友信息-->
            <cell v-for="(item,index) in messageList" >
                <!--左滑删除时如果是直接在cell下 而没有多一个div包住的话 第一次要点删除的文字才能触发。-->
                <!--<div>-->
                    <div class="deleteBox bkg-delete" @click="deleteMessage(item.userId,index)">
                        <text class="deleteText">删除</text>
                    </div>
                    <div class="friendsLine" @click="jumpMessage(item)" @swipe="onpanmove($event)" @touchstart="ontouchstart($event)">
                        <!--头像-->
                        <div class="friendsImageBox">
                            <image :src="item.logo" class="friendsImage"></image>
                        </div>
                        <!--有新消息-->
                        <div class="newMessage" v-if="item.unRead != '' && item.unRead != 0 && item.unRead != null && item.unRead != undefined">
                            <text class="messageTotal">{{item.unRead}}</text>
                        </div>
                        <div style="flex: 5;">
                            <div style="flex-direction: row;flex: 1;" >
                                <!--名字与内容-->
                                <div class="messageText">
                                    <text class="friendName">{{item | watchName}}</text>
                                </div>
                                <!--消息时间-->
                                <div class="messageTimeBox">
                                    <text class="messageTime">{{item.createDate | timefmt}}</text>
                                </div>
                            </div>
                            <div style="flex: 2;height: 50px;justify-content: center;">
                                <text class="friendMessage">{{item.content}}</text>
                            </div>
                        </div>
                    </div>
                <!--</div>-->
            </cell>
        </list>
        <div v-if="showMenu" >
            <div class="maskLayer" @touchstart="maskTouch"></div>
            <div class="showBox"  style="width: 230px;">
                <div class="arrowUp" >
                    <text class="fz40" style="color: #fff;" :style="{fontFamily:'iconfont'}">&#xe64e;</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive " style="width: 230px;" @click="goAddFriend()">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe62a;</text>
                    <text class="fz28 pl10">添加好友</text>
                </div>
                <div class="flex-row pt25 pb25 pl35 pr35 textActive" @click="scan()">
                    <text class="fz40" :style="{fontFamily:'iconfont'}">&#xe607;</text>
                    <text class="fz28 pl10">扫一扫</text>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style>

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

    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 130px;align-items: center;width: 130px;justify-content: center;
    }
    /*.nav {*/
    /*flex:1;*/
    /*flex-direction: row;*/
    /*align-items: center;*/
    /*justify-content: center;*/
    /*margin-top: 40px;*/
    /*}*/
    /*.menu {*/
    /*margin-top: 40px;*/
    /*font-size: 50px;*/
    /*line-height: 60px;*/
    /*height:60px;*/
    /*width:60px;*/
    /*color:white;*/
    /*}*/
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
        left:95px;
        top:5px;
        width:60px;
        align-items: center;
    }
    .messageTimeBox{
        height: 50px;
        justify-content: center;
        flex: 2;
        align-items: flex-end;
        padding-right: 10px;
    }
    .messageTime{
        color: #999;
        font-size: 24px;
        lines:1;
    }
    .friendName{
        lines:1;
        text-overflow: ellipsis;
        font-size: 34px;
    }
    .messageText{
        /*padding-top: 8px;*/
        /*padding-bottom: 8px;*/
        flex:4;
        /*height: 100px;*/
        height: 50px;
        justify-content: center;
        /*margin-left: 20px;*/
    }
    .friendMessage{
        lines:1;
        text-overflow:ellipsis;
        color: #999;
        font-size: 28px;
        padding-right: 20px;
    }
    .friendsImageBox{
        flex: 1;
    }
    .friendsImage{
        height: 100px;
        width:100px;
    }
    .friendsLine{
        padding-left: 30px;
        padding-right: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        width:750px;
        background-color: #fff;
        flex-direction: row;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: rgba(153,153,153,0.2);
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    import { POST, GET ,SCAN} from '../../assets/fetch';
    import utils from '../../assets/utils';
    import {dom,event,stream} from '../../weex.js';
    import noData from '../../include/noData.vue';
    import search from '../../include/search.vue';
    import filters from '../../filters/filters.js';
    var globalEvent = weex.requireModule('globalEvent');
    const animation = weex.requireModule('animation');

    var animationPara;//执行动画的消息
    export default {
        data:function(){
            return{
                searchKeyword:'搜索',
                messageList:[],
                canScroll:true,
                currentNum:0,
                pageNum:20,
                selfUserId:'',
                pageName:'消息',
                showMenu:false,
                clicked:false,
            }
        },
        components: {
            noData,search
        },
        computed:{
//            计算属性
//            sortList:function() {
//                return this.messageList.sort(this.sortTime);
//            }
        },
        filters:{
            watchName:function (value) {
                switch(value.userId){
                    case 'gm_10200':
                        return '订单提醒';
                        break;
                    case 'gm_10201':
                        return '账单提醒';
                        break;
                    case 'gm_10202':
                        return '系统消息';
                        break;
                    case 'gm_10203':
                        return '评论回复';
                        break;
                    case 'gm_1024':
                        return '点赞提醒';
                        break;
                    case 'gm_10205':
                        return '关注提醒';
                        break;
                    case 'gm_10206':
                        return '收藏提醒';
                        break;
                    case 'gm_10207':
                        return '赞赏提醒';
                        break;
                    case 'gm_10208':
                        return  '分享提醒';
                        break;
                    case 'gm_10209':
                        return  '添加好友';
                        break;
                    case 'gm_10210':
                        return '同意好友';
                        break;
                    case 'gm_10211':
                        return '系统客服';
                        break;
                    case 'gm_10212':
                        return '线下收款';
                        break;
                    default:
                        return value.nickName;
                        break;
                }
            }
        },
        props:{
            noDataHint: { default: "没有消息，快去聊天吧"},
        },
        created() {
//            创建前
            var _this = this;
            utils.initIconFont();
            let listoption = {
                type:'message',//类型
                keyword:'',//关键址
                orderBy:'desc',//"desc"降序 ,"asc"升序
                current:0,
                pageSize:0,
            };
            this.selfUserId = event.getUserId();
//            读取本地缓存
            event.findList(listoption,function (data) {
                if(data.type == 'success' && data.data != ''){
                    data.data.forEach(function (item) {
//                        item.value = JSON.parse(item.value);
                        _this.messageList.push(JSON.parse(item.value));
//                        _this.messageList.push(item);
                    })
//                    })
                }else if(data.type == 'success'){

                }else{
                    event.toast(data.content);
                }
            })
            globalEvent.addEventListener("onMessage", function (e) {
//                    用户消息没有userId。只有id。
                e.data.data.userId = utils.isNull(e.data.data.userId) ? e.data.data.id : e.data.data.userId;
                _this.addMessage(e.data);
            });
            //           添加好友消息红点控制
            globalEvent.addEventListener("onNewFriendChange", function (e) {
//                _this.newFriendNum = 0;
                _this.messageList.forEach(function (item) {
                    if(item.id == 'gm_10209'){
                        item.unRead = 0;
                    }
                })
            });
        },
        beforeMount(){
            if(event.getUId() != 0){
//            读取未读消息
                event.getUnReadMessage();
            };
        },
        methods:{
            classHeader:function () {
                let dc = utils.device();
                return dc
            },
//            判断是否有消息
            isEmpty(){
                return this.messageList.length == 0;
            },
//            向消息列表填入新的消息数据并存入缓存
            addMessage(_weex){
                var _this = this;
                if(_weex.type == 'success'){
                    //            获取当前时间戳 作为唯一标识符key
                    let timestamp = Math.round(new Date().getTime()/1000);
//                    需要判断是否是数组。服务器返回的是数组，onmessage聊天的data是对象。
                    _weex.data.name = utils.isNull(_weex.data.name) ? '' : _weex.data.name;
                    _weex.data.userId = utils.isNull(_weex.data.userId) ? _weex.data.id : _weex.data.userId;
                    let findOption = {
                        type:'message',
                        key:_weex.data.userId
                    }
//                    event.toast(_weex);
//                        本地查找是已有消息列表还是新消息列表~
                    event.find(findOption,function (data) {
                        if(data.type == 'success' && data.data != ''){
                            if(!utils.isNull(data.data.value)){
//                        判断是否无法获取到头像跟昵称
                                let JSONData = JSON.parse(data.data.value);
//                                现在安卓后台数据logo nickName有误，不管有没有获取到logo、nickName 都使用本地头像;
//                                if(utils.isNull(_weex.data.logo)){
                                    _weex.data.logo = JSONData.logo;
//                                }
//                                if(utils.isNull(_weex.data.nickName)){
                                    _weex.data.nickName = JSONData.nickName;
//                                }
                            }
                            var storageDataNew = JSON.stringify(_weex.data);
                            let option = {
                                type:'message',
                                key:_weex.data.userId,
                                value:storageDataNew,
                                keyword:',' + _weex.data.name + ',' + _weex.data.nickName + ',' + _weex.data.content +',',
                                sort:'0,' + timestamp
                            }
                            event.save(option,function (message) {
                                if(message.type == 'success' && message.content =='更新成功'){
                                    _this.messageList.forEach(function (nowData,nowIndex) {
//                                            存入缓存里的userId 会消失掉
                                        nowData.userId = utils.isNull(nowData.userId) ? 'u' + (10200 + parseInt(nowData.id)) : nowData.userId;
                                        if(nowData.userId == _weex.data.userId){
//                                        删除原来的对话
                                            _this.messageList.splice(nowIndex,1);
////                                                json字符串再次转换回来
//                                                _weex.data = JSON.parse(_weex.data);
//                                        将新的对话push进
                                            _this.messageList.splice(0,0,_weex.data);
                                        }
                                    })
                                }else{
                                    event.toast('网络不稳定');
                                }
                            })
                        }else{//新消息
                            var storageData = JSON.stringify(_weex.data);
                            let option = {
                                type:'message',
                                key:_weex.data.userId,
                                value:storageData,
                                keyword:',' + _weex.data.name + ',' + _weex.data.nickName + ',' + _weex.data.content +',',
                                sort:'0,' + timestamp
                            }
                            event.save(option,function (message) {
                                if(message.type == 'success' && message.content =='保存成功'){
////                                                json字符串再次转换回来
//                                        _weex.data = JSON.parse(_weex.data);
                                    _this.messageList.splice(0,0,_weex.data);
                                }else{
                                    event.toast('网络不稳定');
                                }
                            })
                        }
                    })
                }else{
                    event.toast(_weex.content);
                }
            },
//            根据时间排序
            sortTime:function (a,b) {
//                将时间戳变成日期格式 "2017-05-05 09:55:56"
                let first = utils.ymdhistimefmt(a.createDate);
                let second = utils.ymdhistimefmt(b.createDate);
//               '>'号时间越近在前面 倒序    '-'号的话是时间越久的在前面
                return ((new Date(first.replace(/-/g, "\/"))) > (new Date(second.replace(/-/g, "\/"))));
            },
            //            下拉刷新
//            onrefresh (event) {
//                modal.toast({ message: '加载中...', duration: 1})
//                this.refreshing = true
//                setTimeout(() => {
//                    this.refreshing = false
//                }, 2000)
//            },
//            跳转消息列表
            jumpMessage:function(item){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                var _this = this;
//                如果没有未读数就不更新缓存。直接跳转页面
                if(item.unRead != 0){
                    item.unRead = 0;
                    let findOption = {
                        type:'message',
                        key:item.userId
                    };
                    event.find(findOption,function (data) {
                        if(data.type == 'success' && data.data != ''){
                            let option = {
                                type:'message',
                                key:item.userId,
                                value:item,
                                keyword:',' + item.name + ',' + item.nickName + ',' + item.content +',',
//                            用的是原来缓存的sort。避免用户只是点击进来看一下。此时sort应该保持不变。但是unread需要置0
                                sort:data.data.sort
                            };
                            event.save(option,function (message) {
                                if(message.type == 'success'){
                                    if(!utils.isNull(item.userId) && item.userId.substring(0,1) == 'g'){
                                        event.setReadMessage(item.userId,function(data) {
                                            if (data.type == 'success') {
                                                event.openURL(utils.locate('view/message/inform.js?type=' + item.userId), function () {
                                                    _this.clicked = false;
                                                });
                                                if(item.userId == 'gm_10209'){
                                                    let listenData = utils.message('success','添加好友跳转','');
                                                    event.sendGlobalEvent('onNewFriendChange',listenData);
                                                }
                                            } else {
                                                _this.clicked = false;
                                                event.toast(data.content);
                                            }
                                        })
                                    }else{
//                                       设置已读
                                        event.setReadMessage(item.userId,function(data){
                                            _this.clicked = false;
                                            if(data.type == 'success'){
                                                event.navToChat(item.userId);
                                            }else{
                                                event.toast(data.content);
                                            }
                                        });
                                    };
                                }else{
                                    _this.clicked = false;
                                    event.toast(message.content);
                                };
                            });
                        };
                    });
                }else{
                    if(!utils.isNull(item.userId) && item.userId.substring(0,1) == 'g'){
//                    item.unRead = 0;
//                    let timestamp = Math.round(new Date().getTime()/1000);
//                    let option = {
//                        type:'message',
//                        key:item.userId,
//                        value:item,
//                        keyword:',' + item.name + ',' + item.nickName + ',' + item.content +',',
//                        sort:'0,' + timestamp
//                    }
////                    更新缓存数据后，跳转到通知页面
//                    event.save(option,function (message) {

                        event.openURL(utils.locate('view/message/inform.js?type=' + item.userId), function () {
                            _this.clicked = false;
                        });
//                    })

                    }else{
//                    item.unRead = 0;
//                        设置已读
//                        event.setReadMessage(item.userId,function(data){
//                            if(data.type == 'success'){
                        event.navToChat(item.userId);
                        _this.clicked = false;
//                            }else{
//                                event.toast(data.content);
//                            }
//                    });
                    };
                };

            },
            //            点击屏幕时
            ontouchstart:function (e) {
                var _this = this;
                if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                }else{
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    })
                }
//                获取当前点击的元素。
                animationPara =  e.currentTarget;
            },
            //            移动时
            onpanmove:function (e) {
//                获取当前点击的元素。
                var _this = this;
                if(e.direction == 'right'){
                    _this.canScroll = false;
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(0)',
                        },
                        duration: 350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }else if(e.direction == 'left'){
                    _this.canScroll = false;
//                  modal.toast({message:distance});
                    animation.transition(animationPara, {
                        styles: {
                            transform: 'translateX(-130)',
                        },
                        duration:350, //ms
                        timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                        needLayout:false,
                        delay: 0 //ms
                    },function () {
                        _this.canScroll = true;
                    })
                }
            },
//            删除会话消息；
            deleteMessage(userId,index){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
//        modal.confirm({
//            message: '删除后,将清空该？',
//            duration: 0.3,
//            okTitle:'删除',
//            cancelTitle:'取消',
//        }, function (value) {
//            if(value == '删除'){
//
//            }
//        })
//         删除消息会话
                if(event.deleteConversation(userId)){
                    let option ={
                        type : 'message',
                        key:userId
                    }
//            清除缓存
                    event.delete(option,function(data){
                        if(data.type == 'success'){
                            //                            把动画收回来。
                            if(animationPara == null || animationPara == '' || animationPara == 'undefinded' ){
                            }else{
                                animation.transition(animationPara, {
                                    styles: {
                                        transform: 'translateX(0)',
                                    },
                                    duration: 10, //ms
                                    timingFunction: 'ease-in-out',//350 duration配合这个效果目前较好
//                      timingFunction: 'ease-out',
                                    needLayout:false,
                                    delay: 0 //ms
                                })
                            }
                            _this.messageList.splice(index,1);
                        }else{
                            event.toast(data.content);
                        }
                        _this.clicked = false;
                    })
                }else{
                    _this.clicked = false;
                    event.toast('系统繁忙');
                };
            },
            //            触发自组件的跳转方法
            gosearch:function () {

                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                event.openURL(utils.locate('widget/friMsgSearch.js'),function (message) {
//                event.openURL('http://192.168.2.157:8081/search.weex.js',function (message) {
                    _this.clicked = false;
//                    if(message.data != ''){
//                        event.closeURL(message);
//                    }
                });
            },
            //            触发自组件的二维码方法
            scan:function () {
                this.showMenu = false;
                event.scan(function (message) {
                    SCAN(message, function (data) {
                    }, function (err) {
                    })
                });
            },
//            点击右上角菜单
            menu:function () {
                this.showMenu = true;
            },
//            触碰遮罩层
            maskTouch(){
                this.showMenu = false;
            },
//            前往添加好友
            goAddFriend(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this;
                this.showMenu = false;
                event.openURL(utils.locate("view/friend/add.js"),function (message) {
                    _this.clicked = false;
                })

            },
        }
    }
</script>
