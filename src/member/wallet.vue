<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">

            <cell class="cell">
                <div class="panel">
                    <div class="flex1">
                        <text class="wallet-title">钱包余额（元）</text>
                    </div>
                    <div class="flex2">
                        <text class="balance">1000000.00</text>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">银行卡</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">已绑定</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">提现</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">我的账单</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">我的赏金</text>
                    </div>
                    <div class="last">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                        <text class="title">我的奖励</text>
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

    .wallet-title {
        font-size: 32px;
        color: #fff;
        margin-left:60px;
    }

    .panel {
        background-color: #F0AD3C;
        flex-direction: column;
        height:400px;
    }

    .flex1 {
        flex: 1;
        justify-content: center;

    }
    .flex2 {
        flex: 1;
    }

    .balance {
        font-size: 120px;
        color: #fff;
        margin-left:40px;
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
            title: { default: "钱包" }
        },
        methods: {
            goback: function (e) {
                navigator.pop({
                    url: 'http://cdn.rzico.com/weex/app/member/setup.js',
                    animated: "true"
                })
            },
            setup: function (e) {

            }
        }

    }
</script>