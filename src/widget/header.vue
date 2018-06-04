<template>
    <div class="">
        <div class="headerBox">
            <image class="bgImg" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/background.jpg"></image>
            <image class="bgImgTwo" src="http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/topic_mask.png"></image>
            <div class="memberBox">
                <image class="logo" :src="logo" @click="setting()"></image>
                <div class="memberInfo">
                    <text class="name">{{userName}}</text>
                    <div class="jobBox">
                        <text class="jobText">教授</text>
                    </div>
                </div>
                <text class="signature">{{userSign}}</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
   .headerBox{
       width: 750px;
       height: 375px;
   }
    .bgImg{
        width: 750px;
        height: 375px;
    }
    .bgImgTwo{
        width: 750px;
        height: 375px;
        opacity:0.6;
        position: absolute;
        top: 0;
    }
    .memberBox{
        flex-direction: column;
        padding-left: 30px;
        position: absolute;
        top:69.5px;
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
        margin-top: 20px;
        flex-direction: row;
        align-items: center;
        height: 40px;
    }
    .name{
        font-size: 32px;
        color: white;
    }
    .jobBox{
        margin-left: 15px;
        padding-left: 15px;
        padding-right: 15px;
        background-color: rgba(255,255,255,0.3);
        border-radius: 30px;
        align-items: center;
        justify-content: center;
    }
    .jobText{
        font-size: 24px;
        color: #EB4E40;
    }
    .signature{
        margin-top: 20px;

        font-size: 26px;
        color: white;
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
                imgBg:utils.locate('resources/images/topic_mask.png'),
            }
        },
        props: {
            logo:{},
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
            setting: function () {
                this.$emit("setting");
            },

//methods 方法到此为止
        },
    }
</script>

