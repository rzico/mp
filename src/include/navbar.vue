<template>
    <div class="header" :class="[border==true?'' : 'cb']">
        <div class="nav_back" @click="goback('/')">
            <text class="nav_ico" :style="{fontFamily:'iconfont'}">&#xe669;</text>
        </div>
        <div class="nav">
            <text class="nav_title">{{title}}</text>
            <text class="nav_Complete" v-if="showComplete" @click="goComplete('/')">{{complete}}</text>
         </div>
    </div>
 </template>
<style lang="less" src="../style/wx.less"/>
<style scoped>
    .cb {
        border-bottom-width: 0px;
    }
    .nav_back {
        margin-top: 40px;
        flex-direction: row;
        width: 96px;
        height: 96px;
        align-items: center;
        justify-content: center;
    }
    .nav_ico {
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
    .nav_Complete {
        font-family: Verdana, Geneva, sans-serif;
        font-size: 34px;
        line-height: 34px;
        color: #FFFFFF!important;
    }

</style>
<script>
    export default {
        props: {
            title: { default: "navbar" },
            complete:{default:''},
            showComplete:{default:true},
            border:{default:true}
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