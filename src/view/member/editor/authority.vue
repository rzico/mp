<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller"  show-scrollbar="false">

                <div class="cell-row cell-line">
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row">
                            <text class="title ml10">公开</text>
                            <text class="sub_title">所有人可见，且录入个人专栏</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row">
                            <text class="title ml10">不公开</text>
                            <text class="sub_title">自行控制分享范围，仅被分享的人可见</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row">
                            <text class="title ml10">加密</text>
                            <text class="sub_title">设置一个密码，凭密码访问</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                    <div class="cell-panel space-between cell-clear">
                        <div class="flex-row">
                            <text class="title ml10">私密</text>
                            <text class="sub_title">仅自已可见</text>
                        </div>
                        <div class="flex-row flex-end">
                            <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                        </div>
                    </div>
                </div>
                <div class="fill">
                </div>

         </scroller>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>

<style scoped>
</style>
<script>
    var navigator = weex.requireModule('navigator')
    import navbar from '../../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "谁可以看" }
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