<template>
    <div style="background-color: #eeeeee">
        <div class="header">
            <navbar :title="title" :complete="complete" @goback="goback"> </navbar>
        </div>
    <div class="big">
        <div class="text">
            <text class="textA">1本次操作需要短信确认，请输入</text> <text class="textA2" > {{phone}}</text> <text class="textA3">收到的短信验证码</text>
        </div>
        <div class="inputA">
            <text class="textB">验证码</text>
            <div class="flex-row inputTextBox mtb50" @click="getFocus()">
                <!--隐藏的输入框-->
                <input type="tel" ref="captchRef" v-model="captcha" maxlength="6" @input="captchaInput" autofocus="true" class="input" />
            </div>
            <div class="flex-center">
                <text class="status primary" @click="send()" :style="statusStyle()" v-if="retry">{{status}}</text>
                <text class="status gray"  :style="statusStyle()"  v-else> {{time}}秒后刷新</text>
            </div>
        </div>

        <div class="button" @click="binding()">
            <text class="textD" >绑定</text>
        </div>
    </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>

<style>
    .big{
        background-color: #eeeeee;
    }
    .text{
        background-color:#ffffff;

        height: 200px;
        align-items:center;
        justify-content: center;
    }
    .textA{
        color:#cccccc;
        font-size: 28px;
        width:450px;
    }
    .textA2{
        color:#cccccc;
        font-size: 28px;
    }
    .textA3{
        color:#cccccc;
        font-size: 28px;
    }
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
    .textB{
        font-size: 32px;
    }
    .input{
        width:450px;
        height: 80px;
        padding-left:50px;
    }
    .textC{
        color:#0088fb;
        font-size:32px;
    }
    .button{
        background-color: #D9141E;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 48px;
        height: 82px;
        align-items:center;
        justify-content: center;
    }
    .textD{
        color:#fff;
        font-size:40px;
    }
</style>
<script>
    var optionIndex = 0;
    var lastCaptchaLength = 0;
    var timer = null;
    var event = weex.requireModule('event')
    const storage = weex.requireModule('storage');
    import { POST, GET } from '../../../assets/fetch'
    import navbar from '../../../include/navbar.vue';
    import utils from '../../../assets/utils'
    import mobile from '../../../include/mobile.vue';
    export default {
        data() {
            return {
                value: '',
                phone: '',
                txtInput:'',
                indo: '',
                time:59,
                textList:['','','','','',''],
                verification:''
            }
        },
        components: {
            navbar
        },
        props: {
            title: {default: "验证手机号码"},
            status:{default:"重新发送"},
        },
        beforeDestory() {
            var _this = this;
            if (utils.isNull(timer) == false)  {
                clearInterval(timer);
                _this.time = 59;
                timer = null;
            }
        },
        created() {
            var _this = this;
            storage.getItem('mobile', event => {
                if (event.data != "" && event.data != "undefined") {
                    _this.value = event.data
                }
            });
            var three = utils.getUrlParameter('name');
            storage.getItem(three, e => {
                event.toast(e);
                let threedata =  JSON.parse(e.data);
                event.toast(threedata);
                _this.txtInput = threedata.caedNo;
                _this.phone = threedata.mobile;
                _this.idno = threedata.ldentity;
                storage.removeItem(three);
                this.onSend();
            });
            this.beginTimer();

//            event.toast(this.phone);
        },
        methods: {

            binding:function (e){
                var _this=this;
                var  threedata = {
                    cardNo : this.txtInput,
                    mobile :this.phone,
                    ldentity:this.idno
                };
//                event.toast(threedata);
                let threedatastr = JSON.stringify(threedata);
//                event.toast(threedatastr);
                    event.encrypt(threedatastr, function (message) {
                        if (message.type == "success") {
                            POST('weex/member/bankcard/submit.jhtml?captcha=' +_this.verification,message.data).then(
                                function (data) {
                                    if (data.type == "success") {
                                        event.toast(data);

                                    } else {
                                        event.toast(data.content);
                                    }
                                }, function (err) {
                                    event.toast("网络不稳定");
                                }
                            )
                        }else {
                            event.toast(message.content);
                        }
                });

            },

            onSend: function (e) {
                var _this = this;

                event.encrypt(_this.phone, function (message) {

                    if (message.type == "success") {
                        POST('weex/member/bankcard/send_mobile.jhtml?mobile=' + message.data).then(
                            function (data) {
                                if (data.type == "success") {
                                    event.toast(data);

                                } else {
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                event.toast("网络不稳定");
                            }
                        )
                    }
                })

            },
            beginTimer: function () {
                var _this = this;
                _this.retry = false;
                if (utils.isNull(timer) == false) {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                timer = setInterval(function () {
                    _this.time = _this.time - 1;
                    if (_this.time < 1) {
                        _this.endTimer();
                    }
                }, 1000)
            },
            endTimer: function () {
                var _this = this;
                if (utils.isNull(timer) == false) {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                this.retry = true;
            },
            statusStyle: function () {
                if (this.retry) {
                    return "";
                } else {
                    return "color:#ccc";
                }
            },
            clear:function () {
                this.captcha = "";
                this.textList = ['','','','','',''];
            },
            captchaInput:function (event) {

                    this.verification= event.value;
//
            },
            goback: function () {
                event.closeURL()
            },
            getFocus:function () {
                this.$refs['captchRef'].focus();
            },

            send:function () {

            this.onSend();
    }
        }
    }
</script>