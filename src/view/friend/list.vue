<template>
    <div>
        <navbar :title="title":complete="complete" @goback="goback" @goComplete="goComplete" > </navbar>
        <div style="height: 110px;background-color: #D9141E;justify-content: center;padding-left: 30px;padding-top: 30px" >
            <text style="color: #fff;font-size: 35px">朋友</text>
        </div>
        <list class="listBody">
            <cell v-for="item in topLineList" ref="linkref" >
                 <!--顶部功能栏-->
                <div class="addBorder">
                    <div class="topLine " @click="jump('/member')">
                        <image :src="item.lineImage" class="lineImage"></image>
                        <text class="lineTitle">{{item.lineTitle}}</text>
                    </div>
                </div>
            </cell>
            <cell v-for="friend in friendsList" ref="listref">
                <!--姓氏首字母-->
                <div class="letterBox">
                    <text class="nameLetter">{{friend.letter}}</text>
                </div>
                <!--姓氏里每个人的名子-->
                <div v-for="item in friend.name"  >
                    <div class="addFriendsBorder">
                        <div class="friendsLine" @click="jump('/member')">
                            <image :src="item.friendImage" class="friendsImage"></image>
                            <div class="friendsName">
                                <text class="lineTitle">{{item.friendName}}</text>
                                <text class="realName">真实姓名:{{item.realName}}</text>
                            </div>
                        </div>
                    </div>
                </div>
            </cell>
            <cell>
                <!--总共多少个好友-->
                <div class="friendTotalBox">
                    <text class="friendTotalText">{{friendTotal}}个朋友</text>
                </div>
            </cell>
        </list>
        <!--右侧字母列表-->
        <div class="letterNavBox" :class = "[isPress ? 'letterOnPress' : '']">
            <div class="letterNav" v-for="(item,index) in allLetter"   @longpress="onlongpress(index)" @touchstart="ontouchstart(index)" @touchend="ontouchend()"  @touchmove="ontouchmove(index,$event)">
                <!--<text class="letterList" v-if="index == 0">up</text>-->
                <text class="letterList" >{{item}}</text>
            </div>
        </div>
    </div>
</template>

<style>
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
        top:110px;
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
    }
    .lineTitle{
        font-size: 34px;
        margin-left: 20px;
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    const navigator = weex.requireModule('navigator');
    import navbar from '../../include/navbar.vue'
    const dom = weex.requireModule('dom');
    var pressPoint = -1;//手指按压
    var movePoint;//手机按压后移动
    var pointPoor;//手机按压时与移动后的字母数量
    var moveLetter;//移动后的字母
    var beforePointPoor = -1; //前一次手机按压时与移动后的字母数量
    export default {
        data:function () {
            return   {
//                    text:'Jum333132p',
                isPress:false,
                friendTotal:43,
                topLineList:[{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'新的朋友'
                },{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'我的粉丝'
                },{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'功能1'
                },{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'功能2'
                }],
                friendsList:[{
                    letter:'A',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'B',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'大咖秀',
                        realName:'王龙'
                    }]
                },{
                    letter:'C',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'D',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'E',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'F',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'H',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'J',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'K',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'L',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'M',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'N',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'O',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'P',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'Q',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'R',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'S',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'T',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'W',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'X',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'Y',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'Z',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'番茄',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'炒蛋',
                        realName:'杨彩铃'
                    }]
                },{
                    letter:'#',
                    name:[{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'19',
                        realName:'炒茄子'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'2333',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'455',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'639',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'455',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'639',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'455',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'639',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'455',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'639',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'455',
                        realName:'杨彩铃'
                    },{
                        friendImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                        friendName:'639',
                        realName:'杨彩铃'
                    }]
                }],
                allLetter:['||','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
            }
        },
        props: {
            title: { default: "朋友"},
            complete:{ default:"完成"}
        },
        methods: {
            goComplete:function () {
            },
            goback:function () {
              event.closeURL();
            },
            jump:function (vueName) {
                modal.toast({message:'点击了信息栏'});
            },
            onlongpress :function(count) {
                modal.toast({ message:this.allLetter[count] ,duration: 0.3});
                this.isPress = true;
            },
            ontouchstart:function(count){
                if(count == 0){//判断是否点击回到顶部
                    const el = this.$refs.linkref[count]//跳转到相应的cell
                    dom.scrollToElement(el, {
//                        animated:false
                    })
                }else{
                    for(var i = 0;i<this.friendsList.length ;i++){//循环判断是否有相应首字母的朋友
                        if(this.friendsList[i].letter == this.allLetter[count]){
                            const el = this.$refs.listref[i]//跳转到相应的cell
                            dom.scrollToElement(el, {
//                                animated:false
                            })
                        }
                    }
                }
                modal.toast({ message:this.allLetter[count] ,duration: 0.3});
                this.isPress = true;
            },
            ontouchend:function(){
                this.isPress = false;
                pressPoint = -1;//重置判断是否刚开始滑动的标志符（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
                beforePointPoor == -1;//（可以不用，点击并长按时已经帮忙弥补了该数据的漏洞）
            },
//        ==============================
            ontouchmove:function(count,event){//按住字母导航栏并拖动时触发
                if(pressPoint == - 1){//记录每次第一次滑动按压的点
                    pressPoint = event.changedTouches[0].pageY;
                }else{
                    movePoint = Math.abs(pressPoint - event.changedTouches[0].pageY);//求移动的距离(绝对值)
                    if(movePoint > 35){
                        pointPoor = Math.floor(movePoint/35);//通过偏移量获取上移的字母数量
                        if(!(beforePointPoor == -1 || beforePointPoor == pointPoor)){
                            if(pressPoint - event.changedTouches[0].pageY >= 0){
                                moveLetter = count - pointPoor;//获取目前手指停留的字母下标
                            }else{
                                moveLetter = count + pointPoor;//获取目前手指停留的字母
                            }
                            for(var i = 0;i<this.friendsList.length;i++){//循环判断是否有相应首字母的朋友
                                if(this.friendsList[i].letter == this.allLetter[moveLetter]){
                                    const el = this.$refs.listref[i]//跳转到相应的cell
                                    dom.scrollToElement(el, {
//                                        animated:false
                                    })
                                }else if(moveLetter == 0){//判断是否滑到 顶部按钮
                                    const el = this.$refs.linkref[moveLetter]//跳转到相应的cell
                                    dom.scrollToElement(el, {
//                                        animated:false
                                    })
                                }
                            }
                            modal.toast({ message:this.allLetter[moveLetter] ,duration: 0.001});//弹出提示框toast
                        }
                        beforePointPoor = pointPoor;//把这次的滑动的字母数量保存起来
                    }
                }
            },

        }
    }
</script>
