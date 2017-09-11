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
                            <text class="title">张三</text>
                            <text class="autograph">点击设置个性签名</text>
                        </div>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <div class="left">
                       <text class="ico" :style="{fontFamily:'iconfont'}">&#xe651;</text>
                       <text class="title">通用设置</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a4;</text>
                        <text class="title">专栏认证</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">已认证</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6a7;</text>
                        <text class="title">商品管理</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">订单管理</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">0个待处理</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">评价管理</text>
                    </div>
                    <div class="last">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">投票管理</text>
                    </div>
                    <div class="last">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                        <text class="title">推荐给好友</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe65a;</text>
                        <text class="title">联系客服</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>

</template>
<style src='../style/wx.css' />
<style scoped>
    .logo {
        width:120px;
        height:120px;
        margin:10px;
        border-radius:60px;
        overflow:hidden;
    }

    .autograph {
        font-size: 28px;
        color: #ccc;
        margin-left:10px;
        margin-top:10px;
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
            title: { default: "管理设置" }
        },
        methods: {
            goback: function (e) {
                navigator.pop({
                    url: 'http://cdn.rzico.com/weex/app/member/manager.js',
                    animated: "true"
                },function (msg) {
                    msg = "pop ";
                } )
            },
            setup: function (e) {
                navigator.push({
                    url: 'http://cdn.rzico.com/weex/app/member/setup.js',
                    animated: "true"
                })
            }
        }
    }
</script>