<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller">
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">同步数据</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title"></text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
                <div class="sub-panel">
                    <text class="sub_title">从服务器获取所有已发布的文章</text>
                </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">清除缓存</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">23.3MB  </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">黑名单</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">3人 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
        </scroller>
    </div>

</template>
<style src='../style/wx.css' />
<style scoped>
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
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
            title: { default: "通用设置" }
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