<template>
    <div>
        <div class="header">
            <!--顶部导航-->
            <div class="nav">
                <div style="width: 50px;" @click="goback()">
                    <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe669;</text>
                </div>
                <!--页面名称-->
                <div class="userBox" >
                    <text class=" nav_title">{{pageName}}</text>
                </div>
                <div style="width: 50px;" @click="goAddFriend()">
                    <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe618;</text>
                </div>
            </div>
        </div>
        <!--<div style="height: 110px;background-color: #D9141E;justify-content: center;padding-left: 30px;padding-top: 30px" >-->
        <!--<text style="color: #fff;font-size: 35px">朋友</text>-->
        <!--</div>-->
        <list class="listBody">
            <cell v-for="(item,index) in topLineList" ref="linkref" >
                <!--顶部功能栏-->
                <div class="addBorder">
                    <div class="topLine " @click="openPage(index)">
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
                <!--控制是否红色字体-->
                <text class="letterList" :class="[moveLetter == index ? 'addColor' : 'noColor']">{{item}}</text>
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
    .nav_ico {
    font-size: 38px;
    color: #fff;
}
    .userBox{
        flex-direction: row;
        align-items: center;
    }
    .nav{
        margin-top: 40px;
        flex-direction: row;
        height: 96px;
        width: 750px;
        align-items: center;
        justify-content: space-between;
        padding-right: 30px;
        padding-left: 30px;
    }
    /*顶部导航栏*/
.header {
    flex-direction: row;
    background-color: #D9141E;
    /*background-color: #fff;*/
    left: 0;
    right: 0;
    top:0;
    height: 136px;
}
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
        top:136px;
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
    import {dom,event,stream} from '../../weex.js';
    const modal = weex.requireModule('modal');
    import navbar from '../../include/navbar.vue'
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    //    var pressPoint = -1;//手指按压
    //    var movePoint;//手机按压后移动
    //    var pointPoor;//手机按压时与移动后的字母数量
    //    var moveLetter;//移动后的字母
    //    var beforePointPoor = -1; //前一次手机按压时与移动后的字母数量

    export default {
        data:function () {
            return   {
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
                friendTotal:43,
                topLineList:[{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'新的朋友'
                },{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'我关注的'
                },{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'我的粉丝'
                },{
                    lineImage:'https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg',
                    lineTitle:'我收藏的'
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
        },
        components:{
            navbar
        },
        created(){
            utils.initIconFont();
//            modal.toast({message:'111',duration:1})
            GET('/weex/member/friends/list.jhtml',function (data) {
                if(data.type == 'success' && data.data.data!=''){
                    event.toast(data);
                }else{
                    event.toast('没有数据');
                }
            },function (data) {
                event.toast(data.content);
            })
        },
        methods: {
            goAddFriend:function () {
             event.openURL(utils.locate("view/friend/add.js"),function (message) {
//                event.openURL('http://192.168.2.157:8081/add.weex.js',function (message) {
                    if(message.data != ''){
                        event.toast(message.data);
                    }
                });
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
                                    const el = this.$refs.listref[i]//跳转到相应的cell
                                    dom.scrollToElement(el, {
//                                        animated:false
                                    })
                                }else if(this.moveLetter == 0){//判断是否滑到 顶部按钮
                                    const el = this.$refs.linkref[this.moveLetter]//跳转到相应的cell
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
                switch(index){
                    case 0:
                      event.openURL(utils.locate('view/friend/new.js'),function (message) {
//                        event.openURL('http://192.168.2.157:8081/new.weex.js',function (message) {

                            event.toast(message);
                        });
                        break;
                    default:
                        break;
                }

            }

        }
    }
</script>

