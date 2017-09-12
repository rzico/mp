<template>
    <div class="wrapper bkg-white">
        <div class="login-header">
            <div style="flex:4">
               <image class="logo" resize="cover"
                   src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
               </image>
            </div>
            <div style="flex:2">
               <text class="title">张三</text>
            </div>
        </div>
        <div class="login-panel">
            <div class="cell-row border-bottom-line">
                <div class="left w550">
                    <text class="title">账号</text>
                    <input class="username" type="text" placeholder="登录名/手机号"  :autofocus=true value="" @change="onchange" @input="oninput"/>
                </div>
            </div>
            <div class="cell-row border-bottom-line">
                <div class="left w550">
                    <text class="title">密码</text>
                    <input class="password" type="password" placeholder="请输入登录密码"  @change="onchange" @input="oninput"/>
                </div>
                <div class="last">
                    <text style="font-size:48px" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                </div>
            </div>
            <div class="cell-row clear-row">
                <div class="left">
                    <text class="title gray">手机验证码登录</text>
                </div>
                <div class="last">
                    <text class="title gray">忘记密码？</text>
                </div>
            </div>
            <text class="button bkg-color primary" style="top:20px;" value="登录" type="primary" >登录</text>
        </div>
        <div class="login-footer">
            <div class="login-caption">
                <div style="flex:1">
                </div>
                <div style="flex:1">
                    <div class="border-bottom-line" style="height:28px;"></div>
                </div>
                <div style="flex:1;align-items: center">
                    <text class="gray">微信登录</text>
                </div>

                <div style="flex:1">
                    <div class="border-bottom-line" style="height:28px;"></div>
                </div>
                <div style="flex:1">
                </div>
            </div>
            <div>
                <text class="weixin" :style="{fontFamily:'iconfont'}">&#xe619;</text>
            </div>
            <div class="register">
               <text class="title">点击注册新用户</text>
            </div>
        </div>

    </div>

</template>
<style src='../style/wx.css' />
<style scoped>

    .login-header {
        height:300px;
        background-color: #fff;
        align-items: center;
        flex-direction: column;
    }

    .logo {
        top:100px;
        height:150px;
        width:150px;
        border-radius:75px;
        overflow:hidden;
    }

    .login-footer {
        top:50px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .login-panel {
        padding-left: 60px;
        padding-right: 60px;
    }

    .login-caption {
        width:750px;
        background-color: #fff;
        height:60px;
        flex-direction: row;
        flex:1;
    }

    .w550 {
        width: 550px;
    }

    .title {
        flex:1;
    }

    .username {
        height: 70px;
        line-height: 70px;
        flex:5;
        font-size: 32px;
    }

    .password {
        height: 70px;
        line-height: 70px;
        flex:5;
        font-size: 32px;
    }

    .weixin {
        font-size: 150px;
        color:green;
    }

    .register {
        flex-direction: column;
        align-items: center;
        position: fixed;
        bottom: 20px;
        left: 0px;
        right: 0px;
        height: 100px;
    }

</style>
<script>
    export default {
        created(){
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        }
    }
</script>