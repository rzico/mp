<template>
    <div class="wrapper">
        <scroller class="scroller" show- show-scrollbar="false">
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">谁可以看</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">公开</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
                <div class="sub-panel">
                    <text class="sub_title">可自行控制文章展示范围</text>
                </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">文章分类</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">亲子</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
             </div>
            <div class="sub-panel">
                <text class="sub_title">正确设置分类的文章将展示在“身边”栏目</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">加入文集</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">全部文集 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">通过文集有效管理不同类型的文章</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">启用打赏</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" checked="true"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">开启后本文可接现金打赏，获取收入</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">允许评论</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" checked="true"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">开启后读者可以对文章进行评论</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">投稿</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch" checked="true"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">投稿后，被选用文章将获得大量展示机会</text>
            </div>
            <div class="fill">

            </div>

        </scroller>
        <div class="footer button-panel">
            <text class="button">完成</text>
        </div>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>

<style scoped>
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .button-panel {
        padding-left: 60px;
        padding-right: 60px;
    }
    .switch {
        margin-right: 20px;
    }
</style>
<script>
    var navigator = weex.requireModule('navigator')
    navigator.
    export default {
        props:{
            'dataRole': {
                default: function () {
                    return 'navbar';
                }
            },
            //导航条标题
            title: {default:"dksdjfkd"},
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