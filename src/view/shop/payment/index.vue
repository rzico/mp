<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"></navbar>
        <div class="transfer_NumberBox">
            <text class="NumberTitle">金额</text>
            <input class="NumberInput" placeholder="0.00" type="number" v-model="amount"/>
            <text class="NumberTitle">元</text>
        </div>
        <div class="transfer_TitleBox">
            <input class="TitleInput" placeholder="备注：请输入收款人姓名" v-model="memo"/>
        </div>
        <div class="transfer_PriceBox" v-if="amount != ''">
            <text class="PriceIcon">¥</text>
            <text class="PriceTitle">{{amount}}</text>
        </div>
        <div class="transfer_Botton bkg-primary" :style="{opacity:amount==''?0.5:1}" @click="linkToScan">
            <text class="transfer_BottonTitle">点击扫码收款</text>
        </div>
        <!--<div class="transfer_Botton bkg-primary mt40" :style="{opacity:amount==''?0.5:1}" @click="complete">-->
            <!--<text class="transfer_BottonTitle">创建收款码</text>-->
        <!--</div>-->
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style scoped>
    .transfer_NumberBox {
        width: 690px;
        height: 100px;
        border-radius: 6px;
        background-color: white;
        margin-top: 50px;
        margin-left: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .transfer_TitleBox {
        width: 690px;
        height: 100px;
        border-radius: 6px;
        background-color: white;
        margin-top: 30px;
        margin-left: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .transfer_PriceBox {
        margin-top: 60px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .PriceIcon {
        font-size: 60px;
        font-weight: 700;
        line-height: 100px;
        margin-right: 10px;
    }

    .PriceTitle {
        font-size: 80px;
        font-weight: 700;
    }

    .NumberTitle {
        font-size: 30px;
        margin-left: 20px;
    }

    .NumberInput {
        text-align: right;
        font-size: 30px;
        width: 540px;
        height: 90px;
    }

    .TitleInput {
        width: 690px;
        height: 90px;
        padding-left: 20px;
        box-sizing: border-box;
        font-size: 30px;
    }

    .transfer_Botton {
        width: 690px;
        height: 100px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        margin-left: 30px;
    }

    .transfer_BottonTitle {
        font-size: 32px;
        color: white
    }

    .attentionBox {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 10px;
    }

    .attentionTitle {
        font-size: 26px;
        color: #ccc;
    }
</style>
<script>
    import {POST, GET, SCAN} from '../../../assets/fetch'
    import utils from '../../../assets/utils'
    const modal = weex.requireModule('modal');
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'

    export default {
        data() {
            return {
                clicked: false,
                amount: '',
                memo: ''
            }
        },
        props: {
            title: {default: "设置金额"}
        },
        components: {
            navbar
        },
        created() {
            utils.initIconFont();

        },
        methods: {
            goback: function (e) {
                event.closeURL();
            },
            complete() {
                if (this.clicked || utils.isNull(this.amount)) {
                    return;
                }
                this.clicked = true;
                let _this = this
                POST("weex/member/payment/create.jhtml?amount=" + this.amount + "&memo=" + encodeURIComponent(this.memo)).then(function (mes) {
                    _this.clicked = false;
                    if (mes.type == "success") {
                        event.openURL(utils.locate("view/shop/payment/code.js?sn=" + mes.data.sn + "&amount=" + mes.data.amount), function (e) {
                        });
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    _this.clicked = false;
                    event.toast(err.content);
                });

            },
            linkToScan() {
                let _this = this
                if (this.clicked || utils.isNull(this.amount)) {
                    return;
                }
                this.clicked = true;
                POST("weex/member/payment/create.jhtml?amount=" + this.amount + "&memo=" + encodeURIComponent(this.memo)).then(function (mes) {
                    _this.clicked = false;
                    if (mes.type == "success") {
                        event.scan(function (message) {
                            if (message.type !='error' &&!utils.isNull(message.data)) {
                                if (message.data == '{}') {
                                    return
                                }
                                event.openURL(utils.locate("view/shop/payment/code.js?sn=" + mes.data.sn + "&amount=" + mes.data.amount +"&safeKey="+encodeURIComponent(message.data)), function (e) {
                                });
                            }
                        });
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    _this.clicked = false;
                    event.toast(err.content);
                });
            }
        }
    }
</script>
