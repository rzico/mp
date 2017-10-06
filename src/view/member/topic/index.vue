<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"> </navbar>
        <scroller class="scroller" show-scrollbar="false">
            <div class="flex-column">
                <image class="bg"
                       src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                </image>
                <div class="topic">
                    <image class="logo"
                           src="https://img.alicdn.com/tps/TB1z.55OFXXXXcLXXXXXXXXXXXX-560-560.jpg">
                    </image>
                    <div class="topic_footer">
                        <text class="name">张三</text>
                        <text class="autograph">点击设置专栏名称</text>
                    </div>
                </div>
            </div>
            <div class="cell-row cell-line cell-clear ft">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row flex-start">
                        <text class="ico" :style="{fontFamily:'iconfont'}">&#xe633;</text>
                        <text class="title ml10">点亮专栏</text>
                        <text class="title ml10">300元/年</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>

            <div class="sub_header">
                <text class="sub_title">专栏VIP特权</text>
            </div>

            <div class="sub_panel">
                <div class="sub_cell">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe632;</text>
                    <text class="title mt20">优惠券</text>
                 </div>
                <div class="sub_cell">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe67a;</text>
                    <text class="title mt20">会员卡</text>
                </div>
                <div class="sub_cell">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe696;</text>
                    <text class="title mt20">模板库</text>
                </div>
                <div class="sub_cell">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe6a7;</text>
                    <text class="title mt20">商品管理</text>
                </div>
                <div class="sub_cell">
                    <text class="ico_big" :style="{fontFamily:'iconfont'}">&#xe600;</text>
                    <text class="title mt20">订单管理</text>
                </div>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">小程序设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">未设置 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">一键完成小程序部署上架，点击查看</text><text class="sub_title" style="color:blue">《操作手册》</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">公众号设置</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">未设置 </text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">信息同步，自已也能管理，点击查看</text><text class="sub_title" style="color:blue">《操作手册》</text>
            </div>
            <div class="fill"></div>
        </scroller>
    </div>

</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>

    .bg {
        position:absolute;
        width:750px;
        height: 320px;
        filter: blur(4px);
        opacity: 0.8;
    }
    .topic {
        flex-direction:column;
        align-items:center;
        margin-top: 30px;
        width:750px;
        height: 290px;
    }

    .ft {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #999;
    }
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
    }

    .logo {
        width:120px;
        height:120px;
        border-radius:60px;
        overflow:hidden;
    }

    .topic_footer {
        margin-left:10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height:180px;
    }
    .name {
        font-size: 34px;
        color: white;
    }
    .autograph {
        margin-top: 10px;
        font-size: 28px;
        color: #ccc;
    }

    .sub_header {
        padding-left: 20px;
        height:100px;
        justify-content: center;
        align-items: center;
    }

    .sub_panel {
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0px;
    }
    .sub_cell {
        flex-direction: column;
        align-items: center;
        width: 248px;
        height: 248px;
        margin: 1px;
        background-color: white;
        padding-top: 40px;
    }

</style>
<script>
    var navigator = weex.requireModule('navigator')
    import navbar from '../../../include/navbar.vue'
    export default {
        components: {
            navbar
        },
        props: {
            title: { default: "我的专栏" }
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