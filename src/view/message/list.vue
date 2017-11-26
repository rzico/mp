<template>
    <div class="wrapper">
        <!--<div class="header">-->
            <!--<div class="flex-center flex1"></div>-->
            <!--<div class="nav flex4">-->
                <!--<text class="nav_title">消息</text>-->
            <!--</div>-->
            <!--<div class="flex-center flex1" @click="menu()">-->
                <!--<text class="menu" :style="{fontFamily:'iconfont'}" >&#xe618;</text>-->
            <!--</div>-->
        <!--</div>-->
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
                    <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe618;</text>
                </div>
            </div>
        </div>
        <search @gosearch="gosearch" :keyword="searchKeyword" @scan="scan"> </search>
        <noData :noDataHint="noDataHint" v-if="isEmpty()"></noData>
        <list v-else  class="list" :scrollable="canScroll">
            <refresh class="refresh"  @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新 ...</text>
            </refresh>
            <!--朋友信息-->
            <cell v-for="item in messageList" >
                <div class="deleteBox bkg-primary" @click="deleteMessage()">
                    <text class="deleteText">删除</text>
                </div>
                <div class="friendsLine" @click="jumpMessage(item,index)" @swipe="onpanmove($event,index)" @touchstart="ontouchstart($event,index)">
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
            </cell>
        </list>
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
    import { POST, GET ,SCAN} from '../../assets/fetch'
    import utils from '../../assets/utils'
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
                refreshing: false,
                canScroll:true,
                currentNum:0,
                pageNum:20,
                selfUserId:'',
                pageName:'消息',
            }
        },
        components: {
            noData,search
        },
        computed:{
//            计算属性
            sortList:function() {
                return this.messageList.sort(this.sortTime);
            }
        },
        filters:{
            watchName:function (value) {
                switch(value.userId){
                    case 'gm_10200':
                        return '订单提醒';
                        break;
                    case 'gm_10201':
                        return '账单提醒'
                        break;
                    case 'gm_10202':
                        return '系统消息';
                        break;
                    case 'gm_10203':
                        return '评论回复'
                        break;
                    case 'gm_1024':
                        return '点赞提醒';
                        break;
                    case 'gm_10205':
                        return '关注提醒'
                        break;
                    case 'gm_10206':
                        return '收藏提醒'
                        break;
                    case 'gm_10207':
                        return '赞赏提醒';
                        break;
                    case 'gm_10208':
                        return  '分享提醒';
                        break;
                    case 'gm_10209':
                        return  '添加好友提醒';
                        break;
                    case 'gm_10210':
                        return '同意好友提醒';
                        break;
                    case 'gm_10211':
                        return '系统客服';
                        break;
                    default:
                        return value.nickName;
                        break;
                }
            }
        },
        props:{
            noDataHint: { default: "没有消息，快去聊天吧" },
        },
        created() {
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
                        _this.messageList.push(JSON.parse(item.value));
                    })
//                    })
                }else if(data.type == 'success'){

                }else{
                    event.toast(data.content);
                }
            })
            globalEvent.addEventListener("onMessage", function (e) {
                event.toast(e);
//                判断是系统消息还是用户消息  系统消息给返回的是id:gm_10200 没有userid字段。
                if(!utils.isNull(e.data.data.id) && e.data.data.id.substring(0,1) == 'g'){
                    _this.hadMessage();
                }else{
//                    用户消息没有userId。只有id。
                    e.data.data.userId = utils.isNull(e.data.data.userId) ? e.data.data.id : e.data.data.userId;
//                  判断是否是本人发送所触发的onmessage
//                    if(_this.selfUserId == e.data.data.userId){
//                        _this.chatItem.createDate = e.data.data.createDate;
//                        _this.chatItem.content = e.data.data.content;
//                        e.data = _this.chatItem;
//                        e.type = 'success';
//                        _this.addMessage(e,1);
////                        event.toast(e.data);
//                    }else{
                    _this.addMessage(e.data,1);
//                    }
                }
            });
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
            addMessage(_weex,sign){
                var _this = this;
                if(_weex.type == 'success'){
                    //            获取当前时间戳 作为唯一标识符key
                    let timestamp = Math.round(new Date().getTime()/1000);
//                    需要判断是否是数组。服务器返回的是数组，onmessage聊天的data是对象。
                    if(sign == 0){
//                        _weex.data = _weex.data.reverse();
                        for(let i = 0;i<_weex.data.length  ;i++){
                            utils.debug(_weex.data[i]);
                            _weex.data[i].name = utils.isNull(_weex.data[i].name) ? '' : _weex.data[i].name;
//                            _weex.data[i].userId = utils.isNull(_weex.data[i].userId) ? _weex.data[i].id : _weex.data[i].userId;
                            let strData = JSON.stringify(_weex.data[i]);
                            let option = {
                                type:'message',
                                key:_weex.data[i].userId,
                                value:strData,
                                keyword:',' + _weex.data[i].name + ',' + _weex.data[i].nickName + ',' + _weex.data[i].content +',',
                                sort:'0,' + timestamp
                            }
                            event.save(option,function (message) {
                                if(message.type == 'success' && message.content =='保存成功'){
                                    _this.messageList.splice(0,0,_weex.data[i]);
                                }else if(message.type == 'success' && message.content =='更新成功'){
                                    _this.messageList.forEach(function (nowData,nowIndex) {
                                        if(nowData.userId == _weex.data[i].userId){
//                                        删除原来的对话
                                            _this.messageList.splice(nowIndex,1);
//                                        将新的对话push进
                                            _this.messageList.splice(0,0,_weex.data[i]);
                                        }
                                    })
                                }else{
                                    event.toast('网络不稳定');
                                }
                            })
                        }

                    }else{
                        _weex.data.name = utils.isNull(_weex.data.name) ? '' : _weex.data.name;
                        _weex.data.userId = utils.isNull(_weex.data.userId) ? _weex.data.id : _weex.data.userId;
                        let findOption = {
                            type:'message',
                            key:_weex.data.userId
                        }
//                        本地查找是已有消息列表还是新消息列表
                        event.find(findOption,function (data) {
                                var storageData = JSON.stringify(_weex.data);
                            if(data.type == 'success' && data.data != ''){
//                                var storageData = JSON.parse(data.data.value);
//                                storageData.createDate = _weex.data.createDate;
//                                storageData.content = _weex.data.content;
//                                storageData.unRead = _weex.data.unRead;
                                let option = {
                                    type:'message',
                                    key:_weex.data.userId,
                                    value:storageData,
                                    keyword:',' + _weex.data.name + ',' + _weex.data.nickName + ',' + _weex.data.content +',',
                                    sort:'0,' + timestamp
                                }
                                event.save(option,function (message) {
                                    if(message.type == 'success' && message.content =='更新成功'){
                                        _this.messageList.forEach(function (nowData,nowIndex) {
//                                            存入缓存里的userId 会消失掉
                                            nowData.userId = utils.isNull(nowData.userId) ? 'u' + parseInt(10200 + nowData.id) : nowData.userId;
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

                            }else{
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




                    }


                }else{
                    event.toast(_weex.content);
                }

            },
//          获取服务器新数据
            hadMessage(){
                var _this = this;
                GET('weex/member/message/dialogue.jhtml',function (_weex) {
//            向消息列表填入新的消息数据并存入缓存
//                     读取服务器上的数据；
                    _this.addMessage(_weex,0);
                },function (err) {
                    event.toast("网络不稳定");
                })
            },
//            根据时间排序
            sortTime:function (a,b) {
//                将时间戳变成日期格式 "2017-05-05 09:55:56"
                let first = utils.timeChange(a.createDate);
                let second = utils.timeChange(b.createDate);
//               '>'号时间越近在前面 倒序    '-'号的话是时间越久的在前面
                return ((new Date(first.replace(/-/g, "\/"))) > (new Date(second.replace(/-/g, "\/"))));
            },
            //            下拉刷新
            onrefresh (event) {
                modal.toast({ message: '加载中...', duration: 1})
                this.refreshing = true
                setTimeout(() => {
                    this.refreshing = false
                }, 2000)
            },
//            跳转消息列表
            jumpMessage:function(item,index){
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
                                        event.openURL(utils.locate('view/message/inform.js?type=' + item.userId), function () {
                                        });
                                    }else{
                                        event.navToChat(item.userId);
                                    };
                                }else{
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
                        });
//                    })

                    }else{
//                    item.unRead = 0;
                        event.navToChat(item.userId);
                    };
                };

            },
            menu:function(page){

            },
//            点击屏幕时
            ontouchstart:function (e,index) {
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
            onpanmove:function (e,index) {
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
            deleteMessage(){
                event.toast('删除成功');
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
                        SCAN(message, function (data) {

                        }, function (err) {

                        })
                });
            },
        }
    }
</script>
