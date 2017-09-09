<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <list class="list">
            <cell class="cell">
                <div class="cell-row"  @click="setup">
                    <text class="text name">头像</text>
                    <div class="last">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">昵称</text>
                    <div class="last">
                        <text class="sub_title">已认证</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">登录名</text>
                    <div class="last">
                        <text class="sub_title">17364</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">性别</text>
                    <div class="last">
                        <text class="sub_title">男</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">生日</text>
                    <div class="last">
                        <text class="sub_title">已设置</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">职业</text>
                    <div class="last">
                        <text class="sub_title">服务业</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">所在地</text>
                    <div class="last">
                        <text class="sub_title">福建厦门</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">个性签名</text>
                    <div class="last">
                        <text class="sub_title">未填写</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row">
                    <text class="text name">密码</text>
                    <div class="last">
                        <text class="sub_title">已设置</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">绑定微信号</text>
                    <div class="last">
                        <text class="sub_title">已绑定</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-row clear-row">
                    <text class="text name">绑定手机号</text>
                    <div class="last">
                        <text class="sub_title">未绑定</text>
                        <text class="text arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </cell>
        </list>
    </div>

</template>
<style scoped>

    .text {
        margin: 10px;
        font-size: 32px;
    }

    .sub_title {
        margin: 10px;
        font-size: 24px;
        color: #ccc;
    }

    .wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color: #eeeeee;
    }

    .cell-row {
        min-height: 100px;
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 20px;
        padding-left: 10px;
        padding-right: 10px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        justify-content: space-between;
        align-items: center;
    }

    .clear-row {
        margin-top: 1px;
    }

    .logo {
        width:120px;
        height:120px;
        margin:10px;
        border-radius:60px;
        overflow:hidden;
    }

    .last {
        flex-direction: row;
        align-items: center;
    }

    .arrow {
        font-size: 32px;
        color: #ccc;
        margin-left:0px;
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
                navigator.push({
                    url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
                    animated: "true"
                })
            },
            setup: function (e) {
                navigator.pop({
                    url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
                    animated: "true"
                })
            }
        }

    }
</script>