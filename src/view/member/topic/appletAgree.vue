<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"  > </navbar>
        <!--<div style="width: 750px;height: 300px"></div>-->
        <div class="cell-row cell-line cell-clear" style="background-color: transparent" >
            <div class="cell-panel space-between cell-clear" >
                <div class="flex-row">
                    <text class="title ml10">1、前往微信</text>
                </div>
            </div>
        </div>
        <div class="cell-row cell-line cell-clear" style="background-color: transparent">
            <div class="cell-panel space-between cell-clear" >
                <div class="flex-row">
                    <text class="title ml10">2、搜索并进入魔篇公众号</text>
                </div>
            </div>
        </div>
        <div class="cell-row cell-line cell-clear" style="background-color: transparent">
            <div class="cell-panel space-between cell-clear" >
                <div class="flex-row">
                    <text class="title ml10">3、点击菜单栏中间的"一键授权"按钮</text>
                </div>
            </div>
        </div>
        <div class="cell-row cell-line cell-clear" style="background-color: transparent">
            <div class="cell-panel space-between cell-clear" >
                <div class="flex-row">
                    <text class="title ml10" style="width: 680px">4、跳转到新页面后点击"一键授权"按钮进行授权</text>
                </div>
            </div>
        </div>
        <div class="button bw bkg-primary ml30 mr30 mt30" @click="goComplete()">
            <text class="buttonText white">如已授权成功,请点这里</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .sub-panel {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .number{
        height: 48px;
        width: 48px;
        background-color: #cccccc;
    }
    .icoPitch{
        position: absolute;
        top:20px;
        left:15px;
        font-size: 20px;
        color:#EB4E40;
    }
    .complete{
        font-size: 32px;
        color:#999;
    }
</style>
<script>
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch';
    import payment from '../../../include/payment.vue'
    var event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    import utils from '../../../assets/utils';
    export default {
        components: {
            navbar,payment
        },
        data() {
            return {
                clicked:false,
                steped1:true,
                steped2:true,
                steped3:true,
                steped4:true,
                number5:utils.locate('resources/images/number5.jpg'),
            }
        },
        props: {
            title: {default: "一键授权"},
        },
        created() {
        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },

        }
    }
</script>