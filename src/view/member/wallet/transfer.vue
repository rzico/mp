<template>
    <div style="background-color: #eeeeee">
            <navbar :title="title" :complete="complete" @goback="goback" > </navbar>
    <div class="big">
        <div class="bankWechat">
        <div class="bank bd-primary" @click="bankmessage()">
                <text class="bankIconFont primary" :style="{fontFamily:'iconfont'}" >&#xe64f;</text>
            <div class="bankInformation">
                <text class="bankName">{{wdata.bankName}}</text>
                <text class="bankTailnumber">{{wdata.cardNo}}</text>
            </div>
        </div>
            <div class="wechat" @click="wechatmessage" >
                <text class="wechatIconFont" :style="{fontFamily:'iconfont'}" >&#xe659;</text>
                <div class="wechatInformation">
                <text class="wechatFont">微信提现</text>
                    <text class="wechatName">{{wdata.nickName}}</text>
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
                    <text class="servicefee">手续费 {{service | currencyfmt}}元</text>
                </div>
                <div class="serviceArrival">
                    <text class="arrival">实际到账 {{creditedAmount | currencyfmt}}元</text>
            </div>
            </div>
        </div>
        <div class="botton bkg-primary" @click="withdrawals">
            <text class="bottontext">确认提现</text>
        </div>
    </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>

    .bankWechat{
        flex-direction: row;
        justify-content: space-between;
    }
    .bank{
        background-color:#ffffff;
        border-style: solid;
        border-top-width:1px;
        border-top-color:#CCC;
        border-bottom-width: 2px;
        /*border-bottom-color:#D9141E ;*/
        /*border-right-style: dashed;*/
        border-right-width: 1px;
        border-right-color:#CCC;
        height: 120px;
        margin-top: 30px;
        flex-direction: row;
        align-items:center;
        flex:1;
    }
    .bankIconFont{
        font-size: 80px;
        margin-left: 30px;
        margin-top:5px;
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
        lines:1;
        text-overflow: ellipsis;
        width:200px;
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
        margin-top:5px;
    }
    .wechatFont{
        font-size: 32px;
    }
    .wechatName{
        font-size:28px;
        color:#ccc;
        width:200px;
        lines:1;
        text-overflow: ellipsis;
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
        height: 110px;
        line-height: 80px;
        font-size:80px;
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
    import filters from '../../../filters/filters.js'
    import utils from '../../../assets/utils';
    export default {
        data() {
            return {
                quota:'0',
                message:'单笔最大额度 5万元',
                bankstyle:2,
                bankcolor:'#D9141E',
                wechatstyle:1,
                wechatcolor:'#ccc',
                bankWithdrawals:'bankcard',
                service:'0',
                hide:'hidden',
                wdata:{bankname:"",cardno:""},
                timer:null,
                clicked:false
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
                if (this.quota==0) {
                    return 0;
                } else {
                    return Number(this.quota) - Number(this.service)
                }
            }
        },
        created() {
            this.load();
        },
        methods: {

            onmoney:function (e){
                if (e.value=='') {
                    this.quota = 0;
                } else {
                    this.quota = e.value;
                }
                var _this=this;
                if (_this.timer!=null) {
                    clearTimeout(_this.timer);
                    _this.timer = null;
                }
                _this.timer = setTimeout(function () {
                    _this.serviceCharge()
                },1000)
                _this.hide= 'visible'
            },
            bankmessage: function () {
                var self = this
                self.message = '单笔最大限额 5万元'
                this.wechatstyle=1
                this.wechatcolor='#ccc'
                this.bankWithdrawals ='bankcard'
            },
            wechatmessage: function (event) {
                var self = this
//                self.message = '单笔最大限度 1万元'
//                this.wechatstyle=2
//                this.wechatcolor='#D9141E'
//                this.bankstyle=1
//                this.bankcolor='#ccc'
//                this.bankWithdrawals ='weixin'
//                console.log('will show alert')
                modal.alert({
                    message: '微信提现功能尚未开通，敬请谅解',
                    okTitle: '知道了'
                })
                this.bankmessage()
            },
            withdrawals:function () {
                var _this = this;
                if (this.clicked==true) {
                    return;
                }
                this.clicked = true;
                POST('weex/member/transfer/submit.jhtml?type='+ this.bankWithdrawals +'&amount=' +this.quota).then(
                    function (data) {
                        if (data.type == "success") {
                            event.sendGlobalEvent('onUserInfoChange',data);
//                            modal.alert({
//                                message: '提交成功，请注意到账情况',
//                                okTitle: '知道了'
//                            }, function (value) {
//                            })
                            event.toast('提交成功，请注意到账情况');
                            event.closeURL(data);
                        } else {
                            event.toast(data.content);
                        }
                        _this.clicked = false;
                    }, function (err) {
                        event.toast(err.content);
                        _this.clicked = false;
                    }
                )
            },
            serviceCharge:function(){
                var _this = this;
                if (this.quota==0) {
                    _this.service = 0;
                } else {
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
                }
            },
            goback: function () {
                event.closeURL();
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