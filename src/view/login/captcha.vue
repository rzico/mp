<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <captcha ref="captcha" :title="caption" :mobile="mobile" @onSend="onSend" @onEnd="onEnd"> </captcha>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>


<style scoped>

</style>
<script>
    const event = weex.requireModule('event');
    import { POST, GET } from '../../assets/fetch'
    import utils from '../../assets/utils'
    import navbar from '../../include/navbar.vue'
    import captcha from '../../include/captcha.vue'
    export default {
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "登录"},
            caption: { default: "输入验证码" },
            captcha: { default: "输入验证码"},
            mobile:{default: ""},
            status:{default:"点击重新发送"},
            retry:true
        },
        created() {
            this.mobile = utils.getUrlParameter("mobile");
        },
        methods: {
            onSend: function (e) {
                var _this = this;
                POST('weex/login/send_mobile.jhtml?mobile=' + _this.mobile)
                    .then(
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
            },
            goBack:function(e) {
                event.closeURL();
            },
            onEnd: function (val) {
                this.captcha = val;
                event.encrypt(val,function (data) {
                    if (data.type=="success") {
                        POST('weex/login/captcha.jhtml?captcha=' + data.data).
                        then(function (data) {
                                if (data.type == "success") {
                                    event.closeURL(data);
                                } else {
                                    event.toast(data.content);
                                }
                            },function () {
                                event.toast("网络不稳定请重试");
                            }
                        )
                    } else {
                        event.toast(data.content);
                    }
                })
            }
        }
    }
</script>