<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="content">
            <div class="cell" @click="linkToPos()">
                <text class="cellTitle">pos机注册</text>
                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
            <div class="cell" @click="linkToTemplate()">
                <text class="cellTitle">打印模版</text>
                <text class="cellIcon" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../../../style/wx.less"/>
<style>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#fff;
        /*align-items: center;*/
    }
    .content{
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
    }
    .cell{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 710px;
        height: 120px;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .cellTitle{
        font-size: 32px;
    }
    .cellIcon{
        font-size: 32px;
        color: #999999;
    }
</style>
<script>
    import navbar from '../../../../../include/navbar.vue';
    import { POST, GET } from '../../../../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../../../../assets/utils';
    export default {
        components: {
            navbar
        },
        data() {
            return {

            }
        },
        props: {
            title:{default:'系统设置'}
        },
        created() {
            utils.initIconFont();
        },
        methods:{
            goback: function (e) {
                event.closeURL();
            },
            linkToPos(){
                event.openURL(utils.locate("view/shop/cashier/pos/setting/add_Pos.js"),function (e) {});
            },
            linkToTemplate(){
                event.openURL(utils.locate("view/shop/cashier/pos/setting/template.js"),function (e) {});
            }
        }
    }
</script>