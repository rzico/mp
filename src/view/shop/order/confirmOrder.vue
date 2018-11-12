<template>
    <div class="wrapper">
        <navbar :title="title"  @goback="goback" > </navbar>
        <div class="contentBox">
            <div class="info" v-for="(item,index) in ordersList">
                <text class="herderText">应付金额</text>
                <text class="herderAmount">¥{{item.amount | currencyfmt}}</text>
                <text class="herderSn">订单编号: {{item.sn}}</text>
                <text class="herderSn">下单时间: {{item.createDate | watchCreateDate}}</text>
                <div class="setting" @click="pickPay">
                    <div class="flex-row">
                        <text class="fz32">付款方式:  {{paymentPluginName}}</text>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="">
                    <div class="flex-row">
                        <text class="fz32">实付金额:</text>
                        <input class="input" type="number" placeholder="请输入金额" v-model="amount"/>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="setting" @click="">
                    <div class="flex-row">
                        <text class="fz32">付款凭证:</text>
                        <input class="input" type="number" placeholder="请输入凭证号" v-model="tranSn"/>
                    </div>
                    <div class="flex-row flex-end">
                        <text class="arrow" :style="{fontFamily:'iconfont'}">&#xe630;</text>
                    </div>
                </div>
                <div class="button mt30" style="width: 530px" @click="submit(item.amount)">
                    <text class="fz40" style="color:#fff;">确认订单</text>
                </div>
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
    .contentBox{
        width: 650px;
        background-color: white;
        border-radius: 15px;
        box-shadow:0px 0px  10px 5px #aaa;
        position: absolute;
        left: 50px;
        top: 200px;
    }
    .info{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 30px;
        border-color:#ccc;
        border-width: 1px;
        border-radius: 10px;
        background-color: white;
    }
    .herderText{
        font-size: 32px;
        color: #999;
    }
    .herderAmount{
        font-size: 80px;
    }
    .herderSn{
        font-size: 30px;
        color: #999;
        width: 590px;
    }
    .setting{
        margin-top: 20px;
        border-color:#ccc;
        height: 80px;
        width: 590px;
        border-top-width: 1px;
        border-bottom-width: 1px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .input{
        width: 400px;
        height: 80px;
        color: #999;
        font-size: 32px;
        padding-left: 20px;
    }
    .goodsBody{
        background-color: #eee;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .goodsInfo{

        display: flex;flex-direction: column;justify-content: space-between;
        height: 160px;
        /*width: 380px;*/
        width: 390px;
        padding-left: 20px;
        padding-right: 20px;

    }
    .goodsImg{
        height: 160px;
        width: 160px;
        border-radius: 5px;
    }
    .goodsName{
        line-height: 32px;

        lines:2;
        text-overflow: ellipsis;
    }
    .coral{
        color: coral;
    }
    .goodsPriceNum{
        /*height: 160px;*/
        align-items: center;
        justify-content: space-between;
        /*width: 150px;*/
        flex-direction: row;
        width: 390px;
        padding-right: 20px;
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
                begin:0,
                ordersList:[],
                amount:'',
                tranSn:'',
                payName:[],
                payId:[],
                paymentPluginId:'',
                paymentPluginName:'请选择付款方式'
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "确认订单"},
        },
        filters: {
            watchCreateDate: function (value) {
                return utils.ymdhistimefmt(value);
            },
        },
        created() {
            utils.initIconFont();
            this.orderSn = utils.getUrlParameter('sn');
            this.open();
        },
        methods: {
            open:function () {
                let _this = this;
                GET('website/member/order/view.jhtml?sn=' + this.orderSn ,function (data) {
                    if(data.type == 'success'){
                        _this.ordersList = [];
                        _this.ordersList.push(data.data);
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            },
            goback(){
                event.closeURL();
            },
            //            选择付款方式
            pickPay:function () {
                let _this = this
//                获取支付方式
                _this.payName =[];
                _this.payId = [];
                GET('payment/plugin.jhtml',function (mes) {
                    if (mes.type == 'success') {
                        mes.data.forEach(function (item) {
                            _this.payName.push(item.name);
                            _this.payId.push(item.paymentPluginId)
                        })
                        picker.pick({
                            index:_this.begin,
                            items: _this.payName
                        }, e => {
                            if (e.result == 'success') {
                                var dataIndex = e.data;
                                _this.begin = e.data;
                                _this.paymentPluginId = _this.payId[dataIndex];
                                _this.paymentPluginName = _this.payName[dataIndex]
                            }
                        })
                    } else {
                        event.toast(mes.content);
                    }
                }, function (err) {
                    event.toast(err.content)
                });
            },
            submit:function (amount) {
                let _this = this;
                if(utils.isNull(this.paymentPluginId)){
                    event.toast('请选择付款方式')
                    return
                }
                if(utils.isNull(this.amount)){
                    event.toast('请输入金额')
                    return
                }if(this.amount != amount){
                    event.toast('请输入应付金额')
                    return
                }if(utils.isNull(this.tranSn)){
                    event.toast('请输入凭证号')
                    return
                }

                POST('weex/member/order/payment.jhtml?sn=' + this.orderSn +'&tranSn' + encodeURIComponent(this.tranSn)).then(
                    function (data) {
                    if(data.type == 'success'){
                        POST('/payment/submit.jhtml?sn=' + data.data.sn +'&paymentPluginId=' +_this.paymentPluginId).then(
                            function (data) {
                                if(data.type == 'success'){
                                    let E = utils.message('success','确认成功','')
                                    event.closeURL(E);
                                }else{
                                    event.toast(data.content);
                                }
                            },function (err) {
                                event.toast(err.content);
                            })
                    }else{
                        event.toast(data.content);
                    }
                },function (err) {
                    event.toast(err.content);
                })
            }
        }
    }
</script>