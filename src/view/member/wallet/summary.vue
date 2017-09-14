<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">
            <cell>
                <div class="cell-header clear-row">
                    <div class="left">
                             <text class="title">8月份</text>
                    </div>
                    <div class="last">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe651;</text>
                    </div>
                </div>

                <div class="cell-row clear-row">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="title">张三给你转账</text>
                            <text class="datetime">08-21 10：24</text>
                        </div>
                    </div>
                    <div class="">
                        <text class="money">+84,356.00</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="title">购买定制台卡</text>
                            <text class="datetime">08-21 10：24</text>
                        </div>
                    </div>
                    <div class="">
                        <text class="money">-84,356.00</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="title">购买定制台卡</text>
                            <text class="datetime">08-21 10：24</text>
                        </div>
                    </div>
                    <div class="">
                        <text class="money">-84,356.00</text>
                    </div>
                </div>
            </cell>
            <cell>
                <div class="cell-header clear-row">
                    <div class="left">
                        <text class="title">17年8月</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">查看账单</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <div style="flex-direction: column;">
                            <text class="title">购买定制台卡</text>
                            <text class="datetime">08-21 10：24</text>
                        </div>
                    </div>
                    <div class="">
                        <text class="money">-84,356.00</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .logo {
        height:100px;
        width:100px;
        margin:20px;
        border-radius:50px;
        overflow:hidden;
    }

    .datetime {
        color:#ccc;
        font-size: 28px;
        margin-top:15px;
        margin-left:10px;
    }
    .money {
        margin-top:25px;
        font-weight: 700;
    }

</style>
<script>
    var navigator = weex.requireModule('navigator')
    import navbar from '../../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "账单" }
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