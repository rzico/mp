<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">

            <cell class="cell">
                <div class="cell-row"  @click="setup">
                    <div class="left">
                        <text class="title">头像</text>
                    </div>
                    <div class="last">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">昵称</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">已认证1</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">登录名</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">17364</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">性别</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">男</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">生日</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">已设置</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">职业</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">服务业</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">所在地</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">福建厦门</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">个性签名</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">未填写</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <div class="left">
                        <text class="title">密码</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">已设置</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">绑定微信号</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">已绑定</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-one">
                    <div class="left">
                        <text class="title">绑定手机号</text>
                    </div>
                    <div class="last">
                        <text class="sub_title">未绑定</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>

</template>
<style src='../style/wx.css' />
<style scoped>
    .logo {
        width:120px;
        height:120px;
        margin:10px;
        border-radius:60px;
        overflow:hidden;
    }
</style>
<script>
    var navigator = weex.requireModule('navigator')
    import navbar from '../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "账号设置" }
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