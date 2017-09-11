<template>
    <list class="wrapper">
        <!--朋友信息-->
        <cell v-for="item in messageList" >
            <div class="friendsLine" @click="jump('/member')">
                <!--头像-->
                <div class="friendsImageBox">
                    <image :src="item.friendImage" class="friendsImage"></image>
                </div>
                <!--有新消息-->
                <div class="newMessage" v-if="item.messageTotal != ''">
                    <text class="messageTotal">{{item.messageTotal}}</text>
                </div>
                <!--名字与内容-->
                <div class="messageText">
                        <text class="friendName">{{item.friendName}}</text>
                        <text class="friendMessage">{{item.friendMessage}}</text>
                </div>
                <!--消息时间-->
                <div class="messageTimeBox">
                    <text class="messageTime">{{item.messageTime}}</text>
                </div>
            </div>
        </cell>
    </list>
</template>

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
        left:95px;
        top:5px;
        width:60px;
        align-items: center;
    }
    .messageTimeBox{
        padding-top: 8px;
        flex: 2;
        align-items: flex-end;
        padding-right: 10px;
    }
    .messageTime{
        color: #999;
        font-size: 24px;
        lines:1;
    }
    .wrapper{
        background-color: #fff;
    }
    .friendName{
        lines:1;
        text-overflow: ellipsis;
        font-size: 34px;
    }
    .messageText{
        padding-top: 8px;
        padding-bottom: 8px;
        flex:4;
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
    export default {
        data:function(){
            return{
                messageList:[{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'信徒',
                    friendMessage:'怎么不回消息？',
                    messageTime:'10:07',
                    messageTotal:99
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'霍建华',
                    friendMessage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXX',
                    messageTime:'11:08',
                    messageTotal:17
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'胡歌',
                    friendMessage:'胡歌邀请你参加《琅琊榜2》的录制,点击链接即可报名！',
                    messageTime:'12:09',
                    messageTotal:1
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'Famous、库',
                    friendMessage:'哈哈哈，好无聊',
                    messageTime:'昨天',
                    messageTotal:''
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'陈小春',
                    friendMessage:'',
                    messageTime:'12:07',
                    messageTotal:''
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'番茄',
                    friendMessage:'炒蛋吗？',
                    messageTime:'9月8日',
                    messageTotal:'1'
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'豪客来',
                    friendMessage:'秋天，又到了吃货的季节。快上库鲁子网挑选吧！',
                    messageTime:'2016年9月8日',
                    messageTotal:'1'
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'中国有嘻哈',
                    friendMessage:'你会freestyle吗？',
                    messageTime:'昨天',
                    messageTotal:''
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'那英',
                    friendMessage:'！',
                    messageTime:'昨天',
                    messageTotal:''
                },{
                    friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    friendName:'中国新歌声',
                    friendMessage:'',
                    messageTime:'昨天',
                    messageTotal:''
                }]
            }
        },
        methods:{
            jump:function(page){

            }
        }
    }
</script>