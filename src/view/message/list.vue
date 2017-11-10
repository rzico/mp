<template>
    <div class="wrapper">
        <div class="header">
            <div class="flex-center flex1"></div>
            <div class="nav flex4">
                <text class="nav_title">消息</text>
            </div>
            <div class="flex-center flex1" @click="menu()">
                <text class="menu" :style="{fontFamily:'iconfont'}" >&#xe618;</text>
            </div>
        </div>
        <list class="list" :scrollable="canScroll">
            <refresh class="refresh"  @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新 ...</text>
            </refresh>
            <!--朋友信息-->
            <cell v-for="item in messageList" >
                <div class="deleteBox" @click="deleteMessage()">
                    <text class="deleteText">删除</text>
                </div>
                <div class="friendsLine" @click="jumpMessage(item,index)" @swipe="onpanmove($event,index)" @touchstart="ontouchstart($event,index)">
                    <!--头像-->
                    <div class="friendsImageBox">
                        <image :src="item.logo" class="friendsImage"></image>
                    </div>
                    <!--有新消息-->
                    <div class="newMessage" v-if="item.unRead != '' || item.unRead != 0 ">
                        <text class="messageTotal">{{item.unRead}}</text>
                    </div>
                    <div style="flex: 5;">
                        <div style="flex-direction: row;flex: 1;" >
                            <!--名字与内容-->
                            <div class="messageText">
                                <text class="friendName">{{item | watchName}}</text>
                                <!--<text class="friendMessage">{{item.content}}</text>-->
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
    .deleteText{
        font-size: 32px;color: #fff;
    }
    .deleteBox{
        position: absolute;right: 0px;top: 0px;height: 130px;align-items: center;width: 130px;justify-content: center;background-color: red;
    }
    .nav {
        flex:1;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
    }
    .menu {
        margin-top: 40px;
        font-size: 50px;
        line-height: 60px;
        height:60px;
        width:60px;
        color:white;
    }
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
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    import {dom,event,stream} from '../../weex.js';
    import filters from '../../filters/filters.js';
    var globalEvent = weex.requireModule('globalEvent');
    const animation = weex.requireModule('animation');

    var animationPara;//执行动画的消息
    export default {
        data:function(){
            return{
                messageList:[],
                refreshing: false,
                canScroll:true,
                currentNum:0,
                pageNum:20,
                chatItem:'',
                selfUserId:'',
//                messageList:[]
//                messageList:[{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'信徒',
//                    friendMessage:'怎么不回消息？',
//                    messageTime:'10:07',
//                    messageTotal:99
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'霍建华',
//                    friendMessage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXX',
//                    messageTime:'11:08',
//                    messageTotal:17
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'胡歌',
//                    friendMessage:'胡歌邀请你参加《琅琊榜2》的录制,点击链接即可报名！',
//                    messageTime:'12:09',
//                    messageTotal:1
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'Famous、库',
//                    friendMessage:'哈哈哈，好无聊',
//                    messageTime:'昨天',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'陈小春',
//                    friendMessage:'',
//                    messageTime:'12:07',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'番茄',
//                    friendMessage:'炒蛋吗？',
//                    messageTime:'9月8日',
//                    messageTotal:'1'
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'豪客来',
//                    friendMessage:'秋天，又到了吃货的季节。快上库鲁子网挑选吧！',
//                    messageTime:'9月8日',
//                    messageTotal:'1'
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'中国有嘻哈',
//                    friendMessage:'你会freestyle吗？',
//                    messageTime:'昨天',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'那英',
//                    friendMessage:'！',
//                    messageTime:'昨天',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'中国新歌声',
//                    friendMessage:'',
//                    messageTime:'昨天',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'陈小春',
//                    friendMessage:'',
//                    messageTime:'12:07',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'番茄',
//                    friendMessage:'炒蛋吗？',
//                    messageTime:'9月8日',
//                    messageTotal:'1'
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'豪客来',
//                    friendMessage:'秋天，又到了吃货的季节。快上库鲁子网挑选吧！',
//                    messageTime:'9月8日',
//                    messageTotal:'1'
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'中国有嘻哈',
//                    friendMessage:'你会freestyle吗？',
//                    messageTime:'昨天',
//                    messageTotal:''
//                },{
//                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
//                    friendName:'那英',
//                    friendMessage:'！',
//                    messageTime:'昨天',
//                    messageTotal:''
//                }]
            }
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
                    default:
                        return value.nickName;
                        break;
                }
            }
        },
        created() {
            var _this = this;
            utils.initIconFont();
            let listoption = {
                type:'message',//类型
                keyword:'',//关键址
                orderBy:'desc',//"desc"降序 ,"asc"升序
                current:0,
                pageSize:20,
            };
            this.selfUserId = event.getUserId();
//            event.toast(a);
//            读取本地缓存
            event.findList(listoption,function (data) {
                event.toast(data);
                if(data.type == 'success'){
                    data.data.forEach(function (item) {
                        _this.messageList.push(JSON.parse(item.value));
                    })
//                    })
                }else{
                    event.toast(data.content);
                }
            })
            this.hadMessage();
            globalEvent.addEventListener("onMessage", function (e) {
//                event.toast(e);
//                判断是系统消息还是用户消息  系统消息给返回的是id:gm_10200 没有userid字段。
                if(!utils.isNull(e.data.data.id) && e.data.data.id.substring(0,1) == 'g'){
                    _this.hadMessage();
                }else{
//                    用户消息没有userId。只有id。
                    e.data.data.userId = utils.isNull(e.data.data.userId) ? e.data.data.id : e.data.data.userId;

                    if(_this.selfUserId == e.data.data.userId){
                        _this.chatItem.createDate = e.data.data.createDate;
                        _this.chatItem.content = e.data.data.content;
                        e.data = _this.chatItem;
                        e.type = 'success';
                        _this.addMessage(e,1);
//                        event.toast(e.data);
                    }else{
                        _this.addMessage(e.data,1);
                    }
                }
            });
        },
        methods:{
//            向消息列表填入新的消息数据并存入缓存
            addMessage(_weex,sign){
                var _this = this;
                if(_weex.type == 'success'){
                    //            获取当前时间戳 作为唯一标识符key
                    let timestamp = Math.round(new Date().getTime()/1000);
//                    需要判断是否是数组。服务器返回的是数组，onmessage聊天的data是对象。
                    if(sign == 0){
                        _weex.data = _weex.data.reverse();
                        for(let i = 0;i<_weex.data.length -1 ;i++){
                            _weex.data[i].name = utils.isNull(_weex.data[i].name) ? '' : _weex.data[i].name;
                            let option = {
                                type:'message',
                                key:_weex.data[i].userId,
                                value:_weex.data[i],
                                keyword:',' + _weex.data[i].name + ',' + _weex.data[i].nickName + ',' + _weex.data[i].content +',',
                                sort:'0' + timestamp
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
//                        _weex.data.userId = utils.isNull(_weex.data.userId) ? _weex.data.id : _weex.data.userId;
                        let option = {
                            type:'message',
                            key:_weex.data.userId,
                            value:_weex.data,
                            keyword:',' + _weex.data.name + ',' + _weex.data.nickName + ',' + _weex.data.content +',',
                            sort:'0,' + timestamp
                        }
                        event.save(option,function (message) {
                            if(message.type == 'success' && message.content =='保存成功'){
                                _this.messageList.splice(0,0,_weex.data);
                            }else if(message.type == 'success' && message.content =='更新成功'){
                                _this.messageList.forEach(function (nowData,nowIndex) {
                                    if(nowData.userId == _weex.data.userId){
//                                        删除原来的对话
                                        _this.messageList.splice(nowIndex,1);
//                                        将新的对话push进
                                        _this.messageList.splice(0,0,_weex.data);
                                    }
                                })
                            }else{
                                event.toast('网络不稳定');
                            }
                        })

                    }


//                    _weex.data.forEach(function (item,index) {
//                        item.name = utils.isNull(item.name) ? '' : item.name;
//                        let option = {
//                            type:'message',
//                            key:item.userId,
//                            value:item,
//                            keyword:',' + item.name + ',' + item.nickName + ',' + item.content +',',
//                            sort:'0' + timestamp
//                        }
//                        event.save(option,function (message) {
//                            event.toast(message);
//                            if(message.type == 'success' && message.content =='保存成功'){
//                                _this.messageList.splice(0,0,item);
//                            }else if(message.type == 'success' && message.content =='更新成功'){
////                                event.toast('1');
//                                _this.messageList.forEach(function (nowData,nowIndex) {
//                                    if(nowData.userId == item.userId){
////                                        event.toast('2');
////                                        删除原来的对话
//                                        _this.messageList.splice(nowIndex,1);
////                                        将新的对话push进
//                                        _this.messageList.splice(0,0,item);
//                                    }
//                                })
//                            }else{
//                                event.toast('网络不稳定');
//                            }
//                        })
//                    })
                }else{
                    event.toast(_weex.content);
                }

            },
//          获取服务器新数据
            hadMessage(){
                var _this = this;
                GET('weex/member/message/dialogue.jhtml',function (_weex) {
//            向消息列表填入新的消息数据并存入缓存
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
//                event.toast(messageType);
//                event.toast(isRead);
                var _this = this;
//                event.toast(item);
                if(!utils.isNull(item.userId) && item.userId.substring(0,1) == 'g'){
                    item.unRead = 0;
                    let timestamp = Math.round(new Date().getTime()/1000);
                    let option = {
                        type:'message',
                        key:item.userId,
                        value:item,
                        keyword:',' + item.name + ',' + item.nickName + ',' + item.content +',',
                        sort:'0' + timestamp
                    }
//                    更新缓存数据后，跳转到通知页面
                    event.save(option,function (message) {
//                        event.openURL('http://192.168.2.157:8081/inform.weex.js?type=' + item.userId,function () {
                    event.openURL(utils.locate('view/message/inform.js?type=' + item.userId), function () {
                        });
                    })

                }else{
                    this.chatItem = item;
                    item.unRead = 0;
//                    event.toast(this.chatItem);
                    event.navToChat(item.userId);
                }
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
            }

        }
    }
</script>
