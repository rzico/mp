<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="headerMemberInfo">
            <text class="fz24 mr20" style="color: #999999">流水号:1234567890</text>
            <text class="fz24" style="color: #999999">用户:张某某</text>
        </div>
        <div class="classHeader">
            <text class="classOne">编号</text>
            <text class="classTwo">优惠码</text>
            <text class="classThree">名称</text>
            <text class="classFour">价格</text>
            <text class="classFive">折扣</text>
            <text class="classSix">数量</text>
            <text class="classSeven">优惠</text>
            <text class="classEight">小计</text>
        </div>
        <div class="orderContent">
            <list>
            <cell class="orderCell">
                <text class="orderCellOne">1</text>
                <text class="orderCellTwo">123456</text>
                <text class="orderCellThree">耐克超跑</text>
                <text class="orderCellFour">1000</text>
                <text class="orderCellFive">95</text>
                <text class="orderCellSix">1</text>
                <text class="orderCellSeven">50</text>
                <text class="orderCellEight">950</text>
            </cell>
            </list>
        </div>
        <div class="orderTotal">
            <text class="orderCellFive">合计</text>
            <text class="orderCellSix">1</text>
            <text class="orderCellSeven">50</text>
            <text class="orderCellEight">950</text>
        </div>
        <div class="couponBox">
            <div class="inputBox">
                <text class="inputIcon" :style="{fontFamily:'iconfont'}">&#xe63a;</text>
                <input class="couponInput" placeholder="请输入优惠码"/>
            </div>
            <div class="couponTotal">
                <div class="couponTotalBox">
                    <text class="couponTotalBoxTitle">价格</text>
                    <text class="couponTotalBoxSubTitle">1000</text>
                </div>
                <div class="couponTotalBox">
                    <text class="couponTotalBoxTitle">数量</text>
                    <text class="couponTotalBoxSubTitle">1</text>
                </div>
                <div class="couponTotalBox">
                    <text class="couponTotalBoxTitle" style="color:#5eb0fd">折扣</text>
                    <text class="couponTotalBoxSubTitle">95</text>
                </div>
                <div class="couponTotalBox">
                    <text class="couponTotalBoxTitle">金额</text>
                    <text class="couponTotalBoxSubTitle">950</text>
                </div>
                <div class="couponTotalBox">
                    <text class="couponTotalBoxTitle">优惠</text>
                    <text class="couponTotalBoxSubTitle">50</text>
                </div>
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
                    <text class="buttonCellBoxText">abc</text>
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
                    <text class="buttonCellBoxText">清空</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">会员</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">挂单</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">取单</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">查单</text>
                </div>
                <div class="buttonCellBoxTwo ">
                    <text class="buttonCellBoxText">帮助</text>
                </div>
                <div class="buttonCellBoxBorderNullTwo ">
                    <text class="buttonCellBoxText">结账</text>
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
        height: 38px;
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
        width: 80px;
        font-size: 28px;
        text-align: center;
    }
    .classTwo{
        width: 115px;
        font-size: 28px;
        text-align: center;
    }
    .classThree{
        width: 115px;
        font-size: 28px;
        text-align: center;
    }
    .classFour{
        width: 100px;
        font-size: 28px;
        text-align: center;
    }
    .classFive{
        width: 80px;
        font-size: 28px;
        text-align: center;
    }
    .classSix{
        width: 80px;
        font-size: 28px;
        text-align: center;
    }
    .classSeven{
        width: 80px;
        font-size: 28px;
        text-align: center;
    }
    .classEight{
        width: 100px;
        font-size: 28px;
        text-align: center;
    }
    .orderContent{
        flex-direction: column;
        width: 750px;
        height: 600px;
        background-color: white;
    }
    .orderCell{
        width: 750px;
        height: 80px;
        flex-direction: row;
        align-items: center;
    }
    .orderCellOne{
        width: 80px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellTwo{
        width: 115px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellThree{
        width: 115px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellFour{
        width: 100px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellFive{
        width: 80px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellSix{
        width: 80px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellSeven{
        width: 80px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderCellEight{
        width: 100px;
        font-size: 24px;
        text-align: center;
        lines:1;
        text-overflow: ellipsis;
    }
    .orderTotal{
        background-color: #ccc;
        width: 750px;
        height: 80px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
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
        width: 200px;
        padding-left: 20px;
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

            }
        },
        props: {
            title:{default:'XXXX专柜'}
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