<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback" > </navbar>
        </div>
    <div class="big">
        <div class="bank">
            <div class="image">
                <image style="width:100px; height:100px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508910519&di=afad3aa3b15aa7ab6bdb97bf124601ee&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.ishuo.cn%2Fdoc%2F1610%2F869-1610140Z924-51.jpg"></image>
            </div>
            <div class="bankInformation">
                <text class="bankName">中国建设银行</text>
                <text class="bankTailnumber">尾号3333 储蓄卡  </text>
            </div>
        </div>
        <div class="money">
            <text class="moneyText">提现金额 （收取0.1%服务费）</text>
            <div class="input">
                <image style="width:100px; height: 100px"
            </div>
        </div>
    </div>
    </div>
</template>
<style>
    .bank{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:1px;
        border-top-width:1px;
        border-color:#CCC;
        height: 120px;
        margin-top: 30px;
    }
    .image{
        width:100px;
        height:100px;
        padding-top:20px;
    }
    .bankInformation{
        width:auto;
        height:120px;
        border-style: solid;
        padding-left:120px;
        flex-direction: column;
    }
    .bankName{
        font-size: 32px;
        margin-bottom: 20px;
    }
    .bankTailnumber{
        font-size: 28px;
        color:#cccccc;
        margin-bottom: 20px;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';

    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "提现" },
        },
        methods: {
            goback: function () {
                event.closeURL()
            },
        }
    }
</script>