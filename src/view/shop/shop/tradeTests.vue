<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title"  @goback="goback"  > </navbar>
        </div>
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
            <text class="text">绑定完成，请完成交易测试</text>
            <text class="sweepCode" @click="scan()">{{prompting}}</text>
        </div>
        <div class="button bkg-primary">
            <text class="buttonText">完成</text>
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
        color:deepskyblue;
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
        color: #cccccc;
        margin-top: 40px;
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
                prompting:'点击测试',
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "第四步"},

        },
        created() {
            utils.initIconFont();
            this.shopId = utils.getUrlParameter('shopIdthree')
        },
        methods:{
            goback:function () {
                event.closeURL()
            },
            scan:function() {
                var _this=this
                event.scan(function (message) {
                    utils.readScan(message.data,function (data) {
                        _this.code = data.data.code
                        if(data.type == 'success'){
                            POST('weex/member/shop/test.jhtml?shopId='+_this.shopId+'&code='+_this.code).then(
                                function (mes) {
                                    utils.debug(mes)
                                    if (mes.type == "success") {
                                        event.closeURL(mes);
                                    } else {
                                        event.toast(mes.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        }

                    })

                });
            }
        }
    }
</script>