<template>

        <div class="headerBox">
            <image class="bgImg" :src="imgBg"></image>
            <image class="img_heightMask" :src="img_heightMask"></image>
            <!--<image class="img_mask" :src="img_mask"></image>-->
            <div class="memberBox" :class="[headerInfo()]">
                <image class="logo" :src="logo" @click="setting()"></image>
                <div class="memberInfo">
                    <text class="name">{{userName}}</text>
                    <div class="jobBox" v-if="occupation != ''">
                        <text class="jobText primary" >{{occupation}}</text>
                    </div>
                </div>
                <text class="signature">{{userSign}}</text>
            </div>
            <!--<div class="wallet" @click="goWallet" v-if="showType">-->
                <!--<text class="walletText" style="padding-top: 3px">钱包</text>-->
                <!--<text :style="{fontFamily:'iconfont'}" class="walletText ml20">&#xe630;</text>-->
            <!--</div>-->
            <div class="operationBox" :class="[operationBox()]" v-if="showType">
                <div class="walletBox" @click="goWallet">
                    <text :style="{fontFamily:'iconfont'}" class="walletIco mr10">&#xe63e;</text>
                    <text class="walletBoxText" style="padding-top: 2px">钱包</text>
                </div>
                <div class="settingBox"  @click="goManage">
                    <text  class="settingBoxText" :style="{fontFamily:'iconfont'}">&#xe62d;</text>
                </div>
                <div class="shareBox" @click="goShare">
                    <text  class="shareBoxText" :style="{fontFamily:'iconfont'}">&#xe692;</text>
                </div>
            </div>
            <div class="fansBox" :class="[headerFans()]">
                <div class="mr20 flex-row" @click="goCollect">
                    <text class="fans mr10">{{collect}}</text>
                    <text class="fansText">收藏</text>
                </div>
                <div class="mr20 flex-row"  @click="goFocus">
                    <text class="fans mr10">{{focus}}</text>
                    <text class="fansText">关注</text>
                </div>
                <div class="flex-row"  @click="goFans">
                <text class="fans mr10" >{{fans}}</text>
                <text class="fansText">粉丝</text>
                </div>
                <!--<div class="focusBox" >-->
                    <!--<text class="focusIco" :style="{fontFamily:'iconfont'}">&#xe658;</text>-->
                    <!--<text class="focusText">关注</text>-->
                <!--</div>-->
            </div>
        </div>

</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
   .headerBox{
       width: 750px;
       position: absolute;
       top: 0;
   }
   .headerBoxIPHONEX{
       width: 750px;

   }
    .bgImg{
        width: 750px;
        height: 750px;
    }
    .img_heightMask{
        width: 750px;
        height: 750px;
        position: absolute;
        top: 0;
    }
    .img_mask{
        width: 750px;
        height: 126px;
        /*opacity:0.6;*/
        position: absolute;
        top: 249px;
    }
    .memberBox{
        flex-direction: column;
        padding-left: 40px;
        position: absolute;
        top:150px;
    }
   .memberBoxIPHONEX{
       flex-direction: column;
       padding-left: 40px;
       position: absolute;
       top:160px;
   }
    .logo{
        height: 120px;
        width: 120px;
        background-color: #ccc;
        border-width: 5px;
        border-color: #eeeeee;
        border-radius: 100%;
    }
    .memberInfo{
        margin-top: 24px;
        flex-direction: row;
        align-items: center;
        height: 40px;
    }
    .name{
        font-size: 36px;
        font-weight: bold;
        color: white;
        max-width: 250px;
        lines:1;
        text-overflow: ellipsis;
    }
    .jobBox{
        margin-left: 15px;
        padding-left: 15px;
        padding-right: 15px;
        background-color: rgba(238,238,238,0.5);
        border-radius: 30px;
        align-items: center;
        justify-content: center;
    }
    .jobText{
        font-size: 24px;
    }
    .signature{
        margin-top: 28px;
        font-size: 26px;
        line-height: 26px;
        color: white;
    }
    .fansBox{
        flex-direction: row;
        align-items:flex-end;
        position: absolute;
        right: 30px;
        top: 300px;
    }
   .fansBoxIPHONEX{
       flex-direction: column;
       align-items:flex-end;
       position: absolute;
       right: 30px;
       top: 310px;
   }
    .fans{
        font-size: 28px;
        color: #fff;
    }
   .fansText{
       font-size: 24px;
       color: #fff;
   }
    .focusBox{
        margin-top: 10px;
        flex-direction: row;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 60px;
        background-color: #5eb0fd;
    }
    .focusIco{
        padding-top: 7px;
        font-size: 32px;
        color:#fff;
    }
   .focusText{
       font-size: 28px;
       color:#fff;
   }
    .wallet{
        padding-left: 30px;
        position: absolute;
        top: 200px;
        right:0;
        height: 60px;
        width: 150px;
        flex-direction: row;
        align-items: center;
        border-top-left-radius: 80px;
        border-bottom-left-radius: 80px;
        border-top-width: 5px;
        border-left-width: 5px;
        border-bottom-width: 5px;
        border-color: #eeeeee;
        background-image: linear-gradient(to right, #EB4E40,#ff700b);
    }
    .walletText{
        font-size: 22px;
        color: white;
    }
    .operationBox{
        position: absolute;
        top: 210px;
        right:20px;
        flex-direction: row;
        align-items: center;
    }
   .operationBoxIPHONEX{
       position: absolute;
       top: 220px;
       right:20px;
       flex-direction: row;
       align-items: center;
   }
    .walletBox{
        height: 60px;
        width: 120px;
        background-color: rgba(102,102,102,0.8);
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 5px;
    }
    .walletBoxText{
        font-size: 24px;
        color: #eee;
    }
    .settingBox{
        height: 60px;
        width: 60px;
        background-color: rgba(102,102,102,0.8);
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border-radius: 5px;
    }
   .settingBoxText{
       font-size: 32px;
       color: #eee;
   }
    .shareBox{
        height: 60px;
        width: 60px;
        background-color: rgba(102,102,102,0.8);
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }
   .shareBoxText{
       font-size: 32px;
       color: #eee;
   }
    .walletIco{
        font-size: 30px;
        color: #eee;
    }
</style>
<script>
    import navbar from '../include/navbar.vue';
    import {dom,event} from '../weex.js'
    import { POST, GET } from '../assets/fetch.js';
    import utils from '../assets/utils';
    import filters from '../filters/filters.js';
    import noData from '../include/noData.vue';
    export default {
        components: {
            noData,
            navbar,
        },
        data: function () {
            return {
                img_mask:utils.locate('resources/images/topic_curveMask.png'),
                img_heightMask:utils.locate('resources/images/topic_heightMaskf5f5f5.png'),
            }
        },
        props: {
            showType:false,
            fans:0,
            focus:0,
            collect:0,
            logo:{},
            imgBg: '',
            occupation:'',
            userName: {
                default: function () {''}
            },
            userSign: {
                default: function () {'TA好像忘记签名了'}
            },
        },
        filters:{

        },
        created(){

        },
        mounted(){

        },
        methods: {
            //            监听设备型号,控制顶部人物信息栏
            headerInfo: function() {
                let dc = utils.topicInfo();
                return dc;
            },
            //            监听设备型号,控制顶部操作栏
            operationBox: function() {
                let dc = utils.topicOperation();
                return dc;
            },
            //            监听设备型号,控制顶部人物粉丝栏
            headerFans: function() {
                let dc = utils.topicFans();
                return dc;
            },
            //            监听设备型号,控制顶部人物信息栏背景图大小
            headerBgImg:function () {
                let dc = utils.topicBgImg();
                return dc;
            },
            goWallet: function () {
                this.$emit("goWallet");
            },
            goManage:function () {
                this.$emit("goManage");
            },
            goShare:function () {
                this.$emit("goShare");
            },
            setting: function () {
                this.$emit("setting");
            },
            goFans: function () {
                this.$emit("goFans");
            },
            goFocus: function () {
                this.$emit("goFocus");
            },
            goCollect: function () {
                this.$emit("goCollect");
            },
//methods 方法到此为止
        },
    }
</script>

