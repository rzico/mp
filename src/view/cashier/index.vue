<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback" :border="false" :complete="'收银账单'" @goComplete="deposit"> </navbar>
        <scroller class="scroller">
            <div class="wallet-panel">
                <text class="balance">1000000.00</text>
                <div class="wallet-title">
                    <text class="sub_title">今天收银（元）</text>
                    <text class="sub_title">昨天收银:29294</text>
                </div>
            </div>
            <div class="fontInput">
                <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                <input class="input" type="number" placeholder="请输入消费金额" maxlength="7":autofocus="true" value="" @input="onmoney"  />
            </div>
            <div class="buttombox">
                <div class="btn ">
                    <text class="ico alipay" :style="{fontFamily:'iconfont'}">&#xe621;</text>
                    <text class="btn-text" value="支付宝" @click="weixin()">支付宝</text>
                </div>
                <div class="btn ">
                    <text class="ico weixin" :style="{fontFamily:'iconfont'}">&#xe659;</text>
                    <text class="btn-text" value="微信钱包" @click="weixin()">微信钱包</text>
                </div>
            </div>
            <div class="buttombox">
                <div class="btn ">
                    <text class="ico card" :style="{fontFamily:'iconfont'}">&#xe6ce;</text>
                    <text class="btn-text" value="会员卡" @click="weixin()">会员卡</text>
                </div>
                <div class="btn ">
                    <text class="ico refund" :style="{fontFamily:'iconfont'}">&#xe710;</text>
                    <text class="btn-text" value="扫码退款" @click="weixin()">扫码退款</text>
                </div>
            </div>
            <div class="content">
                <text class="sub_title">1.支持微信钱包、支付宝、店内会员卡</text>
                <text class="sub_title">2.单笔收钱金额不能超过5000元</text>
                <text class="sub_title">3.快速秒到,超过30秒没到账联系客服处理</text>
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
        height:280px;
        flex-direction: column;
        align-items:flex-start;
    }

    .balance {
        margin-top: 30px;
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
        align-items: center;
        padding-top: 0px;
        height: 80px;
        flex:1;
        padding-left: 40px;
        border-radius:12px;
        border-width: 1px;
        border-color:#ccc;
        background-color: #eee;
    }
    .btn-text {
        margin-left: 10px;
    }
    .btn:active {
        background-color:#ccc;
    }
    .weixin {
        color:limegreen;
        margin-top: 4px;
    }
    .alipay {
        color:#0088fb;
        margin-top: 4px;
    }
    .card {
        color:red;
        margin-top: 3px;
    }
    .refund {
        color:sandybrown;
        margin-top: 4px;
    }

    .content {
        margin-left: 30px;
        margin-top: 50px;
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