<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="wallet-panel">
                <text class="wallet-title">钱包余额（元）</text>
                <text class="balance">1000000.00</text>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between" @click="bindingCard">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe64f;</text>
                        <text class="title ml10">银行卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">已绑定</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>

                <div class="cell-panel space-between cell-clear" @click="cashCard">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe626;</text>
                        <text class="title ml10">提现到银行卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe61f;</text>
                        <text class="title ml10">我的账单</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe698;</text>
                        <text class="title ml10">我的赏金</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                        <text class="title ml10">我的奖励</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .wallet-title {
        margin-top: 70px;
        flex:1;
        font-size: 32px;
        color: #fff;
        margin-left:60px;
        justify-content: center;
    }

    .wallet-panel {
        background-color:  #D9141E;
        height:400px;
        flex-direction: column;
        align-items:flex-start;
    }

    .balance {
        flex:3;
        font-size: 120px;
        color: #fff;
        margin-left:40px;
    }

</style>
<script>
    var navigator = weex.requireModule('navigator')
    var event = weex.requireModule('event')
    import navbar from '../../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "钱包" }
        },
        methods: {
            goback: function (e) {
//                navigator.pop({
//                    url: 'http://cdn.rzico.com/weex/app/member/setup.js',
//                    animated: "true"
//                })
                event.closeURL();
            },
            cashCard:function (e) {
                event.openURL('http://192.168.2.241:8081/withdrawal.weex.js', function () {
                })
            },
            bindingCard:function (e) {
                event.openURL('http://192.168.2.241:8081/bank.weex.js', function () {
                })
            },
            setup: function (e) {

            }
        }

    }
</script>