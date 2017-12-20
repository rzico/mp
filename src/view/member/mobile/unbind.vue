<template>
    <div class="wrapper">
        <navbar :title="title" @goback="goback"  > </navbar>
        <div class="headPrompting">
            <text class="fz28" style="color: #999">如遇手机号更换的情况，导致账号需换绑手机号，第一步需验证原手机号，再验证新手机号，即可完成换绑。</text>
        </div>
        <div class="middle mt20">
            <text class="fz32">目前已绑定手机尾号:  {{tel}}</text>
        </div>
        <div class="middle">
            <div style="flex-direction: row;align-items: center">
            <text class="fz32">验证码:</text>
            <input type="number" maxlength="6" placeholder="请输入验证码" class="input" v-model="captcha" @input="captchaInput"/>
            </div>
            <div class="code" @click="onSend">
                <text class="fz28" style="color: #EB4E40" v-if="retry">发送验证码</text>
                <text class="fz28" style="color: #cccccc" v-else> {{time}}秒后重新发送</text>
            </div>
        </div>
        <div class="button mt50 ml30 mr30" @click="onEnd">
            <text class="fz40" style="color: #ffffff">下一步</text>
        </div>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>
<style>
    .headPrompting{
        padding-right: 20px;
        padding-left: 20px;
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 40px;
        background-color: #dddddd;
    }
    .middle{
        height: 100px;
        margin-left: 30px;
        margin-right: 30px;
        padding-left: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-color: #cccccc;
        border-bottom-width: 1px;
    }
    .input{
        width: 300px;
        height: 60px;
        margin-left: 50px;
        margin-top: 5px;
    }
    .code{
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-color:#EB4E40;
        border-radius: 10px;
        border-width: 1px;
    }
</style>
<script>
    var optionIndex = 0;
    var lastCaptchaLength = 0;
    var timer = null;
    import navbar from '../../../include/navbar.vue';
    import { POST, GET } from '../../../assets/fetch';
    var event = weex.requireModule('event');
    import utils from '../../../assets/utils';
    export default {
        components: {
            navbar,
        },
        data() {
            return {
                tel:'',
                time:59,
                retry:true,
                captcha:'',
                isEnd:false
            }
        },
        props: {
            title: {default: "换绑手机号"},
        },
        created() {
            this.tel = utils.getUrlParameter("mobile");
        },
        methods:{
            goback:function(e) {
                event.closeURL();
            },
            beginTimer:function () {
                var _this = this;
                _this.retry = false;
                if (utils.isNull(timer) == false)  {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                timer = setInterval(function () {
                    _this.time = _this.time - 1;
                    if (_this.time < 1) {
                        _this.endTimer();
                    }
                },1000)
            },
            endTimer:function () {
                var _this = this;
                if (utils.isNull(timer) == false)  {
                    clearInterval(timer);
                    _this.time = 59;
                    timer = null;
                }
                this.clear();
                this.retry = true;
            },
            clear:function () {
                this.captcha = "";
                lastCaptchaLength = 0;
                optionIndex = 0;
            },
//            当用户输入数字时触发
            captchaInput:function (e) {
                var _this = this;
//                判断删除还是输入  '大于' --> 删除
//                if(lastCaptchaLength > e.value.length){
//                    optionIndex --;
//                    _this.textList[optionIndex] = '';
//                }else{
//                    let a = e.value;
//                    let b = a.substr(a.length-1,1)
//                    _this.textList[optionIndex] = b;
//                    if(_this.textList[0] != ''){
//                        optionIndex ++;
//                    }
//                }
                lastCaptchaLength = e.value.length;
//               当用户输完验证码后进行系统验证
                if(lastCaptchaLength == 6){
                    _this.captcha = e.value;
                    _this.onEnd();
                }
            },
            onSend: function (e) {
                var _this = this;
                        POST('weex/member/mobile/send_mobile.jhtml').then(
                            function (data) {
                                if (data.type == "success") {
                                    _this.beginTimer();
                                } else {
                                    _this.endTimer();
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                _this.endTimer();
                                event.toast("网络不稳定")
                            }
                        )
            },
            onEnd: function () {
                let _this = this;
                if (_this.isEnd==true) {
                    return;
                }
                _this.isEnd = true;
                event.encrypt(_this.captcha,function (msg) {
                    if (msg.type=="success") {
                        POST('weex/member/mobile/captcha.jhtml?captcha='+ msg.data).
                        then(function (data) {
                                if (data.type == "success") {
                                    event.openURL(utils.locate("view/member/mobile/index.js"),
                                        function (res) {
                                            event.closeURL(res);
                                        })
                                    _this.isEnd = false;
                                } else {
                                    _this.endTimer();
                                    _this.isEnd = false;
                                    event.toast(data.content);
                                }
                            },function () {
                                _this.isEnd = false;
                                _this.endTimer();
                                event.toast("网络不稳定请重试");
                            }
                        )
                    } else {
                        _this.isEnd = false;
                        _this.clear();
                        event.toast(data.content);
                    }
                })
            }
        }
    }
</script>