<template>
    <div class="header" :class="[classHeader(),border==true?'':'cb']" >
        <!--<image class="nav_bg" :src="'file://resources/images/nav_bg.png'"></image>-->
        <div class="nav_back" @click="goback('/')">
            <text class="nav_ico"  :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="nav_title">{{title}}</text>
            <div class="navRightBox"  v-if="showComplete" @click="goComplete('/')">
                <text class="nav_Complete nav_title" v-if="complete != 'textIcon'">{{complete}}</text>
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
        min-width: 92px;
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
        /*如果nav_ico的字体大小改变这个值也需要变。 （左边box宽度-back图标宽度)/2 */
        padding-left: 27px;
        padding-right: 27px;
        font-family: Verdana, Geneva, sans-serif;
        font-size: 44px;
        line-height: 44px;
        color: #FFFFFF;
    }
    .nav_Complete {
        padding-left: 27px;
        padding-right: 27px;
        font-family: Verdana, Geneva, sans-serif;
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