<template>
    <div class="mobile">
        <div class="mobile-header">
            <text class="mobile-title">{{title}}</text>
        </div>

        <div class="mobile-row space-between">
            <text class="title">手机号归属地</text>
            <text class="sub-title">(中国)</text>
        </div>

        <div class="mobile-row">
            <text class="flex1 title">+86</text>
            <input class="flex5 sub-title" type="text" placeholder="请输入手机号"/>
        </div>

        <div class="mobile-row clear">
            <text class="button flex1" value="登录" type="primary" >登录</text>
        </div>
    </div>
</template>
<style src='../style/wx.css'/>
<style scoped>

    .mobile-title {
        font-size: 48px;
        color: #000;
    }
    .mobile-header {
        margin-top: 100px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .mobile-row {
        margin-left: 60px;
        margin-right: 60px;
        margin-top: 20px;
        height: 100px;
        flex-direction: row;
        background-color: #ffffff;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
        align-items: center;
    }

    .clear {
        border-bottom-width:0px;
    }

</style>
<script>
    export default {
        props: {
            title: { default: "短信验证码" }
        }
    }
</script>