<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="content">
            <div class="cell">
                <text class="cellTitle">卡号:</text>
                <text class="input" >343434</text>
            </div>
            <div class="cell" >
                <text class="cellTitle">名称:</text>
                <text class="input" >东郭先生</text>
            </div>
            <div class="cell" >
                <text class="cellTitle">手机:</text>
                <text class="input" >12345678910</text>
            </div>
            <div class="cell" >
                <text class="cellTitle">等级:</text>
                <text class="input" >金卡</text>
            </div>
            <div class="cell" >
                <text class="cellTitle">总积分:</text>
                <text class="input" >89920</text>
            </div>
            <div class="cell" >
                <text class="cellTitle">可用积分:</text>
                <text class="input" >89920</text>
            </div>
        </div>
        <div class="messageBox">
            <text class="message">优惠活动提示区</text>
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
        padding-left: 30px;
        padding-right: 30px;
    }
    .cell{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 690px;
        height: 100px;
    }
    .cellTitle{
        font-size: 32px;
        width:150px;
    }
    .input{
        font-size:32px;
        width: 540px;
        text-align: center;
        height: 100px;
        line-height: 99px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .messageBox{
        align-items: center;
        justify-content: center;
        padding-top:100px;
        padding-bottom:100px;
    }
    .message{
        font-size:32px;
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
            title:{default:'会员详情'}
        },
        created() {
            utils.initIconFont();
        },
        methods:{
            goback: function (e) {
                event.closeURL();
            },

        }
    }
</script>