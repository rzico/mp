<template>
    <div class="wrapper bkg-white">
        <navbar :title="title" @goback="goback"> </navbar>
        <captcha :title="caption" :mobile="mobile" @onclick="onclick"  @onEnd="onEnd"> </captcha>
    </div>
</template>
<style lang="less" src="../../style/wx.less"/>


<style scoped>

</style>
<script>
    import { POST, GET } from '../assets/fetch'
    import utils from '../assets/utils'
    const event = weex.requireModule('event');
    import navbar from '../../include/navbar.vue'
    import captcha from '../../include/captcha.vue'
    var time = 0;
    export default {
        components: {
            navbar,captcha
        },
        props: {
            title: { default: "登录"},
            caption: { default: "输入验证码" },
            captcha: { default: "输入验证码"},
            mobile:{default: ""},
            status:{default:"点击重新发送"}
        },
        created() {
            this.mobile = utils.getUrlParamter();
         },
        methods: {
            onTimeOut:function () {
                setTimeout(1000,function () {
                    time = time +1;
                    this.status = "已发送"+time+"秒";
                })
            },
            onSend: function (e) {
                var _this = this;
                return stream.fetch({
                    method: 'POST',
                    type: 'json',
                    url: '/weex/login/send_mobile.jhtml?mobile=' + _this.value
                }, function (weex) {
                    if (weex.ok) {
                        if (weex.data.type == "success") {

                        } else {
                            modal.toast({message:weex.data.content});
                        }
                    } else {
                        modal.toast({message:"网络不稳定请重试"});
                    }
                })
            },
            goBack:function(e) {
                event.closeUrl();
            },
            onEnd: function (val) {
                modal.toast({message: val});
                this.captcha = val;
                native.encrypt(val,function (data) {
                    if (data.type=="success") {
                        return stream.fetch({
                            method: 'POST',
                            type: 'json',
                            url: '/weex/login/captcha.jhtml?captcha=' + data.data
                        }, function (weex) {
                            modal.toast({message: weex});
                            if (weex.ok) {
                                if (weex.data.type == "success") {
                                    event.closeURL();
                                } else {
                                    native.showToast(weex.data.content);
                                }
                            } else {
                                modal.toast({message: "网络不稳定请重试"});
                            }
                        })
                    } else {
                        modal.toast({message: data.content});
                    }
                })
            }
        }
    }
</script>