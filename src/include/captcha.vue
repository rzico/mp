<template>
    <div class="captcha">
        <div class="mobile-header">
            <text class="mobile-title">{{title}}</text>
        </div>

        <div class="content">
            <text class="title">我们已向</text><text  class="number">13860431130</text><text class="title">发送验证码短信，请查看短信并输入验证码</text>
        </div>

        <div class="input-panel">
            <input class="input" type="text" placeholder=""/>
            <input class="input" type="text" placeholder=""/>
            <input class="input" type="text" placeholder=""/>
            <input class="input" type="text" placeholder=""/>
            <input class="input" type="text" placeholder=""/>
            <input class="input" type="text" placeholder=""/>
        </div>

        <div class="flex-center">
            <text class="status primary">点击重新发送</text>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>

    .captcha {
        padding-left: 40px;
        padding-right: 40px;
        flex-direction: column;
        align-items: center;
    }

    .number {
        font-size: 48px;
        color: #000;
        font-weight: 600;
    }
    .content {
        flex-wrap: wrap;
    }

    .mobile-title {
        font-size: 48px;
        color: #000;
        flex-wrap: wrap;
    }
    .mobile-header {
        margin-top: 150px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .input {
        height:80px;
        width:80px;
        font-size: 48px;
        color: #000;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
        border-top-width: 1px;
        border-top-color: #ccc;
        border-top-style: solid;
        border-left-width: 1px;
        border-left-color: #ccc;
        border-left-style: solid;
        border-right-width: 1px;
        border-right-color: #ccc;
        border-right-style: solid;
    }
    .input-panel {
        width:600px;
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
        height: 200px;
        flex-direction: row;
        background-color: #ffffff;
        justify-content:space-around;
    }

    .status {
        border-bottom-width:0px;
    }

</style>
<script>
    export default {
        props: {
            title: { default: "验证码" }
        }
    }
</script>