<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <div class="head">
            <text class="one">① 新增  一</text>
            <text class="two">② 物料铺设  一</text>
            <text class="three">③ 激活  一</text>
            <text class="four">④ 交易测试</text>
        </div>
        <div class="bind">
            <div class="iconfontDiv">
                <text class="iconfont" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
            </div>
            <text class="text">激活店铺完成，请扫码绑定二维码</text>
            <text class="sweepCode">{{code}}</text>
            <text class="sweepCodetwo" @click="scan()">{{prompting}}</text>
        </div>
        <div class="button bkg-primary" @click="select">
            <text class="buttonText">下一步</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .head{
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-bottom-color: #cccccc;
        border-bottom-width: 1px;
        height: 120px;
    }
    .one{
        font-size: 28px;
        color:deepskyblue;
    }
    .two{
        padding-left: 20px;
        font-size: 28px;
        color: deepskyblue;
    }
    .three{
        padding-left: 20px;
        font-size: 28px;
        color:deepskyblue;
    }
    .four{
        padding-left: 20px;
        font-size: 28px;
        color: #cccccc;
    }
    .bind{
        flex-direction: column;
        align-items: center;
        background-color: white;
    }
    .iconfontDiv{
        width: 150px;
        height: 150px;
        border-radius: 75px;
        background-color:green;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
    }
    .text{
        font-size: 32px;
        margin-top: 40px;
    }
    .sweepCode{
         font-size: 28px;
         color: #999;
         margin-top: 20px;
         margin-bottom: 20px;
     }
    .sweepCodetwo{
        font-size: 28px;
        color: #999;
        margin-bottom: 40px;
    }
    .iconfont{
        color: white;
        font-size: 100px;
    }
    .button{
        margin-left:40px;
        margin-right:40px;
        height:82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
        position: absolute;
        bottom:30px;
        left: 0;
        right: 0;
    }
    .buttonText{
        font-size: 40px;
        color: white;
    }
</style>
<script>
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET, SCAN } from '../../../assets/fetch'

    export default {
        data: function () {
            return{
                prompting:'点击扫码',
                shopId:'',
                code:'',
                clicked:false
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "第三步"},

        },
        created() {
            utils.initIconFont();
            this.shopId = utils.getUrlParameter('shopId');
            this.code = utils.getUrlParameter('code')+'';
            if(utils.isNull(this.code)){
                this.prompting='点击扫码'
            }else {
                this.prompting='点击修改二维码'
            }
        },
        methods:{
            goback:function () {
                event.closeURL()
            },
//            判断code是否有值，无值弹开扫一扫，有值回到列表
            select:function () {
                if(utils.isNull(this.code)) {
                    this.scan()
                }else {
                    let message = utils.message('success','成功','');
                    event.closeURL(message)
                }
            },
            scan:function() {
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                var _this=this
                event.scan(function (message) {
                    _this.clicked =false
                    if (message.type=='error') {
                        _this.clicked =false
                        return;
                    }
                    utils.readScan(message.data,function (data) {
                        if (data.type == 'success'){
                            if (data.data.type!='818804') {
                                event.toast("无效收钱码");
                                _this.clicked =false
                                return;
                            }
                            _this.code = data.data.code
                            POST('weex/member/shop/bind.jhtml?shopId='+_this.shopId+'&code='+_this.code).then(
                                function (mes) {
                                    if (mes.type == "success") {
                                        event.openURL(utils.locate('view/shop/shop/tradeTests.js?shopIdthree='+_this.shopId), function (message) {
                                            _this.clicked =false
                                            if (message.type == "success") {
                                                event.closeURL(message);
                                            }
                                        })
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        } else {
                            event.toast(data.content);
                        }
                    })
                });
            }
        }
    }
</script>