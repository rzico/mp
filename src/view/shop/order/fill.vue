<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="memberCard" @click="gocard()">
            <text class="fz32" style="color: #999">点击选择会员</text>
        </div>
        <div class="infoContent">
            <div class="memberInfo">
                <image class="memberLogo"></image>
                <div class="memberNameTelBox">
                    <text class="memberName">姓名: 张三</text>
                    <text class="memberTel">电话: 15159294142</text>
                </div>
            </div>
            <div class="memberAddress">
                <text class="fz32">收货地址:</text>
                <text class="address">福建省厦门市思明区龙山中路启达时尚大厦220</text>
            </div>
            <div class="goodsBox">
                <image class="goodsLogo"></image>
                <div class="goodsInfo">
                    <text class="goodsTitle">蜡笔小新布偶玩具哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
                    <div class="goodsInfoBottom">
                        <text class="fz28" style="color:#999;">无规格</text>
                        <div class="goodsNumberBox">
                            <text class="fz28" style="color:#999;margin-right: 10px">X</text>
                            <div class="chooseLeftBox"><text class="fz32">-</text> </div>
                            <div class="chooseInput"><input class="input" type="number"/></div>
                            <div class="chooseRightBox"><text class="">+</text> </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="addGoods">
                <text :style="{fontFamily:'iconfont'}" style="color: #999;font-size: 70px">&#xe617;</text>
                <text class="fz32" style="color: #999">点击添加商品</text>
            </div>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .wrapper{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 750px;
        background-color:#eeeeee;

    }
    .memberCard{
        width: 690px;
        height: 80px;
        align-items: center;
        justify-content: center;
        margin: 30px;
        background-color: white;
        border-radius: 15px;
        box-shadow:0px 0px  10px 5px #aaa;
    }
    .infoContent{
        width: 690px;
        padding:20px;
        margin: 30px;
        background-color: white;
        border-radius: 15px;
        box-shadow:0px 0px  10px 5px #aaa;
    }
    .memberInfo{
        width: 650px;
        flex-direction: row;
        align-items: center;
    }
    .memberLogo{
        width: 120px;
        height: 120px;
        border-width: 5px;
        border-color: #eeeeee;
        border-radius: 100%;
    }
    .memberNameTelBox{
        flex-direction: column;
        margin-left: 20px;
        height: 110px;
        justify-content: space-between;
    }
    .memberName{
        font-size: 32px;
        width: 500px;
        lines:1;
        text-overflow: ellipsis;
    }
    .memberTel{
        font-size: 32px;
    }
    .memberAddress{
        margin-top: 30px;
        width: 650px;
        flex-direction: row;
        border-bottom-width: 1px;
        border-color: #ccc;
        /*align-items: center;*/
    }
    .address{
        margin-left: 10px;
        width:510px;
        font-size: 32px;
        lines:2;
        text-overflow: ellipsis;
    }
    .goodsBox{
        margin-top: 20px;
        border-width: 1px;
        border-color: #ccc;
        padding: 10px;
        flex-direction: row;
    }
    .goodsLogo{
        height: 160px;
        width: 160px;
        background-color: #eeeeee;
    }
    .goodsInfo{
        flex-direction: column;
        margin-left: 20px;
        height: 160px;
        justify-content: space-between;
    }
    .goodsTitle{
        font-size: 28px;
        width: 447px;
        lines:2;
        text-overflow: ellipsis;
    }
    .goodsInfoBottom{
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
    }
    .goodsNumberBox{
        flex-direction: row;
        align-items: flex-end;
    }
    .chooseLeftBox{
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-left-width: 1px;
        border-top-width:1px;
        border-color: #999;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .chooseRightBox{
        height: 60px;
        width: 60px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-right-width: 1px;
        border-top-width:1px;
        border-color: #999;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .chooseInput{
        height: 60px;
        width: 60px;
        border-width: 1px;
        border-color: #999;
    }
    .input{
        height: 60px;
        line-height: 50px;
        width: 60px;
        text-align: center;
        font-size: 32px;
    }
    .addGoods{
        height: 160px;
        margin-top: 20px;
        border-width: 1px;
        border-color: #ccc;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
    }
</style>
<script>
    import {dom,event,stream,storage} from '../../../weex.js'
    import utils from '../../../assets/utils.js'
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue'
    const picker = weex.requireModule('picker');
    const modal = weex.requireModule('modal');
    export default {
        data: function () {
            return {
                choose:true
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "补单"},
        },
        filters: {

        },
        created() {
            utils.initIconFont();

        },
        methods: {
            goback(){
                event.closeURL();
            },
            //            跳转会员卡
            gocard:function () {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                let _this = this
                event.openURL(utils.locate("view/shop/card/list.js?choose="+this.choose),function (data) {
                    _this.clicked = false
                    if(data.type = 'success'){

                    }
                });
            },
        }
    }
</script>