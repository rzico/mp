<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <captcha :title="cptitle" @onclick="onclick" ref="captcha" :tel="mobile" :mobile="mobile" @onSend="onSend" @onEnd="onEnd"> </captcha>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>


<style scoped>

</style>
<script>
    import navbar from '../../../include/navbar.vue'
    import { POST, GET } from '../../../assets/fetch'
    var event = weex.requireModule('event');
    import captcha from '../../../include/captcha.vue'
    import utils from '../../../assets/utils';
    export default {
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "绑定手机"},
            cptitle: { default: "输入手机验证码" }
        },
        data () {
            return {
                mobile:""
            }
        },
        created() {

            this.mobile = utils.getUrlParameter("mobile");
//            this.onSend();
        },
        methods: {
            onSend: function (e) {
                var _this = this;
                event.encrypt(this.mobile,function (msg) {
                    if (msg.type ==="success"){
                        POST('weex/member/mobile/send_mobile.jhtml?mobile=' +msg.data).then(
                            function (data) {
                                if (data.type == "success") {
                                    _this.$refs.captcha.beginTimer();
                                } else {
                                    _this.$refs.captcha.endTimer();
                                    event.toast(data.content);
                                }
                            },
                            function (err) {
                                _this.$refs.captcha.endTimer();
                                event.toast("网络不稳定")
                            }
                        )
                    } else {
                        event.toast(data.content);
                    }
                })
            },
            goback:function () {
                event.closeURL()
            },
            onEnd: function (e) {
                let _this = this;
                this.captcha = e;
                event.encrypt(e,function (msg) {
                    if (msg.type=="success") {
                        POST('weex/member/mobile/submit.jhtml?captcha=' + msg.data).
                        then(function (data) {
                                if (data.type == "success") {
                                    event.closeURL(data);
                                } else {
                                    _this.$refs.captcha.clear();
                                    event.toast(data.content);
                                }
                            },function () {
                                _this.$refs.captcha.clear();
                                event.toast("网络不稳定请重试");
                            }
                        )
                    } else {
                        _this.$refs.captcha.clear();
                        event.toast(data.content);
                    }
                })
            }
        }
    }
</script>