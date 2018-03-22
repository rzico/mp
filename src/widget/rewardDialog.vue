<template>
    <div class="wrapper sendMask"  @click="closeReward()">
        <div  style="position: fixed;bottom: 0;" >
            <div class="box">
                <div style="width: 750px;flex-direction: row;align-items: center;justify-content: center;height: 100px;background-color: #eee">
                    <text class="title">赞赏金额将全数转入作者钱包</text>
                    <!--扩大点击区域-->
                    <div class="bigCloseBox"  @click="closeReward()" >
                    <!--右上角关闭按钮"x"-->
                        <div class="paraClose bkg-primary">
                            <text class="paraCloseSize" :style="{fontFamily:'iconfont'}" >&#xe60a;</text>
                        </div>
                    </div>
                </div>
                <div class="subTitleBox">
                     <text class="sub_title ">请选择打赏金额</text>
                </div>
                <div class="moneyBox">
                    <div @click="comfirm(1)" class="moneySmallBox"><text class="money">1元</text></div>
                    <div @click="comfirm(3)" class="moneySmallBox"><text class="money">3元</text></div>
                    <div @click="comfirm(8)"  class="moneySmallBox"><text class="money">8元</text></div>
                    <div @click="comfirm(18)"  class="moneySmallBox"><text class="money">18元</text></div>
                    <div @click="comfirm(28)"  class="moneySmallBox"><text class="money">28元</text></div>
                    <div @click="comfirm(58)"  class="moneySmallBox"><text class="money">58元</text></div>
                    <div @click="comfirm(88)" class="moneySmallBox" ><text class="money">88元</text></div>
                    <div @click="comfirm(188)" class="moneySmallBox"><text class="money">188元</text></div>
                </div>
                <div class="imgbox">
                    <image style="" :src="src" class="img" alt="em"></image>
                </div>

                <div class="cell" style="border-bottom-width: 0px;">
                    <dropdown :title="title" :id="id" :items="items" @onchange="onchange" ></dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../style/wx.less"/>
<style scoped>

    .cell {
        margin-left: 20px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 730px;
        min-height:98px;
        border-bottom-width: 1px;
        border-bottom-color: #ccc;
        border-bottom-style: solid;
    }
    .bigCloseBox{
        height: 100px;
        position: absolute;
        top: 0;
        right: 0;
        width:100px;
    }
    .paraClose{
        position: absolute;
        top:28px;
        right:20px;
        padding-left: 10px;
        padding-top: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
        border-radius:22px;
    }
    .paraCloseSize{
        color: #fff;
        font-size: 24px;
    }
    .moneySmallBox:active{
        background-color:#999;
    }
    .subTitleBox{
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: 30px;
    }
    .box{
        height:1134px;
        width:750px;
        background-color:#fff;
    }
    .moneyBox{
        width: 750px;
        padding-left: 25px;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .money{
        font-size: 40px;
    }
    .moneySmallBox{
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
        height: 150px;
        width: 150px;
        margin-left: 20px;
        border-style:solid;
        border-width: 1px;
        border-color: red;
        border-radius:10px;
    }
    .imgbox{
        position: absolute;
        right:30px;
        bottom: 30px;
    }
    .img{
        /*图片大小可以为337*/
        width: 300px;
        height: 300px;
    }
</style>
<script>

    const event = weex.requireModule('event');
    import utils from '../assets/utils';
    import dropdown from '../include/dropdown.vue';
    export default {
        data() {
            return {
                src:utils.locate('resources/images/em1.gif'),
                title: "付款方式",
                items:[{id:0,name:"微信支付",ico:'&#xe659;',color:'green'},{id:1,name:"支付宝支付",ico:'&#xe621;',color:'#00A1ED'}],
                id: 0,
            }
        },
        components: {
            dropdown
        },
        methods:{
            closeReward:function () {
                this.$emit("close")
            },
            comfirm:function (m) {
                this.$emit("close")
                this.$emit("rewardNumber",m,this.id)
            },
            onchange:function (id) {
                this.id = id;
            },
        }

    }
</script>
