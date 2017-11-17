<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <captcha :title="cptitle" @onclick="onclick" :mobile="mobile" @onSend="onSend" @onEnd="onEnd"> </captcha>
    </div>
</template>
<style lang="less" src="../../../style/wx.less"/>


<style scoped>

</style>
<script>
    const modal = weex.requireModule('modal')
    var navigator = weex.requireModule('navigator')
    import navbar from '../../../include/navbar.vue'
    import { POST, GET } from '../../../assets/fetch'
    var event = weex.requireModule('event');
    import captcha from '../../../include/captcha.vue'
    import utils from '../../../assets/utils';
    var stream = weex.requireModule('stream')
    export default {
        components: {
            navbar,captcha

        },
        props: {
            title: { default: "登录"},
            cptitle: { default: "输入验证码" }
        },
        data () {
            return {
                mobile:""
            }
        },
        created() {
            this.mobile = utils.getUrlParameter("mobile");
//            this.onSend();
//            utils.debug(222)
        },
        methods: {
            onSend: function (e) {
                var _this = this;
                event.encrypt(this.mobile,function (msg) {
                    if (msg.type ==="success"){
                        POST('weex/login/send_mobile.jhtml?mobile=' +msg.data).then(
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
                this.captcha = e;
                event.encrypt(e,function (msg) {
                    if (msg.type=="success") {
                        POST('weex/login/captcha.jhtml?captcha=' + msg.data).
                        then(function (data) {
                                if (data.type == "success") {
                                    let backData = utils.message('success','成功','');
                                    event.closeURL(backData);
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