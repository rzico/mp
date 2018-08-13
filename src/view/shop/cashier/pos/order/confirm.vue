<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" ></navbar>
        <div class="content">
            <div class="cell" @click="controlNoNumber">
                <text class="cellTitle">货号:</text>
                <text class="input" >{{NoNumber}}</text>
            </div>
            <div class="cell" @click="controlName">
                <text class="cellTitle">品名:</text>
                <text class="input" >{{name}}</text>
            </div>
            <div class="cell" @click="controlPricer">
                <text class="cellTitle">价格:</text>
                <text class="input" >{{price}}</text>
            </div>
            <div class="cell" @click="controlDiscount">
                <text class="cellTitle">折扣:</text>
                <text class="input" >{{discount}}</text>
            </div>
            <div class="cell" @click="controlNumber">
                <text class="cellTitle">数量:</text>
                <text class="input" >{{number}}</text>
            </div>
            <div class="cell" @click="controlMoney">
                <text class="cellTitle">金额:</text>
                <text class="input" >{{money}}</text>
            </div>
            <div class="cell" @click="controlCoupon">
                <text class="cellTitle">优惠:</text>
                <text class="input" >{{coupon}}</text>
            </div>
        </div>
        <div class="messageBox">
            <text class="message">优惠活动提示区</text>
        </div>
        <div class="buttonBox">
            <div class="buttonCell">
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">1</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">2</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">3</text>
                </div>
                <div class="buttonCellBoxTwo">
                    <text class="buttonCellBoxText">退格</text>
                </div>
            </div>
            <div class="buttonCell">
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">4</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">5</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">6</text>
                </div>
                <div class="buttonCellBoxTwo">
                    <text class="buttonCellBoxText">清空</text>
                </div>
            </div>
            <div class="buttonCell">
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">7</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">8</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">9</text>
                </div>
                <div class="buttonCellBoxTwo">
                    <text class="buttonCellBoxText">取消</text>
                </div>
            </div>
            <div class="buttonCell">
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">.</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">0</text>
                </div>
                <div class="buttonCellBox">
                    <text class="buttonCellBoxText">abc</text>
                </div>
                <div class="buttonCellBoxTwo">
                    <text class="buttonCellBoxText">确定</text>
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
        height:98px;
    }
    .message{
        font-size:32px;
        color: #999999;
    }
    .buttonBox{
        border-top-width:1px;
        border-top-color:#999;
        flex-direction: column;
    }
    .buttonCell{
        height: 100px;
        width:750px;
        flex-direction: row;
        align-items: center;
    }
    .buttonCellBox{
        width: 187px;
        height: 100px;
        background-color: #cccccc;
        border-right-color: #999999;
        border-right-width: 1px;
        border-bottom-width:1px;
        border-bottom-color:#999;
        align-items: center;
        justify-content: center;
    }
    .buttonCellBox:active{
        background-color: #999999;
    }
    .buttonCellBoxTwo{
        width: 187px;
        height: 100px;
        background-color: #cccccc;
        border-bottom-width:1px;
        border-bottom-color:#999;
        align-items: center;
        justify-content: center;
    }
    .buttonCellBoxTwo:active{
        background-color: #999999;
    }
    .buttonCellBoxText{
        font-size: 32px;
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
                NoNumber:'111111',
                name:'耐克超跑',
                price:'1000',
                discount:'95',
                number:'1',
                money:'950',
                coupon:'50'
            }
        },
        props: {
            title:{default:'商品详情'}
        },
        created() {
            utils.initIconFont();
        },
        methods:{
            goback: function (e) {
                event.closeURL();
            },
            controlNoNumber(){
                this.NoNumber = ''
            },
            controlName(){
                this.name = ''
            },
            controlPricer(){
                this.price = ''
            },
            controlDiscount(){
                this.discount = ''
            },
            controlNumber(){
                this.number = ''
            },
            controlMoney(){
                this.money = ''
            },
            controlCoupon(){
                this.coupon = ''
            },
        }
    }
</script>