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
            <div class="sub-panel tip">
                <text class="sub_title">点亮VIP专栏特权（388元/年）</text>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">专栏模板</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="sub_title">标准模版</text>
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">点亮专栏，更多精美模板选择</text>
            </div>

            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">启用优惠券</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">营销利器，支持满折、满减</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">开通会员卡</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">电子会员卡，集成支付宝、微信</text>
            </div>
            <div class="cell-row cell-line">
                <div class="cell-panel space-between cell-clear">
                    <div class="flex-row">
                        <text class="title ml10">开通收银台</text>
                    </div>
                    <div class="flex-row flex-end">
                        <switch class="switch"></switch>
                    </div>
                </div>
            </div>
            <div class="sub-panel">
                <text class="sub_title">适用于实体店收银前台使用</text>
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

    .tip {
        background-color:lightgoldenrodyellow;
        padding-bottom: 20px;
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
    .switch {
        margin-right: 20px;
    }

</style>
<script>
    import navbar from '../../../include/navbar.vue'
    import utils from '../../../assets/utils'
    import music from '../../../assets/music'
    const event = weex.requireModule('event');
    export default {
        data() {
          return {
              topic:{}
          }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "我的专栏" }
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            opened:function () {
                return !utils.isNull(topic.id);
            }
        }

    }
</script>