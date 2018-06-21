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
            <div class="fansBox" :class="[headerFans()]">
                <text class="fans" @click="goFans">{{fans}}</text>
                <text class="fansText" @click="goFans">粉丝</text>
                <div class="focusBox" v-if="focusType">
                    <text class="focusIco" :style="{fontFamily:'iconfont'}">&#xe658;</text>
                    <text class="focusText">关注</text>
                </div>
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
        flex-direction: column;
        align-items:flex-end;
        position: absolute;
        right: 30px;
        top: 325px;
    }
   .fansBoxIPHONEX{
       flex-direction: column;
       align-items:flex-end;
       position: absolute;
       right: 30px;
       top: 335px;
   }
    .fans{
        font-size: 32px;
        color: #fff;
    }
   .fansText{
       font-size: 26px;
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
            focusType:false,
            fans:0,
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
            setting: function () {
                this.$emit("setting");
            },
            goFans: function () {
                this.$emit("goFans");
            },

//methods 方法到此为止
        },
    }
</script>

