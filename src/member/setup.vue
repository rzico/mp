<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">
            <cell class="cell">
                <div class="cell-row"  @click="setup">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="text name">张三</text>
                            <text class="autograph">点击设置个性签名</text>
                        </div>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row">
                    <div class="left">
                       <text class="ico" :style="{fontFamily:'iconfont'}">&#xe651;</text>
                       <text class="text">通用设置</text>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a4;</text>
                        <text class="text">专栏认证</text>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a7;</text>
                        <text class="text">商品管理</text>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="text">订单管理</text>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                        <text class="text">推荐给好友</text>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe65a;</text>
                        <text class="text">联系客服</text>
                    </div>
                    <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                </div>
            </cell>
        </list>
    </div>

</template>
<style scoped>

    .text {
        margin: 10px;
        font-size: 32px;
    }

    .ico {
        margin-top: 8px;
        margin-left:10px;
        font-size: 58px;
        color: #F0AD3C;
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

    .cell-row {
        min-height: 100px;
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        justify-content: space-between;
        align-items: center;
    }

    .clear-row {
        margin-top: 1px;
    }

    .logo {
        width:150px;
        height:150px;
        margin:10px;
        border-radius:70px;
        overflow:hidden;
    }

    .autograph {
        font-size: 28px;
        color: #ccc;
        margin-left:10px;
    }

    .left {
        flex-direction: row;
        align-items: center;
    }

    .arrow {
        font-size: 44px;
        color: #ccc;
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
            },
            setup: function (e) {
                navigator.pop({
                    url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
                    animated: "true"
                })
            }
        }

    }
</script>