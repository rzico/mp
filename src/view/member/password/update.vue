<template>
    <div class="captcha">
        <div class="password-header">
            <text class="password-title">{{title}}</text>
        </div>

        <div class="content">
            <text class="title">请为您的账号</text><text  class="number">13860431130</text><text class="title">设置一个新密码</text>
        </div>

        <div class="input-panel">
            <input class="flex5 password" type="text" placeholder="请输入新密码"  @change="onchange" @input="oninput"/>
            <div class="flex1 flex-column">
                <text class="see" :style="{fontFamily:'iconfont'}">&#xe632;</text>
            </div>
        </div>

        <div class="password_panel">
            <text class="button flex1" value="保存新密码" type="primary" >保存新密码</text>
        </div>

    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>


<style scoped>

    .number {
        font-size: 48px;
        color: #000;
        font-weight: 600;
    }
    .content {
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
        flex-wrap: wrap;
    }

    .password-title {
        font-size: 48px;
        color: #000;
        flex-wrap: wrap;
    }

    .password-header {
        margin-top: 150px;
        height:100px;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
    }

    .input-panel {
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
        height: 100px;
        flex-direction: row;
        justify-content:space-between;
        align-items: center;
    }

    .password_panel {
        margin-left: 40px;
        margin-right: 40px;
        margin-top: 60px;
    }

</style>
<script>
    export default {
        props: {
            title: { default: "设置密码" }
        },
        created(){
            var domModule=weex.requireModule("dom");
            domModule.addRule('fontFace',{
                'fontFamily':'iconfont',
                'src':"url('http://cdn.rzico.com/weex/resources/fonts/iconfont.ttf')"
            })
        }
    }
</script>