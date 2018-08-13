<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="headerMemberInfo">
            <text class="fz24" style="color: #999999">支付状态显示区域</text>
        </div>
        <div class="classHeader">
            <text class="classOne">编号</text>
            <text class="classTwo">名称</text>
            <text class="classThree">金额</text>
        </div>
        <div class="orderContent">
            <list>
                <cell class="orderCell">
                    <text class="orderCellOne">1</text>
                    <text class="orderCellTwo">微信支付</text>
                    <text class="orderCellThree">600</text>
                </cell>
            </list>
        </div>
        <div class="orderTotal">
            <text class="orderTotalText">应付: 3950.00</text>
            <text class="orderTotalText">已付: 3000.00</text>
            <text class="orderTotalText" style="color: red">未付: 950.00</text>
            <text class="orderTotalText">找零: 0.00</text>
        </div>
        <div class="couponBox">
            <div class="inputBox" @click="controlCursor">
                <text class="inputIcon" :style="{fontFamily:'iconfont'}">&#xe63a;</text>
                <text class="couponInput">{{inputText}}</text>
                <text class="cursor" v-if="isCursor">|</text>
            </div>
            <div class="couponTotal">
                <text class="couponTotalBoxTitle">应付 =未付时，当前单据为可凑单</text>
            </div>
        </div>
        <div class="buttonBox">
            <div class="buttonBoxCell">
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">1</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">2</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">3</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">4</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">5</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">6</text>
                </div>
                <div class="buttonCellBoxBorderNull">
                    <text class="buttonCellBoxText">确定</text>
                </div>
            </div>
            <div class="buttonBoxCellTwo">
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">00</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">7</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">8</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">9</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">0</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">.</text>
                </div>
                <div class="buttonCellBoxBorderNull">
                    <text class="buttonCellBoxText">退格</text>
                </div>
            </div>
            <div class="buttonBoxCellTwo">
                <div class="buttonCellBoxTwo">
                    <text class="buttonCellBoxText">现金</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">微信</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">支付宝</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">银联</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">积分</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">抵用券</text>
                </div>
                <div class="buttonCellBoxBorderNullTwo ">
                    <text class="buttonCellBoxText">礼卡</text>
                </div>
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
    .headerMemberInfo{
        background-color: white;
        width: 750px;
        height: 80px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-right: 30px;
    }
    .classHeader{
        background-color: #C5C5FF;
        width: 750px;
        height: 80px;
        flex-direction: row;
        align-items: center;
    }
    .classOne{
        width: 100px;
        font-size: 28px;
        text-align: center;
    }
    .classTwo{
        width: 325px;
        font-size: 28px;
        text-align: center;
    }
    .classThree{
        width: 325px;
        font-size: 28px;
        text-align: center;
    }
    .orderContent{
        flex-direction: column;
        width: 750px;
        height: 558px;
        background-color: white;
    }
    .orderCell{
        width: 750px;
        height: 80px;
        flex-direction: row;
        align-items: center;
    }
    .orderCellOne{
        width: 100px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellTwo{
        width: 325px;
        font-size: 28px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellThree{
        width: 325px;
        font-size: 28px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderTotalText{
        font-size: 24px;
    }
    .orderTotal{
        background-color: #ccc;
        width: 750px;
        height: 80px;
        padding-left: 20px;
        padding-right: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .couponBox{
        background-color: white;
        width: 750px;
        height: 100px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
    }
    .inputBox{
        flex-direction: row;
        align-items: center;
    }
    .inputIcon{
        font-size: 32px;
        color:#5eb0fd;
    }
    .couponInput{
        font-size: 28px;
        width: 300px;
        padding-left: 20px;
    }
    .cursor{
        font-size: 40px;
        color: #5eb0fd;
        font-weight: bold;
        position: absolute;
        top:-10px;
        left: 50px;
    }
    .couponTotal{
        flex-direction: row;
        align-items: center;
    }
    .couponTotalBox{
        flex-direction: row;
        align-items: center;
    }
    .couponTotalBoxTitle{
        font-size: 24px;
        color: #777;
    }
    .couponTotalBoxSubTitle{
        font-size:24px;
        color: red;
        margin-left: 10px;
    }
    .buttonBox{
        flex-direction: column;
        height: 300px;
        border-top-width: 1px;
        border-top-color: #999999;
    }
    .buttonBoxCell{
        flex-direction: row;
        align-items: center;
        height: 100px;
    }
    .buttonBoxCellTwo{
        flex-direction: row;
        align-items: center;
        height: 99px;
        border-top-width: 1px;
        border-top-color: #999999;
    }
    .buttonCellBox{
        width: 106px;
        height: 100px;
        border-right-width: 1px;
        border-right-color: #999999;
        align-items: center;
        justify-content: center;
    }
    .buttonCellBox:active{
        background-color: #cccccc;
    }
    .buttonCellBoxTwo{
        width: 106px;
        height: 100px;
        border-right-width: 1px;
        border-right-color: #999999;
        align-items: center;
        justify-content: center;
        background-color: #cccccc;
    }
    .buttonCellBoxTwo:active{
        background-color: #aaa;
    }
    .buttonCellBoxText{
        font-size: 32px;
    }
    .buttonCellBoxBorderNull{
        width: 113px;
        height: 100px;
        align-items: center;
        justify-content: center;
    }
    .buttonCellBoxBorderNull:active{
        background-color: #ccc;
    }
    .buttonCellBoxBorderNullTwo{
        width: 113px;
        height: 100px;
        align-items: center;
        justify-content: center;
        background-color: #ccc;
    }
    .buttonCellBoxBorderNullTwo:active{
        background-color: #aaa;
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
                inputText:'请输入优惠码',
                isCursor:false,
                CursorTime:null
            }
        },
        props: {
            title:{default:'销售结账'}
        },
        created() {
            utils.initIconFont();
        },
        beforeDestory() {
//            页面销毁时解除定时器
            if (!utils.isNull(this.CursorTime))  {
                clearInterval(this.CursorTime);
                this.CursorTime = null;
            }
        },
        methods:{
            goback: function (e) {
                event.closeURL();
            },
            controlCursor(){
                let _this = this;
                this.isCursor = true;
                this.inputText = '';
//                开启定时器 模拟光标500毫秒闪一次
                this.CursorTime = setInterval(function () {
                    _this.isCursor = !_this.isCursor;
                },500);
            },
        }
    }
</script>