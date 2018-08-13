<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
            <div class="contentBox">
                <div class="cell">
                    <text class="cellName">POS机号</text>
                    <input class="input" type="number" placeholder="请输入POS机号"/>
                </div>
                <div class="cell">
                    <text class="cellName">服务器地址</text>
                    <input class="input" type="email" placeholder="请输入服务器地址"/>
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
    .contentBox{
        flex-direction: column;
        padding-right: 30px;
        padding-left: 30px;
    }
    .cell{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 690px;
        height: 120px;
        border-bottom-width: 1px;
        border-bottom-color: #cccccc;
    }
    .cellName{
        font-size: 32px;
        width: 190px;
    }
    .input{
        width: 500px;
        height: 80px;
        line-height: 78px;
        font-size: 32px;
    }
</style>
<script>
    import navbar from '../../../../../include/navbar.vue';
    import { POST, GET } from '../../../../../assets/fetch';
    import {dom,event,animation} from '../../../../../weex.js';
    import utils from '../../../../../assets/utils';
    export default {
        components: {
            navbar
        },
        data() {
            return {
                refreshImg:utils.locate('resources/images/loading.png'),
                refreshing: false,
            }
        },
        props: {
            title:{default:'POS机注册'}
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