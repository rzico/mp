<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row cell-line">
                 <div class="cell-panel space-between" style="height:150px;">
                    <div class="flex-row flex-start">
                        <text class="title ml10">通用设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <image class="logo" resize="cover"
                               src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                        </image>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">昵称</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">昵称</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">登录名</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">123434</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                         <text class="title ml10">性别</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">男</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">生日</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">已设置</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">职业</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">服务业</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between">
                    <div class="flex-row">
                        <text class="title ml10">所在地</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">厦门</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">个性签名</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">未填写</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between">
                    <div class="flex-row flex-start">
                        <text class="title ml10">密码</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">已设置</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between" >
                    <div class="flex-row flex-start">
                        <text class="title ml10">绑定微信号</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">已绑定</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="cell-panel space-between cell-clear" >
                    <div class="flex-row flex-start">
                        <text class="title ml10">绑定手机号</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">未绑定</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
         </scroller>
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
    import navbar from '../../include/navbar.vue'
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