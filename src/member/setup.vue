<template>
    <div class="wrapper">
        <list class="list" style="margin: 0px;border: 0px;">
            <navbar :title="title" @goback="goback"> </navbar>
            <cell class="cell">
                <div class="panel ">
                    <image class="logo" resize="cover"
                           src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                    </image>
                    <div style="flex-direction: column;">
                        <text class="text name">张三</text>
                        <text class="autograph">点击设置个性签名</text>
                    </div>
                </div>
            </cell>
            <cell class="cell">
                <div class="panel">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">通用设置</text>
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
            </cell>
            <cell class="cell">
                <div class="panel">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">专栏认证</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
                <div class="panel clear">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">商品管理</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
                <div class="panel clear">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">我的订单</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
                <div class="panel clear">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">评论管理</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
                <div class="panel clear">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">评论管理</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
            </cell>
            <cell class="cell">
                <div class="panel">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">推荐给朋友</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
            </cell>
            <cell class="cell">
                <div class="panel clear">
                    <text class="text" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                    <text class="text name">关于美篇</text>
                    <text class="text last" :style="{fontFamily:'iconfont'}" v-on:click="goback">&#xe669;</text>
                </div>
            </cell>
        </list>
    </div>

</template>
<style scoped>

    .text {
        font-size: 38px;
    }

    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color: #eeeeee;
    }

    .cell {
        background-color: #eeeeee;
    }

    .panel {
        align-items:center;
        min-height: 100px;
        flex-direction: row;
        background-color: #ffffff;
        margin: 20px 0px 20px 0px;
        padding: 20px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }
    .clear {
        margin: 0px 0px 00px 0px;
        padding: 20px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
    }

    .logo {
        width:150px;
        height:150px;
        margin:10px;
        border-radius:50%;
        overflow:hidden;
    }

    .autograph {
        font-size: 28px;
        text-align: left;
        color: #ccc;
    }

    .last {

    }
</style>
<script>
    var navigator = weex.requireModule('navigator')
    import navbar from '../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "设置" }
        },
        methods: {
            goback: function (e) {
                navigator.push({
                    url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
                    animated: "true"
                })
            }
        }

    }
</script>