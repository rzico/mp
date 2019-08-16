<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title"  @goback="goback"  > </navbar>
        <div class="head">
            <text class="one">① 新增  一</text>
            <text class="two">② 物料铺设  一</text>
            <text class="three">③ 设置  </text>
            <text class="four">④ 交易测试</text>
        </div>
        <div class="bind">
            <div class="iconfontDiv">
                <text class="iconfont" :style="{fontFamily:'iconfont'}">&#xe64d;</text>
            </div>
            <text class="text">设置打印机</text>
            <text class="sweepCode">{{u == '' ? '':'设备号:'+u}}</text>
            <text class="sweepCodetwo">{{p == '' ? '':'设备密钥:'+p}}</text>
        </div>
        <div class="button bkg-primary button-bkg-img" @click="scan()">
            <text class="buttonText">{{prompting}}</text>
        </div>
        <div class="skipBox">
            <text class="skipMessage" @click="call('13860431130')">暂无打印机，购买热线 13860431130</text>
            <text class="skipMessage mt50" @click="skip()">跳过</text>
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
    .skipBox{
        margin-top: 60px;
        width: 750px;
        align-items: center;
        justify-content: center;
    }
    .skipMessage{
        font-size: 32px;
        color: #0088fb;
    }
</style>
<script>
    var event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET, SCAN } from '../../../assets/fetch';
    const phone = weex.requireModule('phone');

    export default {
        data: function () {
            return{
                prompting:'扫码绑定',
                shopId:'',
                code:'',
                clicked:false,
                u:'',
                p:''
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
            if(!utils.isNull(utils.getUrlParameter('u'))){
                this.u = utils.getUrlParameter('u');
                this.prompting = '重新绑定';
            }
            if(!utils.isNull(utils.getUrlParameter('p'))){
                this.p = utils.getUrlParameter('p');
            }
        },
        methods:{
            goback:function () {
                event.closeURL()
            },
            //            跳过绑定二维码
            skip:function () {
                let message = utils.message('success','成功','');
                event.closeURL(message)
            },
            call(e){
                phone.tel(e,function(){
                    return;
                })
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
                    _this.u = utils.getUrlParameter('m',message.data);
                    _this.p = utils.getUrlParameter('p',message.data);
                            POST('weex/member/shop/printer.jhtml?shopId='+_this.shopId+'&p='+_this.p + '&u='+_this.u).then(
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
                });
            }
        }
    }
</script>