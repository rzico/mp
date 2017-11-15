<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @click="goback"> </navbar>
        <captcha ref="captcha" :title="caption" :mobile="mobile" @onSend="onSend" @onEnd="onEnd"> </captcha>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>

<style scoped>

</style>
<script>
    import { POST, GET } from '../../../assets/fetch';
    import utils from '../../../assets/utils';
    const event = weex.requireModule('event');
    import navbar from '../../../include/navbar.vue'
    import captcha from '../../../include/captcha.vue'
    export default {
        components: {
            navbar,captcha
        },
        data () {
           return {
               mobile:""
           }
        },
        created() {
            utils.initIconFont();
            this.mobile = utils.getUrlParameter("mobile");
            this.onSend();
        },
        props: {
            title: { default: "设置密码"},
            caption: { default: "输入验证码" },
            mobile:{default:""}
        },
        methods: {
            onSend: function (e) {
                var _this = this;
                event.encrypt(this.mobile,function (msg) {
                    if (msg.type ==="success"){
                        POST('weex/member/password/send_mobile.jhtml?mobile=' +msg.data).then(
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
            onEnd: function (val) {
                this.captcha = val;
                event.encrypt(val,function (msg) {
                    if (msg.type=="success") {
                        POST('weex/member/password/captcha.jhtml?captcha=' + msg.data).
                        then(function (data) {
                                if (data.type == "success") {
                                    event(utils.locate("http://192.168.2.147:8081/update.weex.js?captcha="+msg.data),
                                        function (resp) {
                                           event.closeURL(resp);
                                        }
                                    )
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