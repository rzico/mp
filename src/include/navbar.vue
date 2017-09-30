<script src="../mixins/wx.js"></script>
<template>
    <div class="header">
        <div class="back" @click="goback('/')">
            <text class="image" :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="title">{{title}}</text>
            <text class="complete" @click="goComplete('/')">{{complete}}</text>
         </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>

<style scoped>
    .back {
        margin-top: 40px;
        flex-direction: row;
        width: 96px;
        height: 96px;
        align-items: center;
        justify-content: center;
    }
    .image {
        font-size: 38px;
        color: #fff;
    }
    .nav {
        width:654px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding-right: 30px;
        margin-top: 40px;
    }
    .title {
        font-family: Verdana, Geneva, sans-serif;
        font-size: 38px;
        line-height: 38px;
        color: #FFFFFF;
     }
    .complete {
        font-family: Verdana, Geneva, sans-serif;
        font-size: 34px;
        line-height: 34px;
        color: #FFFFFF;
    }

</style>
<script>
    import {jsMixins} from '../mixins/wx.js'
    export default {
        mixins:[jsMixins],
        props: {
            title: { default: "navbar" },
            complete:{default:''}
        },
        methods: {
            goback: function (e) {
                this.$emit('goback');
            },
            goComplete:function (e) {
                this.$emit('goComplete');
            }
        }
     }
</script>