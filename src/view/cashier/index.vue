<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false" :complete="'账单'" @goComplete="deposit"> </navbar>
        <scroller class="scroller">
            <div class="wallet-panel">
                <text class="balance">1000000.00</text>
                <div class="wallet-title">
                    <text class="sub_title">今天收款（元）</text>
                    <text class="sub_title">昨天收款:29294</text>
                </div>
            </div>
            <div class="fontInput">
                <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                <input class="input" type="number" placeholder="请输入消费金额" maxlength="7":autofocus="true" value="" @input="onmoney"  />
            </div>
            <div class="buttombox">
                <div class="btn weixin">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信钱包" @click="weixin()">微信钱包</text>
                </div>
                <div class="btn alipay">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="支付宝" @click="weixin()">支付宝</text>
                </div>
            </div>
            <div class="buttombox">
                <div class="btn weixin">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信快捷登录" @click="weixin()">微信快捷登录</text>
                </div>
                <div class="btn alipay">
                    <text class="ico" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信快捷登录" @click="weixin()">微信快捷登录</text>
                </div>
            </div>
        </scroller>
    </div>

</template>
<style lang="less" src="../../style/wx.less"/>
<style scoped>

    .wallet-title {
        width: 620px;
        margin-top: 20px;
        font-size: 32px;
        color: #fff;
        margin-left:60px;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }

    .wallet-panel {
        background-color:  #D9141E;
        height:300px;
        flex-direction: column;
        align-items:flex-start;
    }

    .balance {
        margin-top: 40px;
        font-size: 120px;
        color: #fff;
        margin-left:40px;
    }

    .fontInput{
        border-style: solid;
        border-width:1px;
        border-color:#CCC;
        border-radius: 5px;
        padding-left: 20px;
        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        align-items:center;
        height: 120px;
    }
    .iconFont{
        margin-top: 10px;
        font-size: 80px;
    }
    .input{
        width: 600px;
        height: 100px;
        font-size:50px;
    }

    .buttombox {
        margin-top: 20px;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        width: 690px;
    }

    .btn {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        flex-direction: row;
        justify-content: center;
        padding-top: 0px;
        padding-top: 0px;
        height: 80px;
        flex:1;
        align-items: center;
        border-radius:12px;
    }
    .btn:active {
        background-color:#ccc;
    }
    .weixin {
        background-color:limegreen;
        border-color:limegreen;
    }
    .alipay {
        background-color:#0088fb;
        border-color:#0088fb;
    }
    .card {
        background-color:#0088fb;
        border-color:#0088fb;
    }


</style>
<script>
    var navigator = weex.requireModule('navigator')
    var event = weex.requireModule('event')
    import navbar from '../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "收银台" }
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            deposit:function () {

            }
        }

    }
</script>