<template>
    <div class="header" :class="[classHeader(),border==true?'':'cb']" >
        <!--<image class="nav_bg" :src="'file://resources/images/nav_bg.png'"></image>-->
        <div class="nav_back" @click="goback('/')">
            <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="nav_title">{{title}}</text>
            <div class="navRightBox"  v-if="showComplete" @click="goComplete('/')">
                <text class="nav_Complete" v-if="complete != 'textIcon'">{{complete}}</text>
                <text class="nav_CompleteIcon"  :style="{fontFamily:'iconfont'}" v-else>&#xe72b;</text>
            </div>

         </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .cb {
        border-bottom-width: 0px;
    }
    .navRightBox{
        width: 110px;
        height: 92px;
        align-items: center;
        justify-content: center;
    }
    .nav_bg {
        width:750px;
        height: 156px;
        background-size: cover;
        position: absolute;
        top:0;
    }
    .nav_ico {
        font-size: 38px;
        color: #fff;
        margin-top: 2px;
    }
    .nav_CompleteIcon{
        padding-left: 16px;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
        margin-right: 20px;
    }
    .nav_Complete {
        padding-left: 16px;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 34px;
        line-height: 34px;
        color: #FFFFFF;
        margin-right: 20px;
    }

</style>
<script>
    import utils from '../assets/utils'
    export default {
        props: {
            title: { default: "navbar" },
            complete:{default:''},
            showComplete:{default:true},
            border:{default:true}
        },
        methods: {
            classHeader:function () {
                let dc = utils.device();

                return dc
            },
            goback: function (e) {
                this.$emit('goback');
            },
            goComplete:function (e) {
                this.$emit('goComplete');
            }
        }
     }
</script>