<template>
    <header class="navbar" dataRole="navbar">
        <text class="navbar-left" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
        <text class="navbar-title">{{title}}</text>
    </header>
</template>
<style scoped>

    .navbar {
        background: #F0AD3C;
        border-color: #707070;
        height: 96px;
        align-items:center;
        flex-direction: row;
    }
    .navbar-left {
        font-size: 48px;
        width:96px;
        align-items:center;
    }
    .navbar-title {
        font-size: 48px;
        text-align: left;
        color: #707070;
    }

</style>
<script>
    export default {
        props: {
            title: { default: "navbar" }
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