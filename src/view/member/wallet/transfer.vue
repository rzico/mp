<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback" > </navbar>
        </div>
    <div class="big">
        <div class="bankWechat">
        <div class="bank" @click="bankmessage()" v-bind:style="{borderBottomWidth:bankstyle + 'px',borderBottomColor:bankcolor}">
                <text class="bankIconFont" :style="{fontFamily:'iconfont'}" >&#xe626;</text>
            <div class="bankInformation">
                <text class="bankName">{{wdata.bankname}}</text>
                <text class="bankTailnumber">{{wdata.cardno}}</text>
            </div>
        </div>
            <div class="wechat" @click="wechatmessage" v-bind:style="{borderBottomWidth:wechatstyle + 'px',borderBottomColor:wechatcolor}">
                <text class="wechatIconFont" :style="{fontFamily:'iconfont'}" >&#xe659;</text>
                <div class="wechatInformation">
                <text class="wechatFont">微信提现</text>
                    <text class="wechatName">{{nickName}}</text>
            </div>
        </div>
        </div>
        <div class="money">
            <text class="maxQuota">{{message}}</text>
            <div class="fontInput">
                <text class="iconFont" :style="{fontFamily:'iconfont'}" >&#xe69f;</text>
                <input class="input" type="number" placeholder="" maxlength="7":autofocus="true" value="" @input="onmoney"  />
            </div>
            <div class="maxQuotaServicefee">
                <div class="servicefeeText" v-bind:style="{visibility:hide}">
                    <text class="servicefee">手续费 {{service}}元</text>
                </div>
                <div class="serviceArrival">
                    <text class="arrival">实际到账 {{creditedAmount}}元</text>
            </div>
            </div>
        </div>
        <div class="botton" @click="withdrawals">
            <text class="bottontext">确认提现</text>
        </div>
    </div>
    </div>
</template>
<style>

    .bankWechat{
        flex-direction: row;
        justify-content: space-between;
    }
    .bank{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:5px;
        border-bottom-color:#D9141E;
        border-top-width:1px;
        /*border-right-style: dashed;*/
        border-right-width: 1px;
        border-color:#CCC;
        height: 120px;
        margin-top: 30px;
        flex-direction: row;
        align-items:center;
        flex:1;
    }
    .bankIconFont{
        font-size: 80px;
        margin-left: 30px;
    }
    .bankInformation{
        width:auto;
        height:120px;
        border-style: solid;
        flex-direction: column;
        margin-left: 20px;
        justify-content:center;
    }
    .bankName{
        font-size: 32px;
    }
    .bankTailnumber{
        font-size: 28px;
        color:#cccccc;
    }
    .wechat{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:1px;
        border-top-width:1px;
        border-color:#CCC;
        height: 120px;
        margin-top: 30px;
        flex-direction: row;
        align-items:center;
        flex:1;
    }
    .wechatInformation{
        flex-direction: column;
        margin-left: 20px;
        justify-content:center;
    }
    .wechatIconFont{
        font-size: 80px;
        color: chartreuse;
        margin-left: 30px;
    }
    .wechatFont{
        font-size: 32px;
    }
    .wechatName{
        font-size:28px;
        color:#ccc;
    }
    .money{
        background-color:#ffffff;
        border-style: solid;
        border-bottom-width:1px;
        border-top-width:1px;
        border-color:#CCC;
        margin-top:40px;
        flex-direction: column;
    }
    .fontInput{
        border-style: solid;
        border-bottom-width:1px;
        border-color:#CCC;
        margin-left: 30px;
        margin-right: 30px;
        flex-direction: row;
        align-items:center;
        height: 160px;
    }
    .iconFont{
        font-size: 80px;
    }
    .input{
        width: 500px;
        height: 120px;
       font-size:100px;
    }
    .maxQuotaServicefee{
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
        height: 70px;
    }
    .maxQuota{
        font-size: 28px;
        margin-top: 20px;
        color:#cccccc;
        margin-left: 30px;
    }
    .serviceArrival{
        flex-direction: row;
        align-items:center;
        margin-right: 30px;
    }
    .servicefee{
        font-size: 28px;
        color:#cccccc;
        margin-left: 30px;
    }
    .arrival{
        font-size: 28px;
        color:#D9141E;
        margin-left: 10px;
    }
    .botton{
        background-color:#D9141E;
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
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch'
    export default {
        data() {

            return {
                quota:'',
                message:'单笔最大额度 5万元',
                bankstyle:5,
                bankcolor:'#D9141E',
                wechatstyle:1,
                wechatcolor:'#ccc',
                bankWithdrawals:'bankcard',
                service:'',
                hide:'hidden',
                wdata:{bankname:"",cardno:""},
                timer:null
            }
        },
        components: {
            navbar
        },
        props: {
            title: { default: "提现" },
        },
        computed:{
            creditedAmount:function(){
                return Number(this.quota) - Number(this.service)
            }
        },
        methods: {
            created() {
                this.load();
            },
            onmoney:function (e){
                this.quota = e.value;
                var _this=this;
                if (_this.timer!=null) {
                    clearTimeout(_this.timer);
                    _this.timer = null;
                }
                _this.timer = setTimeout(function () {
                    _this.serviceCharge()
                },2000)
                _this.hide= 'visible'
            },
            bankmessage: function () {
                var self = this
                self.message = '单笔最大限额 5万元'
                this.bankstyle=5
                this.bankcolor='#D9141E'
                this.wechatstyle=1
                this.wechatcolor='#ccc'
                this.bankWithdrawals ='bankcard'
            },
            wechatmessage: function (event) {
                var self = this
                self.message = '单笔最大限度 1万元'
                this.wechatstyle=5
                this.wechatcolor='#D9141E'
                this.bankstyle=1
                this.bankcolor='#ccc'
                this.bankWithdrawals ='weixin'
                console.log('will show alert')
                modal.alert({
                    message: '微信提现功能尚未开通，敬请谅解',
                    okTitle: '知道了'
                })
                this.bankmessage()
            },
            withdrawals:function () {
                var _this = this;
                        POST('weex/member/transfer/submit.jhtml?type='+ this.bankWithdrawals +'&amount=' +this.quota).then(
                            function (data) {
                                if (data.type == "success") {
                                    modal.alert({
                                        message: '提交成功，请注意到账情况',
                                        okTitle: '知道了'
                                    })
                                } else {
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                event.toast(err.content);
                            }
                        )
            },
            serviceCharge:function(){
                var _this = this;
                POST('weex/member/transfer/calculate.jhtml?amount=' +this.quota ).then(
                    function (data) {
                        if (data.type == "success") {
                                 _this.service = data.data;
                        } else {
                            event.toast(data.content);
                        }
                    }, function (err) {
                    }
                )
            },
            goback: function () {
                event.closeURL()
            },
            load:function () {
                var _this = this;
                GET("weex/member/transfer/view.jhtml",function (res) {
                    if (res.type=='success') {
                        _this.wdata = res.data;
                    } else {
                        event.toast(res.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }
        }
    }
</script>