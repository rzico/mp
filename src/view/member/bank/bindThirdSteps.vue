<template>
    <div style="background-color: #eeeeee">
            <navbar :title="title" :complete="complete" @goback="goback"> </navbar>
    <div class="big">
        <div class="text">
            <text class="textA">本次操作需要短信确认，请输入</text>
            <text class="textA2" > {{phone}}</text>
            <text class="textA3">收到的短信验证码</text>
        </div>
        <div class="inputA">
            <div class="flex-start" @click="getFocus()">
                <text class="textB">验证码</text>
                <!--隐藏的输入框-->
                <input type="tel" ref="captchRef" v-model="captcha" maxlength="6" @input="captchaInput" autofocus="true" class="input" />
            </div>
            <div class="flex-end">
                <text class="status primary" @click="send()" :style="statusStyle()" v-if="retry">{{status}}</text>
                <text class="status gray"  :style="statusStyle()"  v-else> {{time}}秒后刷新</text>
            </div>
        </div>

        <div class="button bkg-primary" @click="binding()">
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
        flex-wrap: wrap;
        background-color:#ffffff;
        height: 200px;
        align-items:center;
        justify-content: center;
    }
    .textA{
        color:#cccccc;
        font-size: 28px;
    }
    .textA2{
        color:#cccccc;
        font-size: 32px;
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
        justify-content: space-between;
    }
    .textB{
        font-size: 32px;
        line-height: 80px;
        height: 80px;
    }
    .input{
        width:450px;
        height: 80px;
        padding-left:50px;
    }
    .button{
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 48px;
        height: 82px;
        align-items:center;
        justify-content: center;
        border-radius:15px;
    }
    .textD{
        color:#fff;
        font-size:40px;
    }
    .status {
        min-width: 200px;
        margin-right: 20px;
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
                retry: false,
                accountName:'',
                cardname:'',
                bankname:'',
                banknum:'',
                cardtype:'',
                bankimage:'',
                province:'',
                city:'',
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
                let threedata =  JSON.parse(e.data);
                _this.txtInput = threedata.cardNo;
                _this.phone = threedata.mobile;
                _this.idno = threedata.identity;
                _this.accountName = threedata.name;
                _this.cardname = threedata.cardname;
                _this.bankname = threedata.bankname;
                _this.banknum = threedata.banknum;
                _this.cardtype = threedata.cardtype;
                _this.bankimage = threedata.bankimage;
                _this.province = threedata.province;
                _this.city = threedata.city;
                storage.removeItem(three);
                this.onSend();
            });
            this.beginTimer();
        },
        methods: {

            binding:function (e){
                var _this=this;
                if (utils.isNull(this.verification)) {
                    modal.alert({
                        message: "请输入验证码",
                        okTitle: '知道了'
                    })
                    return;
                }
                var  threedata = {
                    cardno : this.txtInput,
                    mobile :this.phone,
                    identity:this.idno,
                    name:this.accountName,
                    cardname:this.cardname,
                    bankname:this.bankname,
                    banknum:this.banknum,
                    cardtype:this.cardtype,
                    bankimage:this.bankimage,
                    province:this.province,
                    city:this.city
                };
                let threedatastr = JSON.stringify(threedata);
                    event.encrypt(threedatastr, function (message) {
                        if (message.type == "success") {
                            POST('weex/member/bankcard/submit.jhtml?captcha=' +_this.verification,message.data).then(
                                function (data) {
                                    utils.debug(data)
                                    if (data.type == "success") {
                                        event.closeURL(data);
                                    } else {
                                        _this.endTimer();
                                        event.toast(data.content);
                                    }
                                }, function (err) {
                                    _this.endTimer();
                                    event.toast("网络不稳定");
                                }
                            )
                        }else {
                            _this.endTimer();
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
                                    _this.beginTimer();
                                } else {
                                    event.toast(data.content);
                                }
                            }, function (err) {
                                event.toast(err.content);
                            }
                        )
                    } else {
                        event.toast(message.content);
                    }
                })

            },
            beginTimer: function () {
                var _this = this;
                _this.time = 60;
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
                    return "margin-right: 20px;";
                } else {
                    return "margin-right: 20px;color:#ccc;";
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