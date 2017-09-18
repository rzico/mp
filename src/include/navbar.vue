<template>
    <div class="header">
        <div class="back" @click="goback('/')">
            <text class="image" :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="title">{{title}}</text>
         </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
     .back {
        position: relative;
        width: 96px;
        height: 96px;
        align-items: center;
    }
    .image {
        font-size: 44px;
        width: 44px;
        height: 44px;
        top:25px;
        color: #fff;
    }
    .nav {
        flex-direction: row;
        align-items: center;
    }
    .title {
        font-family: Verdana, Geneva, sans-serif;
        font-size: 38px;
        line-height: 38px;
        color: #FFFFFF;
     }

</style>
<script>
    const native = weex.requireModule('wxNativeModule');
    export default {
        props: {
            title: { default: "navbar" },
        },
        created(){
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        },
        methods: {
            goback: function (e) {
                this.$emit('goback');
            }
        }
     }
</script>