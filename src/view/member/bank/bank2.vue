<template>
    <div style="background-color:#eeeeee">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback" > </navbar>
        </div>
    <div class="big">
        <div class="inputA">
            <text class="textA">卡类型</text>
            <text class="textAA">{{txtInput}}</text>
        </div>
        <div class="inputB">
            <text class="textB">手机号</text>
            <input class="input" type="number" placeholder="请输入手机号" :autofocus="true" value="" @input="telphone"/>
        </div>
        <div class="inputC">
            <text class="textID">证件号</text>
            <input class="input" type="number" placeholder="请输入证件号码" :autofocus="true" value="" @input="idcard"/>
        </div>
        <div class="textdiv">
            <text class="textC">同意</text>
            <text class="textD">《服务协定》</text>
        </div>
        <div class="button" @click=" goComplete">
            <text class="textE" >下一步</text>
        </div>
    </div>
        <div class="bottom">
            <text class="textF">资讯加密处理，仅用于银行验证</text>
        </div>
    </div>

</template>

<style lang="less" src="../../../style/wx.less"/>

<style>

    .inputA{
        flex-direction: row;
        background-color:#ffffff;
        margin-top: 30px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-top-width: 1px;
        border-color:#ccc;
        align-items:center;
    }
    .inputB{
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 40px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        align-items:center;
    }
    .inputC{
        flex-direction: row;
        background-color: #ffffff;
        margin-top: 40px;
        padding-left: 20px;
        height: 86px;
        border-style:solid;
        border-bottom-width:1px;
        border-color:#ccc;
        align-items:center;
    }
    .input{
        padding-left: 30px;
        width:550px;
        height: 80px;
    }
    .textdiv{
        flex-direction: row;
        padding-left: 20px;
        margin-top: 20px;
    }
    .button{
        background-color:#D9141E;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 48px;
        height: 82px;
        align-items:center;
        justify-content: center;
    }
    .bottom{
        position: absolute;
        bottom:50px;
        align-items: center;
        justify-content: center;
        left: 0;
        right: 0;
    }
    .textA{
        font-size: 32px;
    }
    .textB{
        font-size: 32px;
    }
    .textID{
        font-size: 32px;
    }
    .textC{
        font-size: 28px;
        color:#cccccc;
    }
    .textD{
        font-size:28px;
        color:#0088fb;
    }
    .textE{
        font-size: 40px;
        color:#ffffff;

    }
    .textF{
        font-size: 28px;
        color:#cccccc;
    }
    .textAA{
        margin-left: 30px;
    }
</style>

<script>
    const storage = weex.requireModule('storage');
    var event = weex.requireModule('event')
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils';
    import { POST, GET } from '../../../assets/fetch'

    export default {
        data(){
          return{
              txtInput:'',
              phone:'',
              idno:'',
              autofocus: false
          }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "填写银行卡资讯"},
        },
        created() {
            var _this=this;
            this.txtInput= utils.getUrlParameter("txtInput");
//            event.toast(this.txtInput);
            event.encrypt(this.txtInput, function (message) {
                if (message.type == "success") {
                    POST('weex/member/bankcard/query.jhtml?banknum=' +message.data).then(function (data) {
                            event.toast(data.data.cardname);
                            if (data.type == "success" && data.data != '') {
                                _this.txtInput = data.data.cardname;
                                event.toast(data);
                            } else {
                                event.toast(data.content);
                            }
                        }, function () {
                            event.toast("网络不稳定请重试");
                        }
                    )
                }
            })
        },
        methods: {

            ready: function () {
                var self = this;
                setTimeout(function () {
                    self.autofocus = true;
                }, 1000);
            },
            telphone: function (event) {
                this.phone = event.value;
                console.log('telphone', event.value);
            },
            idcard:function (event) {
                this.idno = event.value;
                console.log('idcard', event.value);
            },
            goback: function () {
                event.closeURL()
            },
           goComplete: function (e) {
                var _this=this;
                let  threedata = {
                    caedNo : this.txtInput,
                    mobile :this.phone,
                    ldentity:this.idno
                };
                threedata = JSON.stringify(threedata);
                storage.setItem('threenumber', threedata,e=>{
                    event.openURL('http://192.168.2.241:8081/bank3.weex.js?name=threenumber', function (message) {


                    })
                });

            }
    }
    }
</script>