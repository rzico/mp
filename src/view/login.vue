<template>
    <div class="bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <div class="login-header">
            <image class="logo" resize="cover" src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
            </image>
            <text class="title" style="margin-top:20px;">张三</text>
        </div>
        <div class="login-panel">
            <div class="login-row">
                     <text class="title flex1">账号</text>
                    <input class="flex4 username" type="text" placeholder="登录名/手机号"  :autofocus=true value="" @change="onchange" @input="oninput"/>
                       <div class="flex1"></div>
            </div>
            <div class="login-row">
                    <text class="title flex1">密码</text>
                    <input class="flex4 password" type="password" placeholder="请输入登录密码"  @change="onchange" @input="oninput"/>
                <div class="flex1 flex-column">
                    <text class="see" :style="{fontFamily:'iconfont'}">&#xe61e;</text>
                </div>
            </div>
            <text class="button login-button" value="登录" type="primary" >登录</text>
            <div class="login-row cell-clear">
                <text class="title primary">手机验证码登录</text>
                <text class="title primary">忘记密码?</text>
            </div>
        </div>
        <div class="register">
            <text class="title primary">点击注册新用户</text>
        </div>

    </div>

</template>
<style src='../style/wx.css' />
<style scoped>

    .login-header {
        height:300px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .logo {
        margin-top:100px;
        height:150px;
        width:150px;
        border-radius:15px;
        overflow:hidden;
    }

    .login-panel {
        flex-direction: column;
        margin-top: 20px;
        padding-left: 60px;
        padding-right: 60px;
    }
    .login-row {
        height:100px;
        flex-direction: row;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
        align-items: center;
        justify-content:space-between;
    }
    .username {
        height: 70px;
        font-size: 32px;
    }

    .password {
        height: 70px;
        font-size: 32px;
    }
    .login-button {
        margin-top: 60px;
    }

    .see  {
        font-size: 48px;
    }

    .register {
        flex-direction: column;
        align-items: center;
        position: fixed;
        bottom: 10px;
        left: 0px;
        right: 0px;
        height: 80px;
    }

</style>
<script>
    import navbar from '../../include/navbar.vue'
    export default {
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "登录"},
        },
        goback: function (e) {
            navigator.pop({
                url: 'http://cdn.rzico.com/weex/app/login/account.js',
                animated: "true"
            },function (msg) {
                msg = "pop ";
            } )
        }
    }
</script>