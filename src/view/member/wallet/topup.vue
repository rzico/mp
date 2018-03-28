<template>
    <div style="background-color: #eeeeee">
        <navbar :title="title" :complete="complete" @goback="goback" > </navbar>
        <div class="money">
            <div style="flex-direction: row;align-items: center;margin-top: 30px">
                <text class="maxQuota">充值金额</text>
            </div>
            <div class="fontInput">
                <text style="font-size: 50px">¥</text>
                <input class="input" type="number" placeholder="请输入充值金额" maxlength="7":autofocus="true" value="" @input="onmoney"  />
            </div>
        </div>
        <div class="botton bkg-primary" @click="gobuy()">
            <text class="bottontext">确认充值</text>
        </div>
        <payment ref="payment" @notify="notify"></payment>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    input::-webkit-input-placeholder {
        color: #aab2bd;
        font-size: 12px;
        text-align: right;
    }
    .money{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:1px;
        border-top-width:1px;
        border-color:#ccc;
        margin-top:30px;
        flex-direction: column;
    }
    .fontInput{
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        align-items:center;
        height: 160px;
    }
    .input{
        margin-left: 20px;
        width: 500px;
        height: 110px;
        line-height: 50px;
        font-size:50px;
    }
    .maxQuota{
        font-size: 36px;
        margin-left: 30px;
    }
    .botton{
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 70px;
        height: 82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
    }
    .bottontext{
        font-size: 40px;
        color:#ffffff;
    }
</style>

<script>
    var event = weex.requireModule('event');
    var modal = weex.requireModule('modal');
    import utils from '../../../assets/utils'
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch'
    import filters from '../../../filters/filters.js'
    import payment from '../../../include/payment.vue'
    export default {
        data() {
            return {
                quota:0,
                goldImg:utils.locate('resources/images/goldMoney.png'),
                timer:null,
                clicked:false
            }
        },
        components: {
            navbar,payment
        },
        props: {
            title: { default: "余额充值" },
        },
        computed:{

        },
        created() {
        },
        methods: {
            onmoney:function (e){
                if (e.value=='') {
                    this.quota = 0;
                } else {
                    this.quota = e.value;
                }
            },
            //支付完成通成
            notify:function (e) {
                if (e.type=="success") {
                    modal.alert({
                        message: '充值成功',
                        okTitle: '知道了'
                    })
                    event.closeURL()
                }else{
                    event.closeURL()
                }
            },
            gobuy:function (e) {
                var _this = this;
                if(_this.quota == 0){
                    modal.alert({
                        message: '输入金额不能为0',
                        okTitle: '知道了'
                    })
                    _this.clicked = false;
                    return
                }
                POST('weex/member/recharge/payment.jhtml?amount='+_this.quota).then(
                    function (mes) {
                        _this.clicked = false;
                        if (mes.type == "success") {
                            _this.$refs.payment.show(mes.data);
                        } else {
                            event.toast(mes.content);
                        }
                    }, function (err) {
                        _this.clicked = false;
                        event.toast(err.content);
                    }
                )

            },
            goback: function () {
                event.closeURL()
            },
        }
    }
</script>