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
        <list class="list">
            <refresh class="refresh"  @refresh="onrefresh"  :display="refreshing ? 'show' : 'hide'">
                <text class="indicator">下拉刷新 ...</text>
            </refresh>
            <!--朋友信息-->
            <cell v-for="item in messageList " >
                <div class="friendsLine" @click="jumpMessage(item,index)">
                    <!--头像-->
                    <div class="friendsImageBox">
                        <image :src="item.logo" class="friendsImage"></image>
                    </div>
                    <!--有新消息-->
                    <div class="newMessage" v-if="item.unRead != '' || item.unRead != 0 ">
                        <text class="messageTotal">{{item.unRead}}</text>
                    </div>
                    <!--名字与内容-->
                    <div class="messageText">
                        <text class="friendName">{{item | watchName}}</text>
                        <text class="friendMessage">{{item.content}}</text>
                    </div>
                    <!--消息时间-->
                    <div class="messageTimeBox">
                        <text class="messageTime">{{item.createDate | timefmt}}</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>
</template>

<style lang="less" src="../../style/wx.less"/>
<style>
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
        padding-top: 8px;
        flex: 1;
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
        padding-top: 8px;
        padding-bottom: 8px;
        flex:5;
        height: 100px;
        justify-content: space-between;
        margin-left: 20px;
    }
    .friendMessage{
        lines:1;
        text-overflow:ellipsis;
        color: #999;
        font-size: 28px;
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
    export default {
        data:function(){
            return{
                messageList:[],
                refreshing: false,
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
                switch(value.type){
                    case 'order':
                        return '订单提醒';
                        break;
                    case 'account':
                        return '账单提醒'
                        break;
                    case 'message':
                        return '系统消息';
                        break;
                    case 'review':
                        return '评论回复'
                        break;
                    case 'laud':
                        return '点赞提醒';
                        break;
                    case 'follow':
                        return '关注提醒'
                        break;
                    case 'favorite':
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
                keyword:'messageList',//关键址
                orderBy:'desc',//"desc"降序 ,"asc"升序

            }
//            读取本地缓存
            event.findList(listoption,function (data) {
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
                if (timer!=null) {
                    clearInterval(timer);
                }
                timer = setInterval(1000,function () {
                    GET("payment/query.jhtml?sn="+this.sn).then(
                        function (data) {

                            if (data.type=="success") {
                                if (data.data=="0000") {
                                    _this.close("success");
                                } else {
                                    if (data.data=="0001") {
                                        _this.close("error");
                                    }
                                }
                            }

                        },
                        function (err) {
                        }
                    )
                });
            });
        },
        methods:{
//          获取服务器新数据
            hadMessage(){
                var _this = this;
                GET('weex/member/message/dialogue.jhtml',function (weex) {
//                event.toast(weex.data);
                    if(weex.type == 'success'){
                        //            获取当前时间戳 作为唯一标识符key
                        let timestamp = Math.round(new Date().getTime()/1000);
//                    倒过来
                        weex.data = weex.data.reverse();
                        weex.data.forEach(function (item,index) {
                            let option = {
                                type:'message',
                                key:item.type,
                                value:item,
                                keyword:'messageList',
                                sort:'0' + timestamp
                            }
                            event.save(option,function (message) {
//                            event.toast(message);
                                if(message.type == 'success' && message.content =='保存成功'){
                                    _this.messageList.splice(0,0,item);
                                }else if(message.type == 'success' && message.content =='更新成功'){
//                                event.toast('1');
                                    _this.messageList.forEach(function (nowData,nowIndex) {
                                        if(nowData.type == item.type){
//                                        event.toast('2');
//                                        删除原来的对话
                                            _this.messageList.splice(nowIndex,1);
//                                        将新的对话push进
                                            _this.messageList.splice(0,0,item);
                                        }
                                    })
                                }else{
                                    event.toast('网络不稳定');
                                }
                            })

                        })
                    }else{
                        event.toast(weex.content);
                    }
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
                GET('weex/member/message/list.jhtml?type=' + item.type ,function (weex) {
                    event.toast(weex);
                    if(weex.type == 'success'){
//                        未读消息取消掉
                        item.unRead = 0;
                        let timestamp = Math.round(new Date().getTime()/1000);
                        let option = {
                            type:'message',
                            key:item.type,
                            value:item,
                            keyword:'messageList',
                            sort:'0' + timestamp
                        }
                        event.save(option,function (message) {})
                    }
                },function (err) {
                    event.toast('网络不稳定');
                })
            },
            menu:function(page){

            },
        }
    }
</script>
