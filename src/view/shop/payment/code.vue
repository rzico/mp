<template>
    <div class="wrapper bkg-primary">
        <navbar :title="title" @goback="goback"></navbar>
        <div class="codeBox">
            <text class="codeHeaderTitle">无需添加好友，扫码收款</text>
            <image class="codeImg" :src="qrcode" v-if="status == '' " ref="downImg"></image>
            <div class="statusBox" v-if=" status != ''">
                <div :class="[status == 'success'?'icoBox':'icoBoxTwo']">
                    <text class="statusIco" :style="{fontFamily:'iconfont'}" v-if="status == 'success'">&#xe64d;</text>
                    <text class="statusIco" :style="{fontFamily:'iconfont'}" v-if="status != 'success'">&#xe60a;</text>
                </div>
                <text class="fz32 mt30">{{status == 'success'?'收款成功':'收款失败'}}</text>
            </div>
            <text class="codePriceTitle" v-if="status != '' ">¥{{amount}}</text>
            <text class="down"  v-if="status == '' " @click="saveImg">保存收款码</text>
            <div class="promptBox" @click="linkPaymentBill">
                <text class="promptBoxTitle">收款账单</text>
                <text class="fz32 gray" :style="{fontFamily:'iconfont'}">&#xe630;</text>
            </div>
        </div>
        <div class="cellBox" @click="linkToIndex"  v-if="status == '' ">
            <div class="flex-row">
                <text class="scanIco" :style="{fontFamily:'iconfont'}">&#xe607;</text>
                <text class="scanText">扫码收款</text>
            </div>
            <text class="fz32 white" :style="{fontFamily:'iconfont'}">&#xe630;</text>
        </div>
        <div class="cellBox" @click="linkToCode"  v-if="status != '' ">
            <div class="flex-row">
                <text class="scanIco" :style="{fontFamily:'iconfont'}">&#xe675;</text>
                <text class="scanText">二维码收款</text>
            </div>
            <text class="fz32 white" :style="{fontFamily:'iconfont'}">&#xe630;</text>
        </div>
        <wxc-loading :show="loading"  :loading-text="loadingText"></wxc-loading>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .down{
        font-size: 30px;
        color: #6495ED;
        text-decoration:underline;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 30px;
    }
    .cellBox{
        width: 670px;
        height: 120px;
        border-radius: 6px;
        background-color: rgba(204,204,204,0.1);
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: 40px;
        margin-top: 20px;
    }
    .cellBox:active{
        background-color: rgba(255,255,255,0.1);
    }
    .scanIco{
        font-size: 40px;
        color: #ffffff;
    }
    .scanText{
        font-size: 32px;
        margin-left: 20px;
        color: #ffffff;
    }



    .codeBox {
        width: 670px;
        border-radius: 6px;
        background-color: white;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 40px;
    }

    .codeHeaderTitle {
        margin-top: 80px;
        font-size: 30px;
        color: #444;
    }

    .codeImg {
        width: 520px;
        height: 520px;
    }
    .statusBox{
        margin-top: 50px;
        width: 420px;
        height: 420px;
        background-color: #ffffff;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .icoBox{
        width: 120px;
        height: 120px;
        border-radius: 100%;
        align-items: center;
        justify-content: center;
        background-color: #62b900;
    }
    .icoBoxTwo{
        width: 120px;
        height: 120px;
        border-radius: 100%;
        align-items: center;
        justify-content: center;
        background-color: #EB4E40;
    }
    .statusIco{
        font-size: 80px;
        color: #ffffff;
    }

    .codeBottonBox {
        width: 300px;
        margin-top: 50px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .codeChoose {
        width: 150px;
        border-right-width: 1px;
        border-right-color: #ccc;
        box-sizing: border-box;
    }

    .codeChooseTitle {
        font-size: 28px;
        color: #F03215;
        display: block;
    }

    .codeSaveBox {
        width: 150px;
        flex-direction: row;
        justify-content: flex-end;

    }

    .codeSaveTitle {
        font-size: 28px;
        color: #F03215;
        display: block;
    }

    .promptBox {
        width: 630px;
        height: 120px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-top-width: 1px;
        border-top-color: #ccc;
        margin-top: 50px;
    }

    .promptBoxTitle {
        font-size: 30px;
    }

    .codePriceTitle {
        font-size: 80px;
        display: block;
    }

</style>
<script>
    import {POST, GET} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'
    import { WxcLoading, WxcPartLoading } from 'weex-ui';
    export default {
        data() {
            return {
                qrcode:"http://rzico.oss-cn-shenzhen.aliyuncs.com/weex/resources/images/chooseGold.png",
                amount:'',
                sn:'',
                loading:false,
                loadingText:'请求中...',
                time:null,
                safeKey:'',
                status:'',
                clicked:false
            }
        },
        props: {
            title: {default: "扫码收款"}
        },
        components: {
            navbar,WxcLoading,WxcPartLoading
        },
        created() {
            let _this = this;
            utils.initIconFont();
            this.loadCode();
        },
        beforeDestory() {

        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            loadCode:function () {
                var _this = this;
                GET("weex/member/card/qrcode.jhtml",function (res) {
                    if (res.type=='success') {
                        _this.qrcode = utils.website("/q/show.jhtml?url="+encodeURI(res.data.qrcode));
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            submit(){
                let _this = this;
                this.loading = true;
                POST("payment/submit.jhtml?paymentPluginId=weixinQRPlugin&sn="+this.sn+"&safeKey="+this.safeKey).then(function (mes) {
                    if (mes.type == "success") {
                        _this.loading = false;
                        _this.query()
                    } else {
                        _this.status = 'error';
                        _this.loading = false;
                        event.toast(mes.content);
                    }
                }, function (err) {
                    _this.loading = false;
                    event.toast(err.content);
                });
            },
            query(){
                let _this = this;
                POST("payment/query.jhtml?sn="+this.sn).then(function (mes) {
                    if (mes.type == "success") {
                        if(mes.data  == '0000'){
                            _this.status = 'success'
                        }else if(mes.data  == '0001'){
                            _this.status = 'error'
                        }else {
                            setTimeout(function () {
                                _this.query()
                            },1500)
                        }
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content);
                });
            },
            linkPaymentBill(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate("view/shop/payment/bill.js"), function (e) {

                });
            },
            linkToIndex(){
                if (this.clicked) {
                    return;
                }
                this.clicked = true;
                let _this = this
                setTimeout(function () {
                    _this.clicked = false;
                }, 1500)
                event.openURL(utils.locate("view/shop/payment/index.js"), function (e) {
                    if(e.type == 'success'){
                        _this.amount = e.data.amount;
                        _this.sn =  e.data.sn;
                        _this.safeKey = e.data.safeKey;
                        _this.submit()
                    }
                });
            },
            linkToCode(){
              this.status = '';
            },
            saveImg(){
                let _this = this;
                const $image = this.$refs.downImg
                $image.save(result => {
                    if (result.success) {
                        event.toast('收款码已保存至相册')
                    } else {
                    }
                })
            }
        }
    }
</script>
